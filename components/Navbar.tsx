"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { Menu, X, Home, User, Code, Briefcase, Award, Mail, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

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
      {/* Desktop top bar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-50 hidden md:block transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-900/5 dark:shadow-black/20"
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
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 text-sm font-bold text-white shadow-lg shadow-sky-500/25">
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

      {/* Mobile Top Controls */}
      <div className="md:hidden fixed top-5 right-5 z-50 flex items-center gap-2">
        <LanguageToggle size="sm" idPrefix="mobile" />
        <ThemeToggle size="sm" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="p-2.5 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-white/10 rounded-full text-slate-800 dark:text-white shadow-lg"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile brand */}
      <div className="md:hidden fixed top-5 left-5 z-50">
        <div className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-white/10 px-3 py-2 shadow-lg">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 text-[10px] font-bold text-white">
            NR
          </span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white">Nabil Robbani</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center space-y-5 border border-slate-200/90 dark:border-white/10 md:hidden shadow-2xl"
          >
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                offset={-70}
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-xl font-bold text-slate-700 hover:text-sky-600 dark:text-gray-300 dark:hover:text-sky-400 active:text-sky-500 transition-colors"
              >
                <item.icon size={22} className="text-sky-500" />
                {item.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {t.nav.selectLang}
                </span>
                <LanguageToggle size="md" idPrefix="drawer" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {t.nav.selectMode}
                </span>
                <ThemeToggle size="md" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

