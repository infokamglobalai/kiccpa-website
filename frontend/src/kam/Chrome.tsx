"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Consent from "./Consent";
import { contacts } from "./site";
import styles from "./kam.module.css";

export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const admin = pathname.startsWith("/admin");
  const home = pathname === "/";
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("kam-motion");
    if (stored === "off") document.documentElement.dataset.motion = "off";
    /* Only setState when the boolean actually flips, not on every scroll event. */
    const onScroll = () => setShowTop((prev) => (window.scrollY > 700) === prev ? prev : !prev);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (admin) return <>{children}</>;

  return (
    <>
      <Header />
      <div className={home ? undefined : styles.offset}>{children}</div>
      <Footer />
      <Consent />
      <a
        className={styles.whatsapp}
        href={`https://wa.me/${contacts.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with KICCPA on WhatsApp, +965 9988 9588"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 2.1 17.1L1 23l6-1.6A11 11 0 0 0 20.5 3.5zM12 20.4a9.2 9.2 0 0 1-4.7-1.3l-.3-.2-3.5.9.9-3.4-.2-.3A9.1 9.1 0 1 1 12 20.4zm5.1-6.8c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.9 1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.4.2-.4a.5.5 0 0 0 0-.4c-.1-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c.6.2 1 .4 1.4.5a3.4 3.4 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.2-.3-.2-.6-.3z" />
        </svg>
      </a>
      {showTop && (
        <button
        type="button"
        className={styles.backTop}
        aria-label="Back to top"
        onClick={() => {
          const reduce =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            document.documentElement.dataset.motion === "off";
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        }}
      >
          ↑
        </button>
      )}
    </>
  );
}
