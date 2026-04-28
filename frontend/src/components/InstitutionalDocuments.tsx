"use client";

import { useEffect, useState } from "react";
import { FileText, ExternalLink, Download } from "lucide-react";
import { motion } from "framer-motion";

type Resource = {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  category: string;
  createdAt: string;
};

export default function InstitutionalDocuments() {
  const [docs, setDocs] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/resources`);
        const data = await res.json();
        // Filter for Institutional Documents
        const institutional = Array.isArray(data) 
          ? data.filter((r: any) => r.category === "Institutional Document")
          : [];
        setDocs(institutional);
      } catch (err) {
        console.error("Failed to fetch documents", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  if (!loading && docs.length === 0) return null;

  return (
    <section className="docs-section rv">
      <div className="sec-eyebrow" style={{ justifyContent: "center" }}>Institutional Hub</div>
      <h2 style={{ textAlign: "center", marginBottom: "48px" }}>Resources & <em>Governance</em></h2>

      <div className="docs-grid">
        {loading ? (
          <p style={{ textAlign: "center", gridColumn: "1/-1", opacity: 0.5 }}>Loading documents...</p>
        ) : (
          docs.map((doc, i) => (
            <motion.div 
              key={doc._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="doc-card"
            >
              <div className="doc-icon">
                <FileText size={32} />
              </div>
              <div className="doc-info">
                <h3>{doc.title}</h3>
                <p>{doc.description || "Official institutional document."}</p>
                <div className="doc-meta">
                  {new Date(doc.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
              </div>
              <div className="doc-actions">
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="doc-view-btn">
                  View PDF <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <style jsx>{`
        .docs-section {
          padding: 80px 5%;
          background: #f8fafc;
        }
        .docs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .doc-card {
          background: #fff;
          padding: 32px;
          border-radius: 24px;
          border: 1px solid rgba(27, 67, 112, 0.08);
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: all 0.3s ease;
        }
        .doc-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(27, 67, 112, 0.08);
          border-color: var(--P);
        }
        .doc-icon {
          width: 64px;
          height: 64px;
          background: rgba(27, 67, 112, 0.05);
          color: var(--P);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .doc-info h3 {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 8px;
          color: var(--P);
        }
        .doc-info p {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.5;
        }
        .doc-meta {
          margin-top: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--OR);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .doc-actions {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }
        .doc-view-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: var(--P);
          color: #fff;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .doc-view-btn:hover {
          background: #1e293b;
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}
