"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { submitDemoBookingAction } from "@/lib/actions";
import styles from "./DemoBookingForm.module.css";

const PRODUCT_OPTIONS = [
  "Software Development",
  "CRM / ERP System",
  "LMS Platform",
  "AI Automation",
  "Dedicated Team (Agile)",
] as const;

export default function DemoBookingForm() {
  const [done, setDone] = useState<{ referenceId: string; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  if (done) {
    return (
      <section className={styles.wrap} id="book-demo">
        <div className={styles.success} role="status">
          <p className={styles.successTitle}>Request received</p>
          <p className={styles.successText}>{done.message}</p>
          <p className={styles.ref}>
            Your reference ID: <strong>{done.referenceId}</strong>
          </p>
          <p className={styles.successHint}>
            We sent a confirmation to your work email with next steps. If you do not see it within a few minutes, check
            spam or contact{" "}
            <a href="mailto:info@kiccpa.com" className={styles.inlineLink}>
              info@kiccpa.com
            </a>
            .
          </p>
          <div className={styles.successActions}>
            <Link href="/" className={styles.btnGhost}>
              Back to home
            </Link>
            <Link href="/contact" className={styles.btnGhost}>
              General inquiry
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.wrap} id="book-demo">
      <div className={styles.intro}>
        <p className={styles.eyebrow}>Schedule</p>
        <h2 className={styles.title}>
          Register for a <em>live demo</em>
        </h2>
        <p className={styles.lead}>
          Same data we collect on{" "}
          <Link href="/contact" className={styles.inlineLink}>
            Contact
          </Link>{" "}
          (name, work email, interest area, and your message) — plus scheduling fields so we can propose a slot like a
          typical enterprise sales team.
        </p>
        <p className={styles.alt}>
          Prefer email only?{" "}
          <Link href="/contact" className={styles.inlineLink}>
            Send a message
          </Link>{" "}
          instead of booking here.
        </p>
      </div>

      <form
        className={styles.form}
        action={(fd) => {
          setError(null);
          startTransition(async () => {
            const res = await submitDemoBookingAction(fd);
            if ("error" in res) {
              setError(res.error);
              return;
            }
            setDone({ referenceId: res.referenceId, message: res.message });
          });
        }}
      >
        {error ? (
          <div className={styles.error} role="alert">
            {error}
          </div>
        ) : null}

        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="dbf-name">Full name</label>
            <input id="dbf-name" name="fullName" type="text" required autoComplete="name" placeholder="John Doe" />
          </div>
          <div className={styles.field}>
            <label htmlFor="dbf-email">Work email</label>
            <input
              id="dbf-email"
              name="workEmail"
              type="email"
              required
              autoComplete="email"
              placeholder="you@organization.com"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="dbf-org">Organization / institution</label>
            <input id="dbf-org" name="organization" type="text" required placeholder="School or company name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="dbf-title">Job title</label>
            <input id="dbf-title" name="jobTitle" type="text" autoComplete="organization-title" placeholder="Optional" />
          </div>
          <div className={styles.field}>
            <label htmlFor="dbf-phone">Phone</label>
            <input id="dbf-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional, with country code" />
          </div>
          <div className={styles.field}>
            <label htmlFor="dbf-region">Country / region</label>
            <input id="dbf-region" name="countryRegion" type="text" required placeholder="e.g. Kuwait, India" />
          </div>
          <div className={`${styles.field} ${styles.span2}`}>
            <label htmlFor="dbf-product">Product interest</label>
            <select id="dbf-product" name="productInterest" required defaultValue="">
              <option value="" disabled>
                Select focus area
              </option>
              {PRODUCT_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="dbf-date">Preferred date</label>
            <input id="dbf-date" name="preferredDate" type="date" required min={minDate} />
          </div>
          <div className={styles.field}>
            <label htmlFor="dbf-time">Time preference</label>
            <select id="dbf-time" name="timePreference" required defaultValue="flexible">
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="dbf-tz">Timezone</label>
            <input id="dbf-tz" name="timezone" type="text" placeholder="e.g. Asia/Kuwait, IST" />
          </div>
          <div className={`${styles.field} ${styles.span2}`}>
            <label htmlFor="dbf-goals">What would you like to see?</label>
            <textarea
              id="dbf-goals"
              name="goals"
              required
              rows={4}
              minLength={10}
              placeholder="Stakeholders, integrations, LMS areas to cover, or questions for the session (min. 10 characters)."
            />
          </div>
        </div>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="dbf-hp">Company website</label>
          <input id="dbf-hp" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <p className={styles.consent}>
          By submitting, you agree that KICCPA may contact you about this demo request using the details above. You can
          request changes or withdraw consent by replying to our emails.
        </p>

        <button type="submit" className={styles.submit} disabled={isPending}>
          {isPending ? "Sending…" : "Submit demo request"}
        </button>
      </form>
    </section>
  );
}
