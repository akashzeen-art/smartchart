import React, { useState } from "react";
import styles from "./AuthModal.module.css";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../translations/translations";

const AuthModal = ({ isOpen, onClose, initialMode = "signin", onLogin }) => {
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      alert(t.authModal.passwordsDontMatch);
      return;
    }
    // Handle authentication logic here
    console.log(`${mode} attempt:`, formData);
    
    // Simulate successful login
    if (mode === "signin" && onLogin) {
      onLogin();
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setFormData({ email: "", password: "", confirmPassword: "", fullName: "" });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button> 
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {mode === "signin" ? t.authModal.welcomeBack : t.authModal.createAccount}
          </h2>
          <p className={styles.modalSubtitle}>
            {mode === "signin" 
              ? t.authModal.signInSubtitle
              : t.authModal.signUpSubtitle
            }
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {mode === "signup" && (
            <div className={styles.formGroup}>
              <label htmlFor="fullName" className={styles.label}>{t.authModal.fullName}</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={t.authModal.enterFullName}
                required
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>{t.authModal.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.input}
              placeholder={t.authModal.enterEmail}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>{t.authModal.password}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={styles.input}
              placeholder={t.authModal.enterPassword}
              required
            />
          </div>

          {mode === "signup" && (
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>{t.authModal.confirmPassword}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={t.authModal.confirmPasswordPlaceholder}
                required
              />
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            {mode === "signin" ? t.authModal.signIn : t.authModal.createAccount}
          </button>
        </form>

        <div className={styles.modalFooter}>
          <p className={styles.switchText}>
            {mode === "signin" ? t.authModal.dontHaveAccount : t.authModal.alreadyHaveAccount}
            <button className={styles.switchButton} onClick={switchMode}>
              {mode === "signin" ? t.authModal.signUp : t.authModal.signIn}
            </button>
          </p>
        </div>

        {mode === "signin" && (
          <div className={styles.forgotPassword}>
            <button className={styles.forgotButton}>{t.authModal.forgotPassword}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
