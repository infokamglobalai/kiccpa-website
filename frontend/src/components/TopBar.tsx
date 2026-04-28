"use client";

import styles from "./TopBar.module.css";
import RegionLanguageSelector from "./RegionLanguageSelector";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function TopBar() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.announcement}>
            <Sparkles size={12} className={styles.sparkle} />
            <span>KICCPA Enterprise solutions — Now live in GCC & India</span>
          </div>
        </div>
        <div className={styles.right}>
          <RegionLanguageSelector />
          <div className={styles.divider} />
          <nav className={styles.utilityNav}>
            <Link href="/about">Heritage</Link>
            <Link href="/investors">Investors</Link>
            <Link href="/resources">Resource Center</Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
