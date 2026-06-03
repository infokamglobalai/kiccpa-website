"use client";

import type { ReactNode } from "react";
import styles from "./SubPageHero.module.css";

export type SubPageHeroVariant = "about" | "products" | "services" | "contact" | "solution";

type SubPageHeroProps = {
  variant: SubPageHeroVariant;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  /** When title is a string, words from this index get homepage-style gradient accent */
  titleAccentFromWord?: number;
};

function renderAccentTitle(title: string, accentFromWord: number) {
  const words = title.trim().split(/\s+/);
  if (words.length <= accentFromWord) return title;
  const lead = words.slice(0, accentFromWord).join(" ");
  const accent = words.slice(accentFromWord).join(" ");
  return (
    <>
      {lead} <em>{accent}</em>
    </>
  );
}

export default function SubPageHero({
  variant,
  eyebrow,
  title,
  children,
  titleAccentFromWord = 2,
}: SubPageHeroProps) {
  const titleNode =
    typeof title === "string" && variant === "solution"
      ? renderAccentTitle(title, titleAccentFromWord)
      : title;
  return (
    <section className={`${styles.wrap} ${styles[variant]} rv vis`}>
      <div className={`${styles.layer} ${styles.mesh}`} aria-hidden />
      <div className={`${styles.layer} ${styles.fadeBottom}`} aria-hidden />

      {variant === "about" && (
        <>
          <div className={`${styles.decor} ${styles.orbA}`} aria-hidden />
          <div className={`${styles.decor} ${styles.orbB}`} aria-hidden />
          <div className={styles.horizon} aria-hidden />
          <div className={styles.blocks} aria-hidden />
        </>
      )}

      {variant === "products" && (
        <>
          <div className={`${styles.decor} ${styles.orbA}`} aria-hidden />
          <div className={styles.tierRack} aria-hidden>
            <div className={styles.tierCol} />
            <div className={styles.tierCol} />
            <div className={styles.tierCol} />
          </div>
        </>
      )}

      {variant === "services" && (
        <>
          <div className={styles.slash} aria-hidden />
          <div className={`${styles.decor} ${styles.orbA}`} aria-hidden />
          <div className={`${styles.decor} ${styles.orbB}`} aria-hidden />
        </>
      )}

      {variant === "contact" && (
        <>
          <div className={`${styles.decor} ${styles.contactOrbA}`} aria-hidden />
          <div className={`${styles.decor} ${styles.contactOrbB}`} aria-hidden />
        </>
      )}

      {variant === "solution" && (
        <>
          <div className={`${styles.decor} ${styles.solutionOrbA}`} aria-hidden />
          <div className={`${styles.decor} ${styles.solutionOrbB}`} aria-hidden />
        </>
      )}

      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{titleNode}</h2>
        <p className={styles.lead}>{children}</p>
      </div>
    </section>
  );
}
