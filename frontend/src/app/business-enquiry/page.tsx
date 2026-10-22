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
    <main className={styles.sv}>
      <section className={styles.svHero}>
        <div className={styles.wrap}>
          <p className={styles.svEyebrow}>Business enquiry</p>
          <h1>Discuss your requirements.</h1>
          <p>Tell us the division and the service. The team reviews what you send. This is not a quote, and it is marked sent only after the server accepts it.</p>
        </div>
      </section>
      <section className={styles.svSection}>
        <div className={`${styles.wrap} ${styles.svForm}`}>
          <Suspense fallback={<p>Loading the form…</p>}>
            <BusinessEnquiryForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
