"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import type { ProductHotspot } from "@/lib/solutionsContent";
import styles from "./InteractiveProductVisual.module.css";

type InteractiveProductVisualProps = {
  imageSrc: string;
  alt: string;
  hotspots?: readonly ProductHotspot[];
  scrollScreens?: readonly string[];
  scrollPreviewLabel?: string;
};

export default function InteractiveProductVisual({
  imageSrc,
  alt,
  hotspots = [],
  scrollScreens,
  scrollPreviewLabel = "Mobile scroll preview",
}: InteractiveProductVisualProps) {
  const hintId = useId();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrollOpen, setScrollOpen] = useState(false);

  const active = hotspots.find((h) => h.id === activeId) ?? null;
  const screens = scrollScreens?.length ? scrollScreens : [imageSrc];
  const hasHotspots = hotspots.length > 0;
  const hasScrollPreview = screens.length > 0;

  const closeScroll = useCallback(() => setScrollOpen(false), []);

  useEffect(() => {
    if (!scrollOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeScroll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollOpen, closeScroll]);

  return (
    <div className={styles.wrap}>
      {(hasHotspots || hasScrollPreview) && (
        <p className={styles.hint} id={hintId}>
          {hasHotspots && (
            <>
              <span className={styles.hintDot} aria-hidden />
              Tap the glowing points on the visual to explore features
            </>
          )}
          {hasScrollPreview && (
            <button type="button" className={styles.previewBtn} onClick={() => setScrollOpen(true)}>
              Try scroll preview ↓
            </button>
          )}
        </p>
      )}

      <div className={styles.stage} role="img" aria-label={alt} aria-describedby={hasHotspots ? hintId : undefined}>
        <Image
          src={imageSrc}
          alt={alt}
          width={1920}
          height={960}
          sizes="100vw"
          className={styles.image}
          priority
        />

        {hotspots.map((spot) => (
          <button
            key={spot.id}
            type="button"
            className={`${styles.hotspot} ${activeId === spot.id ? styles.hotspotActive : ""}`}
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            aria-label={`${spot.label}: ${spot.detail}`}
            aria-expanded={activeId === spot.id}
            onClick={() => setActiveId((prev) => (prev === spot.id ? null : spot.id))}
          >
            <span className={styles.hotspotRing} aria-hidden />
            <span className={styles.hotspotCore} aria-hidden />
          </button>
        ))}

        {active && (
          <div
            className={styles.popover}
            style={{
              left: `clamp(12px, ${active.x}%, calc(100% - 12px))`,
              top: `clamp(12px, ${active.y + 8}%, calc(100% - 12px))`,
              transform: "translate(-50%, 0)",
            }}
            role="tooltip"
          >
            <p className={styles.popoverTitle}>{active.label}</p>
            <p className={styles.popoverText}>{active.detail}</p>
          </div>
        )}
      </div>

      {scrollOpen && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-label={scrollPreviewLabel}>
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <h3 className={styles.modalTitle}>{scrollPreviewLabel}</h3>
              <button type="button" className={styles.modalClose} onClick={closeScroll} aria-label="Close preview">
                ×
              </button>
            </div>
            <div className={styles.phone}>
              <div className={styles.phoneNotch} aria-hidden />
              <div
                className={`${styles.phoneScreen} ${screens.length === 1 ? styles.phoneScreenContinuous : ""}`}
              >
                {screens.length === 1 ? (
                  <div className={styles.phoneScrollSingle}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={screens[0]} alt={`${alt} scrollable preview`} />
                  </div>
                ) : (
                  screens.map((src, idx) => (
                    <div key={`${src}-${idx}`} className={styles.phoneSlide}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt={`${alt} screen ${idx + 1}`} />
                    </div>
                  ))
                )}
              </div>
            </div>
            <p className={styles.modalHint}>Scroll inside the phone — like using the real app</p>
          </div>
        </div>
      )}
    </div>
  );
}
