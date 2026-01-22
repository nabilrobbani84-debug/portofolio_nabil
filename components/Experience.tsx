"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { ScrollReveal } from "./ScrollAnimation";

const experiences = [
  {
    role: "Fullstack Developer",
    company: "PT. Winnicode Garuda Indonesia",
    type: "Internship",
    period: "Feb 2025 - Present",
    location: "Bandung, Indonesia (Remote)",
    description: "Developing and maintaining web applications using modern full-stack technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.",
    skills: ["Figma", "Front-End Development", "React", "Laravel"],
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    role: "Core Team Lead of Media",
    company: "GROW WITH DATA STT TERPADU NURUL FIKRI",
    type: "Part-time",
    period: "Jan 2025 - Present",
    location: "Jakarta Selatan, Indonesia (Hybrid)",
    description: "Leading the media team to produce engaging content and strategies. Managing team workflows and ensuring consistent brand messaging across platforms.",
    skills: ["Team Leadership", "Figma", "Content Strategy", "Communication"],
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
];

const ExperienceCard = ({ item, index }: { item: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative pl-8 pb-12 border-l border-white/10 last:border-0 last:pb-0`}
    >
      <div className={`absolute left-[-17px] top-0 p-2 rounded-full border border-slate-900 bg-slate-800 ${item.color}`}>
        <Briefcase size={16} />
      </div>
      
      <div className={`p-6 rounded-xl border bg-slate-900/50 hover:bg-slate-800/50 transition-colors ${item.border}`}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{item.role}</h3>
                <p className="text-base text-gray-300 font-medium">{item.company} <span className="text-sm font-normal text-gray-500">• {item.type}</span></p>
            </div>
            
            <div className="flex flex-col gap-1 text-sm text-gray-400 shrink-0">
                <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                </div>
            </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
            {item.skills.map((skill: string) => (
                <span key={skill} className={`px-2 py-1 text-xs rounded-md ${item.bg} ${item.color} font-medium`}>
                    {skill}
                </span>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Work <span className="text-cyan-400">Experience</span>
        </h2>
        
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
