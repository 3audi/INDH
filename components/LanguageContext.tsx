import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '../data/translations';
import { useContent } from './ContentContext';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { translations } = useContent(); // Use dynamic translations
  
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language');
      return (savedLang as Language) || 'ar';
    }
    return 'ar';
  });

  const [dir, setDir] = useState<'rtl' | 'ltr'>('rtl');

  useEffect(() => {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    setDir(direction);
    
    // Update HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    
    // Persist preference
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    // Access dynamic translation from Context
    // @ts-ignore
    const translationSet = translations[language] || translations['ar'];
    // @ts-ignore
    return translationSet?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};