"use client";

import { useState, useEffect } from "react";
import SubPageHero from "@/components/SubPageHero/SubPageHero";
import { MotionReveal } from "@/components/ui";
import { FileText, Download, Search, Filter, ExternalLink, Image as ImageIcon, File } from "lucide-react";
import styles from "./ResourcesPage.module.css";

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

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const categories = ["All", "Brochure", "Product Guide", "Case Study", "Whitepaper", "Technical Document"];

  useEffect(() => {
    async function fetchResources() {
      try {
        const res = await fetch(`${API}/api/resources`);
        const data = await res.json();
        setResources(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, [API]);

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (r.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === "All" || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
        Access our complete library of product brochures, technical specifications, 
        and case studies to see how KICCPA is transforming industries.
      </SubPageHero>

      <section className={styles.mainSection}>
        <div className={styles.container}>
          {/* Controls */}
          <div className={styles.controls}>
            <div className={styles.searchBox}>
              <Search size={20} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search documents..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles.categories}>
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`${styles.catBtn} ${activeCategory === cat ? styles.active : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <p>Loading Resources...</p>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className={styles.grid}>
              {filteredResources.map((res, i) => (
                <MotionReveal key={res._id} variant="soft" y={20} delay={i * 0.05}>
                  <div className={styles.card}>
                    <div className={styles.cardVisual}>
                      {res.thumbnailUrl ? (
                        <img src={`${API}${res.thumbnailUrl}`} alt={res.title} className={styles.thumb} />
                      ) : (
                        <div className={styles.placeholderIcon}>
                          {res.fileType.toLowerCase() === 'pdf' ? <FileText size={48} /> : 
                           ['png', 'jpg', 'jpeg'].includes(res.fileType.toLowerCase()) ? <ImageIcon size={48} /> : 
                           <File size={48} />}
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
                          href={`${API}${res.fileUrl}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className={styles.downloadBtn}
                        >
                          <Download size={18} />
                          Download
                        </a>
                        <a 
                          href={`${API}${res.fileUrl}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className={styles.viewBtn}
                          title="View Online"
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <FileText size={64} opacity={0.2} />
              <h3>No documents found</h3>
              <p>Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
