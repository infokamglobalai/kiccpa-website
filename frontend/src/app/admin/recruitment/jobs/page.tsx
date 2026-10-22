import Link from "next/link";
import { adminJobs } from "@/lib/recruitment-actions";
import { departmentLabel } from "@/kam/JobList";
import styles from "../desk.module.css";

export default async function Page() {
  let jobs: Array<{ id: string; title: string; reference: string; department: string; status: string; location: string; applicants?: number; slug: string; stages?: Record<string, number> }> = [];
  let error = "";
  try {
    const data = await adminJobs();
    jobs = data.jobs;
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load roles.";
  }
  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Hiring</p>
          <h1>Roles</h1>
          <p className={styles.lead}>Open a role to edit it. The application count links to the people who applied.</p>
        </div>
        <Link className={styles.btn} href="/admin/recruitment/jobs/new">New role</Link>
      </header>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr><th>Role</th><th>Service</th><th>Status</th><th>Applications</th><th></th></tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>
                  <strong>{job.title}</strong>
                  <br />
                  <span className={styles.muted}>{job.reference} · {job.location}</span>
                </td>
                <td>{departmentLabel(job.department)}</td>
                <td><span className={styles.pill} data-status={job.status}>{job.status}</span></td>
                <td>
                  <Link href={`/admin/recruitment/applications?job=${job.id}`}>{job.applicants || 0} total</Link>
                  <br />
                  <span className={styles.muted}>
                    {Object.entries(job.stages || {}).map(([stage, count]) => `${stage} ${count}`).join(" · ") || "No applications yet"}
                  </span>
                </td>
                <td><Link className={styles.line} href={`/admin/recruitment/jobs/${job.id}`}>Edit</Link></td>
              </tr>
            ))}
            {jobs.length === 0 && !error && <tr><td colSpan={5}>No roles yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </main>
  );
}
