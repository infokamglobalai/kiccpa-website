"use client";

import Link from "next/link";
import { Briefcase, GraduationCap, Sparkles, Users } from "lucide-react";
import { SERVICE_GROUPS } from "./navMenuConfig";
import styles from "./Navbar.module.css";

const serviceIcons: Record<string, typeof Briefcase> = {
  "Custom software": Briefcase,
  "CRM solutions": Users,
  "LMS platforms": GraduationCap,
  "AI solutions": Sparkles,
};

type ServicesDropdownProps = {
  onNavigate: () => void;
};

export default function ServicesDropdown({ onNavigate }: ServicesDropdownProps) {
  return (
    <div id="nav-menu-services" className={`${styles.dropdown} ${styles.simpleDrop}`} role="menu">
      {SERVICE_GROUPS.map((group, groupIndex) => (
        <div key={group.id}>
          {groupIndex > 0 && <hr className={styles.simpleDropRule} />}
          {group.items.map((item) => {
            const Icon = serviceIcons[item.label] ?? Sparkles;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={styles.refDropCell}
                role="menuitem"
                onClick={onNavigate}
              >
                <span className={styles.refDropIconBox} aria-hidden>
                  <Icon size={18} strokeWidth={2} />
                </span>
                <span className={styles.refDropLabel}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
