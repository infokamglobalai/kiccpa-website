import Link from "next/link";
import CountryMarquee from "./CountryMarquee";
import { clientPath, divisions, homePage, homeProducts, homeSteps, seekerPath, whyKiccpa } from "./home-content";
import Reveal from "./Reveal";
import styles from "./kam.module.css";

function Icon({ name }: { name: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "technology") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="7" width="20" height="14" rx="2" {...common} /><path d="M12 25h8M16 21v4" {...common} /></svg>;
  }
  if (name === "operations") {
    return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 22V12h6v10M14 22V8h6v14M20 22v-6h6v6" {...common} /></svg>;
  }
  return <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="12" cy="12" r="3" {...common} /><circle cx="21" cy="13" r="2.4" {...common} /><path d="M6 23c1.2-3 3.2-4.4 6-4.4s4.8 1.4 6 4.4M18 23c.6-2 2-3.2 4-3.2 1.6 0 2.8.8 3.6 2.2" {...common} /></svg>;
}

export default function HomePage() {
  const page = homePage;

  return (
    <main className={styles.hp}>
      <section className={styles.hpHero} aria-label={page.hero.aria}>
        <div className={styles.hpHeroGrid}>
          <div className={styles.hpHeroCopy}>
            <p className={styles.hpEyebrow}>{page.hero.eyebrow}</p>
            <h1>{page.hero.title}</h1>
            <p className={styles.hpSupport}>{page.hero.support}</p>
            <p className={styles.hpLede}>{page.hero.lede}</p>
            <div className={styles.rowBtns}>
              <a className={styles.hpBtn} href={page.hero.primary.href}>{page.hero.primary.label} <span className={styles.arrow}>→</span></a>
              <Link className={styles.hpBtnGhost} href={page.hero.secondary.href}>{page.hero.secondary.label}</Link>
            </div>
          </div>
          <figure className={styles.hpHeroMedia}>
            <img src={page.hero.image} alt={page.hero.alt} width={1280} height={720} fetchPriority="high" decoding="async" />
          </figure>
        </div>
      </section>

      <CountryMarquee />

      <section className={styles.hpSection} id="services">
        <div className={styles.wrap}>
          <Reveal parts>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.services.eyebrow}</p>
              <h2>{page.services.title}</h2>
            </div>
          </Reveal>
          {/* "Three Services. One Partner." drawn: one trunk splits into the
              three division columns. Static and still meaningful without JS. */}
          <Reveal className={styles.hpConvergeWrap}>
            <svg
              className={styles.hpConverge}
              viewBox="0 0 1200 96"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path pathLength={1} style={{ "--i": 0 } as React.CSSProperties} d="M600 0 V36" />
              <path pathLength={1} style={{ "--i": 1 } as React.CSSProperties} d="M600 36 C600 70, 200 62, 200 96" />
              <path pathLength={1} style={{ "--i": 2 } as React.CSSProperties} d="M600 36 V96" />
              <path pathLength={1} style={{ "--i": 3 } as React.CSSProperties} d="M600 36 C600 70, 1000 62, 1000 96" />
              <circle className={styles.hpConvergeDot} cx="600" cy="36" r="3" />
            </svg>
          </Reveal>
          <div className={styles.hpServices}>
            {divisions.map((division, index) => (
              <Reveal key={division.id} index={index} className={styles.hpStretch}>
                <article className={styles.hpService}>
                  <div className={styles.hpServiceMedia}>
                    <img src={division.image} alt={division.alt} width={1280} height={720} loading="lazy" decoding="async" />
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className={styles.hpServiceBody}>
                    <h3>{division.title}</h3>
                    <p className={styles.hpLine}>{division.line}</p>
                    <p>{division.intro}</p>
                    <p className={styles.hpItemsLabel}>{division.itemsLabel}</p>
                    <ul>
                      {division.items.map((item) => (
                        <li key={item.href + item.title}><Link href={item.href}><span>{item.title}</span> <span className={styles.arrow}>→</span></Link></li>
                      ))}
                    </ul>
                    <div className={styles.hpServiceFoot}>
                      <Link className={styles.hpBtn} href={division.href}>{division.cta} <span className={styles.arrow}>→</span></Link>
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

      <section className={`${styles.hpSection} ${styles.hpLight}`}>
        <div className={styles.wrap}>
          <Reveal parts>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.why.eyebrow}</p>
              <h2>{page.why.title}</h2>
            </div>
          </Reveal>
          <div className={styles.hpWhy}>
            {whyKiccpa.map((item, index) => (
              <Reveal key={item.title} index={index} className={styles.hpStretch}>
                <article>
                  <em>{String(index + 1).padStart(2, "0")}</em>
                  <span><Icon name={item.icon} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.hpSection}>
        <div className={styles.wrap}>
          <Reveal parts>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.steps.eyebrow}</p>
              <h2>{page.steps.title}</h2>
            </div>
          </Reveal>
          <ol className={styles.hpSteps}>
            {homeSteps.map((step) => (
              <li key={step.n}>
                <span>{step.n}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.hpSection} ${styles.hpLight}`} id="platforms">
        <div className={styles.wrap}>
          <Reveal parts>
            <div className={styles.hpHead}>
              <p className={styles.hpEyebrow}>{page.platforms.eyebrow}</p>
              <h2>{page.platforms.title}</h2>
            </div>
          </Reveal>
          <div className={styles.hpProducts}>
            {homeProducts.map((product) => (
              <a key={product.name} href={product.href} {...(product.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                <img src={product.image} alt={product.alt} width={1000} height={667} loading="lazy" decoding="async" />
                <span className={styles.hpProductBody}>
                  <strong>{product.name}</strong>
                  <p>{product.text}</p>
                  <span>{product.cta} <span className={styles.arrow}>→</span></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.hpClose}>
        <div className={styles.hpCloseMedia} aria-hidden="true">
          <img src={page.hero.image} alt="" loading="lazy" decoding="async" />
        </div>
        <div className={styles.wrap}>
          <div className={styles.hpCloseInner}>
            <div>
              <h2>{page.close.title}</h2>
              <p>{page.close.text}</p>
            </div>
            <div className={styles.rowBtns}>
              <Link className={styles.hpBtn} href={page.close.primary.href}>{page.close.primary.label} <span className={styles.arrow}>→</span></Link>
              <a className={styles.hpBtnGhost} href={page.close.secondary.href}>{page.close.secondary.label}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
