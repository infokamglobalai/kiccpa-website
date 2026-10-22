"use client";

import { useState, type FormEvent } from "react";
import { submitContactAction } from "@/lib/actions";
import { contacts } from "./site";
import styles from "./kam.module.css";

export default function CareersExperience() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    location: "",
    message: "",
    privacy: false,
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  const body = [
    "Candidate enquiry — not a stored CV.",
    `Phone: ${form.phone || "—"}`,
    `Role of interest: ${form.role || "—"}`,
    `Experience: ${form.experience || "—"}`,
    `Location: ${form.location || "—"}`,
    "",
    form.message,
  ].join("\n");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Enter a valid email.");
    if (form.message.trim().length < 10) return setError("Add a short message.");
    if (!form.privacy) return setError("Please acknowledge how this enquiry is handled.");
    setError("");
    setPending(true);
    const data = new FormData();
    data.set("name", form.name.trim());
    data.set("email", form.email.trim());
    data.set("scope", `Careers — ${form.role || "General interest"}`);
    data.set("message", body);
    const res = await submitContactAction(data);
    setPending(false);
    if ("error" in res && res.error) {
      setStatus("");
      setError(`${res.error} You can also email ${contacts.emails[0].address}. No CV was uploaded.`);
      return;
    }
    setStatus("Your enquiry was received by the same channel as other website messages. No CV file was uploaded or stored, and this is not a confirmation of an open role.");
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {error && <p className={styles.error} role="alert">{error}</p>}
      {status && <p className={styles.ok} role="status">{status}</p>}
      <label>Full name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
      <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
      <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
      <label>Role of interest<input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></label>
      <label>Relevant experience<input value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></label>
      <label>Location<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
      <label>Message<textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></label>
      <p className={styles.muted}>CV upload is not available. Do not include sensitive documents in the message. Nothing on this form is published.</p>
      <label className={styles.check}>
        <input type="checkbox" checked={form.privacy} onChange={(e) => setForm({ ...form, privacy: e.target.checked })} />
        <span>I agree that this enquiry can be emailed to the team at the published KICCPA addresses. See the privacy policy.</span>
      </label>
      <button className={`${styles.btn} ${styles.btnDark}`} type="submit" disabled={pending}>{pending ? "Sending…" : "Send candidate enquiry"}</button>
    </form>
  );
}
