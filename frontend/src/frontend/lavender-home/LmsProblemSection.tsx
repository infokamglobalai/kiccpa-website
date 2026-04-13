"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { homeImages } from "./homeContent";
import styles from "./LmsProblemSection.module.css";

const MARQUEE = [
  "Static courses",
  "No early warnings",
  "Reactive teaching",
  "Stale board data",
  "Intelligence gap",
  "Not an LMS problem",
  "An intelligence problem",
] as const;

const traditional = [
  "Same course content for every student, regardless of ability",
  "Student failure discovered at assessment time — too late to act",
  "Parents receive progress updates once a term, if at all",
  "Teachers spend 4–6 hours per week on manual admin tasks",
  "No data on which curriculum topics have systemic gaps",
  "Board reporting requires weeks of manual data compilation",
  "No Arabic-native interface for Gulf-region institutions",
] as const;

const kiccpa = [
  "Unique AI-generated learning path for every individual student",
  "At-risk students flagged 4–6 weeks before failure — enabling intervention",
  "Parents receive a daily learning summary on their phone",
  "AI auto-grading and feedback saves 70% of teacher admin time",
  "Live topic-level mastery map per class — curriculum decisions in real time",
  "One-click board reports — generated in 4 seconds",
  "Full RTL Arabic interface with Arabic-language NLP engine",
] as const;

const easeCurve = [0.2, 0.8, 0.2, 1] as const;

const itemBadVariants = {
  hidden: { opacity: 0, x: -14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: easeCurve },
  },
};

const itemGoodVariants = {
  hidden: { opacity: 0, x: 14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: easeCurve },
  },
};

const listContainerBad = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.08 },
  },
};

const listContainerGood = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.12 },
  },
};

export default function LmsProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "6%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.04, 1, 1.02]);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="lms-problem-heading">
      <div className={styles.inner}>
        <div className={styles.marqueeWrap} aria-hidden>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              {[...MARQUEE, ...MARQUEE].map((t, i) => (
                <span key={`${t}-${i}`} className={styles.marqueeItem}>
                  <span>◇</span>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.topGrid}>
          <motion.div
            className={styles.copyBlock}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className={styles.kicker}>Intelligence, not just content</p>
            <h2 id="lms-problem-heading" className={styles.title}>
              The problem with <span className={styles.titleEm}>traditional LMS</span>
            </h2>
            <p className={styles.lead}>
              Your current LMS delivers content.{" "}
              <span className={styles.leadStrong}>It doesn&apos;t deliver outcomes.</span>
            </p>
            <p className={styles.lead}>
              Static courses. No early warnings. Reactive teachers. Parents in the dark. Boards
              reading data that&apos;s three months old.
            </p>
            <p className={styles.tagline}>
              That is not an LMS problem — it is an intelligence problem.
            </p>
          </motion.div>

          <motion.div
            className={styles.visualBundle}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className={styles.visualFrame}>
              <span className={styles.visualChip}>Analytics &amp; signals</span>
              <motion.div className={styles.visualInner} style={{ y: imgY, scale: imgScale }}>
                <Image
                  src={homeImages.problemInsight}
                  alt={homeImages.problemInsightAlt}
                  fill
                  sizes="(max-width: 960px) 100vw, 45vw"
                  className={styles.cover}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className={styles.compareWrap}>
          <span className={styles.vsBadge} aria-hidden>
            VS
          </span>
          <div className={styles.compareGrid}>
            <motion.div
              className={`${styles.col} ${styles.colBad}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <div className={`${styles.colHead} ${styles.colHeadBad}`}>✗ Traditional LMS</div>
              <div className={`${styles.colTitle} ${styles.colTitleBad}`}>Limitations</div>
              <motion.ul
                className={styles.list}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-30px" }}
                variants={listContainerBad}
              >
                {traditional.map((line) => (
                  <motion.li key={line} className={styles.itemBad} variants={itemBadVariants}>
                    {line}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div
              className={`${styles.col} ${styles.colGood}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.06 }}
            >
              <div className={`${styles.colHead} ${styles.colHeadGood}`}>✓ KICCPA LMS</div>
              <div className={`${styles.colTitle} ${styles.colTitleGood}`}>Outcomes</div>
              <motion.ul
                className={styles.list}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-30px" }}
                variants={listContainerGood}
              >
                {kiccpa.map((line) => (
                  <motion.li key={line} className={styles.itemGood} variants={itemGoodVariants}>
                    {line}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
