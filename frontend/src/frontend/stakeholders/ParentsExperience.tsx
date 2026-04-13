"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, RevealCard } from "./stakeholderMotion";
import styles from "./ParentsExperience.module.css";

const features = [
  {
    icon: "📱",
    title: "Daily learning summary",
    desc: "A clear evening digest of what your child studied, scored, and what is due next — in English or Arabic.",
  },
  {
    icon: "⚠️",
    title: "Early alerts",
    desc: "Risk signals surface before report cards — so you can partner with teachers while intervention still works.",
  },
  {
    icon: "🌐",
    title: "Arabic-first experience",
    desc: "Full RTL interface for Kuwait families, Hijri-aware dates, and notifications that read naturally in Arabic.",
  },
  {
    icon: "💬",
    title: "Direct teacher messaging",
    desc: "Structured conversations tied to subjects and assessments — no more lost threads across chat apps.",
  },
  {
    icon: "📊",
    title: "Progress, not just grades",
    desc: "Topic mastery, engagement, and behaviour context — the same signals teachers see, simplified for home.",
  },
  {
    icon: "🔔",
    title: "Real-time results",
    desc: "Know when assessments are graded with instant summaries and optional detailed rubric view.",
  },
];

export default function ParentsExperience() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBridge} aria-hidden>
        <span className={styles.pageBridgeLine} />
      </div>
      <section className={styles.split}>
        <div className={styles.splitVisual}>
          <Image
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1400&q=80"
            alt="Parent and child learning together"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.coverImg}
            priority
          />
          <div className={styles.splitOverlay} aria-hidden />
          <div className={styles.splitFrame} aria-hidden />
        </div>
        <Reveal className={styles.splitContent}>
          <p className={styles.kicker}>Parent &amp; guardian experience</p>
          <h2 className={styles.h2}>
            Clarity every day — <em>not once a term</em>
          </h2>
          <p className={styles.lead}>
            KICCPA LMS was built so parents see learning as it happens: mastery trends, risk flags,
            and teacher communication in one calm, bilingual app experience.
          </p>
          <div className={styles.pillRow}>
            <span className={styles.pill}>English &amp; Arabic</span>
            <span className={styles.pill}>Mobile-first</span>
            <span className={styles.pill}>84% adoption typical</span>
          </div>
        </Reveal>
      </section>

      <section className={styles.grid}>
        {features.map((f, i) => (
          <RevealCard key={f.title} className={styles.feat} delay={0.05 * i}>
            <div className={styles.featIcon}>{f.icon}</div>
            <h3 className={styles.featTitle}>{f.title}</h3>
            <p className={styles.featDesc}>{f.desc}</p>
          </RevealCard>
        ))}
      </section>

      <Reveal className={styles.stats} delay={0.06}>
        <div className={styles.statsInner}>
          <div className={styles.statBlock}>
            <div className={styles.statVal}>84%</div>
            <div className={styles.statLabel}>
              Average parent portal adoption within six months of rollout
            </div>
          </div>
          <div className={styles.statBlock}>
            <div className={styles.statVal}>30s</div>
            <div className={styles.statLabel}>
              Typical time to read the daily summary on your phone
            </div>
          </div>
          <div className={styles.statBlock}>
            <div className={styles.statVal}>2-way</div>
            <div className={styles.statLabel}>
              Secure messaging with teachers, aligned to subjects and milestones
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.steps} delay={0.04}>
        <h2 className={styles.stepsTitle}>How parents get value — in three steps</h2>
        <div className={styles.stepRow}>
          <div className={styles.step}>
            <span className={styles.stepNum}>01</span>
            <h3>Connect once</h3>
            <p>
              School issues your secure login; you choose Arabic or English as the default language
              for all notifications.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>02</span>
            <h3>Stay in the loop</h3>
            <p>
              Evening summaries and instant alerts replace guesswork — you see engagement and risk
              signals alongside grades.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNum}>03</span>
            <h3>Act early</h3>
            <p>
              Message teachers, join PTMs with context, and track improvement plans without chasing
              information across channels.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className={styles.cta} delay={0.06}>
        <Link href="/contact" className={styles.btn}>
          Request parent-app walkthrough →
        </Link>
      </Reveal>
    </div>
  );
}
