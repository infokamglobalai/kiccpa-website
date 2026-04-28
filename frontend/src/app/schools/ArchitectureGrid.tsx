"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { schoolsArchitecture, ArchSection, ArchSubsection } from "@/frontend/stakeholders/schoolsArchitectureData";
import styles from "./ArchitectureGrid.module.css";

const CARD_IMAGES = [
  encodeURI("/images/Digital & AI 1.jpeg"),
  encodeURI("/images/End-to-End Operational Digitization 1.jpeg"),
  encodeURI("/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg"),
  encodeURI("/images/Scalable Architecture 1.png"),
  encodeURI("/images/AI Predictive Analytics & Smart Automation.png"),
  encodeURI("/images/home-hero-lms.png"),
  encodeURI("/images/Robust Legacy System Integrations 1.jpeg"),
  encodeURI("/images/Custom Enterprise Software Architecture 1.jpeg"),
] as const;

export default function ArchitectureGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>THE KICCPA BLUEPRINT</span>
          <h2 className={styles.title}>Comprehensive <em>Architecture</em></h2>
          <p className={styles.subtitle}>
            Every operational layer of your institution, digitized and integrated into a single source of truth.
          </p>
        </div>

        <div className={styles.grid}>
          {schoolsArchitecture.map((sec: ArchSection, i: number) => (
            <motion.div
              key={sec.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}
              className={styles.card}
            >
              <div className={styles.cardHero}>
                <Image
                  src={CARD_IMAGES[i % CARD_IMAGES.length]}
                  alt={sec.title}
                  fill
                  className={styles.cardImg}
                />
                <div className={styles.overlay} />
                <div className={styles.cardTop}>
                  <span className={styles.num}>{sec.num}</span>
                  <span className={styles.icon}>{sec.icon}</span>
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{sec.title}</h3>
                
                {sec.items && (
                  <ul className={styles.list}>
                    {sec.items.slice(0, 5).map((item: string) => (
                      <li key={item} className={styles.listItem}>{item}</li>
                    ))}
                    {sec.items.length > 5 && <li className={styles.more}>+ {sec.items.length - 5} more features</li>}
                  </ul>
                )}

                {sec.subsections?.map((sub: ArchSubsection, j: number) => (
                  <div key={j} className={styles.sub}>
                    <p className={styles.subTitle}>{sub.title}</p>
                    <ul className={styles.list}>
                      {sub.items.slice(0, 3).map((item: string) => (
                        <li key={item} className={styles.listItem}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
