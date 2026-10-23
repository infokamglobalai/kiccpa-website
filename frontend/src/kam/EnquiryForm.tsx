"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactAction } from "@/lib/actions";
import { divisions, type DivisionId } from "./home-content";
import styles from "./kam.module.css";

const preferences = ["Email", "Phone", "WhatsApp"] as const;

export function BusinessEnquiryForm() {
  const params = useSearchParams();
  const initial = (params.get("division") || "technology") as DivisionId;
  const [division, setDivision] = useState<DivisionId>(divisions.some((item) => item.id === initial) ? initial : "technology");
  const services = divisions.find((item) => item.id === division)?.items ?? [];
  const [service, setService] = useState(params.get("service") || services[0]?.title || "");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const activeServices = useMemo(() => divisions.find((item) => item.id === division)?.items ?? [], [division]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setDone("");
    const form = new FormData(event.currentTarget);
    if (form.get("consent") !== "yes") {
      setError("Please confirm the privacy note before sending.");
      return;
    }
    const divisionTitle = divisions.find((item) => item.id === division)?.title || division;
    const message = [
      `Company: ${form.get("company") || "—"}`,
      `Phone: ${form.get("phone") || "—"}`,
      `Country: ${form.get("country") || "—"}`,
      `Division: ${divisionTitle}`,
      `Service: ${form.get("service") || "—"}`,
      `Preferred contact: ${form.get("preference") || "—"}`,
      "",
      String(form.get("requirements") || ""),
    ].join("\n");
    const data = new FormData();
    data.set("name", String(form.get("name") || ""));
    data.set("email", String(form.get("email") || ""));
    data.set("scope", `${divisionTitle} — ${form.get("service") || "General"}`);
    data.set("message", message);
    setPending(true);
    const result = await submitContactAction(data);
    setPending(false);
    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }
    setDone(result.message || "The enquiry was received.");
    event.currentTarget.reset();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {done && <p className={styles.ok} role="status">{done}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <label>Full name<input name="name" autoComplete="name" required minLength={2} /></label>
      <label>Company<input name="company" autoComplete="organization" required minLength={2} /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Phone<input name="phone" autoComplete="tel" required minLength={6} /></label>
      <label>Country<input name="country" autoComplete="country-name" required minLength={2} /></label>
      <label>Division
        <select name="division" value={division} onChange={(event) => { const next = event.target.value as DivisionId; setDivision(next); setService(divisions.find((item) => item.id === next)?.items[0]?.title || ""); }}>
          {divisions.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </label>
      <label>Service
        <select name="service" value={service} onChange={(event) => setService(event.target.value)} required>
          {activeServices.map((item) => <option key={item.title} value={item.title}>{item.title}</option>)}
        </select>
      </label>
      <label>Requirements<textarea name="requirements" required minLength={10} placeholder="Describe the requirement." /></label>
      <label>Preferred contact
        <select name="preference" defaultValue="Email">
          {preferences.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label className={styles.check}>
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree this enquiry can be sent to the KICCPA team. See the privacy policy.</span>
      </label>
      <button className={styles.btn} type="submit" disabled={pending}>{pending ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}

export function JobSeekerForm() {
  const params = useSearchParams();
  const sectors = divisions.find((item) => item.id === "hr")?.items ?? [];
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setDone("");
    const form = new FormData(event.currentTarget);
    if (form.get("consent") !== "yes") {
      setError("Please confirm the privacy note before sending.");
      return;
    }
    const message = [
      `Phone: ${form.get("phone") || "—"}`,
      `Current country: ${form.get("country") || "—"}`,
      `Preferred sector: ${form.get("sector") || "—"}`,
      `Role: ${form.get("role") || "—"}`,
      `Experience: ${form.get("experience") || "—"}`,
      "CV: attach a CV when applying to a published role on Careers. This form stores the enquiry text.",
      "",
      String(form.get("introduction") || ""),
    ].join("\n");
    const data = new FormData();
    data.set("name", String(form.get("name") || ""));
    data.set("email", String(form.get("email") || ""));
    data.set("scope", `Job seeker — ${form.get("sector") || "General"}`);
    data.set("message", message);
    setPending(true);
    const result = await submitContactAction(data);
    setPending(false);
    if ("error" in result && result.error) {
      setError(result.error);
      return;
    }
    setDone(result.message || "The enquiry was received.");
    event.currentTarget.reset();
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <p className={styles.muted}>A CV is uploaded when you apply to a published role. This form sends your introduction to the team and does not store a file.</p>
      {done && <p className={styles.ok} role="status">{done}</p>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      <label>Full name<input name="name" autoComplete="name" required minLength={2} /></label>
      <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      <label>Phone<input name="phone" autoComplete="tel" required minLength={6} /></label>
      <label>Current country<input name="country" required minLength={2} /></label>
      <label>Preferred sector
        <select name="sector" defaultValue={params.get("sector") || sectors[0]?.title}>
          {sectors.map((item) => <option key={item.title}>{item.title}</option>)}
        </select>
      </label>
      <label>Role<input name="role" required minLength={2} /></label>
      <label>Experience<input name="experience" required minLength={2} placeholder="Years or a short summary" /></label>
      <label>Introduction<textarea name="introduction" required minLength={10} /></label>
      <label className={styles.check}>
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree this enquiry can be sent to the KICCPA team. See the privacy policy.</span>
      </label>
      <button className={styles.btn} type="submit" disabled={pending}>{pending ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}
