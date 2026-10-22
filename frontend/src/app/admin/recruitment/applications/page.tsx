import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { jobDepartments } from "@/kam/site";
import { canHire } from "@/lib/roles";
import { adminApplications, adminJobs } from "@/lib/recruitment-actions";
import ScreenShortlist from "./ScreenShortlist";
import styles from "../desk.module.css";

const stages = ["", "submitted", "screening", "interview", "offer", "hired", "rejected", "on-hold"];

export default async function Page({ searchParams }: { searchParams: Promise<{ status?: string; job?: string; department?: string; q?: string; suggested?: string }> }) {
  const query = await searchParams;
  const session = await getServerSession(authOptions);
  const hiring = canHire(session?.user?.role);
  const search = new URLSearchParams();
  if (query.status) search.set("status", query.status);
  if (query.job) search.set("job", query.job);
  if (query.department) search.set("department", query.department);
  if (query.q) search.set("q", query.q);
  if (query.suggested === "1") search.set("suggested", "1");
  let rows: Array<Record<string, unknown>> = [];
  let roles: Array<{ id: string; title: string; reference?: string }> = [];
  let error = "";
  try {
    const data = await adminApplications(search.toString() ? `?${search}` : "");
    rows = data.applications;
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load applications.";
  }
  if (hiring) {
    try {
      roles = (await adminJobs()).jobs;
    } catch {
      roles = [];
    }
  }
  const hired = rows.filter((row) => row.status === "hired").length;
  const rejected = rows.filter((row) => row.status === "rejected").length;
  const hold = rows.filter((row) => row.status === "on-hold").length;
  const open = rows.length - hired - rejected - hold;
  const filtered = Boolean(query.status || query.job || query.department || query.q || query.suggested === "1");
  const keep = (extra: Record<string, string>) => {
    const next = new URLSearchParams();
    const merged = {
      status: query.status || "",
      job: query.job || "",
      department: query.department || "",
      q: query.q || "",
      suggested: query.suggested === "1" ? "1" : "",
      ...extra,
    };
    if (merged.status) next.set("status", merged.status);
    if (merged.job) next.set("job", merged.job);
    if (merged.department) next.set("department", merged.department);
    if (merged.q) next.set("q", merged.q);
    if (merged.suggested === "1") next.set("suggested", "1");
    const text = next.toString();
    return text ? `/admin/recruitment/applications?${text}` : "/admin/recruitment/applications";
  };
  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Hiring</p>
          <h1>{hiring ? "Applications" : "Assigned to me"}</h1>
          <p className={styles.lead}>{hiring ? "Closest matches are listed first. Suggested marks the top names for the open seats." : `${rows.length} interview${rows.length === 1 ? "" : "s"} assigned to you.`}</p>
        </div>
        {hiring && query.job ? <ScreenShortlist jobId={query.job} /> : null}
        {hiring && rows.length > 0 && <a className={styles.btn} href={`/api/recruitment/export${search.toString() ? `?${search}` : ""}`}>Download this view</a>}
      </header>
      {hiring && rows.length > 0 && (
        <div className={styles.stats}>
          <article className={styles.stat}><span>In progress</span><strong>{open}</strong></article>
          <article className={styles.stat}><span>Selected</span><strong>{hired}</strong></article>
          <article className={styles.stat}><span>Not selected</span><strong>{rejected}</strong></article>
          <article className={styles.stat}><span>On hold</span><strong>{hold}</strong></article>
        </div>
      )}
      <section className={styles.filters}>
        <form className={styles.search} action="/admin/recruitment/applications" method="get">
          {query.status ? <input type="hidden" name="status" value={query.status} /> : null}
          {query.job ? <input type="hidden" name="job" value={query.job} /> : null}
          {query.department ? <input type="hidden" name="department" value={query.department} /> : null}
          {query.suggested === "1" ? <input type="hidden" name="suggested" value="1" /> : null}
          <input name="q" defaultValue={query.q || ""} placeholder="Search name or email" aria-label="Search name or email" />
          <button className={styles.btn} type="submit">Search</button>
          {query.q ? <Link className={styles.line} href={keep({ q: "" })}>Clear</Link> : null}
        </form>
        <div>
          <p className={styles.filterLabel}>Stage</p>
          <div className={styles.chips}>
            {stages.map((stage) => {
              const on = (query.status || "") === stage;
              const label = stage === "on-hold" ? "On hold" : stage ? stage.charAt(0).toUpperCase() + stage.slice(1) : "All stages";
              return (
                <Link key={stage || "all"} className={styles.chip} data-on={on ? "true" : "false"} href={keep(stage ? { status: stage } : { status: "" })}>
                  {label}
                </Link>
              );
            })}
            <Link className={styles.chip} data-on={query.suggested === "1" ? "true" : "false"} href={keep({ suggested: query.suggested === "1" ? "" : "1" })}>Suggested only</Link>
          </div>
        </div>
        {hiring && (
          <div>
            <p className={styles.filterLabel}>Role</p>
            <div className={styles.chips}>
              <Link className={styles.chip} data-on={query.job ? "false" : "true"} href={keep({ job: "" })}>All roles</Link>
              {roles.map((role) => (
                <Link key={role.id} className={styles.chip} data-on={query.job === role.id ? "true" : "false"} href={keep({ job: role.id })}>{role.title}</Link>
              ))}
            </div>
          </div>
        )}
        <div>
          <p className={styles.filterLabel}>Department</p>
          <div className={styles.chips}>
            <Link className={styles.chip} data-on={query.department ? "false" : "true"} href={keep({ department: "" })}>All departments</Link>
            {jobDepartments.map((item) => (
              <Link key={item.id} className={styles.chip} data-on={query.department === item.id ? "true" : "false"} href={keep({ department: item.id })}>{item.label}</Link>
            ))}
          </div>
        </div>
      </section>
      {error && <p className={styles.error}>{error}</p>}
      {rows.length === 0 && !error ? (
        <article className={styles.empty}>
          <h2 className={styles.emptyTitle}>{filtered ? "No applications in this view" : "No applications yet"}</h2>
          <p className={styles.emptyCopy}>{filtered ? "Try another role, stage, or search." : "When candidates apply, each one is scored against that role’s experience range and requirement lines. The closest matches for the openings are marked Suggested."}</p>
        </article>
      ) : (
      <div className={styles.tableWrap}>
        <table>
          <thead>
            <tr><th>Candidate</th><th>Role</th><th>Match</th><th>Stage</th><th>Interview</th><th>Received</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row.id)}>
                <td><strong>{String(row.fullName || "")}</strong><br /><span className={styles.muted}>{String(row.email || "")}</span></td>
                <td>{String(row.jobTitle || "")}<br /><span className={styles.muted}>{String(row.jobReference || "")}{Number(row.openings) > 0 ? ` · ${row.openings} opening${Number(row.openings) === 1 ? "" : "s"}` : ""}</span></td>
                <td>{row.screen && typeof row.screen === "object" ? <><strong>{(row.screen as { score?: number }).score}</strong><br /><span className={styles.muted}>{(row.screen as { band?: string }).band}{row.shortlist ? ` · Suggested ${row.shortlistPlace} of ${row.openings}` : ""}</span></> : "—"}</td>
                <td><span className={styles.pill} data-status={String(row.status)}>{String(row.status || "")}</span></td>
                <td>{Number(row.scoreAverage) > 0 ? Number(row.scoreAverage) : "—"}</td>
                <td>{new Date(String(row.createdAt)).toLocaleDateString()}</td>
                <td><Link className={styles.line} href={`/admin/recruitment/applications/${row.id}`}>Open</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </main>
  );
}
