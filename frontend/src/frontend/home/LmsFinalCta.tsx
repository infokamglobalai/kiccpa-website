import Link from "next/link";
import styles from "./LmsFinalCta.module.css";

const checks = [
  "Response within 4 business hours",
  "Available in English and Arabic",
  "Customised to your school profile",
  "No contract required for pilot",
];

export default function LmsFinalCta() {
  return (
    <section className={`${styles.section} rv`} aria-labelledby="lms-final-cta-heading">
      <div className={styles.inner}>
        <p className={styles.kicker}>Zero commitment. Zero risk.</p>
        <h2 id="lms-final-cta-heading" className={styles.title}>
          See what KICCPA LMS looks like for your school — in 20 minutes.
        </h2>
        <p className={styles.sub}>
          No contract. No sales pressure. A live platform walkthrough tailored to your
          school&apos;s size, curriculum, and region. We will show you the features that
          matter most — and leave the decision entirely to you.
        </p>
        <div className={styles.btns}>
          <Link href="/demo" className={styles.btnPrimary}>
            Request a Free Demo
          </Link>
          <Link href="/contact" className={styles.btnGhost}>
            Start a 30-Day Pilot →
          </Link>
        </div>
        <ul className={styles.checks}>
          {checks.map((c) => (
            <li key={c}>✓ {c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
