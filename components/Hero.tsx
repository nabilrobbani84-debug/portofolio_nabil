"use client";

import RobotCanvas from "./Robot3D";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowDown, Sparkles } from "lucide-react";
import { Link } from "react-scroll";
import Image from "next/image";
import { useEffect, useState } from "react";

const roles = [
  "Frontend Developer",
  "Fullstack Developer",
  "Software Engineer",
];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !deleting) {
      const t = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(t);
    }
    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 55 : 95);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <span className="text-gradient font-semibold">
      {roles[index].substring(0, subIndex)}
      <span className="inline-block w-[2px] h-[1em] bg-sky-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
};

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "3.63", label: "GPA / IPK" },
  { value: "1+", label: "Years Coding" },
];

export default function Hero() {
  // Falls back to the placeholder SVG until the real photo is uploaded to public/profile.jpg
  const [photoSrc, setPhotoSrc] = useState("/profile.jpg");

  const [particles, setParticles] = useState<
    { id: number; duration: number; delay: number; left: string; size: number }[]
  >([]);

  useEffect(() => {
    const newParticles = [...Array(24)].map((_, i) => ({
      id: i,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 10,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-28 pb-16"
    >
      {/* 3D Robot — subtle background layer */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-30 md:opacity-40 pointer-events-none">
        <RobotCanvas />
      </div>

      {/* Two-column layout: text + photo */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
        {/* ── Left: content ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-2xl order-2 lg:order-1"
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-300">
              Available for Internship &amp; Freelance
            </span>
          </div>

          <p className="text-base md:text-lg text-gray-400 mb-3">
            Hi, I&apos;m Nabil Robbani 👋
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.1]">
            I build modern
            <br />
            <span className="text-gradient text-glow-cyan">web experiences</span>
          </h1>

          <div className="text-xl md:text-2xl text-gray-300 mb-6 h-8">
            <Typewriter />
          </div>

          <p className="text-base md:text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
            Informatics Engineering student at STT Terpadu Nurul Fikri, focused on
            crafting clean, performant, and user-friendly applications with React,
            Next.js, and Laravel.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
            <Link
              to="projects"
              smooth={true}
              offset={-70}
              duration={500}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-sky-500/40 hover:scale-[1.03] cursor-pointer"
            >
              View My Work
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            </Link>
            <a
              href="mailto:nabilrobbani6@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 backdrop-blur-md rounded-full font-semibold text-white hover:bg-white/10 transition-all hover:scale-[1.03] cursor-pointer"
            >
              <Mail size={18} /> Contact Me
            </a>
          </div>

          {/* Social + stats */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/nabilrobbani84-debug"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all hover:-translate-y-0.5"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/nabilrobbani"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all hover:-translate-y-0.5"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:nabilrobbani6@gmail.com"
                aria-label="Email"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all hover:-translate-y-0.5"
              >
                <Mail size={18} />
              </a>
            </div>

            <div className="h-10 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right: profile photo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Glow halo */}
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky-500/30 via-indigo-500/20 to-purple-500/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Photo frame */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-[22rem] lg:w-80 lg:h-[26rem] rounded-[2rem] overflow-hidden border border-white/15 shadow-2xl shadow-black/50">
              <Image
                src={photoSrc}
                alt="Nabil Robbani"
                fill
                priority
                sizes="(max-width: 1024px) 18rem, 20rem"
                onError={() => setPhotoSrc("/profile-placeholder.svg")}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Bottom gradient for depth */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>

            {/* Floating name chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/90 backdrop-blur-md px-4 py-2 shadow-lg whitespace-nowrap"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white">
                <Sparkles size={12} />
              </span>
              <span className="text-xs font-semibold text-white">
                Software Engineer
              </span>
            </motion.div>
          </div>
        </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>

      {/* Falling Stars */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-white/80 rounded-full"
            initial={{ opacity: 0, top: "-10%" }}
            animate={{ top: ["-10%", "110%"], opacity: [0, 1, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
            style={{ left: p.left, width: p.size, height: p.size }}
          />
        ))}
      </div>
    </section>
  );
}
