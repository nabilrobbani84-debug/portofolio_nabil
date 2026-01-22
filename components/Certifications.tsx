"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { StaggeredList, StaggerItem } from "./ScrollAnimation";

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
    <section id="certifications" className="py-20 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Certifications
        </h2>

        <StaggeredList className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {certs.map((cert, index) => (
            <StaggerItem
              key={index}
              className="glass p-6 rounded-xl border border-white/5 flex items-center gap-4 hover:border-purple-500/50 transition-colors hover:-translate-y-1 duration-300"
            >
              <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                <Award size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
                <p className="text-sm text-gray-400">{cert.issuer} • {cert.date}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
}
