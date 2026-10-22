const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const file = path.join(__dirname, 'private', 'studio.json');

function empty() {
  return { posts: [], social: [] };
}

function read() {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return empty();
  }
}

function write(data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function id() {
  return crypto.randomBytes(12).toString('hex');
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72);
}

module.exports = {
  posts(includeDrafts) {
    return read().posts.filter((post) => includeDrafts || post.status === 'published');
  },
  post(postId) {
    return read().posts.find((post) => post._id === postId) || null;
  },
  postBySlug(slug, publishedOnly) {
    return read().posts.find((post) => post.slug === slug && (!publishedOnly || post.status === 'published')) || null;
  },
  savePost(existingId, payload, email) {
    const data = read();
    if (existingId) {
      const index = data.posts.findIndex((post) => post._id === existingId);
      if (index < 0) return { error: 'Article not found.' };
      const next = { ...payload };
      if (!next.slug) delete next.slug;
      data.posts[index] = { ...data.posts[index], ...next, updatedAt: new Date().toISOString() };
      write(data);
      return data.posts[index];
    }
    let slug = slugify(payload.slug || payload.title) || `note-${Date.now().toString(36)}`;
    if (data.posts.some((post) => post.slug === slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
    const post = {
      ...payload,
      _id: id(),
      slug,
      createdBy: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.posts.unshift(post);
    write(data);
    return post;
  },
  removePost(postId) {
    const data = read();
    const next = data.posts.filter((post) => post._id !== postId);
    if (next.length === data.posts.length) return false;
    data.posts = next;
    write(data);
    return true;
  },
  social() {
    return read().social;
  },
  saveSocial(existingId, payload, email) {
    const data = read();
    if (existingId) {
      const index = data.social.findIndex((item) => item._id === existingId);
      if (index < 0) return { error: 'Draft not found.' };
      data.social[index] = { ...data.social[index], ...payload, updatedAt: new Date().toISOString() };
      write(data);
      return data.social[index];
    }
    const item = {
      ...payload,
      _id: id(),
      createdBy: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.social.unshift(item);
    write(data);
    return item;
  },
  removeSocial(itemId) {
    const data = read();
    const next = data.social.filter((item) => item._id !== itemId);
    if (next.length === data.social.length) return false;
    data.social = next;
    write(data);
    return true;
  },
};
