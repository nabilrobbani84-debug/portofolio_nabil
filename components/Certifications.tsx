"use client";

import { Award, BadgeCheck } from "lucide-react";
import { ScrollReveal, StaggeredList, StaggerItem } from "./ScrollAnimation";

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
  return (
    <section id="certifications" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <ScrollReveal width="100%">
          <div className="text-center mb-14">
            <span className="eyebrow">Credentials</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
              Certifications
            </h2>
          </div>
        </ScrollReveal>

        <StaggeredList className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {certs.map((cert, index) => (
            <StaggerItem
              key={index}
              className="glass-card p-6 rounded-2xl border border-white/8 flex items-center gap-4 hover:border-indigo-500/40 transition-all hover:-translate-y-1 duration-300"
            >
              <div className="p-3 bg-indigo-500/15 rounded-xl text-indigo-400 shrink-0">
                <Award size={24} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-semibold text-white truncate">{cert.name}</h3>
                  <BadgeCheck size={16} className="text-sky-400 shrink-0" />
                </div>
                <p className="text-sm text-gray-400">{cert.issuer} • {cert.date}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
}
