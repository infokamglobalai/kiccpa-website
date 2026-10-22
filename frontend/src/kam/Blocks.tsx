import Link from "next/link";
import styles from "./kam.module.css";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className={styles.svHero}>
      <div className={styles.wrap}>
        <p className={styles.svEyebrow}>{eyebrow}</p>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
    </header>
  );
}

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <div className={styles.ctaBand}>
          <img src="/assets/hero/home-hero.jpg" alt="" />
          <div className={styles.inner}>
            <h2 className={styles.h2} style={{ color: "#fff" }}>{title}</h2>
            <p className={styles.lede}>{text}</p>
            <div className={styles.rowBtns}>
              <Link className={styles.btn} href={primary.href}>{primary.label} <span className={styles.arrow}>→</span></Link>
              {secondary && <Link className={styles.btnGhost} href={secondary.href}>{secondary.label}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details key={item.q} className={styles.faqItem}>
          <summary className={styles.plain} style={{ cursor: "pointer", fontWeight: 700 }}>{item.q}</summary>
          <p className={styles.a} style={{ padding: "0 18px 16px", color: "#66758a", lineHeight: 1.6 }}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
