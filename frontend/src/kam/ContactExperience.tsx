"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactAction } from "@/lib/actions";
import { contacts, engagementModels, serviceOptions, type ServiceId } from "./site";
import styles from "./kam.module.css";

type Draft = {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  services: ServiceId[];
  model: string;
  message: string;
  privacy: boolean;
};

type FieldKey = "name" | "email" | "phone" | "services" | "message" | "privacy";

const empty: Draft = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  services: [],
  model: "",
  message: "",
  privacy: false,
};

const infoEmail = "info@kiccpa.com";
const africaEmail = "sales1.africa@kiccpa.com";
const tunisia = contacts.people.find((person) => person.region === "Tunisia");
const kenya = contacts.people.find((person) => person.region === "Kenya");

function compose(draft: Draft) {
  const services = draft.services.map((id) => serviceOptions.find((s) => s.id === id)?.label || id).join(", ") || "Not specified";
  const model = engagementModels.find((m) => m.id === draft.model)?.title || draft.model || "Not specified";
  return [
    `Company: ${draft.company || "—"}`,
    `Phone: ${draft.phone || "—"}`,
    `Country or region: ${draft.country || "—"}`,
    `Services: ${services}`,
    `Engagement model: ${model}`,
    "",
    draft.message,
  ].join("\n");
}

function problems(draft: Draft): Partial<Record<FieldKey, string>> {
  const next: Partial<Record<FieldKey, string>> = {};
  if (draft.name.trim().length < 2) next.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) next.email = "Enter a valid business email.";
  if (draft.phone.trim() && !/^[+()\d\s.-]{6,24}$/.test(draft.phone.trim())) next.phone = "Use digits, spaces, or a leading +.";
  if (draft.services.length === 0) next.services = "Choose at least one service.";
  if (draft.message.trim().length < 10) next.message = "Describe the requirement in at least 10 characters.";
  if (!draft.privacy) next.privacy = "Please acknowledge the privacy note before continuing.";
  return next;
}

function Icon({ name }: { name: "whatsapp" | "phone" | "mail" }) {
  const common = { viewBox: "0 0 24 24", width: 18, height: 18, fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true as const };
  if (name === "whatsapp") {
    return <svg {...common}><path d="M6 18.5l.8-2.8A7 7 0 1 1 8.6 18L6 18.5z" /><path d="M9 10.2c.2.8.9 1.6 1.7 2 .8.4 1.5.3 2-.2" /></svg>;
  }
  if (name === "mail") {
    return <svg {...common}><rect x="4" y="6" width="16" height="12" rx="1.5" /><path d="M5 7l7 6 7-6" /></svg>;
  }
  return <svg {...common}><path d="M8 4h3l1 4-2 1a11 11 0 0 0 5 5l1-2 4 1v3c0 .6-.4 1-1 1A13 13 0 0 1 7 5c0-.6.4-1 1-1z" /></svg>;
}

export default function ContactExperience() {
  const params = useSearchParams();
  const presetService = params.get("service") as ServiceId | null;
  const presetModel = params.get("model") || "";
  const [draft, setDraft] = useState<Draft>(() => ({
    ...empty,
    services: presetService && serviceOptions.some((s) => s.id === presetService) ? [presetService] : [],
    model: engagementModels.some((m) => m.id === presetModel) ? presetModel : "",
  }));
  const [step, setStep] = useState<"edit" | "review">("edit");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const text = useMemo(() => compose(draft), [draft]);
  const serviceLabels = draft.services.map((id) => serviceOptions.find((s) => s.id === id)?.label || id);
  const modelTitle = engagementModels.find((m) => m.id === draft.model)?.title || "Not sure yet";

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setSent(false);
  }

  function toggleService(id: ServiceId) {
    setDraft((d) => ({
      ...d,
      services: d.services.includes(id) ? d.services.filter((s) => s !== id) : [...d.services, id],
    }));
    setSent(false);
  }

  function review(event: React.FormEvent) {
    event.preventDefault();
    const next = problems(draft);
    setFieldErrors(next);
    const first = Object.values(next)[0];
    if (first) {
      setError(first);
      return;
    }
    setError("");
    setResult("");
    setStep("review");
  }

  async function submit() {
    setPending(true);
    setError("");
    const data = new FormData();
    data.set("name", draft.name.trim());
    data.set("email", draft.email.trim());
    data.set("scope", draft.services.map((id) => serviceOptions.find((s) => s.id === id)?.label).join(", "));
    data.set("message", text);
    const res = await submitContactAction(data);
    setPending(false);
    if ("error" in res && res.error) {
      setError(res.error);
      setSent(false);
      return;
    }
    setResult(res.message || "The enquiry was received.");
    setSent(true);
  }

  async function copyText() {
    try {
      await navigator.clipboard.writeText(`Name: ${draft.name}\nEmail: ${draft.email}\n\n${text}`);
      setError("");
      setResult("Enquiry text copied. It has not been submitted unless you already sent it.");
    } catch {
      setError("Copy was blocked by the browser. Select the text and copy it manually.");
    }
  }

  return (
    <section className={styles.ctSection} aria-labelledby="contact-intro">
      <div className={`${styles.wrap} ${styles.ctGrid}`}>
        <div>
          <p className={styles.ctEyebrowDark}>Get in touch</p>
          <h2 id="contact-intro">Let&apos;s connect.</h2>
          <p className={styles.ctIntro}>Choose the appropriate contact channel for your region or send your requirements using the enquiry form.</p>
          <div className={styles.ctCards}>
            <a className={styles.ctCard} href={`https://wa.me/${contacts.whatsapp}`} target="_blank" rel="noreferrer">
              <span className={styles.ctIcon}><Icon name="whatsapp" /></span>
              <strong>WhatsApp</strong>
              <em>+965 9988 9588</em>
            </a>
            <article className={styles.ctCard}>
              <span className={styles.ctIcon}><Icon name="phone" /></span>
              <strong>Kuwait &amp; GCC</strong>
              <a href={`tel:${contacts.kuwaitOfficeLine.tel}`}>{contacts.kuwaitOfficeLine.display}</a>
              <a href={`mailto:${infoEmail}`}>{infoEmail}</a>
            </article>
            <article className={styles.ctCard}>
              <span className={styles.ctIcon}><Icon name="phone" /></span>
              <strong>Tunisia</strong>
              <a href={`tel:${tunisia?.tel || "+21623485826"}`}>{tunisia?.phone || "+216 23 485 826"}</a>
              <a href={`mailto:${africaEmail}`}>{africaEmail}</a>
            </article>
            <article className={styles.ctCard}>
              <span className={styles.ctIcon}><Icon name="phone" /></span>
              <strong>Kenya</strong>
              <a href={`tel:${kenya?.tel || "+254750150079"}`}>{kenya?.phone || "+254 750 150079"}</a>
              <a href={`mailto:${africaEmail}`}>{africaEmail}</a>
            </article>
          </div>
        </div>

        <div className={styles.ctPanel}>
          {sent && result ? (
            <div className={styles.ctSuccess} role="status">
              <h3>Enquiry received</h3>
              <p>{result}</p>
            </div>
          ) : null}
          {error ? <p className={styles.ctAlert} role="alert">{error}</p> : null}
          {!sent && result && step === "review" ? <p className={styles.ctNote} role="status">{result}</p> : null}

          {sent ? null : step === "edit" ? (
            <form className={styles.ctForm} onSubmit={review} noValidate>
              <h3>Tell us about your project.</h3>
              <p>Share a few details so the team can understand your requirements. Review Enquiry shows what will be sent. It does not submit the form.</p>
              <div className={styles.ctPair}>
                <label>
                  Full name <span>*</span>
                  <input value={draft.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" aria-invalid={Boolean(fieldErrors.name)} required />
                  {fieldErrors.name ? <small>{fieldErrors.name}</small> : null}
                </label>
                <label>
                  Business email <span>*</span>
                  <input type="email" value={draft.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" aria-invalid={Boolean(fieldErrors.email)} required />
                  {fieldErrors.email ? <small>{fieldErrors.email}</small> : null}
                </label>
              </div>
              <div className={styles.ctPair}>
                <label>
                  Company
                  <input value={draft.company} onChange={(e) => update("company", e.target.value)} autoComplete="organization" />
                </label>
                <label>
                  Phone <em>optional</em>
                  <input type="tel" value={draft.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" aria-invalid={Boolean(fieldErrors.phone)} />
                  {fieldErrors.phone ? <small>{fieldErrors.phone}</small> : null}
                </label>
              </div>
              <label>
                Country or region
                <input value={draft.country} onChange={(e) => update("country", e.target.value)} autoComplete="country-name" />
              </label>
              <fieldset>
                <legend>Service of interest <span>*</span></legend>
                <div className={styles.ctChips}>
                  {serviceOptions.map((option) => (
                    <label key={option.id} className={draft.services.includes(option.id) ? styles.ctChipOn : styles.ctChip}>
                      <input type="checkbox" checked={draft.services.includes(option.id)} onChange={() => toggleService(option.id)} />
                      {option.label}
                    </label>
                  ))}
                </div>
                {fieldErrors.services ? <small>{fieldErrors.services}</small> : null}
              </fieldset>
              <label>
                Engagement model
                <select value={draft.model} onChange={(e) => update("model", e.target.value)}>
                  <option value="">Not sure yet</option>
                  {engagementModels.map((model) => <option key={model.id} value={model.id}>{model.title}</option>)}
                </select>
              </label>
              <label>
                Project or business requirements <span>*</span>
                <textarea value={draft.message} onChange={(e) => update("message", e.target.value)} placeholder="Briefly describe your project, business needs, or the support you are looking for." aria-invalid={Boolean(fieldErrors.message)} required />
                {fieldErrors.message ? <small>{fieldErrors.message}</small> : null}
              </label>
              <div className={styles.ctConsent}>
                <input id="ct-privacy" type="checkbox" checked={draft.privacy} onChange={(e) => update("privacy", e.target.checked)} aria-invalid={Boolean(fieldErrors.privacy)} />
                <label htmlFor="ct-privacy">I understand this enquiry will be sent to the published KICCPA addresses and reviewed by the team.</label>
                <Link href="/privacy-policy">Privacy policy</Link>
              </div>
              {fieldErrors.privacy ? <small className={styles.ctFieldError}>{fieldErrors.privacy}</small> : null}
              <button className={styles.hpBtn} type="submit">Review Enquiry</button>
            </form>
          ) : (
            <div className={styles.ctReview}>
              <h3>Review before sending</h3>
              <p>This has not been submitted. Send enquiry only after the details look right.</p>
              <dl>
                <div><dt>Name</dt><dd>{draft.name}</dd></div>
                <div><dt>Email</dt><dd>{draft.email}</dd></div>
                <div><dt>Company</dt><dd>{draft.company || "—"}</dd></div>
                <div><dt>Phone</dt><dd>{draft.phone || "—"}</dd></div>
                <div><dt>Country or region</dt><dd>{draft.country || "—"}</dd></div>
                <div><dt>Services</dt><dd>{serviceLabels.join(", ")}</dd></div>
                <div><dt>Engagement model</dt><dd>{modelTitle}</dd></div>
                <div><dt>Requirements</dt><dd>{draft.message}</dd></div>
              </dl>
              <div className={styles.ctActions}>
                <button type="button" className={styles.hpBtn} disabled={pending} onClick={submit}>{pending ? "Sending…" : "Submit Enquiry"}</button>
                <button type="button" className={styles.hpBtnLine} onClick={() => setStep("edit")}>Edit</button>
              </div>
              <p className={styles.ctAlt}>
                <button type="button" onClick={copyText}>Copy text</button>
                <a href={`mailto:${infoEmail}?subject=${encodeURIComponent("Enquiry from the KICCPA website")}&body=${encodeURIComponent(`Name: ${draft.name}\nEmail: ${draft.email}\n\n${text}`)}`}>Email instead</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
