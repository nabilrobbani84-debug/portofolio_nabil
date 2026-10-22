"use client";

import { Award, BadgeCheck } from "lucide-react";
import { ScrollReveal, StaggeredList, StaggerItem, ParallaxBlob } from "./ScrollAnimation";
import { useLanguage } from "./LanguageProvider";

const certs = [
  {
    name: "Junior Web Developer",
    issuer: "BNSP",
    date: "2024",
  },
  {
    name: "Fullstack Web Development",
    issuer: "NF Academy",
    date: "2024",
  },
];

export default function Certifications() {
  const { t } = useLanguage();

  return (
    <section id="certifications" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <ParallaxBlob
        offset={120}
        x={40}
        className="absolute -bottom-10 left-1/4 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-purple-500/10 blur-[100px] sm:blur-[120px] pointer-events-none"
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-10 sm:mb-14">
            <span className="eyebrow">{t.certifications.eyebrow}</span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              {t.certifications.title}
            </h2>
          </div>
        </ScrollReveal>

        <StaggeredList className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {certs.map((cert, index) => (
            <StaggerItem
              key={index}
              className="glass-card p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-white/8 flex items-center gap-3.5 sm:gap-4 hover:border-indigo-500/40 transition-all hover:-translate-y-1 duration-300"
            >
              <div className="p-2.5 sm:p-3 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-xl text-indigo-600 dark:text-indigo-400 shrink-0">
                <Award size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">{cert.name}</h3>
                  <BadgeCheck size={16} className="text-sky-500 dark:text-sky-400 shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 mt-0.5">{cert.issuer} • {cert.date}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
}
