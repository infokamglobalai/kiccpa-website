"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children?: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
  className?: string;
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  direction = "up", 
  fullWidth = false,
  className = ""
}: FadeInProps) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] // custom easeOutCubic
      }}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer = ({ children, delay = 0 }: { children: ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }: { children: ReactNode, className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
