import Link from "next/link";
import { productCatalog, productsPage } from "./product-content";
import Reveal from "./Reveal";
import PhotoHero from "./PhotoHero";
import styles from "./kam.module.css";

export default function ProductsView() {
  const page = productsPage;

  return (
    <main className={styles.pd}>
      <PhotoHero eyebrow={page.eyebrow} title={page.title} description={page.lede} image="/assets/photography/learning.jpg" alt="Teacher guiding students in a classroom">
        <div className={styles.pdJumps}>{productCatalog.map(product => <a key={product.id} href={`#${product.id}`}>{product.name}</a>)}</div>
      </PhotoHero>

      <section className={styles.pdSection} aria-label="Choose a product">
        <div className={`${styles.wrap} ${styles.pdWho}`}>
          {productCatalog.map((product, index) => (
            <Reveal key={product.id} index={index} variant="rise" className={styles.pdStretch}>
              <a href={`#${product.id}`}>
                <span>{product.audience}</span>
                <strong>{product.name}</strong>
                <em>{product.line}</em>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {productCatalog.map((product, index) => (
        <section key={product.id} id={product.id} className={`${styles.pdSection} ${index % 2 === 1 ? styles.pdLight : ""}`}>
          <div className={`${styles.wrap} ${styles.pdRow} ${index % 2 === 1 ? styles.pdAlt : ""}`}>
            <Reveal>
              {product.image ? (
                <figure className={styles.pdMedia}>
                  <img src={product.image} alt={product.alt} loading="lazy" decoding="async" />
                  {product.id === "platform" && <figcaption className={styles.platformCaption}>Learning platform illustration</figcaption>}
                </figure>
              ) : (
                <div className={styles.pdMark} aria-hidden="true">
                  <span>Platform</span>
                  <strong>kam.eduaitutors.com</strong>
                </div>
              )}
            </Reveal>
            <Reveal>
              <p className={styles.pdEyebrow}>{product.audience}</p>
              <h2>{product.name}</h2>
              <p className={styles.pdLine}>{product.line}</p>
              <p>{product.summary}</p>
              <ul>
                {product.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <div className={styles.rowBtns}>
                <a className={styles.hpBtn} href={product.href} target="_blank" rel="noreferrer">{product.cta} <span className={styles.arrow}>→</span></a>
                <Link className={styles.hpBtnLine} href="/contact">Talk to KICCPA</Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className={`${styles.pdClose} ${styles.imageClose}`}>
        <figure className={styles.bannerPhoto}><img src="/assets/photography/study.jpg" alt="An online lesson on a desktop screen beside study notes" loading="lazy" /></figure>
        <div className={styles.wrap}>
          <h2>Not sure which one to open?</h2>
          <p>Schools start with LearnX. Students and parents start with EduAiTutors. If you already have a class, use the learning address.</p>
          <div className={styles.rowBtns}>
            <a className={styles.hpBtn} href="https://learnx.school" target="_blank" rel="noreferrer">Open LearnX <span className={styles.arrow}>→</span></a>
            <a className={styles.hpBtnGhost} href="https://eduaitutors.com" target="_blank" rel="noreferrer">Open EduAiTutors</a>
          </div>
        </div>
      </section>
    </main>
  );
}
