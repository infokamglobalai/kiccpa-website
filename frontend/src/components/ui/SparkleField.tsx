"use client";

import styles from "./SparkleField.module.css";

function SparkleSvg({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 2.8c.7 6 2.2 9.1 7.2 10-5 .9-6.5 4-7.2 10-.7-6-2.2-9.1-7.2-10 5-.9 6.5-4 7.2-10Z"
        fill="url(#g1)"
      />
      <path
        d="M6.7 15.4c.35 3.1 1.2 4.7 3.8 5.15-2.6.45-3.45 2.05-3.8 5.15-.35-3.1-1.2-4.7-3.8-5.15 2.6-.45 3.45-2.05 3.8-5.15Z"
        fill="url(#g2)"
        opacity="0.9"
      />
      <defs>
        <linearGradient id="g1" x1="10" y1="5" x2="24" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF823F" />
          <stop offset="0.55" stopColor="#FFE1CF" />
          <stop offset="1" stopColor="#1B4370" />
        </linearGradient>
        <linearGradient id="g2" x1="2" y1="15" x2="12" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD3BC" />
          <stop offset="1" stopColor="#FF823F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Subtle sparkle accents (like your screenshot) for premium sections.
 * Place inside a relatively-positioned container; this component is absolute-fill.
 */
export default function SparkleField() {
  return (
    <div className={styles.wrap} aria-hidden>
      <div className={`${styles.orb} ${styles.o1}`} />
      <div className={`${styles.orb} ${styles.o2}`} />
      <SparkleSvg className={`${styles.sparkle} ${styles.s1}`} />
      <SparkleSvg className={`${styles.sparkle} ${styles.s2}`} />
      <SparkleSvg className={`${styles.sparkle} ${styles.s3}`} />
      <SparkleSvg className={`${styles.sparkle} ${styles.s4}`} />
    </div>
  );
}

