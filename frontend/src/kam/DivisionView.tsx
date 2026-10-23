"use client";

import { useState } from "react";
import Link from "next/link";
import { Division, clientPath, homeSteps, seekerPath } from "./home-content";
import { divisionData } from "./division-content";
import styles from "./kam.module.css";

export default function DivisionView({ division, slug }: { division: Division; slug: string }) {
  const content = divisionData[division.id];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!content) return null;

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <main className={styles.sv}>
      {/* 1. Division Hero */}
      <section className={styles.svHero}>
        <div className={styles.svHeroGrid}>
          <div className={styles.svHeroCopy}>
            <nav className={styles.svCrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              <span aria-current="page">{content.divisionTitle}</span>
            </nav>
            <p className={styles.svEyebrow}>{content.eyebrow}</p>
            <h1>{content.heroHeadline}</h1>
            <p>{content.heroSubtitle}</p>
            <div className={styles.rowBtns}>
              <Link className={styles.hpBtn} href={clientPath(division)}>
                {division.clientLabel} <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.hpBtnGhost} href={seekerPath(division)}>
                {division.seekerLabel}
              </Link>
            </div>
          </div>
          <figure className={styles.svHeroMedia}>
            <img src={division.image} alt={division.alt} />
          </figure>
        </div>
      </section>

      {/* 2. Challenges We Help With — 3 Cards */}
      <section className={styles.svSection} id="challenges">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{content.challengesHead.eyebrow}</p>
            <h2>{content.challengesHead.title}</h2>
            <p className={styles.divSectionLead}>{content.challengesHead.lead}</p>
          </div>
          <div className={styles.divChallengesGrid}>
            {content.challenges.map((c) => (
              <article key={c.n} className={styles.divChallengeCard}>
                <span className={styles.divChallengeNum}>{c.n}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Service Cards — With 3 Bullets Each */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="services-list">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{content.servicesHead.eyebrow}</p>
            <h2>{content.servicesHead.title}</h2>
            <p className={styles.divSectionLead}>{content.servicesHead.lead}</p>
          </div>
          <div className={content.services.length > 4 ? styles.divServicesGrid3 : styles.divServicesGrid}>
            {content.services.map((svc) => (
              <article key={svc.title} className={styles.divServiceCard}>
                {svc.image ? (
                  <div className={styles.divServiceMedia}>
                    <img src={svc.image} alt={svc.alt || svc.title} />
                  </div>
                ) : null}
                <div className={styles.divServiceBody}>
                  <h3>{svc.title}</h3>
                  <p className={styles.divServiceSummary}>{svc.summary}</p>
                  <ul className={styles.divServiceBullets}>
                    {svc.bullets.map((b, i) => (
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
                  <Link href={svc.href} className={styles.divServiceLink}>
                    Explore Service <span className={styles.arrow}>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. What You Receive — List of Deliverables */}
      <section className={styles.svSection} id="deliverables">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{content.deliverablesHead.eyebrow}</p>
            <h2>{content.deliverablesHead.title}</h2>
            <p className={styles.divSectionLead}>{content.deliverablesHead.lead}</p>
          </div>
          <div className={styles.divDeliverablesGrid}>
            {content.deliverables.map((deliv) => (
              <div key={deliv.title} className={styles.divDeliverableCard}>
                <span className={styles.divDelivTag}>{deliv.tag}</span>
                <h3>{deliv.title}</h3>
                <p>{deliv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Ways to Work With Us — 3 Engagement Models */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="engagement-models">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{content.waysToWorkHead.eyebrow}</p>
            <h2>{content.waysToWorkHead.title}</h2>
            <p className={styles.divSectionLead}>{content.waysToWorkHead.lead}</p>
          </div>
          <div className={styles.divWaysGrid}>
            {content.waysToWork.map((model) => (
              <article key={model.title} className={styles.divWayCard}>
                <div className={styles.divWayHeader}>
                  <h3>{model.title}</h3>
                  <span className={styles.divWayTagline}>{model.tagline}</span>
                </div>
                <div className={styles.divWaySection}>
                  <strong>Best For:</strong>
                  <p>{model.bestFor}</p>
                </div>
                <div className={styles.divWaySection}>
                  <strong>How It Works:</strong>
                  <p>{model.howItWorks}</p>
                </div>
                <ul className={styles.divWayBenefits}>
                  {model.benefits.map((b, i) => (
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
                <Link className={styles.hpBtn} href={clientPath(division, model.title)}>
                  Choose {model.title.split(" ")[0]} <span className={styles.arrow}>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How We Work — 5 Delivery Steps */}
      <section className={styles.svSection} id="delivery-process">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>Delivery Methodology</p>
            <h2>A proven 5-stage delivery process.</h2>
            <p className={styles.divSectionLead}>
              From initial discovery to continuous refinement, our phased delivery model guarantees accountability, transparency, and predictable outcomes.
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

      {/* 7. FAQ — 4 to 6 Accordion Questions */}
      <section className={`${styles.svSection} ${styles.svLight}`} id="faq">
        <div className={styles.wrap}>
          <div className={styles.divHead}>
            <p className={styles.svEyebrow}>{content.faqHead.eyebrow}</p>
            <h2>{content.faqHead.title}</h2>
            <p className={styles.divSectionLead}>{content.faqHead.lead}</p>
          </div>
          <div className={styles.divFaqList}>
            {content.faqs.map((faq, idx) => {
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

      {/* 8. Closing CTA Banner with Direct Reach */}
      <section className={styles.svClose}>
        <div className={styles.svCloseMedia} aria-hidden="true">
          <img src={division.image} alt="" />
        </div>
        <div className={styles.wrap}>
          <div className={styles.svCloseInner}>
            <div>
              <h2>Ready to Discuss Your {content.divisionTitle} Requirements?</h2>
              <p>
                Tell us what you need to build or scale. Our Kuwait and international delivery teams will review your scope and schedule a direct consultation.
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
              <Link className={styles.hpBtn} href={clientPath(division)}>
                {division.clientLabel} <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.hpBtnGhost} href="/services">
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
