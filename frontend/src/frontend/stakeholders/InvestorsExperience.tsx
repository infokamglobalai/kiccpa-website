"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealCard } from "./stakeholderMotion";
import styles from "./InvestorsExperience.module.css";

const metrics = [
  { val: "8–14 mo", label: "Typical payback window in institutional pilots" },
  { val: "35%", label: "Reduction in at-risk cases vs. baseline (reported cohorts)" },
  { val: "4 sec", label: "Board-ready analytics export vs. weeks of manual work" },
  { val: "Multi", label: "Portfolio roll-up for groups and education holding companies" },
];

export default function InvestorsExperience() {
  return (
    <div className={styles.page}>
      <div className={styles.metrics}>
        <div className={styles.metricRow}>
          {metrics.map((m, i) => (
            <RevealCard key={m.val} className={styles.metricCard} delay={0.06 * i}>
              <div className={styles.metricVal}>{m.val}</div>
              <div className={styles.metricLabel}>{m.label}</div>
            </RevealCard>
          ))}
        </div>
      </div>

      <Reveal className={styles.section} delay={0.04}>
        <h2 className={styles.sectionTitle}>Governance-grade visibility — not slide decks</h2>
        <div className={styles.twoCol}>
          <div className={styles.panel}>
            <h3>📊 Academic & portfolio ROI</h3>
            <ul>
              <li>Unified KPIs across campuses: attainment, risk, teacher load, and parent adoption.</li>
              <li>Scenario views for expansion: new grades, new schools, or new regions.</li>
              <li>Outcome-linked metrics suitable for board packs and investor diligence.</li>
            </ul>
          </div>
          <div className={styles.panel}>
            <h3>🏛️ Compliance & assurance</h3>
            <ul>
              <li>Regional data residency options (e.g. AWS Mumbai / Bahrain) with audit trails.</li>
              <li>Role-based access aligned to governance bodies and external auditors.</li>
              <li>Documentation exports for ministry, accreditation, and group policy reviews.</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.section} delay={0.06}>
        <div className={styles.twoCol}>
          <div className={styles.panel}>
            <h3>📑 Board & investor reporting</h3>
            <ul>
              <li>One-click executive summaries — live data, not three-month-old spreadsheets.</li>
              <li>Transparent drill-down from headline KPIs to class and student cohorts.</li>
              <li>Side-by-side comparison across schools in a group for benchmarking.</li>
            </ul>
          </div>
          <div className={styles.panel}>
            <h3>🚀 Strategic differentiation</h3>
            <ul>
              <li>AI-native platform: predictive risk and adaptive learning as core, not add-ons.</li>
              <li>Bilingual English–Arabic with RTL and Arabic NLP — built for GCC expansion.</li>
              <li>Enterprise integrations: payments, SMS, biometric, and existing SIS where needed.</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.visualBanner} delay={0.05}>
        <div className={styles.bannerInner}>
          <Image
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80"
            alt=""
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            className={styles.bannerImg}
          />
          <div className={styles.bannerOverlay}>
            <p className={styles.bannerQuote}>
              &ldquo;When the ROI dashboard went live at our last board meeting,{" "}
              <span>the data spoke for itself</span> — there were no questions left on academic return
              or operational leverage.&rdquo;
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.cta} delay={0.06}>
        <Link href="/contact" className={styles.ctaBtn}>
          Request investor & board briefing →
        </Link>
        <p className={styles.ctaNote}>
          Under NDA: cohort benchmarks, sample board pack, and deployment timelines for groups.
        </p>
      </Reveal>
    </div>
  );
}
