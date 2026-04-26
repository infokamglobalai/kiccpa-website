"use client";

import SubPageHero from "@/components/SubPageHero/SubPageHero";
import { QuoteStrip } from "@/components/ui";
import { homePackageTeaser } from "@/frontend/lavender-home/homeContent";
import ProductsBrochureSection from "./ProductsBrochureSection";
import Link from "next/link";
import { useEffect } from "react";

export default function ProductsPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
  }, []);

  const [tierStd, tierPrem, tierEnt] = homePackageTeaser.tiers;

  return (
    <>
      <SubPageHero
        variant="products"
        eyebrow="LMS packages"
        title={
          <>
            Choose your <em>package</em>
          </>
        }
      >
        Three tiers for schools — from digital learning foundations to full operations on one stack. We size scope to
        your institution on a short call.
      </SubPageHero>

      <QuoteStrip
        quotes={[
          "Premium UX, built for school adoption.",
          "One login. One stack. Total visibility.",
          "Launch fast — then iterate with confidence.",
          "English + Arabic RTL, done right.",
          "Operational workflows, not just lessons.",
        ]}
      />

      <section id="packages" className="pkg-section rv" style={{ paddingTop: "28px" }}>
        <div className="pkg-head">
          <div className="sec-eyebrow" style={{ justifyContent: "center" }}>
            KICCPA LMS
          </div>
          <h2 className="sec-h2" style={{ textAlign: "center" }}>
            LMS <em>packages</em>
          </h2>
          <p className="sec-desc" style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
            Three tiers so you can start with digital learning and grow into full school operations
            on one stack.
          </p>
        </div>

        <div
          className="pkg-grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)", maxWidth: "1100px", margin: "0 auto" }}
        >
          <div id="lms-standard" className="pkg-c d2">
            <div className="pkg-badge pb1">{tierStd.tag}</div>
            <div className="pkg-name">{tierStd.name}</div>
            <div className="pkg-desc">{tierStd.blurb}</div>
            <ul className="pkg-list">
              <li>Structured courses, assessments &amp; mobile access</li>
              <li>Parent visibility &amp; basic analytics</li>
              <li>English–Arabic interface with RTL</li>
            </ul>
            <Link href="/demo">
              <button type="button" className="btn-p bp-ol">
                Talk to us
              </button>
            </Link>
          </div>

          <div id="lms-premium" className="pkg-c feat d1" style={{ transform: "scale(1.02)" }}>
            <div className="pkg-hot">Popular</div>
            <div className="pkg-badge pb2">All-in-one</div>
            <div className="pkg-name" style={{ color: "#fff" }}>
              {tierPrem.name}
            </div>
            <div className="pkg-desc w">{tierPrem.blurb}</div>
            <ul className="pkg-list">
              <li className="w">Everything in Standard</li>
              <li className="w">Fees, transport, canteen, results &amp; comms</li>
              <li className="w">Single login for leadership, staff &amp; families</li>
            </ul>
            <Link href="/demo">
              <button type="button" className="btn-p bp-wh">
                Request a demo
              </button>
            </Link>
          </div>

          <div id="lms-enterprise" className="pkg-c d2">
            <div className="pkg-badge pb1">{tierEnt.tag}</div>
            <div className="pkg-name">{tierEnt.name}</div>
            <div className="pkg-desc">{tierEnt.blurb}</div>
            <ul className="pkg-list">
              <li>White-label branding &amp; dedicated cloud options</li>
              <li>APIs, multi-campus control &amp; governance</li>
              <li>Custom AI &amp; integration roadmap</li>
            </ul>
            <Link href="/contact">
              <button type="button" className="btn-p bp-ol">
                Contact sales
              </button>
            </Link>
          </div>
        </div>

        <ProductsBrochureSection />
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
