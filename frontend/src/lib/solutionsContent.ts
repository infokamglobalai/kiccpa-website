/**
 * LearnX product suite — content from "LearnX overall product suite.pdf"
 * Used by /solutions/[slug] marketing pages.
 */

export type SolutionSlug =
  | "lms"
  | "sms"
  | "calendar-management"
  | "question-paper"
  | "assessment"
  | "career-counseling"
  | "webcast";

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
