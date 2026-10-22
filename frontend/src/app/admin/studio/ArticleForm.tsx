"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteStudioPost, saveStudioPost, type StudioPost } from "@/lib/recruitment-actions";
import styles from "../recruitment/desk.module.css";

const empty = { title: "", excerpt: "", body: "", metaTitle: "", metaDescription: "", focusKeyword: "", authorName: "KICCPA", status: "draft" };

export default function ArticleForm({ posts, canPublish }: { posts: StudioPost[]; canPublish: boolean }) {
  const router = useRouter();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const checks = useMemo(() => {
    const title = (form.metaTitle || form.title).trim();
    const description = (form.metaDescription || form.excerpt).trim();
    const keyword = form.focusKeyword.trim().toLowerCase();
    return [
      title.length >= 30 && title.length <= 60 ? "Search title length is in a useful range." : "Aim for a search title of about 30–60 characters.",
      description.length >= 70 && description.length <= 160 ? "Search description length is in a useful range." : "Aim for a search description of about 70–160 characters.",
      keyword && title.toLowerCase().includes(keyword) ? "The focus phrase appears in the search title." : "Put the focus phrase in the search title.",
      keyword && form.body.toLowerCase().includes(keyword) ? "The focus phrase appears in the article." : "Use the focus phrase naturally in the article.",
    ];
  }, [form]);

  function load(post: StudioPost) {
    setEditing(post._id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      body: post.body,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      focusKeyword: post.focusKeyword,
      authorName: post.authorName,
      status: post.status,
    });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await saveStudioPost(editing, canPublish ? form : { ...form, status: "draft" });
      const current = posts.find((post) => post._id === editing);
      const stayingLive = !canPublish && current?.status === "published";
      setMessage(stayingLive ? "Saved. This article stays on Insights." : canPublish && form.status === "published" ? "Article published on the insights page." : canPublish ? "Draft saved." : "Draft saved. An admin publishes it on Insights.");
      setEditing(null);
      setForm(empty);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the article.");
    }
  }

  async function remove(id: string) {
    setError("");
    try {
      await deleteStudioPost(id);
      if (editing === id) {
        setEditing(null);
        setForm(empty);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete the article.");
    }
  }

  return (
    <div>
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.ok}>{message}</p>}
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.grid}>
          <label>Title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
          <label>Author<input value={form.authorName} onChange={(e) => setForm({ ...form, authorName: e.target.value })} /></label>
        </div>
        <label>Summary<input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required /></label>
        <label>Article<textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required /></label>
        <div className={styles.grid}>
          <label>Search title<input value={form.metaTitle} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} placeholder="Shown in search results" /></label>
          <label>Focus phrase<input value={form.focusKeyword} onChange={(e) => setForm({ ...form, focusKeyword: e.target.value })} placeholder="One phrase this article should be found for" /></label>
        </div>
        <label>Search description<textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} /></label>
        <div className={styles.checks}>
          {checks.map((line) => <p key={line}>{line}</p>)}
        </div>
        {canPublish ? (
          <label>Status
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="draft">Draft — hidden from the site</option>
              <option value="published">Published — visible on Insights</option>
            </select>
          </label>
        ) : <p className={styles.muted}>This save stays a draft. An admin or super admin publishes it.</p>}
        <div className={styles.row}>
          <button className={styles.btn} type="submit">{editing ? "Update article" : "Save article"}</button>
          {editing && <button className={styles.line} type="button" onClick={() => { setEditing(null); setForm(empty); }}>Cancel edit</button>}
        </div>
      </form>
      <div className={styles.tableWrap}>
      <table>
        <thead><tr><th>Article</th><th>Search</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}<br /><span className={styles.muted}>/insights/{post.slug}</span></td>
              <td>{post.focusKeyword || "—"}</td>
              <td>{post.status}</td>
              <td className={styles.row}>
                <button className={styles.line} type="button" onClick={() => load(post)}>Edit</button>
                <button className={styles.line} type="button" onClick={() => remove(post._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {posts.length === 0 && <tr><td colSpan={4}>No articles yet.</td></tr>}
        </tbody>
      </table>
      </div>
    </div>
  );
}
