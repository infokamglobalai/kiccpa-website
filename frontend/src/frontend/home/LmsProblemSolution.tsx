import styles from "./LmsProblemSolution.module.css";

const traditional = [
  "Same course content for every student, regardless of ability",
  "Student failure discovered at assessment time — too late to act",
  "Parents receive progress updates once a term, if at all",
  "Teachers spend 4–6 hours per week on manual admin tasks",
  "No data on which curriculum topics have systemic gaps",
  "Board reporting requires weeks of manual data compilation",
  "No Arabic-native interface for Gulf-region institutions",
];

const kiccpa = [
  "Unique AI-generated learning path for every individual student",
  "At-risk students flagged 4–6 weeks before failure — enabling intervention",
  "Parents receive a daily learning summary on their phone",
  "AI auto-grading and feedback saves 70% of teacher admin time",
  "Live topic-level mastery map per class — curriculum decisions in real time",
  "One-click board reports — generated in 4 seconds",
  "Full RTL Arabic interface with Arabic-language NLP engine",
];

export default function LmsProblemSolution() {
  return (
    <section className={`${styles.section} rv`} aria-labelledby="lms-problem-heading">
      <div className={styles.inner}>
        <p className={styles.kicker}>Intelligence, not just content</p>
        <h2 id="lms-problem-heading" className={styles.title}>
          The problem with traditional LMS
        </h2>
        <p className={styles.lead}>
          Your current LMS delivers content.{" "}
          <span className={styles.leadStrong}>It doesn&apos;t deliver outcomes.</span>
        </p>
        <p className={styles.lead}>
          Static courses. No early warnings. Reactive teachers. Parents in the dark.
          Boards reading data that&apos;s three months old.
        </p>
        <p className={styles.tagline}>
          That is not an LMS problem — it is an intelligence problem.
        </p>

        <div className={styles.grid}>
          <div className={`${styles.col} ${styles.colBad}`}>
            <div className={`${styles.colHead} ${styles.colHeadBad}`}>✗ Traditional LMS</div>
            <div className={`${styles.colTitle} ${styles.colTitleBad}`}>Limitations</div>
            <ul className={styles.list}>
              {traditional.map((line) => (
                <li key={line} className={styles.itemBad}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles.col} ${styles.colGood}`}>
            <div className={`${styles.colHead} ${styles.colHeadGood}`}>✓ KICCPA LMS</div>
            <div className={`${styles.colTitle} ${styles.colTitleGood}`}>Outcomes</div>
            <ul className={styles.list}>
              {kiccpa.map((line) => (
                <li key={line} className={styles.itemGood}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
