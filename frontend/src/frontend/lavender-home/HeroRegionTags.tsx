"use client";

import { FlagIndia, FlagKuwait, FlagUk } from "@/components/flags/FlagIcons";
import styles from "./LavenderHome.module.css";

const tags = [
  { key: "india", label: "India", flag: <FlagIndia /> },
  { key: "kuwait", label: "Kuwait", flag: <FlagKuwait /> },
  { key: "english", label: "English", flag: <FlagUk /> },
  { key: "arabic", label: "Arabic RTL", flag: <span className={styles.heroMetaArabic} aria-hidden>ع</span> },
] as const;

export default function HeroRegionTags() {
  return (
    <div className={styles.heroMetaTags} aria-label="Regions and platform highlights">
      {tags.map((tag) => (
        <span key={tag.key} className={styles.heroMetaPill}>
          <span className={styles.heroMetaFlag}>{tag.flag}</span>
          {tag.label}
        </span>
      ))}
    </div>
  );
}
