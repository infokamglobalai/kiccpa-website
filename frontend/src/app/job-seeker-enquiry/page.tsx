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
        </div>
      </section>
    </main>
  );
}
