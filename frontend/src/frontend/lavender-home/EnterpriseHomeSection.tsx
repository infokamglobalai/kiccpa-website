"use client";

import Image from "next/image";
import Link from "next/link";
import { Cloud, Link2, Shield } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { homeImages } from "./homeContent";
import styles from "./EnterpriseHomeSection.module.css";

const ease = [0.2, 0.8, 0.2, 1] as const;

const RAIL = [
  {
    Icon: Shield,
    title: "Governance & security",
    text: "Audit trails, RBAC, and data policies aligned to your group and regulators.",
  },
  {
    Icon: Link2,
    title: "Integration fabric",
    text: "REST APIs, webhooks, and connectors into SIS, ERP, payments, and BI stacks.",
  },
  {
    Icon: Cloud,
    title: "Dedicated cloud & SLAs",
    text: "Isolated environments, disaster-recovery drills, and operations you can measure.",
  },
] as const;

const CARDS = [
  {
    icon: "🏷️",
    t: "White-label & branding",
    d: "Your logo, palette, domains, and app store listings — aligned with your brand guidelines.",
  },
  {
    icon: "🔌",
    t: "API & integrations",
    d: "Payments, SMS, biometric, SIS, CRM, and BI tools via documented, secure APIs.",
  },
  {
    icon: "🧠",
    t: "Custom AI models",
    d: "Fine-tuned assistants, grading policies, and governance rules per institution or group.",
  },
  {
    icon: "☁️",
    t: "Dedicated cloud",
    d: "Isolated environments, disaster-recovery drills, and SLA-backed operations.",
  },
] as const;

const headLine = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

const leadLine = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.12, ease },
  },
};

const cardsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

export default function EnterpriseHomeSection() {
  const reduce = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start 85%", "end 15%"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.45, 1], reduce ? [1, 1, 1] : [1.06, 1, 1.03]);
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-4%", "4%"]);

  return (
    <section className={styles.section} aria-labelledby="enterprise-heading">
      <div className={styles.bgMesh} aria-hidden />
      <div className={styles.glowOrb} aria-hidden />
      <div className={styles.accentBeam} aria-hidden />

      <div className={styles.inner}>
        <header className={styles.head}>
          {reduce ? (
            <>
              <p className={styles.eyebrow}>Enterprise</p>
              <h2 id="enterprise-heading" className={styles.title}>
                <span className={styles.titleMuted}>Enterprise —</span>
                <span className={styles.titleHot}>custom AI-driven ecosystem</span>
              </h2>
              <p className={styles.lead}>
                For groups and universities that need white-label branding, bespoke workflows,
                multi-institution control planes, and dedicated infrastructure — with APIs that meet
                your security and data residency policies.
              </p>
            </>
          ) : (
            <>
              <motion.p
                className={styles.eyebrow}
                initial={{ opacity: 0, letterSpacing: "0.32em" }}
                whileInView={{ opacity: 1, letterSpacing: "0.22em" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
              >
                Enterprise
              </motion.p>
              <motion.h2
                id="enterprise-heading"
                className={styles.title}
                variants={headLine}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                <span className={styles.titleMuted}>Enterprise —</span>
                <span className={styles.titleHot}>custom AI-driven ecosystem</span>
              </motion.h2>
              <motion.p
                className={styles.lead}
                variants={leadLine}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                For groups and universities that need white-label branding, bespoke workflows,
                multi-institution control planes, and dedicated infrastructure — with APIs that meet
                your security and data residency policies.
              </motion.p>
            </>
          )}
        </header>
      </div>

      <div className={styles.headBridge} aria-hidden />

      <div className={styles.visualBand} ref={visualRef}>
        <div className={styles.visualLayout}>
          <motion.div
            className={styles.visualPrimary}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease }}
          >
            <div className={styles.visualFrame}>
              <motion.div style={{ scale: imgScale, y: imgY }} className={styles.imgMotion}>
                <Image
                  src={homeImages.enterpriseArch}
                  alt={homeImages.enterpriseArchAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 58vw"
                  className={styles.cover}
                  priority={false}
                />
              </motion.div>
              <div className={styles.visualShine} aria-hidden />
              <div className={styles.visualFrameAccent} aria-hidden />
              <motion.div
                className={styles.caption}
                initial={reduce ? false : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12, ease }}
              >
                <h3>Architecture that scales with your group</h3>
                <p>
                  Isolated environments, integration layers for legacy SIS/ERP, and governance built for
                  multi-campus rollouts — not a one-size template.
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className={styles.rail}
            role="complementary"
            aria-label="Enterprise capabilities"
            initial={reduce ? false : { opacity: 0, x: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
          >
            <p className={styles.railEyebrow}>Built for scale</p>
            <ul className={styles.railList}>
              {RAIL.map(({ Icon, title, text }) => (
                <li key={title} className={styles.railItem}>
                  <span className={styles.railIcon} aria-hidden>
                    <Icon size={18} strokeWidth={2.25} />
                  </span>
                  <span className={styles.railBody}>
                    <span className={styles.railTitle}>{title}</span>
                    <span className={styles.railText}>{text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/demo" className={styles.railCta}>
              Book enterprise demo
              <span aria-hidden> →</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {reduce ? (
        <div className={styles.cardGrid}>
          {CARDS.map((c) => (
            <div key={c.t} className={styles.card}>
              <span className={styles.cardGlow} aria-hidden />
              <div className={styles.icon}>{c.icon}</div>
              <h3 className={styles.cardTitle}>{c.t}</h3>
              <p className={styles.cardText}>{c.d}</p>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className={styles.cardGrid}
          variants={cardsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {CARDS.map((c) => (
            <motion.article key={c.t} className={styles.card} variants={cardItem}>
              <span className={styles.cardGlow} aria-hidden />
              <div className={styles.icon}>{c.icon}</div>
              <h3 className={styles.cardTitle}>{c.t}</h3>
              <p className={styles.cardText}>{c.d}</p>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
