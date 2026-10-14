"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useSafeReducedMotion } from "./ScrollAnimation";
import { Mail, Github, Linkedin, ArrowDown, BadgeCheck } from "lucide-react";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const InteractiveProfile = dynamic(
  () => import("./digital-human/InteractiveProfile"),
  {
    ssr: false,
    loading: () => (
      <div className="relative select-none" style={{ perspective: "1200px" }}>
        {/* Glow halo */}
        <div className="absolute -inset-10 rounded-[3rem] pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(56,189,248,0.35) 0%, rgba(99,102,241,0.2) 40%, transparent 100%)", filter: "blur(24px)" }} />
        {/* Gradient border placeholder */}
        <div className="absolute -inset-[3px] rounded-[2.2rem] pointer-events-none" style={{ background: "conic-gradient(from 0deg, #38bdf8, #818cf8, #a855f7, #ec4899, #38bdf8)" }} />
        {/* Card */}
        <div className="relative w-64 h-80 sm:w-72 sm:h-[24rem] lg:w-[21rem] lg:h-[28rem] rounded-[2rem] overflow-hidden border border-white/15 shadow-2xl shadow-black/90 bg-slate-950">
          <Image
            src="/digital-human-frames/frame_00.jpg"
            alt="Nabil Robbani 3D Digital Human"
            fill
            priority
            sizes="(max-width: 1024px) 18rem, 21rem"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/25" />
          {/* Loading shimmer */}
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
        {/* Role chip */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 shadow-xl shadow-black/40 whitespace-nowrap z-40 pointer-events-none">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white">
            <BadgeCheck size={14} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-xs font-semibold text-white">Software Engineer</span>
            <span className="text-[10px] text-gray-400">Frontend &amp; Fullstack</span>
          </span>
        </div>
      </div>
    ),
  }
);

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
  const reduce = useSafeReducedMotion();
  const { scrollYProgress } = useScroll();
  // Layered parallax — pronounced so the depth is clearly visible while scrolling.
  // content drifts up, photo drifts down (opposite), orbs move most, then fades.
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -160]);
  const photoY = useTransform(scrollYProgress, [0, 0.5], [0, 180]);
  const orbY = useTransform(scrollYProgress, [0, 0.6], [0, 320]);
  const orbScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.25]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.35]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-28 pb-20"
    >
      {/* Ambient gradient orbs — clean, professional backdrop with parallax drift */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={reduce ? undefined : { y: orbY, scale: orbScale }}
      >
        <div className="absolute -top-24 -left-24 w-[32rem] h-[32rem] rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[30rem] h-[30rem] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[26rem] h-[26rem] rounded-full bg-purple-500/[0.07] blur-[120px]" />
        {/* faint grid */}
        <div
          className="absolute inset-0 opacity-[0.15]"
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
      </motion.div>

      {/* Two-column layout: text + photo */}
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* ── Left: content (outer = scroll parallax, inner = entrance) ── */}
          <motion.div
            style={reduce ? undefined : { y: contentY, opacity: heroOpacity }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
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

            <p className="text-base md:text-lg text-gray-400 mb-2">
              Hi, I&apos;m Nabil Robbani 👋
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">
              I build modern
              <br />
              <span className="text-gradient">web experiences</span>
            </h1>

            {/* Role line — inline label + typewriter, no empty gap */}
            <div className="mt-5 flex items-center gap-2.5 text-lg md:text-xl">
              <span className="h-px w-8 bg-gradient-to-r from-sky-400 to-transparent" />
              <span className="text-gray-500">I&apos;m a</span>
              <Typewriter />
            </div>

            <p className="mt-6 text-base md:text-lg text-gray-400 max-w-xl leading-relaxed">
              Informatics Engineering student at STT Terpadu Nurul Fikri, focused on
              crafting clean, performant, and user-friendly applications with React,
              Next.js, and Laravel.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
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
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
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
          </motion.div>

          {/* ── Right: profile photo (outer = scroll parallax, inner = entrance) ── */}
          <motion.div
            style={reduce ? undefined : { y: photoY }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="w-full flex justify-center lg:justify-end"
          >
            <InteractiveProfile />
          </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
}
