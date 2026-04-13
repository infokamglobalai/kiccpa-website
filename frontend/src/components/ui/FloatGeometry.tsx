"use client";

import styles from "./FloatGeometry.module.css";

/** Decorative pseudo-3D planes — lightweight, no WebGL */
export default function FloatGeometry() {
  return (
    <div className={styles.scene} aria-hidden>
      <div className={`${styles.plane} ${styles.p1}`} />
      <div className={`${styles.plane} ${styles.p2}`} />
      <div className={`${styles.plane} ${styles.p3}`} />
      <div className={styles.ring} />
    </div>
  );
}
