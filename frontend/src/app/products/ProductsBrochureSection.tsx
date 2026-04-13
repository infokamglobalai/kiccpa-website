import styles from "./ProductsBrochureSection.module.css";

/** Add your PDF at `public/brochures/kiccpa-lms-packages.pdf` — same URL for view & download. */
export const LMS_PACKAGES_BROCHURE_HREF = "/brochures/kiccpa-lms-packages.pdf";

export default function ProductsBrochureSection() {
  const href = LMS_PACKAGES_BROCHURE_HREF;

  return (
    <div className={`${styles.wrap} rv`} id="brochure">
      <div className={styles.card}>
        <div className={styles.visual} aria-hidden>
          <div className={styles.doc}>
            <span className={styles.docCorner} />
            <div className={styles.docBody}>
              <span className={styles.docLine} />
              <span className={styles.docLine} />
              <span className={styles.docLine} />
              <span className={styles.docLine} />
            </div>
            <span className={styles.docBadge}>PDF</span>
          </div>
        </div>

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Download</p>
          <h3 className={styles.title}>
            Package <em>brochure</em>
          </h3>
          <p className={styles.desc}>
            A concise overview of LMS tiers, capabilities, and how we scope rollout — ideal to share with leadership,
            finance, and IT before a discovery call.
          </p>
          <div className={styles.actions}>
            <a
              className={styles.btnView}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                />
              </svg>
              View brochure
            </a>
            <a
              className={styles.btnDownload}
              href={href}
              download="KICCPA-LMS-packages-brochure.pdf"
            >
              <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                <path
                  fill="currentColor"
                  d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"
                />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
