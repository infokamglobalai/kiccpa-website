"use client";

import { MotionReveal, StaggerTitle } from "@/components/ui";
import { FlagIndia, FlagKuwait } from "@/components/flags/FlagIcons";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { regionalDepthContent } from "./homeContent";
import styles from "./RegionalDepthSection.module.css";

const flagByMarket = {
  india: FlagIndia,
  kuwait: FlagKuwait,
} as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

export default function RegionalDepthSection() {
  const reduce = useReducedMotion();
  const { eyebrow, title, lead, stats, markets } = regionalDepthContent;

  return (
    <section className={styles.section} aria-labelledby="regional-depth-title">
      <div className={styles.bgMesh} aria-hidden />
      <div className={styles.bgGlow} aria-hidden />

      <div className={styles.wrap}>
        <header className={styles.header}>
          <MotionReveal variant="soft" y={12}>
            <p className={styles.eyebrow}>{eyebrow}</p>
          </MotionReveal>
          <StaggerTitle
            as="h2"
            id="regional-depth-title"
            className={styles.title}
            text={title}
            highlightFromWord={3}
            highlightClassName={styles.titleAccent}
          />
          <MotionReveal variant="soft" y={14} delay={0.08}>
            <p className={styles.lead}>{lead}</p>
          </MotionReveal>
        </header>

        <ul className={styles.statsRow} aria-label="Regional coverage highlights">
          {stats.map((s) => (
            <li key={s.label}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </li>
          ))}
        </ul>

        <motion.div
          className={styles.grid}
          variants={reduce ? undefined : gridVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-64px 0px -48px 0px" }}
        >
          {markets.map((market) => {
            const Flag = flagByMarket[market.id as keyof typeof flagByMarket];
            return (
              <motion.article
                key={market.id}
                className={`${styles.card} ${styles[`card_${market.id}`]}`}
                variants={reduce ? undefined : cardVariants}
              >
                <div className={styles.cardBanner}>
                  <span className={styles.flagWrap} aria-hidden>
                    <Flag />
                  </span>
                  <div className={styles.cardHead}>
                    <h3 className={styles.cardName}>{market.name}</h3>
                    <ul className={styles.metaPills}>
                      {market.meta.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ul className={styles.featureGrid}>
                  {market.features.map((feature) => (
                    <li key={feature}>
                      <Check size={14} strokeWidth={2.5} aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={market.href} className={styles.cardCta}>
                  {market.cta}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
