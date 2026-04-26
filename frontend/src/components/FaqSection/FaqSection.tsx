import styles from './FaqSection.module.css';

const faqs = [
  {
    question: "What happens after I send a message?",
    answer: "Our team will review your requirements and get back to you within 1-2 business days with a tailored plan or to schedule a discovery call."
  },
  {
    question: "Can I request a product demo?",
    answer: "Absolutely. We offer personalized demos for our LMS platform, CRM solutions, and AI automation tools. Simply mention it in your message."
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, we serve clients globally with strategic hubs in Kuwait and India, ensuring coverage across different time zones and markets."
  },
  {
    question: "What is the typical project timeline?",
    answer: "Timelines vary by scope, but most dedicated team setups happen within 1-2 weeks, while custom software projects typically go live in 8-24 weeks."
  }
];

export default function FaqSection() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.dot}></span>
            BEFORE YOU WRITE
          </div>
          <h2 className={styles.title}>Frequently asked questions</h2>
        </div>
        
        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <details key={index} className={styles.faqItem}>
              <summary className={styles.question}>
                {faq.question}
                <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </summary>
              <div className={styles.answer}>
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
