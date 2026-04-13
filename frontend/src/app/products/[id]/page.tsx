"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import MotionReveal from "@/components/ui/MotionReveal";
import styles from "./ProductDetail.module.css";

function formatTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const CAPABILITIES = [
  {
    title: "Real-time analytics",
    desc: "Monitor adoption, outcomes, and operational health with live dashboards tailored to your role.",
  },
  {
    title: "AI automation",
    desc: "Reduce manual work with intelligent workflows, assistive grading, and predictive signals.",
  },
  {
    title: "Global scaling",
    desc: "Deploy across campuses and regions with governance, APIs, and enterprise-grade reliability.",
  },
] as const;

export default function ProductDetail() {
  const params = useParams();
  const raw = params?.id;
  const slug = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : "";
  const title = slug ? formatTitle(slug) : "Product";
  const reduce = useReducedMotion();

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Link href="/products#packages" className={styles.back}>
            ← Back to packages
          </Link>

          <div className={styles.grid}>
            <div>
              <p className={styles.eyebrow}>KICCPA LMS</p>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.lead}>
                A high-performance digital learning and school operations ecosystem designed to scale with your
                institution. Integrated with modern AI and analytics so leaders, staff, and families stay aligned.
              </p>
              <div className={styles.actions}>
                <a
                  href="https://eduaitutors.com/auth/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  Request access
                </a>
                <Link href="/contact" className={styles.btnGhost}>
                  Enquire now
                </Link>
              </div>
            </div>

            <motion.div
              className={styles.visual}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className={styles.visualInner}>
                <div className={styles.visualIcon} aria-hidden>
                  🚀
                </div>
                <h3 className={styles.visualTitle}>Ready for rollout</h3>
                <p className={styles.visualText}>
                  Scope packages to your curriculum and stakeholders — we size implementation on a short discovery
                  call.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <section className={styles.featuresSection} aria-labelledby="cap-heading">
          <h2 id="cap-heading" className={styles.featuresTitle}>
            Core <em>capabilities</em>
          </h2>
          <div className={styles.featureGrid}>
            {CAPABILITIES.map((feature, i) => (
              <MotionReveal key={feature.title} delay={i * 0.08} y={20}>
                <article className={styles.featureCard}>
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
