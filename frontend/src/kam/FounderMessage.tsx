import Link from "next/link";
import styles from "./kam.module.css";

const line = "KICCPA is a long-term vision for smarter business, sustainable innovation, digital transformation, and future generations.";

export default function FounderMessage() {
  return (
    <section className={styles.founder} aria-labelledby="founder-message">
      <div className={`${styles.wrap} ${styles.founderLayout}`}>
        <figure className={styles.founderFrame}>
          <img src="/images/founder-abdul-wahab.jpg" alt="Dr. Abdul Wahab Al Atwan" />
          <figcaption>
            <strong>Dr. Abdul Wahab Al Atwan</strong>
            <span>Founder & President</span>
          </figcaption>
        </figure>
        <div>
          <p className={styles.eyebrow}>Leadership</p>
          <h2 id="founder-message" className={styles.h2}>A message from our Founder</h2>
          <p className={styles.founderLead}>
            The future of enterprise technology will no longer depend solely on legacy systems, but on connected, AI-powered, and future-ready digital ecosystems. From this vision, KICCPA was created — a complete partner for organizations across Kuwait, India, and beyond.
          </p>
          <p className={styles.founderEmphasis}>
            KICCPA is not just a technology provider. It is a long-term vision for smarter business, sustainable innovation, digital transformation, and future generations.
          </p>
          <div className={styles.rowBtns}>
            <Link className={`${styles.btn} ${styles.btnDark}`} href="/demo">Book a demo <span className={styles.arrow}>→</span></Link>
            <Link className={`${styles.btn} ${styles.btnLine}`} href="/careers">Join our team</Link>
          </div>
        </div>
      </div>
      <div className={styles.founderScroll} aria-hidden="true">
        <div className={styles.founderRun}>
          {[0, 1].map((copy) => (
            <p key={copy}>{line}<i>·</i>{line}<i>·</i></p>
          ))}
        </div>
      </div>
    </section>
  );
}
