"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./recruitment/desk.module.css";

export default function DeskLink({
  href,
  children,
  match = "prefix",
}: {
  href: string;
  children: React.ReactNode;
  match?: "exact" | "prefix" | "jobs";
}) {
  const path = usePathname();
  const active =
    match === "exact"
      ? path === href
      : match === "jobs"
        ? path.startsWith("/admin/recruitment/jobs") && !path.startsWith("/admin/recruitment/jobs/new")
        : path === href || path.startsWith(`${href}/`);
  return (
    <Link href={href} className={active ? styles.active : undefined} aria-current={active ? "page" : undefined}>
      {children}
    </Link>
  );
}
