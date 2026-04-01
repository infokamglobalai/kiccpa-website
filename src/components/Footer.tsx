import Link from "next/link";

export default function Footer() {
  return (
    <footer className="f-ultra">
      {/* ── Top Contact Glow Strip ── */}
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

      {/* ── Main Symmetric Grid ── */}
      <div className="f-grid">
        {/* Brand Anchor */}
        <div className="f-brand">
          <div className="f-logo">
            <img src="/images/kiccpa-logo.jpg" alt="KICCPA Logo" />
            <div className="flt"><span>KICC<em>PA</em></span><span className="flt-sub">AI & Engineering</span></div>
          </div>
          <p className="f-desc">
            The GCC's definitive digital transformation partner. We architect enterprise software, CRM infrastructures, and natively trained AI platforms globally.
          </p>
          <div className="f-pills">
            <span className="pill-outline">🇰🇼 Kuwait Base</span>
            <span className="pill-outline">🇮🇳 India Hub</span>
          </div>
        </div>

        {/* Directory Columns */}
        <div className="f-links-wrap">
          <div className="f-col">
            <h4>Company</h4>
            <nav className="fn-links">
              <Link href="/">Overview</Link>
              <Link href="/about">Our Heritage</Link>
              <Link href="/blog">Tech Journal</Link>
              <Link href="/contact">Partnerships</Link>
            </nav>
          </div>
          <div className="f-col">
            <h4>Solutions</h4>
            <nav className="fn-links">
              <Link href="/services">Custom Software</Link>
              <Link href="/services">Agile CRM</Link>
              <Link href="/services">LMS Architectures</Link>
              <Link href="/services">Applied AI</Link>
            </nav>
          </div>
        </div>

        {/* Dynamic Hubs & Social */}
        <div className="f-meta-col">
          <div className="f-hubs">
            <h4>Operational Hubs</h4>
            <div className="hub-grid">
              <div className="hub-c">
                <strong>HQ Suite</strong>
                <p>20408 Tunisia St, Hawally, Kuwait.</p>
              </div>
              <div className="hub-c">
                <strong>Dev Branch</strong>
                <p>RT Nagar, Bangalore, India.</p>
              </div>
            </div>
          </div>
          <div className="f-social">
            <h4>Network</h4>
            <div className="soc-row">
              <a href="https://linkedin.com" target="_blank" className="s-btn">in</a>
              <a href="https://twitter.com" target="_blank" className="s-btn">𝕏</a>
              <a href="https://instagram.com" target="_blank" className="s-btn">ig</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Legal Floor ── */}
      <div className="f-floor">
        <p className="cc-text">© 2026 KICCPA (Kuwait International Company for Computer Programming Activities). Strategic arm of KAM International.</p>
        <div className="f-legal-links">
          <Link href="/privacy">Privacy</Link>
          <span className="f-dot"></span>
          <Link href="/terms">Terms</Link>
          <span className="f-dot"></span>
          <Link href="/security">Security</Link>
        </div>
      </div>
    </footer>
  );
}
