"use client";

import { useEffect, useState } from "react";
import styles from "@/kam/apply.module.css";

type Doc = { id: string; label: string; uploaded: boolean };
type Pack = {
  jobTitle: string;
  reference: string;
  name: string;
  earliestJoin: string;
  latestJoin: string;
  proposedJoin: string;
  confirmedJoin: string;
  decision: string;
  concern: string;
  status: string;
  policies: Record<string, string>;
  documents: Doc[];
  locked: boolean;
};

const policyOrder = ["offer", "confidentiality", "conduct", "data", "accuracy"] as const;

export default function OfferPack({ token }: { token: string }) {
  const [pack, setPack] = useState<Pack | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [decision, setDecision] = useState<"accept" | "concern" | "decline">("accept");
  const [proposedJoin, setProposedJoin] = useState("");
  const [concern, setConcern] = useState("");
  const [policies, setPolicies] = useState<Record<string, boolean>>({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    let live = true;
    fetch(`/api/offer/${token}`).then(async (response) => {
      const body = await response.json().catch(() => ({}));
      if (!live) return;
      if (!response.ok) {
        setError(body.error || "This joining link is not valid.");
        return;
      }
      setPack(body.pack);
      setProposedJoin(body.pack.proposedJoin || body.pack.earliestJoin || "");
      if (body.pack.decision === "concern" || body.pack.decision === "decline") setDecision(body.pack.decision);
      setConcern(body.pack.concern || "");
    }).catch(() => {
      if (live) setError("The server could not be reached.");
    });
    return () => { live = false; };
  }, [token]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    data.set("decision", decision);
    data.set("proposedJoin", proposedJoin);
    data.set("concern", concern);
    policyOrder.forEach((key) => { if (policies[key]) data.set(key, "yes"); });
    try {
      const response = await fetch(`/api/offer/${token}`, { method: "POST", body: data });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(body.error || "Nothing was saved.");
        setPending(false);
        return;
      }
      setDone(body.status);
    } catch {
      setError("The server could not be reached. Nothing was saved.");
    }
    setPending(false);
  }

  return (
    <main className={styles.layout} style={{ maxWidth: 760, margin: "0 auto", display: "block" }}>
      <article className={styles.form}>
        <p className={styles.sectionTitle}>KICCPA joining steps</p>
        {error && <p className={styles.error}>{error}</p>}
        {!pack && !error && <p>Loading the private page…</p>}
        {done && <p className={styles.ok}>{done === "ready" ? "Your acceptance, joining date, and documents are with human resources. Do not resign or relocate until they confirm the date in writing." : done === "declined" ? "Your decision to decline is recorded." : "Your written concern is with human resources. They will reply before any joining date is confirmed."}</p>}
        {pack && !done && (
          <>
            <h1>{pack.jobTitle}</h1>
            <p>Reference {pack.reference}. This page is only for {pack.name}. Do not forward the link.</p>
            {pack.locked ? <p className={styles.ok}>Joining date confirmed: {pack.confirmedJoin}. Bring the originals of your documents on the first day.</p> : (
              <form onSubmit={submit}>
                <p className={styles.sectionTitle}>1 · Your decision</p>
                <div className={styles.actions}>
                  {(["accept", "concern", "decline"] as const).map((item) => (
                    <button key={item} className={decision === item ? styles.btn : styles.line} type="button" onClick={() => setDecision(item)}>{item === "accept" ? "Accept" : item === "concern" ? "Send a concern" : "Decline"}</button>
                  ))}
                </div>
                {decision === "accept" ? (
                  <>
                    <label>Joining date
                      <input type="date" value={proposedJoin} min={pack.earliestJoin || undefined} max={pack.latestJoin || undefined} onChange={(e) => setProposedJoin(e.target.value)} required />
                    </label>
                    {pack.earliestJoin && <p>Choose from {pack.earliestJoin}{pack.latestJoin ? ` to ${pack.latestJoin}` : ""}.</p>}
                    <p className={styles.sectionTitle}>2 · Policies</p>
                    {policyOrder.map((key) => (
                      <label key={key} className={styles.check}>
                        <input type="checkbox" checked={Boolean(policies[key])} onChange={(e) => setPolicies({ ...policies, [key]: e.target.checked })} />
                        <span>{pack.policies[key]}</span>
                      </label>
                    ))}
                    <p className={styles.sectionTitle}>3 · Private documents</p>
                    {pack.documents.length === 0 && <p>No extra documents were requested.</p>}
                    {pack.documents.map((doc) => (
                      <label key={doc.id}>{doc.label} <span className={styles.file}>{doc.uploaded ? "Already received. Upload again only to replace it." : "PDF, DOC, DOCX, JPG, or PNG · 5 MB · private"}</span>
                        <input type="file" name={doc.id} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" required={!doc.uploaded} />
                      </label>
                    ))}
                  </>
                ) : (
                  <label>{decision === "decline" ? "Reason for declining" : "Concern letter"}
                    <textarea value={concern} onChange={(e) => setConcern(e.target.value)} required placeholder="Write the point human resources should answer before any joining date is set." />
                  </label>
                )}
                <button className={styles.btn} type="submit" disabled={pending}>{pending ? "Sending…" : "Submit securely"}</button>
                <p>KICCPA keeps these files for the hiring team only. Submitting this page does not by itself create an employment contract.</p>
              </form>
            )}
          </>
        )}
      </article>
    </main>
  );
}
