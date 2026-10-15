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

const TOTAL_FRAMES = 48;
const FRAME_PATHS: string[] = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/digitalhuman/frames/frame_${i.toString().padStart(2, "0")}.webp`
);

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

  const containerRef    = useRef<HTMLDivElement>(null);
  const characterRef    = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const glowRef         = useRef<HTMLDivElement>(null);
  const badgesGroupRef  = useRef<HTMLDivElement>(null);

  const imagesRef       = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const imagesLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  const [initialLoaded, setInitialLoaded] = useState(false);
  const [badgeAngle, setBadgeAngle]       = useState(0);

  // State refs for 60fps render loop
  const animStateRef = useRef({
    targetFrame: 0,
    currentFrame: 0,
    pointerX: 0,
    pointerY: 0,
    tiltX: 0,
    tiltY: 0,
    floatOffset: 0,
    glowX: 50,
    glowY: 45,
    lerpedOpacity: 0.92,
    lerpedScale: 1.0,
    scrollProgress: 0,
  });

  // ── Preload 48 Transparent Frames ──
  useEffect(() => {
    let isCancelled = false;
    const priorityIndices = [0, 47, 24, 12, 36, 1, 2, 3, 4, 5];
    const otherIndices    = Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(
      (i) => !priorityIndices.includes(i)
    );
    const loadOrder = [...priorityIndices, ...otherIndices];

    loadOrder.forEach((index) => {
      const img = new window.Image();
      img.src = FRAME_PATHS[index];
      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[index] = img;
        imagesLoadedRef.current[index] = true;
        if (index === 0) setInitialLoaded(true);
      };
    });

    return () => {
      isCancelled = true;
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

  // ── Global Scroll Listener: Drives video motion & background presence ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Scroll range 0 to 1400px maps to frame 0 -> 47 (putting on sunglasses)
      const moveDistance = 1400;
      const progress = Math.min(1, Math.max(0, scrollY / moveDistance));
      animStateRef.current.scrollProgress = progress;
      animStateRef.current.targetFrame = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── DPR Canvas Resize ──
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const character = characterRef.current;
      if (!canvas || !character) return;
      const rect = character.getBoundingClientRect();
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── 60fps Loop: Canvas Frame Drawing + Scroll-driven seek + 3D Tilt ──
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let badgeAngleCurrent = 0;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d", { alpha: true }) : null;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const state = animStateRef.current;

      // ── A. Frame Seek Interpolation ──
      const diff = state.targetFrame - state.currentFrame;
      state.currentFrame += diff * 0.16;
      state.currentFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, state.currentFrame));

      // ── B. 60fps Canvas Frame Drawing (100% Transparent Cutout) ──
      if (ctx && canvas && canvas.width > 0 && canvas.height > 0) {
        const cw = canvas.width;
        const ch = canvas.height;
        ctx.clearRect(0, 0, cw, ch);

        const fIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, state.currentFrame));
        const i1 = Math.floor(fIndex);
        const i2 = Math.min(TOTAL_FRAMES - 1, i1 + 1);
        const blend = fIndex - i1;

        const img1 = imagesRef.current[i1] || imagesRef.current[0];
        const img2 = imagesRef.current[i2] || img1;

        if (img1 && img1.complete && img1.naturalWidth > 0) {
          const nw = img1.naturalWidth;
          const nh = img1.naturalHeight;

          // Fit image fully within canvas (contain) so head, sunglasses, and hands are NEVER clipped
          const scale = Math.min(cw / nw, ch / nh);
          const dw = nw * scale;
          const dh = nh * scale;
          const dx = (cw - dw) / 2;
          const dy = ch - dh; // align to bottom

          ctx.globalAlpha = 1.0;
          ctx.drawImage(img1, 0, 0, nw, nh, dx, dy, dw, dh);

          if (blend > 0.03 && img2 && img2.complete && img2.naturalWidth > 0) {
            ctx.globalAlpha = blend;
            ctx.drawImage(img2, 0, 0, nw, nh, dx, dy, dw, dh);
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // ── C. 3D Tilt from mouse ──
      const targetTiltY = reduce ? 0 : state.pointerX * 7;
      const targetTiltX = reduce ? 0 : -state.pointerY * 4;
      state.tiltY += (targetTiltY - state.tiltY) * 0.08;
      state.tiltX += (targetTiltX - state.tiltX) * 0.08;

      // ── D. Ambient Depth & Opacity Shift across page ──
      // Hero (progress=0): opacity 0.95 (crisp focal presence)
      // Lower sections (progress=1): opacity 0.70 (vivid futuristic background without obscuring text)
      const targetOpacity = 0.95 - state.scrollProgress * 0.25;
      state.lerpedOpacity += (targetOpacity - state.lerpedOpacity) * 0.1;

      // Gentle scale expansion ("maju ke depan")
      const targetScale = 1.0 + state.scrollProgress * 0.12;
      state.lerpedScale += (targetScale - state.lerpedScale) * 0.1;

      state.floatOffset = reduce ? 0 : Math.sin(time * 0.0016) * 5;

      if (characterRef.current) {
        characterRef.current.style.opacity = state.lerpedOpacity.toFixed(2);
        characterRef.current.style.transform = `
          perspective(1200px)
          scale(${state.lerpedScale.toFixed(3)})
          translateY(${state.floatOffset.toFixed(2)}px)
          rotateY(${state.tiltY.toFixed(2)}deg)
          rotateX(${state.tiltX.toFixed(2)}deg)
        `;
      }

      // ── E. Ambient Glow updates ──
      if (glowRef.current && !reduce) {
        glowRef.current.style.background = `
          radial-gradient(circle at ${state.glowX}% ${state.glowY}%,
            rgba(56,189,248,0.3) 0%,
            rgba(99,102,241,0.18) 40%,
            rgba(168,85,247,0.1) 68%,
            transparent 85%)
        `;
      }

      // ── F. Orbit Badges & Scroll Fade ──
      badgeAngleCurrent = (badgeAngleCurrent + dt * (reduce ? 0 : 14)) % 360;
      setBadgeAngle(badgeAngleCurrent);

      // Gracefully fade out orbiting badges when scrolling into lower sections
      if (badgesGroupRef.current) {
        const badgeOpacity = Math.max(0, 1 - state.scrollProgress * 3.5);
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
      <div className="absolute right-0 sm:right-4 lg:right-10 xl:right-20 top-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Background Cyber Ambient Glow */}
        <div
          ref={glowRef}
          className="absolute -inset-16 rounded-full blur-3xl opacity-75 pointer-events-none transition-all duration-300"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(56,189,248,0.3) 0%, rgba(99,102,241,0.18) 40%, rgba(168,85,247,0.1) 70%, transparent 100%)",
          }}
        />

        {/* Rotating Cyber Portal Rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] sm:w-[24rem] sm:h-[24rem] lg:w-[28rem] lg:h-[28rem] rounded-full border border-sky-400/15 border-dashed pointer-events-none animate-spin"
          style={{ animationDuration: "38s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[16rem] h-[16rem] sm:w-[20rem] sm:h-[20rem] lg:w-[23rem] lg:h-[23rem] rounded-full border border-indigo-500/10 pointer-events-none animate-spin"
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
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.3, 0.5],
                  }
            }
            transition={{ duration: 2.6, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── Floating Tech Badges (Orbiting around the transparent character in background) ── */}
        {!reduce && (
          <div ref={badgesGroupRef} className="pointer-events-none transition-opacity duration-300">
            {FLOAT_BADGES.map((badge, i) => {
              const angle = ((badgeAngle + badge.orbit) * Math.PI) / 180;
              const rx = 165, ry = 135;
              const bx = Math.cos(angle) * rx;
              const by = Math.sin(angle) * ry;
              const Icon = badge.icon;
              return (
                <div
                  key={i}
                  className="absolute z-10 pointer-events-none hidden sm:block"
                  style={{
                    left: "50%",
                    top: "40%",
                    transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px))`,
                  }}
                >
                  <div className="flex items-center gap-1.5 rounded-full bg-slate-900/70 border border-white/15 backdrop-blur-md shadow-lg shadow-black/50 px-2.5 py-1">
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

        {/* ── Main Frameless Character Canvas (100% Transparent Cutout, ZERO Background) ── */}
        <div
          ref={characterRef}
          className="relative w-[16rem] h-[28.5rem] sm:w-[19rem] sm:h-[33.8rem] lg:w-[22rem] lg:h-[39rem] xl:w-[24.5rem] xl:h-[43.5rem] flex items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          {/* 60fps Transparent Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-500 ${
              initialLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Bottom subtle fade into slate-950 so suit blends organically */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default BackgroundDigitalHuman;
