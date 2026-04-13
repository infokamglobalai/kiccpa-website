"use client";

import { useEffect } from "react";
import ParentsExperience from "@/frontend/stakeholders/ParentsExperience";
import StakeholderHero from "@/frontend/stakeholders/StakeholderHero";

export default function ParentsPage() {
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
        backdropVariant="teal"
        blendTo="mint"
        eyebrow="Stakeholders · Parents"
        headline="Your child's learning,"
        headlineEmphasis="in your language."
        description="Daily summaries, early alerts, and teacher messaging — in English or full RTL Arabic. Built for families in Kuwait and India who want clarity without chasing the school office."
        imageUrl="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=80"
        imageAlt="Parents collaborating with school digitally"
      />
      <ParentsExperience />
    </main>
  );
}
