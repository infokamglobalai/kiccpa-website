"use client";

import { MotionReveal, Tilt3D } from "@/components/ui";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { homeImages } from "./homeContent";
import styles from "./SchoolManagementSection.module.css";

const MARQUEE_ITEMS = [
  "Admissions",
  "Fees",
  "Attendance",
  "Transport",
  "AI intelligence",
  "One secure login",
  "Enrollment → alumni",
  "Operational digitization",
] as const;

const PILL_ITEMS = [
  { e: "🪪", l: "Student info" },
  { e: "📅", l: "Attendance" },
  { e: "👥", l: "Staff" },
  { e: "📊", l: "Academic tracking" },
] as const;

const CARDS = [
  {
    t: "Core ERP",
    d: "Profiles, admissions, guardians, documents, and alumni in one secure record system with audit-friendly history.",
  },
  {
    t: "Staff management",
    d: "Roles, workload, leave, payroll hand-offs, and performance workflows with clear accountability.",
  },
  {
    t: "Attendance intelligence",
    d: "RFID, biometric, or app-based capture with parent alerts, trend analytics, and compliance exports.",
  },
] as const;

export default function SchoolManagementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-5%", "5%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [1.035, 1, 1.02]);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="sms-heading">
      <div className={styles.inner}>
        <MotionReveal y={22}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Operations &amp; ERP</p>
            <h2 id="sms-heading" className={styles.title}>
              Comprehensive{" "}
              <span className={styles.titleAccent}>school management</span> system
            </h2>
            <p className={styles.lead}>
              ERP depth beneath the LMS: admissions, fees, attendance, transport, and AI
              intelligence — one secure login for leadership, staff, and families. Operational
              digitization from enrollment to alumni, aligned with how modern schools actually
              run.
            </p>
          </header>
        </MotionReveal>

        <div className={styles.marqueeWrap} aria-hidden>
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span key={`${item}-${i}`} className={styles.marqueeItem}>
                  <span>◆</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.visualCol}>
            <MotionReveal y={28} className={styles.visualBundle}>
              <div className={styles.visualGlow} aria-hidden />
              <div className={styles.visualAura} aria-hidden />

              <Tilt3D intensity={10} className={styles.tiltShell}>
                <div className={styles.visualStage}>
                  <span className={styles.cornerAcc} aria-hidden />
                  <span className={`${styles.cornerAcc} ${styles.cornerTr}`} aria-hidden />

                  <div className={styles.visualRim} aria-hidden />
                  <div className={styles.visualFrame}>
                    <span className={styles.visualBadge}>
                      <span className={styles.badgeDot} aria-hidden />
                      End-to-end digitization
                    </span>
                    <div className={styles.visualShine} aria-hidden />
                    <div className={styles.visualVignette} aria-hidden />
                    <motion.div className={styles.visualInner} style={{ y: imgY, scale: imgScale }}>
                      <Image
                        src={homeImages.schoolOps}
                        alt={homeImages.schoolOpsAlt}
                        fill
                        sizes="(max-width: 960px) 100vw, 48vw"
                        className={styles.cover}
                      />
                    </motion.div>
                  </div>
                </div>
              </Tilt3D>
            </MotionReveal>
          </div>

          <div>
            <div className={styles.pills}>
              {PILL_ITEMS.map((x, i) => (
                <MotionReveal key={x.l} delay={i * 0.05} y={16}>
                  <div className={styles.pill}>
                    <div className={styles.pillEmoji}>{x.e}</div>
                    <div className={styles.pillLabel}>{x.l}</div>
                  </div>
                </MotionReveal>
              ))}
            </div>

            <div className={styles.bento}>
              {CARDS.map((c, i) => (
                <motion.article
                  key={c.t}
                  className={styles.card}
                  initial={reduce ? undefined : { opacity: 0, x: 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <div className={styles.cardNum}>0{i + 1}</div>
                  <h3 className={styles.cardTitle}>{c.t}</h3>
                  <p className={styles.cardText}>{c.d}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
