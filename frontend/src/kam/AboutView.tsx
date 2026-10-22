import Link from "next/link";
import { aboutPage } from "./about-content";
import { homeProducts } from "./home-content";
import { howWeWork } from "./site";
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
      <section className={styles.abHero} aria-label="About KICCPA">
        <div className={styles.abHeroGrid}>
          <div className={styles.abHeroCopy}>
            <p className={styles.abEyebrow}>{page.hero.eyebrow}</p>
            <h1>{page.hero.title}</h1>
            <p>{page.hero.text}</p>
            <div className={styles.rowBtns}>
              <a className={styles.hpBtn} href={page.hero.primary.href}>{page.hero.primary.label} <span className={styles.arrow}>→</span></a>
              <Link className={styles.hpBtnGhost} href={page.hero.secondary.href}>{page.hero.secondary.label}</Link>
            </div>
          </div>
          <figure className={styles.abHeroMedia}>
            <img src={page.hero.image} alt={page.hero.alt} />
          </figure>
        </div>
      </section>

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
            {page.leadership.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <p className={styles.abNote}>{page.leadership.note}</p>
            <div className={styles.rowBtns}>
              {page.leadership.links.map((link, index) => (
                <Link key={link.href} className={index === 0 ? styles.hpBtn : styles.hpBtnLine} href={link.href}>{link.label}</Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`${styles.abSection} ${styles.abLight}`} id="capabilities" aria-labelledby="who">
        <div className={`${styles.wrap} ${styles.abSplit}`}>
          <Reveal>
            <p className={styles.abEyebrow}>{page.who.eyebrow}</p>
            <h2 id="who">{page.who.title}</h2>
            {page.who.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ul className={styles.abCaps}>
              {page.who.capabilities.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.title} <span className={styles.arrow}>→</span></Link></li>
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

      <section className={`${styles.abSection} ${styles.abLight}`} aria-labelledby="how-we-work">
        <div className={styles.wrap}>
          <Reveal>
            <div className={styles.abHead}>
              <h2 id="how-we-work">{page.work.title}</h2>
              <p>{page.work.text}</p>
            </div>
          </Reveal>
          <ol className={styles.abSteps}>
            {howWeWork.map((step) => (
              <li key={step.n}>
                <span>{step.n}</span>
                <strong>{step.title}</strong>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

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
              <a key={product.name} href={product.href} {...(product.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                <img src={product.image} alt={product.alt} />
                <span>
                  <strong>{product.name}</strong>
                  <p>{product.text}</p>
                  <em>{product.cta} <span className={styles.arrow}>→</span></em>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.abClose}>
        <img src={page.close.image} alt={page.close.alt} />
        <div className={styles.wrap}>
          <div className={styles.abCloseInner}>
          <p className={styles.abEyebrow}>{page.close.eyebrow}</p>
          <h2>{page.close.title}</h2>
          <p>{page.close.text}</p>
          <div className={styles.rowBtns}>
            <Link className={styles.hpBtn} href={page.close.primary.href}>{page.close.primary.label} <span className={styles.arrow}>→</span></Link>
            <Link className={styles.hpBtnGhost} href={page.close.secondary.href}>{page.close.secondary.label}</Link>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
