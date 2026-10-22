"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { ScrollReveal, ParallaxBlob } from "./ScrollAnimation";
import { useLanguage } from "./LanguageProvider";
import { projectsData, ProjectData } from "@/lib/translations";

// ─── Badge Color Map ─────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  cyan:   "bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-400",
  purple: "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400",
  rose:   "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400",
  amber:  "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400",
  sky:    "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-400",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-400",
  green:  "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400",
  indigo: "bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-400",
};

// ─── Project Card ────────────────────────────────────────────────────────────

const MAX_BADGES = 3;
const INITIAL_VISIBLE = 6;

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const { lang, t } = useLanguage();
  const visibleBadges = project.badges.slice(0, MAX_BADGES);
  const hiddenCount = project.badges.length - visibleBadges.length;
  const descriptionText = project.description[lang] || project.description.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: "easeOut" }}
      className="group relative h-full"
    >
      {/* Glow backdrop */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-500`}
      />

      <div className="relative h-full flex flex-col rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/8 shadow-md dark:shadow-none overflow-hidden backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">

        {/* ── Image (fixed aspect ratio) ── */}
        <div className="relative w-full aspect-[16/8] overflow-hidden shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20`} />

          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-7xl font-black bg-gradient-to-br ${project.accent} bg-clip-text text-transparent opacity-25`}>
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Fade for legibility */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/95 dark:from-slate-900/90 to-transparent" />

          {/* Number tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${project.accent} text-white text-xs font-bold shadow-lg`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-4 gap-3">

          <div className="flex-1">
            <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors group-hover:text-sky-600 dark:group-hover:text-sky-300">
              {project.title}
            </h3>

            {/* Description clamped to 2-3 lines for uniform height */}
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
              {descriptionText}
            </p>
          </div>

          {/* Badges (capped) */}
          <div className="flex flex-wrap gap-1.5">
            {visibleBadges.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${badgeColors[badge.color]}`}
              >
                <span className="text-[10px]">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400">
                +{hiddenCount}
              </span>
            )}
          </div>

          {/* Action Buttons (pinned to bottom) */}
          <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-slate-200/80 dark:border-white/5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 dark:text-gray-300 dark:hover:text-white text-xs font-medium transition-all duration-200"
              >
                <Github size={14} />
                {t.projects.btnCode}
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r ${project.accent} text-white text-xs font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200`}
              >
                <ExternalLink size={14} />
                {t.projects.btnDemo}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

const FILTER_CONFIG = [
  { key: "All", labelKey: "all" },
  { key: "Web Apps", labelKey: "webApps" },
  { key: "Internal Systems", labelKey: "internalSystems" },
  { key: "APIs", labelKey: "apis" },
  { key: "Mobile Apps", labelKey: "mobileApps" },
] as const;

type FilterKey = (typeof FILTER_CONFIG)[number]["key"];

export default function Projects() {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("All");

  const filtered = filter === "All"
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  const visibleProjects = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 text-slate-900 dark:text-white relative overflow-hidden">
      {/* Parallax background decoration */}
      <ParallaxBlob
        offset={180}
        x={50}
        className="absolute top-1/4 left-0 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-sky-500/[0.06] rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"
      />
      <ParallaxBlob
        offset={-160}
        x={-40}
        className="absolute bottom-1/4 right-0 w-[280px] sm:w-[440px] h-[280px] sm:h-[440px] bg-purple-500/[0.06] rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

        {/* Section header */}
        <ScrollReveal width="100%">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold flex flex-wrap items-center gap-2 sm:gap-3 text-slate-900 dark:text-white">
                <span>{t.projects.titlePrefix}</span> <span className="text-gradient">{t.projects.titleGradient}</span>
                <Sparkles className="text-amber-400 shrink-0" size={20} />
              </h2>
              <p className="mt-2 sm:mt-3 text-slate-600 dark:text-gray-400 max-w-md text-xs sm:text-sm md:text-base">
                {t.projects.subtitle}
              </p>
            </div>
            <a
              href="https://github.com/nabilrobbani84-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300 transition-colors shrink-0"
            >
              {t.projects.viewAllGithub} <ArrowUpRight size={16} />
            </a>
          </div>
        </ScrollReveal>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          {FILTER_CONFIG.map(({ key, labelKey }) => {
            const label = t.projects.filterLabels[labelKey as keyof typeof t.projects.filterLabels] || key;
            return (
              <button
                key={key}
                id={`filter-${key.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => {
                  setFilter(key);
                  setShowAll(false);
                }}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  filter === key
                    ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:border-sky-400/60 hover:text-slate-900 dark:bg-white/5 dark:border-white/15 dark:text-gray-300 dark:hover:border-sky-400/60 dark:hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-slate-500 dark:text-gray-500 py-10">
            {t.projects.emptyCategory}
          </p>
        )}

        {/* Show more / less */}
        {filtered.length > INITIAL_VISIBLE && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 hover:border-sky-500/40 text-sm font-medium text-slate-700 hover:text-slate-900 dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:text-gray-300 dark:hover:text-white transition-all cursor-pointer shadow-sm dark:shadow-none"
            >
              {showAll ? t.projects.showLess : `${t.projects.showAll} (${filtered.length})`}
              <ChevronDown size={16} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </div>
        )}

        {/* Footer note */}
        <ScrollReveal width="100%">
          <p className="text-center text-slate-500 dark:text-gray-600 text-sm mt-8">
            {t.projects.footerNote}{" "}
            <a
              href="https://github.com/nabilrobbani84-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-500 hover:text-cyan-500 dark:hover:text-cyan-400 underline underline-offset-2 transition-colors"
            >
              {t.projects.footerLink}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
