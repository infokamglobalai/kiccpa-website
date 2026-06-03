"use client";

import { MotionReveal, StaggerTitle } from "@/components/ui";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, Cpu, Layers, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { processSteps } from "./homeContent";
import styles from "./TransformationWorkflow.module.css";

const stepIcons = {
  search: Search,
  layers: Layers,
  cpu: Cpu,
  trending: TrendingUp,
} as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const stepsContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export default function TransformationWorkflow() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0.65, 1]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="How we transform your business"
    >
      <div className={styles.bgMesh} aria-hidden />
      <div className={styles.bgGlow} aria-hidden />

      <div className={styles.wrap}>
        <motion.header
          className={styles.header}
          style={reduce ? undefined : { opacity: headerOpacity }}
        >
          <MotionReveal variant="soft" y={12}>
            <p className={styles.eyebrow}>Our process</p>
          </MotionReveal>

          <StaggerTitle
            as="h2"
            className={styles.title}
            text="How We Transform Your Business"
            highlightFromWord={2}
            highlightClassName={styles.titleAccent}
          />

          <MotionReveal variant="soft" y={14} delay={0.12}>
            <p className={styles.subtitle}>
              From discovery to scale—we guide every stage of your digital maturity with
              measurable milestones and regional delivery teams.
            </p>
          </MotionReveal>
        </motion.header>

        <div className={styles.timeline}>
          <div className={styles.progressRail} aria-hidden>
            <div className={styles.progressTrack} />
            <motion.div
              className={styles.progressFill}
              style={
                reduce
                  ? { scaleX: 1 }
                  : { scaleX: progressScale, transformOrigin: "left center" }
              }
            />
            <ul className={styles.progressDots}>
              {processSteps.map((step, i) => (
                <li key={step.title} className={styles.progressDotWrap}>
                  <span className={styles.progressDot} />
                  <span className={styles.progressDotLabel}>{String(i + 1).padStart(2, "0")}</span>
                </li>
              ))}
            </ul>
          </div>

          <motion.ol
            className={styles.steps}
            variants={reduce ? undefined : stepsContainer}
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={{ once: true, margin: "-80px 0px -60px 0px" }}
          >
            {processSteps.map((step, i) => {
              const Icon = stepIcons[step.icon];
              return (
                <motion.li
                  key={step.title}
                  className={styles.stepCard}
                  variants={reduce ? undefined : cardVariants}
                >
                  <div className={styles.stepTop}>
                    <span className={styles.stepIndex} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.stepIcon} aria-hidden>
                      <Icon size={22} strokeWidth={2.25} />
                    </span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  {i < processSteps.length - 1 && (
                    <span className={styles.stepArrow} aria-hidden>
                      <ArrowRight size={18} />
                    </span>
                  )}
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <MotionReveal variant="soft" y={20} delay={0.15}>
          <div className={styles.cta}>
            <div className={styles.ctaCopy}>
              <p className={styles.ctaLead}>Ready to start your transformation?</p>
              <p className={styles.ctaHint}>
                Book a strategic audit with our Kuwait &amp; India delivery teams.
              </p>
            </div>
            <Link href="/contact" className={styles.ctaBtn}>
              Schedule a strategic audit
              <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
