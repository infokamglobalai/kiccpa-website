"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const ease = [0.2, 0.85, 0.25, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function RevealCard({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  if (reduce) return (
    <div className={className} style={style}>
      {children}
    </div>
  );
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.52, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
