"use client";

import { MotionReveal, StaggerTitle } from "@/components/ui";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { homePackageTeaser } from "./homeContent";
import styles from "./PackagePricingSection.module.css";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

export default function PackagePricingSection() {
  const reduce = useReducedMotion();
  const { title, subtitle, tiers } = homePackageTeaser;

  return (
    <section className={styles.section} aria-labelledby="package-pricing-title">
      <div className={styles.bgMesh} aria-hidden />
      <div className={styles.bgGlow} aria-hidden />

      <div className={styles.wrap}>
        <header className={styles.header}>
          <MotionReveal variant="soft" y={12}>
            <p className={styles.eyebrow}>Plans &amp; pricing</p>
          </MotionReveal>

          <StaggerTitle
            as="h2"
            id="package-pricing-title"
            className={styles.title}
            text={title}
            highlightFromWord={3}
            highlightClassName={styles.titleAccent}
          />

          <MotionReveal variant="soft" y={14} delay={0.08}>
            <p className={styles.subtitle}>{subtitle}</p>
          </MotionReveal>
        </header>

        <motion.ul
          className={styles.grid}
          variants={reduce ? undefined : gridVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-72px 0px -48px 0px" }}
        >
          {tiers.map((tier) => (
            <motion.li
              key={tier.name}
              className={`${styles.card} ${tier.featured ? styles.cardFeatured : ""}`}
              variants={reduce ? undefined : cardVariants}
            >
              {tier.featured && <span className={styles.popularBadge}>Most chosen</span>}
              <span className={styles.tag}>{tier.tag}</span>
              <h3 className={styles.cardTitle}>{tier.name}</h3>
              <p className={styles.cardBlurb}>{tier.blurb}</p>
              <ul className={styles.highlights}>
                {tier.highlights.map((item) => (
                  <li key={item}>
                    <Check size={14} strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>

        <MotionReveal variant="soft" y={16} delay={0.1}>
          <div className={styles.ctaRow}>
            <Link href="/products#packages" className={styles.ctaPrimary}>
              View packages
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link href="/demo" className={styles.ctaSecondary}>
              Get a tailored quote
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
