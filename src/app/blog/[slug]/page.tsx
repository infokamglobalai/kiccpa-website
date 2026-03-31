"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const API = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    fetch(`${API}/api/posts/${slug}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!post) return <div className="py-20 text-center">Post not found.</div>;

  return (
    <div className="blog-post-page">
      <section className="post-header pt-32 pb-16 bg-[#f8fafc]">
        <div className="container">
          <Link href="/blog" className="text-primary font-bold mb-8 inline-block hover:gap-2 transition-all">
            ← Back to Blog
          </Link>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-4">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
              <span>By {post.author}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="post-content py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto glass p-10 bg-white border-slate-100 shadow-xl">
            {post.videoUrl ? (
              <video src={post.videoUrl} controls className="w-full h-auto rounded-xl mb-8 shadow-lg" />
            ) : post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="w-full h-auto rounded-xl mb-8" />
            )}
            <div className="prose text-slate-600 text-lg leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: post.content }}>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
