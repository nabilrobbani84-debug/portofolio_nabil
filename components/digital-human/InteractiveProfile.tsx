"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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

// Floating tech badges orbiting around the hero profile card
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

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);

  const [hasScrolled, setHasScrolled] = useState(false);
  const [badgeAngle, setBadgeAngle]   = useState(0);

  // Anim state for 60fps render loop
  const animStateRef = useRef({
    pointerX: 0,
    pointerY: 0,
    tiltX: 0,
    tiltY: 0,
    floatOffset: 0,
    glowX: 50,
    glowY: 45,
    scrollProgress: 0,
    lerpedScale: 1.0,
    lerpedZ: 0,
    lerpedY: 0,
    videoDuration: 10.0,
    targetVideoTime: 0,
  });

  // ── Video Metadata & Initialization ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        animStateRef.current.videoDuration = video.duration;
      }
    };

    if (video.readyState >= 1) {
      onReady();
    }

    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("canplay", onReady);

    video
      .play()
      .then(() => {
        const scrollY = window.scrollY || 0;
        if (scrollY === 0) {
          video.pause();
          video.currentTime = 0.01;
        }
      })
      .catch(() => {});

    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("canplay", onReady);
    };
  }, []);

  // ── Pointer Tracking for 3D Magnetic Tilt ──
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const radiusX = Math.max(window.innerWidth * 0.4, 350);
      const radiusY = Math.max(window.innerHeight * 0.4, 300);

      animStateRef.current.pointerX = Math.max(
        -1.2,
        Math.min(1.2, (e.clientX - centerX) / radiusX)
      );
      animStateRef.current.pointerY = Math.max(
        -1.2,
        Math.min(1.2, (e.clientY - centerY) / radiusY)
      );

      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      animStateRef.current.glowX = Math.max(0, Math.min(100, gx));
      animStateRef.current.glowY = Math.max(0, Math.min(100, gy));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // ── Scroll Listener: Controls video playback pose + forward zoom ("maju ke depan") ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY > 20 && !hasScrolled) {
        setHasScrolled(true);
      }

      // 0px to 750px scroll range drives the forward movement in Hero
      const maxScrollDist = 750;
      const progress = Math.min(1, Math.max(0, scrollY / maxScrollDist));
      animStateRef.current.scrollProgress = progress;

      const dur = animStateRef.current.videoDuration || 10.0;
      animStateRef.current.targetVideoTime = progress * dur;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  // ── 60fps Loop: 3D Forward Zoom + Video Scrubbing + Orbiting Badges ──
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let badgeAngleCurrent = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const state = animStateRef.current;
      const video = videoRef.current;

      // ── A. Video Scrubbing based on scroll ("videonya bergerak mengikuti pergerakan scroll") ──
      if (video && state.videoDuration > 0) {
        const curTime = video.currentTime;
        const target = state.targetVideoTime;
        const diff = target - curTime;

        if (Math.abs(diff) > 0.03) {
          if (!video.paused) video.pause();
          video.currentTime = Math.max(
            0,
            Math.min(state.videoDuration - 0.05, curTime + diff * 0.25)
          );
        }
      }

      // ── B. 3D Magnetic Tilt ──
      const targetTiltY = reduce ? 0 : state.pointerX * 10;
      const targetTiltX = reduce ? 0 : -state.pointerY * 6;
      state.tiltY += (targetTiltY - state.tiltY) * 0.08;
      state.tiltX += (targetTiltX - state.tiltX) * 0.08;

      // ── C. "Maju Ke Depan" (3D Zoom & Perspective Advance) ──
      const sProgress = state.scrollProgress;
      // When scrolling down, video physically advances forward in 3D perspective
      const targetScale = reduce ? 1.0 : 1.0 + sProgress * 0.22;
      const targetZ     = reduce ? 0 : sProgress * 110; // 110px translateZ towards camera
      const targetY     = reduce ? 0 : sProgress * -20; // rises gently

      state.lerpedScale += (targetScale - state.lerpedScale) * 0.12;
      state.lerpedZ     += (targetZ - state.lerpedZ) * 0.12;
      state.lerpedY     += (targetY - state.lerpedY) * 0.12;

      // Levitation float
      state.floatOffset = reduce ? 0 : Math.sin(time * 0.0018) * 5;

      if (cardRef.current) {
        cardRef.current.style.transform = `
          perspective(1200px)
          translateZ(${state.lerpedZ.toFixed(2)}px)
          scale(${state.lerpedScale.toFixed(3)})
          translateY(${(state.lerpedY + state.floatOffset).toFixed(2)}px)
          rotateY(${state.tiltY.toFixed(2)}deg)
          rotateX(${state.tiltX.toFixed(2)}deg)
        `;
      }

      // ── D. Ambient Glow Dynamic Shift ──
      if (glowRef.current && !reduce) {
        const glowOpacity = 0.35 + sProgress * 0.25;
        const glowScale = 1.0 + sProgress * 0.2;
        glowRef.current.style.transform = `scale(${glowScale.toFixed(2)})`;
        glowRef.current.style.background = `
          radial-gradient(circle at ${state.glowX}% ${state.glowY}%,
            rgba(56,189,248,${glowOpacity}) 0%,
            rgba(99,102,241,${glowOpacity * 0.65}) 40%,
            rgba(168,85,247,${glowOpacity * 0.35}) 70%,
            transparent 85%)
        `;
      }

      // ── E. Orbiting Tech Badges ──
      badgeAngleCurrent = (badgeAngleCurrent + dt * (reduce ? 0 : 16)) % 360;
      setBadgeAngle(badgeAngleCurrent);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, [reduce]);

  const handleReset = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      style={{ perspective: "1400px" }}
    >
      {/* ── Background Cyber Ambient Glow & Portal Ring ── */}
      <div
        ref={glowRef}
        className="absolute -inset-10 rounded-full pointer-events-none transition-transform duration-300 blur-3xl opacity-80"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(56,189,248,0.35) 0%, rgba(99,102,241,0.2) 40%, rgba(168,85,247,0.12) 70%, transparent 100%)",
        }}
      />

      {/* Rotating Cyber Portal Rings */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[21rem] h-[21rem] sm:w-[24rem] sm:h-[24rem] lg:w-[27rem] lg:h-[27rem] rounded-full border border-sky-400/20 border-dashed pointer-events-none animate-spin"
        style={{ animationDuration: "36s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[17rem] h-[17rem] sm:w-[19rem] sm:h-[19rem] lg:w-[22rem] lg:h-[22rem] rounded-full border border-indigo-500/15 pointer-events-none animate-spin"
        style={{ animationDuration: "24s", animationDirection: "reverse" }}
      />

      {/* Energy Sparkles */}
      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute z-40 rounded-full bg-white pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={
            reduce
              ? {}
              : {
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.4, 0.5],
                }
          }
          transition={{ duration: 2.4, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Floating Tech Badges (Orbiting around the hero video) ── */}
      {!reduce &&
        FLOAT_BADGES.map((badge, i) => {
          const angle = ((badgeAngle + badge.orbit) * Math.PI) / 180;
          const rx = 175, ry = 140;
          const bx = Math.cos(angle) * rx;
          const by = Math.sin(angle) * ry;
          const Icon = badge.icon;
          return (
            <motion.div
              key={i}
              className="absolute z-40 pointer-events-none hidden sm:block"
              style={{
                left: "50%",
                top: "45%",
                transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px))`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, type: "spring" }}
            >
              <div className="flex items-center gap-1.5 rounded-full bg-slate-900/90 border border-white/20 backdrop-blur-md shadow-lg shadow-black/70 px-2.5 py-1">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${badge.color}`}
                >
                  <Icon size={9} className="text-white" />
                </span>
                <span className="text-[10px] font-semibold text-white/95 tracking-wide">
                  {badge.label}
                </span>
              </div>
            </motion.div>
          );
        })}

      {/* ── Main Hero Photo / Video Portrait (Clean Modern Portrait Card) ── */}
      <div
        ref={cardRef}
        className="relative w-[18rem] h-[24rem] sm:w-[21rem] sm:h-[27rem] lg:w-[22.5rem] lg:h-[29.5rem] rounded-[2.2rem] overflow-hidden border border-white/15 bg-slate-950 shadow-2xl shadow-sky-500/10 cursor-pointer pointer-events-auto"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Main Video (about-me-loop2.mp4) */}
        <video
          ref={videoRef}
          src="/digitalhuman/about-me-loop2.mp4"
          playsInline
          muted
          autoPlay
          preload="auto"
          className="w-full h-full object-cover object-center pointer-events-none"
        />

        {/* Soft bottom vignette dissolve */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/20 pointer-events-none" />

        {/* ── Top Floating Minimal Status Pill ── */}
        <div className="absolute top-3 inset-x-3 z-40 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-white/15 px-3 py-1 backdrop-blur-md shadow-lg shadow-black/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-200 uppercase font-mono flex items-center gap-1">
              <Sparkles size={10} className="text-sky-400" />
              Interactive Video
            </span>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="pointer-events-auto flex items-center justify-center h-6 w-6 rounded-full bg-slate-950/80 border border-white/15 text-slate-400 hover:text-white backdrop-blur-md transition-colors"
            title="Reset video"
            aria-label="Reset video"
          >
            <RotateCcw size={11} />
          </button>
        </div>

        {/* ── Interactive Scroll Hint (Fades out when scrolled) ── */}
        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute inset-x-3 bottom-5 z-40 flex justify-center pointer-events-none"
            >
              <div className="flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 shadow-xl shadow-sky-500/25">
                <Mouse size={13} className="text-sky-400 animate-bounce" />
                <span className="text-[11px] font-medium tracking-wide text-slate-200">
                  Scroll ke bawah untuk melihat gerakan maju
                </span>
                <ChevronDown size={13} className="text-sky-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Verified Role Chip (Positioned cleanly below the character) ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative mt-3 z-40 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md px-4 py-2 shadow-xl shadow-black/40 whitespace-nowrap pointer-events-none"
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
  );
}

export default InteractiveProfile;
