"use client";

import { Rocket, Shield, Sparkles } from "lucide-react";
import styles from "./HeroPillarsStrip.module.css";

const pillars = [
  { title: "Scalable & Secure", hint: "Enterprise-grade security", Icon: Shield },
  { title: "AI-Powered", hint: "Smarter insights & automation", Icon: Sparkles },
  { title: "Future Ready", hint: "Built for tomorrow's challenges", Icon: Rocket },
] as const;

export default function HeroPillarsStrip() {
  return (
    <section className={styles.strip} aria-label="Why teams choose KICCPA">
      <p className={styles.title}>Why teams choose KICCPA</p>
      <div className={styles.pillars}>
        {pillars.map(({ title, hint, Icon }) => (
          <article key={title} className={styles.pillar}>
            <Icon size={18} strokeWidth={2} aria-hidden className={styles.icon} />
            <div>
              <span className={styles.pillarTitle}>{title}</span>
              <span className={styles.pillarHint}>{hint}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
