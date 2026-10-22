import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { documentLabel } from "@/lib/hiring-fields";
import { canHire } from "@/lib/roles";
import { adminApplication, adminJobs, listManagers } from "@/lib/recruitment-actions";
import ApplicationDesk from "../ApplicationDesk";
import OnboardingDesk from "../OnboardingDesk";
import styles from "../../desk.module.css";

type Note = { author?: string; text?: string; status?: string; at?: string };
type Score = { role?: number; problem?: number; communication?: number; experience?: number; fit?: number; average?: number; recommendation?: string; interviewer?: string; comment?: string; author?: string; at?: string };
type Mail = { to?: string; subject?: string; body?: string; status?: string; sent?: boolean; error?: string; author?: string; at?: string };

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const hiring = canHire(session?.user?.role);
  let application: Record<string, unknown> | null = null;
  try {
    const data = await adminApplication(id);
    application = data.application;
  } catch {
    notFound();
  }
  if (!application) notFound();
  const notes = Array.isArray(application.notes) ? application.notes as Note[] : [];
  const scores = Array.isArray(application.scores) ? application.scores as Score[] : [];
  const mails = Array.isArray(application.mails) ? application.mails as Mail[] : [];
  const documents = Array.isArray(application.documents) ? application.documents as Array<{ kind?: string; name?: string }> : [];
  let rounds: string[] = [];
  let offer = "";
  let manager = "";
  let managers: Array<{ name: string; email: string; title: string; department: string }> = [];
  if (hiring) {
    try {
      managers = (await listManagers()).managers;
    } catch {
      managers = [];
    }
  }
  try {
    const jobs = await adminJobs();
    const role = jobs.jobs.find((job) => job.id === String(application.job));
    rounds = role?.rounds || [];
    if (role && Number(role.salaryMax) > 0) offer = `${role.salaryCurrency || "KWD"} ${role.salaryMin ? `${role.salaryMin}–` : ""}${role.salaryMax} ${role.salaryPeriod === "monthly" ? "monthly" : "yearly"}`;
    if (role?.managerName) manager = `${role.managerName}${role.managerRole ? ` · ${role.managerRole}` : ""}`;
  } catch {
    rounds = [];
  }
  const path = ["submitted", "screening", "interview", "offer", "hired"];
  return (
    <main>
      <p><Link className={styles.back} href="/admin/recruitment/applications">All applications</Link></p>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>{String(application.reference)}</p>
          <h1>{String(application.fullName)}</h1>
          <p className={styles.lead}>{String(application.jobTitle)} · score {String(application.scoreAverage || "—")}</p>
        </div>
        <span className={styles.pill} data-status={String(application.status)}>{String(application.status)}</span>
      </header>
      {application.screen && typeof application.screen === "object" ? (
        <article className={styles.card}>
          <p className={styles.kicker}>Job match</p>
          <p><strong>{(application.screen as { score?: number }).score} · {(application.screen as { band?: string }).band}</strong></p>
          <p>{(application.screen as { experienceNote?: string }).experienceNote}</p>
          <p>{(application.screen as { resumeRead?: boolean }).resumeRead ? "Resume text was included in this match." : "This file could not be read, so the match uses the form answers."}</p>
          <p><strong>Found</strong><br />{((application.screen as { matched?: string[] }).matched || []).join(" · ") || "None of the requirement lines yet."}</p>
          <p><strong>Still missing</strong><br />{((application.screen as { missing?: string[] }).missing || []).join(" · ") || "No requirement line is missing."}</p>
        </article>
      ) : null}
      <p className={styles.row}>
        {path.map((stage) => (
          <span key={stage} className={styles.pill} data-status={stage === String(application.status) ? stage : undefined}>{stage}</span>
        ))}
        {(application.status === "rejected" || application.status === "on-hold") && (
          <span className={styles.pill} data-status={String(application.status)}>{String(application.status)}</span>
        )}
      </p>
      {(offer || manager) && <p className={styles.muted}>{offer ? `Offered range ${offer}. ` : ""}{manager ? `Hiring manager ${manager}.` : ""}</p>}
      <article className={styles.card}>
        <p>{String(application.email)} · {String(application.phone)}</p>
        <p>{String(application.city)}, {String(application.country)}</p>
        <p>{String(application.currentTitle || "—")} at {String(application.currentCompany || "—")} · {String(application.experienceYears)} years · notice {String(application.noticePeriod || "—")}</p>
        <p>{String(application.educationLevel)}, {String(application.institution)} {String(application.graduationYear || "")}</p>
        {application.linkedin ? <p>LinkedIn: {String(application.linkedin)}</p> : null}
        {application.portfolio ? <p>Portfolio: {String(application.portfolio)}</p> : null}
        <p>{String(application.coverNote)}</p>
        <p className={styles.row}>
          <a className={styles.btn} href={`/api/recruitment/file/${id}/resume`}>Download resume</a>
          {application.hasExtra ? <a className={styles.line} href={`/api/recruitment/file/${id}/extra`}>Additional document</a> : null}
          {documents.map((doc) => (
            <a key={doc.kind} className={styles.line} href={`/api/recruitment/file/${id}/${doc.kind}`}>{documentLabel(String(doc.kind))}{doc.name ? ` · ${doc.name}` : ""}</a>
          ))}
        </p>
      </article>
      <h2>Assigned managers</h2>
      {Array.isArray(application.assignments) && (application.assignments as Array<{ round?: string; managerName?: string; managerEmail?: string; sent?: boolean; at?: string }>).length > 0 ? (
        (application.assignments as Array<{ round?: string; managerName?: string; managerEmail?: string; sent?: boolean; at?: string }>).map((item, index) => (
          <article key={`${item.at}-${index}`} className={styles.card}>
            <strong>{item.round || "Interview"} · {item.managerName}</strong>
            <p>{item.managerEmail} · {item.sent ? "Emailed to the manager" : "Saved on this application. Email was not sent."}</p>
          </article>
        ))
      ) : <p className={styles.muted}>No department manager assigned yet.</p>}
      <ApplicationDesk id={id} status={String(application.status)} rounds={rounds} canHire={hiring} managers={managers} />
      {hiring && <OnboardingDesk id={id} status={String(application.status)} pack={(application.onboarding || null) as { status?: string; earliestJoin?: string; latestJoin?: string; proposedJoin?: string; confirmedJoin?: string; decision?: string; concern?: string; documentsRequired?: string[]; documents?: Array<{ kind?: string; name?: string }>; policies?: Record<string, string> } | null} />}
      <h2>Interviews</h2>
      {Array.isArray(application.interviews) && (application.interviews as Array<{ when?: string; link?: string; interviewer?: string; at?: string }>).length > 0 ? (
        (application.interviews as Array<{ when?: string; link?: string; interviewer?: string; sent?: boolean; at?: string }>).map((item, index) => (
          <article key={`${item.at}-${index}`} className={styles.card}>
            <strong>{(item as { round?: string }).round || "Interview"} · {item.when}</strong>
            <p>{item.interviewer || "Hiring team"} · {(item as { mode?: string }).mode === "offline" ? "In person" : "Online"} · {item.sent ? "Emailed to the candidate" : "Email not sent"}</p>
            {(item as { mode?: string; place?: string }).mode === "offline" ? <p>{(item as { place?: string }).place}</p> : item.link ? <p><a href={item.link}>{item.link}</a></p> : null}
          </article>
        ))
      ) : <p className={styles.muted}>No interview sent yet.</p>}
      <h2>Scorecards</h2>
      {scores.length === 0 && <p className={styles.muted}>No interview score yet.</p>}
      {scores.map((score, index) => (
        <article key={`${score.at}-${index}`} className={styles.card}>
          <strong>{score.average} / 5 · {score.recommendation}</strong>
          <p>{score.interviewer} · role {score.role} · problem solving {score.problem} · communication {score.communication} · experience {score.experience} · fit {score.fit}</p>
          {score.comment ? <p>{score.comment}</p> : null}
          <p className={styles.muted}>{score.author} · {score.at ? new Date(score.at).toLocaleString() : ""}</p>
        </article>
      ))}
      <h2>Letters</h2>
      {mails.length === 0 && <p className={styles.muted}>No letters recorded yet.</p>}
      {mails.map((mail, index) => (
        <article key={`${mail.at}-${index}`} className={styles.card}>
          <strong>{mail.subject}</strong>
          <p>{mail.to ? `To ${mail.to} · ` : ""}{mail.status} · {mail.sent ? "Sent" : "Not sent"}{mail.error ? ` · ${mail.error}` : ""}</p>
          {mail.body ? <p className={styles.letter}>{mail.body}</p> : null}
          <p className={styles.muted}>{mail.author} · {mail.at ? new Date(mail.at).toLocaleString() : ""}</p>
        </article>
      ))}
      <h2>Internal notes</h2>
      {notes.map((note, index) => (
        <article key={`${note.at}-${index}`} className={styles.card}>
          <strong>{note.status}</strong>
          <p>{note.text}</p>
          <p className={styles.muted}>{note.author} · {note.at ? new Date(note.at).toLocaleString() : ""}</p>
        </article>
      ))}
    </main>
  );
}
