import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactExperience from "@/kam/ContactExperience";
import PhotoHero from "@/kam/PhotoHero";
import styles from "@/kam/kam.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KICCPA by WhatsApp, phone, or email, or send a business enquiry. A message is marked sent only after the server accepts it.",
};

export default function Page() {
  return (
    <main className={styles.ct}>
      <PhotoHero eyebrow="Contact KICCPA" title="Let's talk about what you need to build." description="Tell us about your business requirements. Our team can review your enquiry and identify a relevant next step." image="/assets/photography/contact-office.jpg" alt="A bright contemporary office designed for collaboration." />
      <Suspense fallback={<p className={styles.ctLoading}>Loading the form…</p>}>
        <ContactExperience />
      </Suspense>
      <section className={`${styles.ctClose} ${styles.imageClose}`}>
        <figure className={styles.bannerPhoto}><img src="/assets/photography/contact-collaboration.jpg" alt="Colleagues collaborating in a bright workspace" loading="lazy" /></figure>
        <div className={styles.wrap}>
          <h2>Not sure where to start?</h2>
          <p>Explore our services to identify the right area for your enquiry.</p>
          <Link className={styles.hpBtn} href="/services">Explore Our Services <span className={styles.arrow}>→</span></Link>
        </div>
      </section>
    </main>
  );
}
