"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./kam.module.css";

export const CONSENT_KEY = "kiccpa_consent";
const VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 180;
const OPTIONAL_KEYS = ["kiccpa_region", "kiccpa_lang", "kam-motion"];

type Choice = {
  v: number;
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  t: string;
};

const necessaryOnly: Choice = { v: VERSION, necessary: true, functional: false, analytics: false, marketing: false, t: "" };

function readChoice(): Choice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Choice;
    if (parsed.v !== VERSION || parsed.necessary !== true) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeChoice(choice: Choice) {
  const next = { ...choice, v: VERSION, necessary: true as const, t: new Date().toISOString() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=${encodeURIComponent(JSON.stringify(next))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
  if (!next.functional) OPTIONAL_KEYS.forEach((key) => localStorage.removeItem(key));
  if (!next.functional) delete document.documentElement.dataset.motion;
}

function clearChoice() {
  localStorage.removeItem(CONSENT_KEY);
  OPTIONAL_KEYS.forEach((key) => localStorage.removeItem(key));
  delete document.documentElement.dataset.motion;
  document.cookie = `${CONSENT_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export default function Consent() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [choice, setChoice] = useState<Choice>(necessaryOnly);
  const [email, setEmail] = useState("");
  const [join, setJoin] = useState(false);
  const [note, setNote] = useState("");
  const [trap, setTrap] = useState("");

  useEffect(() => {
    const stored = readChoice();
    if (!stored) setOpen(true);
    else setChoice(stored);
    const show = () => {
      const current = readChoice() || necessaryOnly;
      setChoice(current);
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener("kiccpa-cookies", show);
    return () => window.removeEventListener("kiccpa-cookies", show);
  }, []);

  function save(next: Choice) {
    writeChoice(next);
    setChoice(next);
    setSettings(false);
    setOpen(false);
  }

  async function subscribe(event: React.FormEvent) {
    event.preventDefault();
    setNote("");
    if (!join) {
      setNote("Tick the box if you want email updates. Cookies and email are separate.");
      return;
    }
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, website: trap }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Could not subscribe.");
      setNote(data.message || "Check your inbox to confirm.");
      setEmail("");
      setJoin(false);
    } catch (err) {
      setNote(err instanceof Error ? err.message : "Could not subscribe.");
    }
  }

  if (!open) return null;

  return (
    <div className={styles.cookieBar} role="dialog" aria-labelledby="cookie-title">
      <div className={styles.cookieCard}>
        <h2 id="cookie-title">Cookies on this site</h2>
        <p>Necessary cookies remember this choice. Functional cookies remember language and motion. Analytics and marketing stay off unless you allow them. Accepting cookies does not sign you up for email.</p>
        {settings && (
          <div className={styles.cookieOptions}>
            <label><input type="checkbox" checked disabled /> Necessary — always on</label>
            <label><input type="checkbox" checked={choice.functional} onChange={(e) => setChoice({ ...choice, functional: e.target.checked })} /> Functional — language, region, and motion</label>
            <label><input type="checkbox" checked={choice.analytics} onChange={(e) => setChoice({ ...choice, analytics: e.target.checked })} /> Analytics — none are set today</label>
            <label><input type="checkbox" checked={choice.marketing} onChange={(e) => setChoice({ ...choice, marketing: e.target.checked })} /> Marketing — none are set today</label>
            <form className={styles.cookieSubscribe} onSubmit={subscribe}>
              <p>Company updates are optional and separate.</p>
              <label><input type="checkbox" checked={join} onChange={(e) => setJoin(e.target.checked)} /> Email me when KICCPA publishes an insight or a company update</label>
              <input className={styles.trap} tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} aria-hidden="true" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Email address" required={join} />
              <button type="submit">Send confirmation</button>
              {note && <p>{note}</p>}
            </form>
          </div>
        )}
        <div className={styles.cookieActions}>
          <button type="button" onClick={() => save({ ...necessaryOnly, functional: true, analytics: true, marketing: true })}>Accept all</button>
          <button type="button" onClick={() => save(necessaryOnly)}>Necessary only</button>
          {settings ? (
            <button type="button" onClick={() => save(choice)}>Save choices</button>
          ) : (
            <button type="button" onClick={() => setSettings(true)}>Cookie settings</button>
          )}
          <button type="button" onClick={() => { clearChoice(); setChoice(necessaryOnly); setSettings(true); setOpen(true); setNote("Saved choices were cleared."); }}>Clear cookies</button>
        </div>
        <p className={styles.cookieLinks}>
          <Link href="/cookie-policy">Cookie policy</Link>
          {" · "}
          <Link href="/privacy-policy">Privacy</Link>
          {" · "}
          <Link href="/terms-of-use">Terms</Link>
        </p>
      </div>
    </div>
  );
}
