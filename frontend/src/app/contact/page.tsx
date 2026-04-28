"use client";

import { useState, useEffect } from "react";
import SubPageHero from "@/components/SubPageHero/SubPageHero";
import FaqSection from "@/components/FaqSection/FaqSection";
import styles from "./ContactPage.module.css";
import { submitContactAction } from "@/lib/actions";
import { 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  Rocket, 
  Users, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.rv').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <SubPageHero
        variant="contact"
        eyebrow="Get in touch"
        title={
          <>
            Start Your Digital <em>Transformation</em>
          </>
        }
      >
        Whether you need a dedicated agile team, a custom CRM, or enterprise AI
        automation, our global engineers are ready to build it.
      </SubPageHero>

      <section className={`${styles.contactSection} rv`}>
        <div className={styles.leftSide}>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Mail size={24} />
              </div>
              <div className={styles.cardContent}>
                <h4>EMAIL US</h4>
                <div className={styles.phoneGroup}>
                  <div className={styles.phoneRegion}>
                    <span>GCC REGION</span>
                    <a href="mailto:marketing.gcc@kiccpa.com">marketing.gcc@kiccpa.com</a>
                    <a href="mailto:sales1.gcc@kiccpa.com">sales1.gcc@kiccpa.com</a>
                  </div>
                  <div className={styles.phoneRegion}>
                    <span>AFRICA REGION</span>
                    <a href="mailto:marketing.africa@kiccpa.com">marketing.africa@kiccpa.com</a>
                    <a href="mailto:sales1.africa@kiccpa.com">sales1.africa@kiccpa.com</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Phone size={24} />
              </div>
              <div className={styles.cardContent}>
                <h4>CALL US</h4>
                <div className={styles.phoneGroup}>
                  <div className={styles.phoneRegion}>
                    <span>KUWAIT</span>
                    <a href="tel:+96560919345">+965 6091 9345</a>
                    <a href="tel:+96560780180">+965 6078 0180</a>
                    <a href="tel:+96598793440">+965 9879 3440</a>
                  </div>
                  <div className={styles.phoneRegion}>
                    <span>USA</span>
                    <a href="tel:+12524108568">+1 252 410 8568</a>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Clock size={24} />
              </div>
              <div className={styles.cardContent}>
                <h4>RESPONSE TIME</h4>
                <p>Usually within 24 hours</p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <MapPin size={24} />
              </div>
              <div className={styles.cardContent}>
                <h4>OUR OFFICE</h4>
                <p>Kuwait & India</p>
              </div>
            </div>
          </div>

          <div className={`${styles.regionalStrip} rv d3`}>
            <div className={styles.stripLeft}>
              <Globe size={20} className={styles.stripIcon} />
              <div className={styles.stripText}>
                <h4>REGIONS WE SERVE</h4>
                <p>Global coverage — focusing on GCC & India markets</p>
              </div>
            </div>
            <ArrowRight size={20} className={styles.stripArrow} />
          </div>

          <div className={`${styles.expectationsCard} rv d4`}>
            <div className={styles.expectHeader}>
              <CheckCircle2 size={24} className={styles.checkIcon} />
              <h3>What to expect</h3>
            </div>
            <ul className={styles.expectList}>
              <li>
                <div className={styles.bulletPoint} />
                <p>Every message is read and routed to the right domain specialist.</p>
              </li>
              <li>
                <div className={styles.bulletPoint} />
                <p>A concise reply—usually within one business day.</p>
              </li>
              <li>
                <div className={styles.bulletPoint} />
                <p>Interactive demos scheduled at your convenience, with no pressure.</p>
              </li>
            </ul>
          </div>

          <div className={styles.benefitGrid}>
            <div className={styles.benefitCard}>
              <Rocket size={20} />
              <div>
                <h5>Fast Track</h5>
                <p>Deployment in 8–24 weeks</p>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <Users size={20} />
              <div>
                <h5>Agile Squads</h5>
                <p>Dedicated talent from day one</p>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <MessageSquare size={20} />
              <div>
                <h5>Global Support</h5>
                <p>English & Arabic native speakers</p>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <Sparkles size={20} />
              <div>
                <h5>AI Native</h5>
                <p>Intelligent architecture by default</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.formSide} rv d2`}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2>Let&apos;s talk roadmap</h2>
              <p>Tell us about your goals and we&apos;ll get back with a clear execution plan.</p>
            </div>

            {status ? (
              <div className={styles.successState}>
                <CheckCircle2 size={48} />
                <h3>Message Received</h3>
                <p>{status}</p>
              </div>
            ) : (
              <form 
                className={styles.form}
                action={async (formData) => {
                  const res = await submitContactAction(formData);
                  if (res.error) {
                    alert(res.error);
                  } else if (res.success) {
                    setStatus("Your inquiry has been received. Our specialists will contact you shortly.");
                  }
                }}
              >
                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Full Name</label>
                    <input required name="name" type="text" placeholder="John Doe" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Work Email</label>
                    <input required name="email" type="email" placeholder="john@company.com" />
                  </div>
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label>Organization</label>
                    <input name="organization" type="text" placeholder="Your Company" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Inquiry Topic</label>
                    <input name="topic" type="text" placeholder="Project, Demo, etc." />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Message</label>
                  <textarea required name="message" rows={5} placeholder="How can we help your business?" />
                </div>

                <div className={styles.formFooter}>
                  <button type="submit" className={styles.submitBtn}>
                    Initiate Contact <ArrowRight size={18} />
                  </button>
                  <div className={styles.formMailBox}>
                    <Mail size={22} />
                  </div>
                </div>

                <p className={styles.finePrint}>
                  By submitting this form, you agree to our privacy policy and terms.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
