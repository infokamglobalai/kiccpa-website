const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const file = path.join(__dirname, 'private', 'subscribers.json');
const hits = new Map();

function dbReady() {
  return require('mongoose').connection.readyState === 1;
}

function Subscriber() {
  return require('./models/Subscriber');
}

function readLocal() {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeLocal(rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(rows, null, 2));
}

function hashToken(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

function newToken() {
  return crypto.randomBytes(32).toString('hex');
}

function mailer() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: String(process.env.SMTP_PORT) === '465',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function sendMail({ to, subject, text }) {
  const transport = mailer();
  if (!transport) return Promise.resolve({ sent: false, error: 'Email is not configured on this server.' });
  return new Promise((resolve) => {
    transport.sendMail({
      from: `"KICCPA" <${process.env.SMTP_USER}>`,
      to,
      subject: String(subject || '').slice(0, 180),
      text: String(text || '').slice(0, 8000),
    }, (err) => {
      if (err) resolve({ sent: false, error: err.message });
      else resolve({ sent: true, error: '' });
    });
  });
}

function siteOrigin() {
  const raw = process.env.PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
  return String(raw).replace(/\/$/, '');
}

function allow(ip) {
  const key = String(ip || 'unknown');
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((at) => now - at < 60 * 60 * 1000);
  if (recent.length >= 8) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}

async function upsert(email, patch) {
  if (!dbReady()) {
    const rows = readLocal();
    let row = rows.find((item) => item.email === email);
    if (!row) {
      row = { email, createdAt: new Date().toISOString() };
      rows.unshift(row);
    }
    Object.assign(row, patch, { email, updatedAt: new Date().toISOString() });
    writeLocal(rows);
    return row;
  }
  return Subscriber().findOneAndUpdate({ email }, { $set: patch }, { upsert: true, new: true, setDefaultsOnInsert: true });
}

async function findByEmail(email) {
  if (!dbReady()) return readLocal().find((item) => item.email === email) || null;
  return Subscriber().findOne({ email });
}

async function findByHash(field, token) {
  const hashed = hashToken(token);
  if (!dbReady()) return readLocal().find((item) => item[field] === hashed) || null;
  return Subscriber().findOne({ [field]: hashed });
}

async function requestSubscribe(email) {
  const existing = await findByEmail(email);
  if (existing && existing.status === 'active') {
    const unsubToken = newToken();
    const link = `${siteOrigin()}/subscribe/unsubscribe?token=${unsubToken}`;
    const mailed = await sendMail({
      to: email,
      subject: 'You are already subscribed to KICCPA updates',
      text: `This address already receives KICCPA insights and company updates.\n\nUnsubscribe at any time:\n${link}`,
    });
    if (mailed.sent) await upsert(email, { unsubHash: hashToken(unsubToken) });
    return mailed;
  }
  const confirmToken = newToken();
  const expires = new Date(Date.now() + 48 * 60 * 60 * 1000);
  await upsert(email, {
    status: 'pending',
    confirmHash: hashToken(confirmToken),
    confirmExpires: expires,
    confirmedAt: null,
    unsubscribedAt: null,
  });
  const link = `${siteOrigin()}/subscribe/confirm?token=${confirmToken}`;
  const mailed = await sendMail({
    to: email,
    subject: 'Confirm updates from KICCPA',
    text: `Confirm that ${email} should receive KICCPA insights and company updates.\n\nOpen this page and confirm within 48 hours:\n${link}\n\nIf you did not ask for this, ignore the message. Nothing is sent until you confirm.`,
  });
  return mailed;
}

async function confirmSubscribe(token) {
  if (!token || String(token).length < 32) return null;
  const row = await findByHash('confirmHash', token);
  if (!row) return null;
  if (row.confirmExpires && new Date(row.confirmExpires).getTime() < Date.now()) return null;
  const unsubToken = newToken();
  const unsubHash = hashToken(unsubToken);
  await upsert(row.email, {
    status: 'active',
    confirmHash: '',
    confirmExpires: null,
    confirmedAt: new Date(),
    unsubHash,
    unsubscribedAt: null,
  });
  const link = `${siteOrigin()}/subscribe/unsubscribe?token=${unsubToken}`;
  await sendMail({
    to: row.email,
    subject: 'You are subscribed to KICCPA updates',
    text: `You will receive an email when KICCPA publishes an insight or a company update.\n\nUnsubscribe at any time:\n${link}`,
  });
  return true;
}

async function unsubscribe(token) {
  if (!token || String(token).length < 32) return false;
  const row = await findByHash('unsubHash', token);
  if (!row || row.status === 'unsubscribed') return Boolean(row);
  await upsert(row.email, {
    status: 'unsubscribed',
    confirmHash: '',
    unsubHash: '',
    unsubscribedAt: new Date(),
  });
  return true;
}

async function notifyNewPost(post) {
  const title = String(post.title || 'A new KICCPA note').slice(0, 140);
  const slug = String(post.slug || '');
  const excerpt = String(post.excerpt || '').slice(0, 280);
  const rows = !dbReady()
    ? readLocal().filter((item) => item.status === 'active' && item.unsubHash)
    : await Subscriber().find({ status: 'active' }).select('email unsubHash');
  let sent = 0;
  for (const row of rows) {
    const unsubToken = newToken();
    const link = `${siteOrigin()}/subscribe/unsubscribe?token=${unsubToken}`;
    const page = `${siteOrigin()}/insights/${slug}`;
    const mailed = await sendMail({
      to: row.email,
      subject: `New from KICCPA: ${title}`,
      text: `${title}\n\n${excerpt}\n\nRead it: ${page}\n\nUnsubscribe: ${link}`,
    });
    if (mailed.sent) {
      await upsert(row.email, { unsubHash: hashToken(unsubToken) });
      sent += 1;
    }
  }
  return sent;
}

function registerSubscribers(app) {
  app.post('/api/subscribe', async (req, res) => {
    if (!allow(req.ip)) return res.status(429).json({ error: 'Too many attempts. Try again later.' });
    const trap = String(req.body?.website || req.body?.company || '').trim();
    if (trap) return res.json({ ok: true, mailed: true, message: 'Check your inbox and confirm the subscription. Nothing is sent until you confirm.' });
    const email = String(req.body?.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 180) {
      return res.status(400).json({ error: 'Enter a valid email address.' });
    }
    try {
      const mailed = await requestSubscribe(email);
      if (!mailed.sent) {
        return res.json({
          ok: true,
          mailed: false,
          message: 'The address was saved, but the confirmation email could not be sent yet. Try again once mail is working, or write to info@kiccpa.com.',
        });
      }
      res.json({
        ok: true,
        mailed: true,
        message: 'Check your inbox and confirm the subscription. Nothing is sent until you confirm. You can unsubscribe from any update.',
      });
    } catch (error) {
      res.status(500).json({ error: 'Could not save the subscription.' });
    }
  });

  app.post('/api/subscribe/confirm', async (req, res) => {
    try {
      const ok = await confirmSubscribe(req.body?.token);
      if (!ok) return res.status(400).json({ error: 'This confirmation link is not valid or has expired. Subscribe again from the website.' });
      res.json({ ok: true, message: 'You are subscribed. New insights and company updates will be emailed to you. Each message includes a link to unsubscribe.' });
    } catch (error) {
      res.status(500).json({ error: 'Could not confirm the subscription.' });
    }
  });

  app.post('/api/subscribe/unsubscribe', async (req, res) => {
    try {
      const ok = await unsubscribe(req.body?.token);
      if (!ok) return res.status(400).json({ error: 'This unsubscribe link is not valid.' });
      res.json({ ok: true, message: 'You are unsubscribed. You will not receive further updates.' });
    } catch (error) {
      res.status(500).json({ error: 'Could not unsubscribe.' });
    }
  });
}

module.exports = registerSubscribers;
module.exports.notifyNewPost = notifyNewPost;
