"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollAnimation";

const skills = [
  "HTML", "CSS", "React", "Laravel", "Node.js", "Figma", "Git", "MySQL", "Next.js", "Vue.js", "Tailwind CSS"
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-950 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-10">
        <ScrollReveal width="100%">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
            Technical <span className="text-purple-500">Skills</span>
            </h2>
        </ScrollReveal>
      </div>

      <div className="relative w-full flex overflow-x-hidden group">
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-950 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-950 to-transparent"></div>

        <motion.div
          className="flex space-x-12 whitespace-nowrap"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {/* Double the list to create seamless loop */}
          {[...skills, ...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center px-8 py-4 glass rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors cursor-default"
            >
              <span className="text-xl md:text-2xl font-semibold text-gray-300 group-hover:text-white transition-colors">
                {skill}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
