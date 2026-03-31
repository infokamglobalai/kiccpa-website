"use client";

import { useEffect, useState } from "react";
import { submitContactAction } from "@/lib/actions";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('vis'); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.rv').forEach(el => io.observe(el));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Thank you! Your inquiry has been received. Our team will contact you shortly.");
  };

  return (
    <>
      <section 
        className="sub-p-hero rv vis" 
        style={{ backgroundImage: 'url("/images/hero_contact.png")' }}
      >
        <div className="sec-eyebrow" style={{ color: "var(--OR)", fontWeight: 800 }}>Get In Touch</div>
        <h2>Start Your Digital <em>Transformation</em></h2>
        <p>Whether you need a dedicated agile team, a custom CRM, or enterprise AI automation, our global engineers are ready to build it.</p>
      </section>

      <section className="inst-section rv" style={{ alignItems: "flex-start" }}>
        <div className="inst-left">
          <div className="sec-eyebrow">Contact Information</div>
          <h2><em>Global</em> Presence</h2>
          <p>Reach out to our strategic hubs for immediate technical consultation or business partnerships.</p>

          {/* Kuwait */}
          <div className="ben-row" style={{ marginTop: "24px" }}>
            <div className="ben-ico bi1">🇰🇼</div>
            <div className="ben-text">
              <h4>KAM Groups — Kuwait HQ</h4>
              <p style={{ lineHeight: 1.9 }}>
                20408 Tunisia St, Hawally, Kuwait.<br/>
                📞 <a href="tel:+96522087764" style={{ color: "var(--P)", fontWeight: 600 }}>+965 22087764</a><br/>
                ✉️ <a href="mailto:info@kamgroups.com" style={{ color: "var(--P)", fontWeight: 600 }}>info@kamgroups.com</a> &nbsp;·&nbsp;
                <a href="mailto:info@kiccpa.com" style={{ color: "var(--P)", fontWeight: 600 }}>info@kiccpa.com</a>
              </p>
            </div>
          </div>

          {/* India */}
          <div className="ben-row">
            <div className="ben-ico bi2">🇮🇳</div>
            <div className="ben-text">
              <h4>KAM Global — India Dev Hub</h4>
              <p style={{ lineHeight: 1.9 }}>
                No 544, 3rd Cross, 3rd Main, Above TMC Bank,<br/>
                RT Nagar, Bangalore – 560032.<br/>
                📞 <a href="tel:+918050766363" style={{ color: "var(--P)", fontWeight: 600 }}>+91 80507 66363</a><br/>
                ✉️ <a href="mailto:info@kamglobalai.com" style={{ color: "var(--P)", fontWeight: 600 }}>info@kamglobalai.com</a>
              </p>
            </div>
          </div>

          {/* EduAiTutors Support */}
          <div className="ben-row" style={{ border: "none" }}>
            <div className="ben-ico bi3">🎓</div>
            <div className="ben-text">
              <h4>EduAiTutors — Platform Support</h4>
              <p style={{ lineHeight: 1.9 }}>
                ✉️ <a href="mailto:info@eduaitutors.com" style={{ color: "var(--P)", fontWeight: 600 }}>info@eduaitutors.com</a><br/>
                🛠️ IT Support: <a href="mailto:itsupport@eduaitutors.com" style={{ color: "var(--OR)", fontWeight: 700 }}>itsupport@eduaitutors.com</a><br/>
                🌐 <a href="https://www.eduaitutors.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--P)", fontWeight: 600 }}>www.eduaitutors.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="inst-card rv d2" style={{ textAlign: "left", background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(20px)", border: "1px solid var(--BR)", boxShadow: "0 20px 50px rgba(27,67,112,0.12)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "20px", color: "var(--P)" }}>Send us a Message</h3>
          
          {status ? (
            <div style={{ padding: "20px", background: "var(--PL)", color: "var(--PD)", borderRadius: "10px", fontWeight: "bold" }}>
              {status}
            </div>
          ) : (
            <form 
              action={async (formData) => {
                const res = await submitContactAction(formData);
                if (res.error) {
                  alert(res.error);
                } else if (res.success) {
                  setStatus("Thank you! Your inquiry has been received. Our team will contact you shortly.");
                }
              }} 
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div>
                <label style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--T2)", display: "block", marginBottom: "4px" }}>Full Name</label>
                <input required name="name" type="text" placeholder="John Doe" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1.5px solid var(--BR)", background: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "var(--font-b)" }} />
              </div>
              <div>
                <label style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--T2)", display: "block", marginBottom: "4px" }}>Work Email</label>
                <input required name="email" type="email" placeholder="john@company.com" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1.5px solid var(--BR)", background: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "var(--font-b)" }} />
              </div>
              <div>
                <label style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--T2)", display: "block", marginBottom: "4px" }}>Project Scope</label>
                <select name="scope" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1.5px solid var(--BR)", background: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "var(--font-b)" }}>
                  <option>Software Development</option>
                  <option>CRM / ERP System</option>
                  <option>LMS Platform</option>
                  <option>AI Automation</option>
                  <option>Dedicated Team (Agile)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--T2)", display: "block", marginBottom: "4px" }}>Message</label>
                <textarea required name="message" rows={4} placeholder="Tell us about your requirements..." style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1.5px solid var(--BR)", background: "rgba(255,255,255,0.9)", outline: "none", fontFamily: "var(--font-b)", resize: "vertical" }} />
              </div>
              <button type="submit" className="btn-enroll" style={{ marginTop: "10px", width: "100%", background: 'linear-gradient(135deg, var(--OR), var(--OR2))', boxShadow: '0 10px 20px rgba(255,130,63,0.3)' }}>Submit Inquiry →</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
