"use client";

import { useState } from "react";
import Link from "next/link";
import { Division, ServiceLink, clientPath, homeSteps } from "./home-content";
import { servicePagesData } from "./service-content";
import styles from "./kam.module.css";

export default function SingleServiceView({
  division,
  item,
  slug,
}: {
  division: Division;
  item: ServiceLink;
  slug: string;
}) {
  const data = servicePagesData[slug] || {
    slug,
    divisionId: division.id as "technology" | "outsourcing",
    divisionTitle: division.title,
    eyebrow: `${item.title} Service`,
    title: item.title,
    headline: `${item.title}. Engineered for reliability.`,
    lead: item.summary,
    image: item.image || division.image,
    alt: item.alt || item.title,
    challengesHead: {
      eyebrow: "Operational Challenges",
      title: `Challenges we help solve in ${item.title}.`,
      lead: "Organizations face friction when internal resources are stretched and tools fail to scale.",
    },
    challenges: [
      { n: "01", title: "Capacity Bottlenecks", desc: "Internal teams lack specialized bandwidth to execute projects without disrupting day-to-day operations." },
      { n: "02", title: "Process Inefficiencies", desc: "Manual, unstandardized workflows slow delivery times and increase execution costs." },
      { n: "03", title: "Scalability Limits", desc: "Inflexible systems struggle to adapt as operational demands and user numbers expand." },
    ],
    whatWeDoHead: {
      eyebrow: "Scope of Work",
      title: `What we do in ${item.title}.`,
      lead: "Comprehensive, structured execution tailored to your specific business requirements.",
    },
    whatWeDo: [
      {
        title: "Requirement Scoping & Architecture",
        desc: "Structured discovery defining specifications, workflows, and success metrics.",
        bullets: ["Detailed functional review", "Architecture blueprinting", "Phased delivery roadmap"],
      },
      {
        title: "Production Execution & Delivery",
        desc: "Rigorous execution adhering to international engineering and operational standards.",
        bullets: ["Experienced specialist delivery", "Regular milestone check-ins", "Quality assurance testing"],
      },
      {
        title: "Integration & Deployment",
        desc: "Seamless handover and rollout into your existing operational ecosystem.",
        bullets: ["Environment configuration", "User and admin documentation", "Cutover coordination"],
      },
      {
        title: "SLA Support & Continuous Refinement",
        desc: "Ongoing maintenance ensuring long-term reliability and performance.",
        bullets: ["Guaranteed response times", "Proactive system health monitoring", "Iterative optimizations"],
      },
    ],
    deliverablesHead: {
      eyebrow: "Tangible Outputs",
      title: "What you receive.",
      lead: "Concrete deliverables backed by documentation and complete client ownership.",
    },
    deliverables: [
      { title: "Production Deliverables", desc: "Fully tested and deployed solution assets ready for live operations.", tag: "Production Asset" },
      { title: "Technical Documentation", desc: "Standard operating procedures, system runbooks, and administration guides.", tag: "Documentation" },
      { title: "Service Level Agreement", desc: "Clear contractual support response times and resolution benchmarks.", tag: "Support SLA" },
      { title: "Performance Reporting", desc: "Transparent analytics tracking throughput, uptime, and quality metrics.", tag: "Reporting" },
    ],
    faqHead: {
      eyebrow: "FAQ",
      title: `Common questions about ${item.title}.`,
      lead: "Key details on onboarding, timelines, and operational integration.",
    },
    faqs: [
      { q: `How does KICCPA initiate a project for ${item.title}?`, a: "We begin with a discovery consultation to evaluate your workflows and provide a formal statement of work before project kick-off." },
      { q: "What is the typical delivery timeline?", a: "Standard deployments range from 2 to 6 weeks depending on the agreed scope and system integrations." },
      { q: "Do you offer ongoing support after delivery?", a: "Yes. Every delivery includes an initial warranty period followed by optional SLA-backed managed service agreements." },
    ],
  };

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
                {division.clientLabel} <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.hpBtnGhost} href={division.href}>
                Explore {division.title}
              </Link>
            </div>
          </div>
          <figure className={styles.svHeroMedia}>
            <img src={data.image} alt={data.alt} />
          </figure>
        </div>
      </section>

      {/* 2. Block 1: Challenges We Help Solve (3 Cards) */}
      <section className={styles.svSection} id="challenges">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{data.challengesHead.eyebrow}</p>
            <h2>{data.challengesHead.title}</h2>
            <p className={styles.divSectionLead}>{data.challengesHead.lead}</p>
          </div>
          <div className={styles.divChallengesGrid}>
            {data.challenges.map((c) => (
              <article key={c.n} className={styles.divChallengeCard}>
                <span className={styles.divChallengeNum}>{c.n}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Block 2: What We Do (Bullets) */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="what-we-do">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{data.whatWeDoHead.eyebrow}</p>
            <h2>{data.whatWeDoHead.title}</h2>
            <p className={styles.divSectionLead}>{data.whatWeDoHead.lead}</p>
          </div>
          <div className={styles.svcWhatWeDoGrid}>
            {data.whatWeDo.map((item) => (
              <article key={item.title} className={styles.svcWhatWeDoCard}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <ul className={styles.svcWhatWeDoBullets}>
                  {item.bullets.map((b, i) => (
                    <li key={i}>
                      <svg className={styles.divCheckIcon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Block 3: What You Receive (Deliverables List) */}
      <section className={styles.svSection} id="deliverables">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{data.deliverablesHead.eyebrow}</p>
            <h2>{data.deliverablesHead.title}</h2>
            <p className={styles.divSectionLead}>{data.deliverablesHead.lead}</p>
          </div>
          <div className={styles.divDeliverablesGrid}>
            {data.deliverables.map((deliv) => (
              <div key={deliv.title} className={styles.divDeliverableCard}>
                <span className={styles.divDelivTag}>{deliv.tag}</span>
                <h3>{deliv.title}</h3>
                <p>{deliv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 5-Stage Delivery Process */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="delivery-process">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>Delivery Methodology</p>
            <h2>A proven 5-stage delivery process.</h2>
            <p className={styles.divSectionLead}>
              Every engagement follows our structured delivery model to ensure complete clarity and dependable execution.
            </p>
          </div>
          <ol className={styles.hpSteps}>
            {homeSteps.map((step) => (
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

      {/* 6. Block 4: Frequently Asked Questions (FAQ) */}
      <section className={styles.svSection} id="faq">
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

      {/* 7. Closing CTA Banner */}
      <section className={styles.svClose}>
        <div className={styles.svCloseMedia} aria-hidden="true">
          <img src={data.image} alt="" />
        </div>
        <div className={styles.wrap}>
          <div className={styles.svCloseInner}>
            <div>
              <h2>Ready to Discuss Your {item.title} Needs?</h2>
              <p>
                Tell us what you need. Our team will review your specifications and schedule a direct consultation.
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
                {division.clientLabel} <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.hpBtnGhost} href={division.href}>
                View All {division.title} Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
