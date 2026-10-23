"use client";

import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { Home, User, Code, Briefcase, Award, Mail, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { name: t.nav.home, to: "home", icon: Home },
    { name: t.nav.about, to: "about", icon: User },
    { name: t.nav.skills, to: "skills", icon: Code },
    { name: t.nav.experience, to: "experience", icon: Briefcase },
    { name: t.nav.projects, to: "projects", icon: Briefcase },
    { name: t.nav.certifications, to: "certifications", icon: Award },
    { name: t.nav.contact, to: "contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop top bar (lg and up: >= 1024px) */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 hidden lg:block transition-all duration-300 ${
          scrolled
            ? "bg-white/85 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          {/* Logo / Name */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-transform group-hover:scale-105">
              NR
            </span>
            <span className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
              Nabil Robbani
            </span>
          </Link>

          {/* Nav pills */}
          <nav className="flex items-center gap-1 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-white/5 px-1.5 py-1.5 backdrop-blur-md shadow-sm dark:shadow-none">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onSetActive={() => setActiveTab(item.to)}
                className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                  activeTab === item.to
                    ? "text-sky-600 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {activeTab === item.to && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-sky-500/10 dark:bg-gradient-to-r dark:from-sky-500/20 dark:to-indigo-500/20 border border-sky-400/30 dark:border-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Actions: Language Toggle + Theme Toggle + Hire Me */}
          <div className="flex items-center gap-2.5">
            <LanguageToggle size="sm" idPrefix="desktop" />
            <ThemeToggle size="sm" />
            <Link
              to="contact"
              smooth={true}
              offset={-70}
              duration={500}
              className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-sky-500/40 cursor-pointer hover:scale-[1.03]"
            >
              {t.nav.hireMe}
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile & Tablet Top Bar (< lg: < 1024px) */}
      <header
        className={`lg:hidden fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-md shadow-slate-900/5 dark:shadow-black/20"
            : "bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border-b border-slate-200/40 dark:border-white/5"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3.5 sm:px-6">
          {/* Brand */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-white shadow-md shadow-sky-500/25">
              NR
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-900 dark:text-white max-w-[130px] sm:max-w-none truncate">
              Nabil Robbani
            </span>
          </Link>

          {/* Controls: Language & Theme Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <LanguageToggle size="sm" idPrefix="mobile" />
            <ThemeToggle size="sm" />
          </div>
        </div>
      </header>
    </>
  );
}

