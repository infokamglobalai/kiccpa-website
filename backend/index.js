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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// MongoDB Connection
if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('admin:PASS')) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));
} else {
  console.warn('⚠️ No valid MONGODB_URI found. Running in mock/offline mode.');
}

// Models
const Lead = require('./models/Lead');
const Post = require('./models/Post');
const Testimonial = require('./models/Testimonial');

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

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error('❌ Mail Error:', err);
        else console.log('📧 Lead Alert Sent:', info.response);
      });
    }

    res.status(201).json({ success: true, message: 'Inquiry received and team notified!' });
  } catch (error) {
    console.error('Back-end error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.get('/health', (req, res) => res.send('KICCPA Backend is alive! 🚀'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
