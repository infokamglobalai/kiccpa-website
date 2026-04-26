"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";

type DeskMenuKey = "packages" | "stakeholders" | "services";

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
                href="/features"
                className={`${styles.link} ${pathname === "/features" ? styles.linkActive : ""}`}
              >
                Features
              </Link>
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
                href="/features"
                className={`${styles.mLink} ${pathname === "/features" ? styles.mLinkActive : ""}`}
              >
                Features
              </Link>

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

              <div className={styles.drawerCta}>
                <Link href="/demo" className={styles.cta} onClick={() => setMobileOpen(false)}>
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
