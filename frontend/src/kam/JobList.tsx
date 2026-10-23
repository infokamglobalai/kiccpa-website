import Link from "next/link";
import Reveal from "./Reveal";
import type { PublicJob } from "@/lib/jobs";
import { jobDepartments } from "./site";
import styles from "./kam.module.css";

export function departmentLabel(id: string) {
  return jobDepartments.find((item) => item.id === id)?.label || id;
}

export function JobList({ jobs }: { jobs: PublicJob[] }) {
  return (
    <div className={styles.jobGrid}>
      {jobs.map((job, index) => (
        <Reveal key={job.id} index={index} variant="rise">
        <article className={styles.jobCard}>
          <p>{departmentLabel(job.department)} · {job.reference}</p>
          <h3>{job.title}</h3>
          <p>{job.summary}</p>
          <p>{job.location} · {job.workplace} · {job.employmentType} · {job.openings} opening{job.openings === 1 ? "" : "s"}</p>
          <Link href={`/careers/${job.slug}`}>View role and apply <span className={styles.arrow}>→</span></Link>
        </article>
        </Reveal>
      ))}
    </div>
  );
}
