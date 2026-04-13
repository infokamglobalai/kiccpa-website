"use client";

import { useEffect } from "react";
import InvestorsExperience from "@/frontend/stakeholders/InvestorsExperience";
import StakeholderHero from "@/frontend/stakeholders/StakeholderHero";

export default function InvestorsPage() {
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
        backdropVariant="warm"
        eyebrow="Stakeholders · Investors & boards"
        headline="Data that holds up"
        headlineEmphasis="in the boardroom."
        description="Portfolio roll-up, payback visibility, and ministry-ready assurance — KICCPA LMS gives education groups and investors the same real-time intelligence that teachers see in the classroom."
        imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Corporate governance and city skyline"
      />
      <InvestorsExperience />
    </main>
  );
}
