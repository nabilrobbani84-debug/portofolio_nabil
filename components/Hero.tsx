"use client";

import RobotCanvas from "./Robot3D";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Typewriter = ({ text, delay }: { text: string; delay: number }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
}

export default function Hero() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      yInitial: -20, // Start slightly above
      yFinal: 120,   // End below
      duration: Math.random() * 10 + 10, // Slower fall
      delay: Math.random() * 10,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20"
    >
      {/* 3D Robot Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <RobotCanvas />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center pointer-events-none">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           className="max-w-4xl mx-auto pointer-events-auto"
        >
          {/* ... Content ... */}
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase border border-cyan-400/30 rounded-full bg-cyan-400/10">
            Portfolio 2026
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-glow-cyan">Nabil Robbani</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Mahasiswa Teknik Informatika | Software Engineer
            <br />
            <span className="text-sm md:text-lg text-gray-500">
              Specialized in Frontend & Fullstack Development
            </span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download CV
            </motion.button>
            <motion.a
              href="mailto:nabilrobbani6@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-full font-semibold text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Mail size={18} /> Contact Me
            </motion.a>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
      {/* Falling Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-white rounded-full"
            initial={{ opacity: 0, top: "-10%" }}
            animate={{
              top: ["-10%", "110%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>
    </section>
  );
}
