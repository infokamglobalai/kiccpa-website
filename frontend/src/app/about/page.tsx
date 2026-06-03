"use client";

import SubPageHero from "@/components/SubPageHero/SubPageHero";
import FounderMessage from "@/components/FounderMessage/FounderMessage";
import InstitutionalDocuments from "@/components/InstitutionalDocuments";
import { MotionReveal } from "@/components/ui";
import { industrySectors } from "@/frontend/lavender-home/homeContent";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Code2,
  GraduationCap,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  aboutCapabilities,
  aboutCta,
  aboutMission,
  aboutPrinciples,
  aboutSectorTags,
  aboutStory,
} from "./aboutContent";
import styles from "./AboutPage.module.css";

const capIcons = [GraduationCap, Building2, Users, Code2] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <SubPageHero
        variant="about"
        eyebrow="About KICCPA"
        title={
          <>
            Forward-thinking technology,
            <br />
            rooted in <em>Kuwait</em>
          </>
        }
      >
        A technology company headquartered in Kuwait and part of the KAM International ecosystem—combining
        regional delivery with enterprise-grade digital platforms.
      </SubPageHero>

      <section className={styles.story} aria-labelledby="about-story-title">
        <div className={styles.storyGrid}>
          <MotionReveal variant="soft" y={20}>
            <div>
              <p className={styles.eyebrow}>{aboutStory.eyebrow}</p>
              <h2 id="about-story-title" className={styles.title}>
                Where we <em>came from</em>
              </h2>
              <p className={styles.lead}>
                {aboutStory.leadBefore}
                <Link href={aboutStory.learnXHref}>{aboutStory.learnXLabel}</Link>
                {aboutStory.leadAfter}
              </p>
              <ul className={styles.principles}>
                {aboutPrinciples.map((p) => (
                  <li key={p.title} className={styles.principle}>
                    <span className={styles.principleIcon} aria-hidden>
                      <CheckCircle2 size={18} strokeWidth={2.25} />
                    </span>
                    <div>
                      <strong className={styles.principleTitle}>{p.title}</strong>
                      <p className={styles.principleText}>{p.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </MotionReveal>

          <MotionReveal variant="media" y={24}>
            <article className={styles.missionCard}>
              <div className={styles.missionImageWrap}>
                <Image
                  src={aboutMission.teamImage}
                  alt={aboutMission.teamAlt}
                  fill
                  className={styles.missionImage}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
              </div>
              <div className={styles.missionBody}>
                <p className={styles.missionName}>{aboutMission.teamName}</p>
                <p className={styles.missionRole}>{aboutMission.teamRole}</p>
                <blockquote className={styles.missionQuote}>{aboutMission.quote}</blockquote>
                <div className={styles.missionStats}>
                  {aboutMission.stats.map((s) => (
                    <div key={s.label}>
                      <div className={styles.missionStatValue}>{s.value}</div>
                      <div className={styles.missionStatLabel}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </MotionReveal>
        </div>
      </section>

      <div className={styles.kamBand}>
        <div className={styles.kamBandInner}>
          <p className={styles.kamBandTitle}>Part of KAM International Group</p>
          <p className={styles.kamBandText}>
            Legacy of excellence in the Gulf and India—unified product, engineering, and support for institutions
            and enterprises.
          </p>
          <div className={styles.kamChips}>
            {["Kuwait", "India", "GCC", "LearnX"].map((chip) => (
              <span key={chip} className={styles.kamChip}>
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <FounderMessage variant="about" />

      <section className={styles.capabilities} aria-labelledby="about-cap-title">
        <header className={styles.capHeader}>
          <MotionReveal variant="soft" y={12}>
            <p className={styles.eyebrow}>{aboutCapabilities.eyebrow}</p>
            <h2 id="about-cap-title" className={styles.title}>
              {aboutCapabilities.title} <em>{aboutCapabilities.titleAccent}</em>
            </h2>
            <p className={styles.lead} style={{ margin: "0 auto", textAlign: "center" }}>
              {aboutCapabilities.lead}
            </p>
          </MotionReveal>
        </header>
        <ul className={styles.capGrid}>
          {aboutCapabilities.items.map((item, i) => {
            const Icon = capIcons[i] ?? Code2;
            return (
              <li key={item.title}>
                <MotionReveal variant="soft" delay={i * 0.06} y={16}>
                  <Link href={item.href} className={styles.capCard}>
                    <span className={styles.capIcon} aria-hidden>
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <h3 className={styles.capTitle}>{item.title}</h3>
                    <p className={styles.capDesc}>{item.desc}</p>
                    <span className={styles.capLink}>
                      Learn more <ArrowRight size={14} aria-hidden />
                    </span>
                  </Link>
                </MotionReveal>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.industries} aria-labelledby="about-industries-title">
        <div className={styles.industriesInner}>
          <MotionReveal variant="soft" y={14}>
            <p className={styles.eyebrow} style={{ justifyContent: "center" }}>
              Industries we serve
            </p>
            <h2 id="about-industries-title" className={styles.title}>
              Built across <em>key sectors</em>
            </h2>
            <p className={styles.industriesLead}>
              Sector-specific platforms for compliance, language, and scale—configured for your market.
            </p>
          </MotionReveal>

          <ul className={styles.sectorGrid}>
            {industrySectors.map((sector, i) => (
              <li key={sector.slug}>
                <MotionReveal variant="soft" delay={i * 0.08} y={18}>
                  <Link href={`/industries/${sector.slug}`} className={styles.sectorCard}>
                    <h3 className={styles.sectorCardTitle}>{sector.title}</h3>
                    <p className={styles.sectorCardDesc}>{sector.desc}</p>
                  </Link>
                </MotionReveal>
              </li>
            ))}
          </ul>

          <div className={styles.tagCloud} aria-label="Additional sectors">
            {aboutSectorTags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.docsWrap}>
        <InstitutionalDocuments />
      </div>

      <section className={styles.cta} aria-labelledby="about-cta-title">
        <MotionReveal variant="soft" y={20}>
          <div className={styles.ctaInner}>
            <h2 id="about-cta-title" className={styles.ctaTitle}>
              {aboutCta.title}
              <br />
              <em>{aboutCta.titleAccent}</em>
            </h2>
            <p className={styles.ctaLead}>{aboutCta.lead}</p>
            <div className={styles.ctaBtns}>
              <Link href="/services" className={styles.btnPrimary}>
                Explore our services
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href="/contact" className={styles.btnOutline}>
                Talk to us
              </Link>
            </div>
          </div>
        </MotionReveal>
      </section>
    </div>
  );
}
