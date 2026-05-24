"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Settings, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  LayoutDashboard,
  FileText
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SchoolsPremium.module.css";
import { MotionReveal } from "@/components/ui";
import ArchitectureGrid from "./ArchitectureGrid";

const stakeholders = [
  {
    id: "students",
    title: "For Students",
    subtitle: "Personalized AI-Native Learning",
    desc: "Empowering every student with a custom learning path, AI mentorship, and interactive progress tracking that goes beyond the classroom.",
    list: ["AI Mentor Support", "Gamified Learning Paths", "Digital Portfolios", "Peer Collaboration Hub"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "teachers",
    title: "For Teachers",
    subtitle: "Efficiency & Insight",
    desc: "Automating administrative tasks so teachers can focus on what matters most—inspiring and guiding their students.",
    list: ["Automated Grading", "Lesson Planning Tools", "Real-time Attendance", "Performance Analytics"],
    image: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "admin",
    title: "For Administrators",
    subtitle: "Full Ecosystem Control",
    desc: "A centralized command center for multi-campus management, financial auditing, and strategic reporting.",
    list: ["Fee Management", "Staff Payroll", "Inventory & Assets", "Compliance Reporting"],
    image: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=1200&q=80"
  }
];

export default function SchoolsPage() {
  const [activeTab, setActiveTab] = useState("students");
  const [videoLang, setVideoLang] = useState<"en" | "ar">("en");
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTab = stakeholders.find(s => s.id === activeTab)!;

  const videoSrc = videoLang === "en" 
    ? "/learn x- schools video-eng.mp4" 
    : "/learn x-schools video-ara.mp4";

  return (
    <div className={styles.page}>
      {/* 1. Massive Cinematic Hero with Transcript Sidebar */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={styles.eyebrow}
            >
              The Future of Education
            </motion.span>
            
            <h1 className={styles.title}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ display: "block" }}
              >
                The Digital
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={styles.gradientText}
              >
                Backbone
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                for Modern Institutions
              </motion.span>
            </h1>
          </div>

          <div className={styles.cinemaLayout}>
            {/* Main Video Player (70%) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.mainPlayer}
            >
              <div 
                className={styles.videoCard}
                onClick={() => setIsPlaying(true)}
                onContextMenu={(e) => e.preventDefault()}
              >
                {isPlaying ? (
                  <video 
                    key={videoSrc}
                    src={videoSrc}
                    controls
                    autoPlay
                    crossOrigin="anonymous"
                    controlsList="nodownload"
                    disablePictureInPicture
                    className={styles.actualVideo}
                    onEnded={() => setIsPlaying(false)}
                  >
                    {/* Placeholder for Subtitles */}
                    <track 
                      label="English" 
                      kind="subtitles" 
                      srcLang="en" 
                      src="/subtitles-en.vtt" 
                      default={videoLang === "en"} 
                    />
                    <track 
                      label="Arabic" 
                      kind="subtitles" 
                      srcLang="ar" 
                      src="/subtitles-ar.vtt" 
                      default={videoLang === "ar"} 
                    />
                  </video>
                ) : (
                  <>
                    <div className={styles.glowRing} />
                    <Image 
                      src="/video_cover.png"
                      alt="Leadership Insights"
                      fill
                      className={styles.cover}
                    />
                    <div className={styles.heroPlayOverlay}>
                      <div className={styles.heroPlayBtn}>
                        <div className={styles.playIcon} />
                      </div>
                      <div className={styles.videoMeta}>
                        <span className={styles.liveBadge}>FEATURED TALK</span>
                        <h4>Leadership Insights: Digital Transformation</h4>
                        <p>A global roadmap for educational excellence</p>
                      </div>
                    </div>
                  </>
                )}
                
                <div className={styles.heroLangToggle}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setVideoLang("en"); }}
                    className={`${styles.miniLangBtn} ${videoLang === "en" ? styles.miniLangBtnActive : ""}`}
                  >
                    ENGLISH
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setVideoLang("ar"); }}
                    className={`${styles.miniLangBtn} ${videoLang === "ar" ? styles.miniLangBtnActive : ""}`}
                  >
                    العربية
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Transcript & Insights Sidebar (30%) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={styles.sidebar}
            >
              <div className={styles.sidebarHeader}>
                <FileText size={18} />
                <span>TRANSCRIPT & INSIGHTS</span>
              </div>
              <div className={styles.transcriptList}>
                {videoLang === "en" ? (
                  <>
                    <div className={styles.transcriptItem}>
                      <span className={styles.timestamp}>00:15</span>
                      <p>Opening: The shift toward digital-first education in the GCC region.</p>
                    </div>
                    <div className={styles.transcriptItem}>
                      <span className={styles.timestamp}>01:05</span>
                      <p>Core Pillars: How KICCPA integrates AI into the classroom safely.</p>
                    </div>
                    <div className={styles.transcriptItem}>
                      <span className={styles.timestamp}>02:45</span>
                      <p>Global Impact: Scaling from Kuwait to the international stage.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.transcriptItem}>
                      <span className={styles.timestamp}>٠٠:١٥</span>
                      <p>الافتتاحية: التحول نحو التعليم الرقمي في منطقة الخليج.</p>
                    </div>
                    <div className={styles.transcriptItem}>
                      <span className={styles.timestamp}>٠١:٠٥</span>
                      <p>الأركان الأساسية: كيف يدمج KICCPA الذكاء الاصطناعي بأمان.</p>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.sidebarFooter}>
                <Link href="/demo" className="btn-cp" style={{ width: "100%", textAlign: "center" }}>
                  Book Demo →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={styles.visionBand} aria-labelledby="schools-vision-heading">
        <div className={styles.container}>
          <div className={styles.visionBandInner}>
            <div className={styles.visionBandText}>
              <p className={styles.visionBandEyebrow}>LearnX · Kuwait &amp; GCC</p>
              <h2 className={styles.visionBandTitle} id="schools-vision-heading">
                Aligned with Kuwait Vision 2035 &amp; regional digital transformation
              </h2>
              <p className={styles.visionBandDesc}>
                Smart campuses, AI-powered learning, and unified LMS, SMS, and HRMS — built to modernize how your
                institution teaches, operates, and grows.
              </p>
            </div>
            <Link href="/learnx" className={styles.visionBandLink}>
              Read our vision →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Bento Feature Grid */}
      <section className={styles.bentoSection}>
        <div className={styles.container}>
          <div className={styles.bentoGrid}>
            {/* Card 1: AI Mentor */}
            <div className={`${styles.bentoCard} ${styles.c1}`}>
              <div className={styles.cardInfo}>
                <div className={styles.cardIcon}><BrainCircuit size={32} /></div>
                <h3 className={styles.cardTitle}>AI-Powered Learning Mentor</h3>
                <p className={styles.cardDesc}>
                  Our proprietary AI engine provides 24/7 support to students, adapting curriculum to individual learning speeds.
                </p>
                <div className={styles.bentoChecklist}>
                  <div className={styles.checkItem}><CheckCircle2 size={16} className={styles.check} /> 24/7 Student Support</div>
                  <div className={styles.checkItem}><CheckCircle2 size={16} className={styles.check} /> Adaptive Learning Paths</div>
                  <div className={styles.checkItem}><CheckCircle2 size={16} className={styles.check} /> Concept Reinforcement</div>
                </div>
              </div>
              <div className={styles.cardVisual}>
                <Image 
                  src={encodeURI("/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg")} 
                  alt="AI Mentor" 
                  fill 
                  className={styles.cover}
                />
              </div>
            </div>

            {/* Card 2: Dashboard */}
            <div className={`${styles.bentoCard} ${styles.c2}`}>
              <div className={styles.cardIcon}><LayoutDashboard size={32} /></div>
              <h3 className={styles.cardTitle}>Unified Dashboard</h3>
              <p className={styles.cardDesc}>Full visibility across multiple campuses from a single interface.</p>
              <div className={styles.dashboardPreview}>
                <div className={styles.previewBar} />
                <div className={styles.previewDots}>
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                  <div className={styles.dot} />
                </div>
              </div>
            </div>

            {/* Card 3: Compliance */}
            <div className={`${styles.bentoCard} ${styles.c3}`}>
              <div className={styles.cardIcon}><ShieldCheck size={32} /></div>
              <h3 className={styles.cardTitle}>Regional Compliance</h3>
              <p className={styles.cardDesc}>Built-in support for MoE Kuwait, CBSE, ICSE, and regional data standards.</p>
              <div className={styles.flagStrip}>
                <span>🇰🇼</span>
                <span>🇮🇳</span>
                <span>🇬🇧</span>
              </div>
            </div>

            {/* Card 4: Operations */}
            <div className={`${styles.bentoCard} ${styles.c4}`}>
              <div className={styles.cardInfo}>
                <div className={styles.cardIcon}><Settings size={32} /></div>
                <h3 className={styles.cardTitle}>Automated Operations</h3>
                <p className={styles.cardDesc}>
                  From fee collection and payroll to library and transport—manage your entire institution without the paperwork.
                </p>
                <div className={styles.bentoChecklist}>
                  <div className={styles.checkItem}><CheckCircle2 size={16} className={styles.check} /> Fee Automation</div>
                  <div className={styles.checkItem}><CheckCircle2 size={16} className={styles.check} /> GPS Bus Tracking</div>
                  <div className={styles.checkItem}><CheckCircle2 size={16} className={styles.check} /> Biometric Attendance</div>
                </div>
              </div>
              <div className={styles.cardVisual}>
                <Image 
                  src={encodeURI("/images/End-to-End Operational Digitization 1.jpeg")} 
                  alt="Operations" 
                  fill 
                  className={styles.cover}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stakeholder Trinity (Interactive Tabs) */}
      <section className={styles.stakeholders}>
        <div className={styles.container}>
          <div className={styles.header} style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 900 }}>A Solution for <em>Everyone</em></h2>
            <p style={{ color: "var(--lv-muted)", maxWidth: "600px", margin: "16px auto" }}>
              Every user group gets a tailored experience designed for maximum efficiency.
            </p>
          </div>

          <div className={styles.tabNav}>
            {stakeholders.map(s => (
              <button 
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`${styles.tabBtn} ${activeTab === s.id ? styles.tabBtnActive : ""}`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.tabContent}
            >
              <div className={styles.tabText}>
                <span style={{ color: "var(--OR)", fontWeight: 800, textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                  {currentTab.subtitle}
                </span>
                <h3>{currentTab.title}</h3>
                <p className={styles.cardDesc} style={{ fontSize: "1.1rem", marginBottom: "32px" }}>
                  {currentTab.desc}
                </p>
                <div className={styles.tabList}>
                  {currentTab.list.map(item => (
                    <div key={item} className={styles.tabListItem}>
                      <CheckCircle2 size={20} className={styles.check} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.tabImage}>
                <Image 
                  src={currentTab.image} 
                  alt={currentTab.title} 
                  fill 
                  className={styles.cover}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <ArchitectureGrid />

      {/* 4. Final Transformation CTA */}
      <section style={{ padding: "120px 0", background: "var(--P)", color: "#fff", textAlign: "center" }}>
        <div className={styles.container}>
          <h2 style={{ fontSize: "3.5rem", fontWeight: 900, marginBottom: "24px" }}>Ready to modernize your school?</h2>
          <p style={{ opacity: 0.8, fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto 48px" }}>
            Join hundreds of institutions already scaling with KICCPA's intelligent ecosystem.
          </p>
          <Link href="/demo" className="btn-cp" style={{ background: "#fff", color: "var(--P)" }}>
            Get a Personalized Quote →
          </Link>
        </div>
      </section>
    </div>
  );
}
