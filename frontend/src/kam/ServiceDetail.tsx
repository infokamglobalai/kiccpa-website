import Link from "next/link";
import { notFound } from "next/navigation";
import { clientPath, homeSteps, seekerPath, serviceBySlug } from "./home-content";
import { serviceEditorial } from "./service-content";
import Reveal from "./Reveal";
import styles from "./kam.module.css";

export default function ServiceDetail({ slug }: { slug: string }) {
  const found = serviceBySlug(slug);
  if (!found) notFound();
  const { division, item } = found;
  const shared = division.items.filter((entry) => entry.href.endsWith(`/${slug}`));
  const title = shared.length > 1 ? "Healthcare recruitment" : item?.title || division.title;
  const editorial = serviceEditorial[slug];
  const text = editorial?.intro || (shared.length > 1
    ? "Nursing and medical recruitment enquiries are reviewed by the team. This page is not a vacancy list, and no placement is promised."
    : item?.summary || division.intro);
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


      {editorial && <>
        <section className={styles.svSection}>
          <div className={styles.wrap}>
            <Reveal className={styles.serviceIntro}><p className={styles.svEyebrow}>Built around your business</p><h2>{editorial.headline}</h2><p>Every engagement begins with your priorities. These capabilities provide a starting point for a scope shaped around your team, systems and working environment.</p></Reveal>
            <div className={styles.serviceCapabilities}>
              {editorial.capabilities.map((capability, index) => <Reveal key={capability.title} index={index}><article><span>0{index + 1}</span><h3>{capability.title}</h3><p>{capability.text}</p></article></Reveal>)}
            </div>
          </div>
        </section>
        <section className={`${styles.svSection} ${styles.servicePractice}`}>
          <div className={`${styles.wrap} ${styles.servicePracticeGrid}`}>
            <Reveal variant="wipe"><figure><img src={`/assets/photography/${editorial.photo}.jpg`} alt={alt} loading="lazy" /></figure></Reveal>
            <Reveal><p className={styles.svEyebrow}>Possibilities in practice</p><h2>A clearer picture of what comes next.</h2><p>{editorial.example}</p><small>An illustrative scenario to help shape your brief.</small><h3>Before we talk</h3><p>{editorial.prepare}</p><Link className={styles.hpBtn} href={clientPath(division, item?.title)}>Start a conversation <span className={styles.arrow}>→</span></Link></Reveal>
          </div>
        </section>
        <section className={styles.svSection}><div className={`${styles.wrap} ${styles.serviceFaq}`}><Reveal><p className={styles.svEyebrow}>A little more clarity</p><h2>Your questions, considered.</h2></Reveal><div>
          <details><summary>How do we get started?</summary><p>Share your requirements, current challenges and preferred timeline. The team can review the brief, clarify the work and discuss an appropriate engagement model.</p></details>
          <details><summary>Can the service fit our existing processes?</summary><p>Tell us which tools, workflows and internal standards must be retained. Integrations, responsibilities and changes are assessed during discovery and documented in the agreed scope.</p></details>
          <details><summary>{division.id === "hr" ? "Is this a page of current vacancies?" : "How are scope and pricing agreed?"}</summary><p>{division.id === "hr" ? "These pages describe recruitment sectors. For current openings and CV applications, visit Careers. Role availability, employer selection and destination requirements are confirmed for each opportunity." : "Scope, delivery milestones, responsibilities and commercial terms are discussed after the requirement has been reviewed. A website enquiry starts the conversation and does not create a delivery commitment."}</p>{division.id === "hr" && <Link href="/careers">Explore current roles →</Link>}</details>
        </div></div></section>
      </>}

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
              <p>Bring us your priorities. Together, we can define a practical next step.</p>
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
