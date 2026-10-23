import Link from "next/link";
import { productCatalog, productsPage } from "./product-content";
import Reveal from "./Reveal";
import styles from "./kam.module.css";

export default function ProductsView() {
  const page = productsPage;

  return (
    <main className={styles.pd}>
      <section className={styles.pdHero} aria-label="Products">
        <div className={styles.wrap}>
          <p className={styles.pdEyebrow}>{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.lede}</p>
          <div className={styles.pdJumps}>
            {productCatalog.map((product) => (
              <a key={product.id} href={`#${product.id}`}>{product.name}</a>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.pdSection} aria-label="Choose a product">
        <div className={`${styles.wrap} ${styles.pdWho}`}>
          {productCatalog.map((product) => (
            <Reveal key={product.id} className={styles.pdStretch}>
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
              <figure className={styles.pdMedia}>
                <img src={product.image} alt={product.alt} />
              </figure>
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
                <Link className={styles.hpBtnGhost} href="/business-enquiry?service=Product+Demo">Book a Demo</Link>
                <Link className={styles.hpBtnLine} href="/contact">Talk to KICCPA</Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className={styles.pdClose}>
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
