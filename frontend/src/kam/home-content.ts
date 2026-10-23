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

export const homeWhoWeAre = {
  eyebrow: "Who We Are",
  title: "Kuwait Roots. Global Engineering & Operations.",
  description:
    "Kuwait International Company for Computer Programming Activities (KICCPA) is a premier enterprise digital solutions platform. We unite intelligent software engineering, business process outsourcing, and global recruitment to empower organizations across the Middle East and worldwide.",
  stats: [
    { value: "Est. [TBC]", label: "Year Founded", note: "Pending confirmation from KICCPA", href: "/about" },
    { value: "03", label: "Core Divisions", note: "Technology & AI · Business Outsourcing · HR & Recruitment", href: "#services" },
    { value: "06", label: "Operating Regions", note: "Kuwait, India, Philippines, Saudi Arabia, Kenya, Tunisia", href: "#where-we-work" },
    { value: "[TBC]", label: "Team Size", note: "Pending confirmation from KICCPA", href: "/careers" },
  ],
};

export const homeWhereWeWork = [
  {
    code: "kw",
    name: "Kuwait",
    role: "Global Headquarters",
    desc: "Executive governance, regional client strategy, and enterprise consulting.",
    href: "/contact?region=Kuwait",
  },
  {
    code: "in",
    name: "India",
    role: "Technology & Engineering Center",
    desc: "Software architecture, AI development, cloud engineering, and delivery hub.",
    href: "/contact?region=India",
  },
  {
    code: "ph",
    name: "Philippines",
    role: "BPO & Customer Operations Hub",
    desc: "Multichannel customer support, virtual assistants, and CRM workflows.",
    href: "/contact?region=Philippines",
  },
  {
    code: "sa",
    name: "Saudi Arabia",
    role: "Regional Office",
    desc: "Strategic enterprise consulting, GCC delivery, and client engagement.",
    href: "/contact?region=Saudi+Arabia",
  },
  {
    code: "ke",
    name: "Kenya",
    role: "East Africa Operations",
    desc: "Regional coordination, client engagement, and workforce sourcing.",
    href: "/contact?region=Kenya",
  },
  {
    code: "tn",
    name: "Tunisia",
    role: "North Africa Operations",
    desc: "Regional point of contact, multilingual support, and talent channels.",
    href: "/contact?region=Tunisia",
  },
];

export const homeIndustries = [
  {
    title: "Healthcare",
    summary: "Clinical software integration, medical staffing, and healthcare operations.",
    image: "/assets/industries/healthcare.jpg",
    alt: "Healthcare professionals in a clinical environment.",
    href: "/services/healthcare-recruitment",
  },
  {
    title: "Hospitality",
    summary: "Guest relationship workflows, front-of-house talent, and operational staffing.",
    image: "/assets/industries/hospitality.jpg",
    alt: "Modern hospitality environment.",
    href: "/services/hospitality-recruitment",
  },
  {
    title: "Oil & Gas",
    summary: "Specialized engineering talent, field logistics, and supply chain digital systems.",
    image: "/assets/industries/logistics.jpg",
    alt: "Industrial supply chain and energy facility.",
    href: "/services/oil-gas-recruitment",
  },
  {
    title: "Construction",
    summary: "Technical workforce placement, project logistics support, and site workflows.",
    image: "/assets/industries/enterprise.jpg",
    alt: "Infrastructure project planning workspace.",
    href: "/services/construction-recruitment",
  },
  {
    title: "Manufacturing",
    summary: "Process digitization, plant operations support, and technical workforce placement.",
    image: "/assets/industries/retail.jpg",
    alt: "Modern manufacturing operations floor.",
    href: "/services/manufacturing-recruitment",
  },
  {
    title: "Education",
    summary: "LearnX school management ecosystem, EduAiTutors AI tutoring, and LMS packages.",
    image: "/assets/industries/education.jpg",
    alt: "Students engaging with digital learning platforms.",
    href: "/products",
  },
];

export const whyKiccpa = [
  {
    icon: "technology",
    title: "Technology That Works for Business",
    text: "Custom software architectures, modern cloud platforms, and practical AI implementations designed around your exact operational reality.",
    href: "/services/technology-ai",
    linkText: "Explore Tech Capabilities",
  },
  {
    icon: "operations",
    title: "Operations You Can Truly Rely On",
    text: "Disciplined business process outsourcing, omnichannel customer care, and CRM management backed by clear metrics and accountability.",
    href: "/services/business-outsourcing",
    linkText: "Explore Outsourcing",
  },
  {
    icon: "people",
    title: "People for Every Stage of Growth",
    text: "Targeted workforce sourcing across healthcare, hospitality, oil & gas, construction, and engineering to power your teams.",
    href: "/services/hr-recruitment",
    linkText: "Explore Workforce Solutions",
  },
  {
    icon: "delivery",
    title: "Connected Global Delivery",
    text: "Synchronized collaboration across 6 nations — blending Kuwait leadership with specialized offshore engineering and BPO centers.",
    href: "#where-we-work",
    linkText: "View Global Hubs",
  },
  {
    icon: "process",
    title: "Proven 5-Stage Delivery Process",
    text: "From understanding and definition to structured planning, reliable delivery, and continuous post-launch optimization.",
    href: "#how-we-work",
    linkText: "See Our 5-Stage Path",
  },
  {
    icon: "models",
    title: "Flexible Engagement Models",
    text: "Commercial options shaped to your requirements — from fixed-scope project delivery to dedicated squads and managed platform support.",
    href: "/services",
    linkText: "Explore All Models",
  },
];

export const homeSteps = [
  {
    n: "01",
    title: "Understand",
    sub: "Understand the Requirement",
    text: "We begin by understanding your vision, operational environment, and what success looks like.",
  },
  {
    n: "02",
    title: "Define",
    sub: "Define the Scope",
    text: "Clear technical specifications, architecture mapping, sprint cadence, and agreed deliverables.",
  },
  {
    n: "03",
    title: "Plan",
    sub: "Plan the Approach",
    text: "Resource allocation, roadmap finalization, risk mitigation, and milestone setting.",
  },
  {
    n: "04",
    title: "Deliver",
    sub: "Deliver the Agreed Solution",
    text: "Agile engineering and implementation validated with testing for performance, security, and reliability.",
  },
  {
    n: "05",
    title: "Improve",
    sub: "Review & Improve",
    text: "Ongoing operational hypercare, performance monitoring, continuous feedback, and proactive evolution.",
  },
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
    image: "/assets/hero/kuwait-city-skyline.jpg",
    alt: "Kuwait City skyline with illuminated skyscrapers and Kuwait Towers at dusk, reflecting KICCPA's headquarters and heritage.",
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
  who: { eyebrow: "Who We Are", title: "Kuwait Roots. Global Capabilities." },
  where: { eyebrow: "Where We Work", title: "Global Presence Across 6 Strategic Countries." },
  industries: { eyebrow: "Industries We Support", title: "Specialized Solutions for Core Sectors." },
  services: { eyebrow: "Services", title: "Three ways to start." },
  why: { eyebrow: "Why KICCPA", title: "The Right Expertise. One Connected Partner." },
  steps: { eyebrow: "How We Work", title: "A proven 5-stage delivery process." },
  platforms: { eyebrow: "Platforms", title: "Digital Platforms for Learning and Management." },
  close: {
    title: "Have a Business Challenge in Mind?",
    text: "Tell us what you need. We'll help you identify the appropriate service and discuss the next step.",
    primary: { label: "Discuss Your Requirements", href: "/business-enquiry" },
    secondary: { label: "Explore Our Services", href: "/services" },
    contact: {
      phone: { label: "Phone (Kuwait)", display: "+965 6091 9345", tel: "+96560919345" },
      whatsapp: { label: "WhatsApp", display: "+965 9988 9588", href: "https://wa.me/96599889588" },
      email: { label: "Email", display: "info@kiccpa.com", href: "mailto:info@kiccpa.com" },
    },
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
