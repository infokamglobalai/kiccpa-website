import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { studioPosts } from "@/lib/recruitment-actions";
import ArticleForm from "./ArticleForm";
import styles from "../recruitment/desk.module.css";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const canPublish = session?.user?.role === "superadmin" || session?.user?.role === "admin";
  let posts: Awaited<ReturnType<typeof studioPosts>>["posts"] = [];
  let error = "";
  try {
    posts = (await studioPosts()).posts;
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load articles.";
  }
  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Website</p>
          <h1>Articles</h1>
          <p className={styles.lead}>{canPublish ? "A published article appears on Insights. SEO and marketing can save drafts." : "Save the article as a draft. An admin or super admin publishes it on Insights."}</p>
        </div>
      </header>
      {error && <p className={styles.error}>{error}</p>}
      <ArticleForm posts={posts} canPublish={canPublish} />
    </main>
  );
}
