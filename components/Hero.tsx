"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowDown, BadgeCheck } from "lucide-react";
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
      <span className="inline-block w-[3px] h-[1.1em] bg-sky-400 ml-1 align-middle animate-pulse rounded-full" />
    </span>
  );
};

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "3.63", label: "GPA / IPK" },
  { value: "1+", label: "Years Coding" },
];

const socials = [
  { href: "https://github.com/nabilrobbani84-debug", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/nabilrobbani", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:nabilrobbani6@gmail.com", label: "Email", Icon: Mail },
];

export default function Hero() {
  // Falls back to the placeholder SVG until the real photo is uploaded to public/profile.jpg
  const [photoSrc, setPhotoSrc] = useState("/profile.jpg");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-28 pb-20"
    >
      {/* Ambient gradient orbs — clean, professional backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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
      </div>

      {/* Two-column layout: text + photo */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── Left: content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 max-w-2xl order-2 lg:order-1"
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

          {/* ── Right: profile photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Soft glow halo */}
              <div className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-sky-500/25 via-indigo-500/15 to-purple-500/25 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Decorative gradient ring */}
              <div className="absolute -inset-1 rounded-[2.1rem] bg-gradient-to-br from-sky-400/40 via-transparent to-purple-500/40" />

              {/* Photo frame */}
              <div className="relative w-64 h-80 sm:w-72 sm:h-[24rem] lg:w-[21rem] lg:h-[28rem] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
                <Image
                  src={photoSrc}
                  alt="Nabil Robbani — Software Engineer"
                  fill
                  priority
                  sizes="(max-width: 1024px) 18rem, 21rem"
                  onError={() => setPhotoSrc("/profile-placeholder.svg")}
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Depth gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>

              {/* Verified role chip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 shadow-xl shadow-black/40 whitespace-nowrap"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white">
                  <BadgeCheck size={14} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-xs font-semibold text-white">Software Engineer</span>
                  <span className="text-[10px] text-gray-400">Frontend &amp; Fullstack</span>
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
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-gray-500"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
}
