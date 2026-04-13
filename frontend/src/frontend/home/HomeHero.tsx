"use client";

import {
  AmbientBackdrop,
  FloatGeometry,
  Tilt3D,
} from "@/components/ui";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomeHero.module.css";

type HomeHeroProps = {
  onShowVideo?: () => void;
};

const getStagger = (reduce: boolean) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduce ? 0 : 0.09,
      delayChildren: reduce ? 0 : 0.06,
    },
  },
});

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

export default function HomeHero({ onShowVideo }: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const reduce = Boolean(reduceMotion);

  return (
    <section className={styles.hero} aria-label="KICCPA LMS hero">
      <AmbientBackdrop variant="navy" />
      <FloatGeometry />

      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          variants={getStagger(reduce)}
        >
          <motion.div variants={item}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden />
              <span>AI · MACHINE LEARNING · DATA SCIENCE · NLP</span>
            </div>
          </motion.div>

          <motion.h1 className={styles.h1} variants={item}>
            The LMS that knows every student.
            <span className={styles.h1Gold}>Before they fall behind.</span>
          </motion.h1>

          <motion.p className={styles.sub} variants={item}>
            Personalised learning paths. Predictive risk alerts. Daily parent
            visibility. Real-time institutional intelligence. Built for schools in
            India and Kuwait.
          </motion.p>

          <motion.div className={styles.ctaRow} variants={item}>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <Link href="/demo" className={styles.btnPrimary}>
                Request a Free Demo
              </Link>
            </motion.div>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => onShowVideo?.()}
              >
                See How It Works →
              </button>
            </motion.div>
          </motion.div>

          <motion.ul className={styles.trust} variants={item}>
            <li>✓ No commitment required</li>
            <li>✓ English & Arabic</li>
            <li>✓ Data stays in your region</li>
            <li className={styles.trustFull}>✓ DPDPA compliant</li>
          </motion.ul>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={reduce ? undefined : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.85,
            delay: reduce ? 0 : 0.15,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        >
          <Tilt3D className={styles.tiltScope} intensity={9}>
            <div className={styles.mockWrap}>
              <div className={styles.mockGlow} aria-hidden />
              <Image
                src="/images/home-hero-lms.png"
                alt="Teacher dashboard — Al Noor International Academy: live metrics, mastery map, and student progress"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.heroImg}
              />
            </div>
          </Tilt3D>
        </motion.div>
      </div>
    </section>
  );
}
