import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { listStaff, teamActivity } from "@/lib/recruitment-actions";
import StaffForm from "./StaffForm";
import styles from "../desk.module.css";

type Person = { id: string; name: string; email: string; role: string; active: boolean; lastSeen?: string; protected?: boolean };

export default async function Page() {
  const session = await getServerSession(authOptions);
  const canManage = session?.user?.role === "superadmin";
  let people: Person[] = [];
  let activity: Array<{ _id: string; actor: string; action: string; detail: string; at: string }> = [];
  let error = "";
  try {
    const data = await listStaff();
    people = data.staff.map((person) => ({
      id: String(person["_id"] || person.id),
      name: String(person.name),
      email: String(person.email),
      role: String(person.role),
      active: Boolean(person.active),
      lastSeen: person.lastSeen ? String(person.lastSeen) : "",
    }));
    const ownerEmail = session?.user?.email || "";
    if (ownerEmail && !people.some((person) => person.email === ownerEmail)) {
      people.unshift({
        id: "protected-owner",
        name: session?.user?.name || "Super admin",
        email: ownerEmail,
        role: "superadmin",
        active: true,
        protected: true,
      });
    }
    activity = (await teamActivity()).activity;
  } catch (err) {
    error = err instanceof Error ? err.message : "Could not load the team.";
  }
  return (
    <main>
      <header className={styles.head}>
        <div>
          <p className={styles.kicker}>Access</p>
          <h1>People</h1>
          <p className={styles.lead}>Super admin creates accounts, blocks access, and emails a password reset link. Admin can see the team and the timeline of applications opened, moved, and sent to interview.</p>
        </div>
      </header>
      <div className={styles.matrix}>
        <article className={styles.card}><p><strong>Jobs and applications</strong></p><p className={styles.muted}>Super admin, admin, and HR</p></article>
        <article className={styles.card}><p><strong>Articles and social drafts</strong></p><p className={styles.muted}>Super admin, admin, SEO, and marketing</p></article>
        <article className={styles.card}><p><strong>Interviews</strong></p><p className={styles.muted}>HR assigns a department manager. The manager is emailed and sees it on the application. HR or that manager then sends an online link or records an in-person meeting.</p></article>
        <article className={styles.card}><p><strong>Accounts</strong></p><p className={styles.muted}>Super admin blocks, unblocks, and sends reset links</p></article>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <StaffForm people={people} canManage={canManage} />
      <h2>Team timeline</h2>
      <p className={styles.lead}>Sign-ins, opened applications, stage changes, and interview invites.</p>
      {activity.length === 0 && <p className={styles.muted}>Nothing recorded yet. The timeline fills when someone opens an application or moves it.</p>}
      {activity.slice(0, 30).map((item) => (
        <article key={item._id} className={styles.card}>
          <strong>{item.detail}</strong>
          <p className={styles.muted}>{item.actor} · {item.action} · {new Date(item.at).toLocaleString()}</p>
        </article>
      ))}
    </main>
  );
}
