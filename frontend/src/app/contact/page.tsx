"use client";

import SubPageHero from "@/components/SubPageHero/SubPageHero";
import FaqSection from "@/components/FaqSection/FaqSection";
import { MotionReveal } from "@/components/ui";
import { submitContactAction } from "@/lib/actions";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CONTACT_BENEFITS,
  CONTACT_CHANNELS,
  CONTACT_CTA,
  CONTACT_EXPECT,
  CONTACT_STATS,
  INQUIRY_OPTIONS,
} from "./contactContent";
import { CONTACT_HERO_VISUAL, CONTACT_REGIONS_VISUAL } from "./contactImages";
import styles from "./ContactPage.module.css";

const benefitIcons = [Rocket, Users, MessageSquare, Sparkles] as const;
const channelIcons = {
  email: Mail,
  phone: Phone,
  hours: Clock,
  office: MapPin,
} as const;

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <SubPageHero
        variant="contact"
        eyebrow="Get in touch"
        title={
          <>
            Start your digital <em>transformation</em>
          </>
        }
      >
        Whether you need an agile product squad, a custom CRM, or enterprise AI automation—our
        engineers across GCC and India are ready to build with you.
      </SubPageHero>

      <section className={styles.stats} aria-label="Contact highlights">
        <div className={styles.statsGrid}>
          {CONTACT_STATS.map((s, i) => (
            <MotionReveal key={s.label} variant="soft" y={12} delay={i * 0.04}>
              <div className={styles.stat}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statHint}>{s.hint}</span>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section className={styles.main} aria-labelledby="contact-main-title">
        <div className={styles.container}>
          <div className={styles.mainGrid}>
            <MotionReveal variant="media" y={24} className={styles.visualCol}>
              <div className={styles.visualCard}>
                <Image
                  src={CONTACT_HERO_VISUAL.src}
                  alt={CONTACT_HERO_VISUAL.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className={styles.visualImg}
                />
                <div className={styles.visualOverlay} aria-hidden />
                <div className={styles.visualCaption}>
                  <p className={styles.visualEyebrow}>Global delivery</p>
                  <p className={styles.visualTitle} id="contact-main-title">
                    Real humans. Real expertise.
                  </p>
                  <p className={styles.visualLead}>
                    Routed to LMS, SMS, and enterprise specialists—not a generic inbox.
                  </p>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal variant="soft" y={20} delay={0.06}>
              <div className={styles.formCard}>
                <div className={styles.formHead}>
                  <h2>Let&apos;s talk roadmap</h2>
                  <p>Tell us about your goals—we&apos;ll reply with a clear next step.</p>
                </div>

                {status ? (
                  <div className={styles.success}>
                    <CheckCircle2 size={48} strokeWidth={2} aria-hidden />
                    <h3>Message received</h3>
                    <p>{status}</p>
                  </div>
                ) : (
                  <form
                    className={styles.form}
                    action={async (formData) => {
                      const res = await submitContactAction(formData);
                      if (res.error) {
                        alert(res.error);
                      } else if (res.success) {
                        setStatus(
                          "Your inquiry has been received. Our specialists will contact you shortly."
                        );
                      }
                    }}
                  >
                    <div className={styles.row}>
                      <div className={styles.field}>
                        <label htmlFor="contact-name">Full name</label>
                        <input
                          id="contact-name"
                          required
                          name="name"
                          type="text"
                          placeholder="Your name"
                          autoComplete="name"
                        />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="contact-email">Work email</label>
                        <input
                          id="contact-email"
                          required
                          name="email"
                          type="email"
                          placeholder="you@company.com"
                          autoComplete="email"
                        />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-scope">Inquiry type</label>
                      <select id="contact-scope" required name="scope" defaultValue="">
                        <option value="" disabled>
                          Select a topic
                        </option>
                        {INQUIRY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        required
                        name="message"
                        rows={5}
                        placeholder="How can we help your organization?"
                      />
                    </div>

                    <button type="submit" className={styles.submit}>
                      Send message
                      <ArrowRight size={18} aria-hidden />
                    </button>
                    <p className={styles.finePrint}>
                      By submitting, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                )}
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className={styles.channels} aria-labelledby="channels-heading">
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>Direct channels</p>
              <h2 id="channels-heading" className={styles.sectionTitle}>
                Reach the <em>right team</em>
              </h2>
            </header>
          </MotionReveal>
          <div className={styles.channelGrid}>
            {CONTACT_CHANNELS.map((ch, i) => {
              const Icon = channelIcons[ch.id as keyof typeof channelIcons];
              return (
                <MotionReveal key={ch.id} variant="soft" y={18} delay={i * 0.05}>
                  <article className={styles.channelCard}>
                    <span className={styles.channelIcon} aria-hidden>
                      <Icon size={22} strokeWidth={2} />
                    </span>
                    <h3 className={styles.channelTitle}>{ch.title}</h3>
                    {"summary" in ch ? (
                      <>
                        <p className={styles.channelLead}>{ch.summary}</p>
                        <p className={styles.channelDetail}>{ch.detail}</p>
                      </>
                    ) : (
                      <div className={styles.channelRegions}>
                        {ch.regions.map((r) => (
                          <div key={r.label} className={styles.regionBlock}>
                            <span className={styles.regionLbl}>{r.label}</span>
                            {r.lines.map((line, idx) =>
                              ch.id === "email" ? (
                                <a key={line} href={`mailto:${line}`} className={styles.channelLink}>
                                  {line}
                                </a>
                              ) : (
                                <a
                                  key={line}
                                  href={`tel:${"tel" in r ? r.tel[idx] : line.replace(/\s/g, "")}`}
                                  className={styles.channelLink}
                                >
                                  {line}
                                </a>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.regions} aria-labelledby="regions-heading">
        <div className={styles.container}>
          <div className={styles.regionsGrid}>
            <MotionReveal variant="media" y={20}>
              <div className={styles.regionsVisual}>
                <Image
                  src={CONTACT_REGIONS_VISUAL.src}
                  alt={CONTACT_REGIONS_VISUAL.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 480px"
                  className={styles.regionsImg}
                />
              </div>
            </MotionReveal>
            <MotionReveal variant="soft" y={16}>
              <div className={styles.regionsCopy}>
                <p className={styles.eyebrow} id="regions-heading">
                  <Globe size={14} aria-hidden /> Regions we serve
                </p>
                <h2 className={styles.sectionTitle}>
                  GCC, India &amp; <em>beyond</em>
                </h2>
                <p className={styles.regionsLead}>
                  Global coverage with deep roots in Kuwait and the Gulf—plus delivery capacity from
                  India for scale and speed.
                </p>
                <ul className={styles.expectList}>
                  {CONTACT_EXPECT.map((line) => (
                    <li key={line}>
                      <CheckCircle2 size={16} strokeWidth={2.5} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          </div>
        </div>
      </section>

      <section className={styles.benefits} aria-label="Why partner with KICCPA">
        <div className={styles.container}>
          <div className={styles.benefitGrid}>
            {CONTACT_BENEFITS.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <MotionReveal key={b.title} variant="soft" delay={i * 0.05} y={14}>
                  <article className={styles.benefitCard}>
                    <span className={styles.benefitIcon} aria-hidden>
                      <Icon size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <h3>{b.title}</h3>
                      <p>{b.desc}</p>
                    </div>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="contact-cta-title">
        <MotionReveal variant="soft" y={20}>
          <div className={styles.ctaInner}>
            <h2 id="contact-cta-title" className={styles.ctaTitle}>
              {CONTACT_CTA.title}
            </h2>
            <p className={styles.ctaLead}>{CONTACT_CTA.lead}</p>
            <div className={styles.ctaRow}>
              <Link href={CONTACT_CTA.primary.href} className={styles.ctaPrimary}>
                {CONTACT_CTA.primary.label}
                <ArrowRight size={16} aria-hidden />
              </Link>
              <Link href={CONTACT_CTA.secondary.href} className={styles.ctaOutline}>
                {CONTACT_CTA.secondary.label}
              </Link>
            </div>
          </div>
        </MotionReveal>
      </section>

      <FaqSection />
    </div>
  );
}
