import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer-ultra">
      {/* ── Top Contact Strip ── */}
      <div className="footer-top-strip">
        <div className="f-strip-item">
          <div className="f-icon-box">📧</div>
          <div className="f-item-content">
            <span className="f-label">General Inquiries</span>
            <div className="f-links-row">
              <a href="mailto:info@kiccpa.com">info@kiccpa.com</a>
              <span className="f-sep">•</span>
              <a href="mailto:info@kamglobalai.com">info@kamglobalai.com</a>
            </div>
          </div>
        </div>
        <div className="f-strip-item">
          <div className="f-icon-box">🔧</div>
          <div className="f-item-content">
            <span className="f-label">IT Support Team</span>
            <a href="mailto:itsupport@eduaitutors.com" className="f-highlight">itsupport@eduaitutors.com</a>
          </div>
        </div>
        <div className="f-strip-item hubs-links">
          <a href="https://www.kamglobalai.com" target="_blank" rel="noopener noreferrer">🌐 kamglobalai.com</a>
          <a href="https://www.eduaitutors.com" target="_blank" rel="noopener noreferrer">🎓 eduaitutors.com</a>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="fg footer-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="fl-logo">
            <img src="/images/kiccpa-logo.jpg" alt="KICCPA" style={{ height: '48px', width: 'auto' }} />
            <span>KICC<em>PA</em></span>
          </div>
          <p className="fl-desc">
            The GCC's premier digital transformation partner, delivering scalable software, CRM, LMS, and AI solutions globally — a strategic arm of KAM International Group.
          </p>
          <div className="fl-pills">
            <span className="fl-pill">🇰🇼 Kuwait HQ</span>
            <span className="fl-pill">🇮🇳 India Hub</span>
            <span className="fl-pill">🌐 Global</span>
          </div>
        </div>

        {/* Company Links */}
        <div className="fc">
          <h4>Company</h4>
          <ul className="flinks">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/blog">Tech Insights</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="fc">
          <h4>Services</h4>
          <ul className="flinks">
            <li><Link href="/services">Custom Software</Link></li>
            <li><Link href="/services">CRM Solutions</Link></li>
            <li><Link href="/services">LMS Platforms</Link></li>
            <li><Link href="/services">AI Solutions</Link></li>
          </ul>
        </div>

        {/* Office Hubs Column */}
        <div className="footer-col">
          <div className="fc-h row-flex">
            <h4 className="fc-h4">Office Hubs</h4>
          </div>
          <div className="office-grid">
            <div className="office-item">
              <span className="office-tag">🇰🇼 Kuwait HQ</span>
              <p>20408 Tunisia St, Hawally, Kuwait.</p>
              <a href="tel:+96522087764">+965 22087764</a>
            </div>
            <div className="office-item">
              <span className="office-tag">🇮🇳 India Hub</span>
              <p>No 544, 3rd cross, RT Nagar, Bangalore.</p>
              <a href="tel:+918050766363">+91 80507 66363</a>
            </div>
          </div>
        </div>

        {/* Social Connect Column */}
        <div className="footer-col">
          <div className="fc-h row-flex" style={{ marginBottom: '24px' }}>
            <h4 className="fc-h4">Social Connect</h4>
          </div>
          <div className="social-grid">
            <a href="https://linkedin.com" target="_blank" className="social-link">
              <span>LinkedIn</span>
            </a>
            <a href="https://twitter.com" target="_blank" className="social-link">
              <span>𝕏 / Twitter</span>
            </a>
            <a href="https://instagram.com" target="_blank" className="social-link">
              <span>Instagram</span>
            </a>
            <a href="https://facebook.com" target="_blank" className="social-link">
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fbot">
        <div className="fbot-content">
          <div className="f-left-placeholder"></div>
          <p>© 2026 KICCPA (Kuwait International Company for Computer Programming Activities). All Rights Reserved.</p>
          <div className="f-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/security">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
