"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BadgeCheck,
  RotateCcw,
  Sparkles,
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  Mouse,
  ChevronDown,
} from "lucide-react";
import { useSafeReducedMotion } from "../ScrollAnimation";
import { useLanguage } from "../LanguageProvider";

// Floating tech badges orbiting around the hero character position
const FLOAT_BADGES = [
  { icon: Code2,    label: "React",      color: "from-sky-400 to-cyan-400",     orbit: 0   },
  { icon: Globe,    label: "Next.js",    color: "from-slate-300 to-white",      orbit: 72  },
  { icon: Database, label: "Laravel",    color: "from-red-400 to-orange-400",   orbit: 144 },
  { icon: Cpu,      label: "Python",     color: "from-yellow-400 to-green-400", orbit: 216 },
  { icon: Layers,   label: "TypeScript", color: "from-blue-400 to-indigo-400",  orbit: 288 },
];

const SPARKLES = [
  { top: "6%",  left: "10%", size: 3, delay: 0   },
  { top: "14%", left: "90%", size: 4, delay: 0.5 },
  { top: "42%", left: "96%", size: 2, delay: 1.0 },
  { top: "72%", left: "92%", size: 3, delay: 1.4 },
  { top: "86%", left: "8%",  size: 4, delay: 0.8 },
  { top: "54%", left: "3%",  size: 2, delay: 1.9 },
  { top: "28%", left: "5%",  size: 3, delay: 2.2 },
];

interface InteractiveProfileProps {
  className?: string;
}

export function InteractiveProfile({ className = "" }: InteractiveProfileProps) {
  const reduce = useSafeReducedMotion();
  const { t } = useLanguage();

  const [hasScrolled, setHasScrolled] = useState(false);
  const [badgeAngle, setBadgeAngle] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);

  // Track scroll position to gently fade out hero-only UI badges when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      setHasScrolled(scrollY > 20);
      // Fades out hero badges cleanly as soon as user starts scrolling (0 to 160px)
      const fade = Math.max(0, Math.min(1, 1 - scrollY / 160));
      setHeroOpacity(fade);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Orbit rotation animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let currentAngle = 0;

    const loop = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (!reduce) {
        currentAngle = (currentAngle + dt * 16) % 360;
        setBadgeAngle(currentAngle);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [reduce]);

  const handleReset = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center w-full max-w-[20rem] sm:max-w-[25rem] lg:max-w-[29rem] ${className}`}
    >
      {/* ── Anchor Container: BackgroundDigitalHuman aligns its position with this box at scroll=0 ── */}
      <div
        id="hero-character-anchor"
        className="relative w-full h-[22rem] sm:h-[27rem] lg:h-[33rem] flex items-center justify-center"
      >
        {/* Floating Cyber Portal Rings (Fades out when user scrolls past Hero) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{ opacity: heroOpacity }}
        >
          <div
            className="w-[15rem] h-[15rem] sm:w-[20rem] sm:h-[20rem] lg:w-[25rem] lg:h-[25rem] rounded-full border border-sky-400/20 border-dashed animate-spin"
            style={{ animationDuration: "36s" }}
          />
          <div
            className="absolute w-[12rem] h-[12rem] sm:w-[16rem] sm:h-[16rem] lg:w-[20rem] lg:h-[20rem] rounded-full border border-indigo-500/15 animate-spin"
            style={{ animationDuration: "24s", animationDirection: "reverse" }}
          />
        </div>

        {/* Energy Sparkles */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: heroOpacity }}
        >
          {SPARKLES.map((s, i) => (
            <motion.div
              key={i}
              className="absolute z-20 rounded-full bg-white"
              style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
              animate={
                reduce
                  ? {}
                  : {
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.4, 0.5],
                    }
              }
              transition={{
                duration: 2.4,
                delay: s.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* ── Floating Tech Badges (Orbiting around hero character) ── */}
        {!reduce && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 hidden sm:block"
            style={{ opacity: heroOpacity }}
          >
            {FLOAT_BADGES.map((badge, i) => {
              const angle = ((badgeAngle + badge.orbit) * Math.PI) / 180;
              const rx = 185,
                ry = 145;
              const bx = Math.cos(angle) * rx;
              const by = Math.sin(angle) * ry;
              const Icon = badge.icon;
              return (
                <div
                  key={i}
                  className="absolute z-30 pointer-events-none"
                  style={{
                    left: "50%",
                    top: "46%",
                    transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px))`,
                  }}
                >
                  <div className="flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/20 backdrop-blur-md shadow-md dark:shadow-black/70 px-2.5 py-1">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${badge.color}`}
                    >
                      <Icon size={9} className="text-white" />
                    </span>
                    <span className="text-[10px] font-semibold text-slate-800 dark:text-white/95 tracking-wide">
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Top Status Pill (Interactive Video Indicator) ── */}
        <div
          className="absolute top-2 inset-x-2 z-30 flex items-center justify-between pointer-events-none transition-opacity duration-300"
          style={{ opacity: heroOpacity }}
        >
          <div className="flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-slate-950/80 border border-slate-200/90 dark:border-white/15 px-3 py-1 backdrop-blur-md shadow-md dark:shadow-black/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-700 dark:text-slate-200 uppercase font-mono flex items-center gap-1">
              <Sparkles size={10} className="text-sky-500 dark:text-sky-400" />
              {t.hero.interactiveStatus}
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="pointer-events-auto flex items-center justify-center h-6 w-6 rounded-full bg-white/90 dark:bg-slate-950/80 border border-slate-200/90 dark:border-white/15 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white backdrop-blur-md transition-colors"
            title={t.hero.resetTitle}
            aria-label={t.hero.resetTitle}
          >
            <RotateCcw size={11} />
          </button>
        </div>

        {/* ── Interactive Scroll Hint (Disappears once user scrolls down) ── */}
        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute inset-x-2 bottom-3 z-30 flex justify-center pointer-events-none"
            >
              <div className="flex items-center gap-2 rounded-full border border-sky-400/40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 shadow-xl shadow-sky-500/15 dark:shadow-sky-500/25">
                <Mouse size={13} className="text-sky-500 dark:text-sky-400 animate-bounce" />
                <span className="text-[11px] font-medium tracking-wide text-slate-800 dark:text-slate-200">
                  {t.hero.scrollHint}
                </span>
                <ChevronDown size={13} className="text-sky-500 dark:text-sky-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Verified Role Chip (Positioned cleanly below the hero character) ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative mt-2 z-30 flex items-center gap-2 rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 shadow-lg dark:shadow-black/40 whitespace-nowrap pointer-events-none transition-opacity duration-300"
        style={{ opacity: heroOpacity }}
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white">
          <BadgeCheck size={12} />
        </span>
        <span className="flex flex-col leading-tight text-left">
          <span className="text-xs font-semibold text-slate-900 dark:text-white">Software Engineer</span>
          <span className="text-[10px] text-slate-500 dark:text-gray-400">Frontend &amp; Fullstack</span>
        </span>
      </motion.div>
    </div>
  );
}

export default InteractiveProfile;
