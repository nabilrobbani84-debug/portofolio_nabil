"use client";

import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimation";
import { useLanguage } from "./LanguageProvider";

const categories = [
  {
    title: "Frontend",
    icon: Layout,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Sass", "Bootstrap", "Redux", "Framer Motion", "Responsive Design"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
    skills: ["Laravel", "Node.js", "Django", "Go", "Python", "Express.js", "PHP", "REST API", "GraphQL", "JWT Auth", "WebSocket"],
  },
  {
    title: "Database",
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
    skills: ["MySQL", "PostgreSQL", "Firebase", "Firestore", "MongoDB", "Redis", "SQLite", "Supabase", "Prisma"],
  },
  {
    title: "Tools & Design",
    icon: Wrench,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/40",
    skills: ["Git", "Docker", "Figma", "Vite", "Scrum", "GitHub", "GitHub Actions", "CI/CD", "Vercel", "Postman", "Linux", "Nginx", "Jira"],
  },
];

// Marquee row of core skills for extra flair
const marquee = ["React", "Next.js", "TypeScript", "Laravel", "Node.js", "Tailwind CSS", "PostgreSQL", "Docker", "Figma", "Vue.js", "Go", "MySQL"];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Floating background blobs */}
      <motion.div
        aria-hidden
        className="absolute top-10 -left-24 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-sky-500/[0.07] blur-[90px] sm:blur-[100px] pointer-events-none"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-20 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-purple-500/[0.07] blur-[100px] sm:blur-[110px] pointer-events-none"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-10 sm:mb-14">
            <span className="eyebrow">{t.skills.eyebrow}</span>
            <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              {t.skills.titlePrefix} <span className="text-gradient">{t.skills.titleGradient}</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-600 dark:text-gray-400 max-w-xl mx-auto text-xs sm:text-sm md:text-base">
              {t.skills.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className={`glass-card p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-white/8 ${cat.border} hover:shadow-xl hover:shadow-slate-900/5 dark:hover:shadow-2xl dark:hover:shadow-black/40 transition-colors`}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <motion.div
                  className={`p-2 sm:p-2.5 rounded-xl ${cat.bg} ${cat.color}`}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                >
                  <cat.icon size={20} />
                </motion.div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.7, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -2, scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: i * 0.08 + 0.15 + j * 0.03,
                    }}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-slate-100/90 border border-slate-200/90 text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 hover:border-slate-300 dark:bg-white/[0.04] dark:border-white/8 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/[0.1] dark:hover:border-white/25 cursor-default transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative w-full flex overflow-x-hidden mt-12 sm:mt-16 group">
        <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 z-10 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 z-10 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
        <motion.div
          className="flex space-x-4 sm:space-x-6 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
        >
          {[...marquee, ...marquee, ...marquee, ...marquee].map((skill, index) => (
            <span
              key={index}
              className="text-base sm:text-xl md:text-2xl font-semibold text-slate-400 dark:text-gray-600 group-hover:text-slate-600 dark:group-hover:text-gray-400 transition-colors"
            >
              {skill} <span className="text-sky-500/40 mx-1.5 sm:mx-2">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
