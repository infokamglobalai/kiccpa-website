"use client";

import { MotionReveal } from "@/components/ui";
import PremiumEcosystemDiagram from "./PremiumEcosystemDiagram";
import styles from "./PremiumPackageSection.module.css";

const LEFT = [
  {
    title: "Student Management",
    body: "Profiles, admissions, attendance, parent linkage.",
    plus: false,
  },
  {
    title: "Communication",
    body: "Announcements, circulars, notifications, parent-teacher.",
    plus: true,
  },
  {
    title: "Canteen System",
    body: "Digital menus, pre-orders, wallet payments, vendor management.",
    plus: false,
  },
] as const;

const RIGHT = [
  {
    title: "Fee Management",
    body: "Structure setup, online payments, receipts, tracking.",
  },
  {
    title: "Academic Results",
    body: "Exam configuration, marks entry, report cards, analytics.",
  },
  {
    title: "Transport Tracking",
    body: "GPS-based real-time bus tracking with parent alerts.",
  },
] as const;

export default function PremiumPackageSection() {
  return (
    <section className={styles.section} aria-labelledby="premium-package-heading">
      <div className={styles.inner}>
        <MotionReveal>
          <header className={styles.header}>
            <p className={styles.eyebrow}>All-in-one platform</p>
            <h2 id="premium-package-heading" className={styles.title}>
              LMS Premium Package: All-in-One Solution
            </h2>
            <p className={styles.lead}>
              The Premium Package combines Standard LMS features with a complete School
              Management System, eliminating the need for multiple software solutions.
              Everything from academics to operations, finance to logistics in one unified
              platform.
            </p>
          </header>
        </MotionReveal>

        <div className={styles.grid3}>
          <MotionReveal delay={0.05} y={20} className={styles.colLeft}>
            {LEFT.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
                {item.plus && (
                  <div className={styles.plusHint}>
                    <span aria-hidden>+</span>
                  </div>
                )}
              </div>
            ))}
          </MotionReveal>

          <MotionReveal delay={0.08} y={24} className={styles.colCenter}>
            <PremiumEcosystemDiagram />
          </MotionReveal>

          <MotionReveal delay={0.05} y={20} className={styles.colRight}>
            {RIGHT.map((item) => (
              <div key={item.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
