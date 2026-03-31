"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
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
        style={{ backgroundImage: 'url("/images/hero_about.png")' }}
      >
        <div className="sec-eyebrow" style={{ color: "var(--OR)", fontWeight: 800 }}>About Our Legacy</div>
        <h2>Forward-Thinking Technology,<br/>Rooted in <em>Kuwait</em></h2>
        <p>A forward-thinking technology company headquartered in Kuwait. As a spinoff of KAM International Group, we bring a legacy of excellence combined with a future-ready digital approach.</p>
      </section>

      {/* Story & Approach */}
      <section className="inst-section rv">
        <div className="inst-left">
          <div className="sec-eyebrow">Our Story</div>
          <h2>Where We <em>Came From</em></h2>
          <p>Founded with a vision to drive digital transformation, KICCPA helps organizations modernize operations through customized technology solutions. Our collaboration with KAM Global enables world-class delivery.</p>
          
          <h3 style={{ marginTop: "32px" }}>Our Core Delivery Principles</h3>
          <div className="perks">
            <div className="perk">Consultative Understanding</div>
            <div className="perk">Customized Execution</div>
            <div className="perk">Agile Methodology</div>
            <div className="perk">Future-Proofed Architecture</div>
          </div>
        </div>
        
        <div className="inst-card">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="inst-avatar" style={{ borderRadius: '16px', width: 'auto', height: '140px', overflow: 'hidden' }}>
              <img 
                src="/images/ultra_about_team_1774864451077.png" 
                alt="Our Team" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div className="inst-name" style={{ marginTop: '16px' }}>KICCPA &amp; KAM Global Team</div>
            <div className="inst-role">Strategic Hubs in Kuwait &amp; India</div>
            <div className="inst-quote" style={{ marginTop: "24px" }}>"To empower organizations with innovative, scalable, and intelligent digital platforms that enhance efficiency and drive sustainable growth."</div>
            <div className="inst-stats">
              <div><div className="is-v" style={{ color: "var(--OR)" }}>High</div><div className="is-l">Efficiency</div></div>
              <div><div className="is-v" style={{ color: "var(--OR)" }}>Global</div><div className="is-l">Scale</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <div className="search-section rv">
        <div className="sec-eyebrow" style={{ justifyContent: "center" }}>Industries We Serve</div>
        <h2>Built Across Key Sectors</h2>
        <div className="stags">
          <button className="stag">🏫 Education</button>
          <button className="stag">💻 EdTech</button>
          <button className="stag">🏥 Healthcare</button>
          <button className="stag">🏢 Enterprise</button>
          <button className="stag">📚 Training</button>
          <button className="stag">🛍️ Retail</button>
          <button className="stag">🏠 Real Estate</button>
        </div>
      </div>

      <section className="cta-section rv" style={{ background: "#fff", borderTop: "none" }}>
        <h2>We Don't Just Build Software.<br/>We Build <em>Partnerships.</em></h2>
        <p>Focused on measurable business outcomes and long-term relationships — not one-off deliveries.</p>
        <div className="cta-btns">
          <Link href="/services"><button className="btn-cp">Explore Our Services →</button></Link>
          <Link href="/contact"><button className="btn-co">Talk to Us</button></Link>
        </div>
      </section>
    </>
  );
}
