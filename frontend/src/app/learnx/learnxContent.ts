/** LearnX vision, mission, and alignment — single source for /learnx and teasers */

export const LEARNX_TAGLINE =
  "AI-powered education and digital transformation for Kuwait, the GCC, and beyond.";

export const VISION_INTRO =
  "To become the leading AI-powered education and digital transformation ecosystem in Kuwait and the GCC region by empowering institutions, educators, students, parents, and investors through intelligent, centralized, scalable, and future-ready technologies.";

export const VISION_ALIGNMENTS = [
  "Kuwait Vision 2035",
  "GCC Digital Transformation & Smart Government Initiatives",
] as const;

export const VISION_GOALS = [
  "Build smart educational institutions and campuses",
  "Enable AI-powered learning and automation",
  "Modernize academic and operational systems",
  "Reduce dependency on costly private tuition",
  "Centralize education management and analytics",
  "Empower students with personalized learning experiences",
  "Create globally connected and future-ready educational environments",
  "Support sustainable economic and human capital development across the GCC",
] as const;

export const VISION_CLOSING =
  "We believe the future of education lies in Artificial Intelligence + Digital Transformation + Human Innovation.";

export const MISSION_INTRO =
  "Our mission is to revolutionize the education sector through AI-powered digital solutions that enhance academic excellence, operational efficiency, communication, automation, and institutional growth.";

export const MISSION_HERO = {
  label: "Our mission",
  headline: "Revolutionizing Education Through",
  headlineAccent: "AI & Digital Transformation",
  description:
    "We unite artificial intelligence, automation, and real-time analytics in one cloud-native platform—so teachers teach smarter, leaders decide faster, and every student gets a path built for how they actually learn.",
  image: "/images/hero-ai-analytics.png",
  imageAlt:
    "AI-powered education platform with learning analytics, teacher dashboards, and connected campus operations",
  floatingCards: [
    { id: "learning", label: "AI Learning", icon: "brain" as const },
    { id: "automation", label: "Automation", icon: "zap" as const },
    { id: "analytics", label: "Analytics", icon: "chart" as const },
    { id: "communication", label: "Communication", icon: "message" as const },
  ],
  ctaPrimary: { label: "Explore Platform", href: "/products" },
  ctaSecondary: { label: "Watch Overview", href: "/resources" },
} as const;

export const MISSION_COMMITMENTS = [
  "Delivering advanced LMS, SMS, and HRMS platforms",
  "Supporting schools, universities, and institutions in digital transformation",
  "Creating secure, scalable, and cloud-based ecosystems",
  "Enhancing student learning through AI and analytics",
  "Empowering teachers with intelligent educational tools",
  "Improving engagement between students, parents, teachers, and administrators",
  "Enabling smart governance, compliance, and centralized operations",
  "Supporting future accreditation and global education standards",
  "Helping institutions transition from legacy systems to modern AI-powered infrastructure",
] as const;

export const MISSION_OUTCOMES = [
  "Smarter",
  "More accessible",
  "Data-driven",
  "Automated",
  "Globally connected",
  "Sustainable for future generations",
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
  "Today, LearnX continues to evolve as a next-generation AI-powered ecosystem integrating LMS, SMS, HRMS, analytics, automation, cloud infrastructure, and smart education technologies.",
] as const;

export const FOUNDER_CLOSING = [
  "From legacy systems…",
  "To modern digital education…",
  "And ultimately toward the future of AI-powered intelligent learning.",
] as const;

export const FOUNDER_QUOTE =
  "LearnX is not just a software platform. It is a long-term vision for smarter education, sustainable innovation, digital transformation, and future generations.";

/** Shorter excerpt for About page */
export const FOUNDER_ABOUT_EXCERPT =
  "The future of education will no longer depend solely on traditional classrooms, but on connected, AI-powered, and future-ready ecosystems. From this vision, LearnX was created — a complete ecosystem for students, teachers, parents, administrators, and investors.";

export const KUWAIT_VISION = {
  title: "Kuwait Vision 2035 — “New Kuwait”",
  intro: "LearnX supports Kuwait’s national vision by contributing to:",
  items: [
    "Digital transformation in education",
    "Smart government initiatives",
    "AI and innovation ecosystems",
    "Human capital development",
    "Knowledge-based economy growth",
    "Smart infrastructure and cloud adoption",
  ],
} as const;

export const GCC_VISION = {
  title: "GCC Digital Transformation Vision",
  intro: "Across the GCC region, LearnX contributes toward:",
  items: [
    "Smart cities and smart campuses",
    "Cloud-first infrastructure",
    "AI-enabled education systems",
    "Centralized digital governance",
    "Sustainable and scalable innovation",
    "Regional educational modernization",
    "Data-driven institutional management",
  ],
} as const;

export const ECOSYSTEM_STATS = [
  { value: "3", label: "Core platforms", hint: "LMS · SMS · HRMS" },
  { value: "2", label: "Delivery hubs", hint: "Kuwait & India" },
  { value: "AI", label: "Native intelligence", hint: "Learning & operations" },
  { value: "EN · AR", label: "Bilingual ready", hint: "RTL & regional compliance" },
] as const;

export const ECOSYSTEM_PLATFORMS = [
  {
    name: "LMS",
    title: "Learning Management",
    desc: "AI-powered courses, assessments, and personalized learning paths.",
    href: "/solutions/lms",
  },
  {
    name: "SMS",
    title: "School Management",
    desc: "Admissions, fees, attendance, transport, and parent communication.",
    href: "/solutions/sms",
  },
  {
    name: "HRMS",
    title: "People & Operations",
    desc: "Staff workflows, payroll hand-offs, and institutional governance.",
    href: "/services",
  },
] as const;

export const HERO_IMAGE = {
  src: encodeURI("/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg"),
  alt: "LearnX advanced learning ecosystem — LMS, SMS, and connected campus operations",
} as const;

export const LEARNX_CTA = {
  title: "Ready to transform your institution?",
  titleAccent: "Start with LearnX.",
  lead: "Book a demo, explore packages, or speak with our team about a tailored LMS, SMS, and HRMS rollout.",
} as const;
