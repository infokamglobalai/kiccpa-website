import Link from "next/link";
import styles from "./desk.module.css";

type Bar = { key: string; label: string; value: number; href: string; status: string };

function Bars({ rows }: { rows: Bar[] }) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <div className={styles.barList}>
      {rows.map((row) => (
        <Link key={row.key} href={row.href} className={styles.barRow}>
          <span className={styles.barLabel}>{row.label}</span>
          <span className={styles.track}>
            <span className={styles.fill} data-status={row.status} style={{ width: `${Math.round((row.value / max) * 100)}%` }} />
          </span>
          <span className={styles.barValue}>{row.value}</span>
        </Link>
      ))}
    </div>
  );
}

const stages = [
  ["submitted", "Submitted"],
  ["screening", "Screening"],
  ["interview", "Interview"],
  ["offer", "Offer"],
  ["hired", "Hired"],
  ["rejected", "Rejected"],
  ["on-hold", "On hold"],
] as const;

export default function HiringCharts({
  applications,
  total,
  roles,
}: {
  applications: Record<string, number>;
  total: number;
  roles: Array<{ id: string; title: string; applicants?: number }>;
}) {
  const hired = applications.hired || 0;
  const rejected = applications.rejected || 0;
  const progress = Math.max(0, total - hired - rejected);
  const pipeline = stages.map(([status, label]) => ({
    key: status,
    label,
    value: applications[status] || 0,
    href: `/admin/recruitment/applications?status=${status}`,
    status,
  }));
  const outcomes: Bar[] = [
    { key: "progress", label: "In progress", value: progress, href: "/admin/recruitment/applications", status: "progress" },
    { key: "hired", label: "Hired", value: hired, href: "/admin/recruitment/applications?status=hired", status: "hired" },
    { key: "rejected", label: "Rejected", value: rejected, href: "/admin/recruitment/applications?status=rejected", status: "rejected" },
  ];
  const byRole = [...roles]
    .sort((a, b) => (b.applicants || 0) - (a.applicants || 0))
    .slice(0, 8)
    .map((role) => ({
      key: role.id,
      label: role.title,
      value: role.applicants || 0,
      href: `/admin/recruitment/applications?job=${role.id}`,
      status: "progress",
    }));

  return (
    <div className={styles.charts}>
      <article className={styles.panel}>
        <div className={styles.chartHead}>
          <div>
            <h2>Pipeline</h2>
            <p className={styles.muted}>Every application, by the stage it is in now.</p>
          </div>
        </div>
        <Bars rows={pipeline} />
      </article>
      <article className={styles.panel}>
        <div className={styles.chartHead}>
          <div>
            <h2>Outcomes</h2>
            <p className={styles.muted}>Closed decisions against work still open.</p>
          </div>
        </div>
        <Bars rows={outcomes} />
      </article>
      <article className={`${styles.panel} ${styles.chartWide}`}>
        <div className={styles.chartHead}>
          <div>
            <h2>Applications by role</h2>
            <p className={styles.muted}>Which openings have candidates.</p>
          </div>
        </div>
        {byRole.length === 0 ? <p className={styles.muted}>No roles yet.</p> : <Bars rows={byRole} />}
      </article>
    </div>
  );
}
