import { listPublicJobs } from "@/lib/jobs";
import { JobList, departmentLabel } from "./JobList";
import styles from "./kam.module.css";

export default async function OpenRoles({ department }: { department: string }) {
  const { jobs } = await listPublicJobs(department);
  if (!jobs.length) return null;
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Careers</p>
        <h2 className={styles.h2}>Open roles in {departmentLabel(department)}</h2>
        <p className={styles.muted}>These roles are published from the KICCPA hiring desk. Apply on the role page.</p>
        <div style={{ marginTop: 18 }}>
          <JobList jobs={jobs} />
        </div>
      </div>
    </section>
  );
}
