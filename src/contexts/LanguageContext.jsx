import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    // Load saved language from localStorage
    try {
      const savedLang = localStorage.getItem('appLanguage');
      if (savedLang && ['EN', 'FR', 'ES', 'AR'].includes(savedLang)) {
        setLanguage(savedLang);
      }
    } catch (e) {
      // localStorage not available
    }
  }, []);

  const changeLanguage = (lang) => {
    if (['EN', 'FR', 'ES', 'AR'].includes(lang)) {
      setLanguage(lang);
      try {
        localStorage.setItem('appLanguage', lang);
      } catch (e) {
        // localStorage not available
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
