"use client";

import { GraduationCap, MapPin, Code2, Rocket, Users, Sparkles } from "lucide-react";
import { ScrollReveal, Parallax, ParallaxBlob } from "./ScrollAnimation";
import { useLanguage } from "./LanguageProvider";

const highlightIcons = [Code2, Rocket, Users, Sparkles];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Parallax background blobs */}
      <ParallaxBlob
        offset={140}
        x={40}
        className="absolute -top-20 -left-10 w-80 h-80 rounded-full bg-sky-500/10 blur-[120px] pointer-events-none"
      />
      <ParallaxBlob
        offset={-100}
        x={-30}
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-14">
            <span className="eyebrow">{t.about.eyebrow}</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              {t.about.titlePrefix} <span className="text-gradient">{t.about.titleGradient}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left: profile + education (gentle parallax lift) */}
          <Parallax offset={40} className="lg:col-span-2">
            <ScrollReveal width="100%">
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
              <div className="w-40 h-40 relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-2xl blur-md opacity-40" />
                <div className="relative w-full h-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gradient">NR</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nabil Robbani</h3>
              <p className="text-sm text-sky-500 dark:text-sky-400 font-medium mb-4">
                {t.about.role}
              </p>

              <div className="w-full space-y-3 text-left mt-2">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
                  <GraduationCap size={18} className="text-sky-500 dark:text-sky-400 shrink-0" />
                  <span>{t.about.education}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-300">
                  <MapPin size={18} className="text-sky-500 dark:text-sky-400 shrink-0" />
                  <span>{t.about.institution}</span>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </Parallax>

          {/* Right: bio + highlights */}
          <ScrollReveal width="100%" className="lg:col-span-3" delay={0.15}>
            <div className="glass-card p-8 rounded-2xl h-full">
              <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4">
                {t.about.bio1}
              </p>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-8">
                {t.about.bio2}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {t.about.highlights.map((h, idx) => {
                  const Icon = highlightIcons[idx] || Sparkles;
                  return (
                    <div
                      key={h.title}
                      className="group flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-sky-500/30 hover:bg-slate-100/80 dark:bg-white/[0.03] dark:border-white/5 dark:hover:border-sky-500/30 dark:hover:bg-white/[0.05] transition-all shadow-sm dark:shadow-none"
                    >
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 dark:text-sky-400 group-hover:scale-110 transition-transform">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-0.5">
                          {h.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">{h.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

