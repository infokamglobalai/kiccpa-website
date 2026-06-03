"use client";

import FounderMessage from "@/components/FounderMessage/FounderMessage";
import { MotionReveal } from "@/components/ui";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ECOSYSTEM_PLATFORMS,
  ECOSYSTEM_STATS,
  GCC_VISION,
  HERO_IMAGE,
  KUWAIT_VISION,
  LEARNX_CTA,
  LEARNX_TAGLINE,
  MISSION_COMMITMENTS,
  MISSION_INTRO,
  MISSION_OUTCOMES,
  VISION_ALIGNMENTS,
  VISION_CLOSING,
  VISION_GOALS,
  VISION_INTRO,
} from "./learnxContent";
import styles from "./LearnX.module.css";

const platformIcons = [GraduationCap, Building2, Users] as const;

export default function LearnXPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroMesh} aria-hidden />
        <div className={styles.heroGlow} aria-hidden />
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <MotionReveal variant="soft" y={20}>
            <div>
              <span className={styles.eyebrow}>LearnX Ecosystem</span>
              <h1 className={styles.heroTitle}>
                Vision for <em>smarter education</em>
              </h1>
              <p className={styles.heroLead}>{LEARNX_TAGLINE}</p>
              <div className={styles.heroTags}>
                {VISION_ALIGNMENTS.map((tag) => (
                  <span key={tag} className={styles.heroTag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.heroCtas}>
                <Link href="/demo" className={styles.btnPrimary}>
                  Book a demo
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <Link href="/schools" className={styles.btnGhost}>
                  For schools
                </Link>
                <Link href="/products#packages" className={styles.btnGhost}>
                  View packages
                </Link>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal variant="media" y={24}>
            <div className={styles.heroVisual}>
              <Image
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                fill
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 48vw"
                priority
              />
              <p className={styles.heroVisualBadge}>
                LMS · SMS · HRMS — one connected ecosystem
              </p>
            </div>
          </MotionReveal>
        </div>
      </header>

      <section className={styles.stats} aria-label="Ecosystem at a glance">
        <div className={styles.statsGrid}>
          {ECOSYSTEM_STATS.map((s, i) => (
            <MotionReveal key={s.label} variant="soft" y={12} delay={i * 0.04}>
              <div className={styles.statCard}>
                <div className={styles.statVal}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statHint}>{s.hint}</div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section className={styles.platforms} aria-labelledby="platforms-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>The ecosystem</p>
              <h2 id="platforms-heading" className={styles.sectionTitle}>
                Three platforms, <em>one fabric</em>
              </h2>
              <p className={styles.sectionLead}>
                LearnX connects learning, school operations, and people management—so leadership,
                staff, and families work from a single intelligent stack.
              </p>
            </header>
          </MotionReveal>
          <ul className={styles.platformGrid}>
            {ECOSYSTEM_PLATFORMS.map((p, i) => {
              const Icon = platformIcons[i] ?? BookOpen;
              return (
                <li key={p.name}>
                  <MotionReveal variant="soft" delay={i * 0.06} y={18}>
                    <Link href={p.href} className={styles.platformCard}>
                      <span className={styles.platformBadge}>{p.name}</span>
                      <span className={styles.platformIconWrap} aria-hidden>
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <h3 className={styles.platformTitle}>{p.title}</h3>
                      <p className={styles.platformDesc}>{p.desc}</p>
                      <span className={styles.platformLink}>
                        Explore {p.name}
                        <ArrowRight size={14} aria-hidden />
                      </span>
                    </Link>
                  </MotionReveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={styles.section} id="vision" aria-labelledby="vision-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={18}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Our vision</p>
              <h2 className={styles.sectionTitle} id="vision-heading">
                Leading AI-powered <em>education</em> in the GCC
              </h2>
              <p className={styles.sectionLead}>{VISION_INTRO}</p>
            </header>
          </MotionReveal>
          <ul className={styles.goalGrid}>
            {VISION_GOALS.map((goal) => (
              <li key={goal} className={styles.goalItem}>
                <span className={styles.goalIcon} aria-hidden>
                  <Check size={14} strokeWidth={2.5} />
                </span>
                {goal}
              </li>
            ))}
          </ul>
          <p className={styles.highlightBand}>{VISION_CLOSING}</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="mission" aria-labelledby="mission-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={18}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Our mission</p>
              <h2 className={styles.sectionTitle} id="mission-heading">
                Revolutionize education through <em>AI &amp; digital solutions</em>
              </h2>
              <p className={styles.sectionLead}>{MISSION_INTRO}</p>
            </header>
          </MotionReveal>

          <div className={styles.missionBlock}>
            <div>
              <p className={styles.missionLabel}>LearnX is committed to:</p>
              <ul className={styles.goalGrid}>
                {MISSION_COMMITMENTS.map((item) => (
                  <li key={item} className={styles.goalItem}>
                    <span className={styles.goalIcon} aria-hidden>
                      <Sparkles size={14} strokeWidth={2.25} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <MotionReveal variant="soft" y={20}>
              <aside className={styles.outcomesCard}>
                <h3 className={styles.outcomesTitle}>Education becomes:</h3>
                <div className={styles.outcomes}>
                  {MISSION_OUTCOMES.map((o) => (
                    <span key={o} className={styles.outcome}>
                      {o}
                    </span>
                  ))}
                </div>
              </aside>
            </MotionReveal>
          </div>
        </div>
      </section>

      <FounderMessage variant="full" showLearnXLink={false} id="founder" />

      <section className={styles.section} id="alignment" aria-labelledby="alignment-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={18}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Regional alignment</p>
              <h2 className={styles.sectionTitle} id="alignment-heading">
                Kuwait &amp; GCC <em>vision alignment</em>
              </h2>
              <p className={styles.sectionLead}>
                Built for national digital transformation agendas—from New Kuwait to GCC smart
                government and campus modernization.
              </p>
            </header>
          </MotionReveal>
          <div className={styles.alignmentGrid}>
            <MotionReveal variant="soft" y={20}>
              <article className={styles.alignCard}>
                <h3>{KUWAIT_VISION.title}</h3>
                <p>{KUWAIT_VISION.intro}</p>
                <ul className={styles.alignList}>
                  {KUWAIT_VISION.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </MotionReveal>
            <MotionReveal variant="soft" y={20} delay={0.08}>
              <article className={styles.alignCard}>
                <h3>{GCC_VISION.title}</h3>
                <p>{GCC_VISION.intro}</p>
                <ul className={styles.alignList}>
                  {GCC_VISION.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="learnx-cta-heading">
        <MotionReveal variant="soft" y={18}>
          <div className={styles.ctaInner}>
            <h2 id="learnx-cta-heading" className={styles.ctaTitle}>
              {LEARNX_CTA.title}
              <br />
              <em>{LEARNX_CTA.titleAccent}</em>
            </h2>
            <p className={styles.ctaLead}>{LEARNX_CTA.lead}</p>
            <div className={styles.ctaBtns}>
              <Link href="/demo" className={styles.ctaPrimary}>
                Book a demo
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/schools" className={styles.ctaGhost}>
                For schools
              </Link>
              <Link href="/products#packages" className={styles.ctaGhost}>
                Packages
              </Link>
              <Link href="/resources" className={styles.ctaGhost}>
                Resources
              </Link>
            </div>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
}
