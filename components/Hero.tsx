"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowDown, BadgeCheck, Mouse, Sparkles, ChevronDown } from "lucide-react";
import { Link } from "react-scroll";
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
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }, 200);
      return () => clearTimeout(t);
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? 55 : 95);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  return (
    <span className="text-gradient font-semibold">
      {roles[index].substring(0, subIndex)}
      <span className="inline-block w-[3px] h-[1.1em] bg-sky-400 ml-1 align-middle animate-pulse rounded-full" />
    </span>
  );
};

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "3.63", label: "GPA / IPK" },
  { value: "4+", label: "Years Coding" },
];

const socials = [
  { href: "https://github.com/nabilrobbani84-debug", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/nabilrobbani", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:nabilrobbani6@gmail.com", label: "Email", Icon: Mail },
];

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled((window.scrollY || 0) > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent pt-28 pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Ambient gradient backdrops */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full bg-sky-500/10 blur-[130px]" />
        <div className="absolute top-1/4 right-0 w-[34rem] h-[34rem] rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-purple-500/[0.07] blur-[130px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />
      </div>

      {/* Content grid */}
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ── Left Column: Intro & Bio ── */}
          <div className="lg:col-span-7 xl:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-300">
                  Available for Internship &amp; Freelance
                </span>
              </div>

              <p className="text-base md:text-lg text-gray-400 mb-2">
                Hi, I&apos;m Nabil Robbani 👋
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">
                I build modern
                <br />
                <span className="text-gradient">web experiences</span>
              </h1>

              {/* Role line */}
              <div className="mt-4 flex items-center gap-2.5 text-lg md:text-xl">
                <span className="h-px w-8 bg-gradient-to-r from-sky-400 to-transparent" />
                <span className="text-gray-500">I&apos;m a</span>
                <Typewriter />
              </div>

              <p className="mt-5 text-base md:text-lg text-gray-400 max-w-xl leading-relaxed">
                Informatics Engineering student at STT Terpadu Nurul Fikri, focused on
                crafting clean, performant, and user-friendly applications with React,
                Next.js, and Laravel.
              </p>

              {/* CTAs */}
              <div className="mt-7 flex flex-col sm:flex-row items-start gap-4">
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
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
                <div className="flex items-center gap-3">
                  {socials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-sky-400/40 hover:bg-white/10 transition-all hover:-translate-y-0.5"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>

                <div className="h-10 w-px bg-white/10 hidden sm:block" />

                <div className="flex items-center gap-7">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl font-bold text-white">{s.value}</div>
                      <div className="text-[11px] text-gray-500 uppercase tracking-wider">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Hero Stage Elements aligned with Background Character ── */}
          <div
            className={`lg:col-span-5 xl:col-span-5 order-1 lg:order-2 flex flex-col items-center justify-center min-h-[300px] lg:min-h-[460px] relative pointer-events-none transition-all duration-500 ${
              scrolled ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Floating Live Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute top-4 flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-white/15 px-3 py-1 backdrop-blur-md shadow-lg"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-200 uppercase font-mono flex items-center gap-1">
                <Sparkles size={10} className="text-sky-400" />
                Interactive Digital Human
              </span>
            </motion.div>

            {/* Scroll hint indicator */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute bottom-6 flex items-center gap-2 rounded-full border border-sky-400/35 bg-slate-950/85 backdrop-blur-md px-3.5 py-1.5 shadow-xl shadow-sky-500/20"
            >
              <Mouse size={13} className="text-sky-400 animate-bounce" />
              <span className="text-[11px] font-medium tracking-wide text-slate-200">
                Scroll ke bawah untuk melihat gerakan
              </span>
              <ChevronDown size={13} className="text-sky-400 animate-pulse" />
            </motion.div>

            {/* Verified Role Chip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="absolute -bottom-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md px-4 py-2 shadow-xl shadow-black/50 whitespace-nowrap"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white">
                <BadgeCheck size={12} />
              </span>
              <span className="flex flex-col leading-tight text-left">
                <span className="text-xs font-semibold text-white">Software Engineer</span>
                <span className="text-[10px] text-gray-400">Frontend &amp; Fullstack</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
