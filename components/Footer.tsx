"use client";

import { Github, Linkedin, Mail, Instagram, Phone } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimation";

export default function Footer() {
  return (
    <footer id="contact" className="py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Optional background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <ScrollReveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Get in <span className="text-cyan-400">Touch</span>
            </h2>
            <p className="text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
                Feel free to reach out if you have a question, want to collaborate, or just want to connect.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
                <a href="mailto:nabilrobbani6@gmail.com" className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-cyan-500/30 group w-full md:w-auto justify-center">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                        <Mail size={20} />
                    </div>
                    <span className="text-gray-300 group-hover:text-white font-medium">nabilrobbani6@gmail.com</span>
                </a>
                <a href="tel:095777659082" className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-cyan-500/30 group w-full md:w-auto justify-center">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                        <Phone size={20} />
                    </div>
                    <span className="text-gray-300 group-hover:text-white font-medium">095777659082</span>
                </a>
            </div>

            <div className="flex justify-center space-x-6 mb-12">
            <a
                href="https://github.com/nabilrobbani84"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-slate-800 transition-all hover:-translate-y-1 border border-white/5"
                title="GitHub"
            >
                <Github size={20} />
            </a>
            <a
                href="https://linkedin.com/in/nabilrobbani"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-[#0077b5] transition-all hover:-translate-y-1 border border-white/5"
                title="LinkedIn"
            >
                <Linkedin size={20} />
            </a>
            <a
            href="https://www.instagram.com/bilrbn/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-[#E1306C] transition-all hover:-translate-y-1 border border-white/5"
                title="Instagram"
            >
                <Instagram size={20} />
            </a>
            </div>
            
            <div className="border-t border-white/5 pt-8">
                <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Nabil Robbani. All rights reserved.
                </p>
            </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
