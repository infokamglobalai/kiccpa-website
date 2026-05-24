"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MotionReveal } from "@/components/ui";
import FounderMessage from "@/components/FounderMessage/FounderMessage";
import {
  ECOSYSTEM_STATS,
  GCC_VISION,
  KUWAIT_VISION,
  LEARNX_TAGLINE,
  MISSION_COMMITMENTS,
  MISSION_INTRO,
  MISSION_OUTCOMES,
  VISION_ALIGNMENTS,
  VISION_CLOSING,
  VISION_GOALS,
  VISION_INTRO,
} from "./learnxContent";
import styles from "./LearnX.module.css";

export default function LearnXPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <div className={`${styles.container} ${styles.heroInner}`}>
          <MotionReveal variant="soft" y={20}>
            <span className={styles.eyebrow}>LearnX Ecosystem</span>
            <h1 className={styles.heroTitle}>
              Vision for <em>Smarter Education</em>
            </h1>
            <p className={styles.heroLead}>{LEARNX_TAGLINE}</p>
            <div className={styles.heroTags}>
              {VISION_ALIGNMENTS.map((tag) => (
                <span key={tag} className={styles.heroTag}>
                  {tag}
                </span>
              ))}
            </div>
          </MotionReveal>
        </div>
      </header>

      <section className={styles.stats} aria-label="Ecosystem at a glance">
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {ECOSYSTEM_STATS.map((s, i) => (
              <MotionReveal key={s.label} variant="soft" y={16} delay={i * 0.05}>
                <div className={styles.statCard}>
                  <div className={styles.statVal}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} rv`} id="vision" aria-labelledby="vision-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={20}>
            <div className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Our vision</p>
              <h2 className={styles.sectionTitle} id="vision-heading">
                Leading AI-powered <em>education</em> in the GCC
              </h2>
              <p className={styles.sectionLead}>{VISION_INTRO}</p>
            </div>
          </MotionReveal>
          <ul className={styles.goalGrid}>
            {VISION_GOALS.map((goal) => (
              <li key={goal} className={`${styles.goalItem} rv`}>
                <span className={styles.goalIcon} aria-hidden>
                  ✓
                </span>
                {goal}
              </li>
            ))}
          </ul>
          <p className={styles.highlightBand}>{VISION_CLOSING}</p>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionAlt} rv`}
        id="mission"
        aria-labelledby="mission-heading"
      >
        <div className={styles.container}>
          <MotionReveal variant="soft" y={20}>
            <div className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Our mission</p>
              <h2 className={styles.sectionTitle} id="mission-heading">
                Revolutionize education through <em>AI &amp; digital solutions</em>
              </h2>
              <p className={styles.sectionLead}>{MISSION_INTRO}</p>
            </div>
          </MotionReveal>
          <p className={styles.sectionLead} style={{ marginBottom: 8, fontWeight: 700, color: "var(--P)" }}>
            LearnX is committed to:
          </p>
          <ul className={styles.goalGrid}>
            {MISSION_COMMITMENTS.map((item) => (
              <li key={item} className={`${styles.goalItem} rv`}>
                <span className={styles.goalIcon} aria-hidden>
                  →
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.sectionLead} style={{ marginTop: 40, marginBottom: 0 }}>
            Our goal is to create a future where education becomes:
          </p>
          <div className={styles.outcomes}>
            {MISSION_OUTCOMES.map((o) => (
              <span key={o} className={styles.outcome}>
                {o}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FounderMessage variant="full" showLearnXLink={false} id="founder" />

      <section
        className={`${styles.section} rv`}
        id="alignment"
        aria-labelledby="alignment-heading"
      >
        <div className={styles.container}>
          <MotionReveal variant="soft" y={20}>
            <div className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Regional alignment</p>
              <h2 className={styles.sectionTitle} id="alignment-heading">
                Kuwait &amp; GCC <em>vision alignment</em>
              </h2>
            </div>
          </MotionReveal>
          <div className={styles.alignmentGrid}>
            <MotionReveal variant="soft" y={24}>
              <article className={styles.alignCard}>
                <h3>{KUWAIT_VISION.title}</h3>
                <p>{KUWAIT_VISION.intro}</p>
                <ul className={styles.alignList}>
                  {KUWAIT_VISION.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </MotionReveal>
            <MotionReveal variant="soft" y={24} delay={0.08}>
              <article className={styles.alignCard}>
                <h3>{GCC_VISION.title}</h3>
                <p>{GCC_VISION.intro}</p>
                <ul className={styles.alignList}>
                  {GCC_VISION.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="learnx-cta-heading">
        <h2 id="learnx-cta-heading">
          Ready to transform your <em>institution?</em>
        </h2>
        <p>Explore LMS, SMS, and HRMS packages — or speak with our team about a tailored rollout.</p>
        <div className={styles.ctaBtns}>
          <Link href="/demo" className={styles.ctaPrimary}>
            Book a demo →
          </Link>
          <Link href="/schools" className={styles.ctaGhost}>
            For schools
          </Link>
          <Link href="/products#packages" className={styles.ctaGhost}>
            View packages
          </Link>
          <Link href="/resources" className={styles.ctaGhost}>
            Resources
          </Link>
        </div>
      </section>
    </div>
  );
}
