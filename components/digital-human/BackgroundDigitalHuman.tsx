"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
} from "lucide-react";
import { useSafeReducedMotion } from "../ScrollAnimation";

// Floating tech badges orbiting the character in the background
const FLOAT_BADGES = [
  { icon: Code2,    label: "React",      color: "from-sky-400 to-cyan-400",     orbit: 0   },
  { icon: Globe,    label: "Next.js",    color: "from-slate-300 to-white",      orbit: 72  },
  { icon: Database, label: "Laravel",    color: "from-red-400 to-orange-400",   orbit: 144 },
  { icon: Cpu,      label: "Python",     color: "from-yellow-400 to-green-400", orbit: 216 },
  { icon: Layers,   label: "TypeScript", color: "from-blue-400 to-indigo-400",  orbit: 288 },
];

const SPARKLES = [
  { top: "8%",  left: "12%", size: 3, delay: 0   },
  { top: "18%", left: "88%", size: 4, delay: 0.4 },
  { top: "42%", left: "95%", size: 2, delay: 0.9 },
  { top: "68%", left: "90%", size: 3, delay: 1.3 },
  { top: "82%", left: "10%", size: 4, delay: 0.7 },
  { top: "54%", left: "4%",  size: 2, delay: 1.8 },
  { top: "30%", left: "6%",  size: 3, delay: 2.1 },
];

export function BackgroundDigitalHuman() {
  const reduce = useSafeReducedMotion();

  const containerRef   = useRef<HTMLDivElement>(null);
  const characterRef   = useRef<HTMLDivElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const glowRef        = useRef<HTMLDivElement>(null);
  const badgesGroupRef = useRef<HTMLDivElement>(null);

  const [badgeAngle, setBadgeAngle] = useState(0);

  // State refs for 60fps render loop
  const animStateRef = useRef({
    videoDuration: 10.0,
    targetVideoTime: 0,
    pointerX: 0,
    pointerY: 0,
    tiltX: 0,
    tiltY: 0,
    floatOffset: 0,
    glowX: 50,
    glowY: 45,
    lerpedOpacity: 0.95,
    lerpedScale: 1.0,
    lerpedZ: 0,
    lerpedY: 0,
    scrollProgress: 0,
  });

  // ── Video Readiness & Autoplay Kickstart ──
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

  // ── Global Pointer Tracking for 3D Perspective Tilt ──
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      const windowRadiusX = Math.max(window.innerWidth * 0.5, 400);
      const windowRadiusY = Math.max(window.innerHeight * 0.5, 300);

      const cx = window.innerWidth * 0.75;
      const cy = window.innerHeight * 0.5;

      animStateRef.current.pointerX = Math.max(
        -1.2,
        Math.min(1.2, (e.clientX - cx) / windowRadiusX)
      );
      animStateRef.current.pointerY = Math.max(
        -1.2,
        Math.min(1.2, (e.clientY - cy) / windowRadiusY)
      );

      animStateRef.current.glowX = 40 + (e.clientX / window.innerWidth) * 20;
      animStateRef.current.glowY = 35 + (e.clientY / window.innerHeight) * 20;
    };

    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
    };
  }, []);

  // ── Global Scroll Listener: Drives video motion & forward 3D advance across page sections ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Scroll distance 2400px maps forward movement across Hero, About, Skills
      const moveDistance = 2400;
      const progress = Math.min(1, Math.max(0, scrollY / moveDistance));
      animStateRef.current.scrollProgress = progress;

      const dur = animStateRef.current.videoDuration || 10.0;
      animStateRef.current.targetVideoTime = progress * dur;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── 60fps Loop: Video Scrubbing + 3D Forward Zoom ("Maju ke Depan") + Mouse Tilt ──
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let badgeAngleCurrent = 0;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const state = animStateRef.current;
      const video = videoRef.current;

      // ── A. Video Seek Interpolation ("gaya dari foto bergerak makin maju seperti pada videonya") ──
      if (video && state.videoDuration > 0) {
        const curTime = video.currentTime;
        const target = state.targetVideoTime;
        const diff = target - curTime;

        if (Math.abs(diff) > 0.03) {
          if (!video.paused) video.pause();
          video.currentTime = Math.max(
            0,
            Math.min(state.videoDuration - 0.05, curTime + diff * 0.24)
          );
        }
      }

      // ── B. 3D Tilt from mouse ──
      const targetTiltY = reduce ? 0 : state.pointerX * 8;
      const targetTiltX = reduce ? 0 : -state.pointerY * 5;
      state.tiltY += (targetTiltY - state.tiltY) * 0.08;
      state.tiltX += (targetTiltX - state.tiltX) * 0.08;

      // ── C. "Maju ke Depan" (3D Zoom & Perspective Advance on Scroll) ──
      const sProgress = state.scrollProgress;
      // In Hero: scale 1.0, translateZ 0px
      // As user scrolls down to About, Skills: video physically expands and advances forward 140px in 3D
      const targetScale = reduce ? 1.0 : 1.0 + sProgress * 0.32;
      const targetZ     = reduce ? 0 : sProgress * 140;
      const targetY     = reduce ? 0 : sProgress * -25;

      state.lerpedScale += (targetScale - state.lerpedScale) * 0.1;
      state.lerpedZ     += (targetZ - state.lerpedZ) * 0.1;
      state.lerpedY     += (targetY - state.lerpedY) * 0.1;

      // Opacity: Hero (progress=0) is 0.95, smoothly settles at 0.75 in lower sections
      const targetOpacity = 0.95 - sProgress * 0.20;
      state.lerpedOpacity += (targetOpacity - state.lerpedOpacity) * 0.08;

      state.floatOffset = reduce ? 0 : Math.sin(time * 0.0016) * 5;

      if (characterRef.current) {
        characterRef.current.style.opacity = state.lerpedOpacity.toFixed(2);
        characterRef.current.style.transform = `
          perspective(1400px)
          translateZ(${state.lerpedZ.toFixed(2)}px)
          scale(${state.lerpedScale.toFixed(3)})
          translateY(${(state.lerpedY + state.floatOffset).toFixed(2)}px)
          rotateY(${state.tiltY.toFixed(2)}deg)
          rotateX(${state.tiltX.toFixed(2)}deg)
        `;
      }

      // ── D. Ambient Glow updates ──
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

      // ── E. Orbit Badges ──
      badgeAngleCurrent = (badgeAngleCurrent + dt * (reduce ? 0 : 14)) % 360;
      setBadgeAngle(badgeAngleCurrent);

      if (badgesGroupRef.current) {
        const badgeOpacity = Math.max(0.2, 1 - sProgress * 1.5);
        badgesGroupRef.current.style.opacity = badgeOpacity.toFixed(2);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, [reduce]);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ perspective: "1400px" }}
      aria-hidden="true"
    >
      {/* ── Positioned on the right side of the screen as a persistent background element ── */}
      <div className="absolute right-0 sm:right-2 lg:right-4 xl:right-10 top-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Background Cyber Ambient Glow */}
        <div
          ref={glowRef}
          className="absolute -inset-24 rounded-full blur-3xl opacity-80 pointer-events-none transition-all duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(56,189,248,0.35) 0%, rgba(99,102,241,0.2) 40%, rgba(168,85,247,0.12) 70%, transparent 100%)",
          }}
        />

        {/* Rotating Cyber Portal Rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-[22rem] sm:w-[26rem] sm:h-[26rem] lg:w-[30rem] lg:h-[30rem] rounded-full border border-sky-400/20 border-dashed pointer-events-none animate-spin"
          style={{ animationDuration: "38s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] lg:w-[25rem] lg:h-[25rem] rounded-full border border-indigo-500/15 pointer-events-none animate-spin"
          style={{ animationDuration: "26s", animationDirection: "reverse" }}
        />

        {/* Energy Sparkles */}
        {SPARKLES.map((s, i) => (
          <motion.div
            key={i}
            className="absolute z-10 rounded-full bg-white pointer-events-none"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
            animate={
              reduce
                ? {}
                : {
                    opacity: [0, 0.85, 0],
                    scale: [0.5, 1.4, 0.5],
                  }
            }
            transition={{ duration: 2.6, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── Floating Tech Badges (Orbiting around the character in background) ── */}
        {!reduce && (
          <div ref={badgesGroupRef} className="pointer-events-none transition-opacity duration-300">
            {FLOAT_BADGES.map((badge, i) => {
              const angle = ((badgeAngle + badge.orbit) * Math.PI) / 180;
              const rx = 185, ry = 150;
              const bx = Math.cos(angle) * rx;
              const by = Math.sin(angle) * ry;
              const Icon = badge.icon;
              return (
                <div
                  key={i}
                  className="absolute z-10 pointer-events-none hidden sm:block"
                  style={{
                    left: "50%",
                    top: "45%",
                    transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px))`,
                  }}
                >
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-white/15 backdrop-blur-md shadow-lg shadow-black/60 px-2.5 py-1">
                    <span
                      className={`flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br ${badge.color}`}
                    >
                      <Icon size={8} className="text-white" />
                    </span>
                    <span className="text-[9px] font-semibold text-white/90 tracking-wide">
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Main Frameless Character Video (TIDAK DIKOTAKIN: ZERO BOX, ZERO BORDER) ── */}
        <div
          ref={characterRef}
          className="relative w-[20rem] h-[29rem] sm:w-[24rem] sm:h-[35rem] lg:w-[28rem] lg:h-[41rem] xl:w-[32rem] xl:h-[47rem] flex items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          {/* Frameless Feathered Video Container: Completely feather-soft oval mask that eliminates all straight borders */}
          <div
            className="relative w-full h-full overflow-hidden pointer-events-none flex items-center justify-center"
            style={{
              maskImage:
                "radial-gradient(ellipse 42% 44% at 50% 45%, black 25%, rgba(0,0,0,0.7) 45%, transparent 68%), linear-gradient(to bottom, black 60%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 42% 44% at 50% 45%, black 25%, rgba(0,0,0,0.7) 45%, transparent 68%), linear-gradient(to bottom, black 60%, transparent 95%)",
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
              className="w-full h-full object-cover object-top pointer-events-none"
            />

            {/* Soft bottom dissolve into dark slate-950 */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackgroundDigitalHuman;
