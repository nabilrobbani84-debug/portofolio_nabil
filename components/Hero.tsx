"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowDown } from "lucide-react";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const InteractiveProfile = dynamic(
  () => import("./digital-human/InteractiveProfile"),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-64 h-80 sm:w-72 sm:h-[24rem] lg:w-[21rem] lg:h-[28rem] flex items-center justify-center pointer-events-none" />
    ),
  }
);

import { useLanguage } from "./LanguageProvider";

const Typewriter = ({ roles }: { roles: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Reset index if roles change
    if (index >= roles.length) setIndex(0);
  }, [roles, index]);

  useEffect(() => {
    const currentWord = roles[index] || "";
    if (subIndex === currentWord.length + 1 && !deleting) {
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
  }, [subIndex, index, deleting, roles]);

  const currentRole = roles[index] || "";

  return (
    <span className="text-gradient font-semibold">
      {currentRole.substring(0, subIndex)}
      <span className="inline-block w-[3px] h-[1.1em] bg-sky-400 ml-1 align-middle animate-pulse rounded-full" />
    </span>
  );
};

const socials = [
  { href: "https://github.com/nabilrobbani84-debug", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/nabilrobbani", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:nabilrobbani6@gmail.com", label: "Email", Icon: Mail },
];

export default function Hero() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  const stats = [
    { value: "10+", label: t.hero.stats.projects },
    { value: "3.63", label: t.hero.stats.gpa },
    { value: "4+", label: t.hero.stats.experience },
  ];

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
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(100,116,139,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(100,116,139,0.2) 1px, transparent 1px)",
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
              <div className="inline-flex items-center gap-2 mb-5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:border-emerald-400/30 dark:bg-emerald-400/10 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  {t.hero.badge}
                </span>
              </div>

              <p className="text-base md:text-lg text-slate-600 dark:text-gray-400 mb-2">
                {t.hero.greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] text-slate-900 dark:text-white">
                {t.hero.headingPrefix}
                <br />
                <span className="text-gradient">{t.hero.headingGradient}</span>
              </h1>

              {/* Role line */}
              <div className="mt-4 flex items-center gap-2.5 text-lg md:text-xl">
                <span className="h-px w-8 bg-gradient-to-r from-sky-400 to-transparent" />
                <span className="text-slate-500 dark:text-gray-500">{t.hero.rolePrefix}</span>
                <Typewriter roles={t.hero.roles} />
              </div>

              <p className="mt-5 text-base md:text-lg text-slate-600 dark:text-gray-400 max-w-xl leading-relaxed">
                {t.hero.bio}
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
                  {t.hero.viewWork}
                  <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
                </Link>
                <a
                  href="mailto:nabilrobbani6@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900/5 hover:bg-slate-900/10 border border-slate-300/80 text-slate-800 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-white backdrop-blur-md rounded-full font-semibold transition-all hover:scale-[1.03] cursor-pointer shadow-sm dark:shadow-none"
                >
                  <Mail size={18} /> {t.hero.contactMe}
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
                      className="p-2.5 rounded-full bg-slate-900/5 hover:bg-slate-900/10 border border-slate-300/80 text-slate-600 hover:text-slate-900 dark:bg-white/5 dark:border-white/10 dark:text-gray-400 dark:hover:text-white dark:hover:border-sky-400/40 dark:hover:bg-white/10 transition-all hover:-translate-y-0.5"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>

                <div className="h-10 w-px bg-slate-200 dark:bg-white/10 hidden sm:block" />

                <div className="flex items-center gap-7">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</div>
                      <div className="text-[11px] text-slate-500 dark:text-gray-500 uppercase tracking-wider">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: Interactive Profile Video (No background, follows scroll) ── */}
          <div className="lg:col-span-5 xl:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <InteractiveProfile />
          </div>
        </div>
      </div>
    </section>
  );
}
