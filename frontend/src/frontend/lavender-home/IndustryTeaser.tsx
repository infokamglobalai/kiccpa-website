"use client";

import { motion } from "framer-motion";
import { Activity, Truck, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./IndustryTeaser.module.css";

const industries = [
  {
    slug: "healthcare",
    title: "Healthcare",
    desc: "AI-driven diagnostics and secure data management for modern clinical excellence.",
    icon: <Activity size={32} />,
    color: "#ef4444"
  },
  {
    slug: "logistics",
    title: "Logistics",
    desc: "Optimizing global supply chains with real-time predictive analytics and automation.",
    icon: <Truck size={32} />,
    color: "#3b82f6"
  },
  {
    slug: "government",
    title: "Government",
    desc: "Powering smart city infrastructure and transparent digital public services.",
    icon: <ShieldCheck size={32} />,
    color: "#8b5cf6"
  }
];

export default function IndustryTeaser() {
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
            SOLUTIONS BY SECTOR
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={styles.title}
          >
            Intelligence Built for <em>Every Industry</em>
          </motion.h2>
        </div>

        <div className={styles.grid}>
          {industries.map((ind, i) => (
            <motion.div
              key={ind.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={styles.card}
            >
              <div className={styles.cardGlow} style={{ background: ind.color }} />
              <div className={styles.cardInner}>
                <div className={styles.iconBox} style={{ color: ind.color }}>
                  {ind.icon}
                </div>
                <h3 className={styles.cardTitle}>{ind.title}</h3>
                <p className={styles.cardDesc}>{ind.desc}</p>
                <Link href={`/industries/${ind.slug}`} className={styles.link}>
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
