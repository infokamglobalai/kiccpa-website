"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import SubPageHero from "@/components/SubPageHero/SubPageHero";
import { MotionReveal } from "@/components/ui";
import {
  getSolutionBySlug,
  OFFERING_LINKS,
  SUITE_AUDIENCES,
  SUITE_TAGLINE,
} from "@/lib/solutionsContent";
import styles from "./SolutionPage.module.css";

export default function SolutionPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const solution = getSolutionBySlug(slug);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!solution) {
    notFound();
  }

  const otherOfferings = OFFERING_LINKS.filter((o) => !o.href.endsWith(slug));

  return (
    <div className={styles.page}>
      <SubPageHero variant="services" eyebrow={solution.eyebrow} title={<>{solution.title}</>}>
        {solution.summary}
      </SubPageHero>

      <div className={`${styles.body} rv`}>
        <div className={styles.container}>
          <Link href="/" className={styles.backLink}>
            ← All offerings
          </Link>

          {solution.keyFeatures && solution.keyFeatures.length > 0 && (
            <section className={styles.featuresSection} aria-labelledby="features-heading">
              <p className={styles.sectionEyebrow}>Capabilities</p>
              <h2 id="features-heading" className={styles.sectionTitle}>
                Key features
              </h2>
              <ul className={styles.featureGrid}>
                {solution.keyFeatures.map((feat) => (
                  <li key={feat} className={styles.featureItem}>
                    {feat}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className={styles.grid2}>
            {solution.whoBenefits && solution.whoBenefits.length > 0 && (
              <MotionReveal variant="soft" y={16}>
                <div className={styles.block}>
                  <h2 className={styles.blockTitle}>Who benefits</h2>
                  <ul className={styles.list}>
                    {solution.whoBenefits.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </MotionReveal>
            )}

            <MotionReveal variant="soft" y={16} delay={0.05}>
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>Pain points we solve</h2>
                <ul className={styles.list}>
                  {solution.painPoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          </div>

          {solution.qualityImprovements && solution.qualityImprovements.length > 0 && (
            <MotionReveal variant="soft" y={16} delay={0.1}>
              <div className={`${styles.block} ${styles.blockFull}`}>
                <h2 className={styles.blockTitle}>Quality improvements</h2>
                <ul className={styles.list}>
                  {solution.qualityImprovements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          )}

          <div className={styles.suiteBand}>
            <p>
              <strong>{SUITE_TAGLINE}</strong> — Part of KICCPA&apos;s AI-powered education ecosystem for
              smart institutions. Available as a unified platform or standalone solution.
            </p>
            <div className={styles.tagRow}>
              {SUITE_AUDIENCES.map((a) => (
                <span key={a} className={styles.tag}>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {otherOfferings.length > 0 && (
            <section className={styles.featuresSection} style={{ marginTop: 48 }} aria-labelledby="more-heading">
              <p className={styles.sectionEyebrow}>Explore more</p>
              <h2 id="more-heading" className={styles.sectionTitle}>
                Other solutions
              </h2>
              <ul className={styles.featureGrid}>
                {otherOfferings.map((o) => (
                  <li key={o.href}>
                    <Link href={o.href} className={styles.featureItem} style={{ display: "block" }}>
                      <span style={{ color: "var(--OR)", marginRight: 8 }}>{o.n}</span>
                      {o.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className={styles.ctaRow}>
            <Link href="/demo" className={styles.ctaPrimary}>
              Book a demo
            </Link>
            <Link href="/contact" className={styles.ctaGhost}>
              Contact sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
