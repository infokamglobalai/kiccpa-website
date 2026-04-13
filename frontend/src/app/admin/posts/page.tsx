"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type PostRecord = { _id: string; title: string; category?: string; slug?: string };
type TestimonialRecord = { _id: string; name: string; role?: string; company?: string };

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"posts" | "testimonials">("posts");
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const [postForm, setPostForm] = useState({
    title: "",
    slug: "",
    category: "AI Automation",
    author: "KICCPA Team",
    excerpt: "",
    content: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [testiForm, setTestiForm] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    image: "",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const pRes = await fetch(`${API}/api/posts`);
      const pData = await pRes.json();
      setPosts(Array.isArray(pData) ? pData : []);

      const tRes = await fetch(`${API}/api/testimonials`);
      const tData = await tRes.json();
      setTestimonials(Array.isArray(tData) ? tData : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [API]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      void fetchData();
    }, 0);
    return () => window.clearTimeout(t);
  }, [activeTab, fetchData]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'post' | 'testi', field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setStatus("Uploading...");

    try {
      const res = await fetch(`${API}/api/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        if (type === 'post') setPostForm({ ...postForm, [field]: data.url });
        else setTestiForm({ ...testiForm, image: data.url });
        setStatus("Upload successful!");
      }
    } catch {
      setStatus("Upload failed.");
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const res = await fetch(`${API}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postForm)
      });
      if (res.ok) {
        setStatus("Post published!");
        setPostForm({ title: "", slug: "", category: "AI Automation", author: "KICCPA Team", excerpt: "", content: "", imageUrl: "", videoUrl: "" });
        fetchData();
      }
    } catch {
      setStatus("Error.");
    }
  };

  const handleTestiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const res = await fetch(`${API}/api/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testiForm)
      });
      if (res.ok) {
        setStatus("Testimonial added!");
        setTestiForm({ name: "", role: "", company: "", content: "", image: "" });
        fetchData();
      }
    } catch {
      setStatus("Error.");
    }
  };

  const handleDelete = async (type: "posts" | "testimonials", id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`${API}/api/${type}/${id}`, { method: 'DELETE' });
      fetchData();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-page-wrap">
      <div className="admin-container">
        <header className="admin-header">
          <div className="ah-left">
            <h1>CMS <span>Dashboard</span></h1>
            <div className="admin-tabs">
              <button className={activeTab === 'posts' ? 'active' : ''} onClick={() => setActiveTab('posts')}>Posts</button>
              <button className={activeTab === 'testimonials' ? 'active' : ''} onClick={() => setActiveTab('testimonials')}>Testimonials</button>
            </div>
          </div>
          <Link href="/" className="admin-back-btn">← Back to Site</Link>
        </header>

        <div className="admin-grid">
          {/* Editor Section */}
          <section className="admin-card editor-card">
            <div className="ac-head">
              <h2>{activeTab === 'posts' ? 'New Article' : 'New Testimonial'}</h2>
              {status && <span className="status-tag">{status}</span>}
            </div>

            {activeTab === 'posts' ? (
              <form onSubmit={handlePostSubmit} className="admin-form">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" value={postForm.title} onChange={e => setPostForm({...postForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Slug</label>
                    <input type="text" value={postForm.slug} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select value={postForm.category} onChange={e => setPostForm({...postForm, category: e.target.value})}>
                      <option>AI Automation</option><option>EdTech Growth</option><option>Agile Dev</option><option>Company News</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Hero Image</label>
                    <div className="upload-box">
                      <input type="text" value={postForm.imageUrl} readOnly placeholder="Upload image..." />
                      <input type="file" id="img-up" hidden onChange={e => handleFileUpload(e, 'post', 'imageUrl')} />
                      <label htmlFor="img-up" className="up-btn">Upload</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Video (Up to 100MB)</label>
                    <div className="upload-box">
                      <input type="text" value={postForm.videoUrl} readOnly placeholder="Upload video..." />
                      <input type="file" id="vid-up" hidden onChange={e => handleFileUpload(e, 'post', 'videoUrl')} />
                      <label htmlFor="vid-up" className="up-btn">Upload</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Excerpt</label>
                  <textarea value={postForm.excerpt} onChange={e => setPostForm({...postForm, excerpt: e.target.value})} rows={2} required />
                </div>
                <div className="form-group">
                  <label>Content (HTML)</label>
                  <textarea value={postForm.content} onChange={e => setPostForm({...postForm, content: e.target.value})} rows={10} className="code-text" required />
                </div>
                <button type="submit" className="admin-submit-btn">Publish Post</button>
              </form>
            ) : (
              <form onSubmit={handleTestiSubmit} className="admin-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={testiForm.name} onChange={e => setTestiForm({...testiForm, name: e.target.value})} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Role</label>
                    <input type="text" value={testiForm.role} onChange={e => setTestiForm({...testiForm, role: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" value={testiForm.company} onChange={e => setTestiForm({...testiForm, company: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Avatar Image</label>
                  <div className="upload-box">
                    <input type="text" value={testiForm.image} readOnly placeholder="Upload avatar..." />
                    <input type="file" id="av-up" hidden onChange={e => handleFileUpload(e, 'testi', 'image')} />
                    <label htmlFor="av-up" className="up-btn">Upload</label>
                  </div>
                </div>
                <div className="form-group">
                  <label>Testimonial Content</label>
                  <textarea value={testiForm.content} onChange={e => setTestiForm({...testiForm, content: e.target.value})} rows={4} required />
                </div>
                <button type="submit" className="admin-submit-btn">Add Testimonial</button>
              </form>
            )}
          </section>

          {/* List Section */}
          <section className="admin-card list-card">
            <div className="ac-head">
              <h2>Recent {activeTab === 'posts' ? 'Posts' : 'Testimonials'}</h2>
              <span className="count-tag">{activeTab === 'posts' ? posts.length : testimonials.length}</span>
            </div>
            <div className="admin-post-list">
              {loading ? (
                <p style={{ padding: "20px", color: "#64748b", fontWeight: 600 }}>Loading…</p>
              ) : activeTab === "posts" ? (
                posts.map((p) => (
                <div key={p._id} className="admin-post-item">
                  <div className="api-info">
                    <h3>{p.title}</h3>
                    <div className="api-meta"><span>{p.category}</span></div>
                  </div>
                  <div className="api-actions">
                    <span className="api-slug" title="Stored slug (public blog removed)">{p.slug}</span>
                    <button onClick={() => handleDelete('posts', p._id)} className="api-del">Delete</button>
                  </div>
                </div>
                ))
              ) : (
                testimonials.map((t) => (
                  <div key={t._id} className="admin-post-item">
                    <div className="api-info">
                      <h3>{t.name}</h3>
                      <div className="api-meta">
                        <span>
                          {t.role} @ {t.company || "Private"}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => handleDelete("testimonials", t._id)} className="api-del">
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .admin-page-wrap {
          min-height: 100vh;
          background: #f8fafc;
          padding: 160px 20px 60px;
          color: #1e293b;
          font-family: inherit;
        }
        .admin-container { max-width: 1200px; margin: 0 auto; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; }
        .ah-left h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; color: var(--P); }
        .ah-left h1 span { color: var(--OR); }
        
        .admin-tabs { display: flex; gap: 10px; }
        .admin-tabs button { padding: 10px 20px; border-radius: 12px; border: 1px solid #e2e8f0; background: white; cursor: pointer; font-weight: 700; color: #64748b; transition: all 0.3s; }
        .admin-tabs button.active { background: var(--P); color: white; border-color: var(--P); transform: translateY(-3px); box-shadow: 0 4px 12px rgba(27,67,112,0.2); }

        .upload-box { display: flex; gap: 10px; }
        .upload-box input { flex: 1; pointer-events: none; }
        .up-btn { background: #f1f5f9; color: #1e293b; padding: 12px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; border: 1px solid #e2e8f0; transition: all 0.2s; white-space: nowrap; }
        .up-btn:hover { background: #e2e8f0; }

        .api-actions { display: flex; gap: 15px; align-items: center; }
        .api-slug { font-size: 0.75rem; color: #94a3b8; font-family: ui-monospace, monospace; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .api-del { background: none; border: none; color: #ef4444; font-weight: 700; cursor: pointer; padding: 0; }
        .api-del:hover { text-decoration: underline; }

        .admin-back-btn { padding: 12px 24px; border-radius: 50px; background: white; border: 1px solid #e2e8f0; color: #64748b; text-decoration: none; font-weight: 600; transition: all 0.3s; }
        .admin-back-btn:hover { border-color: var(--P); color: var(--P); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .admin-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 30px; }
        @media (max-width: 1000px) { .admin-grid { grid-template-columns: 1fr; } }

        .admin-card { background: white; border-radius: 24px; padding: 32px; border: 1px solid #f1f5f9; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
        .ac-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; }
        .ac-head h2 { font-size: 1.5rem; font-weight: 700; }
        
        .status-tag { background: #dcfce7; color: #166534; padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700; }
        .count-tag { background: #f1f5f9; color: #64748b; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 700; }

        .admin-form { display: flex; flex-direction: column; gap: 20px; }
        .form-group label { display: block; font-size: 0.9rem; font-weight: 800; margin-bottom: 8px; color: #475569; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 14px; border: 2px solid #f1f5f9; border-radius: 12px; font-size: 1rem; transition: all 0.2s; background: #fafafa; }
        .form-group input:focus, .form-group textarea:focus { border-color: var(--P); background: white; outline: none; box-shadow: 0 0 0 4px rgba(27, 67, 112, 0.05); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .code-text { font-family: 'Courier New', Courier, monospace; font-size: 0.9rem; background: #1e293b !important; color: #e2e8f0 !important; }
        
        .admin-submit-btn { margin-top: 10px; padding: 18px; border-radius: 14px; background: var(--P); color: white; font-weight: 800; border: none; cursor: pointer; transition: all 0.3s; font-size: 1.1rem; }
        .admin-submit-btn:hover { background: var(--PD); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(27, 67, 112, 0.2); }

        .admin-post-list { display: flex; flex-direction: column; gap: 16px; }
        .admin-post-item { padding: 20px; background: #fafafa; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #f1f5f9; transition: all 0.2s; }
        .admin-post-item:hover { background: white; border-color: var(--OR); box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .api-info h3 { font-size: 1rem; font-weight: 700; margin-bottom: 4px; }
        .api-meta { display: flex; align-items: center; gap: 8px; color: #94a3b8; font-size: 0.8rem; font-weight: 600; }
        .api-meta .dot { width: 4px; height: 4px; border-radius: 50%; background: #cbd5e1; }
      `}</style>
    </div>
  );
}
