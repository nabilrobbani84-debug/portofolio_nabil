"use client";

import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { Menu, X, Home, User, Code, Briefcase, Award, Mail } from "lucide-react";

const navItems = [
  { name: "Home", to: "home", icon: Home },
  { name: "About", to: "about", icon: User },
  { name: "Skills", to: "skills", icon: Code },
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
      <motion.nav
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-1/2 top-6 z-50 transform -translate-x-1/2 hidden md:flex items-center gap-1 rounded-full px-2 py-2 border border-white/10 ${
          scrolled ? "bg-black/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/10" : "bg-white/5 backdrop-blur-sm"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            spy={true}
            smooth={true}
            duration={500}
            onSetActive={() => setActiveTab(item.to)}
            className={`relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors duration-300 ${
              activeTab === item.to
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
           {activeTab === item.to && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
                {/* Optional: Show icon only on active or hover? Sticking to text for cleaner look, Icons for mobile */}
                {item.name}
            </span>
          </Link>
        ))}
      </motion.nav>

      {/* Mobile Nav Trigger */}
      <div className="md:hidden fixed top-6 right-6 z-50">
           <button 
             onClick={() => setIsOpen(!isOpen)} 
             className="p-3 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg"
           >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
      </div>

       {/* Mobile Menu Overlay */}
       {isOpen && (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 z-40 bg-slate-900/95 backdrop-blur-xl rounded-2xl flex flex-col items-center justify-center space-y-8 border border-white/10 md:hidden"
        >
             {navItems.map((item) => (
                <Link
                    key={item.name}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-2xl font-bold text-gray-300 active:text-cyan-400"
                >
                    <item.icon size={28} />
                    {item.name}
                </Link>
             ))}
        </motion.div>
       )}
    </>
  );
}
