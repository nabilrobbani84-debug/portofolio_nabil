"use client";

import { motion } from "framer-motion";
import { Layout, Server, Database, Wrench } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimation";

const categories = [
  {
    title: "Frontend",
    icon: Layout,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "hover:border-sky-500/40",
    skills: ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "hover:border-indigo-500/40",
    skills: ["Laravel", "Node.js", "Django", "Go", "REST API"],
  },
  {
    title: "Database",
    icon: Database,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
    skills: ["MySQL", "PostgreSQL", "Firebase", "Firestore"],
  },
  {
    title: "Tools & Design",
    icon: Wrench,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/40",
    skills: ["Git", "Docker", "Figma", "Vite", "Scrum"],
  },
];

// Marquee row of core skills for extra flair
const marquee = ["React", "Next.js", "TypeScript", "Laravel", "Node.js", "Tailwind CSS", "PostgreSQL", "Docker", "Figma", "Vue.js", "Go", "MySQL"];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-14">
            <span className="eyebrow">Tech Stack</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
              Technical <span className="text-gradient">Skills</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              Teknologi dan tools yang saya gunakan untuk membangun produk digital
              yang cepat, andal, dan menarik.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass-card p-6 rounded-2xl border border-white/8 ${cat.border} transition-colors`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl ${cat.bg} ${cat.color}`}>
                  <cat.icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-sm text-gray-300 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="relative w-full flex overflow-x-hidden mt-16 group">
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-950 to-transparent" />
        <motion.div
          className="flex space-x-6 whitespace-nowrap"
          animate={{ x: [0, -1200] }}
          transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
        >
          {[...marquee, ...marquee, ...marquee].map((skill, index) => (
            <span
              key={index}
              className="text-xl md:text-2xl font-semibold text-gray-600 group-hover:text-gray-400 transition-colors"
            >
              {skill} <span className="text-sky-500/40 mx-2">•</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
