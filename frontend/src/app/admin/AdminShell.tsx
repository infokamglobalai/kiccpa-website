import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";
import { ROLE_LABELS, canHire, canPublish } from "@/lib/roles";
import DeskLink from "./DeskNav";
import SignOutButton from "./SignOutButton";
import styles from "./recruitment/desk.module.css";

export default async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || "";
  const label = ROLE_LABELS[role] || role;
  const name = session?.user?.name || session?.user?.email || "KICCPA";
  const initial = name.trim().charAt(0).toUpperCase() || "K";
  return (
    <div className={styles.shell}>
      <aside className={styles.side}>
        <div className={styles.brand}>
          <Image src="/images/kiccpa-logo.png" alt="KICCPA — Where it meets AI" width={480} height={188} className={styles.logoImg} priority quality={100} />
        </div>
        <nav className={styles.nav}>
          {role === "manager" && (
            <div className={styles.navGroup}>
              <p className={styles.navLabel}>Interviews</p>
              <DeskLink href="/admin/recruitment/applications">Assigned to me</DeskLink>
            </div>
          )}
          {canHire(role) && (
            <div className={styles.navGroup}>
              <p className={styles.navLabel}>Hiring</p>
              <DeskLink href="/admin/recruitment" match="exact">Overview</DeskLink>
              <DeskLink href="/admin/recruitment/jobs" match="jobs">Roles</DeskLink>
              <DeskLink href="/admin/recruitment/jobs/new" match="exact">Post a role</DeskLink>
              <DeskLink href="/admin/recruitment/applications">Applications</DeskLink>
            </div>
          )}
          {canPublish(role) && (
            <div className={styles.navGroup}>
              <p className={styles.navLabel}>Website</p>
              <DeskLink href="/admin/studio" match="exact">Articles</DeskLink>
              <DeskLink href="/admin/studio/social">Social drafts</DeskLink>
              {(role === "superadmin" || role === "admin") && <DeskLink href="/admin/posts">Library CMS</DeskLink>}
            </div>
          )}
          {(role === "superadmin" || role === "admin") && (
            <div className={styles.navGroup}>
              <p className={styles.navLabel}>Access</p>
              <DeskLink href="/admin/recruitment/staff">People</DeskLink>
            </div>
          )}
          <div className={styles.navGroup}>
            <p className={styles.navLabel}>Account</p>
            <DeskLink href="/admin/settings" match="exact">Profile</DeskLink>
          </div>
          <div className={styles.navGroup}>
            <p className={styles.navLabel}>Public site</p>
            <DeskLink href="/careers" match="exact">Careers</DeskLink>
            <DeskLink href="/insights" match="exact">Insights</DeskLink>
          </div>
        </nav>
        <div className={styles.sideFoot}>
          <div className={styles.who}>
            <span className={styles.avatar}>{initial}</span>
            <div>
              <strong>{name}</strong>
              <span>{label}</span>
            </div>
          </div>
          <SignOutButton />
        </div>
      </aside>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
