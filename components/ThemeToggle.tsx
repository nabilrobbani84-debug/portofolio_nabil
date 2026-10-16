"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md";
}

export default function ThemeToggle({ className = "", size = "md" }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = mounted ? theme === "dark" : true;
  const isSmall = size === "sm";

  return (
    <button
      id="theme-toggle-btn"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={isDark ? "Mode Terang (Light Mode)" : "Mode Gelap (Dark Mode)"}
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${
        isSmall ? "w-9 h-9" : "w-10 h-10"
      } ${
        isDark
          ? "bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-white/10 shadow-lg shadow-black/30 hover:border-amber-400/40"
          : "bg-white/90 hover:bg-slate-100 text-sky-600 border border-slate-200/90 shadow-md shadow-sky-500/10 hover:border-sky-400/50"
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Moon size={isSmall ? 16 : 18} className="text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.4)]" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Sun size={isSmall ? 16 : 18} className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
