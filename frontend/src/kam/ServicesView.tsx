import Link from "next/link";
import { clientPath, divisions, homeSteps, whyKiccpa } from "./home-content";
import styles from "./kam.module.css";

export default function ServicesView() {
  return (
    <main className={styles.sv}>
      <section className={styles.svHero}>
        <div className={styles.wrap}>
          <p className={styles.svEyebrow}>Services</p>
          <h1>Three Services. One Partner.</h1>
          <p>The right expertise to move your business forward. Choose a division, then the service that matches the requirement.</p>
        </div>
      </section>

      {divisions.map((division, index) => (
        <section key={division.id} id={division.id} className={`${styles.svSection} ${index % 2 === 1 ? styles.svLight : ""}`}>
          <div className={`${styles.wrap} ${styles.svSplit}`}>
            <figure className={styles.svPhoto}>
              <img src={division.image} alt={division.alt} />
            </figure>
            <div>
              <p className={styles.svEyebrow}>{division.itemsLabel}</p>
              <h2>{division.title}</h2>
              <p className={styles.svLine}>{division.line}</p>
              <p>{division.intro}</p>
              <ul className={styles.svList}>
                {division.items.map((item) => (
                  <li key={item.href + item.title}>
                    <Link href={item.href}>{item.title} <span className={styles.arrow}>→</span></Link>
                  </li>
                ))}
              </ul>
              <div className={styles.rowBtns}>
                <Link className={styles.hpBtn} href={division.href}>{division.cta} <span className={styles.arrow}>→</span></Link>
                <Link className={styles.hpBtnLine} href={clientPath(division)}>{division.clientLabel}</Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className={styles.svSection}>
        <div className={styles.wrap}>
          <h2>The Right Expertise. One Connected Partner.</h2>
          <div className={styles.svWhy}>
            {whyKiccpa.map((item, index) => (
              <article key={item.title}>
                <em>{String(index + 1).padStart(2, "0")}</em>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.svSection} ${styles.svLight}`}>
        <div className={styles.wrap}>
          <h2>From the requirement to a conversation.</h2>
          <ol className={styles.svSteps}>
            {homeSteps.map((step) => (
              <li key={step.n}><span>{step.n}</span><strong>{step.title}</strong><p>{step.text}</p></li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
