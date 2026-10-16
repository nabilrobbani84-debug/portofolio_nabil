"use client";

import React from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

interface LanguageToggleProps {
  className?: string;
  size?: "sm" | "md";
  showIcon?: boolean;
  idPrefix?: string;
}

export default function LanguageToggle({
  className = "",
  size = "md",
  showIcon = false,
  idPrefix = "default",
}: LanguageToggleProps) {
  const { lang, setLang, mounted } = useLanguage();

  const isSmall = size === "sm";
  const activeLang = mounted ? lang : "id";

  return (
    <div
      role="group"
      aria-label="Pilih Bahasa / Select Language"
      className={`relative inline-flex items-center rounded-full p-0.5 transition-all duration-300 border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm ${
        isSmall ? "h-9" : "h-10"
      } ${className}`}
    >
      {showIcon && (
        <span className="pl-2 pr-1 text-slate-400 dark:text-slate-500">
          <Languages size={isSmall ? 14 : 16} />
        </span>
      )}

      {/* ID Button */}
      <button
        id={`lang-btn-id-${idPrefix}`}
        type="button"
        onClick={() => setLang("id")}
        aria-label="Ganti ke Bahasa Indonesia"
        aria-pressed={activeLang === "id"}
        className={`relative z-10 rounded-full font-bold transition-colors duration-200 cursor-pointer flex items-center justify-center ${
          isSmall ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
        } ${
          activeLang === "id"
            ? "text-white"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        {activeLang === "id" && (
          <motion.div
            layoutId={`lang-active-pill-${idPrefix}`}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 tracking-wider">ID</span>
      </button>

      {/* EN Button */}
      <button
        id={`lang-btn-en-${idPrefix}`}
        type="button"
        onClick={() => setLang("en")}
        aria-label="Switch to English"
        aria-pressed={activeLang === "en"}
        className={`relative z-10 rounded-full font-bold transition-colors duration-200 cursor-pointer flex items-center justify-center ${
          isSmall ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
        } ${
          activeLang === "en"
            ? "text-white"
            : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        {activeLang === "en" && (
          <motion.div
            layoutId={`lang-active-pill-${idPrefix}`}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 shadow-sm"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 tracking-wider">EN</span>
      </button>
    </div>
  );
}
