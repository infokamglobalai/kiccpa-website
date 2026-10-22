"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { offerDocumentLabel, offerDocuments } from "@/lib/offer-pack";
import { confirmJoining, sendOnboarding } from "@/lib/recruitment-actions";
import styles from "../desk.module.css";

type Pack = {
  status?: string;
  earliestJoin?: string;
  latestJoin?: string;
  proposedJoin?: string;
  confirmedJoin?: string;
  decision?: string;
  concern?: string;
  documentsRequired?: string[];
  documents?: Array<{ kind?: string; name?: string }>;
  policies?: Record<string, string>;
};

const policyLabels: Record<string, string> = {
  offer: "Offer acceptance",
  confidentiality: "Confidentiality",
  conduct: "Workplace conduct",
  data: "Private employment records",
  accuracy: "Documents are true",
};

export default function OnboardingDesk({ id, status, pack }: { id: string; status: string; pack: Pack | null }) {
  const router = useRouter();
  const [earliestJoin, setEarliest] = useState(pack?.earliestJoin || "");
  const [latestJoin, setLatest] = useState(pack?.latestJoin || "");
  const [documents, setDocuments] = useState<string[]>(pack?.documentsRequired || ["signed-offer", "noc"]);
  const [confirmedJoin, setConfirmed] = useState(pack?.proposedJoin || pack?.confirmedJoin || "");
  const [fallback, setFallback] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const ready = status === "offer" || status === "hired";

  function toggle(docId: string) {
    setDocuments((current) => current.includes(docId) ? current.filter((item) => item !== docId) : [...current, docId]);
  }

  return (
    <div>
      <h2>Joining pack</h2>
      <p className={styles.muted}>After the offer, the candidate uses a private link. They choose a joining date, accept the policy points or send a written concern, and upload only the documents you tick. The files stay off the website. This pack records the steps. It is not a substitute for the employment contract your counsel reviews.</p>
      {!ready && <p className={styles.muted}>Move the stage to offer before sending the pack.</p>}
      {pack?.decision === "concern" && <p className={styles.error}>Written concern: {pack.concern}</p>}
      {pack?.decision === "decline" && <p className={styles.error}>The candidate declined. {pack.concern}</p>}
      {pack?.decision === "accept" && <p className={styles.ok}>Accepted. Proposed joining date {pack.proposedJoin || "—"}.{pack.status === "confirmed" ? ` Confirmed ${pack.confirmedJoin}.` : ""}</p>}
      {pack && (
        <article className={styles.card}>
          <p>Policies: {Object.keys(policyLabels).map((key) => `${policyLabels[key]} ${pack.policies?.[key] ? "confirmed" : "waiting"}`).join(" · ")}</p>
          <p className={styles.row}>
            {(pack.documents || []).map((doc) => (
              <a key={doc.kind} className={styles.line} href={`/api/recruitment/file/${id}/${doc.kind}`}>{offerDocumentLabel(String(doc.kind))}</a>
            ))}
            {(pack.documents || []).length === 0 && <span className={styles.muted}>No joining documents uploaded yet.</span>}
          </p>
        </article>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.ok}>{message}</p>}
      {fallback && <p className={styles.cred}>Email was not sent. Give this private link only to the candidate: {fallback}</p>}
      {pack?.status !== "confirmed" && (
        <form className={styles.form} onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          setError("");
          setMessage("");
          setFallback("");
          try {
            const result = await sendOnboarding(id, { earliestJoin, latestJoin, documents });
            setMessage(result.emailed ? "The private joining link was emailed. The old link, if any, no longer works." : "The pack is saved. The email was not sent.");
            if (!result.emailed && result.link) setFallback(result.link);
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not send the joining pack.");
          }
          setPending(false);
        }}>
          <div className={styles.grid}>
            <label>Earliest joining date<input type="date" value={earliestJoin} onChange={(e) => setEarliest(e.target.value)} /></label>
            <label>Latest joining date<input type="date" value={latestJoin} onChange={(e) => setLatest(e.target.value)} /></label>
          </div>
          <p className={styles.sectionTitle}>Documents the candidate must upload</p>
          <div className={styles.checks}>
            {offerDocuments.map((item) => (
              <label key={item.id} className={styles.row}>
                <input type="checkbox" checked={documents.includes(item.id)} onChange={() => toggle(item.id)} />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          <button className={styles.btn} type="submit" disabled={pending || !ready}>{pending ? "Sending…" : pack ? "Send a new private link" : "Email the joining pack"}</button>
        </form>
      )}
      {pack?.status === "ready" && (
        <form className={styles.form} onSubmit={async (event) => {
          event.preventDefault();
          setPending(true);
          setError("");
          setMessage("");
          try {
            const result = await confirmJoining(id, confirmedJoin);
            setMessage(result.emailed ? "Joining date confirmed and emailed to the candidate." : "Joining date saved. The confirmation email was not sent.");
            router.refresh();
          } catch (err) {
            setError(err instanceof Error ? err.message : "Could not confirm the date.");
          }
          setPending(false);
        }}>
          <label>Confirm joining date<input type="date" value={confirmedJoin} onChange={(e) => setConfirmed(e.target.value)} required /></label>
          <button className={styles.btn} type="submit" disabled={pending}>Confirm and email the candidate</button>
        </form>
      )}
    </div>
  );
}
