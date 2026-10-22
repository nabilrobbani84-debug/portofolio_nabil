"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { ScrollReveal, ParallaxBlob } from "./ScrollAnimation";
import { useLanguage } from "./LanguageProvider";

const itemStyles = [
  {
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
];

interface ExperienceItemProps {
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
  color: string;
  bg: string;
  border: string;
}

const ExperienceCard = ({ item, index }: { item: ExperienceItemProps; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative pl-6 sm:pl-8 pb-8 sm:pb-12 border-l border-slate-200 dark:border-white/10 last:border-0 last:pb-0`}
    >
      <div className={`absolute left-[-15px] sm:left-[-17px] top-0 p-1.5 sm:p-2 rounded-full border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-800 ${item.color} shadow-sm`}>
        <Briefcase size={15} />
      </div>

      <div className={`p-4 sm:p-6 rounded-xl border bg-white/80 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800/50 transition-colors shadow-sm dark:shadow-none ${item.border}`}>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2.5 sm:gap-4 mb-3 sm:mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
              {item.role}
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-gray-300 font-medium">
              {item.company} <span className="text-xs sm:text-sm font-normal text-slate-500 dark:text-gray-500">• {item.type}</span>
            </p>
          </div>

          <div className="flex flex-row sm:flex-col flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-500 dark:text-gray-400 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Calendar size={13} />
              <span>{item.period}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MapPin size={13} />
              <span>{item.location}</span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {item.skills.map((skill: string) => (
            <span key={skill} className={`px-2 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded-md ${item.bg} ${item.color} font-medium`}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const { t } = useLanguage();

  const experiences = t.experience.items.map((item, idx) => ({
    ...item,
    ...(itemStyles[idx] || itemStyles[0]),
  }));

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <ParallaxBlob
        offset={130}
        x={-40}
        className="absolute top-10 right-0 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-indigo-500/10 blur-[100px] sm:blur-[120px] pointer-events-none"
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-10 sm:mb-14">
            <span className="eyebrow">{t.experience.eyebrow}</span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              {t.experience.titlePrefix} <span className="text-gradient">{t.experience.titleGradient}</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal width="100%">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} item={exp} index={index} />
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

