"use client";

import MotionReveal from "./MotionReveal";
import styles from "./QuoteStrip.module.css";

type QuoteStripProps = {
  quotes: string[];
  className?: string;
};

export default function QuoteStrip({ quotes, className = "" }: QuoteStripProps) {
  const items = quotes.length > 0 ? [...quotes, ...quotes] : [];

  return (
    <section className={`${styles.section} ${className}`} aria-label="Highlights">
      <div className={styles.inner}>
        <MotionReveal variant="soft" y={14}>
          <div className={styles.rail}>
            <div className={styles.track}>
              {items.map((q, i) => (
                <div key={`${q}-${i}`} className={styles.item}>
                  <span className={styles.mark} aria-hidden>
                    ✦
                  </span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

