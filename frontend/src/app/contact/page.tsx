import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactExperience from "@/kam/ContactExperience";
import styles from "@/kam/kam.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KICCPA by WhatsApp, phone, or email, or send a business enquiry. A message is marked sent only after the server accepts it.",
};

export default function Page() {
  return (
    <main className={styles.ct}>
      <section className={styles.ctHero} aria-label="Contact KICCPA">
        <div className={styles.ctHeroGrid}>
          <div className={styles.ctHeroCopy}>
            <p className={styles.ctEyebrow}>Contact KICCPA</p>
            <h1>Let&apos;s talk about what you need to build.</h1>
            <p>Tell us about your business requirements. Our team can review your enquiry and identify a relevant next step.</p>
          </div>
          <figure className={styles.ctHeroMedia}>
            <img src="/assets/hero/home-hero.jpg" alt="Contemporary glass architecture in deep blue light, used beside the contact introduction." />
          </figure>
        </div>
      </section>
      <Suspense fallback={<p className={styles.ctLoading}>Loading the form…</p>}>
        <ContactExperience />
      </Suspense>
      <section className={styles.ctClose}>
        <div className={styles.wrap}>
          <h2>Not sure where to start?</h2>
          <p>Explore our services to identify the right area for your enquiry.</p>
          <Link className={styles.hpBtn} href="/services">Explore Our Services <span className={styles.arrow}>→</span></Link>
        </div>
      </section>
    </main>
  );
}
