"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Tilt3D } from "@/components/ui";
import { homeImages } from "./homeContent";
import styles from "./PlatformCapabilitiesSection.module.css";

const pillars = [
  {
    emoji: "🧠",
    tech: "Artificial Intelligence",
    title: "Adaptive Learning Paths",
    tint: styles.t1,
    desc: "Every student receives a unique, dynamically adjusted learning journey. The ML engine continuously monitors comprehension and adapts content difficulty — challenge without discouragement.",
    bullets: [
      "Individual learning profile built from day one",
      "Content difficulty self-adjusts in real time",
      "Learning style detection: visual, auditory, kinesthetic",
      "Spaced repetition for long-term mastery",
    ],
  },
  {
    emoji: "⚡",
    tech: "Machine Learning",
    title: "Predictive Student Analytics",
    tint: styles.t2,
    desc: "Monitor 40+ behavioral and academic indicators per student. Identify at-risk students 4–6 weeks before academic failure occurs — when intervention can still make a difference.",
    bullets: [
      "AI risk score updated daily per student",
      "Automated alerts to teachers and parents",
      "Topic-level mastery map per class",
      "Curriculum gap identification from assessment data",
    ],
  },
  {
    emoji: "💬",
    tech: "Natural Language Processing",
    title: "AI-Powered Feedback Engine",
    tint: styles.t3,
    desc: "Students receive instant, structured written feedback on assessments — in English or Arabic — within 30 seconds of submission. No waiting. No marking queue.",
    bullets: [
      "Rubric-based feedback with teacher approval flow",
      "Arabic NLP: full RTL feedback in Arabic script",
      "Question-level analytics after every class assessment",
      "AI Curriculum Insight after each assessment",
    ],
  },
  {
    emoji: "📊",
    tech: "Data Science",
    title: "Parent Engagement Portal",
    tint: styles.t4,
    desc: "84% parent adoption within 6 months. Parents receive daily learning summaries, real-time assessment results, and early alerts — in English or Arabic, on any device.",
    bullets: [
      "Daily learning summary sent every evening",
      "Real-time assessment result notifications",
      "Direct teacher messaging in English or Arabic",
      "Monthly progress reports, auto-generated",
    ],
  },
] as const;

const wordReveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const subReveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function PlatformHeadline({ id }: { id: string }) {
  const reduce = useReducedMotion();
  const line1 = ["Four", "technologies."];
  const line2 = ["One", "platform."];

  if (reduce) {
    return (
      <h2 id={id} className={styles.heroTitle}>
        <span className={styles.heroLineMuted}>
          {line1.join(" ")} <br />
        </span>
        <span className={styles.heroLineHot}>{line2.join(" ")}</span>
      </h2>
    );
  }

  return (
    <motion.h2
      id={id}
      className={styles.heroTitle}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={headlineContainer}
    >
      <span className={styles.heroLine}>
        {line1.map((w, i) => (
          <motion.span key={w} variants={wordReveal} className={styles.heroWordMuted}>
            {w}
            {i < line1.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </span>
      <span className={styles.heroLine}>
        {line2.map((w, i) => (
          <motion.span key={w} variants={wordReveal} className={styles.heroWordHot}>
            {w}
            {i < line2.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </span>
    </motion.h2>
  );
}

export default function PlatformCapabilitiesSection() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="platform-stack-heading">
      <div className={styles.mesh} aria-hidden />
      <div className={styles.glowOrb} aria-hidden />
      <div className={styles.inner}>
        <header className={styles.header}>
          <motion.p
            className={styles.kicker}
            initial={reduce ? false : { opacity: 0, letterSpacing: "0.35em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.16em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            Platform capabilities
          </motion.p>

          <PlatformHeadline id="platform-stack-heading" />

          <motion.div
            className={styles.subBlock}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
            }}
          >
            <motion.p className={styles.sub} variants={subReveal}>
              Not AI as a marketing claim —{" "}
              <span className={styles.subGlow}>AI as the engine</span> of every decision the
              platform makes.
            </motion.p>
            <motion.p className={styles.outcome} variants={subReveal}>
              <span className={styles.outcomeInner}>
                <span className={styles.outcomeShine} aria-hidden />
                One outcome: <strong>every student succeeds.</strong>
              </span>
            </motion.p>
          </motion.div>
        </header>

        <div className={styles.bento}>
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              className={styles.card}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className={styles.cardGlow} aria-hidden />
              <Tilt3D intensity={11} className={styles.tiltWrap}>
                <div className={styles.imgStage}>
                  <div className={styles.imgRim} aria-hidden />
                  <div className={styles.imgInner}>
                    <Image
                      src={homeImages.pillars[i].src}
                      alt={homeImages.pillars[i].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.cover}
                    />
                  </div>
                  <div className={styles.imgShine} aria-hidden />
                  <span className={styles.imgIndex}>{String(i + 1).padStart(2, "0")}</span>
                </div>
              </Tilt3D>

              <div className={styles.cardBody}>
                <div className={styles.cardHead}>
                  <div className={`${styles.icon} ${p.tint}`} aria-hidden>
                    {p.emoji}
                  </div>
                  <div>
                    <p className={styles.label}>{p.tech}</p>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                  </div>
                </div>
                <p className={styles.desc}>{p.desc}</p>
                <ul className={styles.bullets}>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link href="/features" className={styles.link}>
                  Learn more →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className={styles.footer}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <Link href="/features" className={styles.viewAll}>
            View all platform features →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
