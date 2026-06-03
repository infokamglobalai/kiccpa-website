"use client";

import { statsHome } from "./homeContent";
import styles from "./HeroImpactSection.module.css";

/** Four impact metrics — sits below hero copy/image (no overlap) */
export default function HeroImpactSection() {
  return (
    <div className={styles.fold} aria-label="Platform highlights">
      <div className={styles.statsStrip} aria-label="Impact metrics">
        {statsHome.map((s) => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.statValue}>{s.value}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
