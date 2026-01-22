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
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-sm text-gray-300 font-medium">Available for new projects</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight leading-tight">
            Building digital
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
               experiences
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            I am Nabil Robbani, a <span className="text-white font-semibold">Software Engineer</span> specialized in <span className="text-cyan-400">Frontend & Fullstack Development</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-bold shadow-lg shadow-white/10 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Contact Me</span>
              <Mail className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold backdrop-blur-md hover:bg-white/10 flex items-center gap-3 transition-all"
            >
              <span>Download CV</span>
              <Download className="w-5 h-5" />
            </motion.button>
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
