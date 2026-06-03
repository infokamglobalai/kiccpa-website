"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Navbar.module.css";

type NavMenuLinkProps = {
  href: string;
  title: string;
  description?: string;
  onClick?: () => void;
  icon?: ReactNode;
};

export function NavMenuLink({ href, title, description, onClick, icon }: NavMenuLinkProps) {
  return (
    <Link href={href} className={styles.navMenuLink} role="menuitem" onClick={onClick}>
      {icon && <span className={styles.navMenuLinkIcon}>{icon}</span>}
      <span className={styles.navMenuLinkText}>
        <span className={styles.navMenuLinkTitle}>{title}</span>
        {description && <span className={styles.navMenuLinkDesc}>{description}</span>}
      </span>
    </Link>
  );
}
