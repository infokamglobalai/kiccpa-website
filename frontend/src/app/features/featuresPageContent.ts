export const FEATURES_HERO = {
  eyebrow: "KICCPA LMS",
  title: "Platform features for",
  titleAccent: "students, faculty & leaders",
  lead:
    "Modern UX, AI-driven learning paths, real-time analytics, and bilingual delivery—built for adoption across schools and universities in Kuwait, India, and the GCC.",
  pills: ["Adaptive learning", "Real-time analytics", "Bilingual & RTL", "Mobile-first"],
  ctaPrimary: { label: "Book a demo", href: "/demo" },
  ctaSecondary: { label: "View packages", href: "/products#packages" },
} as const;

export const FEATURE_STATS = [
  { value: "7+", label: "Capability areas", hint: "UX through predictive AI" },
  { value: "70%", label: "Less grading admin", hint: "With AI-assisted workflows" },
  { value: "EN · AR", label: "Bilingual ready", hint: "RTL for Gulf institutions" },
  { value: "24/7", label: "Cloud access", hint: "Web & mobile" },
] as const;

export const FEATURE_CATEGORIES = [
  { id: "experience", label: "Experience & access" },
  { id: "ai", label: "AI & automation" },
] as const;

export const FEATURE_AUDIENCES = [
  {
    title: "Students",
    desc: "Personalized paths, instant feedback, and progress they can actually see.",
    icon: "graduation" as const,
  },
  {
    title: "Faculty",
    desc: "Less manual grading, clearer class insights, and tools that fit how they teach.",
    icon: "users" as const,
  },
  {
    title: "Parents",
    desc: "Daily summaries, alerts, and visibility—without chasing teachers for updates.",
    icon: "heart" as const,
  },
  {
    title: "Leadership",
    desc: "Board-ready analytics, compliance exports, and one view across campuses.",
    icon: "building" as const,
  },
] as const;

export const FEATURE_ECOSYSTEM = [
  { label: "LMS", href: "/solutions/lms", desc: "Learning & assessment" },
  { label: "SMS", href: "/solutions/sms", desc: "School operations" },
  { label: "LearnX", href: "/learnx", desc: "Vision & ecosystem" },
  { label: "AI Counsellor", href: "/solutions/ai-counselor", desc: "Student support" },
] as const;

export const FEATURES_CTA = {
  title: "See how features map to your campus",
  titleAccent: "Book a tailored walkthrough.",
  lead: "We align modules, languages, and rollout to your curriculum, stakeholders, and timeline—in Kuwait, India, and across the GCC.",
} as const;
