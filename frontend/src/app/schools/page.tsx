"use client";

import { useEffect } from "react";
import SchoolsArchitecture from "@/frontend/stakeholders/SchoolsArchitecture";
import StakeholderHero from "@/frontend/stakeholders/StakeholderHero";

export default function SchoolsPage() {
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

  return (
    <main>
      <StakeholderHero
        backdropVariant="navy"
        blendTo="slate"
        eyebrow="Stakeholders · Schools"
        headline="One ERP."
        headlineEmphasis="Every operational layer."
        description="From admissions and fees to AI evaluation, transport, and multi-campus governance — the KICCPA School Management architecture is designed for institutions that need measurable outcomes, not fragmented tools."
        imageUrl="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Modern school campus and learning environment"
      />
      <SchoolsArchitecture />
    </main>
  );
}
