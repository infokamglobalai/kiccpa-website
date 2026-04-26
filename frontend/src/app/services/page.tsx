"use client";

import SubPageHero from "@/components/SubPageHero/SubPageHero";
import ProcessDeliverSection from "./ProcessDeliverSection";
import AppDevPortfolioSection from "./AppDevPortfolioSection";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { QuoteStrip } from "@/components/ui";

export default function ServicesPage() {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    
    document.querySelectorAll('.ccard').forEach(card => {
      card.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent;
        const r = card.getBoundingClientRect();
        const x = (me.clientX - r.left) / r.width - 0.5;
        const y = (me.clientY - r.top) / r.height - 0.5;
        (card as HTMLElement).style.transform = `translateY(-7px) perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = '';
      });
    });
  }, []);

  return (
    <>
      <SubPageHero
        variant="services"
        eyebrow="Our Services"
        title={
          <>
            End-to-End Digital Solutions for the
            <br />
            <em>Modern Enterprise</em>
          </>
        }
      >
        From custom software to AI automation — every service we offer is built to transform your operations and
        accelerate growth.
      </SubPageHero>

      <QuoteStrip
        quotes={[
          "Build once. Scale everywhere.",
          "From idea → prototype → production.",
          "Enterprise architecture, startup speed.",
          "Web • Android • iOS — one delivery team.",
          "Outcomes over outputs. Always.",
        ]}
      />

      {/* Grid */}
      <div className="courses-wrap rv">
        <div className="cgrid">
          <Link href="/contact" className="ccard">
            <div className="cc-img ci1">
              <Image
                src="/images/Custom Enterprise Software Architecture 1.jpeg"
                alt="Software Architecture"
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
              />
              <div className="cbadge cbp">01</div>
            </div>
            <div className="cc-body">
              <div className="cc-name">Custom Software Development</div>
              <div className="cc-inst">Scalable, secure, and high-performance software tailored precisely to your goals.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Web Apps</span><span>➔ CI/CD Cloud</span><span>➔ Enterprise</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Build</div><button className="cc-btn">Inquire</button></div>
          </Link>
          
          <Link href="/contact" className="ccard">
            <div className="cc-img ci2">
              <Image
                src="/images/Sales & Customer Relationship Platforms 1.jpeg"
                alt="CRM Solutions"
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
              />
              <div className="cbadge cbo">02</div>
            </div>
            <div className="cc-body">
              <div className="cc-name">CRM Solutions</div>
              <div className="cc-inst">Empower your sales and customer engagement with intelligent CRM platforms.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Lead Gen</span><span>➔ Analytics</span><span>➔ Automations</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Engage</div><button className="cc-btn">Inquire</button></div>
          </Link>

          <Link href="/contact" className="ccard">
            <div className="cc-img ci3">
              <Image
                src="/images/EduAiTutors Advanced Learning Ecosystem 1.jpeg"
                alt="LMS Platforms"
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
              />
              <div className="cbadge cbg">03</div>
            </div>
            <div className="cc-body">
              <div className="cc-name">Learning Management Systems</div>
              <div className="cc-inst">Build powerful digital learning ecosystems for institutions and enterprises.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Course Tracking</span><span>➔ Interactivity</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Educate</div><button className="cc-btn">Inquire</button></div>
          </Link>

          <Link href="/contact" className="ccard">
            <div className="cc-img ci4">
              <Image
                src="/images/AI Predictive Analytics & Smart Automation.png"
                alt="AI Analytics"
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
              />
              <div className="cbadge cbp">04</div>
            </div>
            <div className="cc-body">
              <div className="cc-name">AI &amp; Automation Solutions</div>
              <div className="cc-inst">Leverage Artificial Intelligence to unlock new levels of efficiency and insight.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ NLP &amp; automation</span><span>➔ Predictive models</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Optimize</div><button className="cc-btn">Inquire</button></div>
          </Link>

          <Link href="/contact" className="ccard">
            <div className="cc-img ci5">
              <Image
                src="/images/End-to-End Operational Digitization 1.jpeg"
                alt="Operational Digitization"
                fill
                sizes="(max-width: 860px) 100vw, 33vw"
              />
              <div className="cbadge cbo">05</div>
            </div>
            <div className="cc-body">
              <div className="cc-name">Business Digitization</div>
              <div className="cc-inst">Transform traditional operations into seamless, scalable digital workflows.</div>
              <div className="cc-meta" style={{ marginTop: "12px" }}><span>➔ Paperless</span><span>➔ Cloud Transition</span></div>
            </div>
            <div className="cc-foot"><div className="cc-price">Scale</div><button className="cc-btn">Inquire</button></div>
          </Link>
        </div>
      </div>

      <AppDevPortfolioSection />

      <ProcessDeliverSection />


    </>
  );
}
