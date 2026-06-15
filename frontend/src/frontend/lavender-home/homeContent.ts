/** Local public/ images — use URL-safe filenames (no spaces or &) for reliable CDN/deploy serving */

export const homeImages = {
  /** Futuristic education ecosystem — transparent cut for hero wash */
  heroHuman: "/images/hero-ecosystem-clean.png",
  heroHumanAlt:
    "Futuristic education technology ecosystem connecting learning, analytics, and digital platforms",
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

export const whoWeAreContent = {
  eyebrow: "Our identity",
  title: "Who we are",
  lead:
    "KICCPA is a technology solutions provider delivering custom-built and enterprise-grade software across education, operations, and industry.",
  points: [
    {
      title: "Transformational by design",
      text: "We combine AI, data, and automation so every solution is built to scale—not just ship.",
    },
    {
      title: "Intelligent ecosystems",
      text: "We don’t only build software—we connect LMS, ERP, and stakeholder journeys into one fabric.",
    },
  ],
  image: "/images/business-tech-ecosystem.png",
  imageAlt: "Intelligent business ecosystems and connected digital infrastructure",
  regions: ["Kuwait", "India", "GCC"],
  tagline: "AI-native · Bilingual · Enterprise-ready",
} as const;

export const processSteps = [
  {
    title: "Strategic audit",
    desc: "We map your digital landscape—processes, data, and gaps—to find automation and AI opportunities.",
    icon: "search" as const,
  },
  {
    title: "Architecture design",
    desc: "A future-ready roadmap that aligns LMS, ERP, and integrations with your operating model.",
    icon: "layers" as const,
  },
  {
    title: "Intelligence build",
    desc: "Bespoke delivery with secure engineering, AI features, and scalable cloud architecture.",
    icon: "cpu" as const,
  },
  {
    title: "Continuous evolution",
    desc: "Analytics, proactive support, and iteration so platforms grow with your institution or business.",
    icon: "trending" as const,
  },
] as const;

export const industrySectors = [
  {
    slug: "healthcare",
    title: "Healthcare",
    desc: "AI-assisted diagnostics, secure records, and workflow automation for modern clinical operations.",
    icon: "activity" as const,
    accent: "health" as const,
  },
  {
    slug: "logistics",
    title: "Logistics",
    desc: "Real-time visibility, predictive routing, and integrated ERP for supply chain teams.",
    icon: "truck" as const,
    accent: "logistics" as const,
  },
  {
    slug: "government",
    title: "Government",
    desc: "Smart-city ready platforms, bilingual portals, and transparent digital public services.",
    icon: "shield" as const,
    accent: "government" as const,
  },
] as const;

export const statsHome = [
  { value: "70%", label: "Less grading admin", hint: "AI-assisted feedback & workflows", icon: "users" as const },
  { value: "4–6 wks", label: "Earlier risk signals", hint: "Intervention before failure", icon: "clock" as const },
  { value: "84%", label: "Parent adoption", hint: "Daily summaries & alerts", icon: "usersGroup" as const },
  { value: "EN · AR", label: "Bilingual + RTL", hint: "Regional compliance ready", icon: "globe" as const },
] as const;

export const heroValueProps = [
  { title: "Scalable & Secure", hint: "Enterprise-grade security", icon: "shield" as const },
  { title: "AI-Powered", hint: "Smarter insights & automation", icon: "sparkles" as const },
  { title: "Industry Solutions", hint: "Tailored for every sector", icon: "briefcase" as const },
  { title: "Future Ready", hint: "Built for tomorrow's challenges", icon: "rocket" as const },
] as const;

export const regionalDepthContent = {
  eyebrow: "Regional depth",
  title: "Built for India & Kuwait",
  lead:
    "KICCPA was shaped for the Gulf and the subcontinent—not retrofitted. Curriculum, language, compliance, and infrastructure match how schools actually operate in each market.",
  stats: [
    { value: "2", label: "Core markets" },
    { value: "EN · AR", label: "Bilingual + RTL" },
    { value: "GCC + IN", label: "Data residency" },
  ],
  markets: [
    {
      id: "india",
      name: "India",
      href: "/schools",
      cta: "Explore India solutions",
      meta: ["CBSE & ICSE", "NEP 2020", "DPDPA"],
      features: [
        "CBSE, ICSE, and State Board alignment",
        "NEP 2020 competency frameworks",
        "WhatsApp-native parent notifications",
        "Low-bandwidth mode for Tier 2/3 cities",
        "DPDPA-ready — AWS Mumbai residency",
        "NCERT-aligned content support",
      ],
    },
    {
      id: "kuwait",
      name: "Kuwait",
      href: "/schools",
      cta: "Explore Kuwait solutions",
      meta: ["MoE aligned", "Arabic RTL", "Vision 2035"],
      features: [
        "RTL Arabic interface from the ground up",
        "Arabic NLP for natural script feedback",
        "Kuwait MoE curriculum alignment",
        "Hijri calendar for scheduling",
        "GCC data residency — AWS Bahrain",
        "Kuwait Vision 2035 ed-tech alignment",
      ],
    },
  ],
} as const;

/** Compact home strip — links to /products#packages */
export const homePackageTeaser = {
  title: "LMS packages at a glance",
  subtitle:
    "Choose a tier that matches your campus today — upgrade when operations need to move onto the same stack. Pricing is sized to institution scale; we’ll confirm scope on a short call.",
  tiers: [
    {
      name: "LMS Standard",
      tag: "Foundation",
      blurb: "Digital learning core for schools ready to modernise teaching and parent engagement.",
      highlights: ["Courses & assessments", "Mobile app", "Parent visibility"],
      featured: false,
    },
    {
      name: "LMS Premium",
      tag: "All-in-one",
      blurb: "LMS plus school ERP—fees, transport, canteen, results, and comms on one login fabric.",
      highlights: ["Everything in Standard", "Fees & transport", "Unified admin"],
      featured: true,
    },
    {
      name: "Enterprise",
      tag: "Custom",
      blurb: "Governance, APIs, and dedicated cloud for groups that need multi-campus control and SLAs.",
      highlights: ["White-label", "Multi-campus", "Dedicated cloud"],
      featured: false,
    },
  ],
} as const;
