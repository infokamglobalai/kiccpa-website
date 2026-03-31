"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        <img
          src="/images/kiccpa-logo.jpg"
          alt="KICCPA Logo"
          className="logo-img"
        />

      </Link>

      <ul className="nav-links" style={{ display: mobileOpen ? 'flex' : '' }}>
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className={pathname === "/about" ? "active" : ""}>
            About
          </Link>
        </li>
        <li>
          <Link href="/services" className={pathname === "/services" ? "active" : ""}>
            Services <span className="arr">▾</span>
          </Link>
          <div className="drop">
            <Link href="/services"><div className="di">💻</div>Custom Software</Link>
            <Link href="/services"><div className="di">🤝</div>CRM Solutions</Link>
            <Link href="/services"><div className="di">🎓</div>LMS Platforms</Link>
            <hr />
            <Link href="/services"><div className="di">🤖</div>AI Solutions</Link>
          </div>
        </li>
        <li>
          <Link href="/products" className={pathname === "/products" ? "active" : ""}>
            Platforms <span className="arr">▾</span>
          </Link>
          <div className="drop">
            <Link href="/products"><div className="di">⭐</div>EduAiTutors</Link>
            <Link href="/products"><div className="di">🚀</div>Enterprise ERP</Link>
          </div>
        </li>
        <li>
          <Link href="/blog" className={pathname === "/blog" ? "active" : ""}>
            Insights
          </Link>
        </li>
        <li>
          <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
            Contact
          </Link>
        </li>
      </ul>

      <div className="nav-right">
        <Link href="/contact" className="btn-ft">Book Consultation</Link>
        <button
          className="hamburger btn-si"
          style={{ display: "none" }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          Menu
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .nav-links {
            flex-direction: column;
            position: absolute;
            top: 68px; left: 0; right: 0;
            background: #fff;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
