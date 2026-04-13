"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.2, 0.8, 0.2, 1] as const;

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset in px. Defaults by variant. */
  y?: number;
  /**
   * default — standard copy blocks
   * soft — smaller motion (stats, tight UI)
   * media — images / hero visuals: lift + subtle scale-in (enterprise / product sites)
   */
  variant?: "default" | "soft" | "media";
};

export default function MotionReveal({
  children,
  className = "",
  delay = 0,
  y: yProp,
  variant = "default",
}: MotionRevealProps) {
  const reduce = useReducedMotion();

  const y =
    yProp ??
    (variant === "soft" ? 16 : variant === "media" ? 44 : 26);
  const scaleFrom = variant === "media" && !reduce ? 0.94 : 1;
  const duration = variant === "media" ? 0.72 : variant === "soft" ? 0.55 : 0.65;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: scaleFrom }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-72px 0px -48px 0px" }}
      transition={{
        duration,
        delay,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
