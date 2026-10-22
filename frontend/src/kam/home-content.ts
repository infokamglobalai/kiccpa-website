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
    image: "/assets/services/digital.jpg",
    alt: "People working together in a technology studio.",
    cta: "Explore Technology Services",
    itemsLabel: "Services",
    clientLabel: "Request a Service",
    seekerLabel: "Explore Opportunities",
    items: [
      { title: "AI & Automation", href: "/services/ai-automation", summary: "Automation and AI work scoped to a stated business requirement.", image: "/assets/services/digital.jpg", alt: "People working together in a technology studio." },
      { title: "Software & App Development", href: "/services/software-development", summary: "Applications and software shaped around an agreed process.", image: "/assets/services/digital.jpg", alt: "A technology studio used for software conversations." },
      { title: "Cloud & Data Solutions", href: "/services/cloud-data", summary: "Cloud delivery and data work discussed against a written scope.", image: "/assets/services/cloud.jpg", alt: "A cool-lit technical environment used for cloud conversations." },
      { title: "IT Support & Cybersecurity", href: "/services/it-support-cybersecurity", summary: "Support and security conversations. No certification is claimed here.", image: "/assets/services/cloud.jpg", alt: "Technical workspace used beside IT support enquiries." },
    ],
  },
  {
    id: "outsourcing",
    href: "/services/business-outsourcing",
    title: "Business Outsourcing",
    line: "Your operations, expertly managed.",
    intro: "Discover business support services designed around your workflows, customer interactions, and operational requirements.",
    image: "/assets/services/operations.jpg",
    alt: "Colleagues working together in an office.",
    cta: "Explore Outsourcing Services",
    itemsLabel: "Services",
    clientLabel: "Request a Service",
    seekerLabel: "Explore Opportunities",
    items: [
      { title: "Customer Service & Support", href: "/services/customer-support", summary: "Customer interaction support discussed around your workflow.", image: "/assets/services/operations.jpg", alt: "Colleagues working together in an office." },
      { title: "Sales & Lead Generation", href: "/services/sales-lead-generation", summary: "Sales support enquiries. Results are not guaranteed.", image: "/assets/industries/enterprise.jpg", alt: "A meeting room used beside sales support enquiries." },
      { title: "Back Office & BPO", href: "/services/back-office-bpo", summary: "Back-office process support with an agreed scope.", image: "/assets/services/operations.jpg", alt: "An operations workspace." },
      { title: "Virtual Assistants & CRM", href: "/services/virtual-assistants-crm", summary: "Assistant and CRM support for the tools you already use.", image: "/assets/industries/enterprise.jpg", alt: "A conference table used beside CRM support enquiries." },
    ],
  },
  {
    id: "hr",
    href: "/services/hr-recruitment",
    title: "HR & Recruitment",
    line: "The right people for the roles you need.",
    intro: "Explore recruitment enquiries across relevant professional, healthcare, hospitality, and industrial sectors. This is not a list of open jobs, and no placement is promised.",
    image: "/assets/services/people.jpg",
    alt: "Two professionals in a conversation.",
    cta: "Explore Sectors & Roles",
    itemsLabel: "Sectors",
    clientLabel: "Request Staff",
    seekerLabel: "Start an Enquiry",
    items: [
      { title: "Nursing", href: "/services/healthcare-recruitment", summary: "A sector you can ask about. No licence or vacancy is published here.", image: "/assets/industries/healthcare.jpg", alt: "A calm hospital corridor." },
      { title: "Medical & Healthcare", href: "/services/healthcare-recruitment", summary: "Healthcare recruitment enquiries, reviewed by the team.", image: "/assets/industries/healthcare.jpg", alt: "A calm hospital corridor." },
      { title: "Hotels & Hospitality", href: "/services/hospitality-recruitment", summary: "Hospitality recruitment enquiries.", image: "/assets/industries/hospitality.jpg", alt: "An evening hotel lobby." },
      { title: "Oil & Gas", href: "/services/oil-gas-recruitment", summary: "Oil and gas recruitment enquiries.", image: "/assets/industries/logistics.jpg", alt: "An ordered industrial aisle." },
      { title: "Construction", href: "/services/construction-recruitment", summary: "Construction recruitment enquiries.", image: "/assets/industries/logistics.jpg", alt: "An industrial interior used beside construction enquiries." },
      { title: "Manufacturing", href: "/services/manufacturing-recruitment", summary: "Manufacturing recruitment enquiries.", image: "/assets/industries/logistics.jpg", alt: "An industrial interior used beside manufacturing enquiries." },
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
    image: "/images/resources/learnx-sms-catalog-cover.png",
    alt: "Cover of the LearnX school management catalogue.",
  },
  {
    name: "EduAiTutors",
    text: "Learning and tutoring.",
    href: "https://www.eduaitutors.com",
    external: true,
    cta: "Open EduAiTutors",
    image: "/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg",
    alt: "Visual for the EduAiTutors learning product.",
  },
  {
    name: "EduAiTutors platform",
    text: "The learning address.",
    href: "https://kam.eduaitutors.com",
    external: true,
    cta: "Open the platform",
    image: "/images/student-performance-dashboard.png",
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
