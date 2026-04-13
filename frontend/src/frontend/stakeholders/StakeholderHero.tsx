"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { AmbientBackdrop } from "@/components/ui";
import styles from "./StakeholderHero.module.css";

export type BackdropVariant = "navy" | "teal" | "warm";

/** Soft-landing gradient into the section below (match that section’s top surface). */
export type StakeholderHeroBlendTo = "mint" | "slate" | "ivory";

type StakeholderHeroProps = {
  eyebrow: string;
  headline: string;
  headlineEmphasis?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  backdropVariant?: BackdropVariant;
  blendTo?: StakeholderHeroBlendTo;
};

const ease = [0.2, 0.85, 0.25, 1] as const;

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease },
  },
};

export default function StakeholderHero({
  eyebrow,
  headline,
  headlineEmphasis,
  description,
  imageUrl,
  imageAlt,
  backdropVariant = "navy",
  blendTo = "ivory",
}: StakeholderHeroProps) {
  const reduce = useReducedMotion();
  const blendClass =
    blendTo === "mint"
      ? styles.blendMint
      : blendTo === "slate"
        ? styles.blendSlate
        : styles.blendIvory;

  return (
    <header className={styles.hero}>
      <div className={styles.bgImage}>
        {reduce ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className={styles.cover}
          />
        ) : (
          <motion.div
            className={styles.bgMotion}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.35, ease }}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className={styles.cover}
            />
          </motion.div>
        )}
      </div>
      <AmbientBackdrop variant={backdropVariant} />
      <div className={styles.mesh} aria-hidden />
      <div className={styles.overlay} aria-hidden />
      <div className={`${styles.bottomBlend} ${blendClass}`} aria-hidden />
      <div className={styles.inner}>
        {reduce ? (
          <div className={styles.copy}>
            <p className={styles.eyebrow}>
              <span className={styles.dot} />
              {eyebrow}
            </p>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>{headline} </span>
              {headlineEmphasis ? (
                <span className={styles.titleEmWrap}>
                  <em className={styles.gradEm}>{headlineEmphasis}</em>
                </span>
              ) : null}
            </h1>
            <p className={styles.desc}>{description}</p>
            <div className={styles.shimmerWrap}>
              <div className={styles.shimmerBar} aria-hidden />
            </div>
          </div>
        ) : (
          <motion.div
            className={styles.copy}
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              <p className={styles.eyebrow}>
                <span className={styles.dot} />
                {eyebrow}
              </p>
            </motion.div>
            <motion.div variants={item}>
              <h1 className={styles.title}>
                <span className={styles.titleLine}>{headline} </span>
                {headlineEmphasis ? (
                  <span className={styles.titleEmWrap}>
                    <em className={styles.gradEm}>{headlineEmphasis}</em>
                  </span>
                ) : null}
              </h1>
            </motion.div>
            <motion.div variants={item}>
              <p className={styles.desc}>{description}</p>
            </motion.div>
            <motion.div className={styles.shimmerWrap} variants={item}>
              <div className={styles.shimmerBar} aria-hidden />
            </motion.div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
