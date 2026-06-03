"use client";

import styles from "./TopBar.module.css";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function TopBar() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.announcement}>
            <Sparkles size={12} className={styles.sparkle} />
            <span>KICCPA Enterprise solutions — Now live in GCC &amp; India</span>
          </div>
        </div>
        <div className={styles.right}>
          <nav className={styles.utilityNav} aria-label="Utility">
            <Link href="/resources">Resources</Link>
            <Link href="/resources">Blog</Link>
            <Link href="/contact">Careers</Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
