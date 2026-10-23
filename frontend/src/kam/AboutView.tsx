"use client";

import Link from "next/link";
import { aboutPage } from "./about-content";
import { homeProducts, homeSteps } from "./home-content";
import Reveal from "./Reveal";
import styles from "./kam.module.css";

function Mark({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "learning") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 13l10-6 10 6-10 6-10-6z" {...common} /><path d="M10 16v6c2.2 1.6 4.4 2.4 6 2.4s3.8-.8 6-2.4v-6" {...common} /></svg>;
  }
  if (name === "operations") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="8" width="20" height="16" rx="2" {...common} /><path d="M6 13h20M12 8v16" {...common} /></svg>;
  }
  if (name === "delivery") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="9" {...common} /><path d="M16 11v5l3 2" {...common} /></svg>;
  }
  return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="7" width="20" height="14" rx="2" {...common} /><path d="M12 25h8M16 21v4" {...common} /></svg>;
}

export default function AboutView() {
  const page = aboutPage;

  return (
    <main className={styles.ab}>
      {/* 1. Hero */}
      <section className={styles.abHero} aria-label="About KICCPA">
        <div className={styles.abHeroGrid}>
          <div className={styles.abHeroCopy}>
            <p className={styles.abEyebrow}>{page.hero.eyebrow}</p>
            <h1>{page.hero.title}</h1>
            <p>{page.hero.text}</p>
            <div className={styles.rowBtns}>
              <a className={styles.hpBtn} href={page.hero.primary.href}>
                {page.hero.primary.label} <span className={styles.arrow}>→</span>
              </a>
              <Link className={styles.hpBtnGhost} href={page.hero.secondary.href}>
                {page.hero.secondary.label}
              </Link>
            </div>
          </div>
          <figure className={styles.abHeroMedia}>
            <img src={page.hero.image} alt={page.hero.alt} />
          </figure>
        </div>
      </section>

      {/* 2. Mission & Vision — One Line Each */}
      <section className={styles.abSection} id="mission-vision">
        <div className={styles.wrap}>
          <div className={styles.abMissionVision}>
            <article className={`${styles.abMissionCard} ${styles.abMissionCardOrange}`}>
              <p className={styles.abEyebrow}>{page.missionVision.mission.title}</p>
              <h3>{page.missionVision.mission.title}</h3>
              <p>{page.missionVision.mission.statement}</p>
            </article>
            <article className={`${styles.abMissionCard} ${styles.abMissionCardNavy}`}>
              <p className={styles.abEyebrow}>{page.missionVision.vision.title}</p>
              <h3>{page.missionVision.vision.title}</h3>
              <p>{page.missionVision.vision.statement}</p>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Company at a Glance (Stats Row + KAM Relationship) */}
      <section className={`${styles.abSection} ${styles.abLight}`} id="glance">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.abHead}>
              <p className={styles.abEyebrow}>{page.glance.eyebrow}</p>
              <h2>{page.glance.title}</h2>
            </div>
          </Reveal>
          <div className={styles.abGlance}>
            <p className={styles.abKamLine}>
              <strong>Strategic Partnership:</strong> {page.glance.kamRelationship}
            </p>
            <div className={styles.hpStatsRow}>
              {page.glance.stats.map((stat) => (
                <div key={stat.label} className={styles.hpStatCard}>
                  <span className={styles.hpStatVal}>{stat.value}</span>
                  <span className={styles.hpStatLabel}>{stat.label}</span>
                  <span className={styles.hpStatNote}>{stat.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leadership Section */}
      <section className={styles.abSection} aria-labelledby="leadership">
        <div className={`${styles.wrap} ${styles.abFounder}`}>
          <Reveal className={styles.abStretch}>
            <figure className={styles.abPortrait}>
              <img src={page.leadership.image} alt={page.leadership.alt} />
              <figcaption>
                <strong>{page.leadership.name}</strong>
                <span>{page.leadership.role}</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <p className={styles.abEyebrow}>{page.leadership.eyebrow}</p>
            <h2 id="leadership">{page.leadership.title}</h2>
            {page.leadership.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className={styles.abNote}>{page.leadership.note}</p>
            <div className={styles.rowBtns}>
              {page.leadership.links.map((link, index) => (
                <Link
                  key={link.href}
                  className={index === 0 ? styles.hpBtn : styles.hpBtnLine}
                  href={link.href}
                >
                  {link.label} {index === 0 ? <span className={styles.arrow}>→</span> : null}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Who We Are (Cover all 3 divisions) */}
      <section className={`${styles.abSection} ${styles.abLight}`} id="who" aria-labelledby="who-heading">
        <div className={`${styles.wrap} ${styles.abSplit}`}>
          <Reveal>
            <p className={styles.abEyebrow}>{page.who.eyebrow}</p>
            <h2 id="who-heading">{page.who.title}</h2>
            {page.who.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
            <ul className={styles.abCaps}>
              {page.who.capabilities.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    {item.title} <span className={styles.arrow}>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <figure className={styles.abPhoto}>
              <img src={page.who.image} alt={page.who.alt} />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 6. Our Core Pillars */}
      <section className={styles.abSection} aria-labelledby="approach">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.abHead}>
              <p className={styles.abEyebrow}>{page.approach.eyebrow}</p>
              <h2 id="approach">{page.approach.title}</h2>
              <p>{page.approach.text}</p>
            </div>
          </Reveal>
          <div className={styles.abPanels}>
            {page.approach.panels.map((panel) => (
              <Reveal key={panel.title} className={styles.abStretch}>
                <Link href={panel.href} className={styles.abPanel}>
                  <span><Mark name={panel.icon} /></span>
                  <strong>{panel.title}</strong>
                  <p>{panel.text}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How We Work — 5 Delivery Steps */}
      <section className={`${styles.abSection} ${styles.abLight}`} aria-labelledby="how-we-work">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.abHead}>
              <p className={styles.abEyebrow}>{page.work.eyebrow}</p>
              <h2 id="how-we-work">{page.work.title}</h2>
              <p>{page.work.text}</p>
            </div>
          </Reveal>
          <ol className={styles.deliveryGrid}>
            {homeSteps.map((step) => (
              <li key={step.n} className={styles.deliveryCard}>
                <span className={styles.deliveryNum}>{step.n}</span>
                <strong className={styles.deliveryTitle}>{step.title}</strong>
                <span className={styles.deliverySub}>{step.sub}</span>
                <p className={styles.deliveryText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Guiding Principles */}
      <section className={styles.abSection} aria-labelledby="principles">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.abHead}>
              <p className={styles.abEyebrow}>{page.principles.eyebrow}</p>
              <h2 id="principles">{page.principles.title}</h2>
            </div>
          </Reveal>
          <div className={styles.abPrinciples}>
            {page.principles.items.map((item) => (
              <Reveal key={item.title} className={styles.abStretch}>
                <article>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Digital Products */}
      <section className={`${styles.abSection} ${styles.abLight}`} aria-labelledby="about-products">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.abHead}>
              <h2 id="about-products">{page.products.title}</h2>
              <p>{page.products.text}</p>
            </div>
          </Reveal>
          <div className={styles.abProducts}>
            {homeProducts.map((product) => (
              <a
                key={product.name}
                href={product.href}
                {...(product.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <img src={product.image} alt={product.alt} />
                <span>
                  <strong>{product.name}</strong>
                  <p>{product.text}</p>
                  <em>
                    {product.cta} <span className={styles.arrow}>→</span>
                  </em>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Closing CTA with Direct Reach */}
      <section className={styles.hpClose}>
        <div className={styles.hpCloseMedia} aria-hidden="true">
          <img src={page.close.image} alt="" />
        </div>
        <div className={styles.wrap}>
          <div className={styles.hpCloseInner}>
            <div>
              <p className={styles.hpEyebrow} style={{ color: "#ff9a56" }}>{page.close.eyebrow}</p>
              <h2 style={{ color: "#fff" }}>{page.close.title}</h2>
              <p style={{ color: "rgba(255,255,255,0.82)" }}>{page.close.text}</p>
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
              <Link className={styles.hpBtn} href={page.close.primary.href}>
                {page.close.primary.label} <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.hpBtnGhost} href={page.close.secondary.href}>
                {page.close.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
