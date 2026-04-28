"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, Users, Code2, BrainCircuit } from "lucide-react";
import { useState } from "react";
import styles from "./IntelligenceMap.module.css";

const nodes = [
  {
    id: "lms",
    title: "LMS & EdTech",
    icon: <GraduationCap size={24} />,
    desc: "Personalized learning paths, AI-driven grading, and student sentiment analysis.",
    pos: { top: "15%", left: "20%" }
  },
  {
    id: "erp",
    title: "Smart ERP",
    icon: <Building2 size={24} />,
    desc: "Predictive resource planning, automated financial reporting, and supply chain AI.",
    pos: { top: "15%", right: "20%" }
  },
  {
    id: "crm",
    title: "Intelligence CRM",
    icon: <Users size={24} />,
    desc: "Behavioral lead scoring, automated engagement, and churn prediction models.",
    pos: { bottom: "15%", left: "20%" }
  },
  {
    id: "custom",
    title: "Custom AI Dev",
    icon: <Code2 size={24} />,
    desc: "Bespoke LLM integrations, RAG pipelines, and specialized enterprise automation.",
    pos: { bottom: "15%", right: "20%" }
  }
];

export default function IntelligenceMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>The KICCPA <em>Intelligence</em> Ecosystem</h2>
          <p className={styles.subtitle}>
            A unified core of Artificial Intelligence powering every facet of your enterprise operations.
          </p>
        </div>

        <div className={styles.mapContainer}>
          {/* Central Hub */}
          <div className={styles.centralHub}>
            <div className={styles.hubPulse} />
            <div className={styles.hubCore}>
              <BrainCircuit size={48} className={styles.hubIcon} />
              <div className={styles.hubLabel}>KICCPA AI CORE</div>
            </div>
          </div>

          {/* Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className={`${styles.node} ${activeNode === node.id ? styles.nodeActive : ""}`}
              style={node.pos}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className={styles.nodeIcon}>{node.icon}</div>
              <div className={styles.nodeContent}>
                <h3 className={styles.nodeTitle}>{node.title}</h3>
                <p className={styles.nodeDesc}>{node.desc}</p>
              </div>
              
              {/* Connection Line */}
              <div className={styles.connectorLine} />
            </motion.div>
          ))}

          {/* Floating Particles */}
          <div className={styles.particles} aria-hidden>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
