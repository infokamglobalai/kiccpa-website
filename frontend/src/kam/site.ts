export const brand = {
  name: "KICCPA",
  legalName: "Kuwait International Company for Computer Programming Activities",
  relationship:
    "KICCPA delivers custom software, learning platforms, and business systems for organisations that need the work shaped around their own process.",
  description:
    "KICCPA brings together technology development, cloud expertise, business operations, and workforce solutions to help organisations build capabilities and scale with confidence.",
};

export const contacts = {
  primaryPhone: { label: "Kuwait", display: "+965 9988 9588", tel: "+96599889588" },
  kuwaitOfficeLine: { label: "Kuwait", display: "+965 2228 9927", tel: "+96522289927" },
  publishedPhones: [
    { label: "Kuwait", display: "+965 6091 9345", tel: "+96560919345" },
    { label: "Kuwait", display: "+965 6078 0180", tel: "+96560780180" },
    { label: "Kuwait", display: "+965 9879 3440", tel: "+96598793440" },
    { label: "USA", display: "+1 252 410 8568", tel: "+12524108568" },
  ],
  emails: [
    { label: "General", address: "info@kiccpa.com" },
    { label: "GCC sales", address: "sales1.gcc@kiccpa.com" },
    { label: "GCC marketing", address: "marketing.gcc@kiccpa.com" },
    { label: "Africa marketing", address: "marketing.africa@kiccpa.com" },
    { label: "Africa sales", address: "sales1.africa@kiccpa.com" },
  ],
  people: [
    {
      region: "Kenya",
      name: "Rahma Wambui Ali",
      phone: "+254 750 150079",
      tel: "+254750150079",
      email: "rahma@kiccpa.com",
      note: "Named contact for enquiries. Not presented as a company office.",
    },
    {
      region: "Tunisia",
      name: "Ghada Mhadheb",
      phone: "+216 23 485 826",
      tel: "+21623485826",
      email: "ghada@kiccpa.com",
      note: "Named contact for enquiries. Not presented as a company office.",
    },
  ],
  whatsapp: "96599889588",
  domainNote: "These are the published KICCPA phone numbers and email addresses.",
};

export const socials: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/kiccpa" },
  { label: "Instagram", href: "https://www.instagram.com/kiccpa" },
  { label: "Facebook", href: "https://www.facebook.com/kiccpa" },
  { label: "YouTube", href: "https://www.youtube.com/@kiccpa" },
];

export type ServiceId =
  | "it-digital"
  | "cloud-devops"
  | "bot"
  | "bpo"
  | "hr"
  | "platforms"
  | "other";

export const serviceOptions: { id: ServiceId; label: string }[] = [
  { id: "it-digital", label: "IT & Digital Solutions" },
  { id: "cloud-devops", label: "Cloud & DevOps" },
  { id: "bot", label: "BOT & Offshore Delivery" },
  { id: "bpo", label: "Business Process Outsourcing" },
  { id: "hr", label: "HR & Recruitment" },
  { id: "platforms", label: "Digital Platforms" },
  { id: "other", label: "Other Enquiry" },
];

export const engagementModels = [
  {
    id: "project",
    title: "Project-based delivery",
    meaning: "A defined piece of work with an agreed scope, timeline, and set of responsibilities.",
    when: "Useful when the requirement can be described clearly and delivered as a bounded project.",
    involves: "Discovery of the requirement, a written scope, delivery milestones, and a review at the end of the agreed work.",
  },
  {
    id: "dedicated",
    title: "Dedicated team or offshore delivery",
    meaning: "People assigned to your workstream, operating against an agreed process rather than a single fixed project.",
    when: "Useful when the work is ongoing and you want a stable group rather than a sequence of separate projects.",
    involves: "Role definitions, a working rhythm, reporting, and a sourcing location discussed for the type of work.",
  },
  {
    id: "bot",
    title: "Build-Operate-Transfer",
    meaning: "A staged model: build a capability, operate it, and — only if the agreement includes it — prepare a transfer.",
    when: "Worth discussing when you may want to run the capability yourselves later. Transfer is not automatic.",
    involves: "A build plan, an operating period, and transfer terms covering timing, ownership, and employment only where they are written into the agreement.",
  },
  {
    id: "managed",
    title: "Ongoing platform support",
    meaning: "Continued support for a platform already in use, such as the learning products on this website.",
    when: "Relevant when you already use, or plan to use, a product such as the LMS and want a conversation about ongoing support. This is not a published uptime guarantee.",
    involves: "The product in question, the kind of support you need, and a scope that is agreed before any commitment.",
  },
] as const;

export const sourcing = [
  {
    id: "technology",
    label: "Technology & digital",
    summary: "India, including Bengaluru and Hyderabad, for technology and related capabilities.",
    detail:
      "Technology sourcing is described for India, with Bengaluru and Hyderabad named. This is a sourcing note, not a statement that KICCPA owns offices or delivery centres in those cities.",
  },
  {
    id: "operations",
    label: "Business operations",
    summary: "The Philippines for business operations.",
    detail:
      "Business process support is described with the Philippines as the sourcing location. No facility address or headcount is published here.",
  },
  {
    id: "people",
    label: "HR & recruitment",
    summary: "India and the Philippines for HR and recruitment capabilities.",
    detail:
      "Recruitment coordination is described across India and the Philippines. Candidate volumes and hiring timelines are not stated because they are not published.",
  },
] as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", mega: true },
  { href: "/about", label: "About Us" },
  { href: "/products", label: "Products" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export const megaGroups = [
  {
    label: "Technology & AI",
    blurb: "Software, cloud, automation, and support.",
    links: [
      { href: "/services/technology-ai", title: "Technology & AI", text: "The division overview." },
      { href: "/services/ai-automation", title: "AI & Automation", text: "Scoped to a stated requirement." },
      { href: "/services/software-development", title: "Software & App Development", text: "Applications around an agreed process." },
      { href: "/services/cloud-data", title: "Cloud & Data Solutions", text: "Cloud and data conversations." },
      { href: "/services/it-support-cybersecurity", title: "IT Support & Cybersecurity", text: "Support enquiries. No certification is claimed." },
    ],
  },
  {
    label: "Business Outsourcing",
    blurb: "Customer, sales, and back-office support.",
    links: [
      { href: "/services/business-outsourcing", title: "Business Outsourcing", text: "The division overview." },
      { href: "/services/customer-support", title: "Customer Service & Support", text: "Workflow-based support enquiries." },
      { href: "/services/sales-lead-generation", title: "Sales & Lead Generation", text: "Sales support. Results are not guaranteed." },
      { href: "/services/back-office-bpo", title: "Back Office & BPO", text: "Process support with an agreed scope." },
      { href: "/services/virtual-assistants-crm", title: "Virtual Assistants & CRM", text: "Assistant and CRM support." },
    ],
  },
  {
    label: "HR & Recruitment",
    blurb: "Sector enquiries. Not a list of open jobs.",
    links: [
      { href: "/services/hr-recruitment", title: "HR & Recruitment", text: "Sectors and enquiry paths." },
      { href: "/services/healthcare-recruitment", title: "Healthcare", text: "Nursing and medical enquiries." },
      { href: "/services/hospitality-recruitment", title: "Hospitality", text: "Hotel and hospitality enquiries." },
      { href: "/services/oil-gas-recruitment", title: "Oil & Gas", text: "Energy sector enquiries." },
      { href: "/careers", title: "Careers", text: "Published roles, where a CV can be uploaded." },
    ],
  },
];

export const homeServices = [
  {
    href: "/services/it-digital-solutions",
    kicker: "Technology",
    title: "IT & Digital Solutions",
    text: "Build digital experiences, applications, and software capabilities aligned with your business requirements.",
    cta: "Explore IT Solutions",
    image: "/assets/services/digital.jpg",
    alt: "Engineers working together in a dark studio with warm accent light.",
  },
  {
    href: "/services/cloud-devops",
    kicker: "Infrastructure",
    title: "Cloud & DevOps",
    text: "Improve deployment workflows, infrastructure operations, automation, and cloud delivery.",
    cta: "Explore Cloud Services",
    image: "/assets/services/cloud.jpg",
    alt: "Abstract layered structures suggesting cloud infrastructure.",
  },
  {
    href: "/services/bot-offshore-delivery",
    kicker: "Delivery model",
    title: "BOT & Offshore Delivery",
    text: "Explore a structured approach to building and operating dedicated delivery capabilities, with a potential transfer model aligned to agreed business requirements.",
    cta: "Explore the BOT Model",
    image: "/assets/services/operations.jpg",
    alt: "A professional team collaborating in a modern office.",
  },
  {
    href: "/services/business-process-outsourcing",
    kicker: "Operations",
    title: "Business Process Outsourcing",
    text: "Support business operations through structured workflows, process support, and scalable service delivery.",
    cta: "Explore Business Operations",
    image: "/assets/industries/enterprise.jpg",
    alt: "A quiet conference room in a professional services office.",
  },
  {
    href: "/services/hr-recruitment",
    kicker: "Workforce",
    title: "HR & Recruitment",
    text: "Support talent sourcing, recruitment coordination, and workforce requirements through suitable delivery models.",
    cta: "Explore HR Solutions",
    image: "/assets/services/people.jpg",
    alt: "Two professionals in a recruitment conversation.",
  },
];

export const principles = [
  { n: "01", title: "Integrated capabilities", text: "Connect technology, operations, and workforce requirements instead of treating them as separate purchases." },
  { n: "02", title: "Practical delivery", text: "Align scope, processes, and outcomes with the business need in front of you." },
  { n: "03", title: "Flexible engagement", text: "Discuss the delivery model that fits the work — project, dedicated team, or a BOT conversation." },
  { n: "04", title: "Scalable foundations", text: "Build something that can change as the organisation’s requirements change." },
];

export const howWeWork = [
  { n: "01", title: "Understand", text: "Learn about the business requirement." },
  { n: "02", title: "Define", text: "Agree on scope, priorities, responsibilities, and delivery approach." },
  { n: "03", title: "Plan", text: "Establish the workflow, resources, and milestones." },
  { n: "04", title: "Deliver", text: "Implement the agreed solution." },
  { n: "05", title: "Improve", text: "Review progress and identify next steps." },
];

export const industries = [
  {
    slug: "education",
    title: "Education",
    image: "/assets/industries/education.jpg",
    alt: "A modern school building at dusk.",
    text: "Learning platforms already described on this site: LearnX school management materials, EduAiTutors, and the KICCPA LMS packages.",
    verified: true,
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    image: "/assets/industries/healthcare.jpg",
    alt: "A calm hospital corridor with soft daylight.",
    text: "Digital tools and operational support can be discussed for healthcare organisations. No clinical certification is claimed.",
    verified: false,
  },
  {
    slug: "retail",
    title: "Retail and e-commerce",
    image: "/assets/industries/retail.jpg",
    alt: "A contemporary retail interior with sculptural shelves.",
    text: "Application, integration, and operations support for retail teams. No completed retail case study is published here.",
    verified: false,
  },
  {
    slug: "logistics",
    title: "Logistics",
    image: "/assets/industries/logistics.jpg",
    alt: "An ordered warehouse aisle in cool light.",
    text: "Software and process support can be scoped for logistics operations. No route-optimisation guarantee is offered.",
    verified: false,
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    image: "/assets/industries/hospitality.jpg",
    alt: "An evening hotel lobby with a single warm lamp.",
    text: "Digital and workforce requirements for hospitality can be discussed. No property portfolio is claimed.",
    verified: false,
  },
  {
    slug: "enterprise",
    title: "Enterprise and professional services",
    image: "/assets/industries/enterprise.jpg",
    alt: "A long conference table in a modern office.",
    text: "Custom software, CRM, and business digitisation for organisations that need systems shaped around their own process.",
    verified: true,
  },
];

export const products = [
  {
    name: "LearnX",
    status: "Live product",
    text: "The school platform on learnx.school: attendance, fees, buses, exams, and parent updates under the school's own name.",
    href: "https://learnx.school",
    external: true,
    cta: "Open learnx.school",
    points: ["Admissions, academics, fees, and attendance", "The school's own web address", "Opens learnx.school"],
  },
  {
    name: "EduAiTutors",
    status: "Linked from the current website",
    text: "Online coaching for NEET, JEE, and a foundation programme for classes 6 to 10. Live sessions are listed for India and for GCC time zones.",
    href: "https://eduaitutors.com",
    external: true,
    cta: "Open eduaitutors.com",
    points: ["Foundation classes 6 to 10", "NEET and JEE live sessions", "Opens eduaitutors.com"],
  },
  {
    name: "EduAiTutors platform",
    status: "Learning address",
    text: "kam.eduaitutors.com is the platform address published with EduAiTutors. Programme details stay on eduaitutors.com.",
    href: "https://kam.eduaitutors.com",
    external: true,
    cta: "Open kam.eduaitutors.com",
    points: ["Learning site", "Programmes stay on eduaitutors.com", "Opens the platform address"],
  },
];

export const jobDepartments = [
  { id: "it-digital", label: "IT & Digital Solutions", href: "/services/it-digital-solutions" },
  { id: "cloud-devops", label: "Cloud & DevOps", href: "/services/cloud-devops" },
  { id: "bot", label: "BOT & Offshore Delivery", href: "/services/bot-offshore-delivery" },
  { id: "bpo", label: "Business Process Outsourcing", href: "/services/business-process-outsourcing" },
  { id: "hr", label: "HR & Recruitment", href: "/services/hr-recruitment" },
  { id: "platforms", label: "Digital Platforms", href: "/solutions" },
  { id: "corporate", label: "Corporate", href: "/careers" },
] as const;

export const preservedOfferings = [
  "Custom software development",
  "CRM solutions",
  "Learning platforms, including the LMS packages on this site",
  "AI and automation, as positioned on the current website",
  "Business digitisation",
];
