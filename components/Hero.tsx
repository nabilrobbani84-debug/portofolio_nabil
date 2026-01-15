"use client";

import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    // Generate particles only on the client side to avoid hydration mismatch
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Reduced range for simpler relative control if easier, otherwise we stick to styles
      yInitial: Math.random() * 100,
      yAnimate: Math.random() * -100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-[1000px] h-[1000px] bg-purple-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-[800px] h-[800px] bg-cyan-600/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
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

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-semibold text-white shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
            >
              <Download size={18} /> Download CV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-full font-semibold text-white hover:bg-white/10 flex items-center justify-center gap-2 transition-colors"
            >
              <Mail size={18} /> Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Particles (Simulated) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          initial={{
            opacity: 0,
          }}
          animate={{
            y: [0, p.yAnimate],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
            left: p.left,
            top: p.top,
          }}
        />
      ))}
    </section>
  );
}
