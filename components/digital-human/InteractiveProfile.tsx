"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BadgeCheck, 
  RotateCw, 
  RotateCcw, 
  Play, 
  Pause, 
  Sparkles, 
  Compass
} from "lucide-react";
import { useSafeReducedMotion } from "../ScrollAnimation";

const TOTAL_FRAMES = 48;
const FRAME_PATHS: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => 
  `/digital-human-frames/frame_${i.toString().padStart(2, "0")}.jpg`
);

interface InteractiveProfileProps {
  className?: string;
}

export function InteractiveProfile({ className = "" }: InteractiveProfileProps) {
  const reduce = useSafeReducedMotion();

  // Container & Canvas refs
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Images cache
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const imagesLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  // State
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isAutoOrbit, setIsAutoOrbit] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [displayAngle, setDisplayAngle] = useState(0);

  // Continuous animation state in refs for 60fps / 120fps render loop
  const animStateRef = useRef({
    currentFrame: 0,        // Continuous float [0, 48)
    targetFrame: 0,         // Target frame from cursor / drag / orbit
    velocity: 0,            // Drag momentum
    pointerX: 0,            // Normalized -1 to 1
    pointerY: 0,            // Normalized -1 to 1
    isInside: false,        // Is cursor currently in window
    lastMoveTime: performance.now(),
    isDragging: false,
    dragStartX: 0,
    dragStartFrame: 0,
    isAutoOrbit: false,
    tiltX: 0,               // Smooth card rotateX
    tiltY: 0,               // Smooth card rotateY
  });

  // Sync state into ref
  useEffect(() => {
    animStateRef.current.isAutoOrbit = isAutoOrbit;
  }, [isAutoOrbit]);

  useEffect(() => {
    animStateRef.current.isDragging = isDragging;
  }, [isDragging]);

  // 1. Preload frames (Priority 1: frame 0 & cursor tracking frames, then rest)
  useEffect(() => {
    let isCancelled = false;

    // Load order: front frame first (0), then cursor tracking range (+-45 deg), then rest
    const priorityIndices = [
      0, 1, 47, 2, 46, 3, 45, 4, 44, 5, 43, 6, 42
    ];
    const otherIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i)
      .filter((i) => !priorityIndices.includes(i));
    const loadOrder = [...priorityIndices, ...otherIndices];

    loadOrder.forEach((index) => {
      const img = new window.Image();
      img.src = FRAME_PATHS[index];

      img.onload = () => {
        if (isCancelled) return;
        imagesRef.current[index] = img;
        imagesLoadedRef.current[index] = true;

        if (index === 0) {
          setInitialLoaded(true);
        }

        setLoadedCount((prev) => {
          const next = prev + 1;
          if (next >= 12 && !initialLoaded) {
            setInitialLoaded(true);
          }
          return next;
        });
      };

      img.onerror = () => {
        if (isCancelled) return;
        // Fallback to front frame
        const fallback = new window.Image();
        fallback.src = "/profile.jpg";
        fallback.onload = () => {
          imagesRef.current[index] = fallback;
          imagesLoadedRef.current[index] = true;
        };
      };
    });

    return () => {
      isCancelled = true;
    };
  }, [initialLoaded]);

  // 2. Global & Card Pointer Tracking
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (animStateRef.current.isDragging) return;

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance normalized relative to card & viewport
      const windowRadiusX = Math.max(window.innerWidth * 0.45, 380);
      const windowRadiusY = Math.max(window.innerHeight * 0.45, 300);

      const nx = Math.max(-1.4, Math.min(1.4, (e.clientX - centerX) / windowRadiusX));
      const ny = Math.max(-1.4, Math.min(1.4, (e.clientY - centerY) / windowRadiusY));

      animStateRef.current.pointerX = nx;
      animStateRef.current.pointerY = ny;
      animStateRef.current.isInside = true;
      animStateRef.current.lastMoveTime = performance.now();
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

  // 3. Pointer Drag handling for 360 free inspection
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setHasInteracted(true);
    setIsAutoOrbit(false);

    animStateRef.current.isDragging = true;
    animStateRef.current.isAutoOrbit = false;
    animStateRef.current.velocity = 0;
    animStateRef.current.dragStartX = e.clientX;
    animStateRef.current.dragStartFrame = animStateRef.current.currentFrame;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!animStateRef.current.isDragging) return;

    const dx = e.clientX - animStateRef.current.dragStartX;
    // Drag sensitivity: ~6.5px per frame -> ~312px drag covers full 360 degree (48 frames)
    const frameDelta = dx / 6.5;
    const newTarget = ((animStateRef.current.dragStartFrame + frameDelta) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;

    animStateRef.current.targetFrame = newTarget;
    animStateRef.current.velocity = (dx * 0.035);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (animStateRef.current.isDragging) {
      animStateRef.current.isDragging = false;
      setIsDragging(false);
      animStateRef.current.lastMoveTime = performance.now();

      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // 4. Main 60fps / 120fps Animation Loop with Dual-Buffer Canvas Rendering
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let hudUpdateCounter = 0;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const state = animStateRef.current;
      const timeSinceMove = (time - state.lastMoveTime) / 1000;

      // ── A. Calculate Target Frame ──
      if (state.isDragging) {
        // Drag controls targetFrame directly
      } else if (state.isAutoOrbit) {
        // Continuous auto-orbit (~18 degrees per second = ~2.4 frames/s)
        state.targetFrame = (state.targetFrame + 2.4 * dt) % TOTAL_FRAMES;
      } else if (Math.abs(state.velocity) > 0.08) {
        // Inertia spin decay after drag release
        state.targetFrame = ((state.targetFrame + state.velocity * dt * 45) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;
        state.velocity *= 0.92;
      } else {
        // Cursor tracking mode (Head tracking following mouse)
        // If user dragged recently, give 2.2s before resuming cursor tracking
        if (timeSinceMove > 2.2 || state.isInside) {
          // Horizontal cursor tracking:
          // nx > 0 (cursor right) -> turn head to viewer's right (indices 0, 1, 2, 3, 4, 5, 6)
          // nx < 0 (cursor left) -> turn head to viewer's left (indices 48 - offset: 47, 46, 45, 44...)
          const maxTurnFrames = 5.8; // ~43.5 degrees max turn range
          const turnOffset = state.pointerX * maxTurnFrames;

          let cursorTarget = 0;
          if (turnOffset >= 0) {
            cursorTarget = turnOffset;
          } else {
            cursorTarget = TOTAL_FRAMES + turnOffset;
          }

          // Idle subtle micro-breathing when pointer is still or outside
          if (!state.isInside || timeSinceMove > 1.2) {
            const breath = Math.sin(time * 0.0016) * 0.7; // +-0.7 frames sway
            cursorTarget = (cursorTarget + breath + TOTAL_FRAMES) % TOTAL_FRAMES;
          }

          state.targetFrame = cursorTarget;
        }
      }

      // ── B. Shortest Circular Path Smoothing ──
      let diff = state.targetFrame - state.currentFrame;
      // Circular wrap into [-24, 24] range
      diff = ((diff + TOTAL_FRAMES / 2) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES - TOTAL_FRAMES / 2;

      // Dynamic smoothing: responsive when dragging, silky smooth when tracking cursor
      const smoothingFactor = state.isDragging ? 0.35 : (reduce ? 0.08 : 0.12);
      state.currentFrame = ((state.currentFrame + diff * smoothingFactor) % TOTAL_FRAMES + TOTAL_FRAMES) % TOTAL_FRAMES;

      // ── C. Smooth 3D Card Tilt ──
      const targetTiltY = reduce ? 0 : state.pointerX * 9;
      const targetTiltX = reduce ? 0 : -state.pointerY * 6;
      state.tiltY += (targetTiltY - state.tiltY) * 0.1;
      state.tiltX += (targetTiltX - state.tiltX) * 0.1;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateY(${state.tiltY.toFixed(2)}deg) rotateX(${state.tiltX.toFixed(2)}deg)`;
      }

      // ── D. High-DPI Dual-Buffer Canvas Rendering ──
      if (ctx && canvas) {
        const floatIndex = ((state.currentFrame % TOTAL_FRAMES) + TOTAL_FRAMES) % TOTAL_FRAMES;
        const i1 = Math.floor(floatIndex);
        const i2 = (i1 + 1) % TOTAL_FRAMES;
        const blend = floatIndex - i1;

        // Find primary and secondary images (fallback to frame 0 if not yet loaded)
        const img1 = imagesRef.current[i1] || imagesRef.current[0];
        const img2 = imagesRef.current[i2] || img1;

        if (img1 && img1.complete && img1.naturalWidth > 0) {
          const cw = canvas.width;
          const ch = canvas.height;
          ctx.clearRect(0, 0, cw, ch);

          // Center-crop 960x960 source to match canvas aspect ratio
          const nw = img1.naturalWidth;
          const nh = img1.naturalHeight;
          const canvasAspect = cw / ch;
          const imgAspect = nw / nh;

          let sx = 0, sy = 0, sw = nw, sh = nh;
          if (canvasAspect < imgAspect) {
            sw = nh * canvasAspect;
            sx = (nw - sw) / 2;
          } else {
            sh = nw / canvasAspect;
            sy = (nh - sh) / 2;
          }

          // Draw base frame
          ctx.globalAlpha = 1.0;
          ctx.drawImage(img1, sx, sy, sw, sh, 0, 0, cw, ch);

          // Draw crossfade overlay frame for butter-smooth transition
          if (blend > 0.02 && img2 && img2.complete && img2.naturalWidth > 0) {
            ctx.globalAlpha = blend;
            ctx.drawImage(img2, sx, sy, sw, sh, 0, 0, cw, ch);
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // ── E. Update HUD angle every few frames ──
      hudUpdateCounter++;
      if (hudUpdateCounter % 4 === 0) {
        let deg = (state.currentFrame / TOTAL_FRAMES) * 360;
        if (deg > 180) deg -= 360; // Show -180 to +180 deg
        setDisplayAngle(Math.round(deg));
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [reduce]);

  // Adjust canvas buffer resolution to DPR on resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const card = cardRef.current;
      if (!canvas || !card) return;

      const rect = card.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
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
    animStateRef.current.velocity = 0;
    animStateRef.current.pointerX = 0;
    animStateRef.current.pointerY = 0;
    setHasInteracted(true);
  }, []);

  const toggleAutoOrbit = useCallback(() => {
    setIsAutoOrbit((prev) => !prev);
    setHasInteracted(true);
  }, []);

  // Dynamic specular highlight coords
  const sheenX = ((animStateRef.current.pointerX + 1.2) / 2.4) * 100;
  const sheenY = ((animStateRef.current.pointerY + 1.2) / 2.4) * 100;

  return (
    <div
      ref={containerRef}
      suppressHydrationWarning
      className={`relative select-none ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* ── 1. Soft Dynamic Glow Halo ── */}
      <div 
        className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-sky-500/30 via-indigo-500/20 to-purple-500/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      />

      {/* ── 2. Decorative Gradient Ring ── */}
      <div className="absolute -inset-1 rounded-[2.1rem] bg-gradient-to-br from-sky-400/40 via-transparent to-purple-500/40 pointer-events-none" />

      {/* ── 3. Main 3D Card Viewport ── */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={`relative w-64 h-80 sm:w-72 sm:h-[24rem] lg:w-[21rem] lg:h-[28rem] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl shadow-black/80 bg-slate-950 transition-shadow duration-300 touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          transformStyle: "preserve-3d",
          boxShadow: `0 30px 70px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.15)`,
        }}
      >
        {/* Fallback Static Image (Ensures 0ms blank screen) */}
        <div className="absolute inset-0 z-0 bg-slate-950">
          <Image
            src="/digital-human-frames/frame_00.jpg"
            alt="Nabil Robbani 3D Digital Human"
            fill
            priority
            sizes="(max-width: 1024px) 18rem, 21rem"
            className="object-cover object-top"
          />
        </div>

        {/* ── Dual-Buffer HTML5 Canvas for 60fps / 120fps Smooth 3D Frame Rotation ── */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-10 w-full h-full object-cover transition-opacity duration-500 ${
            initialLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ── Dynamic Specular Glass Sheen ── */}
        <div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle 340px at ${sheenX}% ${sheenY}%, rgba(255, 255, 255, 0.16) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%)`,
            mixBlendMode: "overlay",
          }}
        />

        {/* ── Bottom Vignette & Seamless Depth Gradient ── */}
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

        {/* ── Top HUD: 3D Live Status & Angle Indicator ── */}
        <div className="absolute top-3.5 inset-x-3.5 z-30 flex items-center justify-between pointer-events-none">
          {/* Status Badge */}
          <div className="flex items-center gap-2 rounded-full bg-slate-950/80 border border-white/15 px-3 py-1.5 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isAutoOrbit ? "bg-purple-400" : "bg-sky-400"
              }`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                isAutoOrbit ? "bg-purple-500" : "bg-sky-400"
              }`} />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-slate-200 uppercase font-mono flex items-center gap-1">
              <Sparkles size={11} className="text-sky-400" />
              {isAutoOrbit ? "360° Orbit" : "3D Digital Human"}
            </span>
          </div>

          {/* Compass Angle Readout */}
          <div className="flex items-center gap-1.5 rounded-full bg-slate-950/80 border border-white/15 px-2.5 py-1.5 backdrop-blur-md shadow-lg text-[10px] font-mono text-sky-400">
            <Compass size={13} className="text-sky-400" />
            <span>{displayAngle > 0 ? `+${displayAngle}°` : `${displayAngle}°`}</span>
          </div>
        </div>

        {/* ── Initial Interactive Hint (Fades out once user interacts) ── */}
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

        {/* ── Bottom Floating Controls ── */}
        <div className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between pointer-events-auto">
          {/* Left: Auto 360 & Reset */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-white/15 rounded-full p-1 backdrop-blur-md shadow-lg">
            <button
              type="button"
              onClick={toggleAutoOrbit}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
                isAutoOrbit
                  ? "bg-sky-500/25 text-sky-300 border border-sky-400/30 shadow-sm shadow-sky-500/25"
                  : "text-slate-400 hover:text-white"
              }`}
              title={isAutoOrbit ? "Jeda putaran 360°" : "Mulai putaran 360° otomatis"}
              aria-label="Toggle auto 360 orbit"
            >
              {isAutoOrbit ? (
                <>
                  <Pause size={12} />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play size={12} />
                  <span>Auto 360°</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex items-center justify-center h-6 w-6 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Kembali ke tampak depan (0°)"
              aria-label="Reset ke tampak depan"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Right: Loaded Frames Indicator */}
          <div className="text-[10px] text-gray-400 font-mono bg-slate-950/80 border border-white/10 rounded-full px-2.5 py-1 backdrop-blur-md">
            {loadedCount < TOTAL_FRAMES ? `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` : "48 Frames"}
          </div>
        </div>
      </div>

      {/* ── 4. Verified Role Chip ── */}
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
