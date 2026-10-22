import Link from "next/link";
import { notFound } from "next/navigation";
import JobEditor from "../../JobEditor";
import { adminJobs } from "@/lib/recruitment-actions";
import styles from "../../desk.module.css";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { jobs } = await adminJobs();
  const job = jobs.find((item) => item.id === id);
  if (!job) notFound();
  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>{job.reference}</p>
          <h1>Edit {job.title}</h1>
          <p className={styles.lead}>{job.applicants || 0} applications · <Link href={`/admin/recruitment/applications?job=${job.id}`}>View candidates</Link></p>
        </div>
      </header>
      <JobEditor job={job} />
    </main>
  );
}
