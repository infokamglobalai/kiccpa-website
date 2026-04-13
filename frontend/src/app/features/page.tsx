"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MotionReveal, StaggerTitle } from "@/components/ui";
import { aiFeatures, experienceFeatures } from "./featuresData";
import type { FeatureBlock } from "./featuresData";
import {
  FEATURE_CARD_IMAGE,
  FEATURES_AI_STRIP,
  FEATURES_EXPERIENCE_STRIP,
  FEATURES_HERO_BG,
} from "./featuresImages";
import styles from "./FeaturesPage.module.css";

const easeOut = [0.2, 0.8, 0.2, 1] as const;

function FeatureShowcase({
  feature,
  index,
  theme,
}: {
  feature: FeatureBlock;
  index: number;
  theme: "light" | "dark";
}) {
  const reduce = useReducedMotion();
  const src = FEATURE_CARD_IMAGE[feature.id] ?? "/images/home-hero-lms.png";

  return (
    <motion.article
      className={theme === "dark" ? styles.cardDark : styles.cardLight}
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: easeOut }}
    >
      <div className={styles.cardMedia}>
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 520px"
          className={styles.cardMediaImg}
        />
        <div className={styles.cardMediaOverlay} aria-hidden />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardH}>{feature.title}</h3>
        <p className={styles.cardSummary}>{feature.summary}</p>
        <div className={styles.cardCols}>
          <div>
            <p className={styles.cardLbl}>Key features</p>
            <ul className={styles.cardList}>
              {feature.keyFeatures.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.cardLbl}>Business impact</p>
            <ul className={styles.cardList}>
              {feature.businessImpact.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        {feature.quote ? <blockquote className={styles.cardQuote}>{feature.quote}</blockquote> : null}
      </div>
    </motion.article>
  );
}

export default function FeaturesPage() {
  const reduce = useReducedMotion();

  return (
    <div className={styles.shell}>
      {/* Immersive hero */}
      <section className={styles.hero} aria-labelledby="features-hero-title">
        <div className={styles.heroBg}>
          <Image
            src={FEATURES_HERO_BG}
            alt=""
            fill
            priority
            className={styles.heroBgImg}
            sizes="100vw"
          />
          <div className={styles.heroBgMesh} aria-hidden />
          <div className={styles.heroBgVignette} aria-hidden />
        </div>
        <div className={styles.heroInner}>
          <motion.p
            className={styles.heroKicker}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            KICCPA LMS
          </motion.p>
          <div id="features-hero-title">
            <StaggerTitle
              as="h1"
              className={styles.heroTitle}
              text="Platform features for students, faculty & leaders"
              highlightFromWord={3}
              highlightClassName={styles.heroTitleGrad}
            />
          </div>
          <motion.p
            className={styles.heroLead}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: easeOut }}
          >
            Everything from modern UX and multilingual access to AI-driven paths, grading, and
            predictive analytics — designed for adoption across your institution.
          </motion.p>
          <motion.div
            className={styles.heroPills}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {["Adaptive learning", "Real-time analytics", "Bilingual & RTL"].map((label) => (
              <span key={label} className={styles.pill}>
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience — light region + strip image */}
      <section className={styles.region} aria-labelledby="exp-heading">
        <div className={styles.regionStrip}>
          <div className={styles.stripVisual}>
            <Image
              src={FEATURES_EXPERIENCE_STRIP}
              alt="Educators and learners collaborating with technology"
              fill
              className={styles.stripImg}
              sizes="(max-width: 900px) 100vw, 40vw"
            />
            <div className={styles.stripCaption}>
              <span>Human-centred</span>
              <strong>Experience layer</strong>
            </div>
          </div>
          <div className={styles.stripCopy}>
            <p className={styles.regionEyebrow} id="exp-heading">
              Experience &amp; accessibility
            </p>
            <h2 className={styles.regionTitle}>
              How people use the platform <em>every day</em>
            </h2>
            <p className={styles.regionDesc}>
              Navigation, personalization, recommendations, dashboards, and cross-device access —
              the foundation for engagement before AI layers go to work.
            </p>
          </div>
        </div>

        <div className={styles.cardGrid}>
          {experienceFeatures.map((f, i) => (
            <FeatureShowcase key={f.id} feature={f} index={i} theme="light" />
          ))}
        </div>
      </section>

      {/* AI — dark region */}
      <section className={styles.regionDark} aria-labelledby="ai-heading">
        <div className={styles.darkIntro}>
          <div className={styles.darkIntroText}>
            <p className={styles.regionEyebrowLight} id="ai-heading">
              AI &amp; intelligent automation
            </p>
            <h2 className={styles.regionTitleLight}>
              Intelligence built into <em>teaching and operations</em>
            </h2>
            <p className={styles.regionDescLight}>
              Adaptive learning, conversational support, automated assessment, and forecasting —
              so teams spend less time on admin and more on outcomes.
            </p>
          </div>
          <div className={styles.darkIntroVisual}>
            <Image
              src={FEATURES_AI_STRIP}
              alt="Connected systems and analytics"
              fill
              className={styles.darkIntroImg}
              sizes="(max-width: 900px) 100vw, 44vw"
            />
            <div className={styles.darkIntroGlow} aria-hidden />
          </div>
        </div>

        <div className={`${styles.cardGrid} ${styles.cardGridDark}`}>
          {aiFeatures.map((f, i) => (
            <FeatureShowcase key={f.id} feature={f} index={i} theme="dark" />
          ))}
        </div>
      </section>

      {/* CTA */}
      <MotionReveal y={20}>
        <section className={styles.ctaBand} aria-label="Next steps">
          <div className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Scope that fits your <em>campus</em></h2>
            <p className={styles.ctaText}>
              See how these capabilities map to your curriculum, stakeholders, and rollout plan — we
              tailor scope for schools and groups in Kuwait, India, and beyond.
            </p>
            <div className={styles.ctaRow}>
              <Link href="/demo" className={styles.btnPrimary}>
                Book a demo
              </Link>
              <Link href="/products#packages" className={styles.btnGhost}>
                Packages
              </Link>
              <Link href="/contact" className={styles.btnGhost}>
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </MotionReveal>
    </div>
  );
}
