"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import MotionReveal from "@/components/ui/MotionReveal";
import DemoBookingForm from "./DemoBookingForm";
import styles from "./DemoPage.module.css";

const STEPS = [
  {
    title: "Share your context",
    body: "Institution type, student volume, and what success looks like for your leadership team.",
  },
  {
    title: "See the product live",
    body: "A guided walkthrough of LMS flows — academics, operations, and parent experience — tailored to your questions.",
  },
  {
    title: "Next steps on your terms",
    body: "Packaging, rollout, and integrations discussed with no obligation. Prefer email first? Use contact and we will reply with times.",
  },
] as const;

export default function DemoPage() {
  const reduce = useReducedMotion();

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden />
        <motion.div
          className={styles.heroContent}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className={styles.eyebrow}>Live walkthrough</p>
          <h1 className={styles.title}>
            See it for your school — in <em>20 minutes</em>
          </h1>
          <p className={styles.lead}>
            Book a session with our product team: a focused demo of the KICCPA LMS stack, aligned to your stakeholders
            and region. No pressure — just clarity on fit and rollout.
          </p>
        </motion.div>
      </header>

      <section className={styles.steps} aria-labelledby="demo-steps">
        <p id="demo-steps" className={styles.stepsLabel}>
          How it works
        </p>
        <ul className={styles.stepList}>
          {STEPS.map((step, i) => (
            <MotionReveal key={step.title} delay={i * 0.07} y={18}>
              <li className={styles.step}>
                <span
                  className={`${styles.stepNum} ${i === 1 ? styles.stepNumAlt : ""}`}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <div className={styles.stepBody}>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            </MotionReveal>
          ))}
        </ul>
      </section>

      <MotionReveal className={styles.cta} y={22}>
        <p className={styles.ctaEyebrow}>Next step</p>
        <h2 className={styles.ctaTitle}>
          Book a <em>free demo</em>
        </h2>
        <p className={styles.ctaText}>
          Use the registration form below for a scheduled session (we will confirm by email). Or start with a general
          message — same team, different path.
        </p>
        <div className={styles.ctaRow}>
          <Link href="#book-demo" className={styles.btnPrimary}>
            Register for a demo →
          </Link>
          <Link href="/contact" className={styles.btnSecondary}>
            Contact us instead
          </Link>
        </div>
      </MotionReveal>

      <DemoBookingForm />
    </div>
  );
}
