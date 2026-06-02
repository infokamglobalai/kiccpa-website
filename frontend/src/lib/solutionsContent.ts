/**
 * LearnX product suite — content from "LearnX overall product suite.pdf"
 * Used by /solutions/[slug] marketing pages.
 */

export type SolutionSlug =
  | "lms"
  | "sms"
  | "ai-counselor"
  | "calendar-management"
  | "question-paper"
  | "assessment"
  | "career-counseling"
  | "webcast";

/** Clickable point on product infographic (position in % of image) */
export type ProductHotspot = {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
};

export type SolutionContent = {
  slug: SolutionSlug;
  /** Short label in navbar */
  navLabel: string;
  /** Full product name from PDF */
  title: string;
  eyebrow: string;
  summary: string;
  keyFeatures?: readonly string[];
  whoBenefits?: readonly string[];
  painPoints: readonly string[];
  qualityImprovements?: readonly string[];
  /** Rich long-form explainer for solution page */
  detailedOverview?: string;
  /** Step-by-step rollout narrative */
  implementationPhases?: readonly string[];
  /** Product modules shown on detail pages */
  modules?: readonly string[];
  /** Product infographic / screenshot paths (under /public, e.g. /images/solutions/lms.png) */
  galleryImages?: readonly string[];
  /** Interactive tap points on the main infographic */
  interactiveHotspots?: readonly ProductHotspot[];
  /** Screens shown in scrollable phone preview (falls back to gallery image) */
  scrollPreviewScreens?: readonly string[];
};

export const SOLUTIONS: Record<SolutionSlug, SolutionContent> = {
  lms: {
    slug: "lms",
    navLabel: "LMS",
    title: "AI Powered Learning Management System",
    eyebrow: "Product 1 · LearnX Suite",
    summary:
      "Personalized, AI-powered learning for students, teachers, and institutions — with anytime access and data-driven teaching.",
    whoBenefits: [
      "Students",
      "Teachers",
      "Institutions",
      "Parents",
      "Coaching centers",
    ],
    painPoints: [
      "Lack of personalized learning",
      "Student engagement issues",
      "Manual tracking difficulties",
      "Language barriers",
      "Limited accessibility to quality learning",
    ],
    qualityImprovements: [
      "Better learning outcomes",
      "Faster doubt clarification",
      "Improved student participation",
      "Data-driven teaching strategies",
      "Anytime, anywhere learning access",
    ],
    galleryImages: ["/images/solutions/lms.png"],
    interactiveHotspots: [
      { id: "lms-ai", label: "AI learning core", detail: "Adaptive paths, AI Q&A, and multilingual support for every learner.", x: 22, y: 28 },
      { id: "lms-assess", label: "Assessments", detail: "Assignments, timed tests, and progress dashboards in one flow.", x: 50, y: 30 },
      { id: "lms-eco", label: "Ecosystem benefits", detail: "Students, teachers, parents, and institutions on one connected platform.", x: 78, y: 32 },
    ],
    scrollPreviewScreens: ["/images/solutions/lms.png"],
  },
  sms: {
    slug: "sms",
    navLabel: "SMS",
    title: "School Management System (ERP)",
    eyebrow: "Product 2 · LearnX Suite",
    summary:
      "Centralize school operations — from attendance and fees to parent communication and academic performance — on one integrated platform.",
    keyFeatures: [
      "Student & staff data management",
      "Attendance & leave management",
      "Fee & payment management",
      "Staff salary & payslip management",
      "Bus route tracking",
      "Canteen management",
      "Academic performance management",
      "AI-driven scorecard generation",
      "PTM scheduling",
      "Parent mobile application",
      "Notifications & communication",
      "Extra-curricular activity subscriptions",
      "Digital receipts & reports",
    ],
    painPoints: [
      "Multiple disconnected systems",
      "Manual paperwork",
      "Communication gaps",
      "Delayed fee tracking",
      "Complex academic management",
    ],
    qualityImprovements: [
      "Centralized operations",
      "Improved transparency",
      "Faster administration",
      "Better parent engagement",
      "Real-time reporting & insights",
    ],
    detailedOverview:
      "LearnX SMS works as the institutional operating system: admissions, academics, finance, HR, transport, and communication on one data model.",
    modules: [
      "Admissions & onboarding",
      "Attendance & timetable operations",
      "Fees, billing, and receipts",
      "HR, payroll, and staff workflows",
      "Parent app & notifications",
      "Analytics and compliance reports",
    ],
    implementationPhases: [
      "Discovery and data mapping",
      "Module-by-module rollout",
      "Staff onboarding and training",
      "Operations stabilization and KPI monitoring",
    ],
    galleryImages: ["/images/solutions/sms.png"],
    interactiveHotspots: [
      { id: "sms-erp", label: "School ERP core", detail: "Student, staff, attendance, and fees unified in one operations hub.", x: 20, y: 35 },
      { id: "sms-academic", label: "Academic hub", detail: "Performance, AI scorecards, PTM scheduling, and parent communication.", x: 50, y: 32 },
      { id: "sms-outcomes", label: "Outcomes", detail: "Transparency, faster admin, and real-time reporting for leadership.", x: 80, y: 38 },
    ],
    scrollPreviewScreens: ["/images/solutions/sms.png"],
  },
  "ai-counselor": {
    slug: "ai-counselor",
    navLabel: "AI Counsellor",
    title: "AI Student Counsellor",
    eyebrow: "Product · LearnX Suite",
    summary:
      "Early-support intelligence for student wellbeing, engagement, and confidence through continuous signals and guided interventions.",
    keyFeatures: [
      "Engagement and behavior trend detection",
      "AI-guided conversation prompts",
      "Teacher/counsellor intervention suggestions",
      "Wellbeing and motivation check-ins",
      "Parent communication recommendations",
      "Support history and follow-up tracking",
    ],
    whoBenefits: ["Students", "Teachers", "Counsellors", "Parents", "School leadership"],
    painPoints: [
      "Late identification of struggling students",
      "Inconsistent intervention planning",
      "Low visibility into wellbeing trends",
      "Fragmented communication between teams",
    ],
    qualityImprovements: [
      "Earlier intervention outcomes",
      "Better student confidence and retention",
      "Structured support workflows",
      "Data-backed counselling decisions",
    ],
    detailedOverview:
      "The AI Counsellor helps institutions shift from reactive counselling to proactive student success support by surfacing actionable risk and wellbeing signals.",
    modules: [
      "Student wellbeing profile",
      "Intervention recommendation engine",
      "Counsellor case management",
      "Parent communication assistant",
      "Outcome tracking dashboard",
    ],
    implementationPhases: [
      "Support framework setup",
      "Wellbeing signal baseline",
      "Counsellor enablement",
      "Monthly review and optimization",
    ],
    galleryImages: ["/images/solutions/ai-counselor.png"],
    interactiveHotspots: [
      { id: "aic-wellbeing", label: "Wellbeing signals", detail: "Engagement and behavior trends surfaced early for counsellors and teachers.", x: 18, y: 30 },
      { id: "aic-ai", label: "AI guidance", detail: "Conversation prompts and intervention suggestions tailored to each student.", x: 50, y: 28 },
      { id: "aic-outcomes", label: "Support outcomes", detail: "Structured workflows, parent communication, and tracked follow-ups.", x: 82, y: 34 },
    ],
    scrollPreviewScreens: ["/images/solutions/ai-counselor.png"],
  },
  "calendar-management": {
    slug: "calendar-management",
    navLabel: "Calendar Management",
    title: "AI Academic Calendar & Teacher Management",
    eyebrow: "Product 3 · LearnX Suite",
    summary:
      "Plan academics daily to monthly, manage substitutions with AI, and give principals full visibility into syllabus coverage.",
    keyFeatures: [
      "Daily / weekly / monthly academic planning",
      "Subject & portion tracking",
      "AI substitution management",
      "Teacher leave capture",
      "Automatic free teacher allocation",
      "Subject expert matching",
      "Teacher notifications",
      "Lesson plan synchronization",
      "Principal & admin monitoring",
      "Academic coverage tracking",
    ],
    whoBenefits: [
      "Principals",
      "Academic coordinators",
      "Teachers",
      "School administrators",
    ],
    painPoints: [
      "Last-minute substitution chaos",
      "Missed syllabus coverage",
      "Manual timetable adjustments",
      "Lack of academic visibility",
    ],
    detailedOverview:
      "This module keeps academics on track by combining planning, substitutions, and teacher load balancing with real-time principal visibility.",
    modules: [
      "Academic planning calendar",
      "AI substitution engine",
      "Teacher load balancing",
      "Coverage and completion dashboards",
    ],
    galleryImages: ["/images/solutions/calendar-management.png"],
    interactiveHotspots: [
      { id: "cal-plan", label: "Academic planning", detail: "Daily, weekly, and monthly planning with syllabus portion tracking.", x: 18, y: 30 },
      { id: "cal-sub", label: "AI substitution", detail: "Automatic free-teacher allocation and expert matching when leave is applied.", x: 50, y: 34 },
      { id: "cal-kpi", label: "Quality gains", detail: "Continuous coverage, better planning, and higher teacher productivity.", x: 82, y: 72 },
    ],
    scrollPreviewScreens: ["/images/solutions/calendar-management.png"],
  },
  "question-paper": {
    slug: "question-paper",
    navLabel: "Question Paper Creation",
    title: "AI Question Paper Management System",
    eyebrow: "Product 4 · LearnX Suite",
    summary:
      "Generate board-aligned question papers with AI — customize difficulty, map to Bloom’s Taxonomy, and publish online or offline.",
    keyFeatures: [
      "AI-generated question papers",
      "Difficulty-level customization",
      "Board-aligned paper generation",
      "Supports CBSE, ICSE, IB, IGCSE & others",
      "Regenerate or modify questions instantly",
      "Bloom’s Taxonomy mapping",
      "Online & offline exam publishing",
      "Auto result capture & analytics",
      "Printable exam formats",
    ],
    painPoints: [
      "Time-consuming paper preparation",
      "Difficulty balancing question complexity",
      "Lack of standardization",
      "Repetitive manual work",
    ],
    qualityImprovements: [
      "Faster paper creation",
      "Better exam quality",
      "Curriculum-aligned assessments",
      "Reduced teacher workload",
      "Enhanced evaluation consistency",
    ],
    galleryImages: ["/images/solutions/question-paper.png"],
    interactiveHotspots: [
      { id: "qp-gen", label: "AI paper generation", detail: "Board-aligned papers with difficulty control and Bloom's mapping.", x: 24, y: 32 },
      { id: "qp-pub", label: "Publish & print", detail: "Online or offline exams with printable formats and auto capture.", x: 72, y: 30 },
    ],
    scrollPreviewScreens: ["/images/solutions/question-paper.png"],
  },
  assessment: {
    slug: "assessment",
    navLabel: "Assessment",
    title: "AI Online Proctoring & Secure Assessment",
    eyebrow: "Product 5 · LearnX Suite",
    summary:
      "Protect exam integrity with AI monitoring, browser lockdown, and real-time alerts — built for trustworthy remote and digital assessments.",
    keyFeatures: [
      "AI-powered exam monitoring",
      "Camera-based student tracking",
      "Multi-browser lock protection",
      "Voice activity detection",
      "Suspicious activity alerts",
      "Time-bound secure exams",
      "Anti-cheating mechanisms",
      "Secure online assessments",
    ],
    painPoints: [
      "Online exam malpractice",
      "AI tool misuse during exams",
      "Identity verification concerns",
      "Lack of secure remote testing",
    ],
    qualityImprovements: [
      "Exam integrity protection",
      "Reliable online assessments",
      "Reduced cheating risks",
      "Higher trust in digital exams",
    ],
    detailedOverview:
      "AI Proctoring secures digital exams with continuous monitoring, event logging, and risk flags for institution-approved review workflows.",
    modules: [
      "Exam session monitoring",
      "Behavior and anomaly detection",
      "Live alerts and escalation",
      "Audit logs and compliance reports",
    ],
    galleryImages: ["/images/solutions/assessment.png"],
    interactiveHotspots: [
      { id: "proc-monitor", label: "AI monitoring", detail: "Camera tracking, voice detection, and suspicious-activity alerts.", x: 20, y: 28 },
      { id: "proc-lock", label: "Secure browser", detail: "Multi-browser lock and anti-cheating controls during exams.", x: 50, y: 35 },
      { id: "proc-time", label: "Time-bound exams", detail: "Timed sessions with integrity checks and audit-ready logs.", x: 80, y: 40 },
    ],
    scrollPreviewScreens: ["/images/solutions/assessment.png"],
  },
  "career-counseling": {
    slug: "career-counseling",
    navLabel: "Career Counseling",
    title: "AI Career Counselling Platform",
    eyebrow: "Product 6 · LearnX Suite",
    summary:
      "Guide students with AI self-assessment, career paths, university recommendations, and country-specific higher-education insights.",
    keyFeatures: [
      "AI self-assessment tools",
      "Career path recommendations",
      "Higher education guidance",
      "University recommendations",
      "Country-specific opportunities",
      "Education cost estimation",
      "Expected salary insights",
      "Skill & interest mapping",
    ],
    whoBenefits: [
      "High school students",
      "Parents",
      "Career counsellors",
      "Institutions",
    ],
    painPoints: [
      "Lack of career clarity",
      "Limited awareness of opportunities",
      "Confusing admission pathways",
      "Poor career decision-making",
    ],
    detailedOverview:
      "AI Career Counselling gives structured decision support for students, parents, and counsellors by combining profile data with market and university pathways.",
    galleryImages: ["/images/solutions/career-counseling.png"],
    interactiveHotspots: [
      { id: "car-assess", label: "AI self-assessment", detail: "Skill and interest mapping with personalized career pathway suggestions.", x: 20, y: 30 },
      { id: "car-uni", label: "University fit", detail: "Country-wise opportunities, costs, and higher-education recommendations.", x: 50, y: 32 },
      { id: "car-eco", label: "Ecosystem value", detail: "Students, parents, counsellors, and institutions aligned on career decisions.", x: 82, y: 36 },
    ],
    scrollPreviewScreens: ["/images/solutions/career-counseling.png"],
  },
  webcast: {
    slug: "webcast",
    navLabel: "Webcast",
    title: "Webcast & Virtual Event Platform",
    eyebrow: "Product 7 · LearnX Suite",
    summary:
      "Broadcast live events, host webinars, and run virtual classes — integrated with your LMS so teachers can start sessions without extra tools.",
    keyFeatures: [
      "Live event broadcasting",
      "Virtual meeting platform",
      "Webinar hosting",
      "Large audience streaming",
      "Interactive sessions",
      "Institution-wide announcements",
      "Online workshops & events",
    ],
    whoBenefits: [
      "Institutions",
      "Corporates",
      "Training organizations",
      "Event teams",
    ],
    painPoints: [
      "Expensive third-party webinar tools",
      "Event scalability limitations",
      "Incorporated within LMS — no separate scheduling or link sharing",
      "Communication gaps",
      "Virtual class — students join and the teacher starts video instantly",
    ],
    galleryImages: ["/images/solutions/webcast.png"],
    interactiveHotspots: [
      { id: "wc-live", label: "Live broadcasting", detail: "Panel events and large-audience streaming from one console.", x: 16, y: 22 },
      { id: "wc-console", label: "Webcast console", detail: "Mic/camera, polls, Q&A, and AI-assisted session controls.", x: 18, y: 48 },
      { id: "wc-meet", label: "Virtual meetings", detail: "Breakout rooms, whiteboard, and collaborative webinar flows.", x: 50, y: 28 },
      { id: "wc-eco", label: "Who benefits", detail: "Institutions, teachers, students, HR, and event teams on one platform.", x: 82, y: 26 },
    ],
    scrollPreviewScreens: ["/images/solutions/webcast.png"],
  },
};

export const SOLUTION_SLUGS = Object.keys(SOLUTIONS) as SolutionSlug[];

export function getSolutionBySlug(slug: string): SolutionContent | null {
  if (slug in SOLUTIONS) return SOLUTIONS[slug as SolutionSlug];
  return null;
}

/** Navbar dropdown — order matches product suite */
export const OFFERING_LINKS = SOLUTION_SLUGS.map((slug, i) => ({
  n: String(i + 1).padStart(2, "0"),
  label: SOLUTIONS[slug].navLabel,
  href: `/solutions/${slug}`,
}));

export const SUITE_TAGLINE =
  "One Ecosystem. Multiple Solutions. Unlimited Possibilities.";

export const SUITE_AUDIENCES = [
  "Schools",
  "Colleges",
  "Universities",
  "Training institutions",
  "Coaching centres",
  "Corporate learning",
] as const;
