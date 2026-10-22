"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStaff, sendResetLink, setStaffActive, setStaffPassword } from "@/lib/recruitment-actions";
import { ROLE_LABELS } from "@/lib/roles";
import styles from "../desk.module.css";

const roles = [
  ["admin", "Admin — hiring, website, and team activity"],
  ["hr", "HR — roles, applications, and interviews"],
  ["manager", "Department manager — interviews HR assigns"],
  ["seo", "SEO — articles and search fields"],
  ["marketing", "Marketing — articles and social drafts"],
  ["superadmin", "Super admin — everything, including accounts"],
];

function suggestPassword() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  const body = Array.from(bytes, (n) => alphabet[n % alphabet.length]).join("");
  return `Kic${body.slice(0, 5)}@${body.slice(5)}`;
}

type Person = { id: string; name: string; email: string; role: string; active: boolean; lastSeen?: string; protected?: boolean };

export default function StaffForm({ people, canManage }: { people: Person[]; canManage: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "hr" });
  const [issued, setIssued] = useState<{ email: string; password: string; note: string } | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIssued(null);
    try {
      const result = await createStaff(form);
      const note = result.emailed
        ? "The sign-in email was sent. The password is also shown here once, in case the message does not arrive."
        : `The account is active. The email was not sent${result.emailError ? ` (${result.emailError})` : ""}. Share the password below directly.`;
      setIssued({ email: form.email, password: form.password, note });
      setForm({ name: "", email: "", password: "", role: "hr" });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create the user.");
    }
  }

  async function toggle(id: string, active: boolean) {
    setError("");
    try {
      await setStaffActive(id, active);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update the user.");
    }
  }

  async function reset(id: string, password: string) {
    setError("");
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    try {
      await setStaffPassword(id, password);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not replace the password.");
    }
  }

  return (
    <div>
      {error && <p className={styles.error}>{error}</p>}
      {notice && <p className={styles.ok}>{notice}</p>}
      {issued && (
        <div className={styles.cred}>
          <strong>Account ready</strong>
          <span>{issued.email}</span>
          <code>{issued.password}</code>
          <span>{issued.note}</span>
        </div>
      )}
      {canManage && <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.grid}>
          <label>Name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
          <label>Work email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
          <label>Password
            <input minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </label>
          <label>Access
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              {roles.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <div className={styles.row}>
          <button className={styles.line} type="button" onClick={() => setForm({ ...form, password: suggestPassword() })}>Suggest a password</button>
          <button className={styles.btn} type="submit">Create account and email access</button>
        </div>
      </form>}
      <div className={styles.tableWrap}>
      <table>
        <thead><tr><th>Name</th><th>Access</th><th>Last seen</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td><strong>{person.name}</strong><br /><span className={styles.muted}>{person.email}</span></td>
              <td>{ROLE_LABELS[person.role] || person.role}</td>
              <td>{person.lastSeen ? new Date(person.lastSeen).toLocaleString() : "—"}</td>
              <td><span className={styles.pill} data-status={person.active ? "active" : "rejected"}>{person.active ? "Active" : "Blocked"}</span></td>
              <td>
                {person.protected || !canManage ? <span className={styles.muted}>Protected sign-in</span> : (
                  <span className={styles.row}>
                    <button className={styles.line} type="button" onClick={() => toggle(person.id, !person.active)}>{person.active ? "Block" : "Unblock"}</button>
                    <button className={styles.line} type="button" onClick={async () => {
                      setError("");
                      setNotice("");
                      try {
                        const result = await sendResetLink(person.id);
                        setNotice(result.emailed ? `Reset link sent to ${person.email}.` : `The link was not emailed${result.emailError ? `: ${result.emailError}` : "."}`);
                        router.refresh();
                      } catch (err) {
                        setError(err instanceof Error ? err.message : "Could not send the reset link.");
                      }
                    }}>Email reset link</button>
                    <PasswordBox onSave={(password) => reset(person.id, password)} />
                  </span>
                )}
              </td>
            </tr>
          ))}
          {people.length === 0 && <tr><td colSpan={5}>No team accounts yet.</td></tr>}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function PasswordBox({ onSave }: { onSave: (password: string) => void }) {
  const [password, setPassword] = useState("");
  return (
    <span className={styles.row}>
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" aria-label="New password" />
      <button className={styles.line} type="button" onClick={() => { onSave(password); setPassword(""); }}>Replace</button>
    </span>
  );
}
