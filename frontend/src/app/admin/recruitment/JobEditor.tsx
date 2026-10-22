"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveJob } from "@/lib/recruitment-actions";
import { jobDepartments } from "@/kam/site";
import { documentsForCountry, hiringCountries, professionalDocuments } from "@/lib/hiring-fields";
import type { PublicJob } from "@/lib/jobs";
import styles from "./desk.module.css";

function join(values?: string[]) {
  return (values || []).join("\n");
}

export default function JobEditor({ job }: { job?: PublicJob }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    title: job?.title || "",
    department: job?.department || "it-digital",
    location: job?.location || "",
    workplace: job?.workplace || "hybrid",
    employmentType: job?.employmentType || "full-time",
    experienceMin: String(job?.experienceMin ?? 0),
    experienceMax: String(job?.experienceMax ?? 0),
    openings: String(job?.openings ?? 1),
    deadline: job?.deadline ? String(job.deadline).slice(0, 10) : "",
    salaryCurrency: job?.salaryCurrency || "KWD",
    salaryMin: job?.salaryMin ? String(job.salaryMin) : "",
    salaryMax: job?.salaryMax ? String(job.salaryMax) : "",
    salaryPeriod: job?.salaryPeriod || "yearly",
    managerName: job?.managerName || "",
    managerRole: job?.managerRole || "",
    hiringCountry: job?.hiringCountry || "kuwait",
    documents: job?.documents || [],
    rounds: join(job?.rounds),
    status: job?.status || "draft",
    summary: job?.summary || "",
    about: job?.about || "",
    responsibilities: join(job?.responsibilities),
    requirements: join(job?.requirements),
    niceToHave: join(job?.niceToHave),
    benefits: join(job?.benefits),
  });

  function set(key: string, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleDocument(id: string) {
    setForm((current) => ({
      ...current,
      documents: current.documents.includes(id) ? current.documents.filter((item) => item !== id) : [...current.documents, id],
    }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      await saveJob(job?.id || null, form);
      router.push("/admin/recruitment/jobs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the role.");
      setPending(false);
    }
  }

  return (
    <form className={`${styles.form} ${styles.roleForm}`} onSubmit={onSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>The role</h2>
          <p className={styles.blockNote}>This is what appears on Careers once the status is Published.</p>
        </div>
        <div className={styles.fields}>
          <label className={styles.span}>Job title<input value={form.title} onChange={(e) => set("title", e.target.value)} required /></label>
          <label>Service
            <select value={form.department} onChange={(e) => set("department", e.target.value)}>
              {jobDepartments.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <label>Status
            <select value={form.status} onChange={(e) => set("status", e.target.value)}>
              <option value="draft">Draft — hidden</option>
              <option value="published">Published — visible on the site</option>
              <option value="closed">Closed</option>
            </select>
          </label>
          <label>Location<input value={form.location} onChange={(e) => set("location", e.target.value)} required /></label>
          <label>Workplace
            <select value={form.workplace} onChange={(e) => set("workplace", e.target.value)}>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
              <option value="remote">Remote</option>
            </select>
          </label>
          <label>Employment type
            <select value={form.employmentType} onChange={(e) => set("employmentType", e.target.value)}>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </label>
          <label>Application deadline<input type="date" value={form.deadline} onChange={(e) => set("deadline", e.target.value)} /></label>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Experience and openings</h2>
          <p className={styles.blockNote}>The experience range is used when applications are matched to this role.</p>
        </div>
        <div className={styles.fields}>
          <label>Minimum experience (years)<input type="number" min="0" value={form.experienceMin} onChange={(e) => set("experienceMin", e.target.value)} /></label>
          <label>Maximum experience (years)<input type="number" min="0" value={form.experienceMax} onChange={(e) => set("experienceMax", e.target.value)} /></label>
          <label>Openings<input type="number" min="1" value={form.openings} onChange={(e) => set("openings", e.target.value)} /></label>
          <label>Applicant country
            <select value={form.hiringCountry} onChange={(e) => {
              const hiringCountry = e.target.value;
              const allowed = new Set([...documentsForCountry(hiringCountry), ...professionalDocuments].map((item) => item.id));
              const currency = hiringCountries.find((item) => item.id === hiringCountry)?.currency || "USD";
              setForm((current) => ({
                ...current,
                hiringCountry,
                salaryCurrency: currency,
                documents: current.documents.filter((id) => allowed.has(id)),
              }));
            }}>
              {hiringCountries.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Pay and hiring manager</h2>
          <p className={styles.blockNote}>Leave salary blank if it should stay off the public page.</p>
        </div>
        <div className={styles.fields}>
          <label>Currency
            <select value={form.salaryCurrency} onChange={(e) => set("salaryCurrency", e.target.value)}>
              <option value="KWD">KWD</option>
              <option value="AED">AED</option>
              <option value="INR">INR</option>
              <option value="KES">KES</option>
              <option value="TND">TND</option>
              <option value="USD">USD</option>
            </select>
          </label>
          <label>Pay period
            <select value={form.salaryPeriod} onChange={(e) => set("salaryPeriod", e.target.value)}>
              <option value="yearly">Yearly CTC</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          <label>Salary from<input type="number" min="0" value={form.salaryMin} onChange={(e) => set("salaryMin", e.target.value)} placeholder="Optional" /></label>
          <label>Salary to<input type="number" min="0" value={form.salaryMax} onChange={(e) => set("salaryMax", e.target.value)} placeholder="Optional" /></label>
          <label>Hiring manager<input value={form.managerName} onChange={(e) => set("managerName", e.target.value)} placeholder="Name" /></label>
          <label>Manager’s role<input value={form.managerRole} onChange={(e) => set("managerRole", e.target.value)} placeholder="For example, Engineering manager" /></label>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Documents</h2>
          <p className={styles.blockNote}>Name, contact, education, experience, a resume, and a short note are always asked. Tick a document only when this role needs it.</p>
        </div>
        <div className={styles.docCols}>
          <div>
            <p className={styles.sectionTitle}>Identity proofs</p>
            <div className={styles.tickList}>
              {documentsForCountry(form.hiringCountry).map((item) => (
                <label key={item.id} className={styles.tick}>
                  <input type="checkbox" checked={form.documents.includes(item.id)} onChange={() => toggleDocument(item.id)} />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.sectionTitle}>Professional documents</p>
            <div className={styles.tickList}>
              {professionalDocuments.map((item) => (
                <label key={item.id} className={styles.tick}>
                  <input type="checkbox" checked={form.documents.includes(item.id)} onChange={() => toggleDocument(item.id)} />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Job description</h2>
          <p className={styles.blockNote}>Write one point per line. Requirement lines are what the application match looks for.</p>
        </div>
        <div className={styles.fields}>
          <label className={styles.span}>Short summary<input value={form.summary} onChange={(e) => set("summary", e.target.value)} required /></label>
          <label className={styles.span}>About the role<textarea value={form.about} onChange={(e) => set("about", e.target.value)} /></label>
          <label>Responsibilities <span className={styles.hint}>one per line</span><textarea value={form.responsibilities} onChange={(e) => set("responsibilities", e.target.value)} /></label>
          <label>Requirements <span className={styles.hint}>one per line</span><textarea value={form.requirements} onChange={(e) => set("requirements", e.target.value)} /></label>
          <label>Helpful, not required<textarea value={form.niceToHave} onChange={(e) => set("niceToHave", e.target.value)} /></label>
          <label>What this role offers<textarea value={form.benefits} onChange={(e) => set("benefits", e.target.value)} /></label>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.blockHead}>
          <h2 className={styles.blockTitle}>Interview rounds</h2>
          <p className={styles.blockNote}>One round per line, in the order they happen.</p>
        </div>
        <label>Rounds
          <textarea value={form.rounds} onChange={(e) => set("rounds", e.target.value)} placeholder={"Screening call\nTechnical round\nManager round\nHR round"} />
        </label>
      </section>

      <div className={styles.saveBar}>
        <button className={styles.btn} type="submit" disabled={pending}>{pending ? "Saving…" : job ? "Save role" : "Create role"}</button>
      </div>
    </form>
  );
}
