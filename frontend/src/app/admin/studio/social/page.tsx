import { studioSocial } from "@/lib/recruitment-actions";
import SocialForm from "../SocialForm";
import styles from "../../recruitment/desk.module.css";

export default async function Page() {
  let items: Awaited<ReturnType<typeof studioSocial>>["social"] = [];
  let error = "";
  try {
    items = (await studioSocial()).social;
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load social drafts.";
  }
  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Website</p>
          <h1>Social drafts</h1>
          <p className={styles.lead}>Prepare the LinkedIn, Facebook, or Instagram post here, copy it, and publish it from the company page. Mark it shared after it is live.</p>
        </div>
      </header>
      {error && <p className={styles.error}>{error}</p>}
      <SocialForm items={items} />
    </main>
  );
}
