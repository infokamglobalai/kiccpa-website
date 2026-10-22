"use client";

import { useState } from "react";
import styles from "./kam.module.css";

export default function SubscribeAction({ mode, token }: { mode: "confirm" | "unsubscribe"; token: string }) {
  const [state, setState] = useState<"idle" | "working" | "done" | "error">("idle");
  const [text, setText] = useState("");
  const title = mode === "confirm" ? "Confirm updates" : "Unsubscribe";
  const button = mode === "confirm" ? "Confirm subscription" : "Unsubscribe";

  async function run() {
    setState("working");
    try {
      const response = await fetch(`/api/subscribe/${mode === "confirm" ? "confirm" : "unsubscribe"}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "This link is not valid.");
      setState("done");
      setText(data.message || "Saved.");
    } catch (err) {
      setState("error");
      setText(err instanceof Error ? err.message : "Could not complete that.");
    }
  }

  return (
    <main className={styles.offset}>
      <section className={styles.section}>
        <article className={`${styles.wrap} ${styles.legal} ${styles.prose}`}>
          <h1 className={styles.h2}>{title}</h1>
          {!token ? <p>This link is missing a token. Use the link from the email.</p> : null}
          {token && state === "idle" && (
            <>
              <p>{mode === "confirm" ? "Confirm that this email address should receive KICCPA insights and company updates." : "Stop KICCPA insights and company updates for this address."}</p>
              <button className={styles.cookiePrimary} type="button" onClick={run}>{button}</button>
            </>
          )}
          {state === "working" && <p>Saving…</p>}
          {state !== "idle" && state !== "working" && <p>{text}</p>}
        </article>
      </section>
    </main>
  );
}
