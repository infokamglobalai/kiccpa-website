"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FOUNDER,
  FOUNDER_ABOUT_EXCERPT,
  FOUNDER_CLOSING,
  FOUNDER_MESSAGE_PARAGRAPHS,
  FOUNDER_QUOTE,
} from "@/app/learnx/learnxContent";
import styles from "./FounderMessage.module.css";

type FounderMessageProps = {
  variant?: "about" | "full";
  showLearnXLink?: boolean;
  id?: string;
};

export default function FounderMessage({
  variant = "about",
  showLearnXLink = true,
  id = "founder-message",
}: FounderMessageProps) {
  const [imgSrc, setImgSrc] = useState<string>(FOUNDER.imageSrc);
  const [useFallback, setUseFallback] = useState(false);
  const isFull = variant === "full";
  const paragraphs = isFull ? FOUNDER_MESSAGE_PARAGRAPHS : [FOUNDER_ABOUT_EXCERPT];

  return (
    <section
      className={`${styles.section} ${isFull ? styles.sectionFull : ""}`}
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <div className={styles.ambient} aria-hidden />
      <div className={styles.inner}>
        <aside className={styles.portraitColumn} aria-label="Founder portrait">
          <div className={styles.portraitStage}>
            <div className={styles.frameOuter}>
              <span className={styles.corner} data-pos="tl" aria-hidden />
              <span className={styles.corner} data-pos="tr" aria-hidden />
              <span className={styles.corner} data-pos="bl" aria-hidden />
              <span className={styles.corner} data-pos="br" aria-hidden />
              <div className={styles.frameInner}>
                <div className={styles.portraitMat}>
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={FOUNDER.name}
                      width={960}
                      height={600}
                      className={styles.portrait}
                      sizes="(max-width: 960px) 100vw, 480px"
                      onError={() => {
                        setUseFallback(true);
                        setImgSrc(FOUNDER.imageFallback);
                      }}
                      priority={variant === "about"}
                    />
                  ) : (
                    <div className={styles.portraitPlaceholder} aria-hidden>
                      AA
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.namePlaque}>
              <div className={styles.plaqueCrest} aria-hidden>
                <span className={styles.crestLine} />
                <span className={styles.crestDiamond} />
                <span className={styles.crestLine} />
              </div>
              <p className={styles.plaqueEyebrow}>Founder &amp; President</p>
              <h3 className={styles.plaqueName}>{FOUNDER.name}</h3>
              <p className={styles.plaqueRole}>{FOUNDER.title}</p>
            </div>
          </div>

          {useFallback && (
            <p className={styles.imageNote}>
              Add portrait: <code>public/images/founder-dr-abdulwahab-al-atwan.png</code>
            </p>
          )}
        </aside>

        <div className={styles.messageColumn}>
          <div className={styles.messagePanel}>
            <p className={styles.eyebrow}>Leadership</p>
            <h2 className={styles.title} id={`${id}-heading`}>
              A message from our <em>Founder</em>
            </h2>
            <div className={styles.quoteMark} aria-hidden>
              &ldquo;
            </div>

            <div className={styles.body}>
              {paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>

            {isFull && (
              <div className={styles.journey}>
                {FOUNDER_CLOSING.map((step, i) => (
                  <div key={step} className={styles.journeyStep}>
                    <span className={styles.journeyNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.journeyText}>{step}</span>
                  </div>
                ))}
              </div>
            )}

            <blockquote className={styles.signatureQuote}>
              <span className={styles.signatureLine} aria-hidden />
              <p>{FOUNDER_QUOTE}</p>
              <footer className={styles.signatureFooter}>
                <span className={styles.signatureName}>{FOUNDER.name}</span>
                <span className={styles.signatureDivider} aria-hidden />
                <span className={styles.signatureOrg}>KICCPA · LearnX</span>
              </footer>
            </blockquote>

            {showLearnXLink && (
              <div className={styles.actions}>
                {!isFull && (
                  <Link href="/learnx" className={styles.btnPrimary}>
                    Full vision &amp; mission →
                  </Link>
                )}
                <Link href="/demo" className={isFull ? styles.btnPrimary : styles.btnGhost}>
                  Book a demo
                </Link>
                {isFull && (
                  <Link href="/schools" className={styles.btnGhost}>
                    For schools
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
