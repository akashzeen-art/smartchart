import React, { useState } from "react";
import styles from "./FAQ.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

const FAQ = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = t.faq.questions;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <h2 className={styles.faqTitle}>{t.faq.title}</h2>
        
        <div className={styles.faqList}>
          {faqData.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={`${styles.faqQuestion} ${openIndex === index ? styles.active : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.q}</span>
                <span className={styles.faqIcon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              <div className={`${styles.faqAnswer} ${openIndex === index ? styles.open : ''}`}>
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
