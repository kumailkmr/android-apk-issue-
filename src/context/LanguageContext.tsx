"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, mockLanguages } from '@/data/mockData';

type LanguageCode = 'en' | 'ur' | 'ps' | 'ks';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    const selectedLang = mockLanguages.find(l => l.code === lang);
    if (selectedLang) {
      setDir(selectedLang.dir as 'ltr' | 'rtl');
    }
  };

  useEffect(() => {
    // Sync language direction with body tags if client-side
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const t = (key: string): string => {
    const langTrans = translations[language] || translations['en'];
    return langTrans[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={dir === 'rtl' ? 'font-urdu font-medium' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
