export type ServiceEditorial = { headline: string; intro: string; photo: string; capabilities: { title: string; text: string }[]; example: string; prepare: string };

export const serviceEditorial: Record<string, ServiceEditorial> = {
  "ai-automation": {
    "headline": "Make room for more meaningful work.",
    "intro": "Turn repetitive tasks into connected workflows. Start with a focused use case, understand the information it depends on, and build automation with clear human oversight.",
    "photo": "operations",
    "capabilities": [
      {
        "title": "Workflow automation",
        "text": "Connect forms, approvals, notifications and business tools so information moves without repeated manual entry."
      },
      {
        "title": "AI-assisted knowledge",
        "text": "Explore document search, summarisation and internal assistants grounded in the information your team is authorised to use."
      },
      {
        "title": "Human review by design",
        "text": "Define approval points, exception handling and access rules before introducing AI into a live business process."
      }
    ],
    "example": "An operations team could route incoming enquiries, prepare a draft response and ask a person to approve it before sending.",
    "prepare": "Which repetitive task takes the most time? What systems and data are involved? Who should approve the result?"
  },
  "software-development": {
    "headline": "Software shaped around the way you work.",
    "intro": "Bring customer journeys and internal operations together with applications designed around your actual users. The starting point is a clear problem, a practical product roadmap and a maintainable technical foundation.",
    "photo": "software",
    "capabilities": [
      {
        "title": "Web and mobile experiences",
        "text": "Plan responsive portals, business applications and customer interfaces with accessible journeys and clear navigation."
      },
      {
        "title": "Systems that connect",
        "text": "Scope APIs, CRM integrations and data flows that reduce duplicate work across existing platforms."
      },
      {
        "title": "Delivery and continuity",
        "text": "Define acceptance criteria, testing, release milestones and the documentation needed to maintain the application."
      }
    ],
    "example": "A service business could connect online bookings, customer records and staff scheduling in one application.",
    "prepare": "Who will use the application? Which existing systems must connect? What does a successful first release need to do?"
  },
  "cloud-data": {
    "headline": "A clearer foundation for your digital business.",
    "intro": "Bring structure to infrastructure and information. Explore cloud environments, deployment workflows and reporting that support your applications as requirements evolve.",
    "photo": "data",
    "capabilities": [
      {
        "title": "Cloud planning and migration",
        "text": "Assess application dependencies, hosting requirements and migration priorities before moving workloads."
      },
      {
        "title": "Deployment automation",
        "text": "Discuss repeatable environments, release pipelines, configuration management and recovery procedures."
      },
      {
        "title": "Data and reporting",
        "text": "Connect relevant data sources and define useful dashboards, data ownership and access controls."
      }
    ],
    "example": "A growing business could replace spreadsheet-based reporting with a shared dashboard fed by its operational systems.",
    "prepare": "Where are applications hosted today? What data is needed for reporting? Which availability, recovery and access requirements matter?"
  },
  "it-support-cybersecurity": {
    "headline": "Keep everyday technology moving.",
    "intro": "Support the systems your people rely on with a practical approach to troubleshooting, access and operational security. Define responsibilities and escalation paths around your environment.",
    "photo": "support",
    "capabilities": [
      {
        "title": "Workplace IT support",
        "text": "Discuss user support, device issues, software setup and clear routes for reporting technical problems."
      },
      {
        "title": "Access and security hygiene",
        "text": "Review account permissions, update routines, backup practices and staff awareness priorities."
      },
      {
        "title": "Operational readiness",
        "text": "Agree incident escalation, support coverage and documentation as part of a written service scope."
      }
    ],
    "example": "A distributed team could establish a single support queue with clear ownership for access requests and device issues.",
    "prepare": "How many users and locations need support? What platforms do they use? Which issues should receive priority?"
  },
  "customer-support": {
    "headline": "Make every customer conversation count.",
    "intro": "Build a consistent support experience around your customers, channels and service standards. Map the journey from the first question to a clear resolution or escalation.",
    "photo": "support",
    "capabilities": [
      {
        "title": "Customer communication",
        "text": "Scope email, chat or phone support around the channels, languages and coverage your business requires."
      },
      {
        "title": "Knowledge and quality",
        "text": "Develop agreed response guidance, knowledge resources and quality checks that keep communication consistent."
      },
      {
        "title": "Escalation and reporting",
        "text": "Define what the support team can resolve, what needs your approval and which service measures to review."
      }
    ],
    "example": "An online business could organise order questions, account enquiries and escalations into a shared support workflow.",
    "prepare": "Which channels and languages are needed? What enquiry volumes do you see? Which decisions must remain with your team?"
  },
  "sales-lead-generation": {
    "headline": "Give your sales team a stronger starting point.",
    "intro": "Create an organised approach to prospect research, lead qualification and follow-up. Keep outreach relevant to your audience and aligned with your own commercial process.",
    "photo": "sales",
    "capabilities": [
      {
        "title": "Prospect research",
        "text": "Define target organisations, buyer profiles and the information required for useful sales conversations."
      },
      {
        "title": "Qualification and coordination",
        "text": "Discuss qualification criteria, appointment coordination and handover notes for your sales team."
      },
      {
        "title": "CRM visibility",
        "text": "Maintain agreed pipeline stages, activity records and follow-up reminders so opportunities remain visible."
      }
    ],
    "example": "A B2B team could research a target segment and use a shared qualification checklist before arranging a sales conversation.",
    "prepare": "Who is the ideal customer? What makes a lead qualified? Which outreach permissions and regional requirements apply?"
  },
  "back-office-bpo": {
    "headline": "Create more space for your core business.",
    "intro": "Bring everyday operational tasks into a documented, repeatable workflow. Begin with the process, agree ownership and put quality checks around the information that matters.",
    "photo": "operations",
    "capabilities": [
      {
        "title": "Administrative workflows",
        "text": "Discuss data entry, record maintenance, document processing and recurring administrative coordination."
      },
      {
        "title": "Process documentation",
        "text": "Map task steps, required inputs, exception rules and handovers so responsibilities stay clear."
      },
      {
        "title": "Quality and reporting",
        "text": "Agree sample checks, access permissions and reporting measures before extending the workflow."
      }
    ],
    "example": "A business could standardise document intake and record updates while keeping exceptions with its internal decision-makers.",
    "prepare": "Which process is ready to document? What volumes and turnaround times are expected? How will quality be reviewed?"
  },
  "virtual-assistants-crm": {
    "headline": "A more organised working day.",
    "intro": "Connect administrative support with the systems your team already uses. Set clear priorities, protect sensitive information and create a dependable rhythm for ongoing tasks.",
    "photo": "assistant",
    "capabilities": [
      {
        "title": "Day-to-day coordination",
        "text": "Scope scheduling, meeting preparation, inbox organisation and routine administrative follow-up."
      },
      {
        "title": "CRM administration",
        "text": "Discuss contact updates, pipeline housekeeping, activity logging and useful reporting views."
      },
      {
        "title": "A shared working rhythm",
        "text": "Agree communication channels, task priorities, access permissions and an escalation route."
      }
    ],
    "example": "A small team could keep customer records current and coordinate follow-ups without moving away from its existing CRM.",
    "prepare": "Which tasks repeat each week? What CRM is in use? Which actions require approval before they happen?"
  },
  "healthcare-recruitment": {
    "headline": "People at the heart of healthcare.",
    "intro": "Discuss nursing, medical and healthcare workforce requirements with a clear view of the role and destination. Recruitment planning starts with qualifications, experience and the employer’s requirements.",
    "photo": "healthcare",
    "capabilities": [
      {
        "title": "Role definition",
        "text": "Clarify specialty, experience level, clinical setting and the responsibilities of each position."
      },
      {
        "title": "Candidate coordination",
        "text": "Discuss sourcing, profile review, interview arrangements and the information needed for employer assessment."
      },
      {
        "title": "Documentation planning",
        "text": "Identify qualification and destination-specific registration requirements for verification by the appropriate parties."
      }
    ],
    "example": "A healthcare employer could prepare a role brief covering specialty, experience and registration requirements before reviewing profiles.",
    "prepare": "Which roles and specialties are required? Where will people work? What registration and credential requirements apply?"
  },
  "hospitality-recruitment": {
    "headline": "Build the team behind a memorable stay.",
    "intro": "Translate your service standards into clear hiring requirements for hotel and hospitality roles. Plan around guest experience, departmental needs and the realities of your operation.",
    "photo": "hospitality",
    "capabilities": [
      {
        "title": "Guest-facing roles",
        "text": "Discuss front-office, guest relations and food-service profiles against the experience your property needs."
      },
      {
        "title": "Operational teams",
        "text": "Scope housekeeping, kitchen and support requirements with role-specific responsibilities."
      },
      {
        "title": "Recruitment coordination",
        "text": "Align profile review, interviews and employer feedback with your hiring priorities."
      }
    ],
    "example": "A hotel preparing for a busy season could define departmental hiring needs and interview candidates against consistent service criteria.",
    "prepare": "Which departments need staff? What language and experience levels matter? What is the intended start window?"
  },
  "oil-gas-recruitment": {
    "headline": "Workforce planning for complex environments.",
    "intro": "Discuss technical and operational recruitment needs across energy-sector activities. Define the working environment and role requirements before identifying suitable profiles.",
    "photo": "energy",
    "capabilities": [
      {
        "title": "Technical role briefs",
        "text": "Document trade, engineering or operational requirements, equipment exposure and relevant project experience."
      },
      {
        "title": "Safety-related requirements",
        "text": "Identify site induction, training and certification requirements for verification by the employer and relevant authorities."
      },
      {
        "title": "Hiring coordination",
        "text": "Discuss profile review, technical interviews and documentation milestones against the project plan."
      }
    ],
    "example": "An energy contractor could organise role requirements by trade, site conditions and required training before shortlisting.",
    "prepare": "What project and worksite are involved? Which technical experience is essential? What training and documentation are required?"
  },
  "construction-recruitment": {
    "headline": "The right skills for the next phase.",
    "intro": "Plan workforce requirements around the project programme, working conditions and site responsibilities. Clear role definitions help employers assess both technical fit and practical readiness.",
    "photo": "construction",
    "capabilities": [
      {
        "title": "Project-based requirements",
        "text": "Map hiring needs to project stages, trades and supervisory responsibilities."
      },
      {
        "title": "Skills and experience",
        "text": "Discuss practical experience, equipment familiarity and the assessment approach for each role."
      },
      {
        "title": "Coordination and readiness",
        "text": "Organise interview feedback and required documentation around the employer’s mobilisation plan."
      }
    ],
    "example": "A contractor could separate urgent site roles from later project needs and prepare a focused assessment checklist for each trade.",
    "prepare": "Which trades are needed? At what project stage? What site, experience and start-date requirements apply?"
  },
  "manufacturing-recruitment": {
    "headline": "People who understand the production floor.",
    "intro": "Discuss workforce requirements across production, maintenance and supporting operations. Start with the machinery, processes and working arrangements relevant to each position.",
    "photo": "manufacturing",
    "capabilities": [
      {
        "title": "Production and operations",
        "text": "Define operator, technician and supervisory requirements around your production environment."
      },
      {
        "title": "Maintenance and quality",
        "text": "Clarify technical experience and familiarity with the plant’s maintenance or quality processes."
      },
      {
        "title": "Employer-led assessment",
        "text": "Coordinate profile review and interviews against practical criteria agreed with your hiring team."
      }
    ],
    "example": "A manufacturer could prepare role profiles covering machinery exposure, shift arrangements and quality responsibilities.",
    "prepare": "Which processes and machines are involved? What shift pattern applies? How will practical skills be assessed?"
  },
  "technology-ai": {
    "headline": "Thoughtful technology. Practical progress.",
    "intro": "Build a connected digital foundation across software, automation, infrastructure and support. Start with the business challenge and identify the right combination of capabilities for your next stage.",
    "photo": "software",
    "capabilities": [
      {
        "title": "Build digital products",
        "text": "Explore business applications, customer portals and integrations shaped around your users."
      },
      {
        "title": "Connect systems and information",
        "text": "Discuss cloud foundations, reporting and automation that support your everyday decisions."
      },
      {
        "title": "Plan for the long term",
        "text": "Define ownership, documentation and support needs alongside the delivery roadmap."
      }
    ],
    "example": "An organisation could connect a customer portal, CRM and reporting workflow through a phased technology programme.",
    "prepare": "What business problem should change first? Which systems are already in place? What should the first milestone achieve?"
  },
  "business-outsourcing": {
    "headline": "Well-run operations create room to grow.",
    "intro": "Coordinate customer support, sales administration and back-office workflows through one clearly defined operating approach. Choose the processes that will benefit most from dedicated attention.",
    "photo": "operations",
    "capabilities": [
      {
        "title": "Customer-facing operations",
        "text": "Explore customer communication and sales-support workflows aligned with your standards."
      },
      {
        "title": "Business administration",
        "text": "Discuss back-office tasks, CRM maintenance and recurring operational coordination."
      },
      {
        "title": "Clear service ownership",
        "text": "Agree responsibilities, quality checks, reporting and escalation before the work begins."
      }
    ],
    "example": "A growing team could bring customer enquiries and recurring administrative work into documented workflows with shared reporting.",
    "prepare": "Which tasks take time away from core work? What service coverage is needed? Who will review delivery?"
  },
  "hr-recruitment": {
    "headline": "Build your next chapter with the right people.",
    "intro": "Bring structure to workforce requirements across professional and industrial sectors. Define what the role needs, how candidates will be assessed and what the employer must verify.",
    "photo": "team",
    "capabilities": [
      {
        "title": "Sector-specific requirements",
        "text": "Explore healthcare, hospitality, energy, construction and manufacturing role requirements."
      },
      {
        "title": "Recruitment coordination",
        "text": "Discuss sourcing, profile review and interview arrangements built around the employer’s priorities."
      },
      {
        "title": "A clear path for candidates",
        "text": "Candidates can explore published roles on Careers or introduce their experience through the job-seeker enquiry."
      }
    ],
    "example": "An employer could group hiring needs by department, experience and destination, then coordinate a consistent interview process.",
    "prepare": "What roles are required? Where will people work? Which qualifications, documentation and hiring milestones apply?"
  }
};
