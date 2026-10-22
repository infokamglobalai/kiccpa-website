"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteSocialDraft, saveSocialDraft, type SocialDraft } from "@/lib/recruitment-actions";
import styles from "../recruitment/desk.module.css";

const empty = { channel: "linkedin", purpose: "awareness", body: "", link: "", hashtags: "", status: "draft" };

export default function SocialForm({ items }: { items: SocialDraft[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function load(item: SocialDraft) {
    setEditing(item._id);
    setForm({ channel: item.channel, purpose: item.purpose, body: item.body, link: item.link, hashtags: item.hashtags, status: item.status });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await saveSocialDraft(editing, form);
      setMessage(form.status === "shared" ? "Marked as shared from the company page." : "Draft saved.");
      setEditing(null);
      setForm(empty);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the draft.");
    }
  }

  async function copy(item: SocialDraft) {
    const text = [item.body, item.link, item.hashtags].filter(Boolean).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setMessage("Copied. Paste it into the company LinkedIn, Facebook, or Instagram composer, then mark it shared.");
    } catch {
      setError("Could not copy. Select the text and copy it manually.");
    }
  }

  async function remove(id: string) {
    setError("");
    try {
      await deleteSocialDraft(id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the draft.");
    }
  }

  return (
    <div>
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.ok}>{message}</p>}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.grid}>
          <label>Channel
            <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })}>
              <option value="linkedin">LinkedIn</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </label>
          <label>Purpose
            <select value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })}>
              <option value="awareness">Company update</option>
              <option value="hiring">Hiring</option>
              <option value="product">Product</option>
              <option value="thought">Point of view</option>
            </select>
          </label>
        </div>
        <label>Post<textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required /></label>
        <div className={styles.grid}>
          <label>Link<input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://www.kiccpa.com/insights/..." /></label>
          <label>Hashtags<input value={form.hashtags} onChange={(e) => setForm({ ...form, hashtags: e.target.value })} placeholder="#KICCPA" /></label>
        </div>
        <label>Status
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="draft">Draft</option>
            <option value="ready">Ready to copy</option>
            <option value="shared">Shared on the company page</option>
          </select>
        </label>
        <button className={styles.btn} type="submit">{editing ? "Update draft" : "Save draft"}</button>
      </form>
      <div className={styles.tableWrap}>
      <table>
        <thead><tr><th>Post</th><th>Channel</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.body.slice(0, 140)}{item.body.length > 140 ? "…" : ""}</td>
              <td>{item.channel}<br /><span className={styles.muted}>{item.purpose}</span></td>
              <td>{item.status}</td>
              <td className={styles.row}>
                <button className={styles.line} type="button" onClick={() => copy(item)}>Copy</button>
                <button className={styles.line} type="button" onClick={() => load(item)}>Edit</button>
                <button className={styles.line} type="button" onClick={() => remove(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {items.length === 0 && <tr><td colSpan={4}>No social drafts yet.</td></tr>}
        </tbody>
      </table>
      </div>
    </div>
  );
}
