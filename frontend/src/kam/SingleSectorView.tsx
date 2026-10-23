"use client";

import { useState } from "react";
import Link from "next/link";
import { Division, ServiceLink, clientPath, seekerPath } from "./home-content";
import { sectorPagesData } from "./sector-content";
import styles from "./kam.module.css";

const sectorSteps = [
  { n: "01", title: "Mandate Scoping", sub: "Roles & Requirements", text: "We review job descriptions, required clinical/technical licenses, experience criteria, and deployment timelines." },
  { n: "02", title: "Active Sourcing", sub: "Global Talent Pipeline", text: "We search our established international talent channels across Kuwait, India, Philippines, Kenya, and Tunisia." },
  { n: "03", title: "Rigorous Vetting", sub: "Credential & Skill Check", text: "Primary source verification of degrees, board registrations, past employment records, and skills screening." },
  { n: "04", title: "Client Interviews", sub: "Shortlist Selection", text: "We present verified candidate dossiers and facilitate structured client interviews and practical assessments." },
  { n: "05", title: "Deployment & Onboarding", sub: "Mobilization Support", text: "Assistance with contractual documentation, licensing equivalency, visa clearances, and guarantee period tracking." },
];

export default function SingleSectorView({
  division,
  item,
  slug,
}: {
  division: Division;
  item: ServiceLink;
  slug: string;
}) {
  const data = sectorPagesData[slug] || sectorPagesData["healthcare-recruitment"];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const toggleFaq = (idx: number) => setOpenFaq((prev) => (prev === idx ? null : idx));

  return (
    <main className={styles.sv}>
      {/* 1. Hero */}
      <section className={styles.svHero}>
        <div className={styles.svHeroGrid}>
          <div className={styles.svHeroCopy}>
            <nav className={styles.svCrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              <Link href={division.href}>{division.title}</Link>
              <span>/</span>
              <span aria-current="page">{item.title}</span>
            </nav>
            <p className={styles.svEyebrow}>{data.eyebrow}</p>
            <h1>{data.headline}</h1>
            <p>{data.lead}</p>
            <div className={styles.rowBtns}>
              <Link className={styles.hpBtn} href={clientPath(division, item.title)}>
                Request Staff <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.hpBtnGhost} href={seekerPath(division, item.title)}>
                Candidate Enquiry
              </Link>
            </div>
          </div>
          <figure className={styles.svHeroMedia}>
            <img src={item.image || data.image} alt={item.alt || data.alt} />
          </figure>
        </div>
      </section>

      {/* 2. Block 1: Roles We Recruit For (Structured List) */}
      <section className={styles.svSection} id="roles">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{data.rolesHead.eyebrow}</p>
            <h2>{data.rolesHead.title}</h2>
            <p className={styles.divSectionLead}>{data.rolesHead.lead}</p>
          </div>
          <div className={styles.sectorRolesGrid}>
            {data.roles.map((role) => (
              <article key={role.title} className={styles.sectorRoleCard}>
                <div className={styles.sectorRoleMeta}>
                  <span className={styles.sectorRoleCategory}>{role.category}</span>
                  <span className={styles.sectorRoleExp}>{role.experience}</span>
                </div>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Block 2: Two Short Action Boxes (For Employers & For Candidates) */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="action-boxes">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>How We Collaborate</p>
            <h2>Start your recruitment or candidate journey.</h2>
            <p className={styles.divSectionLead}>
              Whether you are an employer seeking specialized staff or a qualified professional exploring international opportunities, our team ensures a direct, transparent path forward.
            </p>
          </div>
          <div className={styles.sectorActionBoxesGrid}>
            {/* Box 1: For Employers */}
            <article className={`${styles.sectorActionBox} ${styles.sectorBoxEmployer}`}>
              <span className={styles.sectorBoxBadge}>{data.employerBox.badge}</span>
              <h3>{data.employerBox.title}</h3>
              <p>{data.employerBox.lead}</p>
              <ul className={styles.sectorStepsList}>
                {data.employerBox.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
              <Link className={styles.hpBtn} href={data.employerBox.ctaHref}>
                {data.employerBox.ctaLabel} <span className={styles.arrow}>→</span>
              </Link>
            </article>

            {/* Box 2: For Candidates */}
            <article className={`${styles.sectorActionBox} ${styles.sectorBoxCandidate}`}>
              <span className={styles.sectorBoxBadge}>{data.candidateBox.badge}</span>
              <h3>{data.candidateBox.title}</h3>
              <p>{data.candidateBox.lead}</p>
              <ul className={styles.sectorStepsList}>
                {data.candidateBox.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
              <Link className={styles.hpBtnGhost} href={data.candidateBox.ctaHref}>
                {data.candidateBox.ctaLabel} <span className={styles.arrow}>→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* 4. 5-Stage Placement Process */}
      <section className={styles.svSection} id="placement-process">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>Placement Methodology</p>
            <h2>A proven 5-stage recruitment process.</h2>
            <p className={styles.divSectionLead}>
              Our thorough sourcing, compliance verification, and mobilization methodology ensures reliable talent delivery with complete accountability.
            </p>
          </div>
          <ol className={styles.hpSteps}>
            {sectorSteps.map((step) => (
              <li key={step.n}>
                <span className={styles.hpStepNum}>{step.n}</span>
                <strong className={styles.hpStepTitle}>{step.title}</strong>
                <span className={styles.hpStepsSub}>{step.sub}</span>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Block 3: Frequently Asked Questions (FAQ) */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="faq">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{data.faqHead.eyebrow}</p>
            <h2>{data.faqHead.title}</h2>
            <p className={styles.divSectionLead}>{data.faqHead.lead}</p>
          </div>
          <div className={styles.divFaqList}>
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`${styles.divFaqItem} ${isOpen ? styles.divFaqItemOpen : ""}`}>
                  <button
                    type="button"
                    className={styles.divFaqBtn}
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <svg
                      className={`${styles.divFaqChevron} ${isOpen ? styles.divFaqChevronOpen : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {isOpen ? (
                    <div className={styles.divFaqContent}>
                      <p>{faq.a}</p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Closing CTA Banner */}
      <section className={styles.svClose}>
        <div className={styles.svCloseMedia} aria-hidden="true">
          <img src={item.image || data.image} alt="" />
        </div>
        <div className={styles.wrap}>
          <div className={styles.svCloseInner}>
            <div>
              <h2>Ready to Discuss Staffing for {item.title}?</h2>
              <p>
                Submit your role specifications. Our recruitment specialists will review your requirements and begin candidate matching.
              </p>
              <div className={styles.hpCloseContact}>
                <span className={styles.hpCloseContactLabel}>Direct Reach</span>
                <a href="tel:+96560919345" className={styles.hpCloseContactLink}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Phone (Kuwait): +965 6091 9345</span>
                </a>
                <a href="https://wa.me/96599889588" target="_blank" rel="noopener noreferrer" className={styles.hpCloseContactLink}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>WhatsApp: +965 9988 9588</span>
                </a>
                <a href="mailto:info@kiccpa.com" className={styles.hpCloseContactLink}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                  <span>Email: info@kiccpa.com</span>
                </a>
              </div>
            </div>
            <div className={styles.rowBtns}>
              <Link className={styles.hpBtn} href={clientPath(division, item.title)}>
                Request Staff <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.hpBtnGhost} href={division.href}>
                All Recruitment Sectors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
