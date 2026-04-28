"use client";

import { MotionReveal } from "@/components/ui";
import Image from "next/image";
import styles from "./WhoWeAreSection.module.css";

export default function WhoWeAreSection() {
  return (
    <section className={styles.section} aria-labelledby="who-we-are-title">
      <div className={styles.container}>
        <div className={styles.grid}>
          <MotionReveal variant="soft" y={20} className={styles.copy}>
            <p className={styles.eyebrow}>Our Identity</p>
            <h2 id="who-we-are-title" className={styles.title}>Who We Are</h2>
            <div className={styles.content}>
              <p className={styles.lead}>
                KICCPA is a technology solutions provider delivering custom-built and 
                enterprise-grade software across multiple industries.
              </p>
              <div className={styles.points}>
                <div className={styles.point}>
                  <div className={styles.pointIcon}>✦</div>
                  <p>
                    We combine AI, technology, data, and automation to create solutions 
                    that are not just functional—but transformational.
                  </p>
                </div>
                <div className={styles.point}>
                  <div className={styles.pointIcon}>✦</div>
                  <p>
                    We don’t just build software—we enable intelligent business ecosystems.
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>
          <MotionReveal variant="media" className={styles.visualWrap}>
            <div className={styles.visual}>
              <Image
                src="/images/business-tech-ecosystem.png"
                alt="Intelligent Business Ecosystems"
                fill
                className={styles.image}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className={styles.overlay} />
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
