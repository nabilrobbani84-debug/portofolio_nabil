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
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Floating background blobs */}
      <motion.div
        aria-hidden
        className="absolute top-10 -left-24 w-80 h-80 rounded-full bg-sky-500/[0.07] blur-[100px] pointer-events-none"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-20 -right-24 w-96 h-96 rounded-full bg-purple-500/[0.07] blur-[110px] pointer-events-none"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
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
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              className={`glass-card p-6 rounded-2xl border border-white/8 ${cat.border} hover:shadow-2xl hover:shadow-black/40 transition-colors`}
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  className={`p-2.5 rounded-xl ${cat.bg} ${cat.color}`}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                >
                  <cat.icon size={22} />
                </motion.div>
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.6, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3, scale: 1.08 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: i * 0.12 + 0.25 + j * 0.04,
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-sm text-gray-300 hover:text-white hover:bg-white/[0.1] hover:border-white/25 cursor-default"
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
