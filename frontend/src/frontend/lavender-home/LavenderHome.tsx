"use client";

import { HeroParallax, MotionReveal, StaggerTitle } from "@/components/ui";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EnterpriseHomeSection from "./EnterpriseHomeSection";
import LmsIntelligenceSections from "./LmsIntelligenceSections";
import PremiumPackageSection from "./PremiumPackageSection";
import SchoolManagementSection from "./SchoolManagementSection";
import { homeImages, homePackageTeaser } from "./homeContent";
import HeroImpactSection from "./HeroImpactSection";
import HeroPillarsStrip from "./HeroPillarsStrip";
import styles from "./LavenderHome.module.css";
import WhoWeAreSection from "./WhoWeAreSection";
import TransformationWorkflow from "./TransformationWorkflow";
// import IntelligenceMap from "./IntelligenceMap";
import IndustryTeaser from "./IndustryTeaser";
import PackagePricingSection from "./PackagePricingSection";
import RegionalDepthSection from "./RegionalDepthSection";
import HeroRegionTags from "./HeroRegionTags";

const productShowcase = [
  {
    name: "LMS",
    title: "Learning Management System",
    quick: "Courses, digital classrooms, assessments, and progress analytics.",
    details:
      "AI-assisted learning paths, assignment workflows, multilingual access, and dashboards for students, teachers, and parents.",
    image: "/images/solutions/lms.png",
    href: "/solutions/lms",
  },
  {
    name: "SMS",
    title: "School Management System",
    quick: "Admissions, attendance, fees, transport, and school operations in one platform.",
    details:
      "End-to-end ERP for institutions with parent communication, payroll, reports, and centralized administration controls.",
    image: "/images/solutions/sms.png",
    href: "/solutions/sms",
  },
  {
    name: "AI Proctor",
    title: "AI Online Proctoring",
    quick: "Secure exams with real-time monitoring, alerts, and anti-cheating controls.",
    details:
      "Camera and behavior-based proctoring, suspicious activity alerts, and audit-ready exam security for remote assessments.",
    image: "/images/solutions/assessment.png",
    href: "/solutions/assessment",
  },
  {
    name: "AI PaperGen",
    title: "AI Paper Generation",
    quick: "Generate curriculum-aligned question papers by subject and difficulty.",
    details:
      "Supports multiple boards, Bloom's Taxonomy mapping, smart regeneration, and printable/online exam publishing.",
    image: "/images/solutions/question-paper.png",
    href: "/solutions/question-paper",
  },
  {
    name: "AI Calendar",
    title: "AI Academic Calendar",
    quick: "Plan class schedules, substitutions, events, and syllabus tracking intelligently.",
    details:
      "Automated timetable handling with leave management, conflict reduction, and complete academic planning visibility.",
    image: "/images/solutions/calendar-management.png",
    href: "/solutions/calendar-management",
  },
  {
    name: "AI Counsellor",
    title: "AI Student Counsellor",
    quick: "Personalized student guidance for wellbeing, learning confidence, and interventions.",
    details:
      "Early signals for engagement and support pathways to help educators and counselors improve student outcomes.",
    image: "/images/solutions/ai-counselor.png",
    href: "/solutions/ai-counselor",
  },
  {
    name: "AI Career Counsellor",
    title: "Career & Higher-Ed Guidance",
    quick: "Career pathway suggestions, university fit, and skill-interest mapping.",
    details:
      "AI guidance with country-wise opportunities, education planning, and actionable recommendations for students and parents.",
    image: "/images/solutions/career-counseling.png",
    href: "/solutions/career-counseling",
  },
  {
    name: "Webcast",
    title: "Webcast & Virtual Events",
    quick: "Live broadcasts, webinars, and virtual classes integrated with your LMS.",
    details:
      "Stream large audiences, run interactive sessions, and start video classes instantly — without separate scheduling tools or third-party links.",
    image: "/images/solutions/webcast.png",
    href: "/solutions/webcast",
  },
] as const;

const primaryProducts = productShowcase.slice(0, 4);
const moreProducts = productShowcase.slice(4);

const heroDescLines = [
  "From ERP to AI-driven platforms, KICCPA delivers scalable, secure, and future-ready technology solutions across industries—helping organizations streamline operations, improve efficiency, and accelerate growth.",
];

const heroEase = [0.2, 0.8, 0.2, 1] as const;

type LavenderHomeProps = {
  onOpenVideo?: () => void;
};

function ProductShowcaseCard({
  item,
  cardId,
  expanded,
  onToggle,
}: {
  item: (typeof productShowcase)[number];
  cardId: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article className={styles.productSlideItem}>
      <header className={styles.productCardHeader}>
        <h3 className={styles.productCardLabel}>{item.name}</h3>
        <p className={styles.productCardSubtitle}>{item.title}</p>
      </header>
      <div className={`${styles.productShowcaseCard} ${expanded ? styles.productCardOpen : ""}`}>
        <div className={styles.productShowcaseImageWrap}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 900px) 100vw, 25vw"
            className={styles.productShowcaseImage}
          />
          <button
            type="button"
            className={styles.productShowcaseToggle}
            onClick={onToggle}
            aria-expanded={expanded}
            aria-label={expanded ? `Hide ${item.name} info` : `Show ${item.name} info`}
          >
            {expanded ? "▲" : "▼"}
          </button>
          <div className={styles.productShowcaseOverlay}>
            <p className={styles.productShowcaseQuick}>{item.quick}</p>
            <p className={styles.productShowcaseDetails}>{item.details}</p>
            <Link href={item.href} className={styles.productShowcaseLink}>
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function LavenderHome({ onOpenVideo }: LavenderHomeProps) {
  const reduce = useReducedMotion();
  const [openProduct, setOpenProduct] = useState<string | null>(null);
  const [sliderPaused, setSliderPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const flowingProducts = useMemo(() => [...productShowcase, ...productShowcase], []);

  const getSliderStep = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return 320;
    const first = el.querySelector<HTMLElement>(`.${styles.productSlideItem}`);
    const gap = parseFloat(getComputedStyle(el).gap) || 20;
    return (first?.offsetWidth ?? 320) + gap;
  }, []);

  const scrollSlider = useCallback(
    (direction: -1 | 1) => {
      const el = sliderRef.current;
      if (!el) return;
      setSliderPaused(true);
      el.scrollBy({ left: direction * getSliderStep(), behavior: "smooth" });
    },
    [getSliderStep],
  );

  useEffect(() => {
    if (reduce || sliderPaused) return;
    let rafId = 0;
    let lastTs = performance.now();
    const pxPerMs = 0.045;

    const tick = (ts: number) => {
      const el = sliderRef.current;
      if (!el) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }
      const dt = ts - lastTs;
      lastTs = ts;
      el.scrollLeft += dt * pxPerMs;
      const loopPoint = el.scrollWidth / 2;
      if (el.scrollLeft >= loopPoint) {
        el.scrollLeft -= loopPoint;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [reduce, sliderPaused]);

  return (
    <div className={styles.page}>
      {/* 1 — Hero + stats + value props (reference layout) */}
      <section className={styles.heroBlock} aria-label="KICCPA homepage hero">
        <div className={styles.heroUltra} aria-label="KICCPA Digital Solutions hero">
          <div className={styles.heroUltraBg} aria-hidden />
          <div className={styles.heroUltraGrid}>
            <div className={styles.heroUltraCopy}>
              <motion.p
                className={styles.heroKickerUltra}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: heroEase }}
              >
                KICCPA · Digital Solutions &amp; AI
              </motion.p>
              <div className={styles.heroTitleSlot}>
                <StaggerTitle
                  as="h1"
                  className={styles.heroTitleUltra}
                  text="Powering Businesses with Intelligent Digital Solutions"
                  highlightFromWord={4}
                  highlightClassName={styles.heroTitleAccentUltra}
                />
              </div>
              <motion.div
                className={styles.heroDescBlock}
                initial={reduce ? false : "hidden"}
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.28 },
                  },
                }}
              >
                {heroDescLines.map((line) => (
                  <motion.p
                    key={line.slice(0, 32)}
                    className={styles.heroDescUltra}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.55, ease: heroEase },
                      },
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </motion.div>
              <motion.div
                className={styles.heroCtasUltra}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55, ease: heroEase }}
              >
                <Link href="/demo" className={styles.btnPrimaryUltra}>
                  Request a Demo
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <Link href="/services" className={styles.btnOutlineUltra}>
                  Our Services
                  <ArrowRight size={16} aria-hidden />
                </Link>
                {onOpenVideo ? (
                  <button type="button" className={styles.btnOutlineUltra} onClick={onOpenVideo}>
                    Watch Overview
                    <Play size={16} aria-hidden />
                  </button>
                ) : (
                  <Link href="/resources" className={styles.btnOutlineUltra}>
                    Watch Overview
                    <Play size={16} aria-hidden />
                  </Link>
                )}
              </motion.div>
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.45 }}
              >
                <HeroRegionTags />
              </motion.div>
              <motion.p
                className={styles.heroKamLine}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.45 }}
              >
                Part of the <strong className={styles.heroKamStrong}>KAM International</strong> ecosystem.
              </motion.p>
            </div>
            <HeroParallax
              subtle
              className={`${styles.heroCollageOuter} ${styles.heroCollageUltra}`}
            >
              <div className={styles.heroCollage}>
                <div className={styles.heroMainPhoto}>
                  <Image
                    src={homeImages.heroHuman}
                    alt={homeImages.heroHumanAlt}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 900px) 100vw, 62vw"
                    className={styles.heroImg}
                  />
                </div>
              </div>
            </HeroParallax>
          </div>
          <div className={styles.heroImpactZone}>
            <HeroImpactSection />
          </div>
        </div>
      </section>

      <HeroPillarsStrip />

      <section className={styles.productsShowcaseSection} aria-labelledby="products-showcase-title">
        <div className={styles.productsShowcaseHead}>
          <MotionReveal variant="soft" y={14}>
            <p className={styles.productsShowcaseEyebrow}>Products we built</p>
            <h2 id="products-showcase-title" className={styles.productsShowcaseTitle}>
              Unified digital stack for modern institutions
            </h2>
            <p className={styles.productsShowcaseLead}>
              Products scroll automatically—hover or use the arrows to browse. Tap ▼ on a card for details or open the
              full product page.
            </p>
          </MotionReveal>
        </div>
        <div className={styles.productsSliderWrap}>
          <div
            className={styles.productsSliderOuter}
            onMouseEnter={() => setSliderPaused(true)}
            onMouseLeave={() => setSliderPaused(false)}
            onTouchStart={() => setSliderPaused(true)}
            onTouchEnd={() => setSliderPaused(false)}
            onFocusCapture={() => setSliderPaused(true)}
            onBlurCapture={() => setSliderPaused(false)}
          >
            <button
              type="button"
              className={`${styles.productsSliderNav} ${styles.productsSliderNavPrev}`}
              onClick={() => scrollSlider(-1)}
              aria-label="Previous products"
            >
              <ChevronLeft size={22} aria-hidden />
            </button>
            <button
              type="button"
              className={`${styles.productsSliderNav} ${styles.productsSliderNavNext}`}
              onClick={() => scrollSlider(1)}
              aria-label="Next products"
            >
              <ChevronRight size={22} aria-hidden />
            </button>
            <div className={styles.productsShowcaseGrid} ref={sliderRef}>
              {flowingProducts.map((item, idx) => {
                const cardId = `${item.name}-${idx}`;
                const expanded = openProduct === cardId;
                return (
                  <ProductShowcaseCard
                    key={cardId}
                    item={item}
                    cardId={cardId}
                    expanded={expanded}
                    onToggle={() => setOpenProduct(expanded ? null : cardId)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <WhoWeAreSection />
      <TransformationWorkflow />
      <IndustryTeaser />
      <PackagePricingSection />

      <LmsIntelligenceSections />

      <SchoolManagementSection />

      {/* LMS Standard — full-width band */}
      <section className={styles.lmsStandardSection} aria-labelledby="lms-standard-heading">
        <div className={styles.lmsStandardInner}>
          <div className={styles.lmsStandardGrid}>
            <MotionReveal variant="media" className={styles.lmsStandardVisualWrap}>
              <div className={`${styles.lmsStandardVisual} ${styles.floatSlow}`}>
                <Image
                  src={homeImages.lmsStandard}
                  alt={homeImages.lmsStandardAlt}
                  fill
                  sizes="(max-width: 960px) 100vw, min(52vw, 720px)"
                  className={styles.cover}
                />
              </div>
            </MotionReveal>
            <MotionReveal y={22} className={styles.lmsStandardCopy}>
              <p className={styles.lmsStandardEyebrow}>KICCPA LMS · Standard</p>
              <h2 id="lms-standard-heading" className={styles.lmsStandardTitle}>
                LMS Standard — digital learning foundation
              </h2>
              <p className={styles.lmsStandardLead}>
                Structured content delivery, assessments, AI mentor assistance, and parent visibility —
                ideal for schools beginning a full digital learning journey. Roll out modules at your
                pace; upgrade to Premium when operations need to live on the same fabric.
              </p>
              <div className={styles.lmsStandardIconGrid} role="list">
                {[
                  { e: "🎓", l: "Student dashboard" },
                  { e: "📚", l: "Course management" },
                  { e: "📉", l: "Analytics" },
                  { e: "📲", l: "Mobile app" },
                ].map((x) => (
                  <div key={x.l} className={styles.lmsStandardFeat} role="listitem">
                    <span className={styles.lmsStandardFeatEmoji} aria-hidden>
                      {x.e}
                    </span>
                    <span className={styles.lmsStandardFeatLabel}>{x.l}</span>
                  </div>
                ))}
              </div>
              <Link href="/products#lms-standard" className={styles.lmsStandardCta}>
                View packages →
              </Link>
            </MotionReveal>
          </div>
        </div>
      </section>

      <PremiumPackageSection />

      <EnterpriseHomeSection />

      {/* Final CTA — full viewport width */}
      <section className={styles.ctaSectionFull} aria-labelledby="cta-heading">
        <div className={`${styles.sectionHeader} ${styles.ctaSectionHeader}`}>
          <h2 id="cta-heading" className={styles.sectionTitle}>
            Ready to transform your institution?
          </h2>
          <p className={styles.sectionLead}>
            A clear path from discovery to scaled adoption — with teams in Kuwait and India who
            stay through hypercare and beyond.
          </p>
        </div>
        <div className={`${styles.ctaGrid} ${styles.ctaGridFull}`}>
          <MotionReveal variant="media" className={styles.ctaVisualCol}>
            <Image
              src={homeImages.support}
              alt={homeImages.supportAlt}
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              className={styles.cover}
            />
            <div className={styles.ctaVisualBadge}>
              <strong>Partnership, not a one-off delivery</strong>
              <span>
                Training, change management, and success reviews — so adoption sticks and outcomes
                are measurable.
              </span>
            </div>
          </MotionReveal>
          <div>
            <div className={styles.steps}>
              {[
                {
                  n: "1",
                  t: "Discovery",
                  d: "We map curriculum, stakeholders, integrations, and compliance needs.",
                },
                {
                  n: "2",
                  t: "Pilot",
                  d: "Controlled rollout with success metrics, coaching, and feedback loops.",
                },
                {
                  n: "3",
                  t: "Deploy",
                  d: "Go-live with migration support, data validation, and hypercare.",
                },
                {
                  n: "4",
                  t: "Scale",
                  d: "Expand modules, campuses, and automation with the same platform spine.",
                },
              ].map((s, i) => (
                <MotionReveal key={s.n} variant="soft" y={14} delay={i * 0.05}>
                  <div className={styles.stepRow}>
                    <div className={styles.stepNum}>{s.n}</div>
                    <div className={styles.stepBody}>
                      <h4>{s.t}</h4>
                      <p>{s.d}</p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
            <MotionReveal variant="soft" y={12}>
              <div className={styles.whyBox} style={{ marginTop: 8 }}>
                <h3>Why choose KICCPA</h3>
                <ul>
                  <li>AI-native LMS + ERP on one roadmap — not stitched silos</li>
                  <li>Bilingual English–Arabic with RTL and regional compliance</li>
                  <li>Evidence-led pilots: adoption, risk reduction, and faster reporting</li>
                  <li>Dedicated implementation, training, and long-term success management</li>
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                  <Link href="/demo" className={styles.btnPrimary}>
                    Request a demo
                  </Link>
                  <Link href="/contact" className={styles.btnOutline}>
                    Contact sales
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <RegionalDepthSection />
    </div>
  );
}
