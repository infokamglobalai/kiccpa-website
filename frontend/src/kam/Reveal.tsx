"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./kam.module.css";

export type RevealVariant = "rise" | "left" | "right" | "scale" | "wipe";

const VARIANTS: Record<RevealVariant, string> = {
  rise: styles.rvRise,
  left: styles.rvLeft,
  right: styles.rvRight,
  scale: styles.rvScale,
  wipe: styles.rvWipe,
};

/**
 * One shared scroll pass for every pending Reveal on the page.
 *
 * IntersectionObserver is not used here on purpose: it only delivers a
 * callback when a threshold is *crossed*. A fast scroll can move an element
 * from below the viewport to above it between samples, leaving
 * `isIntersecting` false both times — no callback fires and the content
 * stays hidden permanently. A direct rect check cannot miss that case.
 */
type Pending = { node: Element; show: () => void };
const pending = new Set<Pending>();
let frame = 0;
let listening = false;

function sweep() {
  frame = 0;
  const limit = window.innerHeight * 0.92;
  for (const entry of [...pending]) {
    const rect = entry.node.getBoundingClientRect();
    // entered from below, or already scrolled past above
    if (rect.top < limit || rect.bottom < 0) {
      pending.delete(entry);
      entry.show();
    }
  }
  if (pending.size === 0) stop();
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(sweep);
}

function start() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

function stop() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
}

export default function Reveal({
  children,
  className = "",
  index = 0,
  parts = false,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  parts?: boolean;
  /** Different arrivals so neighbouring sections don't all move alike. */
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "off";
    if (reduce) {
      setOn(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const entry: Pending = { node, show: () => setOn(true) };
    pending.add(entry);
    start();
    schedule();

    return () => {
      pending.delete(entry);
      if (pending.size === 0) stop();
    };
  }, []);

  const classes = [
    styles.hpReveal,
    parts ? styles.hpRevealParts : "",
    variant ? VARIANTS[variant] : "",
    // Plain <Reveal> with no variant and no parts gets the default rise.
    !parts && !variant ? styles.rvDefault : "",
    on ? styles.hpRevealOn : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={ref}
      className={classes}
      style={index ? ({ "--i": index } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
