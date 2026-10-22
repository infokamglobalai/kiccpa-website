import Link from "next/link";
import { adminJobs, recruitmentSummary } from "@/lib/recruitment-actions";
import HiringCharts from "./HiringCharts";
import styles from "./desk.module.css";

export default async function Page() {
  let summary: { jobs: Record<string, number>; applications: Record<string, number>; applicationTotal: number; storage?: string } | null = null;
  let roles: Array<{ id: string; title: string; applicants?: number }> = [];
  let error = "";
  try {
    summary = await recruitmentSummary();
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load the hiring desk.";
  }
  try {
    roles = (await adminJobs()).jobs;
  } catch (err) {
    if (!error) error = err instanceof Error ? err.message : "Could not load the roles.";
  }
  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Hiring</p>
          <h1>Overview</h1>
          <p className={styles.lead}>Published roles appear on Careers and the matching service page. Each application keeps its stage, score, and the letters sent to the candidate.</p>
        </div>
        <div className={styles.row}>
          <Link className={styles.btn} href="/admin/recruitment/jobs/new">Post a role</Link>
          <Link className={styles.line} href="/admin/recruitment/applications">Review applications</Link>
        </div>
      </header>
      {summary?.storage === "local" && <p className={styles.notice}>Records are stored privately on this server until the database connection is allowed.</p>}
      {error && <p className={styles.error}>{error}</p>}
      {summary && (
        <>
          <div className={styles.stats}>
            <article className={styles.stat}><span>Applications</span><strong>{summary.applicationTotal}</strong></article>
            <article className={styles.stat}><span>Published roles</span><strong>{summary.jobs.published || 0}</strong></article>
            <article className={styles.stat}><span>Draft roles</span><strong>{summary.jobs.draft || 0}</strong></article>
            <article className={styles.stat}><span>In interview</span><strong>{summary.applications.interview || 0}</strong></article>
          </div>
          <HiringCharts applications={summary.applications} total={summary.applicationTotal} roles={roles} />
        </>
      )}
    </main>
  );
}
