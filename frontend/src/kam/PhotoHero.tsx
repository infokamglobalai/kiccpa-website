import type { ReactNode } from "react";
import styles from "./kam.module.css";

export default function PhotoHero({ eyebrow, title, description, image, alt, children }: {
  eyebrow: string; title: string; description: string; image: string; alt: string; children?: ReactNode;
}) {
  return <section className={`${styles.imageHero} ${styles.photoHero}`} aria-label={eyebrow}>
    <figure className={styles.bannerPhoto}><img src={image} alt={alt} fetchPriority="high" decoding="async" /></figure>
    <div className={styles.wrap}><div className={styles.photoHeroCopy}>
      <p className={styles.photoHeroEyebrow}>{eyebrow}</p><h1>{title}</h1><p className={styles.photoHeroDescription}>{description}</p>{children}
    </div></div>
  </section>;
}
