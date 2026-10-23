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
          <div style={{ marginTop: 32, padding: "20px 24px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0", textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#0f172a" }}>
              Prefer to speak directly with an expert?
            </p>
            <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem" }}>
              Call our Kuwait headquarters at{" "}
              <a href="tel:+96560919345" style={{ color: "#2563eb", fontWeight: 700 }}>+965 6091 9345</a>
              {" "}or message via WhatsApp at{" "}
              <a href="https://wa.me/96599889588" target="_blank" rel="noreferrer" style={{ color: "#16a34a", fontWeight: 700 }}>+965 9988 9588</a>
              {" "}· Email: <a href="mailto:info@kiccpa.com" style={{ color: "#2563eb", textDecoration: "underline" }}>info@kiccpa.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
