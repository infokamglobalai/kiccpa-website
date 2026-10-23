export type ServiceChallenge = {
  n: string;
  title: string;
  desc: string;
};

export type ServiceWhatWeDoItem = {
  title: string;
  desc: string;
  bullets: string[];
};

export type ServiceDeliverable = {
  title: string;
  desc: string;
  tag: string;
};

export type ServiceFAQ = {
  q: string;
  a: string;
};

export type ServicePageData = {
  slug: string;
  divisionId: "technology" | "outsourcing";
  divisionTitle: string;
  eyebrow: string;
  title: string;
  headline: string;
  lead: string;
  image: string;
  alt: string;
  challengesHead: { eyebrow: string; title: string; lead: string };
  challenges: [ServiceChallenge, ServiceChallenge, ServiceChallenge];
  whatWeDoHead: { eyebrow: string; title: string; lead: string };
  whatWeDo: ServiceWhatWeDoItem[];
  deliverablesHead: { eyebrow: string; title: string; lead: string };
  deliverables: ServiceDeliverable[];
  faqHead: { eyebrow: string; title: string; lead: string };
  faqs: ServiceFAQ[];
};

export const servicePagesData: Record<string, ServicePageData> = {
  "ai-automation": {
    slug: "ai-automation",
    divisionId: "technology",
    divisionTitle: "Technology & AI",
    eyebrow: "AI & Automation Service",
    title: "AI & Automation",
    headline: "Intelligent automation. Built for business results.",
    lead: "KICCPA scopes and deploys custom artificial intelligence, intelligent document extraction, and cross-platform automation pipelines that eliminate manual bottlenecks and accelerate operational velocity.",
    image: "/images/ai-automation.png",
    alt: "AI predictive analytics, machine learning, and automation workflows.",
    challengesHead: {
      eyebrow: "Operational Bottlenecks",
      title: "Challenges we help solve.",
      lead: "Organizations spend thousands of hours on repetitive manual data entry, disconnected legacy workflows, and unscalable business logic.",
    },
    challenges: [
      {
        n: "01",
        title: "Unstructured Document Processing",
        desc: "Invoices, legal agreements, and customer forms arrive in inconsistent formats, demanding hours of manual extraction and causing high error rates.",
      },
      {
        n: "02",
        title: "Disconnected Business Systems",
        desc: "Information trapped across ERPs, CRMs, and email inboxes requires repeated re-entry, delaying approvals and obscuring pipeline visibility.",
      },
      {
        n: "03",
        title: "Stalled AI Proof-of-Concepts",
        desc: "Many AI initiatives fail to progress from experimental demos to production environments due to data governance, latency, and integration challenges.",
      },
    ],
    whatWeDoHead: {
      eyebrow: "Our Core Scope",
      title: "What we do in AI & Automation.",
      lead: "Practical, enterprise-grade machine learning and robotic process automation engineered for your exact operational stack.",
    },
    whatWeDo: [
      {
        title: "Intelligent Document Processing (IDP)",
        desc: "Automated OCR and contextual extraction pipelines for structured and unstructured documents.",
        bullets: [
          "Automated invoice, contract, receipt, and KYC form parsing",
          "Entity extraction with confidence scoring and human-in-the-loop review",
          "Seamless export to ERPs, accounting systems, and relational databases",
        ],
      },
      {
        title: "Custom AI Copilots & Conversational Agents",
        desc: "Context-aware AI assistants trained on proprietary enterprise knowledge bases.",
        bullets: [
          "Retrieval-Augmented Generation (RAG) over company documents and SOPs",
          "Multilingual conversational agents supporting English, Arabic, and regional dialects",
          "Strict data privacy boundaries preventing enterprise knowledge leakage",
        ],
      },
      {
        title: "Cross-Platform Workflow Automation",
        desc: "End-to-end automation pipelines bridging disparate business software tools.",
        bullets: [
          "API-driven event listeners and asynchronous message queues",
          "Scheduled reconciliation and error-handling automation scripts",
          "Automated audit trails, logging, and exception escalation alerts",
        ],
      },
      {
        title: "Predictive Analytics & Decision Intelligence",
        desc: "Machine learning models forecasting operational demand, churn, and inventory trends.",
        bullets: [
          "Data preprocessing, feature engineering, and pipeline cleaning",
          "Supervised learning models benchmarked against business KPIs",
          "Executive dashboards surfacing real-time predictive indicators",
        ],
      },
    ],
    deliverablesHead: {
      eyebrow: "Production Outputs",
      title: "What you receive.",
      lead: "Turnkey automation assets deployed directly to your infrastructure with full documentation and monitoring.",
    },
    deliverables: [
      {
        title: "Production Automation Pipelines",
        desc: "Tested, deployed Python/Node automation microservices with automated failover and retry logic.",
        tag: "Software Asset",
      },
      {
        title: "Vector Database & RAG Infrastructure",
        desc: "Secure enterprise knowledge indexing infrastructure configured for low-latency similarity queries.",
        tag: "AI Architecture",
      },
      {
        title: "API Connectors & Integration Layer",
        desc: "Robust middleware connectors linking your automation logic with existing CRMs, ERPs, and databases.",
        tag: "Integration",
      },
      {
        title: "Operational Runbooks & API Docs",
        desc: "Complete documentation detailing pipeline architecture, maintenance protocols, and trigger schemas.",
        tag: "Documentation",
      },
      {
        title: "Monitoring & Drift Alerts",
        desc: "Telemetry dashboard tracking extraction accuracy, execution latencies, and automated error notifications.",
        tag: "Observability",
      },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about AI & Automation.",
      lead: "Details on implementation timelines, model security, and how KICCPA integrates with your tech stack.",
    },
    faqs: [
      {
        q: "How does KICCPA protect proprietary business data used in AI models?",
        a: "We deploy private instances and containerized RAG architectures where your data is never used to train public foundational models. All data in transit and at rest is encrypted, adhering to enterprise compliance standards.",
      },
      {
        q: "How long does a standard automation deployment take?",
        a: "Targeted workflow automation scripts and document processing pipelines typically deploy in 3 to 6 weeks. Larger enterprise copilot integrations take 6 to 10 weeks depending on knowledge base complexity.",
      },
      {
        q: "Can you automate workflows with legacy software lacking modern APIs?",
        a: "Yes. In addition to REST APIs, we employ secure robotic process automation (RPA), database-level connectors, and headless browser scripts to interface reliably with legacy applications.",
      },
      {
        q: "Do you offer ongoing model maintenance and retraining?",
        a: "Yes. We offer managed SLA support covering model drift monitoring, accuracy re-calibration, prompt engineering optimization, and new document template onboarding.",
      },
    ],
  },

  "software-development": {
    slug: "software-development",
    divisionId: "technology",
    divisionTitle: "Technology & AI",
    eyebrow: "Software Engineering Service",
    title: "Software & App Development",
    headline: "Bespoke digital platforms. Engineered to perform.",
    lead: "KICCPA builds custom web platforms, mobile applications, and enterprise software shaped strictly around your organization's business workflows and scaling goals.",
    image: "/images/software-architecture.jpg",
    alt: "Custom enterprise software architecture and application development.",
    challengesHead: {
      eyebrow: "Development Challenges",
      title: "Challenges we help solve.",
      lead: "Off-the-shelf software rarely fits nuanced operating procedures, forcing businesses into costly workarounds.",
    },
    challenges: [
      {
        n: "01",
        title: "Rigid Off-The-Shelf SaaS Limits",
        desc: "Commercial software packages force your teams to adapt workflows to rigid software constraints rather than supporting your competitive advantages.",
      },
      {
        n: "02",
        title: "Accumulated Technical Debt",
        desc: "Fragile codebases built by fragmented contractors become impossible to maintain, crashing under load and resisting new feature additions.",
      },
      {
        n: "03",
        title: "Mobile & Multi-Device Gaps",
        desc: "Employees and clients struggle with clunky non-responsive web interfaces that lack native mobile functionality and offline accessibility.",
      },
    ],
    whatWeDoHead: {
      eyebrow: "Our Core Scope",
      title: "What we do in Software & App Development.",
      lead: "End-to-end full-stack engineering from architectural discovery to production deployment.",
    },
    whatWeDo: [
      {
        title: "Full-Stack Enterprise Web Platforms",
        desc: "Scalable, secure web applications built on modern JavaScript/TypeScript and cloud frameworks.",
        bullets: [
          "High-performance React and Next.js frontends optimized for sub-second loads",
          "Robust Node.js, Python, and Go microservices backend architectures",
          "Role-based access control (RBAC), multi-tenant tenancy, and audit logging",
        ],
      },
      {
        title: "Cross-Platform Mobile Applications",
        desc: "Native-grade iOS and Android mobile solutions engineered for frontline workers and consumer apps.",
        bullets: [
          "React Native and Flutter mobile applications with shared code efficiency",
          "Offline-first synchronization, local caching, and biometric authentication",
          "Automated App Store and Google Play deployment management",
        ],
      },
      {
        title: "REST & GraphQL API Architecture",
        desc: "Clean, documented API gateways facilitating seamless data flow across internal and partner systems.",
        bullets: [
          "Interactive OpenAPI 3.0 / Swagger and GraphQL schema specifications",
          "Rate-limiting, API key governance, and OAuth 2.0 / JWT security protocols",
          "Webhook event engines for real-time third-party software notification",
        ],
      },
      {
        title: "Legacy Modernization & Refactoring",
        desc: "Phased migration of legacy monolithic architectures into decoupled, maintainable cloud services.",
        bullets: [
          "Database schema normalization and zero-downtime data migration scripts",
          "Strangler fig pattern adoption to modernize modules incrementally without business disruption",
          "Comprehensive unit, integration, and end-to-end automated test suites",
        ],
      },
    ],
    deliverablesHead: {
      eyebrow: "Production Outputs",
      title: "What you receive.",
      lead: "Complete ownership of clean, linted codebases backed by automated CI/CD and deployment architecture.",
    },
    deliverables: [
      {
        title: "Full Source Code Repository",
        desc: "100% intellectual property ownership transferred to your GitHub or GitLab organization with clean Git history.",
        tag: "Full IP Ownership",
      },
      {
        title: "Interactive System Architecture Schemas",
        desc: "Detailed entity-relationship diagrams (ERDs), API specifications, and infrastructure topology maps.",
        tag: "Blueprint",
      },
      {
        title: "Automated Testing Suites",
        desc: "Jest, Cypress, or Playwright automated test scripts ensuring reliable regression prevention during future updates.",
        tag: "Quality Assurance",
      },
      {
        title: "Dockerized Container Deployments",
        desc: "Production Docker configurations and Kubernetes manifests for uniform environment execution.",
        tag: "DevOps",
      },
      {
        title: "Developer & Admin Documentation",
        desc: "Comprehensive developer onboarding guides, environment setup instructions, and admin dashboard manuals.",
        tag: "Documentation",
      },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Software & App Development.",
      lead: "Key details on technology selections, client code ownership, and sprint communication.",
    },
    faqs: [
      {
        q: "Who owns the code developed during the engagement?",
        a: "You retain full, exclusive ownership of all source code, database architectures, and design assets developed during the project. No proprietary vendor lock-in.",
      },
      {
        q: "How does our team track progress during active sprints?",
        a: "We work in 2-week agile sprints with bi-weekly sprint demos, shared Jira/Linear boards, and continuous access to staging environments where you can test features as they are built.",
      },
      {
        q: "What programming languages and frameworks do you build with?",
        a: "We specialize in modern, battle-tested technologies: TypeScript, Next.js, React, Node.js, Python, PostgreSQL, MongoDB, Docker, and AWS/Azure cloud infrastructure.",
      },
      {
        q: "Can you take over and refactor an existing codebase built by another vendor?",
        a: "Yes. We begin with a comprehensive technical audit analyzing code quality, security vulnerabilities, and database indexing before proposing an efficient refactoring roadmap.",
      },
    ],
  },

  "cloud-data": {
    slug: "cloud-data",
    divisionId: "technology",
    divisionTitle: "Technology & AI",
    eyebrow: "Cloud & Infrastructure Service",
    title: "Cloud & Data Solutions",
    headline: "Resilient cloud infrastructure. Actionable business data.",
    lead: "KICCPA architectures, migrates, and manages high-availability cloud environments and centralized business data warehouses that ensure uptime, data integrity, and compliance.",
    image: "/assets/services/cloud.jpg",
    alt: "Cloud infrastructure, data pipelines, and server architecture.",
    challengesHead: {
      eyebrow: "Infrastructure Challenges",
      title: "Challenges we help solve.",
      lead: "Unplanned downtime, spiraling cloud bills, and fragmented data silos threaten operational stability.",
    },
    challenges: [
      {
        n: "01",
        title: "Uncontrolled Cloud Expenditure",
        desc: "Over-provisioned instances, unattached storage volumes, and poorly architected server configurations lead to unpredictable monthly cloud invoices.",
      },
      {
        n: "02",
        title: "Fragmented Data Silos",
        desc: "Business information scattered across billing tools, marketing platforms, and operational databases prevents leaders from obtaining unified reports.",
      },
      {
        n: "03",
        title: "Vulnerability to Unplanned Downtime",
        desc: "Lack of automated failover, geo-redundancy, and tested disaster recovery plans exposes organizations to disastrous service outages.",
      },
    ],
    whatWeDoHead: {
      eyebrow: "Our Core Scope",
      title: "What we do in Cloud & Data.",
      lead: "Modern DevOps engineering, cloud migration, and centralized data warehouse architecture.",
    },
    whatWeDo: [
      {
        title: "Cloud Architecture & Migration",
        desc: "Structured workload migration to AWS, Microsoft Azure, or Google Cloud Platform.",
        bullets: [
          "Well-Architected framework reviews assessing security, cost, and reliability",
          "Lift-and-shift or containerized modernization migrations with minimal downtime",
          "Automated Infrastructure as Code (IaC) using Terraform and CloudFormation",
        ],
      },
      {
        title: "DevOps & CI/CD Pipeline Engineering",
        desc: "Automated build, test, and release pipelines accelerating software release velocity.",
        bullets: [
          "GitHub Actions, GitLab CI, and Jenkins automated deployment pipelines",
          "Docker containerization and Kubernetes (EKS/AKS) cluster orchestration",
          "Zero-downtime blue-green and canary deployment configurations",
        ],
      },
      {
        title: "Centralized Data Warehousing & ETL",
        desc: "Consolidate business telemetry from multiple disparate systems into a unified analytical source of truth.",
        bullets: [
          "Data warehouse modeling across Snowflake, BigQuery, and PostgreSQL",
          "Automated ETL/ELT pipelines using Apache Airflow and modern data transformation tools",
          "Data cleansing, deduplication, schema enforcement, and anonymization",
        ],
      },
      {
        title: "Business Intelligence & Executive Dashboards",
        desc: "Real-time visual reporting empowering leadership with actionable commercial metrics.",
        bullets: [
          "Custom Power BI, Tableau, and Metabase dashboard development",
          "Scheduled automated email report digests for executives and department heads",
          "Granular role-based data access ensuring sensitive financial confidentiality",
        ],
      },
    ],
    deliverablesHead: {
      eyebrow: "Production Outputs",
      title: "What you receive.",
      lead: "Production-ready cloud environments and automated data warehouses with full administrative access.",
    },
    deliverables: [
      {
        title: "Terraform Infrastructure as Code (IaC)",
        desc: "Version-controlled infrastructure scripts enabling reproducible, auditable cloud environments in minutes.",
        tag: "Cloud Code",
      },
      {
        title: "Automated CI/CD Pipelines",
        desc: "Pre-configured build pipelines automating linting, security scans, and deployment to staging and production.",
        tag: "DevOps",
      },
      {
        title: "Unified Analytical Data Warehouse",
        desc: "Normalized data warehouse schema ready for business intelligence querying with automated nightly syncs.",
        tag: "Data Warehouse",
      },
      {
        title: "Disaster Recovery & Backup Playbook",
        desc: "Documented Recovery Time Objective (RTO) and Recovery Point Objective (RPO) protocols with automated snapshot policies.",
        tag: "Security",
      },
      {
        title: "Cloud Cost Optimization Audit",
        desc: "Detailed audit report implementing right-sizing recommendations and reserved instance commitments to reduce monthly spend.",
        tag: "Cost Control",
      },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Cloud & Data Solutions.",
      lead: "Information on cloud providers, data residency compliance, and migration execution.",
    },
    faqs: [
      {
        q: "Which cloud providers do your engineers work with?",
        a: "We hold multi-cloud expertise across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), matching the platform best suited to your geographic and compliance needs.",
      },
      {
        q: "Can you ensure regional data residency compliance in the Middle East?",
        a: "Yes. We configure workloads in regional data centers (such as AWS Bahrain/UAE and Microsoft Azure UAE/Qatar) ensuring strict compliance with local data sovereignty and security regulations.",
      },
      {
        q: "How do you minimize downtime during database migrations?",
        a: "We utilize real-time Change Data Capture (CDC) replication tools that synchronize data continuously in the background, allowing cutover to happen in minutes during scheduled off-peak maintenance windows.",
      },
      {
        q: "Can you help optimize our existing cloud bill without migrating?",
        a: "Yes. Our cloud cost audit analyzes idle resources, storage tiers, query bottlenecks, and licensing commitments, typically reducing monthly infrastructure bills by 20% to 40%.",
      },
    ],
  },

  "it-support-cybersecurity": {
    slug: "it-support-cybersecurity",
    divisionId: "technology",
    divisionTitle: "Technology & AI",
    eyebrow: "Managed Systems Service",
    title: "IT Support & Cybersecurity",
    headline: "Proactive systems management. Enterprise threat protection.",
    lead: "KICCPA delivers multi-tier IT helpdesk operations, 24/7 infrastructure health monitoring, and security governance designed to keep your business running smoothly without technical interruption.",
    image: "/images/it-support.png",
    alt: "Reliable IT systems support, security monitoring, and endpoint administration.",
    challengesHead: {
      eyebrow: "Security & Support Friction",
      title: "Challenges we help solve.",
      lead: "Unresolved technical tickets and security blind spots compromise workforce productivity and enterprise safety.",
    },
    challenges: [
      {
        n: "01",
        title: "Unresolved Employee IT Bottlenecks",
        desc: "Slow helpdesk response times for laptop configurations, software permissions, and email disruptions derail day-to-day productivity.",
      },
      {
        n: "02",
        title: "Security Blind Spots & Phishing Risks",
        desc: "Unpatched operating systems, weak password hygiene, and lack of endpoint detection leave corporate networks vulnerable to breaches.",
      },
      {
        n: "03",
        title: "Inconsistent Offboarding Access Control",
        desc: "Departing contractors and employees retaining lingering access to cloud drives and internal messaging tools poses acute data leakage risks.",
      },
    ],
    whatWeDoHead: {
      eyebrow: "Our Core Scope",
      title: "What we do in IT Support & Cybersecurity.",
      lead: "Comprehensive remote helpdesk, infrastructure health management, and multi-layered cyber hygiene.",
    },
    whatWeDo: [
      {
        title: "Tier 1–3 Remote IT Helpdesk",
        desc: "Responsive remote support resolving hardware, software, and network tickets swiftly.",
        bullets: [
          "Ticketing triage across email, chat, and phone with guaranteed response SLAs",
          "User account provisioning, password resets, and single sign-on (SSO) management",
          "Remote troubleshooting for macOS, Windows, iOS, and Android workstations",
        ],
      },
      {
        title: "Proactive Infrastructure Monitoring",
        desc: "Continuous automated health checks surfacing server and network anomalies before they impact users.",
        bullets: [
          "24/7 uptime and latency monitoring for servers, firewalls, and cloud services",
          "Automated patch management deploying OS security updates without user disruption",
          "Disk utilization, CPU threshold, and bandwidth saturation alerting",
        ],
      },
      {
        title: "Endpoint Security & Threat Protection",
        desc: "Enterprise anti-malware and Endpoint Detection and Response (EDR) implementation.",
        bullets: [
          "Centralized anti-virus and EDR agent management across all company machines",
          "Device encryption enforcement (BitLocker / FileVault) and remote wipe capabilities",
          "Email security filtering, anti-spoofing (SPF, DKIM, DMARC), and phishing simulation",
        ],
      },
      {
        title: "Access Governance & Compliance Audits",
        desc: "Rigorous identity management ensuring zero unauthorized access to corporate resources.",
        bullets: [
          "Multi-Factor Authentication (MFA) enforcement across all SaaS platforms",
          "Automated onboarding/offboarding checklists revoking access across all apps",
          "Quarterly security compliance audits identifying permission sprawl and risk areas",
        ],
      },
    ],
    deliverablesHead: {
      eyebrow: "Production Outputs",
      title: "What you receive.",
      lead: "Measurable service desk delivery backed by transparent ticketing dashboards and audit reports.",
    },
    deliverables: [
      {
        title: "Service Level Agreement (SLA) Contract",
        desc: "Guaranteed initial response times (e.g. <15 min for critical incidents) and transparent resolution targets.",
        tag: "Contractual SLA",
      },
      {
        title: "Centralized IT Helpdesk Portal",
        desc: "Custom-branded ticket submission portal for your staff with self-service knowledge base articles.",
        tag: "Service Desk",
      },
      {
        title: "Device Fleet Inventory Dashboard",
        desc: "Real-time register of all company laptops, serial numbers, warranty statuses, and patch compliance levels.",
        tag: "Asset Tracking",
      },
      {
        title: "Quarterly Security Vulnerability Report",
        desc: "Detailed audit assessing threat exposure, phishing test results, and prioritized mitigation action items.",
        tag: "Security Audit",
      },
      {
        title: "Standard Operating IT Runbook",
        desc: "Documented procedures for hardware procurement, new-hire provisioning, and emergency offboarding.",
        tag: "Documentation",
      },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about IT Support & Cybersecurity.",
      lead: "Details on support coverage hours, escalation pathways, and device onboarding.",
    },
    faqs: [
      {
        q: "What hours is your IT helpdesk available?",
        a: "We offer both standard business hours coverage (8 AM - 6 PM) and 24/7/365 continuous emergency support packages tailored to your operating requirements.",
      },
      {
        q: "Can you manage device onboarding for remote team members in different countries?",
        a: "Yes. We configure zero-touch deployment profiles (via Microsoft Intune / Apple MDM) so new laptops shipped to remote staff automatically configure with company security policies upon first boot.",
      },
      {
        q: "How do you handle critical after-hours server outages?",
        a: "Automated telemetry triggers high-priority on-call incident alerts that dispatch our senior systems engineers immediately, adhering to our critical incident response SLA.",
      },
      {
        q: "Do you assist with cybersecurity compliance frameworks?",
        a: "Yes. We help implement the technical controls, access policies, and audit documentation required for standards like ISO 27001, SOC 2, and regional cybersecurity regulations.",
      },
    ],
  },

  "customer-support": {
    slug: "customer-support",
    divisionId: "outsourcing",
    divisionTitle: "Business Outsourcing",
    eyebrow: "Customer Experience Service",
    title: "Customer Service & Support",
    headline: "Exceptional customer experiences. 24/7 omnichannel delivery.",
    lead: "KICCPA recruits, trains, and manages dedicated customer service teams that represent your brand with empathy, speed, and precision across voice, email, chat, and social channels.",
    image: "/assets/services/operations.jpg",
    alt: "Customer support professionals working in an operational center.",
    challengesHead: {
      eyebrow: "Customer Experience Challenges",
      title: "Challenges we help solve.",
      lead: "Unanswered tickets and uneven agent answers directly damage customer retention and lifetime value.",
    },
    challenges: [
      {
        n: "01",
        title: "Slow First Response & Resolution Times",
        desc: "Overwhelmed internal teams struggle with backlog spikes, resulting in customer churn and negative online reviews.",
      },
      {
        n: "02",
        title: "High Staff Turnover & Training Overhead",
        desc: "Constant agent attrition drains team resources in perpetual hiring and retraining rather than focusing on strategic improvements.",
      },
      {
        n: "03",
        title: "Fragmented Channel Coverage",
        desc: "Customers reach out across WhatsApp, social media, and web chat, but disconnected inboxes lead to lost conversations and customer frustration.",
      },
    ],
    whatWeDoHead: {
      eyebrow: "Our Core Scope",
      title: "What we do in Customer Service.",
      lead: "Turnkey customer support squads trained rigorously on your product specifications and tone of voice.",
    },
    whatWeDo: [
      {
        title: "24/7 Omnichannel Ticket Resolution",
        desc: "Round-the-clock support covering voice, email, live chat, WhatsApp, and social media tickets.",
        bullets: [
          "Inbound voice customer support with trained neutral accent / bilingual capabilities",
          "Live chat and web messaging with sub-60 second first response targets",
          "WhatsApp Business integration managing inquiries, order updates, and FAQs",
        ],
      },
      {
        title: "Tier 1 & Tier 2 Technical Support",
        desc: "Skilled support agents handling product troubleshooting, account setup, and bug reproduction.",
        bullets: [
          "Software user onboarding, password recoveries, and navigation guidance",
          "Structured bug reproduction and ticket escalation to your development team",
          "Billing, subscription changes, refund processing, and cancellation mitigation",
        ],
      },
      {
        title: "Quality Assurance & Performance Auditing",
        desc: "Systematic auditing of calls and messages ensuring consistent brand alignment.",
        bullets: [
          "Weekly QA scoring across accuracy, empathy, policy adherence, and resolution",
          "Real-time CSAT (Customer Satisfaction) and CES (Customer Effort Score) tracking",
          "Continuous agent feedback coaching sessions driving weekly improvement",
        ],
      },
      {
        title: "Knowledge Base & Macro Library Optimization",
        desc: "Codify customer answers into comprehensive internal and customer-facing documentation.",
        bullets: [
          "Creation of reusable response macros ensuring fast, accurate agent replies",
          "Customer self-service FAQ center authoring to reduce inbound ticket volume",
          "Monthly ticket categorization identifying top product friction areas for product teams",
        ],
      },
    ],
    deliverablesHead: {
      eyebrow: "Operational Outputs",
      title: "What you receive.",
      lead: "Dedicated talent squads, proven operating procedures, and live performance dashboards.",
    },
    deliverables: [
      {
        title: "Dedicated, Trained Agent Squad",
        desc: "Full-time customer support agents and dedicated team leads working exclusively on your queues.",
        tag: "Dedicated Staff",
      },
      {
        title: "Customized Customer Support Playbook",
        desc: "Comprehensive SOP document detailing communication macros, escalation matrices, and brand guidelines.",
        tag: "Documentation",
      },
      {
        title: "Real-Time Helpdesk Analytics Dashboard",
        desc: "Live visibility into queue volumes, agent occupancy, CSAT ratings, and resolution benchmarks.",
        tag: "Analytics",
      },
      {
        title: "Weekly QA Evaluation Reports",
        desc: "Detailed audit summaries evaluating customer interactions against compliance and brand quality metrics.",
        tag: "Quality Control",
      },
      {
        title: "Monthly Executive Review (QBR)",
        desc: "Strategic insights analyzing ticket trends, customer pain points, and actionable self-service improvements.",
        tag: "Strategic Review",
      },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Customer Service & Support.",
      lead: "Details on agent training, multilingual options, and CRM integrations.",
    },
    faqs: [
      {
        q: "What CRM and helpdesk systems can your agents use?",
        a: "Our agents work directly inside your existing tools—including Zendesk, Freshdesk, Salesforce Service Cloud, Gorgias, HubSpot, Intercom, and Zoho Desk.",
      },
      {
        q: "How long does onboarding and training take?",
        a: "Standard operational ramp-up takes 2 to 3 weeks. We immerse agents in your product, conduct simulated mock ticket handling, and complete supervised shadow shifts before going fully live.",
      },
      {
        q: "Can you provide Arabic and English bilingual agents?",
        a: "Yes. Our regional hubs in Kuwait and North Africa provide native Arabic support, paired with our Philippine operations hub for native-grade English and 24/7 global coverage.",
      },
      {
        q: "What happens if customer ticket volume surges during holidays or sales?",
        a: "We maintain cross-trained buffer teams that can be mobilized to assist during seasonal promotional surges, preventing backlog accumulation and preserving response SLAs.",
      },
    ],
  },

  "sales-lead-generation": {
    slug: "sales-lead-generation",
    divisionId: "outsourcing",
    divisionTitle: "Business Outsourcing",
    eyebrow: "Revenue Acceleration Service",
    title: "Sales & Lead Generation",
    headline: "Targeted B2B prospecting. Qualified sales conversations.",
    lead: "KICCPA builds and executes structured outbound prospecting campaigns, speed-to-lead inbound qualification, and appointment setting that fills your sales pipeline with qualified decision-makers.",
    image: "/images/sales-crm.jpg",
    alt: "Sales strategy and proactive customer relationship management.",
    challengesHead: {
      eyebrow: "Sales Pipeline Challenges",
      title: "Challenges we help solve.",
      lead: "High-value account executives waste critical time prospecting instead of closing qualified revenue.",
    },
    challenges: [
      {
        n: "01",
        title: "Sales Executives Bogged Down in Prospecting",
        desc: "Your top closers spend 60% of their workday building contact lists and sending cold emails rather than conducting demos and closing deals.",
      },
      {
        n: "02",
        title: "Inbound Lead Slippage",
        desc: "Inbound demo requests sitting untouched for hours or days turn cold, dramatically slashing conversion rates and wasting marketing budget.",
      },
      {
        n: "03",
        title: "Inaccurate, Outdated Prospect Lists",
        desc: "Purchased databases with stale contact information result in high email bounce rates, damaged domain reputation, and wasted outreach.",
      },
    ],
    whatWeDoHead: {
      eyebrow: "Our Core Scope",
      title: "What we do in Sales & Lead Generation.",
      lead: "Disciplined multi-touch prospecting and qualification workflows aligned with your Ideal Customer Profile (ICP).",
    },
    whatWeDo: [
      {
        title: "Ideal Customer Profile (ICP) & List Building",
        desc: "Hand-curated, verified contact databases targeting key decision-makers.",
        bullets: [
          "Identification of target industries, company sizes, revenue bands, and job titles",
          "Multi-source contact discovery and email/phone verification to maintain <2% bounce rates",
          "Account mapping identifying multiple stakeholders within enterprise buying committees",
        ],
      },
      {
        title: "Multi-Channel Outbound Cadences",
        desc: "Personalized outreach across email, LinkedIn, and cold phone calls.",
        bullets: [
          "Value-driven copywriting tailored to specific industry pain points",
          "Automated cadence sequences with customized variable personalization",
          "Strict domain reputation safeguarding and SPF/DKIM/DMARC warmup protocols",
        ],
      },
      {
        title: "Speed-to-Lead Inbound Qualification",
        desc: "Rapid qualification of inbound website leads and demo requests.",
        bullets: [
          "Sub-15 minute response times for inbound web form submissions",
          "BANT (Budget, Authority, Need, Timeline) qualification framework screening",
          "Direct calendar booking into your account executives' schedules via Calendly / HubSpot",
        ],
      },
      {
        title: "CRM Hygiene & Pipeline Reporting",
        desc: "Accurate logging ensuring transparent visibility into every outreach touchpoint.",
        bullets: [
          "Real-time activity logging in Salesforce, HubSpot, or Pipedrive",
          "Disposition tracking: positive replies, timing objections, and unqualified leads",
          "Weekly conversion dashboards tracking outreach-to-meeting booked metrics",
        ],
      },
    ],
    deliverablesHead: {
      eyebrow: "Operational Outputs",
      title: "What you receive.",
      lead: "Qualified meetings on your calendar and complete visibility into pipeline metrics.",
    },
    deliverables: [
      {
        title: "Verified B2B Target Account List",
        desc: "Proprietary database of validated prospects with confirmed direct dials, LinkedIn profiles, and verified work emails.",
        tag: "Data Asset",
      },
      {
        title: "Tested Multi-Channel Outreach Copy",
        desc: "High-converting email sequences, LinkedIn messaging templates, and phone call objection-handling battlecards.",
        tag: "Sales Playbook",
      },
      {
        title: "Confirmed Qualified Discovery Calls",
        desc: "Pre-screened decision-makers booked directly into your sales team's calendar with complete qualification briefing notes.",
        tag: "Sales Meetings",
      },
      {
        title: "Clean CRM Pipeline Integration",
        desc: "All prospect records, communication histories, and stage updates synchronized directly with your internal CRM.",
        tag: "CRM Data",
      },
      {
        title: "Weekly Performance Analytics",
        desc: "Transparent report reviewing open rates, reply rates, meeting hold rates, and conversion feedback.",
        tag: "Reporting",
      },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Sales & Lead Generation.",
      lead: "Details on lead qualification criteria, domain safety, and commercial models.",
    },
    faqs: [
      {
        q: "What defines a qualified meeting?",
        a: "We collaborate with your sales leadership to define strict qualification criteria (e.g. correct title, company size, stated need, verified budget) before any call is counted toward delivery benchmarks.",
      },
      {
        q: "How do you protect our primary corporate email domain?",
        a: "We never conduct high-volume cold outreach from your primary domain. We set up dedicated secondary domains, implement SPF/DKIM/DMARC records, and complete a 3-week warming cycle prior to sending.",
      },
      {
        q: "Do your SDRs conduct cold calling or just email?",
        a: "We run integrated multi-channel cadences combining phone outreach, customized emails, and LinkedIn touches to maximize engagement across diverse prospect preferences.",
      },
      {
        q: "What industries can your sales team prospect for?",
        a: "We have proven expertise prospecting for B2B SaaS, enterprise technology, professional services, healthcare tech, logistics, and industrial services.",
      },
    ],
  },

  "back-office-bpo": {
    slug: "back-office-bpo",
    divisionId: "outsourcing",
    divisionTitle: "Business Outsourcing",
    eyebrow: "Operational Execution Service",
    title: "Back Office & BPO",
    headline: "Accurate transaction processing. Streamlined back-office workflows.",
    lead: "KICCPA delivers rigorous back-office operational execution—from invoice verification and transaction reconciliation to content moderation and data indexing—governed by strict quality SLAs.",
    image: "/images/back-office.jpg",
    alt: "End-to-end operational digitization and back-office transaction workflows.",
    challengesHead: {
      eyebrow: "Administrative Friction",
      title: "Challenges we help solve.",
      lead: "Repetitive data verification and document backlogs tie up internal teams and delay financial close cycles.",
    },
    challenges: [
      {
        n: "01",
        title: "Invoice & Billing Backlogs",
        desc: "Delays in vendor bill audits, purchase order matching, and customer invoice generation impact cash flow and supplier goodwill.",
      },
      {
        n: "02",
        title: "High Error Rates in Manual Data Entry",
        desc: "Fatigued in-house staff entering thousands of data records into ERPs introduce costly typos, duplicate entries, and audit red flags.",
      },
      {
        n: "03",
        title: "Expensive Administrative Headcount",
        desc: "Scaling back-office processing internally requires expanding physical office footprints, software licenses, and local benefits packages.",
      },
    ],
    whatWeDoHead: {
      eyebrow: "Our Core Scope",
      title: "What we do in Back Office & BPO.",
      lead: "Standardized, auditable process outsourcing executed by dedicated operational specialists.",
    },
    whatWeDo: [
      {
        title: "Finance & Accounts Processing",
        desc: "Accurate transaction processing supporting your finance and accounting department.",
        bullets: [
          "Accounts payable invoice verification, 3-way matching (PO, receipt, invoice), and entry",
          "Accounts receivable billing generation, customer statement distribution, and payment matching",
          "Bank statement reconciliation, expense claim auditing, and discrepancy escalation",
        ],
      },
      {
        title: "Document Indexing & Data Digitization",
        desc: "High-volume data transformation converting physical and PDF documents into clean digital records.",
        bullets: [
          "Document classification, tagging, and secure archival into cloud document management systems",
          "Double-key data entry verification achieving >99.5% field accuracy rates",
          "Catalog and product data enrichment, taxonomy tagging, and image asset association",
        ],
      },
      {
        title: "Compliance Verification & KYC Audits",
        desc: "Thorough review of customer onboarding paperwork and regulatory compliance documents.",
        bullets: [
          "Identity verification, passport/civil ID validation, and proof of address checks",
          "Regulatory checklist auditing for financial, insurance, and medical onboarding files",
          "Secure flagging and escalation of suspicious documentation to compliance officers",
        ],
      },
      {
        title: "Order Fulfillment & Inventory Processing",
        desc: "Administrative coordination ensuring seamless e-commerce and wholesale order flows.",
        bullets: [
          "Order status verification, tracking number updates, and delivery exception management",
          "Inventory ledger updates, stock transfer logging, and supplier RMA return processing",
          "Vendor portal maintenance and inventory restocking alert monitoring",
        ],
      },
    ],
    deliverablesHead: {
      eyebrow: "Operational Outputs",
      title: "What you receive.",
      lead: "Predictable, audit-ready operational processing with continuous quality monitoring.",
    },
    deliverables: [
      {
        title: "Standard Operating Procedures (SOP) Manual",
        desc: "Granular process documentation codifying rules, edge cases, and decision trees for every back-office task.",
        tag: "Documentation",
      },
      {
        title: "Dedicated Operational Specialist Squad",
        desc: "Trained processing associates and dedicated QA auditors assigned exclusively to your administrative workflows.",
        tag: "Dedicated Staff",
      },
      {
        title: "Daily Throughput & Error Logs",
        desc: "Transparent operational reporting detailing batch volumes processed, accuracy rates, and turnaround times.",
        tag: "Transparency",
      },
      {
        title: "Quality Assurance Scorecards",
        desc: "Randomized secondary auditing of processed transactions ensuring compliance with our 99.5% accuracy SLA.",
        tag: "Quality Control",
      },
      {
        title: "Monthly Process Efficiency Reviews",
        desc: "Recommendations on workflow automation opportunities to continually drive down processing costs.",
        tag: "Optimization",
      },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Back Office & BPO.",
      lead: "Details on data privacy, error correction, and onboarding turnaround times.",
    },
    faqs: [
      {
        q: "How do you guarantee data accuracy in high-volume processing?",
        a: "We employ double-blind data entry, automated validation scripts, and independent QA sampling checks that audit a percentage of every batch to guarantee >99.5% accuracy.",
      },
      {
        q: "Is our financial and customer data kept secure?",
        a: "Yes. All processing is conducted on secure virtual desktop infrastructure (VDI) with disabled local downloads, restricted USB ports, encrypted connections, and comprehensive employee NDAs.",
      },
      {
        q: "What ERP and accounting systems can your team work inside?",
        a: "Our team operates in SAP, Oracle NetSuite, QuickBooks, Xero, Microsoft Dynamics, Odoo, and custom proprietary internal databases.",
      },
      {
        q: "What is the typical turnaround time for transaction batches?",
        a: "We establish clear contractual turnaround times (typically same-day or 24-hour SLA) based on your daily cutoff schedules and reporting cadences.",
      },
    ],
  },

  "virtual-assistants-crm": {
    slug: "virtual-assistants-crm",
    divisionId: "outsourcing",
    divisionTitle: "Business Outsourcing",
    eyebrow: "Executive & Systems Support",
    title: "Virtual Assistants & CRM",
    headline: "Executive productivity. Well-maintained CRM data.",
    lead: "KICCPA matches leadership with top-tier bilingual virtual executive assistants and dedicated CRM administrators who handle correspondence, scheduling, and pipeline hygiene with meticulous detail.",
    image: "/images/virtual-assistants.jpg",
    alt: "Executive assistant managing schedules and CRM workflows.",
    challengesHead: {
      eyebrow: "Productivity Challenges",
      title: "Challenges we help solve.",
      lead: "Executive leaders lose hours every day to administrative scheduling, inbox clutter, and manual CRM upkeep.",
    },
    challenges: [
      {
        n: "01",
        title: "Executive Calendar & Inbox Overload",
        desc: "C-suite executives spend 3+ hours daily navigating meeting scheduling across time zones and sorting through high-volume email noise.",
      },
      {
        n: "02",
        title: "Outdated, Messy CRM Records",
        desc: "Duplicate contacts, missing deal stages, and unlogged emails turn your company CRM into an unreliable, cluttered archive.",
      },
      {
        n: "03",
        title: "Fragmented Travel & Event Logistics",
        desc: "Complex regional business travel across the GCC, flights, visa requirements, and meeting itineraries pull focus away from strategic business.",
      },
    ],
    whatWeDoHead: {
      eyebrow: "Our Core Scope",
      title: "What we do in Virtual Assistants & CRM.",
      lead: "Dedicated administrative partnership providing elite executive support and meticulous CRM hygiene.",
    },
    whatWeDo: [
      {
        title: "Executive Calendar & Scheduling Management",
        desc: "Proactive time management protecting executive focus and orchestrating smooth meetings.",
        bullets: [
          "Complex multi-stakeholder scheduling across GCC, European, and Asian time zones",
          "Meeting agenda preparation, attendee briefing dossiers, and confirmation logistics",
          "Buffer time preservation, priority gatekeeping, and meeting conflict resolution",
        ],
      },
      {
        title: "Inbox Triage & Professional Correspondence",
        desc: "Keep executive inboxes organized and ensure no vital communication is overlooked.",
        bullets: [
          "Categorization of incoming correspondence into actionable folders (urgent, review, info)",
          "Drafting routine replies, meeting confirmations, and follow-up notes in your brand voice",
          "Direct escalation of critical client messages via SMS or WhatsApp",
        ],
      },
      {
        title: "CRM Administration & Pipeline Hygiene",
        desc: "Continuous data cleanliness and contact enrichment across your sales and client systems.",
        bullets: [
          "Deduplication, standardized field formatting, and contact record enrichment",
          "Logging meeting notes, stage updates, deal values, and follow-up reminders",
          "Automated workflow setup for new lead assignments, task alerts, and pipeline views",
        ],
      },
      {
        title: "Regional Travel & Event Coordination",
        desc: "End-to-end itinerary planning for regional executive travel and client engagements.",
        bullets: [
          "Flight bookings, hotel reservations, ground transit, and visa requirement tracking",
          "Comprehensive travel dossiers with confirmation vouchers, maps, and meeting itineraries",
          "Expense receipt collation and post-travel expense report filing",
        ],
      },
    ],
    deliverablesHead: {
      eyebrow: "Operational Outputs",
      title: "What you receive.",
      lead: "A dedicated professional assistant integrated seamlessly into your daily communication rhythm.",
    },
    deliverables: [
      {
        title: "Dedicated Executive Assistant",
        desc: "Handpicked, college-educated executive assistant working exclusively during your designated business hours.",
        tag: "Dedicated Staff",
      },
      {
        title: "Executive Operating Protocol Dossier",
        desc: "Codified preferences for scheduling rules, communication tone, travel seating, and priority contacts.",
        tag: "Playbook",
      },
      {
        title: "Clean, Audited CRM Environment",
        desc: "Fully organized CRM records with deduplicated accounts, updated deal stages, and accurate contact data.",
        tag: "Data Cleanliness",
      },
      {
        title: "Daily Morning Briefing Digest",
        desc: "Structured morning summary sent via Slack/WhatsApp outlining day's schedule, key attendees, and pending tasks.",
        tag: "Executive Digest",
      },
      {
        title: "Monthly Productivity Timesheet & Report",
        desc: "Detailed record of tasks completed, meetings scheduled, and operational hours logged.",
        tag: "Transparency",
      },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Virtual Assistants & CRM.",
      lead: "Details on working hours, confidentiality, and assistant replacement guarantees.",
    },
    faqs: [
      {
        q: "What hours does our dedicated virtual assistant work?",
        a: "We align your assistant's schedule directly to your time zone (e.g. Kuwait/GCC standard business hours 8 AM - 5 PM), ensuring immediate real-time collaboration throughout your working day.",
      },
      {
        q: "How is confidentiality and password security managed?",
        a: "We mandate enterprise password managers (1Password / LastPass) so assistants never see your raw passwords. All assistants sign binding NDAs and undergo rigorous background checks.",
      },
      {
        q: "Can our assistant speak and write in both Arabic and English?",
        a: "Yes. We offer both bilingual Arabic/English executive assistants and fluent English specialists based on your communication requirements.",
      },
      {
        q: "What happens if our assistant goes on leave or is unwell?",
        a: "Every assistant maintains an up-to-date operating runbook. We assign a trained backup shadow who steps in seamlessly during planned or unplanned leave with zero operational disruption.",
      },
    ],
  },
};
