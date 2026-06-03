"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone } from "lucide-react";
import { startTransition, useEffect, useRef, useState } from "react";
import OfferingsDropdown from "./OfferingsDropdown";
import ServicesDropdown from "./ServicesDropdown";
import StakeholdersDropdown from "./StakeholdersDropdown";
import {
  OFFERING_GROUPS,
  SERVICE_GROUPS,
  STAKEHOLDER_ITEMS,
  offeringGroupItems,
} from "./navMenuConfig";
import styles from "./Navbar.module.css";

const LOGO_SRC = "/images/kiccpa-logo.png";

type DeskMenuKey = "offerings" | "stakeholders" | "services";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deskMenu, setDeskMenu] = useState<DeskMenuKey | null>(null);
  const navDeskRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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

  useEffect(() => {
    const onDocPointer = (e: PointerEvent) => {
      if (!deskMenu) return;
      if (navDeskRef.current?.contains(e.target as Node)) return;
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

  const closeDesk = () => setDeskMenu(null);

  const openDeskOnHover = (key: DeskMenuKey) => setDeskMenu(key);

  const closeDeskOnLeave = (key: DeskMenuKey) => {
    setDeskMenu((m) => (m === key ? null : m));
  };

  const menuItemClass = (key: DeskMenuKey) =>
    `${styles.linkItem} ${styles.linkItemMenu} ${deskMenu === key ? styles.linkItemOpen : ""}`;

  const linkClass = (active: boolean) =>
    `${styles.link} ${active ? styles.linkActive : ""}`;

  return (
    <header className={styles.shell}>
      <div className={`${styles.bar} ${scrolled ? styles.barScrolled : ""}`}>
        <Link href="/" className={styles.brand} aria-label="KICCPA home">
          <Image
            src={LOGO_SRC}
            alt="KICCPA — Where IT meets AI"
            width={200}
            height={60}
            className={styles.logoImg}
            sizes="(max-width: 640px) 150px, 200px"
            priority
          />
        </Link>

        <nav ref={navDeskRef} className={styles.navDesktop} aria-label="Primary">
          <ul className={styles.linkRail}>
            <li className={styles.linkItem}>
              <Link href="/" className={linkClass(pathname === "/")}>
                Home
              </Link>
            </li>
            <li className={styles.linkItem}>
              <Link href="/about" className={linkClass(pathname === "/about")}>
                About
              </Link>
            </li>
            <li className={`${styles.linkItem} ${styles.linkCompact}`}>
              <Link href="/learnx" className={linkClass(pathname === "/learnx")}>
                LearnX
              </Link>
            </li>
            <li className={`${styles.linkItem} ${styles.linkCompact}`}>
              <Link href="/features" className={linkClass(pathname === "/features")}>
                Features
              </Link>
            </li>

            <li
              className={menuItemClass("offerings")}
              onMouseEnter={() => openDeskOnHover("offerings")}
              onMouseLeave={() => closeDeskOnLeave("offerings")}
            >
              <button
                type="button"
                className={`${styles.link} ${styles.linkTrigger} ${pathname.startsWith("/solutions") ? styles.linkActive : ""}`}
                aria-expanded={deskMenu === "offerings"}
                aria-haspopup="true"
                aria-controls="nav-menu-offerings"
                id="nav-trigger-offerings"
                onClick={() => toggleDesk("offerings")}
              >
                Offerings
                <ChevronDown size={14} className={styles.caretIcon} aria-hidden />
              </button>
              <span className={styles.menuBridge} aria-hidden />
              <OfferingsDropdown onNavigate={closeDesk} />
            </li>

            <li
              className={menuItemClass("stakeholders")}
              onMouseEnter={() => openDeskOnHover("stakeholders")}
              onMouseLeave={() => closeDeskOnLeave("stakeholders")}
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
                Stakeholders
                <ChevronDown size={14} className={styles.caretIcon} aria-hidden />
              </button>
              <span className={styles.menuBridge} aria-hidden />
              <StakeholdersDropdown onNavigate={closeDesk} />
            </li>

            <li
              className={menuItemClass("services")}
              onMouseEnter={() => openDeskOnHover("services")}
              onMouseLeave={() => closeDeskOnLeave("services")}
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
                Services
                <ChevronDown size={14} className={styles.caretIcon} aria-hidden />
              </button>
              <span className={styles.menuBridge} aria-hidden />
              <ServicesDropdown onNavigate={closeDesk} />
            </li>

            <li className={styles.linkItem}>
              <Link href="/contact" className={linkClass(pathname === "/contact")}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="tel:+96560919345" className={styles.ctaExpert} title="Speak to an Expert">
            <Phone size={14} strokeWidth={2.5} aria-hidden />
            <span>Expert</span>
          </a>
          <Link href="/demo" className={styles.ctaDemo}>
            Demo
            <span className={styles.ctaDemoArrow} aria-hidden>
              →
            </span>
          </Link>
        </div>

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

      {mobileOpen && (
        <>
          <button
            type="button"
            className={styles.backdrop}
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className={styles.drawer} role="dialog" aria-modal="true" aria-label="Site menu">
            <div className={styles.drawerHead}>
              <Link href="/" className={styles.drawerBrand} onClick={() => setMobileOpen(false)}>
                <Image
                  src={LOGO_SRC}
                  alt="KICCPA"
                  width={170}
                  height={50}
                  className={styles.drawerLogo}
                />
              </Link>
              <button
                type="button"
                className={styles.drawerClose}
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                ×
              </button>
            </div>

            <div className={styles.drawerInner}>
              <Link href="/" className={linkClass(pathname === "/")} onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link href="/about" className={linkClass(pathname === "/about")} onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/learnx" className={linkClass(pathname === "/learnx")} onClick={() => setMobileOpen(false)}>
                LearnX
              </Link>
              <Link href="/features" className={linkClass(pathname === "/features")} onClick={() => setMobileOpen(false)}>
                Features
              </Link>

              <div className={styles.mGroup}>
                <p className={styles.mGroupLabel}>Offerings</p>
                {OFFERING_GROUPS.map((group) => (
                  <div key={group.id} className={styles.mSubGroup}>
                    <p className={styles.mSubGroupLabel}>{group.label}</p>
                    {offeringGroupItems(group).map((o) => (
                      <Link key={o.slug} href={o.href} className={styles.mSub} onClick={() => setMobileOpen(false)}>
                        {o.label}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link href="/products" className={styles.mGroupFooter} onClick={() => setMobileOpen(false)}>
                  View all products
                </Link>
              </div>

              <div className={styles.mGroup}>
                <p className={styles.mGroupLabel}>Stakeholders</p>
                {STAKEHOLDER_ITEMS.map((item) => (
                  <Link key={item.href} href={item.href} className={styles.mSub} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className={styles.mGroup}>
                <p className={styles.mGroupLabel}>Services</p>
                {SERVICE_GROUPS.flatMap((g) => g.items).map((item) => (
                  <Link key={item.label} href={item.href} className={styles.mSub} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link href="/contact" className={linkClass(pathname === "/contact")} onClick={() => setMobileOpen(false)}>
                Contact
              </Link>

              <div className={styles.drawerCta}>
                <a href="tel:+96560919345" className={styles.ctaExpert} onClick={() => setMobileOpen(false)}>
                  <Phone size={16} aria-hidden />
                  Speak to an Expert
                </a>
                <Link href="/demo" className={styles.ctaDemo} onClick={() => setMobileOpen(false)}>
                  Book Demo
                  <span className={styles.ctaDemoArrow} aria-hidden>
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
