"use client";

import { Github, Linkedin, Mail, Instagram, Phone } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimation";

const WA_NUMBER = "628577111166079";
const WA_MESSAGE = "Halo Nabil, saya tertarik untuk berkolaborasi dengan Anda!";

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

            {/* Contact Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-16">
                {/* Email */}
                <a
                  href="mailto:nabilrobbani6@gmail.com"
                  id="contact-email"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-cyan-500/30 group w-full md:w-auto justify-center"
                >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                        <Mail size={20} />
                    </div>
                    <span className="text-gray-300 group-hover:text-white font-medium">nabilrobbani6@gmail.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+628577111166079"
                  id="contact-phone"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 hover:border-emerald-500/30 group w-full md:w-auto justify-center"
                >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                        <Phone size={20} />
                    </div>
                    <span className="text-gray-300 group-hover:text-white font-medium">0857-7111-66079</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
                  id="contact-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-all border border-[#25D366]/20 hover:border-[#25D366]/50 group w-full md:w-auto justify-center"
                >
                    <div className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] group-hover:bg-[#25D366]/30 transition-colors">
                        {/* WhatsApp SVG Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </div>
                    <span className="text-[#25D366] group-hover:text-white font-medium transition-colors">Chat via WhatsApp</span>
                </a>
            </div>

            {/* Social Links */}
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
            {/* WhatsApp Social Icon */}
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-[#25D366] hover:bg-[#25D366]/20 transition-all hover:-translate-y-1 border border-white/5"
              title="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
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
