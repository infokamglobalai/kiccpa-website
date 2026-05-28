"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

type DeskMenuKey = "packages" | "offerings" | "stakeholders" | "services";

const OFFERINGS = [
  {
    n: "01",
    label: "LMS — Demo",
    href: "https://demo.eduaitutors.com",
  },
  {
    n: "02",
    label: "SMS",
    href: "https://sms.eduaitutors.com",
  },
  {
    n: "03",
    label: "Assessment",
    href: "https://assessment.eduaitutors.com",
  },
  {
    n: "04",
    label: "AI Counsellor",
    href: "https://challa.space-z.ai",
  },
  {
    n: "05",
    label: "AI Calendar",
    href: "https://aisubstitution.space-z.ai",
  },
  {
    n: "06",
    label: "Kids Assessment",
    href: "https://kids-assessment.eduaitutors.com",
  },
  {
    n: "07",
    label: "Analyzer",
    href: "https://eval-ai-xrp7.onrender.com",
  },
  {
    n: "08",
    label: "Question Bank",
    href: "https://questionai.space-z.ai",
  },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [raised, setRaised] = useState(false);
  const [deskMenu, setDeskMenu] = useState<DeskMenuKey | null>(null);
  const navDeskRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setRaised(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setDeskMenu(null);
    });
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  /** Close desktop menus on outside click / Escape (menus use buttons, not links, for top-level). */
  useEffect(() => {
    const onDocPointer = (e: PointerEvent) => {
      if (!deskMenu) return;
      const el = navDeskRef.current;
      if (el?.contains(e.target as Node)) return;
      setDeskMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeskMenu(null);
    };
    document.addEventListener("pointerdown", onDocPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDocPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [deskMenu]);

  const stakeholdersActive = ["/schools", "/parents", "/investors"].includes(pathname);

  const toggleDesk = (key: DeskMenuKey) => {
    setDeskMenu((m) => (m === key ? null : key));
  };

  return (
    <header className={styles.shell}>
      <div className={styles.row}>
        <Link href="/" className={styles.brand} aria-label="KICCPA home">
          <span className={styles.brandAccent} aria-hidden />
          <Image
            src="/images/kiccpa-logo.jpg"
            alt=""
            width={152}
            height={46}
            className={styles.logoImg}
            sizes="152px"
            priority
          />
        </Link>

        <div className={`${styles.navPill} ${raised ? styles.navPillRaised : ""}`}>
          <nav ref={navDeskRef} className={styles.navDesktop} aria-label="Primary">
            <ul className={styles.linkRail}>
            <li className={styles.linkItem}>
              <Link href="/" className={`${styles.link} ${pathname === "/" ? styles.linkActive : ""}`}>
                Home
              </Link>
            </li>
            <li className={styles.linkItem}>
              <Link
                href="/about"
                className={`${styles.link} ${pathname === "/about" ? styles.linkActive : ""}`}
              >
                About
              </Link>
            </li>
            <li className={styles.linkItem}>
              <Link
                href="/learnx"
                className={`${styles.link} ${pathname === "/learnx" ? styles.linkActive : ""}`}
              >
                LearnX
              </Link>
            </li>
            <li className={styles.linkItem}>
              <Link
                href="/features"
                className={`${styles.link} ${pathname === "/features" ? styles.linkActive : ""}`}
              >
                Features
              </Link>
            </li>

            <li
              className={`${styles.linkItem} ${styles.linkItemMenu} ${deskMenu === "offerings" ? styles.linkItemOpen : ""}`}
            >
              <button
                type="button"
                className={`${styles.link} ${styles.linkTrigger}`}
                aria-expanded={deskMenu === "offerings"}
                aria-haspopup="true"
                aria-controls="nav-menu-offerings"
                id="nav-trigger-offerings"
                onClick={() => toggleDesk("offerings")}
              >
                Our Offerings <span className={styles.caret}>▾</span>
              </button>
              <span className={styles.menuBridge} aria-hidden />
              <div id="nav-menu-offerings" className={styles.dropdown} role="menu" aria-labelledby="nav-trigger-offerings">
                {OFFERINGS.map((o) => (
                  <a
                    key={o.n}
                    href={o.href}
                    className={styles.dropLink}
                    role="menuitem"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={o.label}
                  >
                    <span className={styles.dropIcon} aria-hidden>
                      {o.n}
                    </span>
                    {o.label}
                  </a>
                ))}
              </div>
            </li>

            {/* Top-level = button so click opens menu; hover bridge reaches panel (WAI pattern). */}
            <li
              className={`${styles.linkItem} ${styles.linkItemMenu} ${deskMenu === "packages" ? styles.linkItemOpen : ""}`}
            >
              <button
                type="button"
                className={`${styles.link} ${styles.linkTrigger} ${pathname.startsWith("/products") ? styles.linkActive : ""}`}
                aria-expanded={deskMenu === "packages"}
                aria-haspopup="true"
                aria-controls="nav-menu-packages"
                id="nav-trigger-packages"
                onClick={() => toggleDesk("packages")}
              >
                Packages <span className={styles.caret}>▾</span>
              </button>
              <span className={styles.menuBridge} aria-hidden />
              <div id="nav-menu-packages" className={styles.dropdown} role="menu" aria-labelledby="nav-trigger-packages">
                <Link href="/products" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>📦</span> All packages
                </Link>
                <Link href="/products#lms-standard" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>📘</span> LMS Standard
                </Link>
                <Link href="/products#lms-premium" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>⭐</span> LMS Premium
                </Link>
                <Link href="/products#lms-enterprise" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>🏢</span> LMS Enterprise
                </Link>
                <hr className={styles.dropRule} />
                <Link href="/products#packages" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>📋</span> Compare &amp; pricing
                </Link>
              </div>
            </li>

            <li
              className={`${styles.linkItem} ${styles.linkItemMenu} ${deskMenu === "stakeholders" ? styles.linkItemOpen : ""}`}
            >
              <button
                type="button"
                className={`${styles.link} ${styles.linkTrigger} ${stakeholdersActive ? styles.linkActive : ""}`}
                aria-expanded={deskMenu === "stakeholders"}
                aria-haspopup="true"
                aria-controls="nav-menu-stakeholders"
                id="nav-trigger-stakeholders"
                onClick={() => toggleDesk("stakeholders")}
              >
                Stakeholders <span className={styles.caret}>▾</span>
              </button>
              <span className={styles.menuBridge} aria-hidden />
              <div
                id="nav-menu-stakeholders"
                className={styles.dropdown}
                role="menu"
                aria-labelledby="nav-trigger-stakeholders"
              >
                <Link href="/schools" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>🏫</span> For schools
                </Link>
                <Link href="/parents" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>👨‍👩‍👧</span> For parents
                </Link>
                <Link href="/investors" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>📈</span> For investors
                </Link>
              </div>
            </li>

            <li
              className={`${styles.linkItem} ${styles.linkItemMenu} ${deskMenu === "services" ? styles.linkItemOpen : ""}`}
            >
              <button
                type="button"
                className={`${styles.link} ${styles.linkTrigger} ${pathname === "/services" ? styles.linkActive : ""}`}
                aria-expanded={deskMenu === "services"}
                aria-haspopup="true"
                aria-controls="nav-menu-services"
                id="nav-trigger-services"
                onClick={() => toggleDesk("services")}
              >
                Services <span className={styles.caret}>▾</span>
              </button>
              <span className={styles.menuBridge} aria-hidden />
              <div id="nav-menu-services" className={styles.dropdown} role="menu" aria-labelledby="nav-trigger-services">
                <Link href="/services" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>✨</span> All services
                </Link>
                <Link href="/services" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>💻</span> Custom Software
                </Link>
                <Link href="/services" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>🤝</span> CRM Solutions
                </Link>
                <Link href="/services" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>🎓</span> LMS Platforms
                </Link>
                <hr className={styles.dropRule} />
                <Link href="/services" className={styles.dropLink} role="menuitem">
                  <span className={styles.dropIcon}>🤖</span> AI Solutions
                </Link>
              </div>
            </li>


            <li className={styles.linkItem}>
              <Link
                href="/contact"
                className={`${styles.link} ${pathname === "/contact" ? styles.linkActive : ""}`}
              >
                Contact
              </Link>
            </li>
            </ul>
          </nav>
        </div>

        <div className={styles.actions}>
          <a href="tel:+96560919345" className={styles.cta} style={{ background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', padding: '0 16px' }}>
            <span className={styles.ctaLabel} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Speak to an Expert
            </span>
          </a>
          <Link href="/demo" className={styles.cta}>
            <span className={styles.ctaLabel}>Book Demo</span>
            <span className={styles.ctaArrow} aria-hidden>
              →
            </span>
          </Link>
          <button
            type="button"
            className={`${styles.menuBtn} ${mobileOpen ? styles.menuBtnOpen : ""}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className={styles.menuIcon} aria-hidden>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Site menu">
            <div className={styles.drawerInner}>
              <Link
                href="/"
                className={`${styles.mLink} ${pathname === "/" ? styles.mLinkActive : ""}`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${styles.mLink} ${pathname === "/about" ? styles.mLinkActive : ""}`}
              >
                About
              </Link>
              <Link
                href="/learnx"
                className={`${styles.mLink} ${pathname === "/learnx" ? styles.mLinkActive : ""}`}
              >
                LearnX
              </Link>
              <Link
                href="/features"
                className={`${styles.mLink} ${pathname === "/features" ? styles.mLinkActive : ""}`}
              >
                Features
              </Link>

              <div className={styles.mGroup}>
                <div className={styles.mGroupLabel}>Our Offerings</div>
                {OFFERINGS.map((o) => (
                  <a
                    key={o.n}
                    href={o.href}
                    className={styles.mSub}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={o.label}
                  >
                    <span className={styles.mSubIcon} aria-hidden>
                      {o.n}
                    </span>{" "}
                    {o.label}
                  </a>
                ))}
              </div>

              <div className={styles.mGroup}>
                <div className={styles.mGroupLabel}>Packages</div>
                <Link href="/products" className={styles.mSub}>
                  <span className={styles.mSubIcon}>📦</span> All packages
                </Link>
                <Link href="/products#lms-standard" className={styles.mSub}>
                  <span className={styles.mSubIcon}>📘</span> LMS Standard
                </Link>
                <Link href="/products#lms-premium" className={styles.mSub}>
                  <span className={styles.mSubIcon}>⭐</span> LMS Premium
                </Link>
                <Link href="/products#lms-enterprise" className={styles.mSub}>
                  <span className={styles.mSubIcon}>🏢</span> LMS Enterprise
                </Link>
                <Link href="/products#packages" className={styles.mSub}>
                  <span className={styles.mSubIcon}>📋</span> Compare &amp; pricing
                </Link>
              </div>

              <div className={styles.mGroup}>
                <div className={styles.mGroupLabel}>Stakeholders</div>
                <Link href="/schools" className={styles.mSub}>
                  <span className={styles.mSubIcon}>🏫</span> For schools
                </Link>
                <Link href="/parents" className={styles.mSub}>
                  <span className={styles.mSubIcon}>👨‍👩‍👧</span> For parents
                </Link>
                <Link href="/investors" className={styles.mSub}>
                  <span className={styles.mSubIcon}>📈</span> For investors
                </Link>
              </div>

              <div className={styles.mGroup}>
                <div className={styles.mGroupLabel}>Services</div>
                <Link href="/services" className={styles.mSub}>
                  <span className={styles.mSubIcon}>✨</span> All services
                </Link>
                <Link href="/services" className={styles.mSub}>
                  <span className={styles.mSubIcon}>💻</span> Custom Software &amp; CRM
                </Link>
                <Link href="/services" className={styles.mSub}>
                  <span className={styles.mSubIcon}>🎓</span> LMS Platforms
                </Link>
                <Link href="/services" className={styles.mSub}>
                  <span className={styles.mSubIcon}>🤖</span> AI Solutions
                </Link>
              </div>


              <Link
                href="/contact"
                className={`${styles.mLink} ${pathname === "/contact" ? styles.mLinkActive : ""}`}
              >
                Contact
              </Link>

              <div className={styles.drawerCta} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="tel:+96560919345" className={styles.cta} style={{ background: 'rgba(255,255,255,0.05)', justifyContent: 'center' }}>
                  <span className={styles.ctaLabel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Speak to an Expert
                  </span>
                </a>
                <Link href="/demo" className={styles.cta} style={{ justifyContent: 'center' }} onClick={() => setMobileOpen(false)}>
                  <span className={styles.ctaLabel}>Book Demo</span>
                  <span className={styles.ctaArrow} aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
