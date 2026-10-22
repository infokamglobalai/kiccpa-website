"use client";

import { useMemo, useState } from "react";
import type { PublicJob } from "@/lib/jobs";
import { countryLabel, documentLabel } from "@/lib/hiring-fields";
import styles from "./apply.module.css";

type Draft = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  currentTitle: string;
  currentCompany: string;
  experienceYears: string;
  noticePeriod: string;
  educationLevel: string;
  institution: string;
  graduationYear: string;
  linkedin: string;
  portfolio: string;
  coverNote: string;
  consent: boolean;
};

const empty: Draft = {
  fullName: "", email: "", phone: "", city: "", country: "", currentTitle: "", currentCompany: "",
  experienceYears: "", noticePeriod: "", educationLevel: "", institution: "", graduationYear: "",
  linkedin: "", portfolio: "", coverNote: "", consent: false,
};

export default function ApplicationForm({ job }: { job: PublicJob }) {
  const [draft, setDraft] = useState<Draft>(empty);
  const [resume, setResume] = useState<File | null>(null);
  const [extra, setExtra] = useState<File | null>(null);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const requiredDocs = job.documents || [];
  const [step, setStep] = useState<"edit" | "review" | "done">("edit");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [emailed, setEmailed] = useState(false);
  const [pending, setPending] = useState(false);

  const summary = useMemo(() => [
    `Role: ${job.title} (${job.reference})`,
    `Name: ${draft.fullName}`,
    `Email: ${draft.email}`,
    `Phone: ${draft.phone}`,
    `Location: ${draft.city}, ${draft.country}`,
    `Current role: ${draft.currentTitle || "—"} at ${draft.currentCompany || "—"}`,
    `Experience: ${draft.experienceYears || "0"} years`,
    `Notice period: ${draft.noticePeriod || "—"}`,
    `Education: ${draft.educationLevel}, ${draft.institution} ${draft.graduationYear}`,
    `LinkedIn: ${draft.linkedin || "—"}`,
    `Portfolio: ${draft.portfolio || "—"}`,
    `Resume: ${resume?.name || "Missing"}`,
    ...requiredDocs.map((id) => `${documentLabel(id)}: ${files[id]?.name || "Missing"}`),
    `Additional document: ${extra?.name || "None"}`,
    "",
    draft.coverNote,
  ].join("\n"), [draft, extra, files, job, requiredDocs, resume]);

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function validate() {
    if (draft.fullName.trim().length < 2) return "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) return "Enter a valid email.";
    if (draft.phone.trim().length < 6) return "Enter a phone number.";
    if (!draft.city.trim() || !draft.country.trim()) return "Enter your city and country.";
    if (draft.experienceYears === "" || Number(draft.experienceYears) < 0) return "Enter your years of experience. Use 0 if you are starting out.";
    if (!draft.educationLevel.trim() || !draft.institution.trim()) return "Enter your education and institution.";
    if (draft.coverNote.trim().length < 40) return "Write at least a short note about why you are applying.";
    if (!resume) return "Attach your resume.";
    if (resume.size > 5 * 1024 * 1024) return "The resume must be under 5 MB.";
    if (extra && extra.size > 5 * 1024 * 1024) return "The additional document must be under 5 MB.";
    for (const id of requiredDocs) {
      const file = files[id];
      if (!file) return `Upload your ${documentLabel(id)}.`;
      if (file.size > 5 * 1024 * 1024) return `${documentLabel(id)} must be under 5 MB.`;
    }
    if (!draft.consent) return "Confirm that KICCPA may review this application and keep the documents private.";
    return "";
  }

  async function submit() {
    if (!resume) return;
    setPending(true);
    setError("");
    const data = new FormData();
    Object.entries(draft).forEach(([key, value]) => data.set(key, String(value)));
    data.set("consent", draft.consent ? "true" : "");
    data.set("resume", resume);
    if (extra) data.set("extra", extra);
    requiredDocs.forEach((id) => { const file = files[id]; if (file) data.set(id, file); });
    try {
      const response = await fetch(`/api/jobs/${job.slug}/apply`, { method: "POST", body: data });
      const body = await response.json();
      if (!response.ok) {
        setError(body.error || "The application was not stored.");
        setPending(false);
        return;
      }
      setReference(body.reference);
      setEmailed(Boolean(body.emailed));
      setStep("done");
    } catch {
      setError("The server could not be reached. Nothing was stored.");
    }
    setPending(false);
  }

  if (step === "done") {
    return (
      <div className={styles.ok} role="status">
        <strong>Application stored.</strong>
        <p>Reference {reference}. {emailed ? "A confirmation with the role, this reference, and the review timeline has been sent to your email." : "Your application is with the talent team. A confirmation email could not be sent from this server."} This is not a hiring decision.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={(event) => { event.preventDefault(); const message = validate(); if (message) { setError(message); return; } setError(""); setStep("review"); }}>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {step === "edit" ? (
        <>
          <p className={styles.sectionTitle}>1 · Personal details</p>
          <div className={styles.grid}>
            <label>Full name<input value={draft.fullName} onChange={(e) => set("fullName", e.target.value)} autoComplete="name" required /></label>
            <label>Email<input type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" required /></label>
            <label>Phone<input value={draft.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" required /></label>
            <label>City<input value={draft.city} onChange={(e) => set("city", e.target.value)} required /></label>
            <label className={styles.full}>Country<input value={draft.country} onChange={(e) => set("country", e.target.value)} required /></label>
          </div>
          <p className={styles.sectionTitle}>2 · Experience</p>
          <div className={styles.grid}>
            <label>Current or most recent title<input value={draft.currentTitle} onChange={(e) => set("currentTitle", e.target.value)} /></label>
            <label>Organisation<input value={draft.currentCompany} onChange={(e) => set("currentCompany", e.target.value)} /></label>
            <label>Years of experience<input type="number" min="0" step="1" value={draft.experienceYears} onChange={(e) => set("experienceYears", e.target.value)} required /></label>
            <label>Notice period<input value={draft.noticePeriod} onChange={(e) => set("noticePeriod", e.target.value)} placeholder="Immediate, 30 days…" /></label>
            <label>LinkedIn<input value={draft.linkedin} onChange={(e) => set("linkedin", e.target.value)} /></label>
            <label>Portfolio or website<input value={draft.portfolio} onChange={(e) => set("portfolio", e.target.value)} /></label>
          </div>
          <p className={styles.sectionTitle}>3 · Education</p>
          <div className={styles.grid}>
            <label>Highest qualification<input value={draft.educationLevel} onChange={(e) => set("educationLevel", e.target.value)} required /></label>
            <label>Institution<input value={draft.institution} onChange={(e) => set("institution", e.target.value)} required /></label>
            <label>Year completed<input value={draft.graduationYear} onChange={(e) => set("graduationYear", e.target.value)} /></label>
          </div>
          <p className={styles.sectionTitle}>4 · This role</p>
          <label>Why this role, and what you would bring<textarea value={draft.coverNote} onChange={(e) => set("coverNote", e.target.value)} required /></label>
          <p className={styles.sectionTitle}>5 · Documents{job.hiringCountry ? ` · ${countryLabel(job.hiringCountry)}` : ""}</p>
          <label>Resume <span className={styles.file}>PDF, DOC, or DOCX · 5 MB maximum · required</span>
            <input type="file" accept=".pdf,.doc,.docx,application/pdf" onChange={(e) => setResume(e.target.files?.[0] || null)} required />
          </label>
          {requiredDocs.map((id) => (
            <label key={id}>{documentLabel(id)} <span className={styles.file}>Required for this role · PDF, DOC, DOCX, JPG, or PNG · 5 MB · private</span>
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={(e) => setFiles((current) => ({ ...current, [id]: e.target.files?.[0] || null }))} required />
            </label>
          ))}
          <label>Any other document <span className={styles.file}>Optional · not shown publicly</span>
            <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={(e) => setExtra(e.target.files?.[0] || null)} />
          </label>
          <label className={styles.check}>
            <input type="checkbox" checked={draft.consent} onChange={(e) => set("consent", e.target.checked)} />
            <span>I agree that KICCPA may store this application and the attached documents for recruitment. They are visible to the talent team, not on the public website.</span>
          </label>
          <button className={styles.btn} type="submit">Review application</button>
        </>
      ) : (
        <>
          <p className={styles.sectionTitle}>Review before sending</p>
          <pre className={styles.review}>{summary}</pre>
          <div className={styles.actions}>
            <button className={styles.btn} type="button" disabled={pending} onClick={submit}>{pending ? "Sending…" : "Submit application"}</button>
            <button className={styles.line} type="button" onClick={() => setStep("edit")}>Edit</button>
          </div>
        </>
      )}
    </form>
  );
}
