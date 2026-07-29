"use client";

import { MotionReveal } from "@/components/ui";
import {
  ArrowRight,
  Bot,
  Building2,
  Bus,
  Check,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AI_STUDIO,
  BEFORE_AFTER,
  COMPARISON,
  ECOSYSTEM_STATS,
  FAQ,
  FINAL_CTA,
  HERO,
  HOW_IT_WORKS,
  LEARNX_CTA,
  MODULES,
  PILLARS,
  PROOF,
  ROLES,
  SECURITY,
  TRUST_STRIP,
  WHAT_IS,
} from "./learnxContent";
import styles from "./LearnX.module.css";

const pillarIcons = [Building2, LayoutDashboard, Users, Bot, Shield] as const;
const moduleIcons = [
  FileText,
  GraduationCap,
  Users,
  LayoutDashboard,
  Check,
  FileText,
  Sparkles,
  Wallet,
  MessageSquare,
  Bus,
  Building2,
  Bot,
] as const;

export default function LearnXPage() {
  const [roleId, setRoleId] = useState<(typeof ROLES)[number]["id"]>("principal");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const activeRole = ROLES.find((r) => r.id === roleId) ?? ROLES[0];

  return (
    <div className={styles.page}>
      {/* 1. HERO */}
      <header className={styles.hero}>
        <div className={styles.heroMesh} aria-hidden />
        <div className={styles.heroGlow} aria-hidden />
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <MotionReveal variant="soft" y={20}>
            <div>
              <span className={styles.eyebrow}>{HERO.eyebrow}</span>
              <h1 className={styles.heroTitle}>{HERO.headline}</h1>
              <p className={styles.heroLead}>{HERO.subheadline}</p>
              <div className={styles.heroTags}>
                {HERO.trustLine.map((tag) => (
                  <span key={tag} className={styles.heroTag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.heroCtas}>
                <Link href={HERO.primaryCta.href} className={styles.btnPrimary}>
                  {HERO.primaryCta.label}
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <a href={HERO.secondaryCta.href} className={styles.btnGhost}>
                  {HERO.secondaryCta.label}
                </a>
                <Link href={HERO.tertiaryCta.href} className={styles.btnGhost}>
                  {HERO.tertiaryCta.label}
                </Link>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal variant="media" y={24}>
            <div className={styles.heroVisual}>
              <Image
                src={HERO.image.src}
                alt={HERO.image.alt}
                fill
                className={styles.heroImage}
                sizes="(max-width: 900px) 100vw, 48vw"
                priority
              />
              <p className={styles.heroVisualBadge}>
                School ERP · LMS · AI Academic Studio — one connected platform
              </p>
            </div>
          </MotionReveal>
        </div>
      </header>

      {/* Stats / trust metrics */}
      <section className={styles.stats} aria-label="LearnX at a glance">
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

      {/* 2. TRUST STRIP */}
      <section className={styles.trust} aria-labelledby="trust-heading">
        <div className={styles.container}>
          <p id="trust-heading" className={styles.trustTitle}>
            {TRUST_STRIP.title}
          </p>
          <ul className={styles.trustLogos}>
            {TRUST_STRIP.logos.map((name) => (
              <li key={name} className={styles.trustLogo}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. WHAT IS LEARNX */}
      <section className={styles.section} id="what-is" aria-labelledby="what-heading">
        <div className={`${styles.container} ${styles.split}`}>
          <MotionReveal variant="soft" y={18}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>{WHAT_IS.eyebrow}</p>
              <h2 id="what-heading" className={styles.sectionTitle}>
                {WHAT_IS.title}
              </h2>
              {WHAT_IS.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className={styles.bodyCopy}>
                  {p}
                </p>
              ))}
            </header>
          </MotionReveal>
          <MotionReveal variant="media" y={20}>
            <div className={styles.mediaFrame}>
              <Image
                src={WHAT_IS.image.src}
                alt={WHAT_IS.image.alt}
                fill
                className={styles.mediaImg}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* 4. BEFORE / AFTER */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="before-after" aria-labelledby="ba-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>{BEFORE_AFTER.eyebrow}</p>
              <h2 id="ba-heading" className={styles.sectionTitle}>
                {BEFORE_AFTER.title}
              </h2>
            </header>
          </MotionReveal>
          <div className={styles.baGrid}>
            <article className={`${styles.baCard} ${styles.baBefore}`}>
              <h3>{BEFORE_AFTER.before.title}</h3>
              <ul>
                {BEFORE_AFTER.before.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className={`${styles.baCard} ${styles.baAfter}`}>
              <h3>{BEFORE_AFTER.after.title}</h3>
              <ul>
                {BEFORE_AFTER.after.items.map((item) => (
                  <li key={item}>
                    <Check size={14} strokeWidth={2.5} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 5. PILLARS */}
      <section className={styles.section} id="pillars" aria-labelledby="pillars-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Five product pillars</p>
              <h2 id="pillars-heading" className={styles.sectionTitle}>
                Everything a modern campus <em>needs — connected</em>
              </h2>
              <p className={styles.sectionLead}>
                Presence, operations, engagement, AI teaching tools, and multi-branch scale — modular by design.
              </p>
            </header>
          </MotionReveal>
          <ul className={styles.pillarGrid}>
            {PILLARS.map((p, i) => {
              const Icon = pillarIcons[i] ?? Sparkles;
              return (
                <li key={p.id}>
                  <MotionReveal variant="soft" y={18} delay={i * 0.05}>
                    <article className={styles.pillarCard}>
                      <span className={styles.pillarIcon} aria-hidden>
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <h3>{p.title}</h3>
                      <p className={styles.pillarShort}>{p.short}</p>
                      <p className={styles.pillarLong}>{p.long}</p>
                    </article>
                  </MotionReveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 6. AI STUDIO */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="ai-studio" aria-labelledby="ai-heading">
        <div className={styles.container}>
          <div className={styles.split}>
            <MotionReveal variant="soft" y={16}>
              <header className={styles.sectionHead}>
                <p className={styles.sectionEyebrow}>{AI_STUDIO.eyebrow}</p>
                <h2 id="ai-heading" className={styles.sectionTitle}>
                  {AI_STUDIO.title}
                </h2>
                <p className={styles.sectionLead}>{AI_STUDIO.lead}</p>
                <ul className={styles.extraChips}>
                  {AI_STUDIO.extras.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </header>
            </MotionReveal>
            <MotionReveal variant="media" y={20}>
              <div className={styles.mediaFrame}>
                <Image
                  src={AI_STUDIO.image.src}
                  alt={AI_STUDIO.image.alt}
                  fill
                  className={styles.mediaImg}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </div>
            </MotionReveal>
          </div>
          <ol className={styles.stepGrid}>
            {AI_STUDIO.steps.map((s, i) => (
              <li key={s.title} className={styles.stepCard}>
                <span className={styles.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. MODULES */}
      <section className={styles.section} id="modules" aria-labelledby="modules-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Module explorer</p>
              <h2 id="modules-heading" className={styles.sectionTitle}>
                Enable what you need. <em>Grow when ready.</em>
              </h2>
              <p className={styles.sectionLead}>
                Modular architecture for Indian academic workflows — unit tests, board exams, PTM, report cards, and daily ops.
              </p>
            </header>
          </MotionReveal>
          <ul className={styles.moduleGrid}>
            {MODULES.map((m, i) => {
              const Icon = moduleIcons[i % moduleIcons.length] ?? FileText;
              return (
                <li key={m.title} className={styles.moduleCard}>
                  <span className={styles.moduleIcon} aria-hidden>
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 8. ROLES */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="roles" aria-labelledby="roles-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>Role-based experience</p>
              <h2 id="roles-heading" className={styles.sectionTitle}>
                One system. <em>Clear jobs for every role.</em>
              </h2>
            </header>
          </MotionReveal>
          <div className={styles.roleTabs} role="tablist" aria-label="Stakeholder roles">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={roleId === r.id}
                className={roleId === r.id ? styles.roleTabActive : styles.roleTab}
                onClick={() => setRoleId(r.id)}
              >
                {r.label}
              </button>
            ))}
          </div>
          <article className={styles.rolePanel} role="tabpanel">
            <h3>{activeRole.title}</h3>
            <ul>
              {activeRole.points.map((p) => (
                <li key={p}>
                  <Check size={16} strokeWidth={2.5} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* 9. HOW IT WORKS */}
      <section className={styles.section} id="how" aria-labelledby="how-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>How it works</p>
              <h2 id="how-heading" className={styles.sectionTitle}>
                Live in four practical steps
              </h2>
            </header>
          </MotionReveal>
          <ol className={styles.howGrid}>
            {HOW_IT_WORKS.map((s) => (
              <li key={s.step} className={styles.howCard}>
                <span className={styles.howStep}>{s.step}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10. SECURITY */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="security" aria-labelledby="sec-heading">
        <div className={`${styles.container} ${styles.split}`}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>{SECURITY.eyebrow}</p>
              <h2 id="sec-heading" className={styles.sectionTitle}>
                {SECURITY.title}
              </h2>
              <p className={styles.sectionLead}>{SECURITY.lead}</p>
              <ul className={styles.secList}>
                {SECURITY.items.map((item) => (
                  <li key={item.title}>
                    <Lock size={16} aria-hidden />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </header>
          </MotionReveal>
          <MotionReveal variant="media" y={20}>
            <div className={styles.mediaFrame}>
              <Image
                src={SECURITY.image.src}
                alt={SECURITY.image.alt}
                fill
                className={styles.mediaImg}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* 11. COMPARISON */}
      <section className={styles.section} id="compare" aria-labelledby="cmp-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>{COMPARISON.eyebrow}</p>
              <h2 id="cmp-heading" className={styles.sectionTitle}>
                {COMPARISON.title}
              </h2>
            </header>
          </MotionReveal>
          <div className={styles.tableWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  {COMPARISON.columns.map((c) => (
                    <th key={c}>{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={`${row[0]}-${i}`} className={i === row.length - 1 ? styles.cmpHighlight : undefined}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 12. SOCIAL PROOF */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="proof" aria-labelledby="proof-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>{PROOF.eyebrow}</p>
              <h2 id="proof-heading" className={styles.sectionTitle}>
                {PROOF.title}
              </h2>
              <p className={styles.sectionLead}>{PROOF.lead}</p>
            </header>
          </MotionReveal>
          <ul className={styles.proofGrid}>
            {PROOF.items.map((item) => (
              <li key={item.metric} className={styles.proofCard}>
                <span className={styles.proofMetric}>{item.metric}</span>
                <blockquote>{item.quote}</blockquote>
                <cite>{item.role}</cite>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className={styles.section} id="faq" aria-labelledby="faq-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.sectionEyebrow}>FAQ</p>
              <h2 id="faq-heading" className={styles.sectionTitle}>
                Answers for owners, principals, and IT
              </h2>
            </header>
          </MotionReveal>
          <div className={styles.faqList}>
            {FAQ.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqBtn}
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? null : i)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={18} className={open ? styles.faqChevronOpen : styles.faqChevron} aria-hidden />
                  </button>
                  {open ? <p className={styles.faqAnswer}>{item.a}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 14. FINAL CTA */}
      <section className={styles.cta} aria-labelledby="learnx-cta-heading">
        <MotionReveal variant="soft" y={18}>
          <div className={styles.ctaInner}>
            <p className={styles.ctaEyebrow}>{FINAL_CTA.pricingTeaser}</p>
            <h2 id="learnx-cta-heading" className={styles.ctaTitle}>
              {LEARNX_CTA.title}
              <br />
              <em>{LEARNX_CTA.titleAccent}</em>
            </h2>
            <p className={styles.ctaLead}>{FINAL_CTA.lead}</p>
            <p className={styles.ctaNote}>{FINAL_CTA.implementationNote}</p>
            <div className={styles.ctaBtns}>
              <Link href={FINAL_CTA.primaryCta.href} className={styles.ctaPrimary}>
                {FINAL_CTA.primaryCta.label}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href={FINAL_CTA.secondaryCta.href} className={styles.ctaGhost}>
                {FINAL_CTA.secondaryCta.label}
              </Link>
              <Link href={FINAL_CTA.tertiaryCta.href} className={styles.ctaGhost}>
                {FINAL_CTA.tertiaryCta.label}
              </Link>
              <Link href={FINAL_CTA.brochureCta.href} className={styles.ctaGhost}>
                {FINAL_CTA.brochureCta.label}
              </Link>
            </div>
            <p className={styles.formHint}>
              <strong>{FINAL_CTA.formHint.title}:</strong> {FINAL_CTA.formHint.fields.join(" · ")}
            </p>
            <p className={styles.waHint}>
              Prefer chat?{" "}
              <a href="https://wa.me/96560919345" target="_blank" rel="noopener noreferrer">
                Enquire on WhatsApp
              </a>
            </p>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
}
