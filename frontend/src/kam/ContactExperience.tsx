"use client";

import Link from "next/link";
import { Phone, Mail, ArrowRight, ArrowLeft, RotateCcw, UserRound, BriefcaseBusiness, FileText, Copy, CircleCheck } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactAction } from "@/lib/actions";
import { contacts, engagementModels, serviceOptions, type ServiceId } from "./site";
import styles from "./kam.module.css";
import Reveal from "./Reveal";

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
  if (name === "phone") return <Phone size={25} strokeWidth={1.8} aria-hidden="true" />;
  if (name === "mail") return <Mail size={25} strokeWidth={1.8} aria-hidden="true" />;
  return <svg viewBox="0 0 24 24" width="27" height="27" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 2.1 17.1L1 23l6-1.6A11 11 0 0 0 20.5 3.5zM12 20.4a9.2 9.2 0 0 1-4.7-1.3l-.3-.2-3.5.9.9-3.4-.2-.3A9.1 9.1 0 1 1 12 20.4zm5.1-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.9 1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.4c-.1-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c.6.2 1 .4 1.4.5a3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.2-.3-.2-.6-.3z" /></svg>;
}

export default function ContactExperience() {
  const params = useSearchParams();
  const bookRef = useRef<HTMLDivElement>(null);
  const [bookOpen, setBookOpen] = useState(false);
  const [mobilePage, setMobilePage] = useState(0);
  const [turn, setTurn] = useState(0);
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

  function showBookPage(page?: number) {
    if (page === undefined) setBookOpen(true);
    else { setMobilePage(page); setTurn(v => v + 1); }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "off";
    bookRef.current?.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }

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
    setTurn(v => v + 1);
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
      <div className={styles.wrap}>
        <div className={styles.bookToolbar}><p>Start a new chapter with KICCPA.</p>{bookOpen && <button type="button" onClick={() => setBookOpen(false)}><RotateCcw size={16} aria-hidden="true" /> Close book</button>}</div>
        <div ref={bookRef} className={`${styles.bookShell} ${bookOpen ? styles.bookIsOpen : ""} ${mobilePage === 1 ? styles.bookProjectPage : styles.bookContactPage}`}>
          <button type="button" className={styles.bookCover} aria-expanded={bookOpen} aria-controls="contact-book-pages" tabIndex={bookOpen ? -1 : 0} onClick={() => showBookPage()}>
            <span className={styles.greenCoverFrame} aria-hidden="true" />
            <span className={styles.pamphletBrand}><img src="/images/kiccpa-logo.png" alt="KICCPA" /><span>Where it meets AI</span></span>
            <span className={styles.pamphletEditorial}>
              <span className={styles.bookCoverBrand}>The beginning of a partnership</span>
              <strong>Built on understanding.<br /><em>Made for what’s next.</em></strong>
              <span className={styles.pamphletDescription}>Your ambition deserves a thoughtful partner. Let’s start with a conversation.</span>
              <span className={styles.greenCoverServices}>Technology <i /> Operations <i /> People</span>
            </span>
            <span className={styles.greenPhotoWindow}><img className={styles.pamphletPhoto} src="/assets/photography/forest-on-white.png" alt="" aria-hidden="true" /></span>
            <span className={styles.greenCoverFooter}><span className={styles.bookOpenPrompt}>Open your conversation <ArrowRight size={23} aria-hidden="true" /></span><span className={styles.pamphletFolio}>KICCPA / Your next chapter <span>01 — 03</span></span></span>
          </button>
          <div id="contact-book-pages" className={`${styles.ctGrid} ${styles.bookPages}`} inert={!bookOpen} aria-hidden={!bookOpen}>
          {turn > 0 && bookOpen && <div key={turn} className={styles.turningPaper} aria-hidden="true"><span>KICCPA</span><strong>{step === "review" ? "Your enquiry, considered." : "A little more detail."}</strong></div>}
        <Reveal className={styles.ctContactLeaf}>
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
          <button type="button" className={styles.mobilePageNext} onClick={() => showBookPage(1)}>Turn to your enquiry <ArrowRight size={18} aria-hidden="true" /></button>
          <figure className={styles.ctLeafPhoto}><img src="/assets/photography/team.jpg" alt="Professionals greeting each other with a handshake" loading="lazy" /><figcaption>A conversation today. A new chapter tomorrow.</figcaption></figure>
        </Reveal>

        <Reveal className={styles.ctFormLeaf}>
        <div className={styles.ctPanel}>
          <button type="button" className={styles.mobilePageBack} onClick={() => showBookPage(0)}><ArrowLeft size={16} aria-hidden="true" /> Contact details</button>
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
              <p>Every good partnership starts with a conversation. Share your plans, then review your enquiry before sending.</p>
              <div className={styles.ctPair}>
                <label>
                  <span className={styles.ctLabelText}>Full name <b aria-hidden="true">*</b></span>
                  <input value={draft.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" aria-invalid={Boolean(fieldErrors.name)} required />
                  {fieldErrors.name ? <small>{fieldErrors.name}</small> : null}
                </label>
                <label>
                  <span className={styles.ctLabelText}>Business email <b aria-hidden="true">*</b></span>
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
                  <span className={styles.ctLabelText}>Phone <em>optional</em></span>
                  <input type="tel" value={draft.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" aria-invalid={Boolean(fieldErrors.phone)} />
                  {fieldErrors.phone ? <small>{fieldErrors.phone}</small> : null}
                </label>
              </div>
              <label>
                Country or region
                <input value={draft.country} onChange={(e) => update("country", e.target.value)} autoComplete="country-name" />
              </label>
              <fieldset>
                <legend>Service of interest <b aria-hidden="true">*</b></legend>
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
                <select className={styles.paddedSelect} value={draft.model} onChange={(e) => update("model", e.target.value)}>
                  <option value="">Not sure yet</option>
                  {engagementModels.map((model) => <option key={model.id} value={model.id}>{model.title}</option>)}
                </select>
              </label>
              <label>
                <span className={styles.ctLabelText}>Project or business requirements <b aria-hidden="true">*</b></span>
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
            <div className={styles.ctReview} key="review" tabIndex={-1} ref={(node) => node?.focus()}>
              <div className={styles.reviewHeading}><span className={styles.reviewStatus}><CircleCheck size={15} aria-hidden="true" /> Ready for review</span><h3>Review before sending</h3><p>A quick check of your details and project brief. Nothing has been sent yet.</p></div>
              <section className={styles.reviewBlock} aria-labelledby="review-contact-title">
                <h4 id="review-contact-title"><UserRound size={18} aria-hidden="true" /> Your contact details</h4>
                <dl className={styles.reviewContactGrid}>
                  <div><dt>Full name</dt><dd>{draft.name}</dd></div>
                  <div><dt>Business email</dt><dd>{draft.email}</dd></div>
                  {draft.company && <div><dt>Company</dt><dd>{draft.company}</dd></div>}
                  {draft.phone && <div><dt>Phone</dt><dd>{draft.phone}</dd></div>}
                  {draft.country && <div><dt>Country or region</dt><dd>{draft.country}</dd></div>}
                </dl>
              </section>
              <section className={styles.reviewBlock} aria-labelledby="review-project-title">
                <h4 id="review-project-title"><BriefcaseBusiness size={18} aria-hidden="true" /> Your project</h4>
                <p className={styles.reviewLabel}>Services of interest</p>
                <ul className={styles.reviewServiceTags}>{serviceLabels.map(label => <li key={label}>{label}</li>)}</ul>
                <dl><div><dt>Engagement model</dt><dd>{modelTitle}</dd></div></dl>
              </section>
              <section className={`${styles.reviewBlock} ${styles.reviewBrief}`} aria-labelledby="review-brief-title"><h4 id="review-brief-title"><FileText size={18} aria-hidden="true" /> Your brief</h4><p>{draft.message}</p></section>
              <p className={styles.reviewNextStep}><Mail size={17} aria-hidden="true" /><span>When you submit, your enquiry is sent to the KICCPA team for review.</span></p>
              <div className={styles.ctActions}>
                <button type="button" className={styles.hpBtn} disabled={pending} onClick={submit}>{pending ? "Sending…" : "Submit Enquiry"}</button>
                <button type="button" className={styles.hpBtnLine} onClick={() => { setTurn(v => v + 1); setStep("edit"); }}>Edit details</button>
              </div>
              <p className={styles.ctAlt}>
                <button type="button" onClick={copyText}><Copy size={15} aria-hidden="true" /> Copy enquiry</button>
                <a href={`mailto:${infoEmail}?subject=${encodeURIComponent("Enquiry from the KICCPA website")}&body=${encodeURIComponent(`Name: ${draft.name}\nEmail: ${draft.email}\n\n${text}`)}`}><Mail size={15} aria-hidden="true" /> Email instead</a>
              </p>
            </div>
          )}
        </div>
        </Reveal>
      </div>
      </div>
      </div>
    </section>
  );
}
