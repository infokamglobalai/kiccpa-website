"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API Error, using fallback:", err);
        setLoading(false);
      });

    // Animation logic
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
  }, []);

  return (
    <>
      <section 
        className="sub-p-hero rv vis" 
        style={{ backgroundImage: 'url("/images/hero_insights.png")' }}
      >
        <div className="sec-eyebrow" style={{ color: "var(--OR)", fontWeight: 800 }}>Tech Insights</div>
        <h2>The Latest on <em>AI &amp; Software</em></h2>
        <p>Discover our insights on digital transformation, LLM adoption in the enterprise, and the future of EdTech architecture.</p>
      </section>

      <div className="courses-wrap rv">
        <div className="cgrid">
          {loading ? (
             <div className="text-center py-20 w-full col-span-full">
               <div className="spinner"></div>
               <p className="text-slate-400 mt-4">Loading insights...</p>
             </div>
          ) : posts.length > 0 ? (
            posts.map((post, idx) => (
              <div className={`ccard rv d${(idx % 3) + 1}`} key={post._id || idx}>
                <div className="cc-img ci1" style={{ 
                  background: post.imageUrl ? `url(${post.imageUrl}) center/cover` : 'linear-gradient(135deg, var(--PL), var(--PM))' 
                }}>
                  {!post.imageUrl && '🤖'}
                  <div className="cbadge cbp" style={{ background: 'var(--P)' }}>{post.category}</div>
                </div>
                <div className="cc-body">
                  <div className="cc-sub" style={{ color: 'var(--P)' }}>{post.category}</div>
                  <div className="cc-name">{post.title}</div>
                  <div className="cc-inst">Author: <span>{post.author}</span></div>
                </div>
                <div className="cc-foot">
                  <div className="cc-price">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  <Link href={`/blog/${post.slug}`} className="cc-btn">Read More</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 w-full col-span-full">
              <p className="text-slate-400">No insights available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
