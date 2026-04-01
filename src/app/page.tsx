"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Scroll reveal
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    
    document.querySelectorAll('.rv').forEach(el => io.observe(el));

    // Course tabs logic
    document.querySelectorAll('.ctab').forEach((t) => {
      t.addEventListener('click', function(this: any) {
        document.querySelectorAll('.ctab').forEach(x => x.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // 3D tilt on cards
    document.querySelectorAll('.ccard, .gcc-c, .tc, .pkg-c, .mc').forEach(card => {
      card.addEventListener('mousemove', (e: any) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        (card as HTMLElement).style.transform = `translateY(-7px) perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = '';
      });
    });
  }, []);

  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="hero">
        <div className="hero-dot hd1"></div>
        <div className="hero-dot hd2"></div>
        <div className="hero-dot hd3"></div>

        {/* LEFT */}
        <div className="hero-left">
          <h1>Transforming Businesses<br />Through <span className="hl">Digital &amp; AI</span><br />Innovation</h1>
          <p className="hero-desc">KICCPA empowers organizations with cutting-edge software, CRM, LMS, and AI-driven solutions to accelerate digital transformation and growth on a global scale.</p>
          <div className="hero-cta" style={{ marginBottom: "40px", marginTop: "20px" }}>
            <Link href="/contact"><button className="btn-enroll">Book Consultation</button></Link>
            <button 
              className="btn-demo" 
              onClick={() => setShowVideo(true)}
            >
              <div className="play-btn">▶</div> Our Approach
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          <div className="hero-ring"></div>
          <div className="hero-person">
            <img 
              src="/images/Digital & AI 1.jpeg" 
              alt="AI Innovation" 
            />
          </div>
        </div>
      </section>

      {/* ════════ BRANDS BAR ════════ */}
      <div className="brands-bar rv">
        <div className="brand-track">
          <div className="brand-item"><div className="brand-icon">🏫</div>Education & Learning</div>
          <div className="brand-item"><div className="brand-icon">🏥</div>Healthcare Services</div>
          <div className="brand-item"><div className="brand-icon">🏢</div>Corporate Enterprises</div>
          <div className="brand-item"><div className="brand-icon">🛍️</div>Retail & Commerce</div>
          <div className="brand-item"><div className="brand-icon">🏠</div>Real Estate</div>
        </div>
      </div>

      {/* ════════ SEARCH ════════ */}
      <div className="search-section rv">
        <h2>Find the Right Solution</h2>
        <div className="sbar">
          <input type="text" placeholder="Search for CRM, Custom Software, LMS, AI integrations..." />
          <button>Search</button>
        </div>
        <div className="stags">
          <button className="stag">Software Dev</button>
          <button className="stag">CRM</button>
          <button className="stag">LMS</button>
          <button className="stag">Artificial Intelligence</button>
          <button className="stag">Digitization</button>
          <button className="stag">Data Analytics</button>
        </div>
      </div>

      {/* ════════ BENEFITS ════════ */}
      <section className="benefits rv">
        <div className="mosaic">
          <div className="mc mc1"><img src="/images/Globe Space 1.png" alt="Global Scope" /><strong>Global Scope</strong><small>India & Kuwait HQ</small></div>
          <div className="mc mc2"><img src="/images/Scalable Architecture 1.png" alt="Scalable Architecture" /><strong>Scalable Architecture</strong><small>Built to handle growth</small></div>
          <div className="mc mc3"><img src="/images/Reliable Support 1.png" alt="Reliable Support" /><strong>Reliable Support</strong><small>24/7 Dedicated Teams</small></div>
        </div>
        <div className="ben-list">
          <div className="sec-eyebrow">Why KICCPA</div>
          <h2 className="sec-h2"><em>Built Different.</em><br />Built to Last.</h2>
          <p className="sec-desc">A strategic spinoff of KAM International Group, delivering scalable, intelligent digital outcomes where regional precision meets global expertise.</p>
          <div className="ben-row"><div className="ben-ico bi1">🤝</div><div className="ben-text"><h4>Consultative Understanding</h4><p>We invest time to deeply understand your business needs, challenges, and goals before proposing any solution.</p></div></div>
          <div className="ben-row"><div className="ben-ico bi2">💻</div><div className="ben-text"><h4>Customized Development</h4><p>Every solution is tailored to your specific context — no off-the-shelf templates, no compromises.</p></div></div>
          <div className="ben-row"><div className="ben-ico bi3">⚡</div><div className="ben-text"><h4>Agile Execution</h4><p>Fast, flexible, and efficient delivery through iterative sprints so you see progress at every vital stage.</p></div></div>
          <div className="ben-row"><div className="ben-ico bi4">🚀</div><div className="ben-text"><h4>Continuous Innovation</h4><p>Technology evolves continuously—so do we. Our solutions are explicitly future-proofed for the digital age.</p></div></div>
        </div>
      </section>

      {/* ════════ CORE SERVICES (Formerly Popular Courses) ════════ */}
      <div className="courses-wrap rv">
        <div className="cw-head">
          <div className="sec-eyebrow" style={{ justifyContent: "center" }}>Explore</div>
          <h2><em>Our Core Services</em></h2>
          <p>Discover our most sought-after digital solutions, carefully curated to meet the demands of modern enterprises transitioning into the AI-first economy.</p>
        </div>
        <div className="course-tabs">
          <button className="ctab active">ALL</button>
          <button className="ctab">SOFTWARE</button>
          <button className="ctab">CRM</button>
          <button className="ctab">LMS</button>
          <button className="ctab">AI / ML</button>
          <button className="ctab">ERP</button>
        </div>
        <div className="cgrid">
          <div className="ccard d1">
            <div className="cc-img ci1"><img src="/images/Custom Enterprise Software Architecture 1.jpeg" alt="Software Architecture" /><div className="cbadge cbp">Core</div><div className="crating">★ 5.0</div></div>
            <div className="cc-body"><div className="cc-sub">Software Development</div><div className="cc-name">Custom Enterprise Software Architecture</div><div className="cc-inst">Tech Lead: <span>Ramesh P.</span> · India Dev Hub</div><div className="cc-stars">★★★★★</div><div className="cc-meta"><span>👥 40+ Deployments</span><span>⏱ Dedicated Agile Teams</span></div></div>
            <div className="cc-foot"><div className="cc-price">Scalable</div><button className="cc-btn">Learn More</button></div>
          </div>
          <div className="ccard d2">
            <div className="cc-img ci2"><img src="/images/Sales & Customer Relationship Platforms 1.jpeg" alt="CRM Solutions" /><div className="cbadge cbo">Popular</div><div className="crating">★ 4.9</div></div>
            <div className="cc-body"><div className="cc-sub">CRM Solutions</div><div className="cc-name">Sales &amp; Customer Relationship Platforms</div><div className="cc-inst">Product: <span>KICCPA CRM</span> · Global Standard</div><div className="cc-stars">★★★★★</div><div className="cc-meta"><span>👥 Thousands of Users</span><span>⏱ Cloud Hosted</span></div></div>
            <div className="cc-foot"><div className="cc-price">Integrated</div><button className="cc-btn">Learn More</button></div>
          </div>
          <div className="ccard d3">
            <div className="cc-img ci3"><img src="/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg" alt="LMS Platforms" /><div className="cbadge cbg">EdTech</div><div className="crating">★ 5.0</div></div>
            <div className="cc-body"><div className="cc-sub">LMS Platforms</div><div className="cc-name">EduAiTutors Advanced Learning Ecosystem</div><div className="cc-inst">Flagship: <span>EduAiTutors</span> · Education Sector</div><div className="cc-stars">★★★★★</div><div className="cc-meta"><span>👥 8,000+ Students</span><span>📖 Vast Content Libr...</span></div></div>
            <div className="cc-foot"><div className="cc-price">Enterprise</div><button className="cc-btn">Learn More</button></div>
          </div>
          <div className="ccard d1">
            <div className="cc-img ci4"><img src="/images/AI Predictive Analytics & Smart Automation.png" alt="AI Analytics" /><div className="cbadge cbp">Innovation</div><div className="crating">★ 4.8</div></div>
            <div className="cc-body"><div className="cc-sub">Artificial Intelligence</div><div className="cc-name">AI Predictive Analytics &amp; Smart Automation</div><div className="cc-inst">Focus: <span>Data Mining</span> · Process Automation</div><div className="cc-stars">★★★★☆</div><div className="cc-meta"><span>👥 High Process Yield</span><span>⏱ ML Workloads</span></div></div>
            <div className="cc-foot"><div className="cc-price">Automate</div><button className="cc-btn">Learn More</button></div>
          </div>
          <div className="ccard d2">
            <div className="cc-img ci5"><img src="/images/End-to-End Operational Digitization 1.jpeg" alt="Operational Digitization" /><div className="cbadge cbo">Scalable</div><div className="crating">★ 4.9</div></div>
            <div className="cc-body"><div className="cc-sub">Business Digitization</div><div className="cc-name">End-to-End Operational Digitization</div><div className="cc-inst">Consulting: <span>Strategy</span> · Digital Transformation</div><div className="cc-stars">★★★★★</div><div className="cc-meta"><span>👥 Paperless Office</span><span>⏱ Rapid Transition</span></div></div>
            <div className="cc-foot"><div className="cc-price">Turnkey</div><button className="cc-btn">Learn More</button></div>
          </div>
          <div className="ccard d3">
            <div className="cc-img ci6"><img src="/images/Robust Legacy System Integrations 1.jpeg" alt="System Integrations" /><div className="cbadge cbg">Integration</div><div className="crating">★ 5.0</div></div>
            <div className="cc-body"><div className="cc-sub">API &amp; ERP</div><div className="cc-name">Robust Legacy System Integrations</div><div className="cc-inst">Engineering: <span>Infrastructure</span> · Cloud Config</div><div className="cc-stars">★★★★★</div><div className="cc-meta"><span>👥 Zero Downtime</span><span>⏱ SLA Assured</span></div></div>
            <div className="cc-foot"><div className="cc-price">Seamless</div><button className="cc-btn">Learn More</button></div>
          </div>
        </div>
        <div className="view-all-wrap"><Link href="/services"><button className="btn-va">View All Services →</button></Link></div>
      </div>

      {/* ════════ INSTRUCTOR -> PARTNERSHIP ════════ */}
      <section className="inst-section rv">
        <div className="inst-left">
          <div className="sec-eyebrow">Partnership Model</div>
          <h2>If You Need Reliable Development <em>Partner With Us</em></h2>
          <p>Focused on measurable business outcomes and long-term relationships — not one-off deliveries. Partner with our global network of developers, QA testers, and AI engineers across Kuwait and India.</p>
          <h3>Why Trust KICCPA?</h3>
          <div className="perks">
            <div className="perk">Direct KAM Foundation</div>
            <div className="perk">Transparent Pipeline</div>
            <div className="perk">Elastic Developer Scaling</div>
            <div className="perk">Industry-Standard Security</div>
            <div className="perk">Legacy Code Modernization</div>
            <div className="perk">Long-Term Maintenance</div>
          </div>
          <Link href="/contact"><button className="btn-become">Schedule a Discovery Call</button></Link>
        </div>
  <div className="inst-card">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="inst-avatar">🏢</div>
            <div className="inst-name">KAM International Group</div>
            <div className="inst-role">Parent Organization · Established Heritage</div>
            <div className="inst-quote">"KICCPA represents our bold step into the sheer operational future. We bridge a rich legacy of global commercial success directly with Next-Generation Artificial Intelligence platforms."</div>
            <div className="inst-stats">
              <div><div className="is-v">20+</div><div className="is-l">Years Trust</div></div>
              <div><div className="is-v">HQ</div><div className="is-l">Kuwait base</div></div>
              <div><div className="is-v">A+</div><div className="is-l">Rating standing</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ GCC SECTION -> GLOBAL REACH ════════ */}
      <section className="gcc-section rv">
        <div className="gcc-top">
          <div>
            <div className="sec-eyebrow">Global Reach</div>
            <h2 className="sec-h2"><em>Worldwide Support</em> for Modern Enterprises</h2>
            <p style={{ fontSize: ".86rem", color: "var(--MU)", marginTop: "6px", lineHeight: "1.7", maxWidth: "500px" }}>Strategic hubs in Kuwait and India enabling seamless 24/7 delivery pipelines and local operational support.</p>
          </div>
          <button className="btn-browse">View Office Locations →</button>
        </div>
        <div className="gcc-grid">
          <div className="gcc-c d1"><div className="gcc-flag">🇰🇼</div><div className="gcc-name">Kuwait Headquarters</div><div className="gcc-desc">Strategic executive decisions, business relationship management, and Gulf-region account delivery handling.</div><div className="gcc-tz">🏢 Main HQ Base</div></div>
          <div className="gcc-c d2"><div className="gcc-flag">🇮🇳</div><div className="gcc-name">India Development Hub</div><div className="gcc-desc">KAM Global for Digital &amp; AI Media Solutions Pvt. Ltd handles heavy-duty backend engineering and scaling operations.</div><div className="gcc-tz">💻 Engineering Core</div></div>
          <div className="gcc-c d3"><div className="gcc-flag">🌐</div><div className="gcc-name">Global Footprint</div><div className="gcc-desc">Delivering solutions seamlessly distributed via top tier AWS/Azure infrastructure to clients anywhere on the planet.</div><div className="gcc-tz">☁️ Cloud Native</div></div>
          <div className="gcc-c d4"><div className="gcc-flag">🤝</div><div className="gcc-name">Channel Partnerships</div><div className="gcc-desc">Working intimately with consulting firms, ad agencies, and institutions as their dedicated white-label tech wing.</div><div className="gcc-tz">🔗 Enterprise B2B</div></div>
        </div>
      </section>

      {/* ════════ PACKAGES ════════ */}
      <section className="pkg-section rv">
        <div className="pkg-head">
          <div className="sec-eyebrow" style={{ justifyContent: "center" }}>Delivery Models</div>
          <h2 className="sec-h2" style={{ textAlign: "center" }}>Choose Your <em>Engagement</em></h2>
          <p style={{ fontSize: ".86rem", color: "var(--MU)", margin: "8px auto 0", maxWidth: "460px", lineHeight: "1.7", textAlign: "center" }}>Flexible structures for every enterprise — from focused MVP builds to full dedicated agile teams.</p>
        </div>
        <div className="pkg-grid">
          <div className="pkg-c d1">
            <div className="pkg-badge pb1">⭐ Project Based</div>
            <div className="pkg-name">MVP Build</div>
            <div className="pkg-desc">Perfect for focused execution of defined scope apps and landing pages.</div>
            <div className="pkg-price"><div className="pkg-num">Fixed</div><div className="pkg-per">/ milestone</div></div>
            <ul className="pkg-list">
              <li>Comprehensive Requirement Spec</li><li>Fixed Timeline Delivery</li>
              <li>Defined Testing Matrix</li><li>Standard Warranty</li>
              <li className="off">Iterative Pivot Capability</li><li className="off">Dedicated 24/7 Support</li>
            </ul>
            <Link href="/contact"><button className="btn-p bp-ol">Get Started</button></Link>
          </div>
          <div className="pkg-c feat d2">
            <div className="pkg-hot">Most Popular</div>
            <div className="pkg-badge pb2">🚀 Agile Team</div>
            <div className="pkg-name" style={{ color: "#fff" }}>Retainer Suite</div>
            <div className="pkg-desc w">A dedicated pod of engineers working as your own dev team.</div>
            <div className="pkg-price"><div className="pkg-num w">Dedicated</div><div className="pkg-per w">/ monthly</div></div>
            <ul className="pkg-list">
              <li className="w">Full Stack Engineer Access</li><li className="w">Monthly SLA &amp; Dashboards</li>
              <li className="w">Agile Sprint execution</li><li className="w">Guaranteed Developer Hours</li>
              <li className="w">Live KPI &amp; Code Check-ins</li><li className="w">Direct PM Communication</li>
            </ul>
            <Link href="/contact"><button className="btn-p bp-wh">Speak to Sales</button></Link>
          </div>
          <div className="pkg-c d3">
            <div className="pkg-badge pb3">👑 Boardroom</div>
            <div className="pkg-name">AI Transformation</div>
            <div className="pkg-desc">Total enterprise overhaul, mapping AI solutions into legacy infrastructure.</div>
            <div className="pkg-price"><div className="pkg-num">Custom</div><div className="pkg-per">/ consulting</div></div>
            <ul className="pkg-list">
              <li>C-Suite Architectural Design</li><li>Data Lake Analytics setup</li>
              <li>Process Deep Mining</li><li>Custom Deep Learning Maps</li>
              <li>Fully Trained LLM RAG pipelines</li><li>Dedicated Solution Architect</li>
            </ul>
            <Link href="/contact"><button className="btn-p bp-fl">Get Started</button></Link>
          </div>
        </div>
      </section>


      {/* ════════ CTA ════════ */}
      <section className="cta-section rv">
        <div className="sec-eyebrow" style={{ justifyContent: "center", marginBottom: "10px" }}>Connect With Us</div>
        <h2>Ready to Achieve <em>Digital Excellence?</em></h2>
        <p>Join the increasing wave of businesses trusting KICCPA for their critical infrastructure. Let's start the conversation and build your technical roadmap today.</p>
        <div className="cta-btns">
          <Link href="/contact"><button className="btn-cp">Schedule a Discovery Call →</button></Link>
          <Link href="/services"><button className="btn-co">Browse All Services</button></Link>
        </div>
      </section>

      {/* Video Modal Overlay */}
      {showVideo && (
        <div 
          className="video-modal-overlay" 
          onClick={() => setShowVideo(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(9, 11, 26, 0.96)', zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(12px)', padding: '20px'
          }}
        >
          <div 
            className="video-container" 
            onClick={e => e.stopPropagation()}
            style={{ 
              position: 'relative', width: '100%', maxWidth: '1000px', 
              borderRadius: '24px', overflow: 'hidden', 
              boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <button 
              onClick={() => setShowVideo(false)}
              style={{ 
                position: 'absolute', top: '24px', right: '24px', 
                background: 'var(--OR)', border: 'none', color: '#fff', 
                width: '44px', height: '44px', borderRadius: '50%', 
                cursor: 'pointer', zIndex: 10, fontSize: '1.4rem', 
                fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(255,130,63,0.4)'
              }}
            >
              ✕
            </button>
            <video 
              controls 
              autoPlay 
              style={{ width: '100%', display: 'block', aspectRatio: '16/9' }}
              src="/images/Demo.mp4"
            />
          </div>
        </div>
      )}
    </>
  );
}

