"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { megaGroups, nav } from "./site";
import styles from "./kam.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [progress, setProgress] = useState(0);
  const servicesOn = pathname.startsWith("/services");

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMega(false);
        setOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-services-root]")) return;
      setMega(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <span className={styles.progress} style={{ width: `${progress * 100}%` }} />
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="KICCPA home">
          <Image src="/images/kiccpa-logo-light.png" alt="KICCPA — Where it meets AI" width={684} height={277} className={styles.logoImg} priority quality={100} />
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) =>
            item.mega ? (
              <div key={item.href} data-services-root>
                <button
                  type="button"
                  className={`${styles.navBtn} ${servicesOn ? styles.navLinkActive : ""}`}
                  aria-expanded={mega}
                  aria-controls="services-menu"
                  onClick={() => setMega((v) => !v)}
                  onMouseEnter={() => setMega(true)}
                >
                  Services
                </button>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ""}`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <Link className={styles.cta} href="/business-enquiry">Let&apos;s Talk</Link>
        <button type="button" className={`${styles.navBtn} ${styles.burger}`} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {mega && (
        <div id="services-menu" className={styles.mega} role="region" aria-label="Services" data-services-root>
          <div className={styles.megaTopBar}>
            <Link href="/services" onClick={() => setMega(false)}>
              <strong>All Services Directory</strong>
              <span>Explore Complete Capabilities Overview →</span>
            </Link>
          </div>
          {megaGroups.map((group) => (
            <div key={group.label}>
              <div className={styles.megaLabel}>{group.label}</div>
              <p className={styles.megaBlurb}>{group.blurb}</p>
              {group.links.map((link) => (
                <Link key={link.href + link.title} href={link.href} onClick={() => setMega(false)}>
                  <strong>{link.title}</strong>
                  <span>{link.text}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
      {open && (
        <div className={styles.drawer}>
          {nav.map((item) => item.mega ? (
            <details key={item.href}>
              <summary>Services</summary>
              <Link href="/services" onClick={() => setOpen(false)}>All services</Link>
              {megaGroups.map((group) => (
                <div key={group.label}>
                  <small>{group.label}</small>
                  {group.links.map((link) => (
                    <Link key={link.href + link.title} href={link.href} onClick={() => setOpen(false)}>{link.title}</Link>
                  ))}
                </div>
              ))}
            </details>
          ) : (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <Link href="/business-enquiry">Let&apos;s Talk</Link>
        </div>
      )}
    </header>
  );
}
