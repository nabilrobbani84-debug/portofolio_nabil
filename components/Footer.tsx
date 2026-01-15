"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center space-x-8 mb-8">
          <a
            href="https://github.com/nabilrobbani84"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/nabilrobbani"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:nabilrobbani@gmail.com" // Placeholder email
            className="text-gray-400 hover:text-cyan-400 transition-colors transform hover:scale-110"
          >
            <Mail size={24} />
          </a>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Nabil Robbani. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
