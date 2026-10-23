import type { Metadata } from "next";
import { Suspense } from "react";
import { JobSeekerForm } from "@/kam/EnquiryForm";
import styles from "@/kam/kam.module.css";

export const metadata: Metadata = {
  title: "Job seeker enquiry",
  description: "Send a recruitment enquiry to KICCPA. Published roles and CV uploads stay on Careers.",
};

export default function Page() {
  return (
    <main className={styles.sv}>
      <section className={styles.svHero}>
        <div className={styles.wrap}>
          <p className={styles.svEyebrow}>Job seeker</p>
          <h1>Start a recruitment enquiry.</h1>
          <p>This is not an open vacancy and not a placement. Apply to a published role on Careers if you need to upload a CV.</p>
        </div>
      </section>
      <section className={styles.svSection}>
        <div className={`${styles.wrap} ${styles.svForm}`}>
          <Suspense fallback={<p>Loading the form…</p>}>
            <JobSeekerForm />
          </Suspense>
          <div style={{ marginTop: 32, padding: "20px 24px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0", textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontWeight: 700, color: "#0f172a" }}>
              Prefer direct recruitment communication?
            </p>
            <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem" }}>
              WhatsApp our talent acquisition team at{" "}
              <a href="https://wa.me/96599889588" target="_blank" rel="noreferrer" style={{ color: "#16a34a", fontWeight: 700 }}>+965 9988 9588</a>
              {" "}or email your profile to{" "}
              <a href="mailto:careers@kiccpa.com" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}>careers@kiccpa.com</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
