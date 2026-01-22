"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollAnimation";

export default function About() {
  return (
    <section id="about" className="py-20 relative bg-slate-900/50">
      <div className="container mx-auto px-6">
        <ScrollReveal width="100%">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                About <span className="text-cyan-400">Me</span>
            </h2>

            <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                <div className="w-48 h-48 flex-shrink-0 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse blur-md opacity-50"></div>
                <div className="relative w-full h-full bg-slate-800 rounded-full overflow-hidden border-2 border-white/20 flex items-center justify-center">
                    <span className="text-4xl">NR</span>
                    {/* Place actual image here */}
                </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                <p className="text-gray-300 leading-relaxed mb-6">
                    Mahasiswa berdedikasi tinggi dari <span className="text-cyan-400 font-semibold">STT Terpadu Nurul Fikri</span> dengan IPK <span className="text-purple-400 font-bold">3.63</span>. 
                    Memiliki passion mendalam dalam pengembangan aplikasi web user-friendly. 
                    Terus belajar teknologi terbaru untuk menciptakan solusi software berdampak positif.
                </p>

                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Education</h3>
                    <div className="border-l-2 border-cyan-500/30 pl-4 relative">
                    <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-[7px] top-1.5 shadow-[0_0_10px_#00f3ff]"></div>
                    <h4 className="font-medium text-white">Teknik Informatika</h4>
                    <p className="text-sm text-gray-400">STT Terpadu Nurul Fikri | Current</p>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
