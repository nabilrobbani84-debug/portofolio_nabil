"use client";

import { GraduationCap, MapPin, Code2, Rocket, Users, Sparkles } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimation";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    desc: "Menulis kode yang rapi, terstruktur, dan mudah dikembangkan tim.",
  },
  {
    icon: Rocket,
    title: "Fast Learner",
    desc: "Cepat beradaptasi dengan teknologi dan tools baru sesuai kebutuhan.",
  },
  {
    icon: Users,
    title: "Team Player",
    desc: "Terbiasa berkolaborasi lintas fungsi dan memimpin tim media.",
  },
  {
    icon: Sparkles,
    title: "Detail-Oriented",
    desc: "Fokus pada UX, performa, dan kualitas hasil akhir produk.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-14">
            <span className="eyebrow">About Me</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
              Get to know <span className="text-gradient">me better</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: profile + education */}
          <ScrollReveal width="100%" className="lg:col-span-2">
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-40 h-40 relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-2xl blur-md opacity-40" />
                <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gradient">NR</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white">Nabil Robbani</h3>
              <p className="text-sm text-sky-400 font-medium mb-4">
                Software Engineer
              </p>

              <div className="w-full space-y-3 text-left mt-2">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <GraduationCap size={18} className="text-sky-400 shrink-0" />
                  <span>Informatics Engineering — GPA 3.63</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MapPin size={18} className="text-sky-400 shrink-0" />
                  <span>STT Terpadu Nurul Fikri, Indonesia</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: bio + highlights */}
          <ScrollReveal width="100%" className="lg:col-span-3" delay={0.15}>
            <div className="glass-card p-8 rounded-2xl h-full">
              <p className="text-gray-300 leading-relaxed mb-4">
                Saya seorang mahasiswa Teknik Informatika di{" "}
                <span className="text-sky-400 font-semibold">STT Terpadu Nurul Fikri</span>{" "}
                dengan IPK <span className="text-indigo-400 font-bold">3.63</span> yang
                memiliki passion mendalam dalam pengembangan aplikasi web modern dan
                user-friendly.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Berpengalaman membangun aplikasi frontend maupun fullstack menggunakan
                React, Next.js, dan Laravel. Saya senang mengubah ide menjadi produk
                nyata yang berdampak, sambil terus belajar teknologi terbaru untuk
                menghasilkan solusi software berkualitas tinggi.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((h) => (
                  <div
                    key={h.title}
                    className="group flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-sky-500/30 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                      <h.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm mb-0.5">
                        {h.title}
                      </h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
