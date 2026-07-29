/** LearnX product showcase + founder content (FounderMessage still imports founder exports). */

export const SEO = {
  title: "LearnX | School Management System, ERP, LMS & AI Academic Tools",
  description:
    "LearnX is a modular school ERP and LMS with white-label websites, fee management, parent portals, transport tracking, and AI question paper generation for CBSE, ICSE, and State Board schools in India.",
  keywords: [
    "LearnX",
    "school management system India",
    "school ERP",
    "school LMS",
    "AI question paper generator",
    "CBSE school software",
    "ICSE school ERP",
    "parent portal school",
    "fee management school",
    "multi-branch school software",
    "white-label school website",
    "AI Academic Studio",
  ],
} as const;

export const HERO = {
  eyebrow: "LearnX · School ERP + LMS + AI",
  headline: "The complete school operating system for modern campuses",
  subheadline:
    "One platform for academics, operations, parents, and AI teaching tools — built for CBSE, ICSE, IGCSE, and Indian State Boards.",
  primaryCta: { label: "Book a Demo", href: "/demo" },
  secondaryCta: { label: "Explore Modules", href: "#modules" },
  tertiaryCta: { label: "Request Pricing", href: "/contact" },
  trustLine: ["CBSE", "ICSE", "State Boards", "Multi-branch", "AI Academic Tools"] as const,
  image: {
    src: "/images/learnx-logo.png",
    alt: "LearnX logo — School ERP, LMS, and AI Academic Studio",
  },
} as const;

export const TRUST_STRIP = {
  title: "Trusted by schools and education groups across India",
  logos: [
    "CBSE-aligned campuses",
    "ICSE & IGCSE schools",
    "State Board institutions",
    "Multi-branch education groups",
  ] as const,
} as const;

export const WHAT_IS = {
  eyebrow: "What is LearnX",
  title: "One connected system for the entire school",
  paragraphs: [
    "LearnX is an end-to-end, multi-tenant school management platform that replaces fragmented tools — Excel sheets, WhatsApp groups, separate fee apps, stand-alone LMS, transport trackers, and exam utilities — with one connected operating system.",
    "Schools get a white-label public website, role-based admin ERP, parent and student portals, LMS academic tools, and an AI Academic Studio for question papers, lesson PPTs, and evaluation support — modular so you enable only what you need and pay for what you use.",
    "Designed for CBSE, ICSE, IGCSE, and Indian State Boards including Telangana, Karnataka, Tamil Nadu, Andhra Pradesh, Kerala, Maharashtra, and more — with multi-branch support and secure tenant data isolation for education groups.",
  ] as const,
  image: {
    src: "/images/hero_platforms.png",
    alt: "LearnX modules overview — admissions, fees, exams, transport, and teacher tools",
  },
} as const;

export const BEFORE_AFTER = {
  eyebrow: "From chaos to clarity",
  title: "Stop juggling tools. Run the campus on LearnX.",
  before: {
    title: "Before LearnX",
    items: [
      "Disconnected softwares and manual registers",
      "Fee delays and reconciliation errors",
      "WhatsApp notice chaos and missed updates",
      "Hours spent drafting papers and lesson PPTs",
      "No single principal view across academics, fees, and transport",
      "Inconsistent processes across branches",
    ] as const,
  },
  after: {
    title: "With LearnX",
    items: [
      "One login ecosystem for every stakeholder",
      "Faster operations and fewer manual errors",
      "Real-time parent updates that build trust",
      "AI paper and PPT generation for teachers",
      "Actionable leadership dashboards",
      "Standardized, board-aligned workflows at scale",
    ] as const,
  },
  image: {
    src: "/images/how_we_deliver_light.jpg",
    alt: "From manual school operations to LearnX digital platform",
  },
} as const;

export const PILLARS = [
  {
    id: "presence",
    title: "White-label school presence",
    short: "Branded website + secure admin on your school identity.",
    long: "Every campus gets a white-label public site and admin panel — logo, colours, content pages, and domain that represent the school. Builds admissions trust and keeps parent communication on-brand.",
  },
  {
    id: "erp",
    title: "Complete school operations (ERP)",
    short: "Admissions to accounting — one connected workflow.",
    long: "Student lifecycle, timetable, attendance, exams, report cards, fees, HR/payroll, transport, hostel, library, canteen, visitors, documents, and accounting — linked so data moves once and records stay audit-ready.",
  },
  {
    id: "engagement",
    title: "Parent & student engagement",
    short: "Fees, attendance, PTM, transport — in one portal.",
    long: "Parents track fees, attendance, notices, PTM slots, bus updates, and alerts. Students access resources, assessments, and results without app sprawl.",
  },
  {
    id: "ai",
    title: "AI Academic Studio",
    short: "Board-aligned papers, PPTs, evaluation support.",
    long: "Teachers generate board-aligned question papers with Bloom’s levels, difficulty mix, chapter focus, preview/edit, print-ready PDF, on-screen answer key, frequency insights, and question banks — plus lesson PPT and evaluation support.",
  },
  {
    id: "scale",
    title: "Modular + multi-branch scale",
    short: "Enable modules you need. Scale campuses securely.",
    long: "Turn on only required modules. Run multiple campuses under one organisation with clean tenant isolation and precise role permissions.",
  },
] as const;

export const AI_STUDIO = {
  eyebrow: "Key differentiator",
  title: "AI Academic Studio — built for Indian classrooms",
  lead: "Not sci-fi gimmicks. Practical teacher tools for board-aligned assessments, lesson prep, and evaluation support.",
  image: {
    src: encodeURI("/images/AI Predictive Analytics & Smart Automation.png"),
    alt: "AI question paper generator for teachers — board, grade, subject, and preview workflow",
  },
  steps: [
    { title: "Name the paper", desc: "Set assessment title, date, duration, and school header branding." },
    { title: "Board & grade", desc: "Choose CBSE, ICSE, IGCSE, or State Board and the class level." },
    { title: "Subject & chapters", desc: "Pick subjects, chapters, and sub-topics for the current academic year." },
    { title: "Difficulty & Bloom’s", desc: "Configure easy/medium/hard/mixed and taxonomy levels." },
    { title: "Distribution", desc: "Use AI-suggested question mix by assessment type — or customise." },
    { title: "Reference uploads", desc: "Upload past papers or question banks to ground generation." },
    { title: "Preview & edit", desc: "Review every item; regenerate one question or the full paper." },
    { title: "PDF, key & insights", desc: "Download print-ready PDF; view teacher-only answer key; see past-year frequency and prediction cues. Build banks (MCQ, fill-ups, VSA, short, long) for final assembly." },
  ] as const,
  extras: [
    "Lesson PPT generator",
    "Answer sheet evaluation support",
    "Proctoring support hooks",
    "School logo / header on papers",
  ] as const,
} as const;

export const MODULES = [
  { title: "Admissions & applicant pipeline", desc: "Track enquiries to enrolment with stage visibility for admissions teams." },
  { title: "Kindergarten readiness & campus visits", desc: "Schedule visits and readiness workflows for early years." },
  { title: "Student directory & 360° profiles", desc: "One student record across academics, fees, attendance, and documents." },
  { title: "Academic structure & syllabus", desc: "Map curriculum, subjects, and syllabi to your board calendar." },
  { title: "Timetable & substitution", desc: "Publish periods and fill gaps without WhatsApp scrambling." },
  { title: "Attendance + biometric support", desc: "Daily attendance with optional biometric integration." },
  { title: "Unit tests, exams, seating & grading", desc: "Plan assessments, seating, and marks in one flow." },
  { title: "Results & rankings", desc: "Publish ranks and analysis for academics and leadership." },
  { title: "Digital report cards & certificates", desc: "Board-style report cards and certificates without desktop publishing fights." },
  { title: "Fee management & online payments", desc: "Structure fee schedules, collect online, and reconcile faster." },
  { title: "Parent engagement & PTM booking", desc: "Book PTMs and share progress without notice fatigue." },
  { title: "Communications & emergency alerts", desc: "Broadcasts and push alerts when minutes matter." },
  { title: "Events & school calendar", desc: "Keep holidays, exams, and events visible to all roles." },
  { title: "Extracurricular / houses / sports", desc: "Track houses, activities, and participation records." },
  { title: "HRMS & staff onboarding", desc: "Onboard staff with roles tied to the same permission model." },
  { title: "Leave management", desc: "Staff leave requests with clear approval trails." },
  { title: "Salary & payroll", desc: "Payroll hand-offs grounded in attendance and leave data." },
  { title: "Document management + OCR", desc: "Store student and institutional documents with OCR assist." },
  { title: "Transport fleet + live GPS", desc: "Fleet ops with live tracking parents can trust." },
  { title: "Hostel & mess", desc: "Residential campus ops linked to student profiles." },
  { title: "Front desk & visitor gate pass", desc: "Visitor logs and gate passes for safer campuses." },
  { title: "Library", desc: "Catalogues, issues, and returns in one module." },
  { title: "Canteen / cashless wallet", desc: "Reduce cash handling with wallet-linked purchases." },
  { title: "Accounting, budgeting & vendors", desc: "Campus finance workflows connected to fees and vendors." },
  { title: "LMS / resources / live class", desc: "Learning resources and live-class support beside school ops." },
  { title: "AI Academic Studio", desc: "QP generator, PPTs, evaluation and proctoring support." },
  { title: "Analytics & leadership dashboards", desc: "Single view for principals across academics and operations." },
  { title: "White-label school website CMS", desc: "Public site content managed without a separate agency stack." },
] as const;

export const ROLES = [
  {
    id: "principal",
    label: "Principal",
    title: "Leadership clarity without spreadsheet archaeology",
    points: [
      "Cross-campus dashboards for attendance, fees, transport, and academics",
      "Audit-friendly records for governance and inspections",
      "Standardised processes across branches",
    ] as const,
  },
  {
    id: "teacher",
    label: "Teacher",
    title: "More teaching time. Less paper chase.",
    points: [
      "AI Question Paper Generator with board and Bloom controls",
      "Lesson PPT support and question banks",
      "Attendance, assessments, and LMS resources in one place",
    ] as const,
  },
  {
    id: "parent",
    label: "Parent",
    title: "Trust through timely, accurate updates",
    points: [
      "Fees due, attendance, notices, and PTM booking",
      "Transport arrival alerts without group-chat noise",
      "Emergency and broadcast messages that reach them",
    ] as const,
  },
  {
    id: "student",
    label: "Student",
    title: "One portal for learning and results",
    points: [
      "Academic resources and assessments",
      "Results and feedback in context",
      "Clear access without tool hopping",
    ] as const,
  },
  {
    id: "frontdesk",
    label: "Front Desk",
    title: "Smoother daily campus operations",
    points: [
      "Visitor gate pass and front-office workflows",
      "Enquiry and admissions hand-offs",
      "Document intake tied to student profiles",
    ] as const,
  },
] as const;

export const HOW_IT_WORKS = [
  { step: "01", title: "Register your school", desc: "Share campus details, board affiliation, and branch structure." },
  { step: "02", title: "Choose modules", desc: "Enable only ERP, LMS, AI Studio, transport, hostel — what you need." },
  { step: "03", title: "Launch branded site + admin", desc: "Go live with white-label website and secure role-based admin." },
  { step: "04", title: "Run daily ops with AI tools", desc: "Fees, attendance, papers, parents, and dashboards — every day." },
] as const;

export const SECURITY = {
  eyebrow: "Security & reliability",
  title: "Built for multi-tenant trust",
  lead: "Education groups need isolation, permissions, and records that hold up under scrutiny.",
  items: [
    { title: "Multi-tenant isolation", desc: "Campus and organisation data stay separated by design." },
    { title: "Role-based access", desc: "Principal, teacher, parent, finance, front desk — least privilege." },
    { title: "Secure authentication", desc: "Protected sign-in for staff and family portals." },
    { title: "Audit-friendly records", desc: "Operational histories you can stand behind." },
    { title: "Scalable cloud architecture", desc: "Grow from one school to a regional education group." },
  ] as const,
  image: {
    src: encodeURI("/images/Custom Enterprise Software Architecture 1.jpeg"),
    alt: "Secure multi-tenant school data protection with LearnX",
  },
} as const;

export const COMPARISON = {
  eyebrow: "Why Choose LearnX",
  title: "Compared to how most schools operate today",
  columns: ["Capability", "Excel / WhatsApp", "Single-module tools", "Legacy ERPs", "LearnX"] as const,
  rows: [
    ["Connected academics + ops", "No", "Partial", "Often siloed", "Yes"],
    ["Parent real-time updates", "Chaotic", "App-specific", "Limited", "Built-in"],
    ["AI board-aligned papers", "Manual", "Rare", "Rare", "AI Academic Studio"],
    ["Modular pay-for-use", "N/A", "Per product", "Heavy bundles", "Module-level"],
    ["Multi-branch isolation", "Manual", "Weak", "Varies", "Native"],
    ["White-label school site", "Separate", "Separate", "Rare", "Included"],
  ] as const,
} as const;

export const PROOF = {
  eyebrow: "Outcomes schools care about",
  title: "Proof points & placeholders for your stories",
  lead: "Replace these with verified campus results after early deployments.",
  items: [
    {
      metric: "Fee recovery",
      quote: "“We expect clearer dues visibility and fewer reconciliation mismatches once collections move off spreadsheet chase.”",
      role: "Accounts lead · Multi-campus group (placeholder)",
    },
    {
      metric: "Teacher time",
      quote: "“Drafting unit tests used to take evenings. Board-aligned AI drafts with edit control is the productivity win we asked for.”",
      role: "Academic coordinator · CBSE school (placeholder)",
    },
    {
      metric: "Parent engagement",
      quote: "“Parents want attendance, fees, and bus updates without another WhatsApp forward. One portal is the trust layer.”",
      role: "Principal · Urban day school (placeholder)",
    },
  ] as const,
} as const;

export const FAQ = [
  {
    q: "Which boards does LearnX support?",
    a: "LearnX is built for CBSE, ICSE, IGCSE, and Indian State Boards — including Telangana, Karnataka, Tamil Nadu, Andhra Pradesh, Kerala, Maharashtra, and more — with workflows for unit tests, board patterns, PTMs, and report cards.",
  },
  {
    q: "Is pricing modular?",
    a: "Yes. Enable only the modules your campus needs — ERP, LMS, AI Academic Studio, transport, hostel, and others — so you pay for what you use. Request pricing for a campus-sized estimate.",
  },
  {
    q: "Can we run multiple branches?",
    a: "Yes. Education groups can manage multi-campus operations under one organisation with secure tenant isolation and role permissions per school and role.",
  },
  {
    q: "How is school data secured?",
    a: "LearnX uses multi-tenant isolation, role-based access, secure authentication, and audit-friendly records on a scalable cloud architecture. Ask our team for deployment and compliance details for your group.",
  },
  {
    q: "How does the AI Question Paper Generator work?",
    a: "Teachers choose board, grade, subject, chapters/sub-topics, difficulty and Bloom’s levels, optional distribution and uploads, then preview/edit, regenerate items, brand with school header, download PDF, and view a teacher-only answer key — with frequency insights and question-bank assembly.",
  },
  {
    q: "How long does implementation take?",
    a: "Timelines depend on modules and data migration. Typical campuses start with core ERP modules, branding, and staff training; AI Studio and advanced ops follow. Onboarding support and training are included — book a demo for a rollout plan.",
  },
] as const;

export const FINAL_CTA = {
  title: "Ready to run your campus on one platform?",
  lead: "Book a demo, request modular pricing, or talk to onboarding. Bring your board, branch map, and must-have modules — we’ll map LearnX to your academic year.",
  pricingTeaser: "Modular plans — pay for what you use",
  implementationNote: "Onboarding support and training included",
  primaryCta: { label: "Book a Demo", href: "/demo" },
  secondaryCta: { label: "Request Pricing", href: "/contact" },
  tertiaryCta: { label: "Talk to Onboarding", href: "/contact" },
  brochureCta: { label: "Download Brochure", href: "/resources" },
  formHint: {
    title: "Demo request fields we recommend",
    fields: [
      "School name",
      "Board (CBSE / ICSE / State / IGCSE)",
      "City",
      "Modules interested",
      "Phone",
      "Email",
    ] as const,
  },
  image: {
    src: "/images/contact-global-team.png",
    alt: "Book a LearnX demo for your school",
  },
} as const;

export const ABOUT_BLURB =
  "LearnX is a modular School ERP + LMS + AI Academic Studio for Indian campuses — white-label school websites, operations from admissions to fees and transport, parent and student portals, and teacher tools for board-aligned question papers and lesson prep. Built for CBSE, ICSE, IGCSE, and State Boards, with multi-branch scale for education groups that want one connected system instead of Excel, WhatsApp, and fragmented apps.";

export const LINKEDIN_BLURB =
  "LearnX is the school operating system for modern Indian campuses: modular ERP, LMS, white-label websites, parent portals, transport GPS, and AI Academic Studio for board-aligned question papers and lesson PPTs. Replace fragmented tools with one multi-tenant platform built for CBSE, ICSE, IGCSE, and State Boards — scalable from a single school to multi-branch education groups. Book a demo to map modules to your academic year.";

export const VIDEO_SCRIPT_40S = {
  title: "LearnX — 40-second website video",
  script: `Schools today juggle Excel, WhatsApp, fee apps, and exam tools — and still lack a clear picture.
LearnX is the complete school operating system: white-label website, ERP operations, parent and student portals, LMS, and AI Academic Studio.
Teachers build board-aligned question papers in minutes. Parents see fees, attendance, and bus updates in one place. Principals get one dashboard across branches.
Modular. Built for CBSE, ICSE, and State Boards. Secure multi-tenant architecture.
Book a LearnX demo — and run your campus on one platform.`,
} as const;

/* —— Legacy / founder exports (kept for FounderMessage & About) —— */

export const LEARNX_TAGLINE =
  "One platform for academics, operations, parents, and AI teaching tools — built for Indian boards.";

export const VISION_INTRO =
  "To become the leading school operating system for modern campuses — empowering institutions, educators, students, and parents through intelligent, modular, and board-aligned technologies across India and beyond.";

export const VISION_ALIGNMENTS = [
  "CBSE · ICSE · IGCSE · State Boards",
  "Multi-branch education groups",
] as const;

export const VISION_GOALS = [
  "Replace fragmented school software with one connected platform",
  "Enable AI-powered academic tools for teachers",
  "Modernize fees, attendance, transport, and parent communication",
  "Standardize processes across multi-branch groups",
  "Centralize analytics for principals and trustees",
  "Deliver modular pricing schools can grow into",
] as const;

export const VISION_CLOSING =
  "The future of school operations is modular ERP + LMS + practical AI — connected for the whole campus.";

export const MISSION_INTRO =
  "Our mission is to help Indian schools run academics and operations on one secure platform — with white-label presence, parent trust, and AI tools teachers actually use.";

export const MISSION_HERO = {
  label: "Our mission",
  headline: "School operations and AI teaching tools",
  headlineAccent: "on one platform",
  description:
    "LearnX unites ERP, LMS, parent engagement, and AI Academic Studio — so teachers teach smarter, leaders decide faster, and families stay informed.",
  image: "/images/hero-ai-analytics.png",
  imageAlt:
    "AI-powered school platform with learning analytics, teacher dashboards, and connected campus operations",
  floatingCards: [
    { id: "learning", label: "AI Learning", icon: "brain" as const },
    { id: "automation", label: "Automation", icon: "zap" as const },
    { id: "analytics", label: "Analytics", icon: "chart" as const },
    { id: "communication", label: "Communication", icon: "message" as const },
  ],
  ctaPrimary: { label: "Explore Modules", href: "/learnx#modules" },
  ctaSecondary: { label: "Book a Demo", href: "/demo" },
} as const;

export const MISSION_COMMITMENTS = [
  "Delivering modular School ERP, LMS, and AI Academic Studio",
  "Supporting schools and multi-branch groups in India",
  "Creating secure, scalable, multi-tenant cloud ecosystems",
  "Empowering teachers with board-aligned AI paper and PPT tools",
  "Improving engagement between students, parents, teachers, and administrators",
  "Enabling audit-ready operations and leadership dashboards",
] as const;

export const MISSION_OUTCOMES = [
  "Fewer tools",
  "Faster operations",
  "Higher parent trust",
  "Teacher time saved",
  "Board-aligned assessments",
  "Multi-branch ready",
] as const;

export const FOUNDER = {
  name: "Dr. Abdulwahab Al-Atwan",
  title: "Founder, Owner & President – KICCPA",
  imageSrc: "/images/founder-dr-abdulwahab-al-atwan.png",
  imageFallback: "/images/hero_about.png",
} as const;

export const FOUNDER_MESSAGE_PARAGRAPHS = [
  "The COVID-19 pandemic transformed the world and accelerated the need for digital education, remote learning, and intelligent technologies. During this critical period, we recognized that the future of education would no longer depend solely on traditional classrooms, but on connected, AI-powered, and future-ready ecosystems.",
  "From this vision, LearnX was created. Our mission was not simply to build another educational platform, but to establish a complete ecosystem capable of transforming the educational experience for students, teachers, parents, administrators, and investors.",
  "Through KICCPA, we established Kam Global for Digital and AI Media Solutions Pvt. Ltd. in India as our dedicated technology and innovation arm — a strong network of researchers, engineers, developers, PhD holders, and academic experts in technology, education, artificial intelligence, and enterprise transformation.",
  "Today, LearnX continues to evolve as a next-generation platform integrating School ERP, LMS, AI Academic Studio, analytics, automation, cloud infrastructure, and smart education technologies for modern campuses.",
] as const;

export const FOUNDER_CLOSING = [
  "From fragmented tools…",
  "To one school operating system…",
  "And toward AI-assisted teaching and campus clarity.",
] as const;

export const FOUNDER_QUOTE =
  "LearnX is not just a software platform. It is a long-term vision for smarter school operations, practical AI for teachers, and future-ready campuses.";

export const FOUNDER_ABOUT_EXCERPT =
  "The future of education will no longer depend solely on traditional classrooms, but on connected, intelligent, and future-ready ecosystems. From this vision, LearnX was created — a complete school operating system for students, teachers, parents, and administrators.";

export const KUWAIT_VISION = {
  title: "Regional & India delivery",
  intro: "LearnX supports institutional digital transformation by contributing to:",
  items: [
    "School ERP and LMS modernisation",
    "Board-aligned academic workflows",
    "Parent and community engagement",
    "AI tools for teachers",
    "Multi-branch operational consistency",
    "Secure cloud adoption for campuses",
  ],
} as const;

export const GCC_VISION = {
  title: "Scale for education groups",
  intro: "Across regions, LearnX contributes toward:",
  items: [
    "Smart campus operations",
    "Cloud-first school infrastructure",
    "AI-enabled academic productivity",
    "Centralised multi-branch governance",
    "Sustainable, modular innovation",
    "Data-driven institutional management",
  ],
} as const;

export const ECOSYSTEM_STATS = [
  { value: "28+", label: "Modules", hint: "Enable what you need" },
  { value: "5", label: "Product pillars", hint: "Presence to AI Studio" },
  { value: "AI", label: "Academic Studio", hint: "Papers · PPT · evaluation" },
  { value: "Multi", label: "Boards & branches", hint: "CBSE to State Boards" },
] as const;

export const ECOSYSTEM_PLATFORMS = [
  {
    name: "ERP",
    title: "School Operations",
    desc: "Admissions, fees, attendance, transport, HR, and campus workflows.",
    href: "#modules",
  },
  {
    name: "LMS",
    title: "Learning & Academics",
    desc: "Resources, assessments, results, and digital report cards.",
    href: "/solutions/lms",
  },
  {
    name: "AI",
    title: "Academic Studio",
    desc: "Board-aligned question papers, PPTs, and evaluation support.",
    href: "#ai-studio",
  },
] as const;

export const HERO_IMAGE = HERO.image;

export const LEARNX_CTA = {
  title: "Ready to run your campus on one platform?",
  titleAccent: "Start with LearnX.",
  lead: "Book a demo, explore modules, or request modular pricing for your board and branch structure.",
} as const;
