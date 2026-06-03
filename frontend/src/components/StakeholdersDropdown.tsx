"use client";

import Link from "next/link";
import { Building2, TrendingUp, Users } from "lucide-react";
import { STAKEHOLDER_ITEMS } from "./navMenuConfig";
import styles from "./Navbar.module.css";

const icons = [Building2, Users, TrendingUp] as const;

type StakeholdersDropdownProps = {
  onNavigate: () => void;
};

export default function StakeholdersDropdown({ onNavigate }: StakeholdersDropdownProps) {
  return (
    <div id="nav-menu-stakeholders" className={`${styles.dropdown} ${styles.simpleDrop}`} role="menu">
      {STAKEHOLDER_ITEMS.map((item, i) => {
        const Icon = icons[i];
        return (
          <Link
            key={item.href}
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
  );
}
