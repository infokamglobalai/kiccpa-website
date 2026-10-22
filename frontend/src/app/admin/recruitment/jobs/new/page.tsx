import JobEditor from "../../JobEditor";
import styles from "../../desk.module.css";

export default function Page() {
  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Hiring</p>
          <h1>Post a role</h1>
          <p className={styles.lead}>Drafts stay off the website. Choose Published when the role should appear on Careers and its service page.</p>
        </div>
      </header>
      <JobEditor />
    </main>
  );
}
