/** Local public/ images — use URL-safe filenames (no spaces or &) for reliable CDN/deploy serving */

export const homeImages = {
  /** Photorealistic classroom — teachers and learners with devices */
  heroHuman: "/images/hero-human-education.png",
  heroHumanAlt:
    "Teacher and students collaborating with laptops and tablets in a modern classroom",
  /** AI / analytics layer — dashboard and intelligent tooling */
  heroAi: "/images/hero-ai-analytics.png",
  heroAiAlt:
    "Educator reviewing AI-assisted learning analytics and progress on a laptop screen",
  lmsStandard: "/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg",
  lmsStandardAlt: "Digital learning ecosystem — courses, assessments, and student dashboards",
  problemInsight: "/images/student-performance-dashboard.png",
  problemInsightAlt:
    "Traditional LMS limitations versus KICCPA intelligent outcomes — predictive analytics and smart automation",
  schoolOps: "/images/End-to-End Operational Digitization 1.jpeg",
  schoolOpsAlt: "End-to-end operational digitization for schools and institutions",
  enterpriseArch: "/images/Custom Enterprise Software Architecture 1.jpeg",
  enterpriseArchAlt: "Enterprise software architecture and scalable integrations",
  support: "/images/Reliable Support 1.png",
  supportAlt: "Dedicated implementation and long-term support",
  pillars: [
    {
      src: "/images/feature-ai-adaptive-learning.png",
      alt: "AI-driven adaptive learning and digital curriculum",
    },
    {
      src: "/images/student-performance-dashboard.png",
      alt: "Scalable analytics and performance insights",
    },
    {
      src: "/images/feature-bilingual-rtl.png",
      alt: "NLP and integrations across languages and systems",
    },
    {
      src: "/images/feature-parent-stakeholder.png",
      alt: "Engagement portals for parents and stakeholders",
    },
  ] as const,
} as const;

export const statsHome = [
  { value: "70%", label: "Less grading admin", hint: "AI-assisted feedback & workflows" },
  { value: "4–6 wks", label: "Earlier risk signals", hint: "Intervention before failure" },
  { value: "84%", label: "Parent adoption", hint: "Daily summaries & alerts" },
  { value: "EN · AR", label: "Bilingual + RTL", hint: "Regional compliance ready" },
] as const;

/** Compact home strip — links to /products#packages */
export const homePackageTeaser = {
  title: "LMS packages at a glance",
  subtitle:
    "Choose a tier that matches your campus today — upgrade when operations need to move onto the same stack. Pricing is sized to institution scale; we’ll confirm scope on a short call.",
  tiers: [
    {
      name: "LMS Standard",
      tag: "Foundation",
      blurb: "Courses, assessments, mobile app, and parent visibility — ideal for schools starting full digital learning.",
    },
    {
      name: "LMS Premium",
      tag: "All-in-one",
      blurb: "Everything in Standard plus ERP: fees, transport, canteen, results, and comms — one login fabric.",
    },
    {
      name: "Enterprise",
      tag: "Custom",
      blurb: "White-label, APIs, multi-campus control, and dedicated cloud for groups that need governance and SLAs.",
    },
  ],
} as const;
