"use client";

import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { megaGroups, nav } from "./site";
import styles from "./kam.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const barRef = useRef<HTMLSpanElement>(null);
  const servicesOn = pathname.startsWith("/services");

  /**
   * The progress bar writes `transform` straight to the node on a rAF.
   * Previously it read `scrollHeight` (a forced layout) and re-rendered the
   * whole header through React state on every scroll event, then animated
   * `width`, which is layout + paint rather than compositor-only.
   */
  useEffect(() => {
    let max = document.documentElement.scrollHeight - window.innerHeight;
    let queued = false;
    const paint = () => {
      queued = false;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };
    const remeasure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      paint();
    };
    const observer = new ResizeObserver(remeasure);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });
    paint();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
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
      <span ref={barRef} className={styles.progress} style={{ transform: "scaleX(0)" }} />
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="KICCPA home">
          <Image src="/images/kiccpa-logo-light.png" alt="KICCPA — Where it meets AI" width={684} height={277} className={styles.logoImg} priority />
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {nav.map((item) =>
            item.mega ? (
              <div key={item.href} data-services-root>
                <Link href="/services" className={`${styles.navLink} ${servicesOn ? styles.navLinkActive : ""}`} aria-current={pathname === "/services" ? "page" : undefined} onClick={() => setMega(false)}>Services</Link>
                <button type="button" className={styles.servicesToggle} aria-label="Browse service categories" aria-expanded={mega} aria-controls="services-menu" onClick={() => setMega(v => !v)}><ChevronDown size={15} aria-hidden="true" /></button>
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
        <button type="button" className={`${styles.navBtn} ${styles.burger}`} aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={27} aria-hidden="true" /> : <Menu size={27} aria-hidden="true" />}
        </button>
      </div>
      {mega && (
        <div id="services-menu" className={styles.mega} role="region" aria-label="Services" data-services-root>
          {megaGroups.map((group) => (
            <div key={group.label}>
              <div className={styles.megaLabel}>{group.label}</div>
              <p className={styles.megaBlurb}>{group.blurb}</p>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMega(false)}>
                  <strong>{link.title}</strong>
                  <span>{link.text}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
      {open && (
        <div className={styles.drawer} id="mobile-navigation">
          {nav.map((item) => item.mega ? (
            <div key={item.href}><Link href="/services" onClick={() => setOpen(false)}>Services</Link><details>
              <summary>Service categories</summary>
              <Link href="/services" onClick={() => setOpen(false)}>All services</Link>
              {megaGroups.map((group) => (
                <div key={group.label}>
                  <small>{group.label}</small>
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.title}</Link>
                  ))}
                </div>
              ))}
            </details></div>
          ) : (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
          <Link href="/business-enquiry" onClick={() => setOpen(false)}>Let&apos;s Talk</Link>
        </div>
      )}
    </header>
  );
}
