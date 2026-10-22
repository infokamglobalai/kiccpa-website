const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const nodemailer = require('nodemailer');
const Job = require('./models/Job');
const JobApplication = require('./models/JobApplication');
const StaffUser = require('./models/StaffUser');
const local = require('./hiring-local');
const { readResume, screenMatch } = require('./screen');
const { applicationReceived, stageLetter, welcomeLetter, resetLetter, interviewInvite, interviewerNote, managerAssigned, joiningPack, joiningConfirmed, joiningUpdate } = require('./mail-templates');

const DEPARTMENTS = ['it-digital', 'cloud-devops', 'bot', 'bpo', 'hr', 'platforms', 'corporate'];
const COUNTRY_DOCS = {
  kuwait: ['civil-id', 'passport', 'visa-page', 'police-clearance', 'medical', 'photo', 'degree', 'experience-letter', 'relieving-letter', 'salary-slip'],
  uae: ['emirates-id', 'passport', 'visa-page', 'police-clearance', 'medical', 'photo', 'degree', 'experience-letter', 'relieving-letter', 'salary-slip'],
  india: ['aadhaar', 'pan', 'passport', 'cancelled-cheque', 'photo', 'degree', 'experience-letter', 'relieving-letter', 'salary-slip'],
  kenya: ['national-id', 'kra-pin', 'passport', 'photo', 'degree', 'experience-letter', 'relieving-letter', 'salary-slip'],
  tunisia: ['cin', 'passport', 'photo', 'degree', 'experience-letter', 'relieving-letter', 'salary-slip'],
  other: ['government-id', 'passport', 'work-authorisation', 'photo', 'degree', 'experience-letter', 'relieving-letter', 'salary-slip'],
};
const HIRING_COUNTRIES = Object.keys(COUNTRY_DOCS);
const DOCUMENTS = [...new Set(Object.values(COUNTRY_DOCS).flat())];
const OFFER_DOCS = ['signed-offer', 'noc', 'bank-proof', 'address-proof', 'attested-degree', 'police-clearance', 'medical', 'photo'];
const OFFER_POLICIES = ['offer', 'confidentiality', 'conduct', 'data', 'accuracy'];
const CURRENCIES = ['KWD', 'AED', 'INR', 'KES', 'TND', 'USD'];
const STATUSES = ['submitted', 'screening', 'interview', 'offer', 'hired', 'rejected', 'on-hold'];
const ROLES = ['superadmin', 'admin', 'hr', 'manager', 'seo', 'marketing'];
const HIRING_ROLES = ['superadmin', 'admin', 'hr'];
const ROLE_LABELS = {
  superadmin: 'Super admin — users, hiring, and website',
  admin: 'Admin — hiring and website',
  hr: 'HR — roles, applications, and interviews',
  manager: 'Department manager — interviews assigned by HR',
  seo: 'SEO — articles and search fields',
  marketing: 'Marketing — articles and social drafts',
};
const privateDir = path.join(__dirname, 'private', 'applications');

function dbReady() {
  return require('mongoose').connection.readyState === 1;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72);
}

function lines(value) {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  return String(value || '')
    .split('\n')
    .map((v) => v.trim())
    .filter(Boolean);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 32).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = String(stored || '').split(':');
  if (!salt || !hash) return false;
  const next = crypto.scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, 'hex');
  if (next.length !== prev.length) return false;
  return crypto.timingSafeEqual(next, prev);
}

function applicationCard(row) {
  return {
    id: String(row._id),
    reference: row.reference,
    jobTitle: row.jobTitle,
    jobReference: row.jobReference,
    jobId: String(row.job),
    department: row.department,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    country: row.country,
    experienceYears: row.experienceYears,
    status: row.status,
    scoreAverage: row.scoreAverage || 0,
    createdAt: row.createdAt,
  };
}

function screenedCard(row, job) {
  const card = applicationCard(row);
  if (!job) return { ...card, openings: 0, screen: null };
  const file = row.resumePath ? path.join(privateDir, path.basename(String(row.resumePath))) : '';
  return { ...card, openings: Number(job.openings || 1), screen: screenMatch(job, row, readResume(file)) };
}

function byMatch(cards) {
  const sorted = cards.sort((a, b) => (b.screen?.score || 0) - (a.screen?.score || 0) || new Date(b.createdAt) - new Date(a.createdAt));
  const hired = {};
  sorted.forEach((card) => {
    if (card.status === 'hired') hired[card.jobId] = (hired[card.jobId] || 0) + 1;
  });
  const taken = {};
  return sorted.map((card) => {
    const seats = Math.max(0, Number(card.openings || 0) - (hired[card.jobId] || 0));
    const closed = card.status === 'rejected' || card.status === 'hired' || !card.screen;
    if (closed || seats === 0) return { ...card, shortlist: false, shortlistPlace: 0 };
    taken[card.jobId] = taken[card.jobId] || 0;
    if (taken[card.jobId] >= seats) return { ...card, shortlist: false, shortlistPlace: 0 };
    taken[card.jobId] += 1;
    return { ...card, shortlist: true, shortlistPlace: taken[card.jobId] };
  });
}

function visibleApplications(cards, query) {
  const q = String(query.q || '').trim().toLowerCase();
  const suggested = String(query.suggested || '') === '1';
  return cards.filter((card) => {
    if (suggested && !card.shortlist) return false;
    if (!q) return true;
    return `${card.fullName || ''} ${card.email || ''} ${card.reference || ''}`.toLowerCase().includes(q);
  });
}

async function notifyHiringTeam(row, notice) {
  const except = String(notice.except || '').toLowerCase();
  const emails = new Set();
  const staff = !dbReady()
    ? local.staff().filter((user) => user.active !== false && HIRING_ROLES.includes(user.role))
    : await StaffUser.find({ role: { $in: HIRING_ROLES }, active: true }).select('email');
  staff.forEach((user) => emails.add(String(user.email || '').toLowerCase()));
  (Array.isArray(row.assignments) ? row.assignments : []).forEach((item) => {
    if (item.author) emails.add(String(item.author).toLowerCase());
  });
  emails.forEach((email) => {
    if (!email || email === except) return;
    local.addNotice({
      email,
      applicationId: notice.applicationId,
      title: notice.title,
      detail: notice.detail,
    });
  });
  return emails.size > (except && emails.has(except) ? 1 : 0);
}

function publicJob(job) {
  return {
    id: String(job._id),
    title: job.title,
    slug: job.slug,
    reference: job.reference,
    department: job.department,
    location: job.location,
    workplace: job.workplace,
    employmentType: job.employmentType,
    experienceMin: job.experienceMin,
    experienceMax: job.experienceMax,
    openings: job.openings,
    summary: job.summary,
    about: job.about,
    responsibilities: job.responsibilities,
    requirements: job.requirements,
    niceToHave: job.niceToHave,
    benefits: job.benefits,
    deadline: job.deadline,
    status: job.status,
    salaryCurrency: job.salaryCurrency || '',
    salaryMin: job.salaryMin || 0,
    salaryMax: job.salaryMax || 0,
    salaryPeriod: job.salaryPeriod || 'yearly',
    managerName: job.managerName || '',
    managerRole: job.managerRole || '',
    hiringCountry: HIRING_COUNTRIES.includes(job.hiringCountry) ? job.hiringCountry : '',
    documents: Array.isArray(job.documents) ? job.documents : [],
    rounds: Array.isArray(job.rounds) ? job.rounds : [],
    createdAt: job.createdAt,
  };
}

function requireDb() {
  return dbReady();
}

function staffGuard(req, res, next) {
  const expected = process.env.STAFF_API_SECRET;
  const key = req.get('x-staff-key');
  const role = req.get('x-staff-role');
  if (!expected || key !== expected || !ROLES.includes(role)) {
    return res.status(401).json({ error: 'Staff sign-in required.' });
  }
  req.staff = { role, email: req.get('x-staff-email') || '' };
  next();
}

function hiringOnly(req, res, next) {
  if (!HIRING_ROLES.includes(req.staff?.role)) {
    return res.status(403).json({ error: 'Hiring access is for super admin, admin, and HR.' });
  }
  next();
}

function panelOnly(req, res, next) {
  if (HIRING_ROLES.includes(req.staff?.role) || req.staff?.role === 'manager') return next();
  return res.status(403).json({ error: 'This desk is outside your access.' });
}

function assignedTo(row, email) {
  const who = String(email || '').toLowerCase();
  const lists = [row?.assignments, row?.interviews];
  return lists.some((list) => Array.isArray(list) && list.some((item) => {
    const manager = String(item.managerEmail || '').toLowerCase();
    const interviewer = String(item.interviewerEmail || '').toLowerCase();
    return manager === who || interviewer === who;
  }));
}

function canOpenApplication(req, row) {
  if (HIRING_ROLES.includes(req.staff?.role)) return true;
  return req.staff?.role === 'manager' && assignedTo(row, req.staff.email);
}

function superOnly(req, res, next) {
  if (req.staff?.role !== 'superadmin') {
    return res.status(403).json({ error: 'Only a super admin can do that.' });
  }
  next();
}

function managerOnly(req, res, next) {
  if (!['superadmin', 'admin'].includes(req.staff?.role)) {
    return res.status(403).json({ error: 'Only an admin can view the team.' });
  }
  next();
}

function tokenHash(token) {
  return crypto.createHash('sha256').update(String(token)).digest('hex');
}

const OFFER_LABELS = {
  'signed-offer': 'Signed offer acknowledgement',
  noc: 'No-objection or relieving letter from your current employer',
  'bank-proof': 'Bank proof for salary payment',
  'address-proof': 'Address proof',
  'attested-degree': 'Attested degree certificate',
  'police-clearance': 'Police clearance certificate',
  medical: 'Medical fitness certificate',
  photo: 'Photograph',
};

const POLICY_TEXT = {
  offer: 'I have read the role and the joining window on this page. I accept the offer on that basis. This page is not itself an employment contract, and I will not resign or relocate until human resources confirms my joining date in writing.',
  confidentiality: 'I will keep KICCPA and client information confidential, during hiring and employment, except where the law requires disclosure.',
  conduct: 'I will follow the workplace policies and conduct rules human resources gives me. A breach can end the hiring process or employment.',
  data: 'KICCPA may store these documents for employment, payroll, and legal record-keeping. They are visible to the hiring team, not on the public website.',
  accuracy: 'The documents I upload are mine and true to the best of my knowledge. I will bring the originals for checking on my first day.',
};

function isoDate(value) {
  const text = String(value || '').slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return '';
  const parsed = new Date(`${text}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? '' : text;
}

function offerFresh(onboarding) {
  if (!onboarding?.sentAt || !onboarding.tokenHash) return false;
  return Date.now() - new Date(onboarding.sentAt).getTime() < 21 * 24 * 60 * 60 * 1000;
}

function staffOnboarding(onboarding) {
  if (!onboarding || typeof onboarding !== 'object') return null;
  const { tokenHash: _hidden, documents, ...rest } = onboarding;
  return {
    ...rest,
    linkSent: Boolean(_hidden),
    documents: (Array.isArray(documents) ? documents : []).map((item) => ({ kind: item.kind, name: item.name })),
  };
}

function mergeOnboarding(current, patch) {
  const prev = current && typeof current === 'object' ? current : {};
  const next = { ...prev, ...patch };
  if (!Object.prototype.hasOwnProperty.call(patch, 'documents')) next.documents = prev.documents || [];
  if (!patch.tokenHash && prev.tokenHash) next.tokenHash = prev.tokenHash;
  return next;
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
      else resolve({ sent: true });
    });
  });
}

function cleanScore(body) {
  if (!body || typeof body !== 'object') return null;
  const keys = ['role', 'problem', 'communication', 'experience', 'fit'];
  const scores = {};
  for (const key of keys) {
    const value = Number(body[key]);
    if (!Number.isInteger(value) || value < 1 || value > 5) return { error: 'Score each interview area from 1 to 5.' };
    scores[key] = value;
  }
  const recommendation = ['advance', 'hold', 'decline'].includes(body.recommendation) ? body.recommendation : '';
  if (!recommendation) return { error: 'Choose advance, hold, or decline.' };
  const interviewer = String(body.interviewer || '').trim();
  if (interviewer.length < 2) return { error: 'Enter the interviewer name.' };
  const average = keys.reduce((sum, key) => sum + scores[key], 0) / keys.length;
  return {
    ...scores,
    recommendation,
    interviewer,
    comment: String(body.comment || '').trim().slice(0, 1000),
    average: Math.round(average * 10) / 10,
  };
}

module.exports = function registerRecruitment(app) {
  if (!fs.existsSync(privateDir)) fs.mkdirSync(privateDir, { recursive: true });

  const upload = multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => cb(null, privateDir),
      filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname || '').toLowerCase().slice(0, 8);
        cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const ok = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'].includes(path.extname(file.originalname || '').toLowerCase());
      cb(ok ? null : new Error('Upload a PDF, DOC, or DOCX file under 5 MB.'), ok);
    },
  });

  app.get('/api/jobs', async (req, res) => {
    if (!dbReady()) {
      const department = DEPARTMENTS.includes(String(req.query.department)) ? String(req.query.department) : '';
      return res.json({ jobs: local.publishedJobs(department).map(publicJob), database: true, storage: 'local' });
    }
    const query = { status: 'published', $or: [{ deadline: null }, { deadline: { $gte: new Date() } }] };
    if (req.query.department && DEPARTMENTS.includes(String(req.query.department))) {
      query.department = String(req.query.department);
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json({ jobs: jobs.map(publicJob), database: true, storage: 'mongodb' });
  });

  app.get('/api/jobs/:slug', async (req, res) => {
    if (!dbReady()) {
      const job = local.openJob(req.params.slug);
      if (!job) return res.status(404).json({ error: 'This role is not open.' });
      if (job.deadline && new Date(job.deadline) < new Date()) return res.status(404).json({ error: 'Applications for this role are closed.' });
      return res.json({ job: publicJob(job) });
    }
    const job = await Job.findOne({ slug: req.params.slug, status: 'published' });
    if (!job) return res.status(404).json({ error: 'This role is not open.' });
    if (job.deadline && job.deadline < new Date()) return res.status(404).json({ error: 'Applications for this role are closed.' });
    res.json({ job: publicJob(job) });
  });

  app.post('/api/jobs/:slug/apply', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'extra', maxCount: 1 }, ...DOCUMENTS.map((name) => ({ name, maxCount: 1 }))]), async (req, res) => {
    try {
      const job = !dbReady() ? local.openJob(req.params.slug) : await Job.findOne({ slug: req.params.slug, status: 'published' });
      if (!job) return res.status(404).json({ error: 'This role is not open.' });
      if (job.deadline && job.deadline < new Date()) return res.status(400).json({ error: 'The application deadline has passed.' });
      const resume = req.files?.resume?.[0];
      if (!resume) return res.status(400).json({ error: 'Attach a resume as a PDF, DOC, or DOCX file.' });
      const body = req.body || {};
      const required = ['fullName', 'email', 'phone', 'city', 'country', 'educationLevel', 'institution', 'coverNote'];
      for (const key of required) {
        if (!String(body[key] || '').trim()) return res.status(400).json({ error: `Enter ${key}.` });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return res.status(400).json({ error: 'Enter a valid email.' });
      if (String(body.coverNote).trim().length < 40) return res.status(400).json({ error: 'Write at least a short note about why you are applying.' });
      if (body.consent !== 'true' && body.consent !== 'on') return res.status(400).json({ error: 'Confirm that KICCPA may review this application.' });
      const email = String(body.email).toLowerCase();
      const duplicate = !dbReady()
        ? local.duplicate(job._id, email)
        : await JobApplication.findOne({ job: job._id, email });
      if (duplicate) return res.status(409).json({ error: `An application for this role already exists: ${duplicate.reference}.` });
      const extra = req.files?.extra?.[0];
      const requiredDocs = (Array.isArray(job.documents) ? job.documents : []).filter((kind) => DOCUMENTS.includes(kind));
      const documents = [];
      for (const kind of requiredDocs) {
        const file = req.files?.[kind]?.[0];
        if (!file) return res.status(400).json({ error: `Upload the ${kind.replace(/-/g, ' ')} file for this role.` });
        documents.push({ kind, path: file.filename, name: file.originalname });
      }
      const reference = `APP-${Date.now().toString(36).toUpperCase()}`;
      const applicationDoc = {
        reference,
        job: job._id,
        jobTitle: job.title,
        jobReference: job.reference,
        department: job.department,
        fullName: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        city: body.city.trim(),
        country: body.country.trim(),
        currentTitle: body.currentTitle || '',
        currentCompany: body.currentCompany || '',
        experienceYears: Number(body.experienceYears || 0),
        noticePeriod: body.noticePeriod || '',
        educationLevel: body.educationLevel.trim(),
        institution: body.institution.trim(),
        graduationYear: body.graduationYear || '',
        linkedin: body.linkedin || '',
        portfolio: body.portfolio || '',
        coverNote: body.coverNote.trim(),
        resumePath: resume.filename,
        resumeName: resume.originalname,
        extraPath: extra?.filename || '',
        extraName: extra?.originalname || '',
        documents,
        consent: true,
        notes: [{ author: 'system', text: 'Application submitted.', status: 'submitted', at: new Date().toISOString() }],
      };
      const application = !dbReady() ? local.addApplication(applicationDoc) : await JobApplication.create(applicationDoc);
      const letter = applicationReceived({
        name: applicationDoc.fullName,
        jobTitle: job.title,
        reference,
        submittedAt: application.createdAt,
      });
      const ack = await sendMail({ to: applicationDoc.email, subject: letter.subject, text: letter.body });
      const team = process.env.JOBS_NOTIFY_TO || process.env.LEADS_NOTIFY_TO || 'info@kiccpa.com';
      await sendMail({
        to: team,
        subject: `New application ${reference}: ${job.title}`,
        text: `${applicationDoc.fullName} applied for ${job.title} (${job.reference}).\nEmail: ${applicationDoc.email}\nPhone: ${applicationDoc.phone}\nReference: ${reference}`,
      });
      if (!dbReady()) {
        local.patchApplication(application._id, {
          mail: { to: applicationDoc.email, subject: letter.subject, body: letter.body, status: 'submitted', sent: ack.sent, error: ack.error || '' },
        }, 'system');
      } else if (ack.sent || ack.error) {
        application.mails = application.mails || [];
        application.mails.push({ to: applicationDoc.email, subject: letter.subject, body: letter.body, status: 'submitted', sent: ack.sent, error: ack.error || '', author: 'system', at: new Date() });
        await application.save();
      }
      res.status(201).json({
        success: true,
        reference: application.reference,
        message: 'Your application has been stored for the KICCPA talent team.',
        emailed: ack.sent,
      });
    } catch (error) {
      console.error('Apply error:', error);
      res.status(500).json({ error: error.message || 'Could not store the application.' });
    }
  });

  app.post('/api/staff/login', async (req, res) => {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');
    const stored = !dbReady() ? local.staffRecord(email) : await StaffUser.findOne({ email });
    if (stored && stored.active === false) {
      return res.status(403).json({ error: 'This account is blocked. Ask a super admin to restore access.' });
    }
    const user = stored && stored.active !== false ? stored : null;
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    local.logActivity({ actor: user.email, action: 'signed-in', target: user.email, detail: `${user.name} signed in` });
    res.json({ id: String(user._id), email: user.email, name: user.name, role: user.role });
  });

  app.post('/api/staff/reset', async (req, res) => {
    const token = String(req.body?.token || '');
    const password = String(req.body?.password || '');
    if (token.length < 20 || password.length < 8) {
      return res.status(400).json({ error: 'Use the link from the email and a password of at least 8 characters.' });
    }
    const hash = tokenHash(token);
    if (!dbReady()) {
      const user = local.staffByReset(hash);
      if (!user || user.active === false) return res.status(400).json({ error: 'This reset link has expired. Ask a super admin for a new one.' });
      local.patchStaff(user._id, { passwordHash: hashPassword(password), resetTokenHash: '', resetExpires: '' });
      local.logActivity({ actor: user.email, action: 'reset-password', target: user.email, detail: `${user.name} set a new password` });
      return res.json({ success: true });
    }
    const user = await StaffUser.findOne({ resetTokenHash: hash, resetExpires: { $gt: new Date() }, active: true });
    if (!user) return res.status(400).json({ error: 'This reset link has expired. Ask a super admin for a new one.' });
    user.passwordHash = hashPassword(password);
    user.resetTokenHash = '';
    user.resetExpires = undefined;
    await user.save();
    local.logActivity({ actor: user.email, action: 'reset-password', target: user.email, detail: `${user.name} set a new password` });
    res.json({ success: true });
  });

  app.get('/api/admin/recruitment/summary', staffGuard, hiringOnly, async (_req, res) => {
    if (!dbReady()) return res.json(local.summary());
    const [jobs, applications] = await Promise.all([
      Job.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      JobApplication.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ]);
    res.json({
      jobs: Object.fromEntries(jobs.map((row) => [row._id, row.count])),
      applications: Object.fromEntries(applications.map((row) => [row._id, row.count])),
      applicationTotal: applications.reduce((sum, row) => sum + row.count, 0),
      storage: 'mongodb',
    });
  });

  app.get('/api/admin/recruitment/jobs', staffGuard, hiringOnly, async (_req, res) => {
    if (!dbReady()) return res.json({ jobs: local.jobs().map((job) => ({ ...publicJob(job), applicants: job.applicants || 0, stages: job.stages || {} })), storage: 'local' });
    const jobs = await Job.find().sort({ updatedAt: -1 });
    const counts = await JobApplication.aggregate([{ $group: { _id: { job: '$job', status: '$status' }, count: { $sum: 1 } } }]);
    const byJob = {};
    counts.forEach((row) => {
      const key = String(row._id.job);
      if (!byJob[key]) byJob[key] = { applicants: 0, stages: {} };
      byJob[key].applicants += row.count;
      byJob[key].stages[row._id.status] = row.count;
    });
    res.json({
      jobs: jobs.map((job) => ({
        ...publicJob(job),
        applicants: byJob[String(job._id)]?.applicants || 0,
        stages: byJob[String(job._id)]?.stages || {},
      })),
    });
  });

  app.post('/api/admin/recruitment/jobs', staffGuard, hiringOnly, async (req, res) => {
    const saved = await saveJob(null, req.body, req.staff.email);
    if (saved.error) return res.status(400).json(saved);
    res.status(201).json({ job: publicJob(saved) });
  });

  app.patch('/api/admin/recruitment/jobs/:id', staffGuard, hiringOnly, async (req, res) => {
    const saved = await saveJob(req.params.id, req.body, req.staff.email);
    if (saved.error) return res.status(400).json(saved);
    res.json({ job: publicJob(saved) });
  });

  app.post('/api/admin/recruitment/jobs/:id/screen', staffGuard, hiringOnly, async (req, res) => {
    const job = !dbReady()
      ? local.jobs().find((item) => String(item._id) === String(req.params.id))
      : await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Role not found.' });
    const rows = !dbReady()
      ? local.applications({ job: String(job._id) })
      : await JobApplication.find({ job: job._id });
    const picked = byMatch(rows.map((row) => screenedCard(row, job))).filter((card) => card.shortlist && (card.status === 'submitted' || card.status === 'on-hold'));
    for (const card of picked) {
      const note = 'Moved to screening from the suggested shortlist.';
      if (!dbReady()) {
        local.patchApplication(card.id, { status: 'screening', note }, req.staff.email);
      } else {
        const row = rows.find((item) => String(item._id) === card.id);
        if (!row) continue;
        row.status = 'screening';
        row.notes.push({ author: req.staff.email, text: note, status: 'screening' });
        await row.save();
      }
    }
    if (picked.length) {
      local.logActivity({
        actor: req.staff.email,
        action: 'stage',
        target: String(job._id),
        detail: `Moved ${picked.length} suggested application${picked.length === 1 ? '' : 's'} for ${job.title} to screening`,
      });
    }
    res.json({ success: true, moved: picked.length });
  });

  app.get('/api/admin/recruitment/applications', staffGuard, panelOnly, async (req, res) => {
    const query = {};
    if (req.query.job) query.job = req.query.job;
    if (req.query.status && STATUSES.includes(String(req.query.status))) query.status = String(req.query.status);
    if (req.query.department && DEPARTMENTS.includes(String(req.query.department))) query.department = String(req.query.department);
    if (req.staff.role === 'manager') query.assignee = String(req.staff.email || '').toLowerCase();
    if (!dbReady()) {
      const rows = local.applications(query);
      const jobs = Object.fromEntries(local.jobs().map((job) => [String(job._id), job]));
      return res.json({ applications: visibleApplications(byMatch(rows.map((row) => screenedCard(row, jobs[String(row.job)]))), req.query) });
    }
    if (query.assignee) {
      const email = query.assignee;
      delete query.assignee;
      query.$or = [
        { 'assignments.managerEmail': email },
        { 'interviews.managerEmail': email },
        { 'interviews.interviewerEmail': email },
      ];
    }
    const rows = await JobApplication.find(query).sort({ createdAt: -1 });
    const ids = [...new Set(rows.map((row) => String(row.job)))];
    const jobs = await Job.find({ _id: { $in: ids } });
    const jobMap = Object.fromEntries(jobs.map((job) => [String(job._id), job]));
    res.json({ applications: visibleApplications(byMatch(rows.map((row) => screenedCard(row, jobMap[String(row.job)]))), req.query) });
  });

  app.get('/api/admin/recruitment/applications.csv', staffGuard, hiringOnly, async (req, res) => {
    const query = {};
    if (req.query.job) query.job = String(req.query.job);
    if (req.query.status && STATUSES.includes(String(req.query.status))) query.status = String(req.query.status);
    if (req.query.department && DEPARTMENTS.includes(String(req.query.department))) query.department = String(req.query.department);
    const rows = !dbReady()
      ? local.applications(query)
      : await JobApplication.find(query).sort({ createdAt: -1 }).select('-extraPath -documents');
    const jobs = !dbReady()
      ? Object.fromEntries(local.jobs().map((job) => [String(job._id), job]))
      : Object.fromEntries((await Job.find({ _id: { $in: [...new Set(rows.map((row) => String(row.job)))] } })).map((job) => [String(job._id), job]));
    const header = ['Reference', 'Name', 'Email', 'Phone', 'Role', 'Openings', 'Department', 'Stage', 'Match', 'Match band', 'Shortlist', 'Experience check', 'Missing requirements', 'Interview score', 'Experience years', 'Country', 'Received'];
    const linesOut = [header.join(',')];
    visibleApplications(byMatch(rows.map((row) => screenedCard(row, jobs[String(row.job)]))), req.query).forEach((row) => {
      linesOut.push([
        row.reference, row.fullName, row.email, row.phone, row.jobTitle, row.openings, row.department, row.status,
        row.screen?.score ?? '', row.screen?.band || '', row.shortlist ? `Suggested ${row.shortlistPlace}` : '',
        row.screen?.experienceNote || '', (row.screen?.missing || []).join('; '),
        row.scoreAverage || '', row.experienceYears, row.country, row.createdAt ? new Date(row.createdAt).toISOString() : '',
      ].map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','));
    });
    res.set('content-type', 'text/csv; charset=utf-8');
    res.set('content-disposition', 'attachment; filename="kiccpa-applications.csv"');
    res.send(linesOut.join('\n'));
  });

  app.get('/api/admin/recruitment/applications/:id', staffGuard, panelOnly, async (req, res) => {
    if (!dbReady()) {
      const row = local.application(req.params.id);
      if (!row) return res.status(404).json({ error: 'Application not found.' });
      if (!canOpenApplication(req, row)) return res.status(403).json({ error: 'This application is not assigned to you.' });
      local.logActivity({
        actor: req.staff.email,
        action: 'opened',
        target: row._id,
        detail: `Opened ${row.fullName} · ${row.jobTitle} · ${row.status}`,
      });
      const { resumePath, extraPath, documents, onboarding, ...safe } = row;
      const files = (Array.isArray(documents) ? documents : []).map((item) => ({ kind: item.kind, name: item.name }));
      const pack = req.staff.role === 'manager' ? null : staffOnboarding(onboarding);
      const job = local.jobs().find((item) => String(item._id) === String(row.job));
      const screen = job ? screenMatch(job, row, readResume(path.join(privateDir, path.basename(String(resumePath || ''))))) : null;
      return res.json({ application: { ...safe, id: row._id, documents: files, onboarding: pack, screen, hasResume: Boolean(resumePath), hasExtra: Boolean(row.extraName) } });
    }
    const row = await JobApplication.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Application not found.' });
    if (!canOpenApplication(req, row)) return res.status(403).json({ error: 'This application is not assigned to you.' });
    local.logActivity({
      actor: req.staff.email,
      action: 'opened',
      target: String(row._id),
      detail: `Opened ${row.fullName} · ${row.jobTitle} · ${row.status}`,
    });
    const job = await Job.findById(row.job);
    const screen = job ? screenMatch(job, row, readResume(path.join(privateDir, path.basename(String(row.resumePath || ''))))) : null;
    const body = row.toObject();
    delete body.resumePath;
    delete body.extraPath;
    res.json({
      application: {
        ...body,
        id: String(row._id),
        documents: (row.documents || []).map((item) => ({ kind: item.kind, name: item.name })),
        onboarding: req.staff.role === 'manager' ? null : staffOnboarding(row.onboarding),
        screen,
        hasResume: true,
        hasExtra: Boolean(row.extraName),
      },
    });
  });

  app.get('/api/admin/recruitment/applications/:id/letters', staffGuard, hiringOnly, async (req, res) => {
    const row = !dbReady() ? local.application(req.params.id) : await JobApplication.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Application not found.' });
    const letters = {};
    STATUSES.forEach((status) => {
      letters[status] = stageLetter({ status, name: row.fullName, jobTitle: row.jobTitle, reference: row.reference });
    });
    res.json({ letters });
  });

  app.patch('/api/admin/recruitment/applications/:id', staffGuard, panelOnly, async (req, res) => {
    const status = STATUSES.includes(req.body.status) ? req.body.status : undefined;
    const note = String(req.body.note || '').trim();
    const score = req.body.score ? cleanScore(req.body.score) : null;
    if (score?.error) return res.status(400).json(score);
    const sendEmail = req.body.sendEmail === true;
    const subject = String(req.body.subject || '').trim();
    const body = String(req.body.body || '').trim();
    if (sendEmail && (subject.length < 3 || body.length < 20)) {
      return res.status(400).json({ error: 'Write the subject and the letter before sending it.' });
    }

    let row = !dbReady() ? local.application(req.params.id) : await JobApplication.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Application not found.' });
    if (req.staff.role === 'manager') {
      if (!canOpenApplication(req, row) || status || note || sendEmail) {
        return res.status(403).json({ error: 'A department manager can score an assigned interview. Stage letters stay with HR.' });
      }
    }

    let mailResult = null;
    if (sendEmail) {
      mailResult = await sendMail({ to: row.email, subject, text: body });
    }
    const mail = sendEmail ? {
      to: row.email,
      subject,
      body,
      status: status || row.status,
      sent: Boolean(mailResult?.sent),
      error: mailResult?.error || '',
    } : null;

    if (!dbReady()) {
      row = local.patchApplication(req.params.id, { status, note, score, mail }, req.staff.email);
    } else {
      if (status) row.status = status;
      if (note) row.notes.push({ author: req.staff.email, text: note, status: row.status });
      if (score) {
        row.scores.push({ ...score, author: req.staff.email, at: new Date() });
        const total = row.scores.reduce((sum, item) => sum + Number(item.average || 0), 0);
        row.scoreAverage = Math.round((total / row.scores.length) * 10) / 10;
      }
      if (mail) row.mails.push({ ...mail, author: req.staff.email, at: new Date() });
      await row.save();
    }
    if (status) {
      local.logActivity({
        actor: req.staff.email,
        action: 'stage',
        target: String(row._id || req.params.id),
        detail: `Moved ${row.fullName || 'the candidate'} to ${row.status}`,
      });
    }
    let notified = false;
    if (req.staff.role === 'manager' && score) {
      await notifyHiringTeam(row, {
        except: req.staff.email,
        applicationId: String(row._id || req.params.id),
        title: 'Interview score saved',
        detail: `${row.fullName} · ${row.jobTitle}`,
      });
      notified = true;
    }
    res.json({ success: true, status: row.status, emailed: Boolean(mailResult?.sent), emailError: mailResult?.error || '', notified });
  });

  app.post('/api/admin/recruitment/applications/:id/assign', staffGuard, hiringOnly, async (req, res) => {
    const round = String(req.body.round || 'Interview').trim() || 'Interview';
    const managerEmail = String(req.body.managerEmail || '').trim().toLowerCase();
    const row = !dbReady() ? local.application(req.params.id) : await JobApplication.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Application not found.' });
    const manager = !dbReady()
      ? local.staff().find((user) => user.email === managerEmail && user.role === 'manager' && user.active)
      : await StaffUser.findOne({ email: managerEmail, role: 'manager', active: true }).select('name email');
    if (!manager) return res.status(400).json({ error: 'Choose an active department manager.' });
    const origin = /^https?:\/\/[^\s]+$/i.test(String(req.body.deskUrl || ''))
      ? String(req.body.deskUrl).replace(/\/$/, '')
      : 'http://localhost:3000';
    const letter = managerAssigned({
      name: manager.name,
      candidate: row.fullName,
      jobTitle: row.jobTitle,
      reference: row.reference,
      round,
      actor: req.staff.email,
      link: `${origin}/admin/recruitment/applications/${req.params.id}`,
    });
    const sent = await sendMail({ to: manager.email, subject: letter.subject, text: letter.body });
    const assignment = { round, managerName: manager.name, managerEmail: manager.email, sent: sent.sent, error: sent.error || '' };
    if (!dbReady()) {
      local.patchApplication(req.params.id, {
        assignment,
        note: `${round} assigned to ${manager.name}.`,
      }, req.staff.email);
    } else {
      if (!Array.isArray(row.assignments)) row.assignments = [];
      row.assignments.push({ ...assignment, author: req.staff.email, at: new Date() });
      row.notes.push({ author: req.staff.email, text: `${round} assigned to ${manager.name}.`, status: row.status });
      await row.save();
    }
    local.addNotice({
      email: manager.email,
      applicationId: String(row._id),
      title: `${round} assigned`,
      detail: `${row.fullName} · ${row.jobTitle}`,
    });
    local.logActivity({
      actor: req.staff.email,
      action: 'assigned',
      target: String(row._id),
      detail: `Assigned ${round} for ${row.fullName} to ${manager.name}`,
    });
    res.json({ success: true, emailed: sent.sent, emailError: sent.error || '' });
  });

  app.post('/api/admin/recruitment/applications/:id/interview', staffGuard, panelOnly, async (req, res) => {
    const round = String(req.body.round || 'Interview').trim() || 'Interview';
    const when = String(req.body.when || '').trim();
    const mode = req.body.mode === 'offline' ? 'offline' : 'online';
    const link = String(req.body.link || '').trim();
    const place = String(req.body.place || '').trim();
    const interviewer = String(req.body.interviewer || '').trim();
    const interviewerEmail = String(req.body.interviewerEmail || '').trim().toLowerCase();
    if (when.length < 4) return res.status(400).json({ error: 'Add the interview time.' });
    if (mode === 'online' && !/^https?:\/\/\S+$/i.test(link)) {
      return res.status(400).json({ error: 'Add a meeting link that starts with http, or choose an in-person meeting.' });
    }
    if (mode === 'offline' && place.length < 3) {
      return res.status(400).json({ error: 'Add the place for the in-person meeting.' });
    }
    const row = !dbReady() ? local.application(req.params.id) : await JobApplication.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Application not found.' });
    if (!canOpenApplication(req, row)) return res.status(403).json({ error: 'This application is not assigned to you.' });
    const letter = interviewInvite({
      name: row.fullName,
      jobTitle: row.jobTitle,
      reference: row.reference,
      round,
      when,
      mode,
      link,
      place,
      interviewer,
    });
    const sent = await sendMail({ to: row.email, subject: letter.subject, text: letter.body });
    let teammate = null;
    if (interviewerEmail.includes('@') && interviewerEmail !== String(req.staff.email || '').toLowerCase()) {
      const note = interviewerNote({
        interviewer: interviewer || interviewerEmail,
        candidate: row.fullName,
        jobTitle: row.jobTitle,
        reference: row.reference,
        round,
        when,
        mode,
        link,
        place,
        actor: req.staff.email,
      });
      teammate = await sendMail({ to: interviewerEmail, subject: note.subject, text: note.body });
    }
    const where = mode === 'offline' ? place : link;
    const interview = { round, when, mode, link: mode === 'online' ? link : '', place: mode === 'offline' ? place : '', interviewer, interviewerEmail, managerEmail: req.staff.role === 'manager' ? String(req.staff.email || '').toLowerCase() : interviewerEmail, sent: sent.sent, error: sent.error || '' };
    if (!dbReady()) {
      local.patchApplication(req.params.id, {
        interview,
        note: `${round} set for ${when}. ${mode === 'offline' ? 'In person' : 'Online'}: ${where}${interviewer ? ` with ${interviewer}` : ''}.`,
        mail: { to: row.email, subject: letter.subject, body: letter.body, status: row.status, sent: sent.sent, error: sent.error || '' },
      }, req.staff.email);
    } else {
      if (!Array.isArray(row.interviews)) row.interviews = [];
      row.interviews.push({ ...interview, author: req.staff.email, at: new Date() });
      row.notes.push({ author: req.staff.email, text: `${round} set for ${when}. ${mode === 'offline' ? 'In person' : 'Online'}: ${where}`, status: row.status });
      row.mails.push({ to: row.email, subject: letter.subject, body: letter.body, status: row.status, sent: sent.sent, error: sent.error || '', author: req.staff.email, at: new Date() });
      await row.save();
    }
    local.addNotice({
      email: req.staff.role === 'manager' ? String(req.staff.email || '').toLowerCase() : (interviewerEmail || String(req.staff.email || '').toLowerCase()),
      applicationId: String(row._id),
      title: mode === 'offline' ? `${round} set in person` : `${round} meeting sent`,
      detail: `${row.fullName} · ${when}`,
    });
    local.logActivity({
      actor: req.staff.email,
      action: 'interview',
      target: String(row._id),
      detail: `Sent ${round} (${mode}) to ${row.fullName} for ${when}`,
    });
    res.json({ success: true, emailed: sent.sent, emailError: sent.error || '', teammateEmailed: Boolean(teammate?.sent) });
  });

  app.get('/api/admin/recruitment/applications/:id/file/:kind', staffGuard, panelOnly, async (req, res) => {
    const row = !dbReady() ? local.application(req.params.id) : await JobApplication.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Application not found.' });
    if (!canOpenApplication(req, row)) return res.status(403).json({ error: 'This application is not assigned to you.' });
    const kind = req.params.kind;
    const offerFile = Array.isArray(row.onboarding?.documents) ? row.onboarding.documents.find((item) => item.kind === kind) : null;
    if (offerFile && !HIRING_ROLES.includes(req.staff.role)) return res.status(403).json({ error: 'Joining documents are limited to HR and admin.' });
    const attached = offerFile || (Array.isArray(row.documents) ? row.documents.find((item) => item.kind === kind) : null);
    const filename = kind === 'extra' ? row.extraPath : kind === 'resume' ? row.resumePath : attached?.path;
    const downloadName = kind === 'extra' ? row.extraName : kind === 'resume' ? row.resumeName : attached?.name;
    if (!filename) return res.status(404).json({ error: 'File not found.' });
    const root = path.resolve(privateDir);
    const full = path.resolve(root, path.basename(filename));
    if (!full.startsWith(root) || !fs.existsSync(full)) return res.status(404).json({ error: 'File not found.' });
    res.download(full, downloadName || path.basename(full));
  });

  app.post('/api/admin/recruitment/applications/:id/onboarding', staffGuard, hiringOnly, async (req, res) => {
    const row = !dbReady() ? local.application(req.params.id) : await JobApplication.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Application not found.' });
    if (!['offer', 'hired'].includes(row.status)) {
      return res.status(400).json({ error: 'Move the application to offer before the joining pack.' });
    }
    if (row.onboarding?.status === 'confirmed') {
      return res.status(400).json({ error: 'The joining date is already confirmed.' });
    }
    const documentsRequired = (Array.isArray(req.body.documents) ? req.body.documents : []).map((item) => String(item)).filter((item) => OFFER_DOCS.includes(item));
    const earliestJoin = isoDate(req.body.earliestJoin);
    const latestJoin = isoDate(req.body.latestJoin);
    if (earliestJoin && latestJoin && earliestJoin > latestJoin) {
      return res.status(400).json({ error: 'The earliest joining date must be on or before the latest.' });
    }
    const token = crypto.randomBytes(24).toString('hex');
    const origin = /^https?:\/\/[^\s]+$/i.test(String(req.body.deskUrl || '')) ? String(req.body.deskUrl).replace(/\/$/, '') : 'http://localhost:3000';
    const link = `${origin}/offer/${token}`;
    const next = mergeOnboarding(row.onboarding, {
      tokenHash: tokenHash(token),
      sentAt: new Date().toISOString(),
      sentBy: req.staff.email,
      status: 'sent',
      earliestJoin,
      latestJoin,
      documentsRequired,
    });
    const letter = joiningPack({
      name: row.fullName,
      jobTitle: row.jobTitle,
      reference: row.reference,
      link,
      earliest: earliestJoin,
      latest: latestJoin,
    });
    const sent = await sendMail({ to: row.email, subject: letter.subject, text: letter.body });
    if (!dbReady()) {
      local.patchApplication(req.params.id, {
        onboardingReplace: next,
        note: 'Sent the private joining pack.',
        mail: { to: row.email, subject: letter.subject, body: letter.body, status: row.status, sent: sent.sent, error: sent.error || '' },
      }, req.staff.email);
    } else {
      row.onboarding = next;
      row.markModified('onboarding');
      row.notes.push({ author: req.staff.email, text: 'Sent the private joining pack.', status: row.status });
      row.mails.push({ to: row.email, subject: letter.subject, body: letter.body, status: row.status, sent: sent.sent, error: sent.error || '', author: req.staff.email, at: new Date() });
      await row.save();
    }
    local.logActivity({ actor: req.staff.email, action: 'onboarding', target: String(row._id), detail: `Sent the joining pack to ${row.fullName}` });
    res.json({ success: true, emailed: sent.sent, emailError: sent.error || '', link: sent.sent ? '' : link });
  });

  app.post('/api/admin/recruitment/applications/:id/onboarding/confirm', staffGuard, hiringOnly, async (req, res) => {
    const row = !dbReady() ? local.application(req.params.id) : await JobApplication.findById(req.params.id);
    if (!row?.onboarding) return res.status(400).json({ error: 'Send the joining pack first.' });
    if (row.onboarding.decision !== 'accept' || row.onboarding.status === 'confirmed') {
      return res.status(400).json({ error: row.onboarding.status === 'confirmed' ? 'The joining date is already confirmed.' : 'The candidate has not accepted the pack yet.' });
    }
    const missingPolicy = OFFER_POLICIES.some((key) => !row.onboarding.policies?.[key]);
    const uploaded = new Set((row.onboarding.documents || []).map((item) => item.kind));
    const missingDoc = (row.onboarding.documentsRequired || []).find((kind) => !uploaded.has(kind));
    if (missingPolicy || missingDoc) return res.status(400).json({ error: 'Policies or required documents are still missing.' });
    const confirmedJoin = isoDate(req.body.confirmedJoin) || row.onboarding.proposedJoin;
    if (!confirmedJoin) return res.status(400).json({ error: 'Choose the joining date to confirm.' });
    const next = mergeOnboarding(row.onboarding, {
      status: 'confirmed',
      confirmedJoin,
      confirmedBy: req.staff.email,
      confirmedAt: new Date().toISOString(),
    });
    const letter = joiningConfirmed({ name: row.fullName, jobTitle: row.jobTitle, reference: row.reference, date: confirmedJoin });
    const sent = await sendMail({ to: row.email, subject: letter.subject, text: letter.body });
    if (!dbReady()) {
      local.patchApplication(req.params.id, {
        onboardingReplace: next,
        note: `Confirmed the joining date ${confirmedJoin}.`,
        mail: { to: row.email, subject: letter.subject, body: letter.body, status: row.status, sent: sent.sent, error: sent.error || '' },
      }, req.staff.email);
    } else {
      row.onboarding = next;
      row.markModified('onboarding');
      row.notes.push({ author: req.staff.email, text: `Confirmed the joining date ${confirmedJoin}.`, status: row.status });
      row.mails.push({ to: row.email, subject: letter.subject, body: letter.body, status: row.status, sent: sent.sent, error: sent.error || '', author: req.staff.email, at: new Date() });
      await row.save();
    }
    local.logActivity({ actor: req.staff.email, action: 'joining-date', target: String(row._id), detail: `Confirmed ${row.fullName} joins on ${confirmedJoin}` });
    res.json({ success: true, emailed: sent.sent, emailError: sent.error || '' });
  });

  app.get('/api/offer/:token', async (req, res) => {
    const hash = tokenHash(req.params.token || '');
    const row = !dbReady() ? local.applicationByOfferToken(hash) : await JobApplication.findOne({ 'onboarding.tokenHash': hash });
    if (!row?.onboarding) return res.status(404).json({ error: 'This joining link is not valid.' });
    if (!offerFresh(row.onboarding) && row.onboarding.status !== 'confirmed') {
      return res.status(410).json({ error: 'This joining link has expired. Ask human resources for a new one.' });
    }
    const uploaded = new Set((row.onboarding.documents || []).map((item) => item.kind));
    res.json({
      pack: {
        jobTitle: row.jobTitle,
        reference: row.reference,
        name: row.fullName,
        earliestJoin: row.onboarding.earliestJoin || '',
        latestJoin: row.onboarding.latestJoin || '',
        proposedJoin: row.onboarding.proposedJoin || '',
        confirmedJoin: row.onboarding.confirmedJoin || '',
        decision: row.onboarding.decision || '',
        concern: row.onboarding.concern || '',
        status: row.onboarding.status,
        policies: POLICY_TEXT,
        accepted: row.onboarding.policies || {},
        documents: (row.onboarding.documentsRequired || []).map((id) => ({ id, label: OFFER_LABELS[id] || id, uploaded: uploaded.has(id) })),
        locked: row.onboarding.status === 'confirmed',
      },
    });
  });

  app.post('/api/offer/:token', upload.fields(OFFER_DOCS.map((name) => ({ name, maxCount: 1 }))), async (req, res) => {
    const hash = tokenHash(req.params.token || '');
    const row = !dbReady() ? local.applicationByOfferToken(hash) : await JobApplication.findOne({ 'onboarding.tokenHash': hash });
    if (!row?.onboarding) return res.status(404).json({ error: 'This joining link is not valid.' });
    if (row.onboarding.status === 'confirmed') return res.status(400).json({ error: 'Human resources has already confirmed this joining date.' });
    if (!offerFresh(row.onboarding)) return res.status(410).json({ error: 'This joining link has expired. Ask human resources for a new one.' });
    const decision = ['accept', 'concern', 'decline'].includes(req.body.decision) ? req.body.decision : '';
    if (!decision) return res.status(400).json({ error: 'Choose accept, a written concern, or decline.' });
    const concern = String(req.body.concern || '').trim();
    if ((decision === 'concern' || decision === 'decline') && concern.length < 20) {
      return res.status(400).json({ error: 'Write the concern, or the reason for declining, in a short paragraph.' });
    }
    let next;
    if (decision === 'accept') {
      const proposedJoin = isoDate(req.body.proposedJoin);
      if (!proposedJoin) return res.status(400).json({ error: 'Choose a joining date.' });
      if (row.onboarding.earliestJoin && proposedJoin < row.onboarding.earliestJoin) {
        return res.status(400).json({ error: `Choose a date on or after ${row.onboarding.earliestJoin}.` });
      }
      if (row.onboarding.latestJoin && proposedJoin > row.onboarding.latestJoin) {
        return res.status(400).json({ error: `Choose a date on or before ${row.onboarding.latestJoin}.` });
      }
      const policies = {};
      for (const key of OFFER_POLICIES) {
        if (req.body[key] !== 'yes') return res.status(400).json({ error: 'Confirm each policy before accepting.' });
        policies[key] = new Date().toISOString();
      }
      const incoming = [];
      const have = new Set((row.onboarding.documents || []).map((item) => item.kind));
      for (const kind of row.onboarding.documentsRequired || []) {
        const file = req.files?.[kind]?.[0];
        if (file) {
          incoming.push({ kind, path: file.filename, name: file.originalname });
          have.add(kind);
        }
        if (!have.has(kind)) return res.status(400).json({ error: `Upload ${OFFER_LABELS[kind] || kind}.` });
      }
      const documents = [
        ...(row.onboarding.documents || []).filter((item) => !incoming.some((file) => file.kind === item.kind)),
        ...incoming,
      ];
      next = mergeOnboarding(row.onboarding, {
        decision: 'accept',
        concern: '',
        proposedJoin,
        policies,
        documents,
        status: 'ready',
        submittedAt: new Date().toISOString(),
      });
    } else {
      next = mergeOnboarding(row.onboarding, {
        decision,
        concern,
        status: decision === 'decline' ? 'declined' : 'concern',
        submittedAt: new Date().toISOString(),
      });
    }
    if (!dbReady()) local.patchApplication(row._id, { onboardingReplace: next, note: `Candidate ${decision === 'accept' ? 'accepted the joining pack' : decision === 'decline' ? 'declined the offer' : 'sent a written concern'}.` }, row.email);
    else {
      row.onboarding = next;
      row.markModified('onboarding');
      row.notes.push({ author: row.email, text: `Candidate marked the joining pack as ${decision}.`, status: row.status });
      await row.save();
    }
    if (row.onboarding?.sentBy || next.sentBy) {
      const letter = joiningUpdate({
        actor: next.sentBy,
        candidate: row.fullName,
        jobTitle: row.jobTitle,
        reference: row.reference,
        decision,
        detail: decision === 'accept' ? `Proposed joining date: ${next.proposedJoin}` : concern,
      });
      await sendMail({ to: next.sentBy, subject: letter.subject, text: letter.body });
      local.addNotice({ email: next.sentBy, applicationId: String(row._id), title: `Joining pack ${decision}`, detail: `${row.fullName} · ${row.jobTitle}` });
    }
    res.json({ success: true, status: next.status });
  });

  app.get('/api/admin/recruitment/activity', staffGuard, managerOnly, (_req, res) => {
    res.json({ activity: local.activity() });
  });

  app.get('/api/admin/recruitment/staff', staffGuard, managerOnly, async (_req, res) => {
    if (!dbReady()) return res.json({ staff: local.staff(), storage: 'local' });
    const users = await StaffUser.find().sort({ createdAt: -1 }).select('-passwordHash -resetTokenHash');
    res.json({ staff: users });
  });

  app.post('/api/admin/recruitment/staff', staffGuard, superOnly, async (req, res) => {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const role = ROLES.includes(req.body.role) ? req.body.role : '';
    if (!role || name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      return res.status(400).json({ error: 'Name, a valid email, a role, and a password of at least 8 characters are required.' });
    }
    const signInUrl = /^https?:\/\/[^\s]+$/i.test(String(req.body.signInUrl || ''))
      ? String(req.body.signInUrl).replace(/\/admin\/login\/?$/i, '').replace(/\/$/, '') + '/admin/login'
      : 'http://localhost:3000/admin/login';
    const staff = { name, email, role, active: true };
    let createdId = '';
    if (!dbReady()) {
      const user = local.addStaff({ name, email, role, passwordHash: hashPassword(password), active: true });
      if (user.error) return res.status(409).json(user);
      createdId = user._id;
    } else {
      const exists = await StaffUser.findOne({ email });
      if (exists) return res.status(409).json({ error: 'That email already has an internal account.' });
      const user = await StaffUser.create({ name, email, role, passwordHash: hashPassword(password), active: true });
      createdId = String(user._id);
    }
    const letter = welcomeLetter({ name, email, roleLabel: ROLE_LABELS[role], password, signInUrl });
    const mailed = await sendMail({ to: email, subject: letter.subject, text: letter.body });
    local.logActivity({ actor: req.staff.email, action: 'created-user', target: email, detail: `Created ${name} as ${role}` });
    res.status(201).json({ staff: { ...staff, id: createdId }, emailed: mailed.sent, emailError: mailed.error || '' });
  });

  app.post('/api/admin/recruitment/staff/:id/reset-link', staffGuard, superOnly, async (req, res) => {
    const origin = /^https?:\/\/[^\s]+$/i.test(String(req.body.signInUrl || ''))
      ? String(req.body.signInUrl).replace(/\/admin\/login\/?$/i, '').replace(/\/$/, '')
      : 'http://localhost:3000';
    const token = crypto.randomBytes(24).toString('hex');
    const hash = tokenHash(token);
    const resetExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    let user;
    if (!dbReady()) {
      user = local.patchStaff(req.params.id, { resetTokenHash: hash, resetExpires: resetExpires.toISOString() });
      if (!user) return res.status(404).json({ error: 'User not found.' });
    } else {
      user = await StaffUser.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found.' });
      user.resetTokenHash = hash;
      user.resetExpires = resetExpires;
      await user.save();
    }
    const letter = resetLetter({ name: user.name, link: `${origin}/admin/reset-password?token=${token}` });
    const mailed = await sendMail({ to: user.email, subject: letter.subject, text: letter.body });
    local.logActivity({ actor: req.staff.email, action: 'reset-link', target: user.email, detail: `Sent a password reset link to ${user.name}` });
    res.json({ success: true, emailed: mailed.sent, emailError: mailed.error || '' });
  });

  app.patch('/api/admin/recruitment/staff/:id', staffGuard, superOnly, async (req, res) => {
    if (!dbReady()) {
      const changes = {};
      if (typeof req.body.active === 'boolean') {
        changes.active = req.body.active;
        const current = local.staff().find((item) => String(item._id) === req.params.id);
        if (current) {
          local.logActivity({
            actor: req.staff.email,
            action: req.body.active ? 'unblocked' : 'blocked',
            target: current.email,
            detail: `${req.body.active ? 'Restored' : 'Blocked'} access for ${current.name}`,
          });
        }
      }
      if (req.body.password && String(req.body.password).length >= 8) changes.passwordHash = hashPassword(String(req.body.password));
      const user = local.patchStaff(req.params.id, changes);
      if (!user) return res.status(404).json({ error: 'User not found.' });
      return res.json({ success: true });
    }
    const user = await StaffUser.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    if (typeof req.body.active === 'boolean') user.active = req.body.active;
    if (req.body.password && String(req.body.password).length >= 8) user.passwordHash = hashPassword(String(req.body.password));
    await user.save();
    res.json({ success: true });
  });

  app.get('/api/admin/recruitment/managers', staffGuard, hiringOnly, async (_req, res) => {
    const rows = !dbReady()
      ? local.staff().filter((user) => user.role === 'manager' && user.active)
      : await StaffUser.find({ role: 'manager', active: true }).select('name email title department');
    res.json({
      managers: rows.map((user) => ({
        name: user.name,
        email: user.email,
        title: user.title || '',
        department: user.department || '',
      })),
    });
  });

  app.get('/api/staff/me', staffGuard, async (req, res) => {
    res.json({ profile: await loadProfile(req) });
  });

  app.patch('/api/staff/me', staffGuard, async (req, res) => {
    const name = String(req.body.name || '').trim();
    const phone = String(req.body.phone || '').trim().slice(0, 40);
    const title = String(req.body.title || '').trim().slice(0, 80);
    const department = DEPARTMENTS.includes(req.body.department) ? req.body.department : '';
    if (name.length < 2) return res.status(400).json({ error: 'Enter your name.' });
    const email = String(req.staff.email || '').toLowerCase();
    if (!dbReady()) {
      const user = local.staffRecord(email);
      if (user) local.patchStaff(user._id, { name, phone, title, department });
      else local.saveProfile(email, { name, phone, title, department });
    } else {
      const user = await StaffUser.findOne({ email });
      if (user) {
        user.name = name;
        user.phone = phone;
        user.title = title;
        user.department = department;
        await user.save();
      } else local.saveProfile(email, { name, phone, title, department });
    }
    res.json({ profile: await loadProfile(req) });
  });

  app.post('/api/staff/me/password', staffGuard, async (req, res) => {
    const current = String(req.body.current || '');
    const next = String(req.body.next || '');
    if (next.length < 8) return res.status(400).json({ error: 'Use at least 8 characters.' });
    const email = String(req.staff.email || '').toLowerCase();
    if (!dbReady()) {
      const user = local.staffRecord(email);
      if (!user) return res.status(400).json({ error: 'The owner password is kept outside the desk.' });
      if (!verifyPassword(current, user.passwordHash)) return res.status(400).json({ error: 'The current password does not match.' });
      local.patchStaff(user._id, { passwordHash: hashPassword(next) });
    } else {
      const user = await StaffUser.findOne({ email });
      if (!user) return res.status(400).json({ error: 'The owner password is kept outside the desk.' });
      if (!verifyPassword(current, user.passwordHash)) return res.status(400).json({ error: 'The current password does not match.' });
      user.passwordHash = hashPassword(next);
      await user.save();
    }
    res.json({ success: true });
  });

  app.get('/api/staff/notices', staffGuard, (req, res) => {
    res.json({ notices: local.notices(req.staff.email) });
  });

  app.post('/api/staff/notices/:id/read', staffGuard, (req, res) => {
    const row = local.markNotice(req.params.id, req.staff.email);
    if (!row) return res.status(404).json({ error: 'Notice not found.' });
    res.json({ success: true });
  });
};

async function loadProfile(req) {
  const email = String(req.staff.email || '').toLowerCase();
  const user = !dbReady() ? local.staffRecord(email) : await StaffUser.findOne({ email });
  if (user) {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      title: user.title || '',
      department: user.department || '',
      owner: false,
    };
  }
  const overlay = local.profile(email) || {};
  return {
    name: overlay.name || 'Super admin',
    email,
    role: req.staff.role,
    phone: overlay.phone || '',
    title: overlay.title || '',
    department: overlay.department || '',
    owner: true,
  };
}

async function saveJob(id, body, email) {
  if (!body?.title || !body?.location || !body?.summary || !DEPARTMENTS.includes(body.department)) {
    return { error: 'Title, department, location, and summary are required.' };
  }
  const payload = {
    title: String(body.title).trim(),
    department: body.department,
    location: String(body.location).trim(),
    workplace: ['onsite', 'hybrid', 'remote'].includes(body.workplace) ? body.workplace : 'hybrid',
    employmentType: ['full-time', 'part-time', 'contract', 'internship'].includes(body.employmentType) ? body.employmentType : 'full-time',
    experienceMin: Number(body.experienceMin || 0),
    experienceMax: Number(body.experienceMax || 0),
    openings: Math.max(1, Number(body.openings || 1)),
    summary: String(body.summary).trim(),
    about: String(body.about || '').trim(),
    responsibilities: lines(body.responsibilities),
    requirements: lines(body.requirements),
    niceToHave: lines(body.niceToHave),
    benefits: lines(body.benefits),
    deadline: body.deadline ? new Date(body.deadline) : null,
    status: ['draft', 'published', 'closed'].includes(body.status) ? body.status : 'draft',
    salaryCurrency: CURRENCIES.includes(body.salaryCurrency) ? body.salaryCurrency : 'KWD',
    salaryMin: Math.max(0, Number(body.salaryMin || 0)),
    salaryMax: Math.max(0, Number(body.salaryMax || 0)),
    salaryPeriod: body.salaryPeriod === 'monthly' ? 'monthly' : 'yearly',
    managerName: String(body.managerName || '').trim(),
    managerRole: String(body.managerRole || '').trim(),
    hiringCountry: HIRING_COUNTRIES.includes(body.hiringCountry) ? body.hiringCountry : 'kuwait',
    documents: (Array.isArray(body.documents) ? body.documents : String(body.documents || '').split(',')).map((item) => String(item).trim()).filter((item) => (COUNTRY_DOCS[HIRING_COUNTRIES.includes(body.hiringCountry) ? body.hiringCountry : 'kuwait'] || []).includes(item)),
    rounds: lines(body.rounds),
  };
  if (!dbReady()) {
    const extra = id ? {} : { slug: slugify(payload.title) || `role-${Date.now().toString(36)}` };
    return local.saveJob(id, { ...payload, ...extra }, email);
  }
  if (id) {
    const job = await Job.findByIdAndUpdate(id, payload, { new: true });
    if (!job) return { error: 'Role not found.' };
    return job;
  }
  let slug = slugify(payload.title) || `role-${Date.now().toString(36)}`;
  if (await Job.findOne({ slug })) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  const count = await Job.countDocuments();
  return Job.create({
    ...payload,
    slug,
    reference: `KIC-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`,
    createdBy: email,
  });
}
