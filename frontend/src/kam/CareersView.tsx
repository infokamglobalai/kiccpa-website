import Link from "next/link";
import type { PublicJob } from "@/lib/jobs";
import { JobList } from "./JobList";
import Reveal from "./Reveal";
import styles from "./kam.module.css";

export default function CareersView({ jobs, database }: { jobs: PublicJob[]; database: boolean }) {
  const steps = [
    { n: "01", title: "Application Review", text: "Our recruitment team evaluates your CV and experience against the specific mandate and technical benchmarks." },
    { n: "02", title: "Initial Talent Dialogue", text: "A 30-minute introductory conversation to discuss your background, working style, and mutual alignment." },
    { n: "03", title: "Technical / Practical Assessment", text: "A role-specific practical evaluation, coding challenge, case study, or scenario walkthrough." },
    { n: "04", title: "Leadership Interview", text: "An in-depth discussion with department heads and cross-functional team leaders regarding vision and impact." },
    { n: "05", title: "Offer & Structured Onboarding", text: "Clear, transparent offer terms, relocation logistics (where applicable), and comprehensive team welcome." },
  ];

  const divisionsHiring = [
    {
      title: "Technology & AI",
      tagline: "Software & Cloud Engineering",
      roles: ["Full-Stack Developers (React, Next.js, Node.js)", "Cloud & DevOps Engineers (AWS, Azure)", "AI & Automation Specialists", "Cybersecurity & IT Systems Engineers"],
      locations: "Kuwait & India Tech Centers",
    },
    {
      title: "Business Outsourcing",
      tagline: "Operations & Customer Care",
      roles: ["Multichannel Support Representatives", "B2B Sales Development Specialists", "Back-Office Data Processors", "Virtual Executive Assistants"],
      locations: "Philippines BPO Hub & Regional Desks",
    },
    {
      title: "HR & Recruitment",
      tagline: "Talent Acquisition & Sourcing",
      roles: ["Healthcare & Clinical Recruiters", "Industrial & Engineering Sourcing Leads", "Talent Compliance Analysts", "Recruitment Coordinators"],
      locations: "Kuwait, Kenya, & Tunisia Offices",
    },
  ];

  return (
    <main className={styles.sv}>
      {/* 1. Hero */}
      <section className={styles.svHero}>
        <div className={styles.svHeroGrid}>
          <div className={styles.svHeroCopy}>
            <nav className={styles.svCrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span aria-current="page">Careers</span>
            </nav>
            <p className={styles.svEyebrow}>Careers at KICCPA</p>
            <h1>Build your next chapter with us.</h1>
            <p>
              Open roles are published directly by the KICCPA hiring team. Discover opportunities to collaborate on enterprise digital products, scaled operational delivery, and international workforce mandates.
            </p>
            <div className={styles.rowBtns}>
              <a href="#open-roles" className={styles.hpBtn}>
                View Open Positions <span className={styles.arrow}>↓</span>
              </a>
              <Link href="/job-seeker-enquiry" className={styles.hpBtnGhost}>
                Submit Candidate Profile
              </Link>
            </div>
          </div>
          <figure className={styles.svHeroMedia}>
            <img src="/assets/services/people.jpg" alt="Professionals collaborating in a modern workplace." />
          </figure>
        </div>
      </section>

      {/* 2. Life at KICCPA */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="life-at-kiccpa">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>Our Workplace Culture</p>
            <h2>Life at KICCPA.</h2>
            <p className={styles.divSectionLead}>
              We unite Kuwait enterprise governance with specialized global delivery hubs across six strategic nations.
            </p>
          </div>
          <div className={styles.hpWhy}>
            <Reveal className={styles.hpStretch}>
              <article>
                <em>01</em>
                <h3>Global Collaboration</h3>
                <p>
                  Work closely with cross-border squads across Kuwait, India, the Philippines, Saudi Arabia, Kenya, and Tunisia, building solutions that make a tangible regional impact.
                </p>
              </article>
            </Reveal>
            <Reveal className={styles.hpStretch}>
              <article>
                <em>02</em>
                <h3>Modern Engineering &amp; Operations</h3>
                <p>
                  Engage with modern TypeScript frameworks, cloud-native DevOps pipelines, automated AI workflows, and enterprise customer relationship platforms.
                </p>
              </article>
            </Reveal>
            <Reveal className={styles.hpStretch}>
              <article>
                <em>03</em>
                <h3>Continuous Professional Growth</h3>
                <p>
                  We invest in our people through dedicated mentorship, clear advancement pathways, and an environment where initiative, ownership, and direct communication are rewarded.
                </p>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Areas We Hire For */}
      <section className={styles.svSection} id="areas-we-hire">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>Talent Specializations</p>
            <h2>Areas we hire for.</h2>
            <p className={styles.divSectionLead}>
              Career opportunities spanning our three core enterprise operating divisions.
            </p>
          </div>
          <div className={styles.divWaysGrid}>
            {divisionsHiring.map((div) => (
              <article key={div.title} className={styles.divWayCard}>
                <div className={styles.divWayHeader}>
                  <h3>{div.title}</h3>
                  <span className={styles.divWayTagline}>{div.tagline}</span>
                </div>
                <div className={styles.divWaySection}>
                  <strong>Core Roles:</strong>
                  <ul className={styles.divWayBenefits} style={{ marginTop: 8 }}>
                    {div.roles.map((r, i) => (
                      <li key={i}>
                        <svg className={styles.divCheckIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.divWaySection} style={{ marginTop: "auto", paddingTop: 16 }}>
                  <strong>Operating Locations:</strong>
                  <p style={{ margin: "4px 0 0" }}>{div.locations}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How We Hire — 5 Steps */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="how-we-hire">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>Hiring Process</p>
            <h2>How we hire.</h2>
            <p className={styles.divSectionLead}>
              A transparent, structured 5-stage recruitment journey designed to respect your time and provide clear feedback.
            </p>
          </div>
          <ol className={styles.svSteps}>
            {steps.map((step) => (
              <li key={step.n}>
                <span>{step.n}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Open Roles / No Roles Box */}
      <section className={styles.svSection} id="open-roles">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>Published Opportunities</p>
            <h2>Current Openings.</h2>
          </div>

          {!database && (
            <p className={styles.muted}>
              The hiring database is temporarily syncing. Please reach out directly or check back shortly.
            </p>
          )}

          {database && jobs.length === 0 && (
            <div className={styles.divChallengeCard} style={{ maxWidth: 840, margin: "0 auto", padding: "40px 36px" }}>
              <span className={styles.divChallengeNum}>00</span>
              <h3 style={{ fontSize: "1.75rem", marginBottom: 12 }}>No open roles right now</h3>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.6, marginBottom: 20 }}>
                When our talent team publishes a new opening, it appears here immediately with full job specifications and direct application submission.
              </p>
              <div style={{ background: "#f8fafc", padding: "20px 24px", borderRadius: 12, marginBottom: 24, border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", color: "#0f172a", marginBottom: 8, fontSize: "0.95rem" }}>
                  Stay Informed &amp; Register Your Interest:
                </strong>
                <p style={{ margin: "0 0 12px", color: "#475569", fontSize: "0.9rem" }}>
                  Connect directly with our recruitment coordinators to keep your profile on file for upcoming requirements:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 18, fontSize: "0.92rem" }}>
                  <span>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:careers@kiccpa.com" style={{ color: "#2563eb", textDecoration: "underline" }}>
                      careers@kiccpa.com
                    </a>
                  </span>
                  <span>
                    <strong>WhatsApp:</strong>{" "}
                    <a href="https://wa.me/96599889588" target="_blank" rel="noreferrer" style={{ color: "#16a34a", textDecoration: "underline" }}>
                      +965 9988 9588
                    </a>
                  </span>
                </div>
              </div>
              <div className={styles.rowBtns}>
                <Link className={styles.hpBtn} href="/job-seeker-enquiry">
                  Start a Job-Seeker Enquiry <span className={styles.arrow}>→</span>
                </Link>
                <Link className={styles.hpBtnGhost} href="/contact">
                  Contact Recruitment Team
                </Link>
              </div>
            </div>
          )}

          {jobs.length > 0 && <JobList jobs={jobs} />}
        </div>
      </section>
    </main>
  );
}
