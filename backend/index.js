const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const fs = require('fs');
const uploadDir = path.join(__dirname, '../frontend/public/uploads/');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// MongoDB Connection — listen for runtime errors so Node does not exit on unhandled 'error'
mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB runtime error:', err.message);
});

const mongoConnectOptions = {
  serverSelectionTimeoutMS: 15_000,
};

if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('admin:PASS')) {
  mongoose
    .connect(process.env.MONGODB_URI, mongoConnectOptions)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));
} else {
  console.warn('⚠️ No valid MONGODB_URI found. Running in mock/offline mode.');
}

// Models
const Lead = require('./models/Lead');
const DemoBooking = require('./models/DemoBooking');
const Post = require('./models/Post');
const Testimonial = require('./models/Testimonial');
const Resource = require('./models/Resource');
const SchoolSurvey = require('./models/SchoolSurvey');

function generateDemoReference() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DEMO-${t}-${r}`;
}

function generateSurveyReference() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `EDU-${t}-${r}`;
}

function smtpConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --- MEDIA UPLOAD ROUTE ---
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// --- TESTIMONIAL ROUTES ---
app.get('/api/testimonials', async (req, res) => {
  try {
    const ts = await Testimonial.find().sort({ createdAt: -1 });
    res.json(ts);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const t = new Testimonial(req.body);
    await t.save();
    res.status(201).json(t);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

app.delete('/api/testimonials/:id', async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- RESOURCE ROUTES ---
app.get('/api/resources', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/resources', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: 'Database unavailable — fix MONGODB_URI or start MongoDB, then try again.',
      });
    }
    const resource = new Resource(req.body);
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/resources/:id', async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

let mockPosts = [{
  _id: "1",
  title: "The Future of AI Automation in Enterprise Ecosystems",
  slug: "future-of-ai-automation-enterprise",
  category: "AI Automation",
  author: "KICCPA Team",
  date: new Date(),
  excerpt: "Discover how Next-Generation Artificial Intelligence platforms are transforming legacy systems into predictive, scalable powerhouses...",
  content: "<p class='mb-4'>The integration of Artificial Intelligence into enterprise operations is no longer an emerging trend; it is a foundational necessity for any organization looking to thrive in the modern commercial landscape.</p><p class='mb-4'>At KAM International Group and our dedicated technology hub, <strong>KICCPA</strong>, we have observed a massive shift towards <em>End-to-End Operational Digitization</em>. This goes beyond simple automation—it is about creating predictive, resilient architectures.</p><h3 class='text-2xl font-bold mt-8 mb-4 text-slate-800'>Why Legacy Systems Must Evolve</h3><p class='mb-4'>Traditional ERP and CRM systems are robust but often rigid. The operational overhead of maintaining monolithic architectures stifles agility. Our approach focuses on seamless legacy system integrations, mapping state-of-the-art AI solutions into these existing frameworks with zero downtime.</p><h3 class='text-2xl font-bold mt-8 mb-4 text-slate-800'>The Role of Predictive Analytics</h3><p class='mb-4'>Imagine your data actively working for you. With custom Deep Learning Maps and fully trained Large Language Model (LLM) RAG pipelines, enterprises can leverage their passive data to uncover hidden efficiencies. Predictive analytics allows businesses to forecast trends, automate complex workflows, and drastically reduce human error.</p><h3 class='text-2xl font-bold mt-8 mb-4 text-slate-800'>Looking Ahead: The EduAiTutors Paradigm</h3><p class='mb-4'>Products like our flagship <strong>EduAiTutors Advanced Learning Ecosystem</strong> demonstrate the power of AI in sector-specific applications. Looking ahead, the focus is on creating organizations that are inherently agile and intelligent, blurring the lines between raw technology and elite business strategy.</p><p class='mb-4 text-slate-500 italic mt-6'>Partner with KICCPA today to start your digital transformation journey.</p>",
  imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
  published: true
}];

// --- BLOG ROUTES ---
app.get('/api/posts', async (req, res) => {
  if (mongoose.connection.readyState !== 1) return res.json(mockPosts);
  try {
    const posts = await Post.find({ published: true }).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/posts/:slug', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    const post = mockPosts.find(p => p.slug === req.params.slug);
    return post ? res.json(post) : res.status(404).json({ message: 'Post not found' });
  }
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/posts', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    const newPost = { _id: Date.now().toString(), date: new Date(), ...req.body };
    mockPosts.unshift(newPost);
    return res.status(201).json(newPost);
  }
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Mail Transporter Setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Routes
app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, scope, message } = req.body;
    
    // Save to DB only if connected
    if (mongoose.connection.readyState === 1) {
      const newLead = new Lead({ name, email, scope, message });
      await newLead.save();
    } else {
      console.warn('💾 DB Offline: Lead logged to console only:', { name, email });
    }
    
    console.log('📬 New Lead Received:', name);

    // Send Notification Email
    const mailOptions = {
      from: `"KICCPA Leads" <${process.env.SMTP_USER}>`,
      to: `info@kiccpa.com, info@kamglobalai.com`,
      subject: `🚀 New Lead: ${name} (${scope})`,
      text: `You have a new inquiry from the KICCPA website.\n\nName: ${name}\nEmail: ${email}\nScope: ${scope}\nMessage: ${message}`,
      html: `
        <h3>New Website Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Scope:</strong> ${scope}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    if (smtpConfigured()) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error('❌ Mail Error:', err);
        else console.log('📧 Lead Alert Sent:', info.response);
      });

      const ackToUser = {
        from: `"KICCPA" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'We received your message — KICCPA',
        text: `Dear ${name},\n\nThank you for contacting KICCPA. We have received your inquiry regarding "${scope}" and will respond within 4 business hours during regional business days.\n\nIf your request is urgent, you may also reach us at info@kiccpa.com or call our offices listed on kiccpa.com.\n\nKind regards,\nKICCPA Team`,
        html: `
          <div style="font-family:Georgia,serif;line-height:1.6;color:#0f2942;max-width:560px">
            <p>Dear ${escapeHtml(name)},</p>
            <p>Thank you for contacting <strong>KICCPA</strong>. We have received your inquiry regarding <strong>${escapeHtml(scope)}</strong>.</p>
            <p>Our team will respond within <strong>4 business hours</strong> during regional business days.</p>
            <p>If your request is urgent, you may also email <a href="mailto:info@kiccpa.com">info@kiccpa.com</a> or use the phone numbers on our website.</p>
            <p style="margin-top:24px">Kind regards,<br/><strong>KICCPA Team</strong></p>
          </div>`,
      };
      transporter.sendMail(ackToUser, (err) => {
        if (err) console.error('❌ Lead ack to user failed:', err);
      });
    }

    res.status(201).json({ success: true, message: 'Inquiry received and team notified!' });
  } catch (error) {
    console.error('Back-end error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const DEMO_TIME_LABEL = {
  morning: 'Morning (approx. 9:00–12:00 local)',
  afternoon: 'Afternoon (approx. 12:00–17:00 local)',
  evening: 'Evening (approx. 17:00–20:00 local)',
  flexible: 'Flexible — we will propose slots',
};

app.post('/api/demo-bookings', async (req, res) => {
  try {
    const honeypot = req.body.company_website || req.body.website;
    if (honeypot) {
      return res.status(201).json({
        success: true,
        message: 'Thank you.',
        referenceId: generateDemoReference(),
      });
    }

    const {
      fullName,
      workEmail,
      organization,
      jobTitle,
      phone,
      countryRegion,
      productInterest,
      preferredDate,
      timePreference,
      timezone,
      goals,
    } = req.body;

    const allowedTimes = ['morning', 'afternoon', 'evening', 'flexible'];
    if (!fullName || String(fullName).trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter your full name.' });
    }
    if (!workEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(workEmail).trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid work email.' });
    }
    if (!organization || String(organization).trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter your organization name.' });
    }
    if (!countryRegion || String(countryRegion).trim().length < 1) {
      return res.status(400).json({ success: false, error: 'Please select or enter your country / region.' });
    }
    if (!productInterest || String(productInterest).trim().length < 1) {
      return res.status(400).json({ success: false, error: 'Please choose a product interest.' });
    }
    if (!goals || String(goals).trim().length < 10) {
      return res.status(400).json({ success: false, error: 'Please describe what you would like to see (at least 10 characters).' });
    }
    if (!allowedTimes.includes(timePreference)) {
      return res.status(400).json({ success: false, error: 'Please choose a time preference.' });
    }

    const pd = new Date(preferredDate);
    if (Number.isNaN(pd.getTime())) {
      return res.status(400).json({ success: false, error: 'Please choose a valid preferred date.' });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const slot = new Date(pd);
    slot.setHours(0, 0, 0, 0);
    if (slot < today) {
      return res.status(400).json({ success: false, error: 'Preferred date must be today or a future date.' });
    }

    const referenceId = generateDemoReference();

    const payload = {
      referenceId,
      fullName: String(fullName).trim(),
      workEmail: String(workEmail).trim().toLowerCase(),
      organization: String(organization).trim(),
      jobTitle: jobTitle ? String(jobTitle).trim() : '',
      phone: phone ? String(phone).trim() : '',
      countryRegion: String(countryRegion).trim(),
      productInterest: String(productInterest).trim(),
      preferredDate: pd,
      timePreference,
      timezone: timezone ? String(timezone).trim().slice(0, 120) : '',
      goals: String(goals).trim(),
      source: 'demo-page',
    };

    if (mongoose.connection.readyState === 1) {
      const doc = new DemoBooking(payload);
      await doc.save();
    } else {
      console.warn('💾 DB Offline: Demo booking logged:', referenceId, payload.workEmail);
    }

    const dateStr = pd.toISOString().slice(0, 10);
    const timeLabel = DEMO_TIME_LABEL[timePreference] || timePreference;

    if (smtpConfigured()) {
      const internalTo = process.env.LEADS_NOTIFY_TO || 'info@kiccpa.com, info@kamglobalai.com';
      const internalHtml = `
        <h2 style="font-family:Georgia,serif;color:#0f2942">New demo booking</h2>
        <p><strong>Reference:</strong> ${escapeHtml(referenceId)}</p>
        <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}<br/>
        <strong>Work email:</strong> ${escapeHtml(payload.workEmail)}<br/>
        <strong>Organization:</strong> ${escapeHtml(payload.organization)}<br/>
        <strong>Job title:</strong> ${escapeHtml(payload.jobTitle || '—')}<br/>
        <strong>Phone:</strong> ${escapeHtml(payload.phone || '—')}<br/>
        <strong>Country / region:</strong> ${escapeHtml(payload.countryRegion)}<br/>
        <strong>Product interest:</strong> ${escapeHtml(payload.productInterest)}</p>
        <p><strong>Preferred date:</strong> ${escapeHtml(dateStr)}<br/>
        <strong>Time preference:</strong> ${escapeHtml(timeLabel)}<br/>
        <strong>Timezone / notes:</strong> ${escapeHtml(payload.timezone || '—')}</p>
        <p><strong>Goals / focus:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(payload.goals)}</p>
      `;

      transporter.sendMail({
        from: `"KICCPA Demos" <${process.env.SMTP_USER}>`,
        to: internalTo,
        subject: `[DEMO] ${referenceId} · ${payload.organization} · ${payload.productInterest}`,
        text: `New demo request ${referenceId}\n${JSON.stringify(payload, null, 2)}`,
        html: internalHtml,
      }, (err) => {
        if (err) console.error('❌ Demo internal mail error:', err);
        else console.log('📧 Demo alert sent for', referenceId);
      });

      transporter.sendMail({
        from: `"KICCPA" <${process.env.SMTP_USER}>`,
        to: payload.workEmail,
        subject: `Demo request received — ${referenceId} · KICCPA`,
        text: `Dear ${payload.fullName},\n\nThank you for registering for a product demo with KICCPA.\n\nYour reference: ${referenceId}\nPreferred date: ${dateStr}\nTime preference: ${timeLabel}\n\nOur team will confirm your session or propose alternative times within 2 business days. If you need to reach us sooner, reply to this email or contact info@kiccpa.com.\n\nKind regards,\nKICCPA Team`,
        html: `
          <div style="font-family:Georgia,serif;line-height:1.65;color:#0f2942;max-width:580px">
            <p>Dear ${escapeHtml(payload.fullName)},</p>
            <p>Thank you for registering for a <strong>product demo</strong> with KICCPA. This message confirms that we have received your request.</p>
            <p style="background:#f0f7ff;border:1px solid rgba(27,67,112,0.15);border-radius:12px;padding:16px 18px">
              <strong>Your reference ID:</strong> ${escapeHtml(referenceId)}<br/>
              <strong>Organization:</strong> ${escapeHtml(payload.organization)}<br/>
              <strong>Preferred date:</strong> ${escapeHtml(dateStr)}<br/>
              <strong>Time preference:</strong> ${escapeHtml(timeLabel)}
            </p>
            <p>Our team will <strong>confirm your session or suggest alternative times</strong> within <strong>2 business days</strong>. Please add <a href="mailto:info@kiccpa.com">info@kiccpa.com</a> to your safe-senders list so you do not miss our reply.</p>
            <p style="margin-top:24px">Kind regards,<br/><strong>KICCPA Team</strong></p>
          </div>`,
      }, (err) => {
        if (err) console.error('❌ Demo confirmation to user failed:', err);
      });
    }

    res.status(201).json({
      success: true,
      message: 'Your demo request has been recorded. Check your email for confirmation.',
      referenceId,
    });
  } catch (error) {
    console.error('Demo booking error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, error: 'Duplicate request — please try again.' });
    }
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/api/school-surveys', async (req, res) => {
  try {
    const honeypot = req.body.company_website || req.body.website;
    if (honeypot) {
      return res.status(201).json({
        success: true,
        message: 'Thank you.',
        referenceId: generateSurveyReference(),
      });
    }

    const {
      schoolName,
      curriculum,
      curriculumOther,
      contactName,
      designation,
      mobile,
      email,
      challenges,
      challengesOther,
      goals,
      goalsOther,
      usingSystems,
      currentSystemName,
      demoSolutions,
      demoMode,
      preferredDateTime,
    } = req.body;

    if (!schoolName || String(schoolName).trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter your school name.' });
    }
    if (!contactName || String(contactName).trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter the contact person name.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    const allowedSystems = ['yes', 'no', 'unsure', ''];
    const sys = usingSystems != null ? String(usingSystems) : '';
    const usingSystemsNorm = allowedSystems.includes(sys) ? sys : '';

    const allowedDemoModes = ['online', 'onsite', 'hybrid', ''];
    const dm = demoMode != null ? String(demoMode) : '';
    const demoModeNorm = allowedDemoModes.includes(dm) ? dm : '';

    const referenceId = generateSurveyReference();

    const payload = {
      referenceId,
      schoolName: String(schoolName).trim(),
      curriculum: Array.isArray(curriculum) ? curriculum.map(String) : [],
      curriculumOther: curriculumOther ? String(curriculumOther).trim().slice(0, 200) : '',
      contactName: String(contactName).trim(),
      designation: designation ? String(designation).trim().slice(0, 120) : '',
      mobile: mobile ? String(mobile).trim().slice(0, 40) : '',
      email: String(email).trim().toLowerCase(),
      challenges: Array.isArray(challenges) ? challenges.map(String) : [],
      challengesOther: challengesOther ? String(challengesOther).trim().slice(0, 500) : '',
      goals: Array.isArray(goals) ? goals.map(String) : [],
      goalsOther: goalsOther ? String(goalsOther).trim().slice(0, 500) : '',
      usingSystems: usingSystemsNorm,
      currentSystemName: currentSystemName ? String(currentSystemName).trim().slice(0, 200) : '',
      demoSolutions: Array.isArray(demoSolutions) ? demoSolutions.map(String) : [],
      demoMode: demoModeNorm,
      preferredDateTime: preferredDateTime ? String(preferredDateTime).trim().slice(0, 300) : '',
      source: 'resources-page',
    };

    if (mongoose.connection.readyState === 1) {
      const doc = new SchoolSurvey(payload);
      await doc.save();
    } else {
      console.warn('💾 DB Offline: School survey logged:', referenceId, payload.email);
    }

    const listHtml = (label, arr) =>
      `<p><strong>${escapeHtml(label)}:</strong><br/>${arr.length ? escapeHtml(arr.join(', ')) : '—'}</p>`;

    if (smtpConfigured()) {
      const internalTo = process.env.LEADS_NOTIFY_TO || 'info@kiccpa.com, info@kamglobalai.com';
      const internalHtml = `
        <h2 style="font-family:Georgia,serif;color:#0f2942">School Digital Transformation Survey</h2>
        <p><strong>Reference:</strong> ${escapeHtml(referenceId)}</p>
        <p><strong>School:</strong> ${escapeHtml(payload.schoolName)}</p>
        ${listHtml('Curriculum', payload.curriculum)}
        <p><strong>Curriculum (other):</strong> ${escapeHtml(payload.curriculumOther || '—')}</p>
        <p><strong>Contact:</strong> ${escapeHtml(payload.contactName)} · ${escapeHtml(payload.designation || '—')}<br/>
        <strong>Mobile:</strong> ${escapeHtml(payload.mobile || '—')}<br/>
        <strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        ${listHtml('Current challenges', payload.challenges)}
        <p><strong>Challenges (other):</strong> ${escapeHtml(payload.challengesOther || '—')}</p>
        ${listHtml('Long-term goals', payload.goals)}
        <p><strong>Goals (other):</strong> ${escapeHtml(payload.goalsOther || '—')}</p>
        <p><strong>Using LMS/SMS/HRMS:</strong> ${escapeHtml(payload.usingSystems || '—')}<br/>
        <strong>Current system:</strong> ${escapeHtml(payload.currentSystemName || '—')}</p>
        ${listHtml('Demo interests', payload.demoSolutions)}
        <p><strong>Preferred demo mode:</strong> ${escapeHtml(payload.demoMode || '—')}<br/>
        <strong>Preferred date &amp; time:</strong> ${escapeHtml(payload.preferredDateTime || '—')}</p>
      `;

      transporter.sendMail(
        {
          from: `"KICCPA Resources" <${process.env.SMTP_USER}>`,
          to: internalTo,
          subject: `[EDU SURVEY] ${referenceId} · ${payload.schoolName}`,
          text: `School survey ${referenceId}\n${JSON.stringify(payload, null, 2)}`,
          html: internalHtml,
        },
        (err) => {
          if (err) console.error('❌ School survey internal mail error:', err);
          else console.log('📧 School survey alert sent for', referenceId);
        }
      );

      transporter.sendMail(
        {
          from: `"KICCPA" <${process.env.SMTP_USER}>`,
          to: payload.email,
          subject: `We received your survey — ${referenceId} · KICCPA`,
          text: `Dear ${payload.contactName},\n\nThank you for completing the KICCPA School Digital Transformation Survey.\n\nReference: ${referenceId}\n\nOur team will review your responses and contact you to arrange a demo tailored to your institution.\n\nKind regards,\nKICCPA Team`,
          html: `
          <div style="font-family:Georgia,serif;line-height:1.65;color:#0f2942;max-width:580px">
            <p>Dear ${escapeHtml(payload.contactName)},</p>
            <p>Thank you for completing the <strong>KICCPA School Digital Transformation Survey</strong>. We have received your responses.</p>
            <p style="background:#f0f7ff;border:1px solid rgba(27,67,112,0.15);border-radius:12px;padding:16px 18px">
              <strong>Reference ID:</strong> ${escapeHtml(referenceId)}<br/>
              <strong>School:</strong> ${escapeHtml(payload.schoolName)}
            </p>
            <p>Our team will review your priorities and contact you to arrange a <strong>free demo session</strong> aligned with your goals.</p>
            <p style="margin-top:24px">Kind regards,<br/><strong>KICCPA Team</strong><br/>
            <span style="font-size:0.85rem;color:#64748b">Kuwait International Company for Computer Programming Activities — Digital Transformation | AI Solutions</span></p>
          </div>`,
        },
        (err) => {
          if (err) console.error('❌ School survey confirmation to user failed:', err);
        }
      );
    }

    res.status(201).json({
      success: true,
      message:
        'Thank you. Your survey has been submitted. We will contact you to arrange a tailored demo.',
      referenceId,
    });
  } catch (error) {
    console.error('School survey error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, error: 'Duplicate submission — please try again.' });
    }
    const msg =
      error?.name === 'ValidationError' && error.errors
        ? Object.values(error.errors)
            .map((e) => e.message)
            .join(' ')
        : 'Internal Server Error';
    res.status(500).json({ success: false, error: typeof msg === 'string' ? msg.slice(0, 400) : 'Internal Server Error' });
  }
});

app.get('/health', (req, res) => res.send('KICCPA Backend is alive! 🚀'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
