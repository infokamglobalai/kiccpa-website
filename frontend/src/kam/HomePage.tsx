"use client";

import Link from "next/link";
import { Flag } from "./CountryMarquee";
import {
  clientPath,
  divisions,
  homeIndustries,
  homePage,
  homeProducts,
  homeSteps,
  homeWhereWeWork,
  homeWhoWeAre,
  seekerPath,
  whyKiccpa,
} from "./home-content";
import Reveal from "./Reveal";
import styles from "./kam.module.css";

function Icon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (name === "technology") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="6" y="7" width="20" height="14" rx="2" {...common} />
        <path d="M12 25h8M16 21v4" {...common} />
      </svg>
    );
  }
  if (name === "operations") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M8 22V12h6v10M14 22V8h6v14M20 22v-6h6v6" {...common} />
      </svg>
    );
  }
  if (name === "delivery") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="10" {...common} />
        <ellipse cx="16" cy="16" rx="4.5" ry="10" {...common} />
        <path d="M6 16h20" {...common} />
      </svg>
    );
  }
  if (name === "process") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 16l6 6L25 10" {...common} />
        <circle cx="16" cy="16" r="11" {...common} />
      </svg>
    );
  }
  if (name === "models") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="5" y="6" width="9" height="9" rx="1.5" {...common} />
        <rect x="18" y="6" width="9" height="9" rx="1.5" {...common} />
        <rect x="5" y="19" width="9" height="9" rx="1.5" {...common} />
        <rect x="18" y="19" width="9" height="9" rx="1.5" {...common} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="12" cy="12" r="3" {...common} />
      <circle cx="21" cy="13" r="2.4" {...common} />
      <path d="M6 23c1.2-3 3.2-4.4 6-4.4s4.8 1.4 6 4.4M18 23c.6-2 2-3.2 4-3.2 1.6 0 2.8.8 3.6 2.2" {...common} />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function HomePage() {
  const page = homePage;
  const who = homeWhoWeAre;

  return (
    <main className={styles.hp}>
      {/* 1. Hero */}
      <section className={styles.hpHero} aria-label={page.hero.aria}>
        <div className={styles.hpHeroGrid}>
          <div className={styles.hpHeroCopy}>
            <p className={styles.hpEyebrow}>{page.hero.eyebrow}</p>
            <h1>{page.hero.title}</h1>
            <p className={styles.hpSupport}>{page.hero.support}</p>
            <p className={styles.hpLede}>{page.hero.lede}</p>
            <div className={styles.rowBtns}>
              <a
                className={styles.hpBtn}
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {page.hero.primary.label} <span className={styles.arrow}>→</span>
              </a>
              <Link className={styles.hpBtnGhost} href={page.hero.secondary.href}>
                {page.hero.secondary.label}
              </Link>
            </div>
          </div>
          <figure className={styles.hpHeroMedia}>
            <img src={page.hero.image} alt={page.hero.alt} />
          </figure>
        </div>
      </section>

      {/* 2. Who We Are Block under Hero */}
      <section className={`${styles.hpSection} ${styles.hpLight}`} id="who-we-are">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{who.eyebrow}</p>
              <h2>{who.title}</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className={styles.hpWho}>
              <p className={styles.hpWhoLead}>{who.description}</p>
              <div className={styles.hpStatsRow}>
                {who.stats.map((stat) => (
                  <Link
                    key={stat.label}
                    href={stat.href}
                    className={styles.hpStatCard}
                    style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
                    onClick={(e) => {
                      if (stat.href.startsWith("#")) {
                        e.preventDefault();
                        document.querySelector(stat.href)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <span className={styles.hpStatVal}>{stat.value}</span>
                    <span className={styles.hpStatLabel}>{stat.label}</span>
                    <span className={styles.hpStatNote}>{stat.note}</span>
                    <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--hp-orange)", marginTop: "auto", paddingTop: 8, display: "inline-flex", alignItems: "center", gap: 4 }}>
                      Explore <span className={styles.arrow}>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Where We Work — 6 Interactive Country Cards */}
      <section className={styles.hpSection} id="where-we-work">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.where.eyebrow}</p>
              <h2>{page.where.title}</h2>
            </div>
          </Reveal>
          <div className={styles.hpWhereGrid}>
            {homeWhereWeWork.map((place) => (
              <Reveal key={place.code} className={styles.hpStretch}>
                <Link href={place.href} className={styles.hpWhereCard}>
                  <div className={styles.hpWhereHead}>
                    <div className={styles.hpWhereCountry}>
                      <Flag code={place.code} />
                      <strong>{place.name}</strong>
                    </div>
                    <span className={styles.hpWhereRole}>{place.role}</span>
                  </div>
                  <p>{place.desc}</p>
                  <span className={styles.hpWhereLink}>
                    Inquire in {place.name} <span className={styles.arrow}>→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Three Divisions / Services */}
      <section className={`${styles.hpSection} ${styles.hpLight}`} id="services">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.services.eyebrow}</p>
              <h2>{page.services.title}</h2>
            </div>
          </Reveal>
          <div className={styles.hpServices}>
            {divisions.map((division, index) => (
              <Reveal key={division.id} className={styles.hpStretch}>
                <article className={styles.hpService}>
                  <div className={styles.hpServiceMedia}>
                    <img src={division.image} alt={division.alt} />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.hpServiceBody}>
                    <h3>{division.title}</h3>
                    <p className={styles.hpLine}>{division.line}</p>
                    <p>{division.intro}</p>
                    <p className={styles.hpItemsLabel}>{division.itemsLabel}</p>
                    <ul>
                      {division.items.map((item) => (
                        <li key={item.href + item.title}>
                          <Link href={item.href}>
                            <span>{item.title}</span> <span className={styles.arrow}>→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.hpServiceFoot}>
                      <Link className={styles.hpBtn} href={division.href}>
                        {division.cta} <span className={styles.arrow}>→</span>
                      </Link>
                      <div className={styles.hpActions}>
                        <Link href={clientPath(division)}>{division.clientLabel}</Link>
                        <Link href={seekerPath(division)}>{division.seekerLabel}</Link>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Industries We Support — 6 Cards */}
      <section className={styles.hpSection} id="industries">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.industries.eyebrow}</p>
              <h2>{page.industries.title}</h2>
            </div>
          </Reveal>
          <div className={styles.hpIndustriesGrid}>
            {homeIndustries.map((ind) => (
              <Reveal key={ind.title} className={styles.hpStretch}>
                <Link href={ind.href} className={styles.hpIndustryCard}>
                  <div className={styles.hpIndustryMedia}>
                    <img src={ind.image} alt={ind.alt} />
                  </div>
                  <div className={styles.hpIndustryBody}>
                    <h3>{ind.title}</h3>
                    <p>{ind.summary}</p>
                    <span className={styles.hpIndustryLink}>
                      Explore Sector <span className={styles.arrow}>→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why KICCPA — 6 Numbered Points */}
      <section className={`${styles.hpSection} ${styles.hpLight}`} id="why">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.why.eyebrow}</p>
              <h2>{page.why.title}</h2>
            </div>
          </Reveal>
          <div className={styles.hpWhy}>
            {whyKiccpa.map((item, index) => (
              <Reveal key={item.title} className={styles.hpStretch}>
                <article>
                  <Link
                    href={item.href}
                    style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}
                    onClick={(e) => {
                      if (item.href.startsWith("#")) {
                        e.preventDefault();
                        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <em>{String(index + 1).padStart(2, "0")}</em>
                    <span className={styles.hpWhyIcon}>
                      <Icon name={item.icon} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <span className={styles.hpWhyLink}>
                      {item.linkText} <span className={styles.arrow}>→</span>
                    </span>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. How We Work — 5 Delivery Steps from About */}
      <section className={styles.hpSection} id="how-we-work">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.steps.eyebrow}</p>
              <h2>{page.steps.title}</h2>
            </div>
          </Reveal>
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
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link className={styles.hpBtn} href="/business-enquiry">
              Start Your Project with Our 5-Stage Process <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Digital Platforms */}
      <section className={`${styles.hpSection} ${styles.hpLight}`} id="platforms">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.platforms.eyebrow}</p>
              <h2>{page.platforms.title}</h2>
            </div>
          </Reveal>
          <div className={styles.hpProducts}>
            {homeProducts.map((product) => (
              <a
                key={product.name}
                href={product.href}
                {...(product.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <img src={product.image} alt={product.alt} />
                <span className={styles.hpProductBody}>
                  <strong>{product.name}</strong>
                  <p>{product.text}</p>
                  <span>
                    {product.cta} <span className={styles.arrow}>→</span>
                  </span>
                </span>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link className={styles.hpBtnGhost} href="/products" style={{ background: "#fff", borderColor: "var(--hp-line)", color: "var(--hp-navy)" }}>
              Explore All Learning Products & Demos <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Closing CTA with Phone, WhatsApp & Email */}
      <section className={styles.hpClose}>
        <div className={styles.hpCloseMedia} aria-hidden="true">
          <img src={page.hero.image} alt="" />
        </div>
        <div className={styles.wrap}>
          <div className={styles.hpCloseInner}>
            <div>
              <h2>{page.close.title}</h2>
              <p>{page.close.text}</p>
            </div>
            <div className={styles.rowBtns}>
              <Link className={styles.hpBtn} href={page.close.primary.href}>
                {page.close.primary.label} <span className={styles.arrow}>→</span>
              </Link>
              <Link className={styles.hpBtnGhost} href={page.close.secondary.href}>
                {page.close.secondary.label}
              </Link>
              <div className={styles.hpCloseContact}>
                <span className={styles.hpCloseContactLabel}>Direct Reach</span>
                <div className={styles.hpCloseContactList}>
                  <a className={styles.hpCloseContactLink} href={`tel:${page.close.contact.phone.tel}`}>
                    <PhoneIcon />
                    <span>{page.close.contact.phone.display}</span>
                  </a>
                  <a
                    className={styles.hpCloseContactLink}
                    href={page.close.contact.whatsapp.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsAppIcon />
                    <span>{page.close.contact.whatsapp.display} (WhatsApp)</span>
                  </a>
                  <a className={styles.hpCloseContactLink} href={page.close.contact.email.href}>
                    <MailIcon />
                    <span>{page.close.contact.email.display}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
