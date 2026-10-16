"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (typeof translations)["id"];
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("portfolio_lang") as Language | null;
      if (stored === "id" || stored === "en") {
        setLangState(stored);
        document.documentElement.lang = stored;
      } else {
        // Detect system preference or default to ID
        const browserLang = navigator.language.toLowerCase();
        const detected: Language = browserLang.startsWith("id") ? "id" : "en";
        setLangState(detected);
        document.documentElement.lang = detected;
      }
    } catch {
      setLangState("id");
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("portfolio_lang", newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore localStorage issues
    }
  };

  const toggleLang = () => {
    const nextLang: Language = lang === "id" ? "en" : "id";
    setLang(nextLang);
  };

  const currentTranslations = translations[lang] || translations.id;

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        t: currentTranslations,
        mounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
