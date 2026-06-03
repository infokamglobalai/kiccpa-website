"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./Navbar.module.css";

export type NavDropdownPanelProps = {
  id: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  footer?: { href: string; label: string };
  layout?: "default" | "wide" | "stakeholders";
  onNavigate?: () => void;
  children: ReactNode;
};

export function NavDropdownPanel({
  id,
  eyebrow,
  heading,
  description,
  footer,
  layout = "default",
  onNavigate,
  children,
}: NavDropdownPanelProps) {
  return (
    <div
      id={id}
      className={`${styles.dropdown} ${styles.navDrop} ${layout === "wide" ? styles.navDropWide : ""} ${layout === "stakeholders" ? styles.navDropStake : ""}`}
      role="menu"
      aria-label={heading}
    >
      <header className={styles.navDropHeader}>
        {eyebrow && <p className={styles.navDropEyebrow}>{eyebrow}</p>}
        <p className={styles.navDropHeading}>{heading}</p>
        {description && <p className={styles.navDropDesc}>{description}</p>}
      </header>
      <div className={styles.navDropBody}>{children}</div>
      {footer && (
        <footer className={styles.navDropFoot}>
          <Link href={footer.href} className={styles.navDropFootLink} role="menuitem" onClick={onNavigate}>
            {footer.label}
            <ArrowRight size={15} aria-hidden />
          </Link>
        </footer>
      )}
    </div>
  );
}
