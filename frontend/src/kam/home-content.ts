export type DivisionId = "technology" | "outsourcing" | "hr";

export type ServiceLink = {
  title: string;
  href: string;
  summary: string;
  image?: string;
  alt?: string;
};

export type Division = {
  id: DivisionId;
  href: string;
  title: string;
  line: string;
  intro: string;
  image: string;
  alt: string;
  cta: string;
  itemsLabel: string;
  clientLabel: string;
  seekerLabel: string;
  items: ServiceLink[];
};

export const divisions: Division[] = [
  {
    id: "technology",
    href: "/services/technology-ai",
    title: "Technology & AI",
    line: "Smart technology. Stronger business.",
    intro: "Explore digital solutions that support your business requirements, from software development to cloud infrastructure and automation.",
    image: "/assets/photography/software.jpg",
    alt: "People working together in a technology studio.",
    cta: "Explore Technology Services",
    itemsLabel: "Services",
    clientLabel: "Request a Service",
    seekerLabel: "Explore Opportunities",
    items: [
      { title: "AI & Automation", href: "/services/ai-automation", summary: "Make room for more meaningful work.", image: "/assets/photography/operations.jpg", alt: "Colleagues collaborating around a table with laptops" },
      { title: "Software & App Development", href: "/services/software-development", summary: "Software shaped around the way you work.", image: "/assets/photography/software.jpg", alt: "Developer writing code on a laptop" },
      { title: "Cloud & Data Solutions", href: "/services/cloud-data", summary: "A clearer foundation for your digital business.", image: "/assets/photography/data.jpg", alt: "Rows of server cabinets in a data centre" },
      { title: "IT Support & Cybersecurity", href: "/services/it-support-cybersecurity", summary: "Keep everyday technology moving.", image: "/assets/photography/support.jpg", alt: "Professional answering a call at a desk" },
    ],
  },
  {
    id: "outsourcing",
    href: "/services/business-outsourcing",
    title: "Business Outsourcing",
    line: "Your operations, expertly managed.",
    intro: "Discover business support services designed around your workflows, customer interactions, and operational requirements.",
    image: "/assets/photography/operations.jpg",
    alt: "Colleagues working together in an office.",
    cta: "Explore Outsourcing Services",
    itemsLabel: "Services",
    clientLabel: "Request a Service",
    seekerLabel: "Explore Opportunities",
    items: [
      { title: "Customer Service & Support", href: "/services/customer-support", summary: "Make every customer conversation count.", image: "/assets/photography/support.jpg", alt: "Professional answering a call at a desk" },
      { title: "Sales & Lead Generation", href: "/services/sales-lead-generation", summary: "Give your sales team a stronger starting point.", image: "/assets/photography/sales.jpg", alt: "Team reviewing charts and planning around a table" },
      { title: "Back Office & BPO", href: "/services/back-office-bpo", summary: "Create more space for your core business.", image: "/assets/photography/operations.jpg", alt: "Colleagues collaborating around a table with laptops" },
      { title: "Virtual Assistants & CRM", href: "/services/virtual-assistants-crm", summary: "A more organised working day.", image: "/assets/photography/assistant.jpg", alt: "Professional working at a laptop beside a notebook" },
    ],
  },
  {
    id: "hr",
    href: "/services/hr-recruitment",
    title: "HR & Recruitment",
    line: "The right people for the roles you need.",
    intro: "Explore recruitment enquiries across relevant professional, healthcare, hospitality, and industrial sectors. This is not a list of open jobs, and no placement is promised.",
    image: "/assets/photography/team.jpg",
    alt: "Two professionals in a conversation.",
    cta: "Explore Sectors & Roles",
    itemsLabel: "Sectors",
    clientLabel: "Request Staff",
    seekerLabel: "Start an Enquiry",
    items: [
      { title: "Nursing", href: "/services/healthcare-recruitment", summary: "People at the heart of healthcare.", image: "/assets/photography/healthcare.jpg", alt: "Stethoscope and medical supplies arranged on a table" },
      { title: "Medical & Healthcare", href: "/services/healthcare-recruitment", summary: "People at the heart of healthcare.", image: "/assets/photography/healthcare.jpg", alt: "Stethoscope and medical supplies arranged on a table" },
      { title: "Hotels & Hospitality", href: "/services/hospitality-recruitment", summary: "Build the team behind a memorable stay.", image: "/assets/photography/hospitality.jpg", alt: "Outdoor swimming pool beside a contemporary hotel" },
      { title: "Oil & Gas", href: "/services/oil-gas-recruitment", summary: "Workforce planning for complex environments.", image: "/assets/photography/energy.jpg", alt: "Industrial structures and pipes at a refinery" },
      { title: "Construction", href: "/services/construction-recruitment", summary: "The right skills for the next phase.", image: "/assets/photography/construction.jpg", alt: "Engineers wearing hard hats reviewing plans" },
      { title: "Manufacturing", href: "/services/manufacturing-recruitment", summary: "People who understand the production floor.", image: "/assets/photography/manufacturing.jpg", alt: "Worker operating machinery on a production floor" },
    ],
  },
];

export const whyKiccpa = [
  { icon: "technology", title: "Technology That Works for Business", text: "Explore digital tools and technical services aligned with your business requirements." },
  { icon: "operations", title: "Operations You Can Rely On", text: "Discover outsourcing support for customer service, sales, and everyday business operations." },
  { icon: "people", title: "People for Every Stage of Growth", text: "Connect with recruitment support across relevant professional and industrial sectors." },
];

export const homeSteps = [
  { n: "01", title: "Tell Us What You Need", text: "Choose a service division and explain your requirements." },
  { n: "02", title: "Connect With Our Team", text: "Submit your enquiry through the appropriate form or contact channel." },
  { n: "03", title: "Discuss the Next Steps", text: "The KICCPA team can review the request and discuss suitable options." },
];

export const homeProducts = [
  {
    name: "LearnX",
    text: "School management.",
    href: "https://learnx.school",
    external: true,
    cta: "Open learnx.school",
    image: "/images/resources/learnx-sms-catalog-cover.webp",
    alt: "Cover of the LearnX school management catalogue.",
  },
  {
    name: "EduAiTutors",
    text: "Learning and tutoring.",
    href: "https://www.eduaitutors.com",
    external: true,
    cta: "Open EduAiTutors",
    image: "/images/eduaitutors-ecosystem.webp",
    alt: "Visual for the EduAiTutors learning product.",
  },
  {
    name: "EduAiTutors platform",
    text: "The learning address.",
    href: "https://kam.eduaitutors.com",
    external: true,
    cta: "Open the platform",
    image: "/images/student-performance-dashboard.webp",
    alt: "Illustration beside the EduAiTutors platform link. Not a live screenshot of kam.eduaitutors.com.",
  },
];

export const homePage = {
  hero: {
    aria: "Introduction",
    eyebrow: "Where it meets AI",
    title: "Three Services. One Partner.",
    support: "The right expertise to move your business forward.",
    lede: "From technology and business operations to recruitment, KICCPA connects organisations with the services they need to take their next step.",
    primary: { label: "Explore Our Services", href: "#services" },
    secondary: { label: "Discuss Your Requirements", href: "/business-enquiry" },
    image: "/assets/hero/home-hero.jpg",
    alt: "Architectural photograph used for the KICCPA homepage. A licensed Kuwait City skyline has not been added yet.",
    caption: "Kuwait roots. Connected expertise.",
  },
  places: [
    { code: "kw", name: "Kuwait" },
    { code: "in", name: "India" },
    { code: "ph", name: "Philippines" },
    { code: "sa", name: "Saudi Arabia" },
    { code: "ke", name: "Kenya" },
    { code: "tn", name: "Tunisia" },
  ],
  services: { eyebrow: "Services", title: "Three ways to start." },
  why: { eyebrow: "Why KICCPA", title: "The Right Expertise. One Connected Partner." },
  steps: { eyebrow: "How it works", title: "From the requirement to a conversation." },
  platforms: { eyebrow: "Platforms", title: "Digital Platforms for Learning and Management." },
  close: {
    title: "Have a Business Challenge in Mind?",
    text: "Tell us what you need. We'll help you identify the appropriate service and discuss the next step.",
    primary: { label: "Discuss Your Requirements", href: "/business-enquiry" },
    secondary: { label: "Explore Our Services", href: "#services" },
  },
};

export function clientPath(division: Division, service?: string) {
  const params = new URLSearchParams({ division: division.id });
  if (service) params.set("service", service);
  return `/business-enquiry?${params.toString()}`;
}

export function seekerPath(division: Division, service?: string) {
  if (division.id !== "hr") return "/careers";
  const sector = service || division.items[0]?.title || "";
  return `/job-seeker-enquiry?sector=${encodeURIComponent(sector)}`;
}

export function serviceBySlug(slug: string) {
  for (const division of divisions) {
    if (division.href.endsWith(`/${slug}`)) return { division, item: null as ServiceLink | null };
    const item = division.items.find((entry) => entry.href.endsWith(`/${slug}`));
    if (item) return { division, item };
  }
  return null;
}

export function allServiceSlugs() {
  const slugs = new Set<string>();
  for (const division of divisions) {
    slugs.add(division.href.split("/").pop() || "");
    for (const item of division.items) slugs.add(item.href.split("/").pop() || "");
  }
  return [...slugs].filter((slug) => Boolean(slug) && slug !== "hr-recruitment");
}
