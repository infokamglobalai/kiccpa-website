"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import MotionReveal from "@/components/ui/MotionReveal";
import styles from "./ProcessDeliverSection.module.css";

const ease = [0.2, 0.8, 0.2, 1] as const;

const FILM_IMAGES = [
  "/images/Custom Enterprise Software Architecture 1.jpeg",
  "/images/Scalable Architecture 1.png",
  "/images/Digital & AI 1.jpeg",
] as const;

const STEPS = [
  {
    n: 1,
    title: "Client consultation",
    body: "We begin by understanding your vision, business model, and what success looks like — then map the landscape, competitors, and opportunities.",
    tone: "navy" as const,
    thumb: "/images/Custom Enterprise Software Architecture 1.jpeg",
  },
  {
    n: 2,
    title: "Strategy & prototyping",
    body: "We select the right tools, technologies, and frameworks, then create a prototype that clarifies structure, user flow, and core functionality.",
    tone: "orange" as const,
    thumb: "/images/ultra_services_tech_1774864472836.png",
  },
  {
    n: 3,
    title: "Design & development",
    body: "Design and engineering work in sync to build a fast, scalable product — validated with rigorous testing for performance, usability, and reliability.",
    tone: "navy" as const,
    thumb: "/images/End-to-End Operational Digitization 1.jpeg",
  },
  {
    n: 4,
    title: "Monitoring & maintenance",
    body: "After launch, we stay with you: performance monitoring, updates, bug fixes, and continuous improvements that keep the product evolving.",
    tone: "orange" as const,
    thumb: "/images/Reliable Support 1.png",
  },
];

export default function ProcessDeliverSection() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="process-deliver-heading">
      <div className={styles.inner}>
        <MotionReveal y={28} className={styles.head}>
          <p className={styles.eyebrow}>Our proven process</p>
          <h2 id="process-deliver-heading" className={styles.title}>
            How we <em>deliver</em>
          </h2>
          <p className={styles.lead}>
            A transparent path from discovery to production — with engineering discipline, design craft, and long-term
            partnership baked in.
          </p>
        </MotionReveal>

        <div className={styles.layout}>
          <motion.div
            className={styles.visualCol}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease }}
          >
            <div className={styles.heroWrap}>
              <div className={styles.heroGlow} aria-hidden />
              <div className={styles.heroFrame}>
                <Image
                  src="/images/how_we_deliver_light.jpg"
                  alt="Collaborative delivery — workshops, architecture, and delivery rhythm"
                  fill
                  sizes="(max-width: 960px) 100vw, 42vw"
                  className={styles.heroMainImg}
                />
                <div className={styles.heroOverlay} aria-hidden />
                <p className={styles.heroCaption}>
                  From blueprint to hypercare — one accountable team across Kuwait &amp; India.
                </p>
              </div>
              <div className={styles.filmstrip} role="list" aria-label="Delivery highlights">
                {FILM_IMAGES.map((src) => (
                  <motion.div
                    key={src}
                    className={styles.filmThumb}
                    role="listitem"
                    initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease }}
                    whileHover={reduce ? undefined : { y: -4 }}
                  >
                    <Image src={src} alt="" fill sizes="72px" className={styles.filmImg} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className={styles.timeline}>
            <div className={styles.timelineLine} aria-hidden />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                className={styles.step}
                initial={reduce ? false : { opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
              >
                <div
                  className={`${styles.stepNum} ${
                    step.tone === "navy" ? styles.stepNumNavy : styles.stepNumOrange
                  }`}
                  aria-hidden
                >
                  {step.n}
                </div>
                <article className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.thumb}>
                      <Image src={step.thumb} alt="" width={64} height={64} sizes="64px" />
                    </div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
