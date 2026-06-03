"use client";

import { MotionReveal } from "@/components/ui";
import {
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  Heart,
  Play,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { aiFeatures, experienceFeatures } from "./featuresData";
import type { FeatureBlock } from "./featuresData";
import {
  FEATURE_AUDIENCES,
  FEATURE_CATEGORIES,
  FEATURE_ECOSYSTEM,
  FEATURE_STATS,
  FEATURES_CTA,
  FEATURES_HERO,
} from "./featuresPageContent";
import { FEATURE_CARD_IMAGE, FEATURES_HERO_BG } from "./featuresImages";
import styles from "./FeaturesPage.module.css";

const audienceIcons = {
  graduation: GraduationCap,
  users: Users,
  heart: Heart,
  building: Building2,
} as const;

function FeatureRow({
  feature,
  index,
  variant,
}: {
  feature: FeatureBlock;
  index: number;
  variant: "light" | "dark";
}) {
  const reversed = index % 2 === 1;
  const src = FEATURE_CARD_IMAGE[feature.id] ?? "/images/home-hero-lms.png";

  return (
    <MotionReveal variant="soft" y={28} delay={index * 0.04}>
      <article
        id={feature.id}
        className={`${styles.featureRow} ${variant === "dark" ? styles.featureRowDark : ""} ${reversed ? styles.featureRowReverse : ""}`}
      >
        <div className={styles.featureMedia}>
          <Image src={src} alt="" fill sizes="(max-width: 900px) 100vw, 520px" className={styles.featureImg} />
          <div className={styles.featureMediaOverlay} aria-hidden />
        </div>
        <div className={styles.featureBody}>
          <span className={styles.featureIndex}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureSummary}>{feature.summary}</p>
          <div className={styles.featureCols}>
            <div>
              <p className={styles.featureLbl}>Key features</p>
              <ul className={styles.featureBullets}>
                {feature.keyFeatures.map((line) => (
                  <li key={line}>
                    <Check size={14} strokeWidth={2.5} aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.featureLbl}>Business impact</p>
              <ul className={styles.featureBullets}>
                {feature.businessImpact.map((line) => (
                  <li key={line}>
                    <Check size={14} strokeWidth={2.5} aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {feature.quote ? (
            <blockquote className={styles.featureQuote}>{feature.quote}</blockquote>
          ) : null}
        </div>
      </article>
    </MotionReveal>
  );
}

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("experience");

  useEffect(() => {
    const sections = FEATURE_CATEGORIES.map((c) => document.getElementById(c.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] }
    );
    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.shell}>
      <header className={styles.hero} aria-labelledby="features-hero-title">
        <div className={styles.heroBg} aria-hidden>
          <Image src={FEATURES_HERO_BG} alt="" fill priority className={styles.heroBgImg} sizes="100vw" />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={styles.heroInner}>
          <MotionReveal variant="soft" y={20}>
            <p className={styles.heroEyebrow}>{FEATURES_HERO.eyebrow}</p>
            <h1 id="features-hero-title" className={styles.heroTitle}>
              {FEATURES_HERO.title}{" "}
              <span className={styles.heroTitleAccent}>{FEATURES_HERO.titleAccent}</span>
            </h1>
            <p className={styles.heroLead}>{FEATURES_HERO.lead}</p>
            <div className={styles.heroPills}>
              {FEATURES_HERO.pills.map((label) => (
                <span key={label} className={styles.pill}>
                  {label}
                </span>
              ))}
            </div>
            <div className={styles.heroActions}>
              <Link href={FEATURES_HERO.ctaPrimary.href} className={styles.btnPrimary}>
                {FEATURES_HERO.ctaPrimary.label}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href={FEATURES_HERO.ctaSecondary.href} className={styles.btnGhost}>
                {FEATURES_HERO.ctaSecondary.label}
              </Link>
              <Link href="/resources" className={styles.btnGhost}>
                <Play size={14} fill="currentColor" aria-hidden />
                Watch overview
              </Link>
            </div>
          </MotionReveal>
        </div>
      </header>

      <section className={styles.stats} aria-label="Platform highlights">
        <div className={styles.statsGrid}>
          {FEATURE_STATS.map((s, i) => (
            <MotionReveal key={s.label} variant="soft" y={12} delay={i * 0.04}>
              <div className={styles.stat}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statHint}>{s.hint}</span>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      <nav className={styles.categoryNav} aria-label="Feature categories">
        <div className={styles.categoryNavInner}>
          {FEATURE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.categoryBtnActive : ""}`}
              onClick={() => scrollTo(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="experience" className={styles.region} aria-labelledby="exp-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.regionHead}>
              <p className={styles.eyebrow} id="exp-heading">
                Experience &amp; accessibility
              </p>
              <h2 className={styles.regionTitle}>
                How people use the platform <em>every day</em>
              </h2>
              <p className={styles.regionLead}>
                Navigation, personalization, dashboards, mobile access, and bilingual delivery—the
                foundation for engagement before AI goes to work.
              </p>
            </header>
          </MotionReveal>
          <div className={styles.featureStack}>
            {experienceFeatures.map((f, i) => (
              <FeatureRow key={f.id} feature={f} index={i} variant="light" />
            ))}
          </div>
        </div>
      </section>

      <section id="ai" className={styles.regionDark} aria-labelledby="ai-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.regionHead}>
              <p className={styles.eyebrowLight} id="ai-heading">
                AI &amp; intelligent automation
              </p>
              <h2 className={styles.regionTitleLight}>
                Intelligence built into <em>teaching and operations</em>
              </h2>
              <p className={styles.regionLeadLight}>
                Adaptive learning, automated assessment, predictive analytics, and AI counselling—so
                teams spend less time on admin and more on outcomes.
              </p>
            </header>
          </MotionReveal>
          <div className={styles.featureStack}>
            {aiFeatures.map((f, i) => (
              <FeatureRow key={f.id} feature={f} index={i} variant="dark" />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.audiences} aria-labelledby="audiences-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.regionHeadCenter}>
              <p className={styles.eyebrow}>Who benefits</p>
              <h2 id="audiences-heading" className={styles.regionTitle}>
                Built for every <em>stakeholder</em>
              </h2>
              <p className={styles.regionLead}>
                One platform—tailored views for students, faculty, parents, and leadership.
              </p>
            </header>
          </MotionReveal>
          <div className={styles.audienceGrid}>
            {FEATURE_AUDIENCES.map((a, i) => {
              const Icon = audienceIcons[a.icon];
              return (
                <MotionReveal key={a.title} variant="soft" delay={i * 0.06} y={18}>
                  <article className={styles.audienceCard}>
                    <span className={styles.audienceIcon} aria-hidden>
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <h3 className={styles.audienceTitle}>{a.title}</h3>
                    <p className={styles.audienceDesc}>{a.desc}</p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.ecosystem} aria-labelledby="ecosystem-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.regionHeadCenter}>
              <p className={styles.eyebrow}>Connected ecosystem</p>
              <h2 id="ecosystem-heading" className={styles.regionTitle}>
                Features that link to <em>products</em>
              </h2>
              <p className={styles.regionLead}>
                Explore how capabilities roll up into LMS, school management, LearnX, and AI
                counselling modules.
              </p>
            </header>
          </MotionReveal>
          <div className={styles.ecosystemGrid}>
            {FEATURE_ECOSYSTEM.map((item, i) => (
              <MotionReveal key={item.label} variant="soft" delay={i * 0.05} y={14}>
                <Link href={item.href} className={styles.ecosystemCard}>
                  <span className={styles.ecosystemLabel}>{item.label}</span>
                  <span className={styles.ecosystemDesc}>{item.desc}</span>
                  <ArrowRight size={16} className={styles.ecosystemArrow} aria-hidden />
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="features-cta-title">
        <MotionReveal variant="soft" y={20}>
          <div className={styles.ctaInner}>
            <span className={styles.ctaIcon} aria-hidden>
              <Sparkles size={24} />
            </span>
            <h2 id="features-cta-title" className={styles.ctaTitle}>
              {FEATURES_CTA.title}
              <br />
              <em>{FEATURES_CTA.titleAccent}</em>
            </h2>
            <p className={styles.ctaLead}>{FEATURES_CTA.lead}</p>
            <div className={styles.ctaRow}>
              <Link href="/demo" className={styles.btnPrimary}>
                Book a demo
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/schools" className={styles.btnOutline}>
                For schools
              </Link>
              <Link href="/contact" className={styles.btnOutline}>
                Contact us
              </Link>
            </div>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
}
