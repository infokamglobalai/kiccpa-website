import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight } from "@/lib/insights";
import styles from "@/kam/kam.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) return { title: "Insight" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getInsight(slug);
  if (!post) notFound();
  const paragraphs = post.body.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  return (
    <main className={styles.sv}>
      <section className={styles.svHero}>
        <div className={styles.wrap}>
          <p className={styles.svEyebrow}>{post.author}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </div>
      </section>
      <section className={styles.svSection}>
        <div className={`${styles.wrap} ${styles.prose}`}>
          {paragraphs.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}
          <p><Link href="/insights">All insights</Link></p>
        </div>
      </section>
    </main>
  );
}
