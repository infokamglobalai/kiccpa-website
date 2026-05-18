"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Globe2, 
  ShieldCheck, 
  FileText, 
  Download, 
  BarChart3, 
  Users,
  Building2,
  Loader2
} from "lucide-react";
import Link from "next/link";
import styles from "./InvestorsPremium.module.css";
import { MotionReveal } from "@/components/ui";

const metrics = [
  { val: "250+", label: "Institutions" },
  { val: "15M+", label: "API Requests / Day" },
  { val: "4", label: "Global Regions" },
  { val: "99.9%", label: "Uptime Reliability" }
];

const pillars = [
  {
    icon: <BarChart3 size={32} />,
    title: "Scalable Growth",
    desc: "A modular, cloud-native architecture that allows for rapid expansion into new markets and industries."
  },
  {
    icon: <Globe2 size={32} />,
    title: "Regional Sovereignty",
    desc: "Compliant with Kuwait Ministry of Education and India CBSE standards, ensuring multi-region dominance."
  },
  {
    icon: <Users size={32} />,
    title: "High Retention",
    desc: "A mission-critical ERP layer that becomes the permanent digital backbone of every institution we serve."
  }
];

export default function InvestorsPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resources", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        // Filter for Investor Documents only
        const investorDocs = data.filter((r: any) => r.category === 'Investor Document');
        setResources(investorDocs);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching investor resources:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.page}>
      {/* 1. Institutional Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={styles.eyebrow}
            >
              Corporate Governance & Value
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={styles.title}
            >
              Scaling the Future of <em>Intelligent Business</em>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.desc}
            >
              KICCPA provides institutional-grade stability and AI-driven efficiency for education groups and enterprise conglomerates worldwide.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ display: "flex", gap: "16px" }}
            >
              <Link href="/contact" className="btn-cp" style={{ background: "#ff823f", color: "#fff", borderColor: "#ff823f" }}>
                Connect with Investor Relations →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics */}
      <section className={styles.metricsSection}>
        <div className={styles.container}>
          <div className={styles.metricsGrid}>
            {metrics.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={styles.metricCard}
              >
                <div className={styles.metricVal}>{m.val}</div>
                <div className={styles.metricLabel}>{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Strategic Pillars */}
      <section className={styles.pillars}>
        <div className={styles.container}>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 900 }}>The <em>Investment</em> Case</h2>
            <p style={{ color: "var(--lv-muted)", marginTop: "16px" }}>
              Our strategy is built on three unbreakable pillars of growth, innovation, and trust.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            {pillars.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={styles.pillarCard}
              >
                <div className={styles.icon}>{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Investor Toolkit (Downloads) */}
      <section className={styles.resources}>
        <div className={styles.container}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "40px" }}>
            <div style={{ maxWidth: "600px" }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900 }}>Investor <em>Toolkit</em></h2>
              <p style={{ opacity: 0.7, marginTop: "16px" }}>
                Access our latest performance reports, corporate presentations, and governance frameworks.
              </p>
            </div>
            <Link href="/contact" style={{ color: "#ff823f", fontWeight: 800, textDecoration: "none" }}>
              Request Specific Data →
            </Link>
          </div>

          <div className={styles.resGrid}>
            {loading ? (
              <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "center", padding: "60px" }}>
                <Loader2 className="animate-spin" size={48} />
              </div>
            ) : resources.length > 0 ? (
              resources.map((res, i) => (
                <a 
                  key={i} 
                  href={res.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.resCard}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className={styles.resInfo}>
                    <h4>{res.title}</h4>
                    <p>{res.category} • {res.description || 'Download document'}</p>
                  </div>
                  <div className={styles.downloadBtn}>
                    <Download size={20} />
                  </div>
                </a>
              ))
            ) : (
              <p style={{ gridColumn: "span 2", textAlign: "center", opacity: 0.5, padding: "40px" }}>
                No investor documents available at this time.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 5. Final Transformation CTA */}
      <section style={{ padding: "120px 0", textAlign: "center", background: "#f8fafc" }}>
        <div className={styles.container}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "24px" }}>Built for <em>Global</em> Portfolios</h2>
            <p style={{ color: "var(--lv-muted)", fontSize: "1.1rem", marginBottom: "48px" }}>
              Join KICCPA as we redefine the digital infrastructure of modern institutions.
            </p>
            <Link href="/contact" className="btn-cp" style={{ background: "#1b4370", color: "#fff", borderColor: "#1b4370" }}>
              Inquire about Equity & Partnership →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
