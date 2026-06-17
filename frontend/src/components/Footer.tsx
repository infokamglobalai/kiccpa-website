import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, LifeBuoy, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import styles from "./Footer.module.css";

const currentYear = new Date().getFullYear();

/** Brand marks are not shipped in this lucide-react build — use minimal inline SVGs. */
function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={18} height={18}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={18} height={18}>
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden width={18} height={18}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.root}>
      <div className={styles.accentBar} aria-hidden />
      <div className={styles.mesh} aria-hidden />
      <div className={styles.glowOrb} aria-hidden />
      <div className={styles.glowOrb2} aria-hidden />

      <div className={styles.inner}>
        <h2 className={styles.srOnly}>Site footer</h2>

        <section className={styles.ctaBand} aria-label="Call to action">
          <div className={styles.ctaCopy}>
            <p className={styles.ctaEyebrow}>
              <Sparkles className={styles.ctaEyebrowIcon} aria-hidden size={14} strokeWidth={2.25} />
              Where education meets AI
            </p>
            <p className={styles.ctaHeadline}>
              Enterprise platforms for schools, parents, and boards — engineered in Kuwait &amp; India.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/demo" className={styles.ctaPrimary}>
              Book a demo
              <ArrowUpRight className={styles.ctaPrimaryIcon} aria-hidden size={18} strokeWidth={2.25} />
            </Link>
            <Link href="/contact" className={styles.ctaGhost}>
              Talk to us
            </Link>
          </div>
        </section>

        <div className={styles.divider} aria-hidden />

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoLink}>
              <Image src="/images/kiccpa-logo.jpg" alt="KICCPA" width={160} height={48} sizes="160px" />
            </Link>

            <div className={styles.poweredBy}>
              <span className={styles.poweredByLabel}>Powered by</span>
              <a
                href="https://www.kamglobalai.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.poweredByLogoLink}
                aria-label="KAM Global AI — opens in new tab"
              >
                <Image
                  src="/images/kam-global-logo.png"
                  alt="KAM Global AI"
                  width={108}
                  height={36}
                  sizes="108px"
                  className={styles.poweredByLogo}
                />
              </a>
            </div>

            <p className={styles.brandDesc}>
              The GCC&apos;s digital transformation partner — AI-native LMS, ERP, and custom software with delivery
              teams across Kuwait and India.
            </p>
            <div className={styles.locRow}>
              <span className={styles.locChip}>
                <MapPin className={styles.locIcon} aria-hidden size={14} strokeWidth={2.25} />
                Kuwait
              </span>
              <span className={styles.locChip}>
                <MapPin className={styles.locIcon} aria-hidden size={14} strokeWidth={2.25} />
                India
              </span>
            </div>
          </div>

          <div>
            <h3 id="footer-nav-platform" className={styles.colTitle}>
              Platform
            </h3>
            <nav className={styles.nav} aria-labelledby="footer-nav-platform">
              <Link href="/features">Features</Link>
              <Link href="/products">Products</Link>
              <Link href="/products#packages">Packages</Link>
              <Link href="/demo">Book a demo</Link>
            </nav>
          </div>

          <div>
            <h3 id="footer-nav-stakeholders" className={styles.colTitle}>
              Stakeholders
            </h3>
            <nav className={styles.nav} aria-labelledby="footer-nav-stakeholders">
              <Link href="/schools">Schools</Link>
              <Link href="/parents">Parents</Link>
              <Link href="/investors">Investors &amp; boards</Link>
              <Link href="/about">Heritage</Link>
            </nav>
          </div>

          <div>
            <h3 id="footer-nav-company" className={styles.colTitle}>
              Company
            </h3>
            <nav className={styles.nav} aria-labelledby="footer-nav-company">
              <Link href="/">Overview</Link>
              <Link href="/services">Services</Link>
              <Link href="/contact">Contact</Link>
            </nav>

            <h3 id="footer-nav-partners" className={`${styles.colTitle} ${styles.colTitleSpaced}`}>
              Partner network
            </h3>
            <nav className={styles.navTight} aria-labelledby="footer-nav-partners">
              <a
                href="https://www.kamglobalai.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.extLink}
              >
                KAM Global
                <ArrowUpRight className={styles.extIcon} aria-hidden size={14} strokeWidth={2.5} />
              </a>
              <a
                href="https://www.eduaitutors.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.extLink}
              >
                EduAiTutors
                <ArrowUpRight className={styles.extIcon} aria-hidden size={14} strokeWidth={2.5} />
              </a>
            </nav>
          </div>

          <div className={styles.contactCol}>
            <h3 id="footer-nav-contact" className={styles.colTitle}>
              Contact
            </h3>
            <div className={styles.contactCards}>
              <div className={styles.contactCard} style={{ cursor: 'default' }}>
                <span className={styles.contactIcon} aria-hidden>
                  <Mail size={18} strokeWidth={2.25} />
                </span>
                <span className={styles.contactBody}>
                  <span className={styles.contactLabel}>GCC Region</span>
                  <a href="mailto:marketing.gcc@kiccpa.com" className={styles.contactValue}>marketing.gcc@kiccpa.com</a>
                  <a href="mailto:sales1.gcc@kiccpa.com" className={styles.contactValue}>sales1.gcc@kiccpa.com</a>
                </span>
              </div>
              <div className={styles.contactCard} style={{ cursor: 'default' }}>
                <span className={styles.contactIcon} aria-hidden>
                  <Mail size={18} strokeWidth={2.25} />
                </span>
                <span className={styles.contactBody}>
                  <span className={styles.contactLabel}>Africa Region</span>
                  <a href="mailto:marketing.africa@kiccpa.com" className={styles.contactValue}>marketing.africa@kiccpa.com</a>
                  <a href="mailto:sales1.africa@kiccpa.com" className={styles.contactValue}>sales1.africa@kiccpa.com</a>
                </span>
              </div>
              <div className={styles.contactCard} style={{ cursor: 'default' }}>
                <span className={styles.contactIcon} aria-hidden>
                  <Phone size={18} strokeWidth={2.25} />
                </span>
                <span className={styles.contactBody}>
                  <span className={styles.contactLabel}>Call Us</span>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#f1f5f9' }}>
                    <span style={{ opacity: 0.6 }}>KU:</span>
                    <a href="tel:+96560919345" style={{ color: 'inherit', textDecoration: 'none' }}>+965 6091 9345</a>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', fontWeight: 700, color: '#f1f5f9' }}>
                    <span style={{ opacity: 0.6 }}>US:</span>
                    <a href="tel:+12524108568" style={{ color: 'inherit', textDecoration: 'none' }}>+1 252 410 8568</a>
                  </div>
                </span>
              </div>
            </div>

            <p id="footer-social-label" className={styles.socialLabel}>
              Follow
            </p>
            <nav className={styles.social} aria-labelledby="footer-social-label">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="KICCPA on LinkedIn"
              >
                <IconLinkedIn />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="KICCPA on X (Twitter)"
              >
                <IconTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label="KICCPA on Instagram"
              >
                <IconInstagram />
              </a>
            </nav>
          </div>
        </div>

        <div className={styles.floor}>
          <p className={styles.floorTagline}>Strategic arm of KAM International</p>
          <div className={styles.floorRow}>
            <p className={styles.legal}>
              © {currentYear} KICCPA (Kuwait International Company for Computer Programming Activities). All rights
              reserved.
            </p>
            <span className={styles.badge}>
              <Sparkles className={styles.badgeIcon} aria-hidden size={12} strokeWidth={2.5} />
              Where it meets AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
