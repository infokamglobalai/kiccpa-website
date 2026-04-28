"use client";

import { motion } from "framer-motion";
import { Search, Layers, Cpu, TrendingUp, ArrowRight } from "lucide-react";
import styles from "./TransformationWorkflow.module.css";

const steps = [
  {
    icon: <Search size={28} />,
    title: "Strategic Audit",
    desc: "We analyze your current digital landscape to identify hidden efficiencies and automation opportunities.",
    color: "#3b82f6"
  },
  {
    icon: <Layers size={28} />,
    title: "Architecture Design",
    desc: "Designing a custom, future-ready roadmap that seamlessly integrates AI into your core business logic.",
    color: "#8b5cf6"
  },
  {
    icon: <Cpu size={28} />,
    title: "Intelligence Build",
    desc: "Developing your bespoke ecosystem using state-of-the-art AI, secure code, and scalable architectures.",
    color: "#f59e0b"
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Continuous Evolution",
    desc: "Scaling your operations with predictive analytics and proactive support to ensure long-term success.",
    color: "#10b981"
  }
];

export default function TransformationWorkflow() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.eyebrow}
          >
            OUR PROCESS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.title}
          >
            How We <em>Transform</em> Your Business
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={styles.subtitle}
          >
            From initial audit to global scale, we guide you through every stage of digital maturity.
          </motion.p>
        </div>

        <div className={styles.workflowGrid}>
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={styles.stepCard}
            >
              <div className={styles.iconWrapper} style={{ color: step.color, background: `${step.color}15` }}>
                {step.icon}
                <div className={styles.stepNumber}>{i + 1}</div>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              
              {i < steps.length - 1 && (
                <div className={styles.connector}>
                  <ArrowRight size={24} className={styles.arrow} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={styles.ctaBox}
        >
          <p>Ready to start your transformation?</p>
          <a href="/contact" className={styles.ctaLink}>
            Schedule a Strategic Audit →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
