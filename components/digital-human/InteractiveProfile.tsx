"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, MotionValue } from "framer-motion";
import {
  BadgeCheck,
  RotateCcw,
  Play,
  Pause,
  Sparkles,
  Compass,
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  Mouse,
  Volume2,
  VolumeX,
  ChevronDown,
} from "lucide-react";
import { useSafeReducedMotion } from "../ScrollAnimation";

const TOTAL_FRAMES = 48;
const FRAME_PATHS: string[] = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/digitalhuman/frames/frame_${i.toString().padStart(2, "0")}.webp`
);

// Floating tech badges orbiting the character
const FLOAT_BADGES = [
  { icon: Code2,    label: "React",      color: "from-sky-400 to-cyan-400",     orbit: 0   },
  { icon: Globe,    label: "Next.js",    color: "from-slate-300 to-white",      orbit: 72  },
  { icon: Database, label: "Laravel",    color: "from-red-400 to-orange-400",   orbit: 144 },
  { icon: Cpu,      label: "Python",     color: "from-yellow-400 to-green-400", orbit: 216 },
  { icon: Layers,   label: "TypeScript", color: "from-blue-400 to-indigo-400",  orbit: 288 },
];

// Sparkle particle positions
const SPARKLES = [
  { top: "6%",  left: "14%", size: 3, delay: 0   },
  { top: "16%", left: "86%", size: 4, delay: 0.4 },
  { top: "42%", left: "94%", size: 2, delay: 0.9 },
  { top: "70%", left: "88%", size: 3, delay: 1.3 },
  { top: "84%", left: "10%", size: 4, delay: 0.7 },
  { top: "54%", left: "4%",  size: 2, delay: 1.8 },
  { top: "28%", left: "6%",  size: 3, delay: 2.1 },
];

interface InteractiveProfileProps {
  className?: string;
  scrollProgress?: MotionValue<number>;
}

export function InteractiveProfile({
  className = "",
  scrollProgress,
}: InteractiveProfileProps) {
  const reduce = useSafeReducedMotion();

  const containerRef    = useRef<HTMLDivElement>(null);
  const characterRef    = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const glowRef         = useRef<HTMLDivElement>(null);
  const audioRef        = useRef<HTMLAudioElement>(null);

  const imagesRef       = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const imagesLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  const [initialLoaded, setInitialLoaded]     = useState(false);
  const [mode, setMode]                       = useState<"scroll" | "auto">("scroll");
  const [isMuted, setIsMuted]                 = useState(true);
  const [isDragging, setIsDragging]           = useState(false);
  const [hasScrolled, setHasScrolled]         = useState(false);
  const [badgeAngle, setBadgeAngle]           = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [displayTime, setDisplayTime]         = useState("0.0s");

  // State refs for 60fps render loop
  const animStateRef = useRef({
    mode: "scroll" as "scroll" | "auto",
    targetFrame: 0,
    currentFrame: 0,
    pointerX: 0,
    pointerY: 0,
    isInside: false,
    lastMoveTime: performance.now(),
    isDragging: false,
    dragStartX: 0,
    dragStartFrame: 0,
    tiltX: 0,
    tiltY: 0,
    floatOffset: 0,
    glowX: 50,
    glowY: 45,
    scrollProgressVal: 0,
    lerpedScale: 1.0,
    lerpedZ: 0,
    lerpedY: 0,
  });

  useEffect(() => {
    animStateRef.current.mode = mode;
    if (mode === "auto" && !isMuted && audioRef.current) {
      audioRef.current.play().catch(() => {});
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [mode, isMuted]);

  useEffect(() => {
    animStateRef.current.isDragging = isDragging;
  }, [isDragging]);

  // ── Preload All 48 Transparent Frames ──
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

  // ── Pointer Tracking for 3D Tilt ──
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (animStateRef.current.isDragging) return;
      const character = characterRef.current;
      if (!character) return;
      const rect = character.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const windowRadiusX = Math.max(window.innerWidth * 0.45, 380);
      const windowRadiusY = Math.max(window.innerHeight * 0.45, 300);

      animStateRef.current.pointerX = Math.max(
        -1.2,
        Math.min(1.2, (e.clientX - centerX) / windowRadiusX)
      );
      animStateRef.current.pointerY = Math.max(
        -1.2,
        Math.min(1.2, (e.clientY - centerY) / windowRadiusY)
      );
      animStateRef.current.isInside = true;
      animStateRef.current.lastMoveTime = performance.now();

      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;
      animStateRef.current.glowX = Math.max(0, Math.min(100, gx));
      animStateRef.current.glowY = Math.max(0, Math.min(100, gy));
    };

    const handlePointerLeave = () => {
      animStateRef.current.isInside = false;
    };

    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  // ── Track Scroll Progress from sticky parent ──
  useEffect(() => {
    if (scrollProgress) {
      const unsubscribe = scrollProgress.on("change", (val) => {
        animStateRef.current.scrollProgressVal = val;
        if (val > 0.02 && !hasScrolled) {
          setHasScrolled(true);
        }

        if (animStateRef.current.mode === "scroll" && !animStateRef.current.isDragging) {
          // Progress 0.0 to 0.85 maps to 0 -> 47 frames (putting on sunglasses)
          const clamped = Math.max(0, Math.min(1, val / 0.85));
          animStateRef.current.targetFrame = clamped * (TOTAL_FRAMES - 1);
        }
      });
      return () => unsubscribe();
    } else {
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset || 0;
        if (scrollY > 15 && !hasScrolled) {
          setHasScrolled(true);
        }

        if (animStateRef.current.mode === "scroll" && !animStateRef.current.isDragging) {
          const cycleDist = 750;
          const ratio = Math.max(0, Math.min(1, (scrollY % cycleDist) / (cycleDist * 0.85)));
          animStateRef.current.targetFrame = ratio * (TOTAL_FRAMES - 1);
          animStateRef.current.scrollProgressVal = Math.min(1, scrollY / cycleDist);
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollProgress, hasScrolled]);

  // ── Pointer Drag Handlers ──
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setHasScrolled(true);
    setMode("scroll");
    animStateRef.current.isDragging = true;
    animStateRef.current.dragStartX = e.clientX;
    animStateRef.current.dragStartFrame = animStateRef.current.currentFrame;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!animStateRef.current.isDragging) return;
    const dx = e.clientX - animStateRef.current.dragStartX;
    const frameDelta = (dx / 320) * (TOTAL_FRAMES - 1);
    let newFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, animStateRef.current.dragStartFrame + frameDelta));
    animStateRef.current.targetFrame = newFrame;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (animStateRef.current.isDragging) {
      animStateRef.current.isDragging = false;
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

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

  // ── 60fps Loop: Canvas Drawing + Linear LERP + Forward Zoom ("Maju ke Depan") ──
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let uiUpdateCounter = 0;
    let badgeAngleCurrent = 0;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d", { alpha: true }) : null;

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const state = animStateRef.current;

      // ── A. Frame Calculation ──
      if (state.mode === "auto") {
        state.targetFrame = (state.targetFrame + dt * 18) % TOTAL_FRAMES;
        state.currentFrame = state.targetFrame;
      } else {
        const diff = state.targetFrame - state.currentFrame;
        const lerpFactor = state.isDragging ? 0.35 : reduce ? 0.08 : 0.18;
        state.currentFrame += diff * lerpFactor;
        state.currentFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, state.currentFrame));
      }

      // ── B. 60fps Canvas Frame Drawing (100% Transparent Background) ──
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
          const canvasAspect = cw / ch;
          const imgAspect    = nw / nh;
          let sx = 0, sy = 0, sw = nw, sh = nh;

          if (canvasAspect < imgAspect) {
            sw = nh * canvasAspect;
            sx = (nw - sw) / 2;
          } else {
            sh = nw / canvasAspect;
            sy = (nh - sh) / 2;
          }

          ctx.globalAlpha = 1.0;
          ctx.drawImage(img1, sx, sy, sw, sh, 0, 0, cw, ch);

          // Smooth in-between crossfade for buttery 60fps interpolation
          if (blend > 0.03 && img2 && img2.complete && img2.naturalWidth > 0) {
            ctx.globalAlpha = blend;
            ctx.drawImage(img2, sx, sy, sw, sh, 0, 0, cw, ch);
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // ── C. 3D Tilt ──
      const targetTiltY = reduce ? 0 : state.pointerX * 10;
      const targetTiltX = reduce ? 0 : -state.pointerY * 6;
      state.tiltY += (targetTiltY - state.tiltY) * 0.08;
      state.tiltX += (targetTiltX - state.tiltX) * 0.08;

      // ── D. "Maju ke Depan" (3D Zoom & Forward Motion anchored at eyes/face) ──
      const sProgress = state.scrollProgressVal;
      const targetScale = reduce ? 1.0 : 1.0 + sProgress * 0.25;
      const targetZ     = reduce ? 0 : sProgress * 80;
      const targetY     = reduce ? 0 : sProgress * 16;

      state.lerpedScale += (targetScale - state.lerpedScale) * 0.12;
      state.lerpedZ     += (targetZ - state.lerpedZ) * 0.12;
      state.lerpedY     += (targetY - state.lerpedY) * 0.12;

      // Gentle organic float
      state.floatOffset = reduce ? 0 : Math.sin(time * 0.0016) * 4;

      if (characterRef.current) {
        characterRef.current.style.transformOrigin = "50% 30%";
        characterRef.current.style.transform = `
          perspective(1200px)
          translateZ(${state.lerpedZ.toFixed(2)}px)
          scale(${state.lerpedScale.toFixed(3)})
          translateY(${(state.lerpedY + state.floatOffset).toFixed(2)}px)
          rotateY(${state.tiltY.toFixed(2)}deg)
          rotateX(${state.tiltX.toFixed(2)}deg)
        `;
      }

      // ── E. Ambient Glow expansion ──
      if (glowRef.current && !reduce) {
        const glowOpacity = 0.35 + sProgress * 0.25;
        const glowScale = 1.0 + sProgress * 0.25;
        glowRef.current.style.transform = `scale(${glowScale.toFixed(2)})`;
        glowRef.current.style.background = `
          radial-gradient(circle at ${state.glowX}% ${state.glowY}%,
            rgba(56,189,248,${glowOpacity}) 0%,
            rgba(99,102,241,${glowOpacity * 0.7}) 38%,
            rgba(168,85,247,${glowOpacity * 0.4}) 65%,
            transparent 85%)
        `;
      }

      // ── F. Orbiting Tech Badges & HUD Update ──
      badgeAngleCurrent = (badgeAngleCurrent + dt * (reduce ? 0 : 15)) % 360;
      if (uiUpdateCounter % 4 === 0) {
        setBadgeAngle(badgeAngleCurrent);
        const curFrame = state.currentFrame;
        const pct = Math.round((curFrame / (TOTAL_FRAMES - 1)) * 100);
        setProgressPercent(Math.max(0, Math.min(100, pct)));
        const sec = ((curFrame / (TOTAL_FRAMES - 1)) * 10).toFixed(1);
        setDisplayTime(`${sec}s`);
      }
      uiUpdateCounter++;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
    };
  }, [reduce]);

  // ── Mode & Sound Toggles ──
  const toggleMode = useCallback((newMode: "scroll" | "auto") => {
    setMode(newMode);
    setHasScrolled(true);
  }, []);

  const toggleSound = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        if (!next && mode === "auto") {
          audioRef.current.play().catch(() => {});
        } else {
          audioRef.current.pause();
        }
      }
      return next;
    });
  }, [mode]);

  const handleReset = useCallback(() => {
    setMode("scroll");
    animStateRef.current.targetFrame = 0;
    animStateRef.current.currentFrame = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      style={{ perspective: "1400px" }}
    >
      {/* Hidden audio element for sound sync */}
      <audio
        ref={audioRef}
        src="/digitalhuman/about-me-loop.mp4"
        loop
        preload="none"
      />

      {/* ── Background Cyber Ambient Glow & Portal Ring ── */}
      <div
        ref={glowRef}
        className="absolute -inset-12 rounded-full pointer-events-none transition-transform duration-300 blur-3xl opacity-85"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(56,189,248,0.35) 0%, rgba(99,102,241,0.2) 40%, rgba(168,85,247,0.1) 70%, transparent 100%)",
        }}
      />

      {/* Rotating Cyber HUD Portal Rings (Pure Hologram Feel) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] sm:w-[24rem] sm:h-[24rem] lg:w-[27rem] lg:h-[27rem] rounded-full border border-sky-400/20 border-dashed pointer-events-none animate-spin"
        style={{ animationDuration: "36s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[16rem] h-[16rem] sm:w-[19rem] sm:h-[19rem] lg:w-[22rem] lg:h-[22rem] rounded-full border border-indigo-500/15 pointer-events-none animate-spin"
        style={{ animationDuration: "24s", animationDirection: "reverse" }}
      />

      {/* Sparkle energy particles */}
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

      {/* ── Floating Tech Badges (Orbiting freely around the transparent character) ── */}
      {!reduce &&
        FLOAT_BADGES.map((badge, i) => {
          const angle = ((badgeAngle + badge.orbit) * Math.PI) / 180;
          const rx = 165, ry = 135;
          const bx = Math.cos(angle) * rx;
          const by = Math.sin(angle) * ry;
          const Icon = badge.icon;
          return (
            <motion.div
              key={i}
              className="absolute z-40 pointer-events-none"
              style={{
                left: "50%",
                top: "40%",
                transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px))`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5, type: "spring" }}
            >
              <div className="flex items-center gap-1.5 rounded-full bg-slate-900/85 border border-white/20 backdrop-blur-md shadow-lg shadow-black/60 px-2.5 py-1">
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

      {/* ── Main Frameless Character (100% Transparent Cutout, No Box!) ── */}
      <div
        ref={characterRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-[19rem] h-[24rem] sm:w-[22rem] sm:h-[27rem] lg:w-[24rem] lg:h-[30rem] flex items-center justify-center touch-none ${
          isDragging ? "cursor-ew-resize" : "cursor-grab"
        }`}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Loading Spinner */}
        {!initialLoaded && (
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
            <span className="text-xs font-mono text-sky-300 tracking-wider">
              Loading Digital Human...
            </span>
          </div>
        )}

        {/* ── 60fps Transparent Canvas (ZERO BACKGROUND!) ── */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-500 ${
            initialLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Bottom soft gradient fade into slate-950 so suit blends organically at base */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />

        {/* ── Top Floating Minimal Status Pill ── */}
        <div className="absolute top-2 inset-x-2 z-40 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-white/15 px-2.5 py-1 backdrop-blur-md shadow-lg shadow-black/40">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  mode === "scroll" ? "bg-sky-400" : "bg-purple-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  mode === "scroll" ? "bg-sky-400" : "bg-purple-500"
                }`}
              />
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-200 uppercase font-mono flex items-center gap-1">
              <Sparkles size={10} className={mode === "scroll" ? "text-sky-400" : "text-purple-400"} />
              {mode === "scroll" ? "Scroll Reactive" : "Auto 360°"}
            </span>
          </div>

          <div className="flex items-center gap-1 pointer-events-auto">
            <div className="flex items-center gap-1 rounded-full bg-slate-950/80 border border-white/15 px-2 py-1 backdrop-blur-md shadow-lg text-[10px] font-mono text-sky-300">
              <Compass size={11} className="text-sky-400" />
              <span>{displayTime}</span>
            </div>

            <button
              type="button"
              onClick={toggleSound}
              className={`flex items-center justify-center h-6 w-6 rounded-full border border-white/15 backdrop-blur-md transition-all ${
                isMuted
                  ? "bg-slate-950/80 text-slate-400 hover:text-white"
                  : "bg-sky-500/25 border-sky-400/40 text-sky-300 shadow-sm shadow-sky-500/30"
              }`}
              title={isMuted ? "Aktifkan suara" : "Matikan suara"}
              aria-label="Toggle sound"
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
          </div>
        </div>

        {/* ── Interactive Scroll Hint (Fades out when scrolled) ── */}
        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute inset-x-2 bottom-6 z-40 flex justify-center pointer-events-none"
            >
              <div className="flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 shadow-xl shadow-sky-500/25">
                <Mouse size={13} className="text-sky-400 animate-bounce" />
                <span className="text-[11px] font-medium tracking-wide text-slate-200">
                  Scroll ke bawah untuk maju ke depan
                </span>
                <ChevronDown size={13} className="text-sky-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Floating Controls Toolbar (Positioned cleanly below the character) ── */}
      <div className="relative mt-1 z-40 flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 bg-slate-900/80 border border-white/15 rounded-full px-2 py-1 backdrop-blur-md shadow-xl shadow-black/50">
          <button
            type="button"
            onClick={() => toggleMode("scroll")}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
              mode === "scroll"
                ? "bg-sky-500/25 text-sky-300 border border-sky-400/30 shadow-sm shadow-sky-500/25"
                : "text-slate-400 hover:text-white"
            }`}
            title="Gerakan video mengikuti posisi scroll (Maju ke depan)"
            aria-label="Scroll Sync mode"
          >
            <Mouse size={11} />
            <span>Scroll Sync</span>
          </button>

          <button
            type="button"
            onClick={() => toggleMode("auto")}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium transition-all ${
              mode === "auto"
                ? "bg-purple-500/25 text-purple-300 border border-purple-400/30 shadow-sm shadow-purple-500/25"
                : "text-slate-400 hover:text-white"
            }`}
            title="Putar video loop otomatis"
            aria-label="Auto Loop mode"
          >
            {mode === "auto" ? <Pause size={11} /> : <Play size={11} />}
            <span>Auto Loop</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center h-6 w-6 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Reset ke posisi awal"
            aria-label="Reset video"
          >
            <RotateCcw size={11} />
          </button>

          <div className="h-3 w-px bg-white/15 mx-0.5" />

          {/* Progress % */}
          <div className="flex items-center gap-1 text-[10px] text-gray-300 font-mono px-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{progressPercent}%</span>
          </div>
        </div>

        {/* ── Verified Role Chip ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 shadow-xl shadow-black/40 whitespace-nowrap pointer-events-none"
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
  );
}

export default InteractiveProfile;
