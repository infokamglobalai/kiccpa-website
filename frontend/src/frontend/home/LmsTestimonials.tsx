import styles from "./LmsTestimonials.module.css";

const items = [
  {
    quote:
      "We identified three at-risk students in Week 2 of the pilot — students whose teachers had no idea were struggling. By Week 4, all three were back on track. That is what early intervention looks like.",
    initials: "SA",
    name: "School Administrator",
    role: "Private School · Kuwait City, Kuwait",
  },
  {
    quote:
      "The parent portal adoption rate reached 79% in our first term. Parents who used to call us twice a week asking for updates now message teachers directly through the platform. Our admin load dropped noticeably.",
    initials: "AC",
    name: "Academic Coordinator",
    role: "International School · Mumbai, India",
  },
  {
    quote:
      "I used to spend Sunday evenings preparing the weekly class report. Now I click one button and it's done in 4 seconds. I use that time to actually review the data and plan the following week properly.",
    initials: "MT",
    name: "Mathematics Teacher",
    role: "CBSE School · Bengaluru, India",
  },
];

export default function LmsTestimonials() {
  return (
    <section className={`${styles.section} rv`} aria-labelledby="lms-testimonials-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>What schools are saying</p>
          <h2 id="lms-testimonials-heading" className={styles.title}>
            Results from real schools
          </h2>
          <p className={styles.sub}>Pilot feedback from administrators, coordinators, and teachers.</p>
        </header>

        <div className={styles.grid}>
          {items.map((t) => (
            <article key={t.initials} className={styles.card}>
              <span className={styles.quoteMark} aria-hidden>
                &ldquo;
              </span>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.body}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.divider} />
              <div className={styles.footer}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <div className={styles.metaName}>{t.name}</div>
                  <div className={styles.metaRole}>{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
