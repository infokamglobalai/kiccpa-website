import type { Metadata } from "next";
import Link from "next/link";
import { listInsights } from "@/lib/insights";
import styles from "@/kam/kam.module.css";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes published by the KICCPA team.",
};

export default async function Page() {
  const posts = await listInsights();
  return (
    <main className={styles.sv}>
      <section className={styles.svHero}>
        <div className={styles.wrap}>
          <p className={styles.svEyebrow}>Insights</p>
          <h1>Notes from the KICCPA team</h1>
          <p>Articles appear here after they are published from the website desk.</p>
        </div>
      </section>
      <section className={styles.svSection}>
        <div className={styles.wrap}>
          {posts.length === 0 ? <p>No articles are published yet.</p> : (
            <div className={styles.cards2}>
              {posts.map((post) => (
                <article key={post.id} className={styles.plain}>
                  <p className={styles.kicker}>{post.author}</p>
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <Link href={`/insights/${post.slug}`}>Read</Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
