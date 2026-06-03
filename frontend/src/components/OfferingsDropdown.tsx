"use client";

import Link from "next/link";
import { OFFERING_DROPDOWN_GRID } from "./navMenuConfig";
import styles from "./Navbar.module.css";

type OfferingsDropdownProps = {
  onNavigate: () => void;
};

export default function OfferingsDropdown({ onNavigate }: OfferingsDropdownProps) {
  return (
    <div id="nav-menu-offerings" className={`${styles.dropdown} ${styles.refDrop}`} role="menu">
      <div className={styles.refDropGrid}>
        {OFFERING_DROPDOWN_GRID.map((item) => {
          const Icon = item.icon;
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
    </div>
  );
}
