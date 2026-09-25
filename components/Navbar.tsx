"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { Menu, X, Home, User, Code, Briefcase, Award, Mail, ArrowUpRight } from "lucide-react";

const navItems = [
  { name: "Home", to: "home", icon: Home },
  { name: "About", to: "about", icon: User },
  { name: "Skills", to: "skills", icon: Code },
  { name: "Experience", to: "experience", icon: Briefcase },
  { name: "Projects", to: "projects", icon: Briefcase },
  { name: "Certifications", to: "certifications", icon: Award },
  { name: "Contact", to: "contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

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
            ? "bg-slate-950/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
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
            <span className="text-sm font-semibold tracking-wide text-white">
              Nabil Robbani
            </span>
          </Link>

          {/* Nav pills */}
          <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1.5 py-1.5 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                onSetActive={() => setActiveTab(item.to)}
                className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-full cursor-pointer transition-colors duration-300 ${
                  activeTab === item.to ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {activeTab === item.to && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border border-white/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            to="contact"
            smooth={true}
            offset={-70}
            duration={500}
            className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 text-[13px] font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-sky-500/40 cursor-pointer"
          >
            Hire Me
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </motion.header>

      {/* Mobile Nav Trigger */}
      <div className="md:hidden fixed top-5 right-5 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="p-3 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile brand */}
      <div className="md:hidden fixed top-5 left-5 z-50">
        <div className="flex items-center gap-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 px-3 py-2 shadow-lg">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 text-[10px] font-bold text-white">
            NR
          </span>
          <span className="text-xs font-semibold text-white">Nabil Robbani</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 z-40 bg-slate-900/95 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center space-y-6 border border-white/10 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                offset={-70}
                smooth={true}
                duration={500}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-2xl font-bold text-gray-300 active:text-sky-400"
              >
                <item.icon size={26} />
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
