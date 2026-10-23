"use client";

import Image from "next/image";
import Link from "next/link";
import { brand, socials } from "./site";
import styles from "./kam.module.css";

function SocialIcon({ name }: { name: string }) {
  const common = { viewBox: "0 0 24 24", width: 16, height: 16, "aria-hidden": true as const, fill: "currentColor" };
  if (name === "LinkedIn") {
    return <svg {...common}><path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H10z" /></svg>;
  }
  if (name === "Instagram") {
    return <svg {...common}><path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 6.6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" /></svg>;
  }
  if (name === "Facebook") {
    return <svg {...common}><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" /></svg>;
  }
  return <svg {...common}><path d="M23 12.2a11 11 0 1 1-3.2-7.8A11 11 0 0 1 23 12.2zM10 15.5V8.8l6.2 3.3z" /></svg>;
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.corpFoot}>
      <div className={`${styles.wrap} ${styles.corpGrid}`}>
        <div className={styles.corpBrand}>
          <Link href="/" aria-label="KICCPA home">
            <Image src="/images/kiccpa-logo-light.png" alt="KICCPA — Where it meets AI" width={684} height={277} className={styles.corpLogo} />
          </Link>
          <p>Where it meets AI</p>
          <nav className={styles.socials} aria-label="Social media">
            {socials.map((item) => {
              const icon = <SocialIcon name={item.label} />;
              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>{icon}</a>
              ) : (
                <span key={item.label} aria-label={`${item.label} link is not added yet`} title={item.label}>{icon}</span>
              );
            })}
          </nav>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            <li><Link href="/services/technology-ai">Technology & AI</Link></li>
            <li><Link href="/services/business-outsourcing">Business Outsourcing</Link></li>
            <li><Link href="/services/hr-recruitment">HR & Recruitment</Link></li>
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className={`${styles.wrap} ${styles.corpBase}`}>
        <p>© {year} {brand.name}. {brand.legalName}.</p>
        <p>
          <Link href="/privacy-policy">Privacy policy</Link>
          {" · "}
          <Link href="/terms-of-use">Terms of use</Link>
          {" · "}
          <button type="button" className={styles.iconBtn} onClick={() => window.dispatchEvent(new Event("kiccpa-cookies"))}>Cookie settings</button>
        </p>
      </div>
    </footer>
  );
}
