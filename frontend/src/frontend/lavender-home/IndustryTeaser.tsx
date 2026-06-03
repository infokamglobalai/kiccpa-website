"use client";

import { MotionReveal, StaggerTitle } from "@/components/ui";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Activity, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { industrySectors } from "./homeContent";
import styles from "./IndustryTeaser.module.css";

const sectorIcons = {
  activity: Activity,
  truck: Truck,
  shield: ShieldCheck,
} as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

export default function IndustryTeaser() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Solutions by sector">
      <div className={styles.bgMesh} aria-hidden />
      <div className={styles.bgGlow} aria-hidden />

      <div className={styles.wrap}>
        <header className={styles.header}>
          <MotionReveal variant="soft" y={12}>
            <p className={styles.eyebrow}>Solutions by sector</p>
          </MotionReveal>

          <StaggerTitle
            as="h2"
            className={styles.title}
            text="Intelligence Built for Every Industry"
            highlightFromWord={3}
            highlightClassName={styles.titleAccent}
          />

          <MotionReveal variant="soft" y={14} delay={0.1}>
            <p className={styles.subtitle}>
              Sector-specific LMS, ERP, and AI platforms—configured for compliance, language, and
              scale across the GCC and India.
            </p>
          </MotionReveal>
        </header>

        <motion.ul
          className={styles.grid}
          variants={reduce ? undefined : gridVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-72px 0px -48px 0px" }}
        >
          {industrySectors.map((sector) => {
            const Icon = sectorIcons[sector.icon];
            return (
              <motion.li
                key={sector.slug}
                className={`${styles.card} ${styles[`card_${sector.accent}`]}`}
                variants={reduce ? undefined : cardVariants}
              >
                <div className={styles.cardAccent} aria-hidden />
                <div className={styles.cardBody}>
                  <span className={styles.iconWrap} aria-hidden>
                    <Icon size={22} strokeWidth={2.25} />
                  </span>
                  <h3 className={styles.cardTitle}>{sector.title}</h3>
                  <p className={styles.cardDesc}>{sector.desc}</p>
                  <Link href={`/industries/${sector.slug}`} className={styles.cardLink}>
                    Explore {sector.title}
                    <ArrowRight size={16} aria-hidden />
                  </Link>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>

        <MotionReveal variant="soft" y={16} delay={0.12}>
          <div className={styles.footerNote}>
            <p>Need a vertical we have not listed?</p>
            <Link href="/contact" className={styles.footerLink}>
              Talk to our solutions team
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
