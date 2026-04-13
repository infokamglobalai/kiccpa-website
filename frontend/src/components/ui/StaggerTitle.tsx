"use client";

import { motion, useReducedMotion } from "framer-motion";

type StaggerTitleProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  highlightFromWord?: number;
  highlightClassName?: string;
};

const wordVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.042, delayChildren: 0.06 },
  },
};

/**
 * Word-by-word reveal on scroll; optional accent class from `highlightFromWord` onward.
 */
export default function StaggerTitle({
  text,
  className = "",
  as: Tag = "h1",
  highlightFromWord,
  highlightClassName = "",
}: StaggerTitleProps) {
  const reduce = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (reduce) {
    const head = highlightFromWord != null ? words.slice(0, highlightFromWord).join(" ") : text;
    const tail =
      highlightFromWord != null ? words.slice(highlightFromWord).join(" ") : null;
    return (
      <Tag className={className}>
        {head}
        {tail != null && tail.length > 0 ? (
          <>
            {" "}
            <span className={highlightClassName}>{tail}</span>
          </>
        ) : null}
      </Tag>
    );
  }

  const MotionHeading = Tag === "h2" ? motion.h2 : Tag === "h3" ? motion.h3 : motion.h1;

  return (
    <MotionHeading
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
    >
      {words.map((word, i) => {
        const isHighlight = highlightFromWord != null && i >= highlightFromWord;
        return (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            style={{ display: "inline-block", marginRight: "0.28em", marginBottom: "0.06em" }}
            className={isHighlight ? highlightClassName : undefined}
          >
            {word}
          </motion.span>
        );
      })}
    </MotionHeading>
  );
}
