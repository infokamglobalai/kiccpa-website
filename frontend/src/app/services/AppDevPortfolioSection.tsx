"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import MotionReveal from "@/components/ui/MotionReveal";
import styles from "./AppDevPortfolioSection.module.css";

const ease = [0.2, 0.8, 0.2, 1] as const;

const OFFERINGS = [
  {
    k: "01",
    title: "On‑Demand Service Applications",
    body: "Real‑time, location‑based platforms built for convenience and efficiency.",
    pills: ["Taxi booking", "Home services", "Delivery services"],
    tone: "navy" as const,
  },
  {
    k: "02",
    title: "Food & Restaurant Applications",
    body: "Ordering, delivery, and multi‑kitchen operations—unified into one experience.",
    pills: ["Food delivery", "Restaurant ordering", "Cloud kitchens"],
    tone: "orange" as const,
  },
  {
    k: "03",
    title: "E‑Commerce & Online Shopping",
    body: "Conversion‑focused storefronts with robust back‑office and growth features.",
    pills: ["Multi‑vendor", "Retail e‑commerce", "Subscriptions"],
    tone: "navy" as const,
  },
  {
    k: "04",
    title: "Grocery Delivery Applications",
    body: "Quick‑commerce systems tuned for speed, accuracy, and daily essentials.",
    pills: ["Hyperlocal grocery", "Inventory & delivery ops"],
    tone: "orange" as const,
  },
  {
    k: "05",
    title: "Healthcare Applications",
    body: "Secure digital healthcare systems designed for modern care journeys.",
    pills: ["Telemedicine", "Appointments", "Hospital / patient mgmt"],
    tone: "navy" as const,
  },
  {
    k: "06",
    title: "Pharma Applications",
    body: "Platforms for medicine distribution, prescriptions, and supply visibility.",
    pills: ["Online pharmacy", "Ordering & delivery", "Rx management"],
    tone: "orange" as const,
  },
  {
    k: "07",
    title: "Wellness & Nutritionist Apps",
    body: "Build healthier habits with personalized plans, coaching, and progress tracking.",
    pills: ["Consultations", "Diet tracking", "Fitness & wellness"],
    tone: "navy" as const,
  },
  {
    k: "08",
    title: "Education & Learning Solutions",
    body: "Digital learning ecosystems that scale across institutions and enterprises.",
    pills: ["LMS platforms", "School management", "Online courses"],
    tone: "orange" as const,
  },
  {
    k: "09",
    title: "Transport & Tracking Applications",
    body: "Operational visibility with live tracking, routing, and logistics intelligence.",
    pills: ["School bus tracking", "Fleet management", "Logistics tracking"],
    tone: "navy" as const,
  },
  {
    k: "10",
    title: "Business & Enterprise Solutions",
    body: "Integrated systems that streamline, automate, and unify operations.",
    pills: ["HRMS", "Accounting/finance", "ERP"],
    tone: "orange" as const,
  },
  {
    k: "11",
    title: "Salon & Appointment Booking",
    body: "Smart scheduling, reminders, and customer profiles—made effortless.",
    pills: ["Salon & spa booking", "Scheduling systems"],
    tone: "navy" as const,
  },
  {
    k: "12",
    title: "Travel & Tourism Applications",
    body: "Booking experiences that feel premium—search, reservations, and packages.",
    pills: ["Travel booking", "Tour packages", "Hotel reservations"],
    tone: "orange" as const,
  },
  {
    k: "13",
    title: "Library Management Systems",
    body: "Efficient cataloging and member management for physical + digital resources.",
    pills: ["Library automation", "Digital library"],
    tone: "navy" as const,
  },
  {
    k: "14",
    title: "Start‑Up‑Focused Applications",
    body: "From MVP to scale—architecture and delivery built for momentum.",
    pills: ["MVP development", "Scalable architecture", "Custom solutions"],
    tone: "orange" as const,
  },
] as const;

const INDUSTRIES = [
  "Food",
  "Healthcare",
  "Pharma",
  "Wellness",
  "Education",
  "Retail",
  "Logistics",
  "Travel",
  "Finance",
  "Start‑ups",
  "Enterprise",
] as const;

const QUOTES = [
  "Build once. Scale everywhere.",
  "From idea to launch — without the chaos.",
  "Premium UX. Enterprise engineering.",
  "Faster delivery. Cleaner architecture.",
  "Web • Android • iOS — one aligned team.",
] as const;

export default function AppDevPortfolioSection() {
  const reduce = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="app-dev-portfolio-heading">
      <div className={styles.inner}>
        <MotionReveal y={28} className={styles.head}>
          <p className={styles.eyebrow}>KICCPA Services</p>
          <h2 id="app-dev-portfolio-heading" className={styles.title}>
            App Development <em>Portfolio</em>
          </h2>
          <p className={styles.lead}>
            Scalable, innovative, high‑performance applications—tailored to your industry, optimized for operational
            efficiency, and built to accelerate growth.
          </p>
        </MotionReveal>

        <div className={styles.layout}>
          <div>
            <motion.div
              className={styles.offerGrid}
              initial={reduce ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-80px 0px -40px 0px" }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {OFFERINGS.map((o) => (
                <motion.div
                  key={o.k}
                  className={styles.card}
                  variants={{
                    hidden: { opacity: 0, y: 22 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
                  }}
                >
                  <div className={styles.cardTop}>
                    <div
                      className={`${styles.badge} ${o.tone === "orange" ? styles.badgeOrange : ""}`}
                      aria-hidden
                    >
                      {o.k}
                    </div>
                    <div>
                      <h3 className={styles.cardTitle}>{o.title}</h3>
                      <p className={styles.cardBody}>{o.body}</p>
                    </div>
                  </div>

                  <div className={styles.pillRow} aria-label={`${o.title} examples`}>
                    {o.pills.map((p) => (
                      <span
                        key={`${o.k}-${p}`}
                        className={`${styles.pill} ${o.tone === "orange" ? styles.pillOrange : ""}`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className={styles.side}>
            <motion.div
              className={styles.visual}
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease }}
            >
              <Image
                src="/images/hero_services.png"
                alt="Application development portfolio visuals"
                fill
                sizes="(max-width: 980px) 100vw, 34vw"
                className={styles.visualImg}
                priority={false}
              />
              <div className={styles.visualOverlay} aria-hidden />
              <p className={styles.quote}>
                “We don’t ship features. We ship outcomes.”
                <small>Scalable architecture · premium UX · continuous support</small>
              </p>
            </motion.div>

            <div className={styles.marquee} aria-label="Highlights">
              <div className={styles.marqueeTrack} aria-hidden={false}>
                {[...QUOTES, ...QUOTES].map((q, i) => (
                  <div key={`${q}-${i}`} className={styles.marqueeItem}>
                    <span className={styles.dot} aria-hidden />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.sideBlocks}>
              <MotionReveal variant="soft" y={16} className={styles.mini}>
                <h3>Industries we serve</h3>
                <p>{INDUSTRIES.join(" • ")}</p>
              </MotionReveal>

              <MotionReveal variant="soft" y={16} className={styles.mini}>
                <h3>Why choose KICCPA</h3>
                <p>
                  Tailored solutions aligned with business objectives, secure &amp; scalable architecture, cross‑platform
                  delivery (Web/Android/iOS), agile methodology, and long‑term maintenance.
                </p>
              </MotionReveal>

              <MotionReveal variant="soft" y={16} className={styles.mini}>
                <h3>Ready to scope your build?</h3>
                <p>
                  Share your idea and we’ll propose the roadmap, timeline, and the right tech stack for your market.
                </p>
                <div style={{ marginTop: 12 }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 16px",
                      borderRadius: 14,
                      background: "linear-gradient(135deg, var(--P), var(--PD))",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: ".86rem",
                      boxShadow: "0 16px 44px rgba(27,67,112,.22)",
                    }}
                  >
                    Talk to an expert <span aria-hidden>➔</span>
                  </Link>
                </div>
              </MotionReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

