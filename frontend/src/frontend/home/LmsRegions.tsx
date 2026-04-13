import Link from "next/link";
import styles from "./LmsRegions.module.css";

const india = [
  "CBSE, ICSE, and State Board curriculum alignment",
  "NEP 2020 competency-based education framework",
  "WhatsApp-native parent notification integration",
  "Low-bandwidth mode for Tier 2/3 city deployment",
  "Full DPDPA 2023 compliance — data on AWS Mumbai",
  "NCERT-aligned content framework support",
];

const kuwait = [
  "Full right-to-left Arabic interface — designed RTL from the ground up",
  "Arabic NLP feedback engine — natural Arabic script output",
  "Kuwait MoE curriculum alignment",
  "Hijri calendar integration for scheduling and attendance",
  "GCC data residency — all data on AWS Bahrain",
  "Kuwait Vision 2035 educational technology alignment",
];

export default function LmsRegions() {
  return (
    <section className={`${styles.section} rv`} aria-labelledby="lms-regions-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>India & Kuwait</p>
          <h2 id="lms-regions-heading" className={styles.title}>
            Built for both markets. Optimised for each.
          </h2>
          <p className={styles.sub}>
            KICCPA LMS is not a platform adapted for the region — it was built for it. Every
            feature reflects the realities of education in India and Kuwait.
          </p>
        </header>

        <div className={styles.grid}>
          <article className={`${styles.card} ${styles.cardIndia}`}>
            <div className={styles.cardHead}>
              <span className={styles.flag} aria-hidden>
                🇮🇳
              </span>
              <h3 className={styles.cardTitle}>India</h3>
            </div>
            <p className={styles.tagline}>CBSE · ICSE · NEP 2020 · DPDPA</p>
            <ul className={styles.list}>
              {india.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Link href="/schools" className={styles.link}>
              India solutions →
            </Link>
          </article>

          <article className={`${styles.card} ${styles.cardKuwait}`}>
            <div className={styles.cardHead}>
              <span className={styles.flag} aria-hidden>
                🇰🇼
              </span>
              <h3 className={styles.cardTitle}>Kuwait</h3>
            </div>
            <p className={styles.tagline}>MoE Aligned · Arabic RTL · GCC Data</p>
            <ul className={styles.list}>
              {kuwait.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <Link href="/schools" className={styles.link}>
              Kuwait solutions →
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
