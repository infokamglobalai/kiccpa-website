"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { completeReset } from "@/lib/recruitment-actions";
import styles from "../login/LoginPage.module.css";

function ResetForm() {
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      await completeReset(token, password);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset the password.");
    }
    setPending(false);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>KICCPA</p>
        <h1 className={styles.title}>New password</h1>
        {done ? (
          <p className={styles.hint}>Your password is updated. Sign in with the new one.</p>
        ) : (
          <form className={styles.form} onSubmit={onSubmit}>
            <p className={styles.hint}>Choose a password of at least 8 characters. This link expires 24 hours after it was sent.</p>
            {error && <div className={styles.alert}>{error}</div>}
            <label className={styles.label}>Password
              <input className={styles.input} type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button className={styles.submit} type="submit" disabled={pending || token.length < 20}>{pending ? "Saving…" : "Save password"}</button>
          </form>
        )}
        <Link className={styles.back} href="/admin/login">Sign in</Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className={styles.wrap}><div className={styles.card}><p className={styles.hint}>Loading…</p></div></div>}>
      <ResetForm />
    </Suspense>
  );
}
