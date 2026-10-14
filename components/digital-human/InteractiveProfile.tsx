"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import {
  BadgeCheck,
  RotateCw,
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
  Zap,
} from "lucide-react";
import { useSafeReducedMotion } from "../ScrollAnimation";

const TOTAL_FRAMES = 48;
const FRAME_PATHS: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  `/digital-human-frames/frame_${i.toString().padStart(2, "0")}.jpg`
);

// Floating tech badges orbiting the card
const FLOAT_BADGES = [
  { icon: Code2,    label: "React",    color: "from-sky-400 to-cyan-400",    orbit: 0   },
  { icon: Globe,    label: "Next.js",  color: "from-slate-300 to-white",     orbit: 72  },
  { icon: Database, label: "Laravel",  color: "from-red-400 to-orange-400",  orbit: 144 },
  { icon: Cpu,      label: "Python",   color: "from-yellow-400 to-green-400",orbit: 216 },
  { icon: Layers,   label: "TypeScript",color:"from-blue-400 to-indigo-400", orbit: 288 },
];

// Sparkle particle positions (static)
const SPARKLES = [
  { top: "8%",  left: "12%",  size: 3, delay: 0    },
  { top: "18%", left: "88%",  size: 4, delay: 0.4  },
  { top: "42%", left: "94%",  size: 2, delay: 0.9  },
  { top: "72%", left: "88%",  size: 3, delay: 1.3  },
  { top: "85%", left: "10%",  size: 4, delay: 0.7  },
  { top: "55%", left: "4%",   size: 2, delay: 1.8  },
  { top: "30%", left: "6%",   size: 3, delay: 2.1  },
];

interface InteractiveProfileProps {
  className?: string;
}

export function InteractiveProfile({ className = "" }: InteractiveProfileProps) {
  const reduce = useSafeReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const glowRef      = useRef<HTMLDivElement>(null);

  const imagesRef        = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const imagesLoadedRef  = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  const [initialLoaded, setInitialLoaded]  = useState(false);
  const [loadedCount,   setLoadedCount]    = useState(0);
  const [isAutoOrbit,   setIsAutoOrbit]    = useState(false);
  const [isDragging,    setIsDragging]     = useState(false);
  const [hasInteracted, setHasInteracted]  = useState(false);
  const [displayAngle,  setDisplayAngle]   = useState(0);
  const [badgeAngle,    setBadgeAngle]     = useState(0); // orbit angle for badges

  const animStateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    velocity: 0,
    pointerX: 0,
    pointerY: 0,
    isInside: false,
    lastMoveTime: performance.now(),
    isDragging: false,
    dragStartX: 0,
    dragStartFrame: 0,
    isAutoOrbit: false,
    tiltX: 0,
    tiltY: 0,
    floatOffset: 0, // for levitation sine wave
    glowX: 50,
    glowY: 50,
  });

  useEffect(() => { animStateRef.current.isAutoOrbit = isAutoOrbit; }, [isAutoOrbit]);
  useEffect(() => { animStateRef.current.isDragging  = isDragging;  }, [isDragging]);

  // ── Preload frames ──
  useEffect(() => {
    let isCancelled = false;
    const priorityIndices = [0, 1, 47, 2, 46, 3, 45, 4, 44, 5, 43, 6, 42];
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
        setLoadedCount((prev) => {
          const next = prev + 1;
          if (next >= 12 && !initialLoaded) setInitialLoaded(true);
          return next;
        });
      };
      img.onerror = () => {
        if (isCancelled) return;
        const fallback = new window.Image();
        fallback.src = "/profile.jpg";
        fallback.onload = () => {
          imagesRef.current[index] = fallback;
          imagesLoadedRef.current[index] = true;
        };
      };
    });
    return () => { isCancelled = true; };
  }, [initialLoaded]);

  // ── Global pointer tracking ──
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (animStateRef.current.isDragging) return;
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top  + rect.height / 2;
      const windowRadiusX = Math.max(window.innerWidth  * 0.45, 380);
      const windowRadiusY = Math.max(window.innerHeight * 0.45, 300);
      animStateRef.current.pointerX = Math.max(-1.4, Math.min(1.4, (e.clientX - centerX) / windowRadiusX));
      animStateRef.current.pointerY = Math.max(-1.4, Math.min(1.4, (e.clientY - centerY) / windowRadiusY));
      animStateRef.current.isInside = true;
      animStateRef.current.lastMoveTime = performance.now();
      // Glow position relative to card
      const gx = ((e.clientX - rect.left) / rect.width)  * 100;
      const gy = ((e.clientY - rect.top)  / rect.height) * 100;
      animStateRef.current.glowX = Math.max(0, Math.min(100, gx));
      animStateRef.current.glowY = Math.max(0, Math.min(100, gy));
    };
    const handlePointerLeave = () => { animStateRef.current.isInside = false; };

    window.addEventListener("pointermove", handleGlobalPointerMove, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handleGlobalPointerMove);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  // ── Drag handlers ──
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true); setHasInteracted(true); setIsAutoOrbit(false);
    animStateRef.current.isDragging    = true;
    animStateRef.current.isAutoOrbit   = false;
    animStateRef.current.velocity      = 0;
    animStateRef.current.dragStartX    = e.clientX;
    animStateRef.current.dragStartFrame = animStateRef.current.currentFrame;
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!animStateRef.current.isDragging) return;
    const dx = e.clientX - animStateRef.current.dragStartX;
    const frameDelta = dx / 6.5;
    animStateRef.current.targetFrame = ((animStateRef.current.dragStartFrame + frameDelta) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;
    animStateRef.current.velocity    = dx * 0.035;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (animStateRef.current.isDragging) {
      animStateRef.current.isDragging = false;
      setIsDragging(false);
      animStateRef.current.lastMoveTime = performance.now();
      try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
    }
  };

  // ── Main animation loop ──
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let hudUpdateCounter = 0;
    let badgeAngleCurrent = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const state = animStateRef.current;
      const timeSinceMove = (time - state.lastMoveTime) / 1000;

      // ── A. Frame target ──
      if (state.isDragging) {
        // drag controls directly
      } else if (state.isAutoOrbit) {
        state.targetFrame = (state.targetFrame + 2.4 * dt) % TOTAL_FRAMES;
      } else if (Math.abs(state.velocity) > 0.08) {
        state.targetFrame = ((state.targetFrame + state.velocity * dt * 45) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;
        state.velocity *= 0.92;
      } else {
        if (timeSinceMove > 2.2 || state.isInside) {
          const maxTurnFrames = 5.8;
          const turnOffset = state.pointerX * maxTurnFrames;
          let cursorTarget = turnOffset >= 0 ? turnOffset : TOTAL_FRAMES + turnOffset;
          if (!state.isInside || timeSinceMove > 1.2) {
            const breath = Math.sin(time * 0.0016) * 0.7;
            cursorTarget = (cursorTarget + breath + TOTAL_FRAMES) % TOTAL_FRAMES;
          }
          state.targetFrame = cursorTarget;
        }
      }

      // ── B. Circular smoothing ──
      let diff = state.targetFrame - state.currentFrame;
      diff = ((diff + TOTAL_FRAMES / 2) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES - TOTAL_FRAMES / 2;
      const smoothing = state.isDragging ? 0.35 : (reduce ? 0.08 : 0.12);
      state.currentFrame = ((state.currentFrame + diff * smoothing) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;

      // ── C. Enhanced 3D Card Tilt (more pronounced) ──
      const targetTiltY = reduce ? 0 : state.pointerX * 18;  // was 9, now 18
      const targetTiltX = reduce ? 0 : -state.pointerY * 12; // was 6, now 12
      state.tiltY += (targetTiltY - state.tiltY) * 0.08;
      state.tiltX += (targetTiltX - state.tiltX) * 0.08;

      // ── D. Floating levitation ──
      state.floatOffset = reduce ? 0 : Math.sin(time * 0.0014) * 8; // ±8px float

      if (cardRef.current) {
        cardRef.current.style.transform = `
          perspective(1000px)
          rotateY(${state.tiltY.toFixed(2)}deg)
          rotateX(${state.tiltX.toFixed(2)}deg)
          translateY(${state.floatOffset.toFixed(2)}px)
        `;
      }

      // ── E. Dynamic glow follow ──
      if (glowRef.current && !reduce) {
        glowRef.current.style.background = `
          radial-gradient(ellipse 60% 60% at ${state.glowX}% ${state.glowY}%,
            rgba(56,189,248,0.45) 0%,
            rgba(99,102,241,0.25) 40%,
            rgba(168,85,247,0.15) 70%,
            transparent 100%)
        `;
      }

      // ── F. Canvas rendering ──
      if (ctx && canvas) {
        const floatIndex = ((state.currentFrame % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
        const i1   = Math.floor(floatIndex);
        const i2   = (i1 + 1) % TOTAL_FRAMES;
        const blend = floatIndex - i1;
        const img1 = imagesRef.current[i1] || imagesRef.current[0];
        const img2 = imagesRef.current[i2] || img1;

        if (img1 && img1.complete && img1.naturalWidth > 0) {
          const cw = canvas.width, ch = canvas.height;
          ctx.clearRect(0, 0, cw, ch);
          const nw = img1.naturalWidth, nh = img1.naturalHeight;
          const canvasAspect = cw / ch, imgAspect = nw / nh;
          let sx = 0, sy = 0, sw = nw, sh = nh;
          if (canvasAspect < imgAspect) { sw = nh * canvasAspect; sx = (nw - sw) / 2; }
          else                           { sh = nw / canvasAspect; sy = (nh - sh) / 2; }
          ctx.globalAlpha = 1.0;
          ctx.drawImage(img1, sx, sy, sw, sh, 0, 0, cw, ch);
          if (blend > 0.02 && img2 && img2.complete && img2.naturalWidth > 0) {
            ctx.globalAlpha = blend;
            ctx.drawImage(img2, sx, sy, sw, sh, 0, 0, cw, ch);
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // ── G. Rotate badge orbit ──
      badgeAngleCurrent = (badgeAngleCurrent + dt * (reduce ? 0 : 18)) % 360;
      if (hudUpdateCounter % 3 === 0) {
        setBadgeAngle(badgeAngleCurrent);
        let deg = (state.currentFrame / TOTAL_FRAMES) * 360;
        if (deg > 180) deg -= 360;
        setDisplayAngle(Math.round(deg));
      }
      hudUpdateCounter++;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animId); };
  }, [reduce]);

  // ── DPR resize ──
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current, card = cardRef.current;
      if (!canvas || !card) return;
      const rect = card.getBoundingClientRect();
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(rect.width  * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReset = useCallback(() => {
    setIsAutoOrbit(false);
    animStateRef.current.isAutoOrbit = false;
    animStateRef.current.targetFrame = 0;
    animStateRef.current.velocity    = 0;
    animStateRef.current.pointerX   = 0;
    animStateRef.current.pointerY   = 0;
    setHasInteracted(true);
  }, []);

  const toggleAutoOrbit = useCallback(() => {
    setIsAutoOrbit((prev) => !prev);
    setHasInteracted(true);
  }, []);

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className={`relative select-none ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* ── Sparkle particles ── */}
      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute z-50 rounded-full bg-white pointer-events-none"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={reduce ? {} : {
            opacity: [0, 1, 0],
            scale:   [0.5, 1.4, 0.5],
          }}
          transition={{ duration: 2.2, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* ── Floating tech badges (orbit) ── */}
      {!reduce && FLOAT_BADGES.map((badge, i) => {
        const angle = ((badgeAngle + badge.orbit) * Math.PI) / 180;
        const rx = 162, ry = 130; // orbit radii
        const bx = Math.cos(angle) * rx;
        const by = Math.sin(angle) * ry;
        const Icon = badge.icon;
        return (
          <motion.div
            key={i}
            className="absolute z-50 pointer-events-none"
            style={{
              left: "50%",
              top:  "50%",
              transform: `translate(calc(-50% + ${bx}px), calc(-50% + ${by}px))`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.5, type: "spring" }}
          >
            <div className={`flex items-center gap-1 rounded-full bg-slate-900/90 border border-white/20 backdrop-blur-md shadow-lg shadow-black/40 px-2 py-1`}>
              <span className={`flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${badge.color}`}>
                <Icon size={9} className="text-white" />
              </span>
              <span className="text-[9px] font-semibold text-white/90 tracking-wide">{badge.label}</span>
            </div>
          </motion.div>
        );
      })}

      {/* ── Dynamic glow halo (follows cursor) ── */}
      <div
        ref={glowRef}
        className="absolute -inset-10 rounded-[3rem] pointer-events-none transition-all duration-300"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(56,189,248,0.35) 0%, rgba(99,102,241,0.2) 40%, transparent 100%)",
          filter: "blur(24px)",
        }}
      />

      {/* ── Animated rotating gradient border ring ── */}
      <motion.div
        className="absolute -inset-[3px] rounded-[2.2rem] pointer-events-none"
        style={{ background: "conic-gradient(from 0deg, #38bdf8, #818cf8, #a855f7, #ec4899, #38bdf8)" }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Inner mask to hide the conic gradient inside ── */}
      <div
        className="absolute inset-[1px] rounded-[2.1rem] pointer-events-none"
        style={{ background: "transparent" }}
      />

      {/* ── Main 3D Card ── */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-64 h-80 sm:w-72 sm:h-[24rem] lg:w-[21rem] lg:h-[28rem] rounded-[2rem] overflow-hidden border border-white/15 bg-slate-950 touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.95), 0 0 60px rgba(56,189,248,0.2), 0 0 120px rgba(99,102,241,0.1)",
          willChange: "transform",
        }}
      >
        {/* Static fallback image */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src="/digital-human-frames/frame_00.jpg"
            alt="Nabil Robbani 3D Digital Human"
            fill priority
            sizes="(max-width: 1024px) 18rem, 21rem"
            className="object-cover object-top"
          />
        </div>

        {/* 60fps canvas */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-10 w-full h-full transition-opacity duration-500 ${
            initialLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Dynamic specular sheen */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle 300px at ${animStateRef.current.glowX}% ${animStateRef.current.glowY}%, rgba(255,255,255,0.18) 0%, rgba(56,189,248,0.1) 40%, transparent 70%)`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Bottom vignette */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/25" />

        {/* ── Top HUD ── */}
        <div className="absolute top-3.5 inset-x-3.5 z-30 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 rounded-full bg-slate-950/85 border border-white/15 px-3 py-1.5 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isAutoOrbit ? "bg-purple-400" : "bg-sky-400"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isAutoOrbit ? "bg-purple-500" : "bg-sky-400"}`} />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-slate-200 uppercase font-mono flex items-center gap-1">
              <Sparkles size={11} className="text-sky-400" />
              {isAutoOrbit ? "360° Orbit" : "3D Live"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-slate-950/85 border border-white/15 px-2.5 py-1.5 backdrop-blur-md shadow-lg text-[10px] font-mono text-sky-400">
            <Compass size={13} className="text-sky-400" />
            <span>{displayAngle > 0 ? `+${displayAngle}°` : `${displayAngle}°`}</span>
          </div>
        </div>

        {/* ── Drag hint ── */}
        <AnimatePresence>
          {!hasInteracted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute inset-x-3 bottom-14 z-30 flex justify-center pointer-events-none"
            >
              <div className="flex items-center gap-2 rounded-full border border-sky-400/40 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 shadow-xl shadow-sky-500/20">
                <RotateCw size={13} className="text-sky-400 animate-spin" style={{ animationDuration: "5s" }} />
                <span className="text-[11px] font-medium tracking-wide text-slate-200">
                  Gerakkan kursor / Tarik untuk rotasi 360°
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom controls ── */}
        <div className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-1 bg-slate-950/85 border border-white/15 rounded-full p-1 backdrop-blur-md shadow-lg">
            <button
              type="button"
              onClick={toggleAutoOrbit}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                isAutoOrbit
                  ? "bg-sky-500/25 text-sky-300 border border-sky-400/30 shadow-sm shadow-sky-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
              title={isAutoOrbit ? "Jeda putaran" : "Mulai putaran 360° otomatis"}
              aria-label="Toggle auto orbit"
            >
              {isAutoOrbit ? <><Pause size={12} /><span>Jeda</span></> : <><Play size={12} /><span>Auto 360°</span></>}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center h-6 w-6 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Tampak depan"
              aria-label="Reset ke tampak depan"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-mono bg-slate-950/85 border border-white/10 rounded-full px-2.5 py-1 backdrop-blur-md">
            <Zap size={10} className="text-yellow-400" />
            {loadedCount < TOTAL_FRAMES ? `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` : "48 Frames"}
          </div>
        </div>
      </div>

      {/* ── Verified role chip (below card) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 shadow-xl shadow-black/40 whitespace-nowrap z-40 pointer-events-none"
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
  );
}

export default InteractiveProfile;
