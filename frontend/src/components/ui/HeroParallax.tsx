"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type HeroParallaxProps = {
  children: ReactNode;
  className?: string;
  /** No scale on scroll — keeps hero visuals from overlapping copy */
  subtle?: boolean;
};

/** Subtle vertical parallax on the hero visual while scrolling past the hero. */
export default function HeroParallax({ children, className = "", subtle = false }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce || subtle ? 1 : 1.04]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y, scale }}>
      {children}
    </motion.div>
  );
}
