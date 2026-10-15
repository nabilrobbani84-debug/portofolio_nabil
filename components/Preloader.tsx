"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_STAGES = [
  { threshold: 0,  text: "INITIALIZING NEURAL INTERFACE..." },
  { threshold: 25, text: "LOADING DIGITAL HUMAN ASSETS..." },
  { threshold: 55, text: "CONFIGURING 3D ENVIRONMENT..." },
  { threshold: 80, text: "SYNCHRONIZING INTERACTIVE MODULES..." },
  { threshold: 96, text: "SYSTEM READY. ENTERING PORTFOLIO..." },
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Prevent body scroll during initial loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Preload frame_00.webp in background for immediate render
    const img = new Image();
    img.src = "/digitalhuman/frames/frame_00.webp";

    let currentProgress = 0;
    let animFrameId: number;
    let lastTime = performance.now();

    const updateCounter = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Dynamic acceleration curve: fast start, smooth middle, decisive finish
      let speed = 48; // base increment per second
      if (currentProgress < 30) speed = 65;
      else if (currentProgress < 75) speed = 52;
      else if (currentProgress < 95) speed = 40;
      else speed = 80;

      currentProgress = Math.min(100, currentProgress + speed * delta);
      setProgress(Math.floor(currentProgress));

      if (currentProgress < 100) {
        animFrameId = requestAnimationFrame(updateCounter);
      } else {
        // Complete hold for 220ms so user sees 100% confirmation
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = originalOverflow;
        }, 220);
      }
    };

    animFrameId = requestAnimationFrame(updateCounter);

    // Safety fallback: Never leave user stuck on slow networks (max 3.5s)
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
      document.body.style.overflow = originalOverflow;
    }, 3500);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!mounted) return null;

  // Determine current active status message
  const activeStatus =
    STATUS_STAGES.slice()
      .reverse()
      .find((s) => progress >= s.threshold)?.text || "LOADING...";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="portfolio-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(14px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#060a16] select-none overflow-hidden"
        >
          {/* ── Ambient Radial Glows in Background ── */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-sky-500/15 blur-[130px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] rounded-full bg-purple-500/15 blur-[110px]" />
            {/* Cyber Grid Texture */}
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, black 40%, transparent 80%)",
              }}
            />
          </div>

          {/* ── Cyber HUD Corner Accents ── */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-10 flex items-center gap-2 pointer-events-none text-[11px] font-mono tracking-widest text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span>SYSTEM // BOOT</span>
          </div>

          <div className="absolute top-6 right-6 sm:top-8 sm:right-10 pointer-events-none text-[11px] font-mono tracking-widest text-slate-500 hidden sm:block">
            NABIL ROBBANI // PORTFOLIO
          </div>

          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 pointer-events-none text-[10px] font-mono tracking-wider text-slate-600 hidden sm:block">
            STT TERPADU NURUL FIKRI • INFORMATICS
          </div>

          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 pointer-events-none text-[10px] font-mono tracking-wider text-slate-600">
            LAT: -6.36 // LON: 106.83
          </div>

          {/* ── Center Content: Portal Rings, Monogram, Counter & Progress Bar ── */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6">
            {/* Central Animated Hologram Portal */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-8">
              {/* Outer Cyan Ring */}
              <div
                className="absolute inset-0 rounded-full border border-sky-400/30 border-dashed animate-spin"
                style={{ animationDuration: "12s" }}
              />
              {/* Inner Purple Ring */}
              <div
                className="absolute inset-2.5 rounded-full border border-purple-500/30 animate-spin"
                style={{ animationDuration: "8s", animationDirection: "reverse" }}
              />
              {/* Core Pulsing Halo */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-sky-500/20 to-purple-500/20 blur-md animate-pulse" />

              {/* NR Monogram */}
              <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900/80 border border-white/15 backdrop-blur-md shadow-2xl shadow-sky-500/20">
                <span className="text-xl sm:text-2xl font-extrabold tracking-wider bg-gradient-to-br from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  NR
                </span>
              </div>
            </div>

            {/* Percentage Display */}
            <div className="flex items-baseline gap-1 mb-4">
              <span className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]">
                {String(progress).padStart(2, "0")}
              </span>
              <span className="font-mono text-lg font-semibold text-sky-400">
                %
              </span>
            </div>

            {/* Modern Glowing Progress Bar */}
            <div className="relative w-64 sm:w-72 h-1.5 rounded-full bg-slate-800/80 border border-white/10 overflow-hidden mb-4 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            {/* Status Log Ticker */}
            <div className="h-5 flex items-center justify-center">
              <p className="font-mono text-[11px] sm:text-xs tracking-wider text-slate-400 text-center animate-pulse">
                {activeStatus}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
