"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { jobDepartments } from "@/kam/site";
import { ROLE_LABELS } from "@/lib/roles";
import { changeOwnPassword, markNoticeRead, myNotices, myProfile, saveProfile } from "@/lib/recruitment-actions";
import styles from "../recruitment/desk.module.css";

type Profile = { name: string; email: string; role: string; phone: string; title: string; department: string; owner: boolean };
type Notice = { _id: string; applicationId: string; title: string; detail: string; read: boolean; at: string };

export default function Page() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [password, setPassword] = useState({ current: "", next: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let live = true;
    Promise.all([myProfile(), myNotices()]).then(([person, inbox]) => {
      if (!live) return;
      setProfile(person.profile);
      setNotices(inbox.notices);
    }).catch((err) => {
      if (live) setError(err instanceof Error ? err.message : "Could not load your profile.");
    });
    return () => { live = false; };
  }, []);

  if (!profile && !error) return <main><p className={styles.muted}>Loading your profile…</p></main>;

  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Account</p>
          <h1>Profile</h1>
          <p className={styles.lead}>Your name, title, and phone stay on this desk. The sidebar name updates the next time you sign in.</p>
        </div>
      </header>
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.ok}>{message}</p>}
      {profile && (
        <form className={styles.form} onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          setError("");
          setMessage("");
          try {
            const saved = await saveProfile(profile);
            setProfile(saved.profile);
            setMessage("Profile saved.");
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not save the profile.");
          }
          setPending(false);
        }}>
          <div className={styles.grid}>
            <label>Name<input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required /></label>
            <label>Work email<input value={profile.email} readOnly /></label>
            <label>Access<input value={ROLE_LABELS[profile.role] || profile.role} readOnly /></label>
            <label>Job title<input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} placeholder="Engineering manager" /></label>
            <label>Phone<input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></label>
            <label>Department
              <select value={profile.department} onChange={(e) => setProfile({ ...profile, department: e.target.value })}>
                <option value="">Not set</option>
                {jobDepartments.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </select>
            </label>
          </div>
          <button className={styles.btn} type="submit" disabled={pending}>{pending ? "Saving…" : "Save profile"}</button>
        </form>
      )}
      <form className={styles.form} onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setError("");
        setMessage("");
        try {
          await changeOwnPassword(password.current, password.next);
          setPassword({ current: "", next: "" });
          setMessage("Password updated. Use it the next time you sign in.");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Could not change the password.");
        }
        setPending(false);
      }}>
        <h2>Password</h2>
        {profile?.owner ? <p className={styles.muted}>This owner sign-in is kept outside the desk, so the password is not changed here.</p> : (
          <>
            <div className={styles.grid}>
              <label>Current password<input type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} required /></label>
              <label>New password<input type="password" minLength={8} value={password.next} onChange={(e) => setPassword({ ...password, next: e.target.value })} required /></label>
            </div>
            <button className={styles.btn} type="submit" disabled={pending}>Change password</button>
          </>
        )}
      </form>
      <h2>Notices</h2>
      {notices.length === 0 && <p className={styles.muted}>No notices yet. An interview assignment appears here and in your email.</p>}
      {notices.map((notice) => (
        <article key={notice._id} className={styles.card}>
          <strong>{notice.title}</strong>
          <p>{notice.detail}</p>
          <p className={styles.row}>
            <Link className={styles.line} href={`/admin/recruitment/applications/${notice.applicationId}`}>Open application</Link>
            {!notice.read && <button className={styles.line} type="button" onClick={async () => {
              await markNoticeRead(notice._id);
              setNotices((current) => current.map((item) => item._id === notice._id ? { ...item, read: true } : item));
            }}>Mark read</button>}
            {notice.read && <span className={styles.muted}>Read</span>}
          </p>
        </article>
      ))}
    </main>
  );
}
