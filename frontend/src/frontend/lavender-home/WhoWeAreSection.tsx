"use client";

import { MotionReveal } from "@/components/ui";
import { Layers, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { whoWeAreContent } from "./homeContent";
import styles from "./WhoWeAreSection.module.css";

const pointIcons = [Sparkles, Layers] as const;

export default function WhoWeAreSection() {
  const { eyebrow, title, lead, points, image, imageAlt, regions, tagline } = whoWeAreContent;

  return (
    <section className={styles.section} aria-labelledby="who-we-are-title">
      <div className={styles.bgMesh} aria-hidden />
      <div className={styles.bgGlow} aria-hidden />
      <div className={styles.wrap}>
        <div className={styles.grid}>
            <MotionReveal variant="soft" y={20} className={styles.copy}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h2 id="who-we-are-title" className={styles.title}>
                {title}
              </h2>
              <p className={styles.lead}>{lead}</p>

              <ul className={styles.points} aria-label="What defines KICCPA">
                {points.map((item, i) => {
                  const Icon = pointIcons[i] ?? Sparkles;
                  return (
                    <li key={item.title} className={styles.point}>
                      <span className={styles.pointIcon} aria-hidden>
                        <Icon size={18} strokeWidth={2.25} />
                      </span>
                      <div>
                        <strong className={styles.pointTitle}>{item.title}</strong>
                        <p className={styles.pointText}>{item.text}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.metaRow}>
                <div className={styles.regionGroup} aria-label="Regions we serve">
                  {regions.map((region) => (
                    <span key={region} className={styles.regionChip}>
                      <MapPin size={12} strokeWidth={2.25} aria-hidden />
                      {region}
                    </span>
                  ))}
                </div>
                <span className={styles.tagline}>{tagline}</span>
              </div>

              <Link href="/about" className={styles.cta}>
                About KICCPA
                <span aria-hidden>→</span>
              </Link>
            </MotionReveal>

            <MotionReveal variant="media" className={styles.visualCol}>
              <div className={styles.visualFrame}>
                <div className={styles.visual}>
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                  <div className={styles.imageShade} aria-hidden />
                </div>
                <div className={styles.floatingBadge}>
                  <span className={styles.badgeLabel}>Part of KAM International</span>
                  <span className={styles.badgeSub}>Regional product &amp; delivery teams</span>
                </div>
              </div>
            </MotionReveal>
        </div>
      </div>
    </section>
  );
}
