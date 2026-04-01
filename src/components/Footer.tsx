import Link from "next/link";

export default function Footer() {
  return (
    <footer className="f-ultra">
      {/* ── Top Contact Glow Strip (As per Image) ── */}
      <div className="f-top glow-pane">
        <div className="ft-item">
          <div className="f-icon-bubble">📧</div>
          <div className="ft-text">
            <span>General Inquiries</span>
            <a href="mailto:info@kiccpa.com">info@kiccpa.com</a>
          </div>
        </div>
        <div className="ft-item">
          <div className="f-icon-bubble">🔧</div>
          <div className="ft-text">
            <span>IT Support Team</span>
            <a href="mailto:itsupport@eduaitutors.com" className="ft-hl">itsupport@eduaitutors.com</a>
          </div>
        </div>
        <div className="ft-subs">
          <a href="https://www.kamglobalai.com" target="_blank" className="hub-badge web-kam"><span>KAM Global</span> ↗</a>
          <a href="https://www.eduaitutors.com" target="_blank" className="hub-badge web-edu"><span>EduAiTutors</span> ↗</a>
        </div>
      </div>

      {/* ── Main Symmetric Grid (3-Column Layout) ── */}
      <div className="f-grid">
        {/* Column 1: Brand Anchor */}
        <div className="f-brand">
          <div className="f-logo">
            <img src="/images/kiccpa-logo.jpg" alt="KICCPA Logo" />
          </div>
          <p className="f-desc">
            The GCC's definitive digital transformation partner. We architect enterprise software and natively trained AI platforms globally.
          </p>
        </div>

        {/* Column 2: Site Directory */}
        <div className="f-links-wrap">
          <div className="f-col">
            <h4>Company</h4>
            <nav className="fn-links">
              <Link href="/">Overview</Link>
              <Link href="/about">Heritage</Link>
              <Link href="/contact">Partnerships</Link>
            </nav>
          </div>
          <div className="f-col">
            <h4>Solutions</h4>
            <nav className="fn-links">
              <Link href="/services">Custom Software</Link>
              <Link href="/services">Agile CRM</Link>
              <Link href="/services">Applied AI</Link>
            </nav>
          </div>
        </div>

        {/* Column 3: Connect Area (Standard Grid/Column) */}
        <div className="f-connect">
          <h4>Connect</h4>
          <div className="f-connect-wrap">
            <div className="fc-info">
              <a href="mailto:info@kiccpa.com" className="f-email-connect">info@kiccpa.com</a>
              <div className="f-pills-col">
                <span className="pill-outline">🇰🇼 Kuwait Base</span>
                <span className="pill-outline">🇮🇳 India Hub</span>
              </div>
            </div>
            <nav className="f-social-column">
              <a href="https://linkedin.com" target="_blank" className="s-link-full">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" className="s-link-full">X (Twitter)</a>
              <a href="https://instagram.com" target="_blank" className="s-link-full">Instagram</a>
            </nav>
          </div>
        </div>
      </div>

      {/* ── Legal Floor (Clean) ── */}
      <div className="f-floor">
        <p className="cc-text">© 2026 KICCPA (Kuwait International Company for Computer Programming Activities). Strategic arm of KAM International.</p>
      </div>
    </footer>
  );
}
