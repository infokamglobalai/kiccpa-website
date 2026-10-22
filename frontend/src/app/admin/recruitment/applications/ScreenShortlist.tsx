"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { screenSuggested } from "@/lib/recruitment-actions";
import styles from "../desk.module.css";

export default function ScreenShortlist({ jobId }: { jobId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function run() {
    setPending(true);
    setError("");
    setMessage("");
    try {
      const result = await screenSuggested(jobId);
      setMessage(result.moved > 0
        ? `${result.moved} suggested ${result.moved === 1 ? "name is" : "names are"} now in screening. No email was sent.`
        : "No suggested names are waiting in Submitted or On hold.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not move the shortlist.");
    }
    setPending(false);
  }

  return (
    <div>
      <button className={styles.btn} type="button" onClick={run} disabled={pending}>{pending ? "Moving…" : "Move suggested to screening"}</button>
      {message ? <p className={styles.ok}>{message}</p> : null}
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
