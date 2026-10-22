import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplicationForm from "@/kam/ApplicationForm";
import { departmentLabel } from "@/kam/JobList";
import apply from "@/kam/apply.module.css";
import { getPublicJob } from "@/lib/jobs";
import styles from "@/kam/kam.module.css";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  return { title: job ? job.title : "Role", description: job?.summary || "KICCPA role" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getPublicJob(slug);
  if (!job) notFound();
  const experience = job.experienceMax > job.experienceMin ? `${job.experienceMin}–${job.experienceMax} years` : `${job.experienceMin}+ years`;

  return (
    <main className={styles.sv}>
      <section className={styles.svHero}>
        <div className={styles.wrap}>
          <p className={styles.svEyebrow}>{departmentLabel(job.department)} · {job.reference}</p>
          <h1>{job.title}</h1>
          <p>{job.summary}</p>
        </div>
      </section>
      <div className={`${styles.wrap} ${apply.layout}`}>
        <article>
          <div className={apply.meta}>
            <span>{job.location}</span>
            <span>{job.workplace}</span>
            <span>{job.employmentType}</span>
            <span>{experience}</span>
            <span>{job.openings} opening{job.openings === 1 ? "" : "s"}</span>
            {job.deadline && <span>Apply by {new Date(job.deadline).toLocaleDateString()}</span>}
            {Number(job.salaryMax) > 0 && <span>{job.salaryCurrency || "KWD"} {job.salaryMin ? `${job.salaryMin}–` : ""}{job.salaryMax} {job.salaryPeriod === "monthly" ? "monthly" : "yearly"}</span>}
            {job.managerName && <span>Hiring manager: {job.managerName}{job.managerRole ? `, ${job.managerRole}` : ""}</span>}
          </div>
          {job.about && <p className={styles.muted}>{job.about}</p>}
          <List title="What you will do" items={job.responsibilities} />
          <List title="What you will need" items={job.requirements} />
          <List title="Helpful, not required" items={job.niceToHave} />
          <List title="What we offer in this role" items={job.benefits} />
          <p className={styles.muted}>Only details entered by the hiring team are shown. This page is not a promise of employment.</p>
          <Link className={styles.textLink} href="/careers">All open roles →</Link>
        </article>
        <ApplicationForm job={job} />
      </div>
    </main>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className={apply.block}>
      <h2>{title}</h2>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
