"use client";

import { useParams } from "next/navigation";
import SubPageHero from "@/components/SubPageHero/SubPageHero";
import { MotionReveal } from "@/components/ui";
import { Activity, Truck, ShieldCheck, Zap, BarChart3, Globe2 } from "lucide-react";
import Link from "next/link";
import styles from "./IndustryPage.module.css";

const industryContent = {
  healthcare: {
    title: "Healthcare",
    eyebrow: "Precision Medicine & Automation",
    desc: "Transforming patient care through AI-driven diagnostics, secure data residency, and automated clinical workflows.",
    icon: <Activity size={48} />,
    features: [
      { title: "Predictive Diagnostics", desc: "Using custom LLMs to analyze patient history and predict potential health risks.", icon: <Zap /> },
      { title: "Secure Record Management", desc: "Encryption-first architecture for sensitive medical data with regional compliance.", icon: <ShieldCheck /> },
      { title: "Workflow Automation", desc: "Reducing administrative overhead for doctors and nurses via intelligent scheduling.", icon: <BarChart3 /> }
    ],
    cta: "Secure Your Clinic"
  },
  logistics: {
    title: "Logistics",
    eyebrow: "Supply Chain Intelligence",
    desc: "Optimizing global trade routes and warehouse efficiency with real-time AI analytics and predictive demand modeling.",
    icon: <Truck size={48} />,
    features: [
      { title: "Route Optimization", desc: "Reducing fuel costs and delivery times with real-time traffic and weather AI.", icon: <Globe2 /> },
      { title: "Warehouse Automation", desc: "Smart inventory tracking that predicts stock-outs before they happen.", icon: <Zap /> },
      { title: "Fleet Monitoring", desc: "Predictive maintenance alerts to keep your fleet operational 24/7.", icon: <ShieldCheck /> }
    ],
    cta: "Optimize Your Fleet"
  },
  government: {
    title: "Government",
    eyebrow: "Digital Infrastructure",
    desc: "Powering smart cities and transparent public services with secure, scalable, and sovereign digital frameworks.",
    icon: <ShieldCheck size={48} />,
    features: [
      { title: "Smart City Integration", desc: "Connecting public infrastructure with AI to improve urban living standards.", icon: <Globe2 /> },
      { title: "Transparency Engines", desc: "Blockchain-inspired auditing for public spending and project management.", icon: <BarChart3 /> },
      { title: "Citizen Engagement", desc: "AI-powered portals that provide 24/7 support for public inquiries.", icon: <Zap /> }
    ],
    cta: "Modernize Your Agency"
  }
};

export default function IndustryPage() {
  const params = useParams();
  const slug = (params.slug as string) || "healthcare";
  const content = industryContent[slug as keyof typeof industryContent] || industryContent.healthcare;

  return (
    <div className={styles.pageWrapper}>
      <SubPageHero
        variant="services"
        eyebrow={content.eyebrow}
        title={
          <>
            Solutions for <em>{content.title}</em>
          </>
        }
      >
        {content.desc}
      </SubPageHero>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.featureGrid}>
            {content.features.map((feat, i) => (
              <MotionReveal key={i} variant="soft" y={20} delay={i * 0.1}>
                <div className={styles.featureCard}>
                  <div className={styles.featIcon}>{feat.icon}</div>
                  <h3 className={styles.featTitle}>{feat.title}</h3>
                  <p className={styles.featDesc}>{feat.desc}</p>
                </div>
              </MotionReveal>
            ))}
          </div>

          <MotionReveal variant="soft" y={30} className={styles.ctaBanner}>
            <div className={styles.ctaContent}>
              <div className={styles.ctaIcon}>{content.icon}</div>
              <div className={styles.ctaText}>
                <h2>Ready to redefine {content.title}?</h2>
                <p>Join the growing list of {content.title.toLowerCase()} leaders who are scaling with KICCPA Intelligence.</p>
              </div>
              <Link href="/contact" className={styles.ctaBtn}>
                {content.cta}
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className={styles.globalReach}>
        <div className={styles.container}>
          <div className={styles.reachGrid}>
            <div className={styles.reachItem}>
              <h3>Regional Expertise</h3>
              <p>Specialized solutions for India and Kuwait markets with full English & Arabic support.</p>
            </div>
            <div className={styles.reachItem}>
              <h3>Enterprise Security</h3>
              <p>Built on ISO-compliant architectures with regional data residency options.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
