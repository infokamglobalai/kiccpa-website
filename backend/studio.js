const studio = require('./studio-local');
const { notifyNewPost } = require('./subscribers');

const CONTENT_ROLES = ['superadmin', 'admin', 'seo', 'marketing'];
const CHANNELS = ['linkedin', 'facebook', 'instagram'];
const PURPOSES = ['awareness', 'hiring', 'product', 'thought'];

function staffGuard(req, res, next) {
  const expected = process.env.STAFF_API_SECRET;
  const key = req.get('x-staff-key');
  const role = req.get('x-staff-role');
  if (!expected || key !== expected || !CONTENT_ROLES.includes(role)) {
    return res.status(401).json({ error: 'Website access is for super admin, admin, SEO, and marketing.' });
  }
  req.staff = { role, email: req.get('x-staff-email') || '' };
  next();
}

function cleanPost(body, role) {
  const title = String(body.title || '').trim();
  const excerpt = String(body.excerpt || '').trim();
  const text = String(body.body || '').trim();
  if (title.length < 4 || excerpt.length < 20 || text.length < 40) {
    return { error: 'Add a title, a short summary, and the article text.' };
  }
  const publisher = role === 'superadmin' || role === 'admin';
  return {
    title,
    excerpt: excerpt.slice(0, 280),
    body: text.slice(0, 20000),
    metaTitle: String(body.metaTitle || title).trim().slice(0, 70),
    metaDescription: String(body.metaDescription || excerpt).trim().slice(0, 160),
    focusKeyword: String(body.focusKeyword || '').trim().slice(0, 80),
    authorName: String(body.authorName || 'KICCPA').trim().slice(0, 80),
    status: publisher && body.status === 'published' ? 'published' : 'draft',
    slug: String(body.slug || '').trim().slice(0, 72),
  };
}

function cleanSocial(body) {
  const text = String(body.body || '').trim();
  if (text.length < 20) return { error: 'Write the post before saving it.' };
  const channel = CHANNELS.includes(body.channel) ? body.channel : 'linkedin';
  const purpose = PURPOSES.includes(body.purpose) ? body.purpose : 'awareness';
  const status = ['draft', 'ready', 'shared'].includes(body.status) ? body.status : 'draft';
  return {
    channel,
    purpose,
    body: text.slice(0, 3000),
    link: String(body.link || '').trim().slice(0, 300),
    hashtags: String(body.hashtags || '').trim().slice(0, 240),
    status,
    sharedAt: status === 'shared' ? new Date().toISOString() : '',
  };
}

function publicPost(post) {
  return {
    id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    author: post.authorName || 'KICCPA',
    publishedAt: post.updatedAt || post.createdAt,
  };
}

module.exports = function registerStudio(app) {
  app.get('/api/insights', (_req, res) => {
    res.json({ posts: studio.posts(false).map(publicPost) });
  });

  app.get('/api/insights/:slug', (req, res) => {
    const post = studio.postBySlug(req.params.slug, true);
    if (!post) return res.status(404).json({ error: 'This note is not published.' });
    res.json({ post: publicPost(post) });
  });

  app.get('/api/admin/studio/posts', staffGuard, (_req, res) => {
    res.json({ posts: studio.posts(true) });
  });

  app.post('/api/admin/studio/posts', staffGuard, (req, res) => {
    const payload = cleanPost(req.body || {}, req.staff.role);
    if (payload.error) return res.status(400).json(payload);
    const post = studio.savePost(null, payload, req.staff.email);
    if (post.status === 'published') notifyNewPost(post).catch(() => {});
    res.status(201).json({ post });
  });

  app.patch('/api/admin/studio/posts/:id', staffGuard, (req, res) => {
    const existing = studio.post(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Article not found.' });
    const payload = cleanPost(req.body || {}, req.staff.role);
    if (payload.error) return res.status(400).json(payload);
    const publisher = req.staff.role === 'superadmin' || req.staff.role === 'admin';
    if (!publisher) payload.status = existing.status === 'published' ? 'published' : 'draft';
    const post = studio.savePost(req.params.id, payload, req.staff.email);
    if (post.error) return res.status(404).json(post);
    if (payload.status === 'published' && existing.status !== 'published') notifyNewPost(post).catch(() => {});
    res.json({ post });
  });

  app.delete('/api/admin/studio/posts/:id', staffGuard, (req, res) => {
    if (!studio.removePost(req.params.id)) return res.status(404).json({ error: 'Article not found.' });
    res.json({ success: true });
  });

  app.get('/api/admin/studio/social', staffGuard, (_req, res) => {
    res.json({ social: studio.social() });
  });

  app.post('/api/admin/studio/social', staffGuard, (req, res) => {
    const payload = cleanSocial(req.body || {});
    if (payload.error) return res.status(400).json(payload);
    res.status(201).json({ item: studio.saveSocial(null, payload, req.staff.email) });
  });

  app.patch('/api/admin/studio/social/:id', staffGuard, (req, res) => {
    const payload = cleanSocial(req.body || {});
    if (payload.error) return res.status(400).json(payload);
    const item = studio.saveSocial(req.params.id, payload, req.staff.email);
    if (item.error) return res.status(404).json(item);
    res.json({ item });
  });

  app.delete('/api/admin/studio/social/:id', staffGuard, (req, res) => {
    if (!studio.removeSocial(req.params.id)) return res.status(404).json({ error: 'Draft not found.' });
    res.json({ success: true });
  });
};
