"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ServicesPage() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    
    document.querySelectorAll('.ccard').forEach(card => {
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
      <section 
        className="sub-p-hero rv vis" 
        style={{ backgroundImage: 'url("/images/hero_services.png")' }}
      >
        <div className="sec-eyebrow" style={{ color: "var(--OR)", fontWeight: 800 }}>Our Services</div>
        <h2>End-to-End Digital Solutions for the<br/><em>Modern Enterprise</em></h2>
        <p>From custom software to AI automation — every service we offer is built to transform your operations and accelerate growth.</p>
      </section>

      {/* Grid */}
      <div className="courses-wrap rv">
        <div className="cgrid">
          <Link href="/contact" className="ccard">
            <div className="cc-img ci1"><img src="/images/Custom Enterprise Software Architecture 1.jpeg" alt="Software Architecture" /><div className="cbadge cbp">01</div></div>
            <div className="cc-body">
              <div className="cc-name">Custom Software Development</div>
              <div className="cc-inst">Scalable, secure, and high-performance software tailored precisely to your goals.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Web Apps</span><span>➔ CI/CD Cloud</span><span>➔ Enterprise</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Build</div><button className="cc-btn">Inquire</button></div>
          </Link>
          
          <Link href="/contact" className="ccard">
            <div className="cc-img ci2"><img src="/images/Sales & Customer Relationship Platforms 1.jpeg" alt="CRM Solutions" /><div className="cbadge cbo">02</div></div>
            <div className="cc-body">
              <div className="cc-name">CRM Solutions</div>
              <div className="cc-inst">Empower your sales and customer engagement with intelligent CRM platforms.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Lead Gen</span><span>➔ Analytics</span><span>➔ Automations</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Engage</div><button className="cc-btn">Inquire</button></div>
          </Link>

          <Link href="/contact" className="ccard">
            <div className="cc-img ci3"><img src="/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg" alt="LMS Platforms" /><div className="cbadge cbg">03</div></div>
            <div className="cc-body">
              <div className="cc-name">Learning Management Systems</div>
              <div className="cc-inst">Build powerful digital learning ecosystems for institutions and enterprises.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Course Tracking</span><span>➔ Interactivity</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Educate</div><button className="cc-btn">Inquire</button></div>
          </Link>

          <Link href="/contact" className="ccard">
            <div className="cc-img ci4"><img src="/images/AI Predictive Analytics & Smart Automation.png" alt="AI Analytics" /><div className="cbadge cbp">04</div></div>
            <div className="cc-body">
              <div className="cc-name">AI &amp; Automation Solutions</div>
              <div className="cc-inst">Leverage Artificial Intelligence to unlock new levels of efficiency and insight.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Chatbots</span><span>➔ Predictive Models</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Optimize</div><button className="cc-btn">Inquire</button></div>
          </Link>

          <Link href="/contact" className="ccard">
            <div className="cc-img ci5"><img src="/images/End-to-End Operational Digitization 1.jpeg" alt="Operational Digitization" /><div className="cbadge cbo">05</div></div>
            <div className="cc-body">
              <div className="cc-name">Business Digitization</div>
              <div className="cc-inst">Transform traditional operations into seamless, scalable digital workflows.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Paperless</span><span>➔ Cloud Transition</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Scale</div><button className="cc-btn">Inquire</button></div>
          </Link>
        </div>
      </div>

      <section className="process-sec rv">
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div className="sec-eyebrow" style={{ justifyContent: 'center' }}>Our Proven Process</div>
            <h2 className="sec-h2" style={{ fontSize: '3rem' }}>How We <em>Deliver</em></h2>
          </div>

          <div className="process-grid">
            <div className="process-img-wrap">
              <div className="process-glow"></div>
              <img 
                src="/images/ultra_services_tech_1774864472836.png" 
                alt="Tech Stack" 
                className="process-img"
              />
            </div>

            <div className="process-timeline">
              
              <div className="process-step">
                <div className="p-num c-navy">1</div>
                <div className="p-card">
                  <h4 className="c-navy">Requirement Analysis</h4>
                  <p>Deep dive into your goals and operational context to craft a precision blueprint tailored to your enterprise.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="p-num c-orange">2</div>
                <div className="p-card">
                  <h4 className="c-orange">Solution Design</h4>
                  <p>Complete architecture, immersive wireframing, and strategic UX planning mapping your future workflow seamlessly.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="p-num c-navy">3</div>
                <div className="p-card">
                  <h4 className="c-navy">Development &amp; Testing</h4>
                  <p>Rigorous, scalable agile builds backed by automated QA testing matrices and dedicated engineering sprints.</p>
                </div>
              </div>

              <div className="process-step">
                <div className="p-num c-orange">4</div>
                <div className="p-card">
                  <h4 className="c-orange">Deployment &amp; Support</h4>
                  <p>Flawless go-live execution followed by dedicated round-the-clock maintenance and SLA commitments.</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <style jsx>{`
          .process-sec {
            padding: 120px 0;
            background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
            position: relative;
            overflow: hidden;
          }
          .process-grid {
            display: grid;
            grid-template-columns: 1fr 1.2fr;
            gap: 80px;
            align-items: center;
          }
          @media (max-width: 900px) {
            .process-grid { grid-template-columns: 1fr; gap: 60px; }
            .process-timeline { padding-left: 20px !important; margin-left: 20px; }
            .p-num { left: -44px !important; }
          }
          .process-img-wrap {
            position: relative;
            border-radius: 30px;
            margin-left: 20px;
          }
          .process-glow {
            position: absolute;
            inset: -20px;
            background: linear-gradient(45deg, var(--P), var(--OR));
            filter: blur(40px);
            opacity: 0.15;
            transition: opacity 0.5s;
            border-radius: 40px;
            z-index: 0;
          }
          .process-img-wrap:hover .process-glow { opacity: 0.3; }
          .process-img {
            position: relative;
            z-index: 1;
            width: 100%;
            border-radius: 30px;
            box-shadow: 0 40px 80px rgba(27,67,112,0.15);
            border: 1px solid rgba(255,255,255,0.8);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .process-img-wrap:hover .process-img {
            transform: scale(1.03) translateY(-10px);
          }
          
          .process-timeline {
            position: relative;
            padding-left: 40px;
            border-left: 2px dashed #cbd5e1;
          }
          .process-step {
            position: relative;
            margin-bottom: 40px;
            padding-left: 20px;
            cursor: pointer;
            perspective: 1000px;
          }
          .process-step:last-child { margin-bottom: 0; }
          
          .p-num {
            position: absolute;
            left: -64px; /* 40 padding + 24 half width */
            top: 10px;
            width: 48px;
            height: 48px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.3rem;
            font-weight: 800;
            box-shadow: 0 10px 20px rgba(0,0,0,0.08);
            border: 3px solid;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 2;
          }
          .process-step:hover .p-num.c-navy { background: var(--P); color: white !important; transform: scale(1.15); box-shadow: 0 15px 30px rgba(27,67,112,0.4); border-color: transparent; }
          .process-step:hover .p-num.c-orange { background: var(--OR); color: white !important; transform: scale(1.15); box-shadow: 0 15px 30px rgba(255,130,63,0.4); border-color: transparent; }

          .p-num.c-navy { border-color: var(--P); color: var(--P); }
          .p-num.c-orange { border-color: var(--OR); color: var(--OR); }

          .p-card {
            background: white;
            padding: 30px 35px;
            border-radius: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            border: 1px solid #f8fafc;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform-origin: left center;
          }
          .process-step:hover .p-card {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 25px 50px rgba(27,67,112,0.08);
          }
          .process-step:hover:nth-child(odd) .p-card { border-color: rgba(27,67,112,0.1); }
          .process-step:hover:nth-child(even) .p-card { border-color: rgba(255,130,63,0.1); }

          .p-card h4 {
            font-size: 1.35rem;
            font-weight: 800;
            margin-bottom: 12px;
            transition: color 0.3s;
          }
          .p-card h4.c-navy { color: var(--P); }
          .p-card h4.c-orange { color: var(--OR); }
          
          .p-card p {
            color: #475569;
            font-size: 1rem;
            line-height: 1.7;
            margin: 0;
            font-weight: 500;
          }
        `}</style>
      </section>


    </>
  );
}
