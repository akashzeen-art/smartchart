import React from "react";
import styles from "./TransformSection.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

const TransformSection = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  return (
    <section className={styles.wrapper} aria-labelledby="transform-title">
      <div className={styles.container}>
        <p className={styles.kicker}>{t.transformSection.kicker}</p>
        <h2 id="transform-title" className={styles.title}>
          {t.transformSection.title}
          <br />
          {t.transformSection.titleLine2}
        </h2>
        <p className={styles.subtitle}>
          {t.transformSection.subtitle}
        </p>
        <div className={styles.ctaRow}>
          <a href="#start" className={styles.ctaPrimary}>{t.transformSection.generateStory}</a>
        </div>
      </div>
      <div className={styles.orb} aria-hidden="true" />
    </section>
  );
};

export default TransformSection;
