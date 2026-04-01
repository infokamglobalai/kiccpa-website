
<div align="center">

# 🌐 KICCPA — Where IT Meets AI

### Enterprise AI & Digital Solutions Platform

**KICCPA** is a production-grade enterprise platform delivering Custom Software, CRM, AI Automation, LMS, and Business Digitization services. Built with a bespoke **"Ultra" Navy & Orange** design identity, powered by a fully custom in-house CMS — zero external dependencies.

[🌍 Live Site](https://www.kiccpa.com) · [📧 Contact](mailto:info@kiccpa.com) · [🐛 Report Bug](https://github.com/infokamglobalai/kiccpa-website/issues)

</div>

---

## 📑 Table of Contents

- [About The Project](#-about-the-project)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [CMS Admin Dashboard](#-cms-admin-dashboard)
- [Features](#-features)
- [Deployment](#-deployment)
  - [AWS Amplify (Frontend)](#aws-amplify-frontend)
  - [AWS EC2 (Backend)](#aws-ec2-backend)
- [Pages & Routes](#-pages--routes)
- [Dependencies](#-dependencies)
- [Organization](#-organization)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About The Project

KICCPA serves as the primary digital presence for **KAM International Group**, delivering five core enterprise solutions:

| # | Service | Description |
|---|---|---|
| 01 | **Custom Software Development** | Scalable, secure, high-performance apps tailored to your goals |
| 02 | **CRM Solutions** | Intelligent customer engagement and sales platforms |
| 03 | **Learning Management Systems** | Digital learning ecosystems for institutions & enterprises |
| 04 | **AI & Automation Solutions** | Chatbots, predictive models, and intelligent automation |
| 05 | **Business Digitization** | Transform traditional operations into digital workflows |

### Key Highlights
- 🎨 **Ultra Premium Design** — Glassmorphism, micro-animations, Navy/Orange brand identity
- 📝 **Custom In-House CMS** — MongoDB-backed, no Sanity/Contentful/Strapi dependency
- 📹 **100MB Media Uploads** — Full image & video support via multer
- 📧 **Dual-Recipient Lead Notifications** — Emails to `info@kiccpa.com` & `info@kamglobalai.com`
- ⚡ **Offline Resilience** — Backend serves mock data when DB is unavailable

---

## 🏛️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                     │
│                                                          │
│    Next.js 16 (React 19) — TypeScript — Ultra CSS        │
│                                                          │
│    Pages: Home | About | Services | Products |           │
│           Blog | Contact | Admin CMS                     │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS
                       ▼
┌──────────────────────────────────────────────────────────┐
│              AWS AMPLIFY (Frontend Host)                  │
│                                                          │
│    • Auto CI/CD from GitHub (master branch)               │
│    • Server-Side Rendering (SSR)                          │
│    • Edge CDN + SSL Certificate                           │
│    • Env: NEXT_PUBLIC_BACKEND_URL                         │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP/HTTPS
                       ▼
┌──────────────────────────────────────────────────────────┐
│              AWS EC2 (Backend API Server)                  │
│                                                          │
│    Ubuntu 22.04 LTS                                       │
│    ┌─────────────┐  ┌──────────────┐  ┌──────────────┐   │
│    │   Nginx     │→ │  Express.js  │→ │  MongoDB     │   │
│    │  (Reverse   │  │  (Port 5000) │  │  Atlas       │   │
│    │   Proxy)    │  │              │  │              │   │
│    │  Port 80/443│  │  • REST API  │  │  • Leads     │   │
│    │  SSL/TLS    │  │  • Multer    │  │  • Posts     │   │
│    │  100MB Max  │  │  • Nodemailer│  │  • Testimon. │   │
│    └─────────────┘  └──────────────┘  └──────────────┘   │
│                                                          │
│    PM2 Process Manager (Auto-restart on crash/reboot)     │
└──────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.1 | React framework with App Router, SSR |
| `react` | 19.2.4 | UI component library |
| `typescript` | 5.x | Type safety |
| `framer-motion` | 12.38.0 | Smooth page/section animations |
| `lucide-react` | 1.7.0 | Premium icon library |
| `zod` | 4.3.6 | Form validation schemas |

### Backend
| Package | Version | Purpose |
|---|---|---|
| `express` | 5.2.1 | REST API framework |
| `mongoose` | 9.3.3 | MongoDB ODM |
| `multer` | 2.1.1 | File upload handling (100MB max) |
| `nodemailer` | 8.0.4 | SMTP email delivery |
| `cors` | 2.8.6 | Cross-origin request handling |
| `dotenv` | 17.3.1 | Environment variable management |

### Infrastructure
| Service | Purpose |
|---|---|
| AWS Amplify | Frontend hosting + CI/CD |
| AWS EC2 | Backend API server |
| MongoDB Atlas | Cloud database |
| Nginx | Reverse proxy + SSL termination |
| PM2 | Node.js process manager |
| Let's Encrypt | Free SSL certificates |
| Gmail SMTP | Lead notification emails |

---

## 📁 Project Structure

```
kiccpa-website/
│
├── 📂 src/                          # Next.js Frontend Source
│   ├── 📂 app/                      # App Router Pages
│   │   ├── 📄 page.tsx              # Home (Hero, Services Grid, Testimonials)
│   │   ├── 📄 layout.tsx            # Root layout (Navbar + Footer)
│   │   ├── 📂 about/
│   │   │   └── 📄 page.tsx          # Company story, team, mission
│   │   ├── 📂 services/
│   │   │   └── 📄 page.tsx          # Service cards + "How We Deliver" timeline
│   │   ├── 📂 products/
│   │   │   └── 📄 page.tsx          # Product showcase (EduAiTutors, etc.)
│   │   ├── 📂 blog/
│   │   │   ├── 📄 page.tsx          # Blog listing grid (fetches from API)
│   │   │   └── 📂 [slug]/
│   │   │       └── 📄 page.tsx      # Dynamic blog post detail page
│   │   ├── 📂 contact/
│   │   │   └── 📄 page.tsx          # Contact form + global office locations
│   │   └── 📂 admin/
│   │       └── 📂 posts/
│   │           └── 📄 page.tsx      # CMS Admin Dashboard (Posts + Testimonials)
│   │
│   ├── 📂 components/               # Reusable UI Components
│   │   ├── 📄 Navbar.tsx            # Sticky navigation with mobile menu
│   │   ├── 📄 Footer.tsx            # Footer with contact info
│   │   └── 📂 animations/
│   │       └── 📄 FadeIn.tsx        # Scroll-triggered fade-in wrapper
│   │
│   └── 📂 lib/                      # Utilities & Server Actions
│       ├── 📄 actions.ts            # Contact form server action (POST /api/leads)
│       └── 📄 auth.ts               # Auth utilities
│
├── 📂 backend/                      # Express.js Backend API
│   ├── 📄 index.js                  # Main server (Routes, Middleware, SMTP)
│   ├── 📂 models/                   # Mongoose Schemas
│   │   ├── 📄 Lead.js               # Contact form submissions
│   │   ├── 📄 Post.js               # Blog/Insights articles
│   │   └── 📄 Testimonial.js        # Customer testimonials
│   ├── 📄 package.json              # Backend dependencies
│   └── 📄 .env                      # Backend environment (gitignored)
│
├── 📂 public/                       # Static Assets
│   ├── 📂 images/                   # Hero images, logos, team photos
│   │   ├── 📄 Demo.mp4              # Product demo video
│   │   ├── 📄 logo.png              # KICCPA logo
│   │   └── 📄 ...                   # Page-specific hero banners
│   └── 📂 uploads/                  # User-uploaded media (via CMS)
│
├── 📄 package.json                  # Frontend dependencies
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 next.config.ts                # Next.js configuration
├── 📄 .env                          # Frontend environment (gitignored)
└── 📄 README.md                     # This file
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Installation |
|---|---|---|
| Node.js | 20+ | [nodejs.org](https://nodejs.org/) |
| npm | 10+ | Comes with Node.js |
| MongoDB | Atlas or Local | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/infokamglobalai/kiccpa-website.git
cd kiccpa-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env and set NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Start development server
npm run dev
```

> Frontend runs at **http://localhost:3000**

### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
nano .env
# Add your MongoDB URI, SMTP credentials (see Environment Variables section)

# Create uploads directory
mkdir -p ../public/uploads

# Start development server
npm run dev
```

> Backend API runs at **http://localhost:5000**

### Production Build

```bash
# Frontend
npm run build    # Generates .next/ directory
npm start        # Starts production server

# Backend
npm start        # Runs node index.js
```

---

## 🔐 Environment Variables

### Frontend `.env`

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | ✅ | Backend API base URL | `http://localhost:5000` |

### Backend `backend/.env`

| Variable | Required | Description | Example |
|---|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/kiccpa` |
| `PORT` | ❌ | Server port (default: 5000) | `5000` |
| `SMTP_HOST` | ✅ | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | ✅ | SMTP server port | `587` |
| `SMTP_USER` | ✅ | SMTP email address | `your-email@gmail.com` |
| `SMTP_PASS` | ✅ | SMTP app password | `"abcd efgh ijkl mnop"` |
| `ADMIN_EMAIL` | ❌ | Admin notification email | `admin@company.com` |

> ⚠️ **Security**: Never commit `.env` files to Git. Both are listed in `.gitignore`.

---

## 📡 API Reference

Base URL: `http://localhost:5000` (dev) | `https://api.kiccpa.com` (production)

### Health Check

```http
GET /health
```

**Response:** `KICCPA Backend is alive! 🚀`

---

### Posts (Blog/Insights)

#### Get All Posts

```http
GET /api/posts
```

**Response:**
```json
[
  {
    "_id": "664a1b2c3d4e5f6a7b8c9d0e",
    "title": "AI in Enterprise Education",
    "slug": "ai-in-enterprise-education",
    "category": "AI Automation",
    "author": "KICCPA Team",
    "excerpt": "How AI is transforming...",
    "content": "<h3>Introduction</h3><p>...</p>",
    "imageUrl": "/uploads/1711234567890.jpg",
    "videoUrl": "",
    "date": "2026-03-31T10:00:00.000Z"
  }
]
```

#### Get Single Post

```http
GET /api/posts/:slug
```

#### Create Post

```http
POST /api/posts
Content-Type: application/json

{
  "title": "My Article",
  "slug": "my-article",
  "category": "AI Automation",
  "author": "KICCPA Team",
  "excerpt": "Brief summary...",
  "content": "<p>Full HTML content</p>",
  "imageUrl": "/uploads/image.jpg",
  "videoUrl": "/uploads/video.mp4"
}
```

#### Delete Post

```http
DELETE /api/posts/:id
```

---

### Testimonials

#### Get All Testimonials

```http
GET /api/testimonials
```

**Response:**
```json
[
  {
    "_id": "664a1b2c3d4e5f6a7b8c9d0f",
    "name": "John Doe",
    "role": "CTO",
    "company": "TechCorp",
    "content": "KICCPA transformed our...",
    "image": "/uploads/avatar.jpg"
  }
]
```

#### Create Testimonial

```http
POST /api/testimonials
Content-Type: application/json

{
  "name": "Jane Smith",
  "role": "VP Engineering",
  "company": "InnovateCo",
  "content": "Outstanding work...",
  "image": "/uploads/avatar.jpg"
}
```

#### Delete Testimonial

```http
DELETE /api/testimonials/:id
```

---

### File Upload

```http
POST /api/upload
Content-Type: multipart/form-data

file: <binary>
```

**Response:**
```json
{
  "url": "/uploads/1711234567890.jpg"
}
```

> **Limits:** Max file size `100MB`. Supports images (`.jpg`, `.png`, `.webp`) and videos (`.mp4`, `.webm`).

---

### Lead Submission (Contact Form)

```http
POST /api/leads
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice@company.com",
  "scope": "Software Development",
  "message": "We need a custom CRM..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Inquiry received and team notified!"
}
```

> Sends email notifications to both `info@kiccpa.com` and `info@kamglobalai.com`.

---

## 📊 CMS Admin Dashboard

Access the built-in content management system at `/admin/posts`.

### Features
| Feature | Description |
|---|---|
| **Multi-Tab Interface** | Switch between "Insights & Blog" and "Testimonials" tabs |
| **Rich Post Editor** | Title, slug (auto-generated), category, author, excerpt, HTML content |
| **Media Upload** | Drag-and-drop image/video uploads (up to 100MB) |
| **Testimonial Manager** | Add customer reviews with name, role, company, avatar |
| **One-Click Delete** | Remove posts or testimonials instantly |
| **Live Preview** | "View" link opens the published article in a new tab |

### Supported Categories
- AI Automation
- EdTech Growth
- Agile Dev
- Company News

---

## ✨ Features

### 🎨 Design & UX
- **Ultra Premium Identity** — Curated Navy (#1B4370) + Orange (#FF823F) palette
- **Glassmorphism Cards** — Frosted glass effects with depth shadows
- **Micro-Animations** — Scroll-triggered reveals, hover escalations, parallax
- **Interactive Timeline** — "How We Deliver" section with animated step-through
- **Video Modal** — Full-screen product demo player overlay
- **Responsive Design** — Pixel-perfect on all devices (320px → 4K)

### 📝 Content Management
- **Zero External Dependencies** — No Sanity, Contentful, or Strapi required
- **Custom Admin Panel** — Built-in at `/admin/posts`
- **Dynamic Blog** — Articles fetched from MongoDB, rendered with Next.js
- **Testimonial Carousel** — Auto-populated from the database on the Home page

### 📧 Lead Generation
- **Validated Contact Form** — Zod schema validation (server-side)
- **Dual Email Delivery** — Simultaneous notifications to two recipients
- **DB Persistence** — All leads saved to MongoDB for future CRM integration
- **Graceful Fallback** — User-friendly error messages on connection failure

### ⚡ Performance & Reliability
- **Offline Resilience** — Mock data layer when MongoDB is unreachable
- **SSR Optimized** — Server-side rendering via Next.js App Router
- **PM2 Process Management** — Auto-restart, crash recovery, log management
- **Nginx Reverse Proxy** — Load balancing, SSL termination, 100MB body limit

---

## 🌐 Deployment

### AWS Amplify (Frontend)

1. Connect your GitHub repository to AWS Amplify
2. Select the `master` branch
3. Build settings (auto-detected):
   - **Build command:** `npm run build`
   - **Output directory:** `.next`
4. Add environment variable:
   - `NEXT_PUBLIC_BACKEND_URL` = `http://<EC2_PUBLIC_IP>`
5. Deploy — Amplify handles SSL, CDN, and CI/CD automatically

### AWS EC2 (Backend)

```bash
# 1. Launch Ubuntu 22.04 LTS (t3.micro or t3.small)
# 2. SSH into instance

# 3. Install dependencies
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2

# 4. Clone and setup
cd /home/ubuntu
git clone https://github.com/infokamglobalai/kiccpa-website.git
cd kiccpa-website/backend
npm install
mkdir -p ../public/uploads
nano .env  # Add your credentials

# 5. Start with PM2
pm2 start index.js --name "kiccpa-backend"
pm2 save && pm2 startup

# 6. Configure Nginx (reverse proxy with 100MB upload limit)
# 7. Install SSL with Certbot
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.kiccpa.com
```

### Security Group (Firewall)

| Port | Protocol | Source | Purpose |
|---|---|---|---|
| 22 | TCP | Your IP | SSH access |
| 80 | TCP | Anywhere | HTTP (redirects to HTTPS) |
| 443 | TCP | Anywhere | HTTPS |

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero banner, services grid, testimonials, video modal |
| `/about` | About | Company story, mission, team, global offices |
| `/services` | Services | 5 service cards + "How We Deliver" interactive timeline |
| `/products` | Products | Product showcase (EduAiTutors, etc.) |
| `/blog` | Blog | Grid of Insights articles (fetched from MongoDB) |
| `/blog/:slug` | Blog Post | Full article with hero image/video + HTML content |
| `/contact` | Contact | Validated inquiry form + office locations |
| `/admin/posts` | Admin CMS | Content management dashboard (Posts + Testimonials) |

---

## 📦 Dependencies

### Frontend (`package.json`)

```json
{
  "next": "16.2.1",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "framer-motion": "^12.38.0",
  "lucide-react": "^1.7.0",
  "zod": "^4.3.6",
  "typescript": "^5"
}
```

### Backend (`backend/package.json`)

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.3.3",
  "multer": "^2.1.1",
  "nodemailer": "^8.0.4",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1"
}
```

---

## 🏢 Organization

<div align="center">

### **KAM International Group**

| Office | Location | Contact |
|---|---|---|
| 🇰🇼 **KAM Groups HQ** | Kuwait City, Kuwait | info@kiccpa.com |
| 🇮🇳 **KAM Global AI** | Bangalore, India | info@kamglobalai.com |

### Sister Products

| Product | Description | Link |
|---|---|---|
| **EduAiTutors** | AI-Powered Learning Ecosystem | [eduaitutors.com](https://www.eduaitutors.com) |
| **KAM Global AI** | Digital & AI Media Solutions | [kamglobalai.com](https://www.kamglobalai.com) |

</div>

---

## 🤝 Contributing

This is a proprietary project. Contributions are limited to authorized team members.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

**Proprietary** — © 2026 KAM International Group. All rights reserved.

This software and its source code are the property of KAM International Group. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

---

<div align="center">

**Built with ❤️ by [KAM Global AI](https://www.kamglobalai.com)**

[⬆ Back to Top](#-kiccpa--where-it-meets-ai)

</div>
