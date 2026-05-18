"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import SubPageHero from "@/components/SubPageHero/SubPageHero";
import { MotionReveal } from "@/components/ui";
import {
  FileText,
  Download,
  Search,
  ExternalLink,
  Image as ImageIcon,
  File,
  Play,
  X,
  Video as VideoIcon,
  LayoutGrid,
  ClipboardList,
  QrCode,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ResourcesPage.module.css";
import SchoolSurveyForm from "./SchoolSurveyForm";
import ResourcesShareQr from "./ResourcesShareQr";
import { STATIC_DOCUMENT_RESOURCES, STATIC_VIDEO_RESOURCES } from "./staticCatalog";
import { extractYoutubeId, youtubeThumb } from "@/lib/youtube";

type Resource = {
  _id: string;
  title: string;
  description?: string;
  category: string;
  fileUrl: string;
  thumbnailUrl?: string;
  fileType: string;
  date: string;
};

function resolveAssetUrl(api: string, url: string) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return encodeURI(`${api}${url}`);
}

function isVideoResource(r: Resource): boolean {
  if (r.category === "Video") return true;
  return extractYoutubeId(r.fileUrl) !== null;
}

function isPlayableVideoFile(url: string): boolean {
  if (url.startsWith("/api/s3-video/")) return true;
  const path = url.split("?")[0]?.toLowerCase() ?? "";
  return /\.(mp4|webm|ogg)$/i.test(path);
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  /** Same-origin empty base: Next.js rewrites `/api` + `/uploads` to Express (see next.config.ts). */
  const assetBase = "";

  const categories = ["All", "Brochure", "Product Guide", "Case Study", "Whitepaper", "Technical Document"];

  useEffect(() => {
    let cancelled = false;
    async function fetchResources() {
      try {
        const res = await fetch("/api/resources", { cache: "no-store" });
        if (!res.ok) throw new Error(`Resources HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setResources(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
        if (!cancelled) setResources([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchResources();
    return () => {
      cancelled = true;
    };
  }, []);

  const allResources = useMemo(() => {
    const staticItems: Resource[] = [
      ...STATIC_DOCUMENT_RESOURCES.map((s) => ({ ...s })),
      ...STATIC_VIDEO_RESOURCES.map((s) => ({ ...s })),
    ];
    return [...staticItems, ...resources];
  }, [resources]);

  const matchesSearch = useCallback((r: Resource) => {
    const q = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      (r.description?.toLowerCase().includes(q) ?? false)
    );
  }, [searchQuery]);

  const videoResources = useMemo(() => {
    return allResources.filter(isVideoResource).filter(matchesSearch);
  }, [allResources, matchesSearch]);

  const documentResources = useMemo(() => {
    return allResources.filter((r) => !isVideoResource(r)).filter((r) => {
      const catOk = activeCategory === "All" || r.category === activeCategory;
      return catOk && matchesSearch(r);
    });
  }, [allResources, matchesSearch, activeCategory]);

  const activeVideoModal = useMemo(() => {
    const v = videoResources.find((x) => x._id === activeVideoId);
    if (!v) return null;
    const yid = extractYoutubeId(v.fileUrl);
    if (yid) return { kind: "youtube" as const, id: yid, title: v.title };
    if (isPlayableVideoFile(v.fileUrl)) {
      return {
        kind: "file" as const,
        src: resolveAssetUrl(assetBase, v.fileUrl),
        title: v.title,
      };
    }
    return null;
  }, [activeVideoId, videoResources, assetBase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideoId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <SubPageHero
        variant="products"
        eyebrow="Knowledge Hub"
        title={
          <>
            Digital <em>Resource Center</em>
          </>
        }
      >
        Brochures, guides, and video walkthroughs — plus a short survey to request a tailored LMS, SMS, or HRMS demo for
        your school.
      </SubPageHero>

      <nav className={styles.jumpNav} aria-label="Page sections">
        <a href="#documents" className={styles.jumpLink}>
          <LayoutGrid size={18} aria-hidden />
          Documents
        </a>
        <a href="#videos" className={styles.jumpLink}>
          <VideoIcon size={18} aria-hidden />
          Videos
        </a>
        <a href="#survey" className={styles.jumpLink}>
          <ClipboardList size={18} aria-hidden />
          Survey &amp; demo
        </a>
        <a href="#share" className={styles.jumpLink}>
          <QrCode size={18} aria-hidden />
          QR share
        </a>
      </nav>

      <ResourcesShareQr />

      <section id="documents" className={styles.mainSection}>
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>
                Brochures &amp; <em>documents</em>
              </h2>
              <p className={styles.sectionLead}>
                Download product brochures, guides, and technical PDFs. Curated files are listed in{" "}
                <code style={{ fontSize: "0.85em" }}>src/app/resources/staticCatalog.ts</code>; CMS entries load from Admin.
              </p>
            </div>
          </MotionReveal>

          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <Search size={20} className={styles.searchIcon} aria-hidden />
              <input
                type="search"
                placeholder="Search documents and videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search resources"
              />
            </div>
            <div className={styles.categories}>
              {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`${styles.catBtn} ${activeCategory === cat ? styles.active : ""}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
            </div>
          </div>

          {loading && documentResources.length === 0 ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>Loading resources…</p>
            </div>
          ) : documentResources.length > 0 ? (
            <div className={styles.grid}>
              {documentResources.map((res, i) => (
                <MotionReveal key={res._id} variant="soft" y={20} delay={i * 0.04}>
                  <article className={styles.card}>
                    <div className={styles.cardVisual}>
                      {res.thumbnailUrl ? (
                        <img
                          src={resolveAssetUrl(assetBase, res.thumbnailUrl)}
                          alt=""
                          className={styles.thumb}
                        />
                      ) : (
                        <div className={styles.placeholderIcon}>
                          {res.fileType.toLowerCase() === "pdf" ? (
                            <FileText size={48} aria-hidden />
                          ) : ["png", "jpg", "jpeg"].includes(res.fileType.toLowerCase()) ? (
                            <ImageIcon size={48} aria-hidden />
                          ) : (
                            <File size={48} aria-hidden />
                          )}
                        </div>
                      )}
                      <div className={styles.categoryTag}>{res.category}</div>
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardMeta}>
                        <span>{new Date(res.date).toLocaleDateString()}</span>
                        <span className={styles.dot} />
                        <span>{res.fileType.toUpperCase()}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{res.title}</h3>
                      <p className={styles.cardDesc}>{res.description}</p>
                      <div className={styles.cardFooter}>
                        <a
                          href={resolveAssetUrl(assetBase, res.fileUrl)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.downloadBtn}
                        >
                          <Download size={18} aria-hidden />
                          Download
                        </a>
                        <a
                          href={resolveAssetUrl(assetBase, res.fileUrl)}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.viewBtn}
                          title="Open in new tab"
                        >
                          <ExternalLink size={18} aria-hidden />
                        </a>
                      </div>
                    </div>
                  </article>
                </MotionReveal>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <FileText size={64} opacity={0.2} aria-hidden />
              <h3>No documents match</h3>
              <p>Try another category or search term — or add PDFs from the admin Resources tab.</p>
            </div>
          )}
        </div>
      </section>

      <section id="videos" className={styles.videoSection}>
        <div className={styles.container}>
          <MotionReveal variant="soft" y={16}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>
                Video <em>library</em>
              </h2>
              <p className={styles.sectionLead}>
                Short demos and explainers. Add entries in CMS with category <strong>Video</strong> and paste a YouTube
                URL as the file link — or any URL that embeds on YouTube.
              </p>
            </div>
          </MotionReveal>

          {loading && videoResources.length === 0 ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>Loading…</p>
            </div>
          ) : videoResources.length > 0 ? (
            <div className={styles.videoGrid}>
              {videoResources.map((res, i) => {
                const yid = extractYoutubeId(res.fileUrl);
                const filePlayable = isPlayableVideoFile(res.fileUrl);
                const canWatch = Boolean(yid || filePlayable);
                const thumb = yid
                  ? youtubeThumb(yid)
                  : res.thumbnailUrl
                    ? resolveAssetUrl(assetBase, res.thumbnailUrl)
                    : null;
                return (
                  <MotionReveal key={res._id} variant="soft" y={24} delay={i * 0.06}>
                    <article className={styles.videoCard}>
                      <button
                        type="button"
                        className={styles.videoThumbBtn}
                        onClick={() => canWatch && setActiveVideoId(res._id)}
                        disabled={!canWatch}
                        aria-label={canWatch ? `Play video: ${res.title}` : `Video link: ${res.title}`}
                      >
                        {thumb ? (
                          <img src={thumb} alt="" className={styles.videoThumbImg} />
                        ) : (
                          <div className={styles.videoThumbFallback}>
                            <VideoIcon size={40} strokeWidth={1.25} aria-hidden />
                          </div>
                        )}
                        <span className={styles.videoPlayBadge}>
                          <Play size={22} fill="currentColor" aria-hidden />
                        </span>
                      </button>
                      <div className={styles.videoCardBody}>
                        <span className={styles.videoMeta}>
                          {new Date(res.date).toLocaleDateString()} ·{" "}
                          {yid ? "YouTube" : filePlayable ? "Video file" : res.fileType.toUpperCase()}
                        </span>
                        <h3 className={styles.videoCardTitle}>{res.title}</h3>
                        <p className={styles.videoCardDesc}>{res.description || " "}</p>
                        <div className={styles.videoActions}>
                          {canWatch ? (
                            <button type="button" className={styles.watchBtn} onClick={() => setActiveVideoId(res._id)}>
                              Watch
                            </button>
                          ) : null}
                          {yid ? (
                            <a
                              href={`https://www.youtube.com/watch?v=${yid}`}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.videoLinkBtn}
                            >
                              Open on YouTube
                            </a>
                          ) : filePlayable ? null : (
                            <a
                              href={resolveAssetUrl(assetBase, res.fileUrl)}
                              target="_blank"
                              rel="noreferrer"
                              className={styles.videoLinkBtn}
                            >
                              Open link
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </MotionReveal>
                );
              })}
            </div>
          ) : (
            <div className={styles.videoEmpty}>
              <VideoIcon size={48} strokeWidth={1.25} className={styles.videoEmptyIcon} aria-hidden />
              <p>
                No videos yet. In <strong>Admin → Resources</strong>, add a resource with category <strong>Video</strong>{" "}
                and paste your YouTube URL into the file field.
              </p>
            </div>
          )}
        </div>
      </section>

      <SchoolSurveyForm />

      <AnimatePresence>
        {activeVideoModal && (
          <motion.div
            className={styles.modalBackdrop}
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              className={styles.modalPanel}
              initial={false}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHead}>
                <h3 className={styles.modalTitle}>{activeVideoModal.title}</h3>
                <button type="button" className={styles.modalClose} onClick={() => setActiveVideoId(null)} aria-label="Close">
                  <X size={22} />
                </button>
              </div>
              <div className={styles.modalFrameWrap}>
                {activeVideoModal.kind === "youtube" ? (
                  <iframe
                    title={activeVideoModal.title}
                    src={`https://www.youtube-nocookie.com/embed/${activeVideoModal.id}?autoplay=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.modalFrame}
                  />
                ) : (
                  <video
                    className={styles.modalFrame}
                    src={activeVideoModal.src}
                    controls
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    autoPlay
                    playsInline
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
