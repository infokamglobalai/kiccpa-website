"use client";

import type { ReactNode } from "react";
import styles from "./SubPageHero.module.css";

export type SubPageHeroVariant = "about" | "products" | "services" | "contact";

type SubPageHeroProps = {
  variant: SubPageHeroVariant;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
};

export default function SubPageHero({ variant, eyebrow, title, children }: SubPageHeroProps) {
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
          <div className={`${styles.blob} ${styles.blob1}`} aria-hidden />
          <div className={`${styles.blob} ${styles.blob2}`} aria-hidden />
          <div className={styles.ring} aria-hidden />
        </>
      )}

      <div className={styles.inner}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.lead}>{children}</p>
      </div>
    </section>
  );
}
