export type DivisionChallenge = {
  n: string;
  title: string;
  desc: string;
};

export type DivisionServiceItem = {
  title: string;
  href: string;
  summary: string;
  bullets: [string, string, string];
  image?: string;
  alt?: string;
};

export type DivisionDeliverable = {
  title: string;
  desc: string;
  tag: string;
};

export type DivisionEngagementModel = {
  title: string;
  tagline: string;
  bestFor: string;
  howItWorks: string;
  benefits: string[];
};

export type DivisionFAQ = {
  q: string;
  a: string;
};

export type DivisionFullContent = {
  id: "technology" | "outsourcing" | "hr";
  divisionTitle: string;
  eyebrow: string;
  heroHeadline: string;
  heroSubtitle: string;
  challengesHead: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  challenges: [DivisionChallenge, DivisionChallenge, DivisionChallenge];
  servicesHead: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  services: DivisionServiceItem[];
  deliverablesHead: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  deliverables: DivisionDeliverable[];
  waysToWorkHead: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  waysToWork: [DivisionEngagementModel, DivisionEngagementModel, DivisionEngagementModel];
  faqHead: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  faqs: DivisionFAQ[];
};

export const divisionData: Record<"technology" | "outsourcing" | "hr", DivisionFullContent> = {
  technology: {
    id: "technology",
    divisionTitle: "Technology & AI",
    eyebrow: "Technology & AI Division",
    heroHeadline: "Smart technology. Engineered for scale.",
    heroSubtitle:
      "KICCPA designs, develops, and delivers enterprise-grade software, AI-driven automation, and resilient cloud architectures aligned precisely with your operating workflows.",
    challengesHead: {
      eyebrow: "Operational Friction",
      title: "Challenges we help solve.",
      lead: "Organizations face mounting technical friction when legacy systems and fragmented tools fail to support rapid business demands.",
    },
    challenges: [
      {
        n: "01",
        title: "Legacy Systems & Technical Debt",
        desc: "Outdated software architectures and siloed data slow down feature releases, increase maintenance costs, and resist modern cloud integrations.",
      },
      {
        n: "02",
        title: "Uncertain AI & Automation ROI",
        desc: "Difficulty identifying high-impact automation use cases often results in stalled prototypes, scattered tooling, and unfulfilled efficiency promises.",
      },
      {
        n: "03",
        title: "Engineering Capacity Bottlenecks",
        desc: "Hiring and retaining specialized software architects, full-stack engineers, and cloud specialists creates costly project delays and delivery risks.",
      },
    ],
    servicesHead: {
      eyebrow: "Core Capabilities",
      title: "Services in this division.",
      lead: "Every service is scoped around documented business objectives and delivered by specialized engineering squads.",
    },
    services: [
      {
        title: "AI & Automation",
        href: "/services/ai-automation",
        summary: "Intelligent automation and AI pipelines scoped to stated operational requirements.",
        bullets: [
          "Intelligent document parsing, data extraction, and OCR workflows",
          "Custom conversational AI assistants, chat interfaces, and internal copilots",
          "Automated cross-platform business workflows eliminating manual repetitive tasks",
        ],
        image: "/images/ai-automation.png",
        alt: "AI predictive analytics, machine learning, and automation workflows.",
      },
      {
        title: "Software & App Development",
        href: "/services/software-development",
        summary: "Bespoke web and mobile platforms shaped around your organization's exact processes.",
        bullets: [
          "Full-stack enterprise web platforms built with modern TypeScript frameworks",
          "Cross-platform iOS and Android mobile applications with offline-first capabilities",
          "Secure REST & GraphQL API engineering, microservices, and legacy modernization",
        ],
        image: "/images/software-architecture.jpg",
        alt: "Custom enterprise software architecture and application development.",
      },
      {
        title: "Cloud & Data Solutions",
        href: "/services/cloud-data",
        summary: "Secure cloud infrastructure delivery and centralized business data pipelines.",
        bullets: [
          "Multi-cloud architecture, workload migration, and cost governance (AWS, Azure, GCP)",
          "DevOps automation, Docker/Kubernetes containerization, and automated CI/CD pipelines",
          "Data warehousing, pipeline ETL engineering, and real-time executive BI dashboards",
        ],
        image: "/assets/services/cloud.jpg",
        alt: "Cloud infrastructure, data pipelines, and server architecture.",
      },
      {
        title: "IT Support & Cybersecurity",
        href: "/services/it-support-cybersecurity",
        summary: "Proactive enterprise IT support, endpoint monitoring, and security governance.",
        bullets: [
          "24/7 infrastructure uptime monitoring, proactive health checks, and patch management",
          "Tier 1–3 remote IT helpdesk support, ticket triaging, and user device management",
          "Security vulnerability assessments, access control governance, and endpoint security",
        ],
        image: "/images/it-support.png",
        alt: "Reliable IT systems support, security monitoring, and endpoint administration.",
      },
    ],
    deliverablesHead: {
      eyebrow: "Tangible Outputs",
      title: "What you receive.",
      lead: "We deliver concrete, production-ready assets backed by full documentation and complete client IP ownership.",
    },
    deliverables: [
      {
        title: "System Architecture Blueprints",
        desc: "Comprehensive technical architecture documentation, database schema designs, and data flow specifications.",
        tag: "Technical Blueprint",
      },
      {
        title: "Production-Ready Source Code",
        desc: "Clean, linted, tested, and version-controlled repository with 100% intellectual property rights transferred to your organization.",
        tag: "Full IP Ownership",
      },
      {
        title: "Automated CI/CD & Cloud Environments",
        desc: "Staging and production cloud environments configured with containerized deployments and automated testing pipelines.",
        tag: "Infrastructure",
      },
      {
        title: "Operational Documentation & API Specs",
        desc: "Interactive OpenAPI/Swagger documentation, deployment runbooks, and admin user manuals for seamless handoff.",
        tag: "Documentation",
      },
      {
        title: "Post-Deployment Warranty & SLA Support",
        desc: "Structured post-launch warranty period with proactive bug fixes, performance monitoring, and guaranteed response SLAs.",
        tag: "Support SLA",
      },
    ],
    waysToWorkHead: {
      eyebrow: "Engagement Models",
      title: "Ways to work with us.",
      lead: "Choose the commercial structure that matches your project scope, timeline, and internal capability.",
    },
    waysToWork: [
      {
        title: "Project-Based Delivery",
        tagline: "Fixed Scope & Milestone Execution",
        bestFor: "Defined technical scopes, MVPs, system migrations, or new platform builds.",
        howItWorks: "Detailed discovery upfront, agreed functional specifications, milestone deliverables, and staged sign-offs.",
        benefits: ["Predictable budget and timeline", "Guaranteed deliverables per milestone", "Zero ongoing management overhead"],
      },
      {
        title: "Dedicated Team (PODs)",
        tagline: "Offshore Engineering Extension",
        bestFor: "Long-term product engineering, multi-sprint roadmaps, and scaling developer capacity.",
        howItWorks: "Pre-vetted software architects, developers, and QA engineers working exclusively within your daily standups and tooling.",
        benefits: ["Direct technical direction & agile workflows", "Flexible team scaling on demand", "Cost-effective global talent access"],
      },
      {
        title: "Managed Service / SLA",
        tagline: "Ongoing Maintenance & Platform Care",
        bestFor: "Continuous cloud optimization, 24/7 application uptime, and ongoing iterative improvements.",
        howItWorks: "KICCPA handles platform health, regular patch releases, security monitoring, and continuous minor enhancements under strict SLAs.",
        benefits: ["Guaranteed response and resolution times", "Proactive infrastructure monitoring", "Predictable operational expenditure"],
      },
    ],
    faqHead: {
      eyebrow: "Frequently Asked Questions",
      title: "Common questions about Technology & AI.",
      lead: "Everything you need to know about working with KICCPA's technology and software engineering team.",
    },
    faqs: [
      {
        q: "How does KICCPA initiate a new software or AI engagement?",
        a: "We begin with a structured technical discovery workshop to analyze your business workflows, current architecture, and functional requirements. We then provide a detailed architecture blueprint, timeline, and commercial proposal before any code is written.",
      },
      {
        q: "Who owns the source code and intellectual property?",
        a: "Your organization retains 100% ownership of all source code, design assets, database schemas, and intellectual property developed during the engagement. Full repository access is maintained throughout.",
      },
      {
        q: "What tech stacks and frameworks do your teams specialize in?",
        a: "Our core engineering capabilities include modern web frameworks (React, Next.js, Node.js, TypeScript, Python), mobile technologies (React Native, Flutter), cloud platforms (AWS, Azure, GCP), and enterprise databases (PostgreSQL, MongoDB, Redis).",
      },
      {
        q: "Can we hire a dedicated software squad instead of a fixed project?",
        a: "Yes. Our Dedicated Engineering model pairs your product leadership with handpicked, senior developers who operate as a natural extension of your team, participating in daily standups and sprint planning.",
      },
      {
        q: "Do you provide post-launch support and ongoing maintenance?",
        a: "Yes. Every production release is backed by an initial warranty period, followed by optional SLA-backed managed service agreements covering continuous monitoring, security updates, and feature enhancements.",
      },
    ],
  },

  outsourcing: {
    id: "outsourcing",
    divisionTitle: "Business Outsourcing",
    eyebrow: "Business Outsourcing Division",
    heroHeadline: "Your operations, expertly managed.",
    heroSubtitle:
      "KICCPA manages critical operational functions—from multichannel customer support and sales qualification to back-office workflows—delivering consistent service quality backed by rigorous SLAs.",
    challengesHead: {
      eyebrow: "Operational Bottlenecks",
      title: "Challenges we help solve.",
      lead: "Growing companies often struggle with escalating labor costs, unpredictable support quality, and administrative drag that divert focus from core strategy.",
    },
    challenges: [
      {
        n: "01",
        title: "Escalating In-House Operating Costs",
        desc: "Building and maintaining internal support desks, recruitment overhead, facilities, and supervisor payroll places severe pressure on operational margins.",
      },
      {
        n: "02",
        title: "Inconsistent Customer Experience",
        desc: "Support requests scattered across phone, email, and social channels result in delayed responses, uneven agent answers, and frustrated customers.",
      },
      {
        n: "03",
        title: "Back-Office Administrative Drag",
        desc: "Manual transaction entries, repetitive data audits, and routine invoicing paperwork pull executive leadership away from core revenue-generating priorities.",
      },
    ],
    servicesHead: {
      eyebrow: "Core Capabilities",
      title: "Services in this division.",
      lead: "Structured operational workflows delivered by trained squads located across our global delivery centers.",
    },
    services: [
      {
        title: "Customer Service & Support",
        href: "/services/customer-support",
        summary: "Multichannel customer interaction and technical support tailored to your brand standards.",
        bullets: [
          "24/7 omnichannel customer service across voice, live chat, email, and WhatsApp",
          "Strict SLA enforcement for First Response Time (FRT) and First Contact Resolution (FCR)",
          "Multilingual agent squads aligned with regional Middle East and international customer bases",
        ],
        image: "/assets/services/operations.jpg",
        alt: "Customer support professionals working in an operational center.",
      },
      {
        title: "Sales & Lead Generation",
        href: "/services/sales-lead-generation",
        summary: "Targeted outbound prospecting and qualified appointment setting with clear engagement metrics.",
        bullets: [
          "B2B account profiling, verified prospect list building, and outbound outreach",
          "Inbound inquiry qualification, speed-to-lead response, and calendar scheduling",
          "Transparent CRM logging, pipeline visibility, and weekly conversion performance reporting",
        ],
        image: "/images/sales-crm.jpg",
        alt: "Sales strategy and proactive customer relationship management.",
      },
      {
        title: "Back Office & BPO",
        href: "/services/back-office-bpo",
        summary: "Scalable data processing, transaction verification, and repetitive administrative support.",
        bullets: [
          "Invoice processing, accounts payable/receivable verification, and billing administration",
          "High-volume data entry, document indexing, record digitization, and content moderation",
          "Compliance audits, operational reconciliation, and custom reporting workflows",
        ],
        image: "/images/back-office.jpg",
        alt: "End-to-end operational digitization and back-office transaction workflows.",
      },
      {
        title: "Virtual Assistants & CRM",
        href: "/services/virtual-assistants-crm",
        summary: "Dedicated executive assistants and CRM specialists supporting the tools you already use.",
        bullets: [
          "Executive calendar coordination, email triage, meeting documentation, and travel logistics",
          "CRM hygiene, contact enrichment, and pipeline automation across Salesforce, HubSpot, and Zoho",
          "Ad-hoc research, presentation preparation, and cross-functional team coordination",
        ],
        image: "/images/virtual-assistants.jpg",
        alt: "Executive assistant managing schedules and CRM workflows.",
      },
    ],
    deliverablesHead: {
      eyebrow: "Operational Outputs",
      title: "What you receive.",
      lead: "Transparent, measurable operational delivery governed by clear metrics, documentation, and continuous oversight.",
    },
    deliverables: [
      {
        title: "Tailored Standard Operating Procedures (SOPs)",
        desc: "Documented interaction playbooks, exception-handling guides, and workflow trees codified specifically for your business.",
        tag: "Documentation",
      },
      {
        title: "Dedicated, Pre-Trained Operational Squad",
        desc: "Handpicked agents, team leaders, and quality assurance analysts dedicated exclusively to your customer queues.",
        tag: "Dedicated Staff",
      },
      {
        title: "Live KPI & Analytics Dashboards",
        desc: "Real-time visibility into customer volume, response times, ticket categories, resolution rates, and CSAT scores.",
        tag: "Transparency",
      },
      {
        title: "Quality Assurance & Coaching Audits",
        desc: "Weekly call, email, and ticket audits scored against rigorous quality standards, coupled with continuous agent coaching.",
        tag: "Quality Control",
      },
      {
        title: "Monthly Strategic Business Reviews",
        desc: "Executive presentations analyzing process trends, identifying efficiency bottlenecks, and recommending automation optimizations.",
        tag: "Continuous Improvement",
      },
    ],
    waysToWorkHead: {
      eyebrow: "Engagement Models",
      title: "Ways to work with us.",
      lead: "Flexible outsourcing models designed to adapt as your transaction volumes grow.",
    },
    waysToWork: [
      {
        title: "Project-Based Outsourcing",
        tagline: "Targeted Campaign / Data Cleanup",
        bestFor: "One-off data migration, seasonal lead generation sprints, or retrospective audit cleanups.",
        howItWorks: "Defined batch volume, clear completion timeline, fixed fee structure, and milestone verification.",
        benefits: ["Predictable one-time cost", "Rapid execution without long-term commitment", "No internal team distraction"],
      },
      {
        title: "Dedicated Operational Team",
        tagline: "Dedicated Offshore Squad",
        bestFor: "Ongoing customer support, continuous back-office operations, and dedicated virtual assistants.",
        howItWorks: "Dedicated full-time agents working exclusively for your company, managed by an onsite team leader and QA analyst.",
        benefits: ["100% brand alignment and process knowledge", "Direct queue management and flexibility", "Substantial operational cost savings"],
      },
      {
        title: "Fully Managed Service (SLA)",
        tagline: "End-to-End Operational Ownership",
        bestFor: "Turnkey customer operations where KICCPA manages scheduling, staffing, tooling, and SLA delivery.",
        howItWorks: "KICCPA commits to contractual response times, resolution benchmarks, and uptime metrics with full operational accountability.",
        benefits: ["Guaranteed service performance", "Zero management burden for client leadership", "Seamless scale during volume surges"],
      },
    ],
    faqHead: {
      eyebrow: "Frequently Asked Questions",
      title: "Common questions about Business Outsourcing.",
      lead: "Key details on onboarding, data security, and how KICCPA manages outsourced operations.",
    },
    faqs: [
      {
        q: "How long does it take to onboard an outsourced team?",
        a: "Standard operational ramp-up takes 2 to 4 weeks. This covers talent selection, system access setup, comprehensive SOP training, simulated scenario testing, and supervised soft-launch operations.",
      },
      {
        q: "How do you ensure data security and confidentiality?",
        a: "Our delivery centers enforce strict security protocols: clean desk policies, restricted physical access, role-based CRM permissions, encrypted network connections, and comprehensive non-disclosure agreements (NDAs).",
      },
      {
        q: "What CRM and helpdesk systems do your agents work with?",
        a: "Our teams are experienced in industry-standard platforms including Zendesk, Salesforce, HubSpot, Freshdesk, Zoho, Microsoft Teams, Slack, and custom client portals.",
      },
      {
        q: "Where are KICCPA's outsourcing teams based?",
        a: "Our core BPO operations hub is based in the Philippines for English and multichannel customer service, supported by regional teams in Kuwait, India, and North Africa for multilingual Arabic and European requirements.",
      },
      {
        q: "What happens if our support volume spikes unexpectedly?",
        a: "Our managed delivery structure allows for rapid cross-trained buffer allocation during peak seasons or promotional campaigns, preventing backlog accumulation and preserving response times.",
      },
    ],
  },

  hr: {
    id: "hr",
    divisionTitle: "HR & Recruitment",
    eyebrow: "HR & Recruitment Division",
    heroHeadline: "The right people for the roles you need.",
    heroSubtitle:
      "KICCPA connects enterprise employers with vetted, qualified candidates across specialized industrial and professional sectors. (Recruitment enquiries are reviewed against client specifications; no placement is guaranteed).",
    challengesHead: {
      eyebrow: "Talent Bottlenecks",
      title: "Challenges we help solve.",
      lead: "Employers in demanding industries struggle with acute skill shortages, unverified credentials, and lengthy hiring cycles.",
    },
    challenges: [
      {
        n: "01",
        title: "Critical Shortage of Specialized Talent",
        desc: "Sourcing experienced practitioners in healthcare, petroleum engineering, and industrial operations is fiercely competitive and regionally constrained.",
      },
      {
        n: "02",
        title: "Time-Consuming Vetting & Credentialing",
        desc: "Reviewing hundreds of unqualified applications, verifying overseas degrees, and confirming regulatory licenses creates massive administrative overhead.",
      },
      {
        n: "03",
        title: "Costly Operational Vacancies",
        desc: "Prolonged vacancies in frontline clinical, hospitality, or site supervisory positions disrupt project timelines and compromise service quality.",
      },
    ],
    servicesHead: {
      eyebrow: "Sectors We Support",
      title: "Recruitment sectors in this division.",
      lead: "Specialized recruitment channels connecting organizations with qualified talent across critical industries.",
    },
    services: [
      {
        title: "Nursing",
        href: "/services/healthcare-recruitment",
        summary: "Sourcing and credential verification for licensed nursing professionals across clinical specialties.",
        bullets: [
          "ICU, ER, surgical, pediatric, and general ward registered nurses",
          "Full license verification, clinical competence screening, and background checks",
          "Support for cross-border qualification equivalency and institutional requirements",
        ],
        image: "/assets/industries/healthcare.jpg",
        alt: "Nursing and healthcare professional in a clinic.",
      },
      {
        title: "Medical & Healthcare",
        href: "/services/healthcare-recruitment",
        summary: "Specialist physicians, clinical consultants, and allied health professionals for hospitals and clinics.",
        bullets: [
          "Specialist physicians, surgeons, anesthesiologists, and general practitioners",
          "Diagnostic imaging technologists, laboratory scientists, and pharmacists",
          "Verification of medical boards, peer references, and clinical experience dossiers",
        ],
        image: "/images/medical.jpg",
        alt: "Specialist medical doctors and clinical consultants.",
      },
      {
        title: "Hotels & Hospitality",
        href: "/services/hospitality-recruitment",
        summary: "Front-of-house, culinary, and executive talent for luxury hotels, resorts, and dining venues.",
        bullets: [
          "Front office managers, guest relations coordinators, and concierge professionals",
          "Executive chefs, sous chefs, pastry specialists, and culinary brigade personnel",
          "Housekeeping directors, F&B managers, and hospitality event coordinators",
        ],
        image: "/assets/industries/hospitality.jpg",
        alt: "Hospitality staff in a luxury hotel setting.",
      },
      {
        title: "Oil & Gas",
        href: "/services/oil-gas-recruitment",
        summary: "Certified engineering, technical, and site supervision personnel for energy operations.",
        bullets: [
          "Petroleum, chemical, drilling, and mechanical engineers with field experience",
          "Health, Safety, & Environment (HSE) officers and quality control site inspectors",
          "Certified instrumentation technicians, rig operators, and plant maintenance staff",
        ],
        image: "/images/oil-gas.jpg",
        alt: "Industrial energy operations facility and engineers.",
      },
      {
        title: "Construction",
        href: "/services/construction-recruitment",
        summary: "Project managers, civil engineers, and skilled trade supervisors for large-scale developments.",
        bullets: [
          "Civil project directors, site managers, quantity surveyors, and MEP coordinators",
          "Structural inspectors, safety supervisors, and heavy equipment operators",
          "Multi-stage background verification ensuring safety and labor regulatory compliance",
        ],
        image: "/images/construction.jpg",
        alt: "Civil engineering and commercial construction site supervision.",
      },
      {
        title: "Manufacturing",
        href: "/services/manufacturing-recruitment",
        summary: "Plant managers, QA inspectors, and technical operators for automated production facilities.",
        bullets: [
          "Plant operations managers, shift supervisors, and industrial engineers",
          "Quality assurance specialists, process auditors, and supply chain clerks",
          "Electrical maintenance mechanics, CNC operators, and warehouse managers",
        ],
        image: "/images/manufacturing.jpg",
        alt: "Automated manufacturing facility and plant operations.",
      },
    ],
    deliverablesHead: {
      eyebrow: "Recruitment Outputs",
      title: "What you receive.",
      lead: "Thoroughly verified, interview-ready candidate dossiers that simplify your hiring decisions.",
    },
    deliverables: [
      {
        title: "Vetted Candidate Profiles & Portfolios",
        desc: "Pre-screened candidate dossiers highlighting verified competencies, language proficiency, and relevant career achievements.",
        tag: "Candidate Dossier",
      },
      {
        title: "Comprehensive Credential & License Verification",
        desc: "Thorough validation of university degrees, professional board licenses, safety accreditations, and past employer references.",
        tag: "Verification",
      },
      {
        title: "Structured Screening & Evaluation Reports",
        desc: "Comparative candidate evaluation matrix evaluating technical competence, cultural fit, and salary alignment.",
        tag: "Evaluation Matrix",
      },
      {
        title: "Deployment & Onboarding Coordination",
        desc: "Assistance with contractual documentation, credential attestation, mobilization timelines, and transition logistics.",
        tag: "Coordination",
      },
      {
        title: "Placement Guarantee Period",
        desc: "Standard replacement guarantee ensuring candidate continuity and peace of mind during the initial probationary window.",
        tag: "Guarantee",
      },
    ],
    waysToWorkHead: {
      eyebrow: "Engagement Models",
      title: "Ways to work with us.",
      lead: "Structured recruitment arrangements aligned with your hiring volume and organizational timeline.",
    },
    waysToWork: [
      {
        title: "Contingent Search",
        tagline: "Success-Based Placement",
        bestFor: "Standard professional roles, individual vacancies, or selective hiring requirements.",
        howItWorks: "We source, screen, and present shortlisted candidates; our placement fee applies only upon successful candidate hiring.",
        benefits: ["Zero upfront financial risk", "Access to passive talent pools", "Standard replacement guarantee included"],
      },
      {
        title: "Retained / Executive Search",
        tagline: "Dedicated Leadership Recruitment",
        bestFor: "C-suite executives, specialized medical consultants, or confidential senior appointments.",
        howItWorks: "Dedicated recruitment specialists conducting thorough market mapping, discreet headhunting, and exhaustive candidate evaluations.",
        benefits: ["Priority focus from senior search partners", "Exhaustive talent mapping across regions", "Confidentiality and thorough vetting"],
      },
      {
        title: "Volume / Project Recruitment (RPO)",
        tagline: "Multi-Role Workforce Mobilization",
        bestFor: "Facility openings, new hospital wings, industrial plant commissioning, or seasonal expansions.",
        howItWorks: "End-to-end recruitment process management to source, screen, and mobilize multiple personnel across diverse job families.",
        benefits: ["Economies of scale with lower per-hire cost", "Consistent hiring velocity and standards", "Dedicated project coordinator assigned"],
      },
    ],
    faqHead: {
      eyebrow: "Frequently Asked Questions",
      title: "Common questions about HR & Recruitment.",
      lead: "Information for employers seeking to recruit and candidates inquiring about opportunities.",
    },
    faqs: [
      {
        q: "Is this a public job board or a direct recruitment service?",
        a: "KICCPA operates a direct enterprise recruitment service. We do not host public vacancy listings or guarantee placements; rather, we work on specific mandates from employer clients to source, verify, and present matching candidates.",
      },
      {
        q: "Which countries do you source talent from?",
        a: "We maintain established recruitment and sourcing networks across Kuwait, India, the Philippines, Kenya, Tunisia, and Saudi Arabia, enabling cross-border staffing tailored to local regulatory criteria.",
      },
      {
        q: "How does KICCPA verify candidate credentials?",
        a: "Our compliance team validates academic transcripts, professional registrations (such as nursing and medical boards), employment histories, and direct supervisor references before any candidate profile is presented.",
      },
      {
        q: "What happens if a placed candidate does not pass probation?",
        a: "We provide an agreed replacement guarantee window (typically 90 days). If a placed candidate leaves or does not meet agreed performance benchmarks during this period, we provide a qualified replacement at no additional fee.",
      },
      {
        q: "How can an employer initiate a recruitment mandate?",
        a: "Simply submit your requirements through our Request Staff form or contact our recruitment team directly. We will schedule a discovery consultation to review your job descriptions, salary bands, and timeline.",
      },
    ],
  },
};
