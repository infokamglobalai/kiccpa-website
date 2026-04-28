"use client";

import { motion } from "framer-motion";
import { 
  Bell, 
  MapPin, 
  CreditCard, 
  MessageSquare, 
  ShieldCheck, 
  Globe2,
  Clock,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ParentsPremium.module.css";
import { MotionReveal } from "@/components/ui";

const timelineEvents = [
  {
    time: "07:30 AM",
    title: "Bus Tracking",
    desc: "Real-time GPS notification as the school bus enters your neighborhood."
  },
  {
    time: "09:00 AM",
    title: "Attendance Check",
    desc: "Instant confirmation that your child has safely checked into the classroom."
  },
  {
    time: "01:30 PM",
    title: "Lunch & Canteen",
    desc: "Receive a summary of today's meal and remaining digital wallet balance."
  },
  {
    time: "04:00 PM",
    title: "Performance Alerts",
    desc: "A quick summary of homework assigned and any teacher feedback for the day."
  }
];

export default function ParentsPage() {
  return (
    <div className={styles.page}>
      {/* 1. Immersive Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.eyebrow}
            >
              Connected Parenting
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.title}
            >
              Your Child&apos;s Journey, <em>Always in Reach</em>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.desc}
            >
              From real-time bus tracking to instant grade notifications, KICCPA brings the classroom experience to your pocket.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ display: "flex", gap: "16px" }}
            >
              <Link href="/demo" className="btn-cp" style={{ background: "#ff823f", color: "#fff", borderColor: "#ff823f" }}>
                Request a Demo →
              </Link>
              <Link href="/contact" className="btn-co" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>
                Contact Support
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. 24-Hour Timeline */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 900 }}>A Day with <em>KICCPA</em></h2>
            <p style={{ color: "var(--lv-muted)", maxWidth: "600px", margin: "16px auto" }}>
              Stay informed at every critical touchpoint of your child's day.
            </p>
          </div>

          <div className={styles.timeline}>
            {timelineEvents.map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={styles.timelineItem}
              >
                <div className={styles.timelineContent}>
                  <span className={styles.time}>{event.time}</span>
                  <h3 className={styles.itemTitle}>{event.title}</h3>
                  <p className={styles.itemDesc}>{event.desc}</p>
                </div>
                <div className={styles.timelineDot} />
                <div style={{ width: "42%" }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. App Showcase */}
      <section className={styles.container}>
        <div className={styles.appShowcase}>
          <div className={styles.phoneWrap}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneScreen}>
                <Image 
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80" 
                  alt="App interface" 
                  fill 
                  style={{ objectFit: "cover" }}
                />
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className={styles.notification}
                >
                  <div className={styles.notifTitle}>KICCPA ALERT</div>
                  <div className={styles.notifText}>Your child has boarded Bus #14. ETA: 8 mins.</div>
                </motion.div>
              </div>
            </div>
          </div>
          <div>
            <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "24px" }}>Control in your <em>Pocket</em></h2>
            <p style={{ fontSize: "1.1rem", color: "var(--lv-muted)", marginBottom: "40px" }}>
              Our dedicated mobile app for parents ensures you never miss a beat. Available on iOS and Android with full Arabic support.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { icon: <Bell />, title: "Instant Alerts", desc: "Grades, attendance, and emergency circulars." },
                { icon: <MessageSquare />, title: "Direct Chat", desc: "Private channel to teachers and office." },
                { icon: <CreditCard />, title: "Fee Portal", desc: "Secure, one-click tuition and activity payments." }
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div style={{ color: "#ff823f" }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800 }}>{item.title}</h4>
                    <p style={{ fontSize: "0.9rem", color: "var(--lv-muted)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global Standards */}
      <section style={{ padding: "100px 0", background: "#f8fafc" }}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.icon} style={{ background: "rgba(27, 67, 112, 0.05)", color: "#1b4370" }}><ShieldCheck size={32} /></div>
              <h3>Data Sovereignty</h3>
              <p>Your child's data is encrypted and stored locally in AWS Bahrain (Kuwait) or Mumbai (India).</p>
            </div>
            <div className={styles.card}>
              <div className={styles.icon} style={{ background: "rgba(255, 130, 63, 0.05)", color: "#ff823f" }}><Globe2 size={32} /></div>
              <h3>Language Choice</h3>
              <p>Switch between English and Native Arabic RTL interfaces instantly with one tap.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.icon} style={{ background: "rgba(27, 67, 112, 0.05)", color: "#1b4370" }}><Clock size={32} /></div>
              <h3>24/7 Connectivity</h3>
              <p>Direct access to your child's learning progress even when the school is closed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "100px 0", textAlign: "center" }}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "24px" }}>Experience the Future of <em>Family-School</em> Connection</h2>
          <Link href="/demo" className="btn-cp" style={{ background: "#1b4370", color: "#fff", borderColor: "#1b4370" }}>
            Watch a Product Tour →
          </Link>
        </div>
      </section>
    </div>
  );
}
