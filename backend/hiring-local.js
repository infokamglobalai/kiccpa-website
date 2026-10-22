const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const file = path.join(__dirname, 'private', 'hiring.json');

function empty() {
  return { jobs: [], applications: [], staff: [], activity: [], notices: [], profiles: [] };
}

function read() {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(data.jobs)) data.jobs = [];
    if (!Array.isArray(data.applications)) data.applications = [];
    if (!Array.isArray(data.staff)) data.staff = [];
    if (!Array.isArray(data.activity)) data.activity = [];
    if (!Array.isArray(data.notices)) data.notices = [];
    if (!Array.isArray(data.profiles)) data.profiles = [];
    return data;
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

function open(job) {
  if (job.status !== 'published') return false;
  if (job.deadline && new Date(job.deadline) < new Date()) return false;
  return true;
}

module.exports = {
  publishedJobs(department) {
    return read().jobs.filter((job) => open(job) && (!department || job.department === department));
  },
  openJob(slug) {
    return read().jobs.find((job) => job.slug === slug && job.status === 'published') || null;
  },
  duplicate(jobId, email) {
    return read().applications.find((row) => row.job === jobId && row.email === email) || null;
  },
  addApplication(doc) {
    const data = read();
    const row = { ...doc, _id: id(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    data.applications.unshift(row);
    write(data);
    return row;
  },
  staffByEmail(email) {
    return read().staff.find((user) => user.email === email && user.active) || null;
  },
  staffRecord(email) {
    return read().staff.find((user) => user.email === email) || null;
  },
  summary() {
    const data = read();
    const jobs = {};
    const applications = {};
    data.jobs.forEach((job) => { jobs[job.status] = (jobs[job.status] || 0) + 1; });
    data.applications.forEach((row) => { applications[row.status] = (applications[row.status] || 0) + 1; });
    return { jobs, applications, applicationTotal: data.applications.length, storage: 'local' };
  },
  jobs() {
    const data = read();
    return data.jobs.map((job) => {
      const rows = data.applications.filter((row) => row.job === job._id);
      const stages = {};
      rows.forEach((row) => { stages[row.status] = (stages[row.status] || 0) + 1; });
      return { ...job, applicants: rows.length, stages };
    });
  },
  saveJob(existingId, payload, email) {
    const data = read();
    if (existingId) {
      const index = data.jobs.findIndex((job) => job._id === existingId);
      if (index < 0) return { error: 'Role not found.' };
      data.jobs[index] = { ...data.jobs[index], ...payload, updatedAt: new Date().toISOString() };
      write(data);
      return data.jobs[index];
    }
    let slug = payload.slug || `role-${Date.now().toString(36)}`;
    if (data.jobs.some((job) => job.slug === slug)) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
    const job = {
      ...payload,
      _id: id(),
      slug,
      reference: `KIC-${new Date().getFullYear()}-${String(data.jobs.length + 1).padStart(3, '0')}`,
      createdBy: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.jobs.unshift(job);
    write(data);
    return job;
  },
  applications(query) {
    return read().applications.filter((row) => {
      if (query.job && row.job !== query.job) return false;
      if (query.status && row.status !== query.status) return false;
      if (query.department && row.department !== query.department) return false;
      if (query.assignee && !assigned(row, query.assignee)) return false;
      return true;
    });
  },
  application(applicationId) {
    return read().applications.find((row) => row._id === applicationId) || null;
  },
  applicationByOfferToken(hash) {
    return read().applications.find((row) => row.onboarding && row.onboarding.tokenHash === hash) || null;
  },
  patchApplication(applicationId, patch, author) {
    const data = read();
    const row = data.applications.find((item) => item._id === applicationId);
    if (!row) return null;
    if (!Array.isArray(row.notes)) row.notes = [];
    if (!Array.isArray(row.scores)) row.scores = [];
    if (!Array.isArray(row.mails)) row.mails = [];
    if (patch.status) row.status = patch.status;
    if (patch.note) row.notes.push({ author, text: patch.note, status: row.status, at: new Date().toISOString() });
    if (patch.score) {
      row.scores.push({ ...patch.score, author, at: new Date().toISOString() });
      const total = row.scores.reduce((sum, item) => sum + Number(item.average || 0), 0);
      row.scoreAverage = Math.round((total / row.scores.length) * 10) / 10;
    }
    if (patch.mail) row.mails.push({ ...patch.mail, author, at: new Date().toISOString() });
    if (patch.interview) {
      if (!Array.isArray(row.interviews)) row.interviews = [];
      row.interviews.push({ ...patch.interview, author, at: new Date().toISOString() });
    }
    if (patch.assignment) {
      if (!Array.isArray(row.assignments)) row.assignments = [];
      row.assignments.push({ ...patch.assignment, author, at: new Date().toISOString() });
    }
    if (patch.onboardingReplace) row.onboarding = patch.onboardingReplace;
    row.updatedAt = new Date().toISOString();
    write(data);
    return row;
  },
  staff() {
    return read().staff.map(({ passwordHash, resetTokenHash, ...user }) => user);
  },
  logActivity(entry) {
    const data = read();
    if (!Array.isArray(data.activity)) data.activity = [];
    if (entry.action === 'opened') {
      const recent = data.activity.find((item) => item.actor === entry.actor && item.action === 'opened' && item.target === entry.target);
      if (recent && Date.now() - new Date(recent.at).getTime() < 15 * 60 * 1000) return recent;
    }
    const row = { ...entry, _id: id(), at: new Date().toISOString() };
    data.activity.unshift(row);
    data.activity = data.activity.slice(0, 200);
    const person = data.staff.find((user) => user.email === entry.actor);
    if (person) person.lastSeen = row.at;
    write(data);
    return row;
  },
  activity() {
    const data = read();
    return Array.isArray(data.activity) ? data.activity : [];
  },
  staffByReset(hash) {
    const now = Date.now();
    return read().staff.find((user) => user.resetTokenHash === hash && user.resetExpires && new Date(user.resetExpires).getTime() > now) || null;
  },
  addStaff(user) {
    const data = read();
    if (data.staff.some((item) => item.email === user.email)) return { error: 'That email already has an internal account.' };
    const row = { ...user, _id: id(), createdAt: new Date().toISOString() };
    data.staff.unshift(row);
    write(data);
    return row;
  },
  patchStaff(staffId, changes) {
    const data = read();
    const user = data.staff.find((item) => item._id === staffId);
    if (!user) return null;
    Object.assign(user, changes);
    write(data);
    return user;
  },
  profile(email) {
    return read().profiles.find((item) => item.email === String(email || '').toLowerCase()) || null;
  },
  saveProfile(email, changes) {
    const data = read();
    const key = String(email || '').toLowerCase();
    let row = data.profiles.find((item) => item.email === key);
    if (!row) {
      row = { email: key };
      data.profiles.push(row);
    }
    Object.assign(row, changes, { email: key });
    write(data);
    return row;
  },
  addNotice(notice) {
    const data = read();
    const row = { ...notice, _id: id(), read: false, at: new Date().toISOString() };
    data.notices.unshift(row);
    data.notices = data.notices.slice(0, 200);
    write(data);
    return row;
  },
  notices(email) {
    const key = String(email || '').toLowerCase();
    return read().notices.filter((item) => item.email === key);
  },
  markNotice(noticeId, email) {
    const data = read();
    const row = data.notices.find((item) => item._id === noticeId && item.email === String(email || '').toLowerCase());
    if (!row) return null;
    row.read = true;
    write(data);
    return row;
  },
};

function assigned(row, email) {
  const who = String(email || '').toLowerCase();
  const lists = [row.assignments, row.interviews];
  return lists.some((list) => Array.isArray(list) && list.some((item) => {
    const manager = String(item.managerEmail || '').toLowerCase();
    const interviewer = String(item.interviewerEmail || '').toLowerCase();
    return manager === who || interviewer === who;
  }));
}
