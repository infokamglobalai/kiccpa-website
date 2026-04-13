"use client";

import Image from "next/image";
import Link from "next/link";
import { schoolsArchitecture } from "./schoolsArchitectureData";
import { Reveal, RevealCard } from "./stakeholderMotion";
import styles from "./SchoolsArchitecture.module.css";

/** Rotating cover art — cycles across modules for visual variety */
const CARD_IMAGES = [
  encodeURI("/images/Digital & AI 1.jpeg"),
  encodeURI("/images/End-to-End Operational Digitization 1.jpeg"),
  encodeURI("/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg"),
  encodeURI("/images/Scalable Architecture 1.png"),
  encodeURI("/images/AI Predictive Analytics & Smart Automation.png"),
  encodeURI("/images/home-hero-lms.png"),
  encodeURI("/images/Robust Legacy System Integrations 1.jpeg"),
  encodeURI("/images/Custom Enterprise Software Architecture 1.jpeg"),
  "/images/hero_platforms.png",
  "/images/hero_insights.png",
] as const;

const THEME_COUNT = 8;

export default function SchoolsArchitecture() {
  return (
    <div className={styles.page}>
      <div className={styles.pageGlow} aria-hidden />
      <Reveal className={styles.intro}>
        <p className={styles.introKicker}>Feature architecture</p>
        <h2 className={styles.introTitle}>
          Comprehensive <span className={styles.introTitleEm}>School Management</span> System
        </h2>
        <p className={styles.introDesc}>
          One unified ERP layer beneath the KICCPA LMS — from admissions and fees to AI evaluation,
          transport, and multi-campus governance. Every module is designed for real school operations
          in India and Kuwait.
        </p>
      </Reveal>

      <div className={styles.grid}>
        {schoolsArchitecture.map((sec, i) => {
          const theme = i % THEME_COUNT;
          const coverSrc = CARD_IMAGES[i % CARD_IMAGES.length];
          return (
            <RevealCard
              key={sec.num + sec.title}
              className={styles.cardWrap}
              delay={Math.min(0.05 * i, 0.6)}
            >
              <article
                className={styles.card}
                data-theme={theme}
              >
                <div className={styles.cardHero}>
                  <Image
                    src={coverSrc}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.cardHeroImg}
                  />
                  <div className={styles.cardHeroShine} aria-hidden />
                  <div className={styles.cardHeroTint} aria-hidden />
                  <div className={styles.cardHeroTop}>
                    <span className={styles.num}>{sec.num}</span>
                    <span className={styles.icon} aria-hidden>
                      {sec.icon}
                    </span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{sec.title}</h3>

                  {sec.items && (
                    <ul className={styles.list}>
                      {sec.items.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}

                  {sec.subsections?.map((sub, j) => (
                    <div key={`${sec.num}-${sub.title ?? j}`} className={styles.subBlock}>
                      {sub.title && <p className={styles.subTitle}>{sub.title}</p>}
                      <ul className={styles.list}>
                        {sub.items.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            </RevealCard>
          );
        })}
      </div>

      <Reveal className={styles.cta} delay={0.08}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>See this architecture in a live walkthrough</h2>
          <p className={styles.ctaDesc}>
            We map these modules to your board structure, curriculum, and region — then configure
            deployment with minimal disruption to teaching.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/demo" className={styles.btnPrimary}>
              Book a live demo
            </Link>
            <Link href="/contact" className={styles.btnGhost}>
              Talk to solutions
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
