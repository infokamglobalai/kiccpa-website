"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="product-detail-page">
      <section className="product-header pt-32 pb-20 bg-[#f8fafc]">
        <div className="container">
          <Link href="/products" className="text-primary font-bold mb-8 inline-block">
            ← Back to Products
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full mb-4 inline-block">Enterprise Suite</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                {id ? id.toString().replace(/-/g, ' ').toUpperCase() : "Product Detail"}
              </h1>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                A high-performance digital ecosystem designed to scale with your organization's growing needs. Integrated with the latest AI protocols for maximum efficiency.
              </p>
              <div className="flex gap-4">
                <a href="https://eduaitutors.com/auth/register" target="_blank" rel="noopener noreferrer" className="btn btn-primary lg shadow-lg">
                  Request Access
                </a>
                <Link href="/contact" className="btn btn-outline lg">
                  Enquire Now
                </Link>
              </div>
            </div>
            <div className="product-visual">
              <div className="glass p-12 bg-white border-slate-200 shadow-2xl rounded-3xl text-center">
                <div className="text-6xl mb-6">🚀</div>
                <h3 className="text-xl font-bold text-slate-800">Ready for Launch</h3>
                <p className="text-slate-400 text-sm mt-4">Scalable architecture built for performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-features py-24">
        <div className="container">
          <h2 className="text-3xl font-bold mb-16 text-center text-slate-900">Core Capabilities</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { title: "Real-time Analytics", desc: "Monitor your performance with live data dashboards." },
              { title: "AI Automation", desc: "Let our smart engines handle repetitive workflows." },
              { title: "Global Scaling", desc: "Deploy your solution across multiple regions seamlessly." }
            ].map((feature, i) => (
              <div key={i} className="glass p-8 bg-white border-slate-100 shadow-lg hover:shadow-xl transition-all">
                <h4 className="text-lg font-bold mb-4 text-primary">{feature.title}</h4>
                <p className="text-slate-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
