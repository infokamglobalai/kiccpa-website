"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ProductsPage() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
  }, []);

  return (
    <>
      <section 
        className="sub-p-hero rv vis" 
        style={{ backgroundImage: 'url("/images/hero_platforms.png")' }}
      >
        <div className="sec-eyebrow" style={{ color: "var(--OR)", fontWeight: 800 }}>Our Flagship Platforms</div>
        <h2>Ready-to-Deploy <em>Ecosystems</em></h2>
        <p>Beyond custom engineering, KICCPA offers battle-tested flagship platforms ready to drop into your operational stack instantly.</p>
      </section>

      <section className="pkg-section rv" style={{ paddingTop: "20px" }}>
        <div className="pkg-grid" style={{ gridTemplateColumns: "1fr 1fr", maxWidth: "900px", margin: "0 auto" }}>
          
          <div className="pkg-c feat d1">
            <div className="pkg-hot">Education</div>
            <div className="pkg-badge pb2">🎓 LMS Platform</div>
            <div className="pkg-name" style={{ color: "#fff" }}>EduAiTutors</div>
            <div className="pkg-desc w">A premier AI-driven Learning Management System designed to bridge the gap between traditional education and modern industry demands.</div>
            
            <ul className="pkg-list">
              <li className="w">AI-Driven Learning Paths</li>
              <li className="w">Real-time Scheduled Video Sessions</li>
              <li className="w">Dynamic Progress Tracking Engines</li>
              <li className="w">Expert Mentorship Integration</li>
              <li className="w">Secure Content Delivery Network</li>
            </ul>
            <Link href="https://www.eduaitutors.com" target="_blank">
              <button className="btn-p bp-wh">Enroll Now</button>
            </Link>
          </div>

          <div className="pkg-c d2">
            <div className="pkg-badge pb1">💼 Corporate</div>
            <div className="pkg-name">Enterprise ERP &amp; CRM</div>
            <div className="pkg-desc">Robust backend administration platforms built to unify human resources, sales pipelines, and accounting.</div>
            
            <ul className="pkg-list">
              <li>End-to-end Sales Tracking</li>
              <li>Automated Invoicing &amp; Billing</li>
              <li>Deep Multi-tier Role Access</li>
              <li>Live Analytic Dashboards</li>
              <li>Seamless legacy system API hooks</li>
            </ul>
            <Link href="/contact"><button className="btn-p bp-ol">Deploy System</button></Link>
          </div>

        </div>
      </section>
      
      <div className="brands-bar rv">
        <div className="brand-track">
          <div className="brand-item">100% Scalable</div>
          <div className="brand-item">Cloud Hosted</div>
          <div className="brand-item">White Label Friendly</div>
          <div className="brand-item">SLA Guaranteed</div>
        </div>
      </div>
    </>
  );
}
