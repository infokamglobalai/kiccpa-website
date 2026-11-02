"use client";

import Link from "next/link";
import ThemedSelect from "./ThemedSelect";
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
  const [service, setService] = useState(services.some(item => item.title === params.get("service")) ? params.get("service")! : services[0]?.title || "");
  const [preference, setPreference] = useState("Email");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  const activeServices = useMemo(() => divisions.find((item) => item.id === division)?.items ?? [], [division]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setDone("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
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
    formElement.reset();
  }

  return (
    <form className={`${styles.ctForm} ${styles.talkForm}`} onSubmit={onSubmit}>
      {done && <p className={styles.ok} role="status">{done}</p>}
      {error && <p className={styles.ctAlert} role="alert">{error}</p>}
      <fieldset className={styles.talkFieldset} disabled={pending}>
        <legend>Your details</legend>
        <div className={styles.ctPair}>
          <label><span className={styles.ctLabelText}>Full name <b aria-hidden="true">*</b></span><input name="name" autoComplete="name" required minLength={2} placeholder="Your full name" /></label>
          <label><span className={styles.ctLabelText}>Company <b aria-hidden="true">*</b></span><input name="company" autoComplete="organization" required minLength={2} placeholder="Company name" /></label>
        </div>
        <div className={styles.ctPair}>
          <label><span className={styles.ctLabelText}>Business email <b aria-hidden="true">*</b></span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
          <label><span className={styles.ctLabelText}>Phone <b aria-hidden="true">*</b></span><input name="phone" type="tel" autoComplete="tel" required minLength={6} placeholder="Include country code" /></label>
        </div>
        <div className={styles.ctPair}>
          <label><span className={styles.ctLabelText}>Country or region <b aria-hidden="true">*</b></span><input name="country" autoComplete="country-name" required minLength={2} placeholder="Where you’re based" /></label>
          <ThemedSelect label="Preferred contact" value={preference} onChange={setPreference} options={preferences.map(item => ({value:item,label:item}))} />
        </div>
      </fieldset>
      <fieldset className={styles.talkFieldset} disabled={pending}>
        <legend>Your project</legend>
        <div className={styles.ctPair}>
          <ThemedSelect label="Division" value={division} onChange={value => { const next = value as DivisionId; setDivision(next); setService(divisions.find(item => item.id === next)?.items[0]?.title || ""); }} options={divisions.map(item => ({value:item.id,label:item.title}))} />
          <ThemedSelect label="Service" value={service} onChange={setService} options={activeServices.map(item => ({value:item.title,label:item.title}))} />
        </div>
        <input type="hidden" name="division" value={division} /><input type="hidden" name="service" value={service} /><input type="hidden" name="preference" value={preference} />
        <label><span className={styles.ctLabelText}>Project or business requirements <b aria-hidden="true">*</b></span><textarea name="requirements" required minLength={10} placeholder="What would you like to achieve? Tell us about your priorities, current challenges and any timeline you have in mind." /></label>
      </fieldset>
      <div className={styles.ctConsent}>
        <input id="talk-consent" type="checkbox" name="consent" value="yes" required disabled={pending} />
        <label htmlFor="talk-consent">I agree that the KICCPA team may use these details to respond to my enquiry.</label>
        <Link href="/privacy-policy">Privacy policy</Link>
      </div>
      <div className={styles.talkSubmit}><button className={styles.hpBtn} type="submit" disabled={pending}>{pending ? "Sending…" : "Send enquiry"}<span aria-hidden="true">↗</span></button><p>Your enquiry starts a conversation. Scope and pricing are agreed separately.</p></div>
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
