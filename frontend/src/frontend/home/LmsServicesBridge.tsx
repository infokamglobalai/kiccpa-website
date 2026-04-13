import Link from "next/link";
import styles from "./LmsServicesBridge.module.css";

export default function LmsServicesBridge() {
  return (
    <section className={`${styles.section} rv`} aria-label="Additional services">
      <div className={styles.inner}>
        <p className={styles.text}>
          Need academic content production, AI video, faculty recordings, data migration, or
          full package details? Explore our broader services and LMS catalog.
        </p>
        <nav className={styles.links}>
          <Link href="/services" className={styles.link}>
            Services & delivery
          </Link>
          <Link href="/products" className={styles.link}>
            LMS packages & catalog
          </Link>
          <Link href="/contact" className={styles.link}>
            Talk to our team
          </Link>
        </nav>
      </div>
    </section>
  );
}
