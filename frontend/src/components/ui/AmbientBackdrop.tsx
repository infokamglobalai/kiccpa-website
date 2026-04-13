"use client";

import styles from "./AmbientBackdrop.module.css";

type Variant = "navy" | "teal" | "warm";

type AmbientBackdropProps = {
  variant?: Variant;
  className?: string;
};

export default function AmbientBackdrop({
  variant = "navy",
  className = "",
}: AmbientBackdropProps) {
  return (
    <div
      className={`${styles.wrap} ${styles[variant]} ${className}`}
      aria-hidden
    >
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
      <div className={styles.shimmer} />
    </div>
  );
}
