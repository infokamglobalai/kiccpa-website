import { MotionReveal } from "@/components/ui";
import Link from "next/link";
import styles from "./LmsPlatformStack.module.css";

const pillars = [
  {
    emoji: "🧠",
    tech: "Artificial Intelligence",
    title: "Adaptive Learning Paths",
    tint: styles.t1,
    desc: "Every student receives a unique, dynamically adjusted learning journey. The ML engine continuously monitors comprehension and adapts content difficulty — challenge without discouragement.",
    bullets: [
      "Individual learning profile built from day one",
      "Content difficulty self-adjusts in real time",
      "Learning style detection: visual, auditory, kinesthetic",
      "Spaced repetition for long-term mastery",
    ],
  },
  {
    emoji: "⚡",
    tech: "Machine Learning",
    title: "Predictive Student Analytics",
    tint: styles.t2,
    desc: "Monitor 40+ behavioral and academic indicators per student. Identify at-risk students 4–6 weeks before academic failure occurs — when intervention can still make a difference.",
    bullets: [
      "AI risk score updated daily per student",
      "Automated alerts to teachers and parents",
      "Topic-level mastery map per class",
      "Curriculum gap identification from assessment data",
    ],
  },
  {
    emoji: "💬",
    tech: "Natural Language Processing",
    title: "AI-Powered Feedback Engine",
    tint: styles.t3,
    desc: "Students receive instant, structured written feedback on assessments — in English or Arabic — within 30 seconds of submission. No waiting. No marking queue.",
    bullets: [
      "Rubric-based feedback with teacher approval flow",
      "Arabic NLP: full RTL feedback in Arabic script",
      "Question-level analytics after every class assessment",
      "AI Curriculum Insight after each assessment",
    ],
  },
  {
    emoji: "📊",
    tech: "Data Science",
    title: "Parent Engagement Portal",
    tint: styles.t4,
    desc: "84% parent adoption within 6 months. Parents receive daily learning summaries, real-time assessment results, and early alerts — in English or Arabic, on any device.",
    bullets: [
      "Daily learning summary sent every evening",
      "Real-time assessment result notifications",
      "Direct teacher messaging in English or Arabic",
      "Monthly progress reports, auto-generated",
    ],
  },
];

export default function LmsPlatformStack() {
  return (
    <section className={`${styles.section} rv`} aria-labelledby="platform-stack-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>Platform capabilities</p>
          <h2 id="platform-stack-heading" className={styles.title}>
            Four technologies. One platform.
          </h2>
          <p className={styles.sub}>
            Not AI as a marketing claim — AI as the engine of every decision the platform makes.
            <span className={styles.subEm}>One outcome: every student succeeds.</span>
          </p>
        </header>

        <div className={styles.grid}>
          {pillars.map((p, i) => (
            <MotionReveal key={p.title} delay={i * 0.06} y={36}>
              <article className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={`${styles.icon} ${p.tint}`} aria-hidden>
                    {p.emoji}
                  </div>
                  <div>
                    <p className={styles.label}>{p.tech}</p>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                  </div>
                </div>
                <p className={styles.desc}>{p.desc}</p>
                <ul className={styles.bullets}>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Link href="/features" className={styles.link}>
                  Learn more →
                </Link>
              </article>
            </MotionReveal>
          ))}
        </div>

        <div className={styles.footer}>
          <Link href="/features" className={styles.viewAll}>
            View all platform features →
          </Link>
        </div>
      </div>
    </section>
  );
}
