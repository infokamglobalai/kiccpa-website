export type SectorRole = {
  title: string;
  category: string;
  experience: string;
  description: string;
};

export type SectorActionBox = {
  title: string;
  badge: string;
  lead: string;
  steps: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type SectorFAQ = {
  q: string;
  a: string;
};

export type SectorPageData = {
  slug: string;
  sectorTitle: string;
  eyebrow: string;
  headline: string;
  lead: string;
  image: string;
  alt: string;
  rolesHead: { eyebrow: string; title: string; lead: string };
  roles: SectorRole[];
  employerBox: SectorActionBox;
  candidateBox: SectorActionBox;
  faqHead: { eyebrow: string; title: string; lead: string };
  faqs: SectorFAQ[];
};

export const sectorPagesData: Record<string, SectorPageData> = {
  "healthcare-recruitment": {
    slug: "healthcare-recruitment",
    sectorTitle: "Nursing, Medical & Healthcare",
    eyebrow: "Healthcare & Clinical Staffing",
    headline: "Qualified clinical professionals. Rigorously verified.",
    lead: "KICCPA connects hospitals, clinics, and healthcare networks with vetted physicians, specialized nurses, and allied medical practitioners. (Recruitment enquiries are reviewed against clinical specifications; no placement is guaranteed).",
    image: "/images/medical.jpg",
    alt: "Specialist medical doctors and clinical consultants.",
    rolesHead: {
      eyebrow: "Talent Specializations",
      title: "Roles we recruit for in Healthcare.",
      lead: "Specialized clinical and technical medical personnel sourced across our international healthcare recruitment networks.",
    },
    roles: [
      {
        title: "Intensive Care & Emergency Nurses (ICU/ER)",
        category: "Nursing",
        experience: "3+ Years ICU/ER Experience",
        description: "Critical care registered nurses with BLS/ACLS certifications and acute clinical judgment.",
      },
      {
        title: "Surgical & Operating Theatre Nurses (OT)",
        category: "Nursing",
        experience: "3+ Years Surgical Theatre",
        description: "Scrub and circulating nurses experienced in aseptic techniques and surgical instrumentation.",
      },
      {
        title: "Specialist Physicians & Surgeons",
        category: "Medical Specialists",
        experience: "Board Certified / Fellowship",
        description: "Cardiologists, orthopedic surgeons, pediatricians, and internal medicine consultants.",
      },
      {
        title: "General Practitioners (GPs)",
        category: "Clinical Practice",
        experience: "2+ Years Post-Internship",
        description: "Primary care physicians managing diagnostic evaluations, patient care, and preventative medicine.",
      },
      {
        title: "Diagnostic Radiographers & Sonographers",
        category: "Allied Health",
        experience: "Licensed Imaging Tech",
        description: "Certified technologists operating MRI, CT, X-ray, and ultrasound imaging diagnostic equipment.",
      },
      {
        title: "Clinical Laboratory Technologists",
        category: "Diagnostic Support",
        experience: "Certified Medical Technologist",
        description: "Laboratory specialists executing biochemistry, hematology, and microbiological diagnostic tests.",
      },
    ],
    employerBox: {
      title: "For Healthcare Employers",
      badge: "Healthcare Provider Support",
      lead: "Looking to staff clinical wards, specialized departments, or new hospital wings with verified professionals?",
      steps: [
        "1. Submit your department staffing specifications, licensing requirements, and hiring timeline.",
        "2. Our clinical recruitment team matches pre-vetted candidate dossiers with verified credentials.",
        "3. Review shortlisted profiles and conduct direct interviews with approved candidates.",
        "4. KICCPA coordinates licensing verification, credential attestation, and deployment timelines.",
      ],
      ctaLabel: "Submit Staffing Request",
      ctaHref: "/business-enquiry?division=hr&service=Healthcare+Recruitment",
    },
    candidateBox: {
      title: "For Medical Candidates",
      badge: "Clinical Career Opportunities",
      lead: "Are you a licensed physician, registered nurse, or healthcare specialist exploring international placement?",
      steps: [
        "1. Submit your CV and clinical qualifications through our job-seeker enquiry portal.",
        "2. Our recruitment coordinators review your degrees, board registrations, and career history.",
        "3. We connect eligible candidates with matching verified employer mandates in Kuwait and the GCC.",
      ],
      ctaLabel: "Start Candidate Enquiry",
      ctaHref: "/job-seeker-enquiry?sector=Healthcare",
    },
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Healthcare Recruitment.",
      lead: "Details on credential verification, licensing equivalency, and hiring timelines.",
    },
    faqs: [
      {
        q: "How does KICCPA verify clinical licenses and degrees?",
        a: "Our compliance team conducts primary source verification (PSV) of medical degrees, board certifications, and nursing licenses through recognized international verification agencies and direct institutional validation.",
      },
      {
        q: "What is the typical deployment timeline for international healthcare staff?",
        a: "Depending on the destination country's medical licensing authority and visa issuance timelines, mobilization typically requires 8 to 14 weeks from candidate selection.",
      },
      {
        q: "Do you offer a candidate replacement guarantee?",
        a: "Yes. Every clinical placement includes an agreed replacement guarantee window (typically 90 days) ensuring uninterrupted patient care should a candidate fail probation.",
      },
      {
        q: "Is KICCPA a licensed recruitment agency?",
        a: "KICCPA acts as an enterprise consulting and recruitment sourcing partner connecting employers with vetted candidates across authorized channels in compliance with regional labor laws.",
      },
    ],
  },

  "hospitality-recruitment": {
    slug: "hospitality-recruitment",
    sectorTitle: "Hotels & Hospitality",
    eyebrow: "Hospitality & Dining Staffing",
    headline: "Front-of-house poise. Culinary excellence.",
    lead: "KICCPA recruits hospitality professionals—from luxury hotel managers and front desk teams to executive chefs and banquet personnel—for high-end hotels, resorts, and premier dining destinations.",
    image: "/assets/industries/hospitality.jpg",
    alt: "Hospitality staff in a luxury hotel setting.",
    rolesHead: {
      eyebrow: "Talent Specializations",
      title: "Roles we recruit for in Hospitality.",
      lead: "Vetted hospitality leaders, culinary artists, and guest service specialists ready to deliver five-star service.",
    },
    roles: [
      {
        title: "Hotel General & Operations Managers",
        category: "Management",
        experience: "5+ Years Luxury Hospitality",
        description: "Experienced general managers overseeing revenue management, guest satisfaction, and hotel operations.",
      },
      {
        title: "Front Office Managers & Concierge",
        category: "Guest Relations",
        experience: "3+ Years Front Office",
        description: "Polished, multilingual front-of-house professionals delivering exceptional first-contact guest care.",
      },
      {
        title: "Executive & Head Chefs",
        category: "Culinary Leadership",
        experience: "5+ Years Culinary Management",
        description: "Visionary kitchen leaders managing menu design, food costing, kitchen brigade, and hygiene compliance.",
      },
      {
        title: "Sous Chefs & Specialist Pastry Chefs",
        category: "Culinary Arts",
        experience: "3+ Years Specialized Kitchen",
        description: "Artisanal culinary specialists in international cuisine, French pastry, and high-volume banquet execution.",
      },
      {
        title: "Food & Beverage (F&B) Supervisors",
        category: "Dining Operations",
        experience: "2+ Years F&B Service",
        description: "Dining room supervisors coordinating banquet operations, table service excellence, and team hygiene.",
      },
      {
        title: "Housekeeping & Facility Supervisors",
        category: "Rooms Division",
        experience: "3+ Years Luxury Rooms",
        description: "Supervisory staff maintaining impeccable room presentation, laundry management, and hygiene audits.",
      },
    ],
    employerBox: {
      title: "For Hospitality Employers",
      badge: "Hotel & Resort Operators",
      lead: "Opening a new luxury property, fine dining venue, or preparing for peak seasonal tourism in the GCC?",
      steps: [
        "1. Define required roles, language preferences, brand standards, and deployment timelines.",
        "2. Review curated candidate portfolios including culinary plating photos, video introductions, and references.",
        "3. Conduct virtual or in-person culinary tastings and management interviews.",
        "4. KICCPA handles travel mobilization, contract documentation, and visa onboarding logistics.",
      ],
      ctaLabel: "Request Hospitality Staff",
      ctaHref: "/business-enquiry?division=hr&service=Hotels+%26+Hospitality",
    },
    candidateBox: {
      title: "For Hospitality Candidates",
      badge: "Global Hotel Careers",
      lead: "Ready to elevate your hospitality career with luxury hotel chains and premier restaurants abroad?",
      steps: [
        "1. Submit your hospitality resume, service certifications, and portfolio through our candidate portal.",
        "2. Our hospitality recruiters evaluate your experience, language fluency, and guest service acumen.",
        "3. Interview directly with vetted luxury hotel and resort employers.",
      ],
      ctaLabel: "Start Hospitality Enquiry",
      ctaHref: "/job-seeker-enquiry?sector=Hospitality",
    },
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Hospitality Recruitment.",
      lead: "Details on language proficiency, candidate video interviews, and seasonal mobilization.",
    },
    faqs: [
      {
        q: "What languages do your hospitality candidates speak?",
        a: "We source candidates fluent in English, Arabic, French, and regional languages, prioritizing multilingual capability for front-of-house and guest relations positions.",
      },
      {
        q: "Can we review culinary portfolios and video introductions?",
        a: "Yes. For culinary and front-of-house roles, we provide video introductions, culinary plating portfolios, and practical interview records alongside verified resumes.",
      },
      {
        q: "How fast can you mobilize seasonal hospitality staff?",
        a: "For large hotel openings or seasonal tourism surges, batch mobilization of 20 to 100+ vetted staff is typically executed within 6 to 8 weeks.",
      },
      {
        q: "Do you assess hospitality candidates for grooming and brand alignment?",
        a: "Yes. Every candidate is evaluated against international luxury hotel grooming standards, etiquette, and hospitality communication protocols prior to presentation.",
      },
    ],
  },

  "oil-gas-recruitment": {
    slug: "oil-gas-recruitment",
    sectorTitle: "Oil & Gas",
    eyebrow: "Energy & Petroleum Engineering",
    headline: "Certified technical talent. Strict HSE compliance.",
    lead: "KICCPA recruits certified engineers, HSE officers, and technical field specialists for upstream exploration, downstream refining, and pipeline operations across the Middle East.",
    image: "/images/oil-gas.jpg",
    alt: "Industrial energy operations facility and engineers.",
    rolesHead: {
      eyebrow: "Talent Specializations",
      title: "Roles we recruit for in Oil & Gas.",
      lead: "Experienced petroleum engineers, offshore specialists, and certified safety personnel.",
    },
    roles: [
      {
        title: "Petroleum & Reservoir Engineers",
        category: "Engineering",
        experience: "5+ Years Upstream Ops",
        description: "Specialists in reservoir simulation, enhanced oil recovery (EOR), and production optimization.",
      },
      {
        title: "Drilling & Wellsite Supervisors",
        category: "Field Operations",
        experience: "5+ Years Drilling / IWCF",
        description: "IWCF-certified wellsite leaders overseeing onshore and offshore rig drilling operations safely.",
      },
      {
        title: "HSE Officers & Safety Managers",
        category: "Safety & Compliance",
        experience: "NEBOSH / IOSH Certified",
        description: "Field safety professionals ensuring compliance with regional environmental and industrial safety laws.",
      },
      {
        title: "Piping & Mechanical Engineers",
        category: "Mechanical & Piping",
        experience: "4+ Years Refinery / Plant",
        description: "Engineers specialized in pipeline stress analysis, mechanical integrity, and refinery equipment.",
      },
      {
        title: "Instrumentation & Control Technicians",
        category: "Technical Trades",
        experience: "Certified DCS/PLC Tech",
        description: "Field technicians maintaining Distributed Control Systems (DCS), telemetry, and safety valves.",
      },
      {
        title: "NDT & Quality Control Inspectors",
        category: "Quality Assurance",
        experience: "ASNT Level II / CSWIP",
        description: "Certified Non-Destructive Testing inspectors verifying weld integrity, pipeline corrosion, and tanks.",
      },
    ],
    employerBox: {
      title: "For Energy Operators & Contractors",
      badge: "Oil & Gas Operators",
      lead: "Need certified engineering expertise or technical field crews for upcoming shutdowns, drilling campaigns, or facility operations?",
      steps: [
        "1. Submit your project requirements, offshore/onshore specifications, and certification mandates.",
        "2. We provide shortlisted candidate profiles with verified safety credentials and past project logs.",
        "3. Conduct technical technical screening and panel interviews.",
        "4. KICCPA coordinates gate passes, medical clearances, and mobilization to site.",
      ],
      ctaLabel: "Request Oil & Gas Personnel",
      ctaHref: "/business-enquiry?division=hr&service=Oil+%26+Gas",
    },
    candidateBox: {
      title: "For Energy Professionals",
      badge: "Petroleum Careers",
      lead: "Are you a certified petroleum engineer, HSE officer, or technical specialist looking for energy roles?",
      steps: [
        "1. Submit your CV, technical certifications (NEBOSH, IWCF, BOSIET), and project history.",
        "2. Our technical recruiters verify your accreditations and safety certifications.",
        "3. Receive direct interview opportunities with leading GCC energy and contracting companies.",
      ],
      ctaLabel: "Start Energy Enquiry",
      ctaHref: "/job-seeker-enquiry?sector=Oil+%26+Gas",
    },
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Oil & Gas Recruitment.",
      lead: "Details on safety certifications, offshore medical clearances, and project staffing.",
    },
    faqs: [
      {
        q: "What certifications do your oil and gas candidates hold?",
        a: "Our candidates hold internationally recognized certifications including NEBOSH, IOSH, IWCF, BOSIET/HUET for offshore, ASNT Level II for NDT, and API inspection certifications.",
      },
      {
        q: "Can you provide personnel for refinery turnaround and shutdown projects?",
        a: "Yes. We specialize in rapid mobilization of short-term shutdown teams (10 to 200+ technicians and inspectors) to support time-critical refinery maintenance windows.",
      },
      {
        q: "How do you verify field experience and safety compliance records?",
        a: "Every candidate undergoes past-project verification, safety compliance record checks, and direct technical interviews conducted by seasoned engineering recruiters.",
      },
      {
        q: "Do you arrange medical and oil-field security clearances?",
        a: "Yes. We coordinate all necessary OGUK medical certifications, local oil-sector gate passes, and safety induction clearances required for site entry.",
      },
    ],
  },

  "construction-recruitment": {
    slug: "construction-recruitment",
    sectorTitle: "Construction & Infrastructure",
    eyebrow: "Civil & Commercial Construction",
    headline: "Proven site leadership. Skilled construction talent.",
    lead: "KICCPA supplies certified project directors, civil engineers, MEP specialists, and skilled trades for commercial architecture, high-rise developments, and large-scale infrastructure projects.",
    image: "/images/construction.jpg",
    alt: "Civil engineering and commercial construction site supervision.",
    rolesHead: {
      eyebrow: "Talent Specializations",
      title: "Roles we recruit for in Construction.",
      lead: "Engineering leadership and specialized technical workforce for major civil developments.",
    },
    roles: [
      {
        title: "Project Directors & Construction Managers",
        category: "Site Leadership",
        experience: "7+ Years Major Projects",
        description: "Senior leaders managing master construction schedules, subcontractor coordination, and budgets.",
      },
      {
        title: "Civil & Structural Engineers",
        category: "Engineering",
        experience: "4+ Years Civil Works",
        description: "Licensed civil engineers overseeing foundation works, structural steel, and concrete pour quality.",
      },
      {
        title: "MEP Project Engineers & Coordinators",
        category: "Mechanical & Electrical",
        experience: "4+ Years MEP Systems",
        description: "Specialists coordinating HVAC, electrical distribution, plumbing, and fire safety systems.",
      },
      {
        title: "Quantity Surveyors & Estimators",
        category: "Commercial Management",
        experience: "3+ Years Cost Estimation",
        description: "Commercial surveyors managing bill of quantities (BOQ), variation claims, and contractor payments.",
      },
      {
        title: "Site Safety (HSE) Supervisors",
        category: "Site Safety",
        experience: "OSHA / NEBOSH Certified",
        description: "Field supervisors enforcing rigorous site safety protocols, scaffolding inspections, and PPE.",
      },
      {
        title: "Heavy Equipment & Crane Operators",
        category: "Skilled Trades",
        experience: "Certified Heavy Machinery",
        description: "Licensed operators for tower cranes, excavators, and piling machinery with clean safety records.",
      },
    ],
    employerBox: {
      title: "For Construction Contractors",
      badge: "Contractor Workforce Solutions",
      lead: "Mobilizing manpower for mega infrastructure projects, high-rises, or industrial civil developments?",
      steps: [
        "1. Provide project engineering specifications, trade counts, and project mobilization dates.",
        "2. Review verified candidate dossiers with authenticated engineering degrees and trade licenses.",
        "3. Conduct technical evaluations or practical trade testing.",
        "4. KICCPA coordinates workforce deployment, work permits, and accommodation logistics.",
      ],
      ctaLabel: "Request Construction Workforce",
      ctaHref: "/business-enquiry?division=hr&service=Construction",
    },
    candidateBox: {
      title: "For Construction Professionals",
      badge: "Infrastructure Careers",
      lead: "Are you an engineer, surveyor, or skilled construction supervisor looking for GCC project opportunities?",
      steps: [
        "1. Upload your resume, engineering council registration, and project portfolio.",
        "2. Our construction recruiters verify your project achievements and credentials.",
        "3. Connect with tier-1 main contractors executing premier infrastructure projects.",
      ],
      ctaLabel: "Start Construction Enquiry",
      ctaHref: "/job-seeker-enquiry?sector=Construction",
    },
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Construction Recruitment.",
      lead: "Information on trade testing, engineering credential attestation, and mobilization scales.",
    },
    faqs: [
      {
        q: "Do you conduct practical trade testing for skilled labor?",
        a: "Yes. For skilled trades (electricians, welders, crane operators), we utilize accredited technical testing centers to verify hands-on competence before deployment.",
      },
      {
        q: "Can you assist with professional engineering board equivalency in Kuwait?",
        a: "Yes. Our compliance officers assist engineers with the necessary Kuwait Society of Engineers (KSE) accreditation and Ministry certificate attestations.",
      },
      {
        q: "What is the scale of construction manpower you can mobilize?",
        a: "We mobilize both individual specialized engineers and project squads ranging from 50 to 500+ tradesmen for major civil works.",
      },
      {
        q: "How are occupational health and safety standards verified?",
        a: "All candidate profiles undergo safety compliance checks, and HSE supervisors hold accredited NEBOSH/OSHA credentials.",
      },
    ],
  },

  "manufacturing-recruitment": {
    slug: "manufacturing-recruitment",
    sectorTitle: "Manufacturing & Industrial",
    eyebrow: "Industrial Plant & Production Staffing",
    headline: "Plant operations leadership. Precision industrial talent.",
    lead: "KICCPA supplies production managers, industrial maintenance engineers, and quality control specialists for modern manufacturing plants, automated assembly lines, and processing facilities.",
    image: "/images/manufacturing.jpg",
    alt: "Automated manufacturing facility and plant operations.",
    rolesHead: {
      eyebrow: "Talent Specializations",
      title: "Roles we recruit for in Manufacturing.",
      lead: "Specialized plant operations leadership, automation engineers, and quality assurance inspectors.",
    },
    roles: [
      {
        title: "Plant & Operations Managers",
        category: "Plant Leadership",
        experience: "6+ Years Industrial Plant",
        description: "Operations directors managing plant OEE (Overall Equipment Effectiveness), safety, and output targets.",
      },
      {
        title: "Industrial Automation & PLC Engineers",
        category: "Automation Engineering",
        experience: "4+ Years SCADA / PLC",
        description: "Engineers programming Siemens, Allen-Bradley, and Omron PLCs for automated assembly lines.",
      },
      {
        title: "Electrical & Mechanical Maintenance Techs",
        category: "Maintenance",
        experience: "3+ Years Plant Maintenance",
        description: "Technicians executing preventive and predictive maintenance on industrial motors, pumps, and gearboxes.",
      },
      {
        title: "Quality Assurance (QA/QC) Managers",
        category: "Quality Assurance",
        experience: "ISO 9001 / Six Sigma",
        description: "Specialists enforcing quality management systems, defect reduction, and production audits.",
      },
      {
        title: "Production Shift Supervisors",
        category: "Production Line",
        experience: "3+ Years Shop Floor",
        description: "Floor supervisors coordinating line operators, material flow, shift handovers, and safety.",
      },
      {
        title: "Supply Chain & Warehouse Supervisors",
        category: "Logistics & Inventory",
        experience: "3+ Years Warehouse WMS",
        description: "Inventory managers coordinating ERP inventory tracking, raw material staging, and finished goods dispatch.",
      },
    ],
    employerBox: {
      title: "For Industrial & Plant Operators",
      badge: "Plant Staffing Solutions",
      lead: "Expanding production lines, commissioning a new manufacturing facility, or seeking automation engineers?",
      steps: [
        "1. Define production machinery types, shift requirements, and candidate technical profiles.",
        "2. Review pre-screened technical dossiers featuring verified plant experience and machinery expertise.",
        "3. Conduct direct technical interviews and simulation testing.",
        "4. KICCPA handles contract mobilization, visa sponsorship coordination, and onboarding.",
      ],
      ctaLabel: "Request Industrial Personnel",
      ctaHref: "/business-enquiry?division=hr&service=Manufacturing",
    },
    candidateBox: {
      title: "For Industrial Professionals",
      badge: "Manufacturing Careers",
      lead: "Are you a certified plant engineer, automation specialist, or maintenance technician seeking opportunities?",
      steps: [
        "1. Submit your CV and technical certifications through our candidate portal.",
        "2. Our industrial recruiters evaluate your hands-on machinery experience and certifications.",
        "3. Interview directly with established manufacturing plants in Kuwait and regional markets.",
      ],
      ctaLabel: "Start Manufacturing Enquiry",
      ctaHref: "/job-seeker-enquiry?sector=Manufacturing",
    },
    faqHead: {
      eyebrow: "FAQ",
      title: "Common questions about Manufacturing Recruitment.",
      lead: "Details on PLC expertise, ISO quality standards, and industrial shift staffing.",
    },
    faqs: [
      {
        q: "What types of manufacturing industries do you support?",
        a: "We support FMCG packaging, food and beverage processing, plastics manufacturing, pharmaceutical plants, building materials, and automotive component facilities.",
      },
      {
        q: "Can you provide engineers experienced in specific PLC brands?",
        a: "Yes. We source automation engineers with verified hands-on expertise in Siemens TIA Portal, Rockwell/Allen-Bradley, Schneider Electric, and ABB robotics.",
      },
      {
        q: "How do you verify quality assurance accreditations?",
        a: "We confirm Six Sigma belts, ISO 9001/14001/22000 internal auditor certifications, and past track records of defect rate reductions.",
      },
      {
        q: "Can you staff multi-shift 24/7 manufacturing operations?",
        a: "Yes. We recruit and mobilize complete shift squads (supervisors, operators, maintenance technicians) configured for 24/7 continuous production.",
      },
    ],
  },
};
