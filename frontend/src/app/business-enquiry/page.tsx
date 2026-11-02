import type { Metadata } from "next";
import { Suspense } from "react";
import { BusinessEnquiryForm } from "@/kam/EnquiryForm";
import styles from "@/kam/kam.module.css";

export const metadata: Metadata = {
  title: "Business enquiry",
  description: "Send a KICCPA service enquiry. The form is stored only after the server accepts it.",
};

export default function Page() {
  return (
    <main className={`${styles.sv} ${styles.talkPage}`}>
      <header className={styles.talkIntro}>
        <div className={styles.wrap}>
          <p className={styles.svEyebrow}>Let’s talk</p>
          <h1>A conversation worth starting.</h1>
          <p>Tell us what you’re working towards. We’ll help you find the right expertise and a practical next step.</p>
        </div>
      </header>
      <section className={styles.talkSection}>
        <div className={`${styles.wrap} ${styles.talkLayout}`}>
          <aside className={styles.talkAside}>
            <p className={styles.svEyebrow}>Built around you</p>
            <h2>Good work starts with understanding.</h2>
            <p>A few details help us connect your enquiry with the right team.</p>
            <ol>
              <li><span>01</span><div><strong>Share your priorities</strong><p>Tell us about your business and the support you need.</p></div></li>
              <li><span>02</span><div><strong>Connect with our team</strong><p>We’ll review your brief and clarify the requirements.</p></div></li>
              <li><span>03</span><div><strong>Explore the next step</strong><p>Discuss an approach shaped around your needs.</p></div></li>
            </ol>
            <div className={styles.talkDirect}><strong>Prefer to speak directly?</strong><p>Find the right contact for your region.</p><a href="/contact">View contact details <span aria-hidden="true">↗</span></a></div>
          </aside>
          <div className={styles.talkFormCard}>
            <h2>Tell us about your project.</h2>
            <p className={styles.talkFormLede}>Share your details below. Fields marked <span aria-hidden="true">*</span> are required.</p>
            <Suspense fallback={<p>Loading the form…</p>}><BusinessEnquiryForm /></Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
