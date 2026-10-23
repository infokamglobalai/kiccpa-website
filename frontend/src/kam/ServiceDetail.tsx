import Link from "next/link";
import { notFound } from "next/navigation";
import DivisionView from "./DivisionView";
import { clientPath, homeSteps, seekerPath, serviceBySlug } from "./home-content";
import styles from "./kam.module.css";

export default function ServiceDetail({ slug }: { slug: string }) {
  const found = serviceBySlug(slug);
  if (!found) notFound();
  const { division, item } = found;

  if (!item) {
    return <DivisionView division={division} slug={slug} />;
  }

  const shared = division.items.filter((entry) => entry.href.endsWith(`/${slug}`));
  const title = shared.length > 1 ? "Healthcare recruitment" : item?.title || division.title;
  const text = shared.length > 1
    ? "Nursing and medical recruitment enquiries are reviewed by the team. This page is not a vacancy list, and no placement is promised."
    : item?.summary || division.intro;
  const image = item?.image || division.image;
  const alt = item?.alt || division.alt;
  const related = division.items.filter((entry) => entry.title !== title && !(shared.length > 1 && entry.href.endsWith(`/${slug}`)));

  return (
    <main className={styles.sv}>
      <section className={styles.svHero}>
        <div className={styles.svHeroGrid}>
          <div className={styles.svHeroCopy}>
            <nav className={styles.svCrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              {item ? <Link href={division.href}>{division.title}</Link> : <span aria-current="page">{division.title}</span>}
              {item ? <><span>/</span><span aria-current="page">{title}</span></> : null}
            </nav>
            <p className={styles.svEyebrow}>{division.title}</p>
            <h1>{title}</h1>
            <p>{text}</p>
            <div className={styles.rowBtns}>
              <Link className={styles.hpBtn} href={clientPath(division, item?.title || division.items[0]?.title)}>{division.clientLabel} <span className={styles.arrow}>→</span></Link>
              <Link className={styles.hpBtnGhost} href={seekerPath(division, shared.length > 1 ? undefined : item?.title)}>{division.seekerLabel}</Link>
            </div>
          </div>
          <figure className={styles.svHeroMedia}>
            <img src={image} alt={alt} />
          </figure>
        </div>
      </section>

      <section className={styles.svSection}>
        <div className={`${styles.wrap} ${styles.svSplit}`}>
          <div>
            <p className={styles.svEyebrow}>{division.itemsLabel}</p>
            <h2>{item ? "In this division" : division.line}</h2>
            <p>{division.intro}</p>
          </div>
          <ul className={styles.svList}>
            {(item ? related : division.items).map((entry) => (
              <li key={entry.href + entry.title}>
                <Link href={entry.href}>
                  {entry.image ? <img src={entry.image} alt="" /> : null}
                  <span>
                    <strong>{entry.title}</strong>
                    <p>{entry.summary}</p>
                  </span>
                  <span className={styles.arrow}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.svSection} ${styles.svLight}`}>
        <div className={styles.wrap}>
          <h2>From the requirement to a conversation.</h2>
          <ol className={styles.svSteps}>
            {homeSteps.map((step) => (
              <li key={step.n}><span>{step.n}</span><strong>{step.title}</strong><p>{step.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.svClose}>
        <div className={styles.svCloseMedia} aria-hidden="true">
          <img src={image} alt="" />
        </div>
        <div className={styles.wrap}>
          <div className={styles.svCloseInner}>
            <div>
              <h2>Talk about {title}.</h2>
              <p>An enquiry is reviewed by the team. It is not a quote, a vacancy, or a guaranteed outcome.</p>
            </div>
            <div className={styles.rowBtns}>
              <Link className={styles.hpBtn} href={clientPath(division, item?.title || division.items[0]?.title)}>{division.clientLabel} <span className={styles.arrow}>→</span></Link>
              <Link className={styles.hpBtnGhost} href={seekerPath(division, shared.length > 1 ? undefined : item?.title)}>{division.seekerLabel}</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
