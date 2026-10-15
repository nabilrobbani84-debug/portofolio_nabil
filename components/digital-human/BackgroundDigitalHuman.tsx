"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSafeReducedMotion } from "../ScrollAnimation";

const TOTAL_FRAMES = 48;

export function BackgroundDigitalHuman() {
  const reduce = useSafeReducedMotion();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const isLoadedRef = useRef(false);
  const lastDrawnFrameRef = useRef(-1);

  // Animation & transform state (managed in 60fps rAF loop without triggering React re-renders)
  const animStateRef = useRef({
    pointerX: 0,
    pointerY: 0,
    tiltX: 0,
    tiltY: 0,
    scrollProgress: 0,
    lerpedProgress: 0,
    currentX: 0,
    currentY: 0,
    currentScale: 1.0,
    currentOpacity: 1.0,
    lastTime: performance.now(),
  });

  // ── Preload all 48 transparent frames ──
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    const drawFrame = (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: false });
      if (!ctx) return;
      const img = imgs[index];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastDrawnFrameRef.current = index;
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i).padStart(2, "0");
      img.src = `/digitalhuman/frames/frame_${pad}.webp`;

      img.onload = () => {
        loadedCount++;
        // As soon as frame 0 loads, draw it immediately so hero is never blank
        if (i === 0 && lastDrawnFrameRef.current === -1) {
          drawFrame(0);
        }
        if (loadedCount === TOTAL_FRAMES) {
          isLoadedRef.current = true;
        }
      };
      imgs.push(img);
    }

    imagesRef.current = imgs;
  }, []);

  // ── High-DPI Canvas Setup ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const baseWidth = 450;
    const baseHeight = 800;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = baseWidth * dpr;
    canvas.height = baseHeight * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    // If frame 0 already loaded, draw immediately
    const firstImg = imagesRef.current[0];
    if (firstImg && firstImg.complete && firstImg.naturalWidth > 0) {
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      lastDrawnFrameRef.current = 0;
    }
  }, []);

  // ── Pointer Tracking for Organic 3D Magnetic Tilt ──
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const cx = window.innerWidth * 0.5;
      const cy = window.innerHeight * 0.5;
      const radiusX = Math.max(window.innerWidth * 0.5, 400);
      const radiusY = Math.max(window.innerHeight * 0.5, 300);

      animStateRef.current.pointerX = Math.max(
        -1.2,
        Math.min(1.2, (e.clientX - cx) / radiusX)
      );
      animStateRef.current.pointerY = Math.max(
        -1.2,
        Math.min(1.2, (e.clientY - cy) / radiusY)
      );
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // ── Scroll Listener: Computes progress across Hero -> About sections ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // 0px to 1050px drives the full transition: right hero column -> center background + frame scrub
      const maxScrollDist = 1050;
      const progress = Math.min(1, Math.max(0, scrollY / maxScrollDist));
      animStateRef.current.scrollProgress = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── 60fps Render Loop: Canvas scrubbing + Smooth center transition + Scale expand ──
  useEffect(() => {
    let animId: number;

    const render = (time: number) => {
      const state = animStateRef.current;
      const canvas = canvasRef.current;
      const wrapper = wrapperRef.current;
      const glow = glowRef.current;

      // Smooth lerp on scroll progress for buttery frame scrub
      const targetProgress = state.scrollProgress;
      state.lerpedProgress += (targetProgress - state.lerpedProgress) * 0.14;

      // ── A. Frame Scrubbing on Canvas ──
      if (canvas && imagesRef.current.length > 0) {
        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(state.lerpedProgress * (TOTAL_FRAMES - 1)))
        );

        if (frameIdx !== lastDrawnFrameRef.current) {
          const img = imagesRef.current[frameIdx];
          if (img && img.complete && img.naturalWidth > 0) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              lastDrawnFrameRef.current = frameIdx;
            }
          }
        }
      }

      // ── B. 3D Magnetic Tilt ──
      const targetTiltY = reduce ? 0 : state.pointerX * 7;
      const targetTiltX = reduce ? 0 : -state.pointerY * 5;
      state.tiltY += (targetTiltY - state.tiltY) * 0.08;
      state.tiltX += (targetTiltX - state.tiltX) * 0.08;

      // ── C. Horizontal Transition: Hero Right Column -> Center Viewport ──
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const isMobile = winW < 1024;

      // Anchor detection: align with the hero right column when at the top
      let heroCenterX = winW * (isMobile ? 0.5 : 0.72);
      let heroCenterY = winH * (isMobile ? 0.38 : 0.48);

      const anchor = document.getElementById("hero-character-anchor");
      if (anchor) {
        const rect = anchor.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          heroCenterX = rect.left + rect.width / 2;
          heroCenterY = rect.top + rect.height / 2;
        }
      }

      // Center destination when scrolled down
      const centerTargetX = winW * 0.5;
      const centerTargetY = winH * (isMobile ? 0.46 : 0.49);

      // Smooth ease-out cubic curve for natural deceleration into center
      const p = Math.min(1, Math.max(0, state.lerpedProgress));
      const ease = 1 - Math.pow(1 - p, 2.8);

      const targetX = heroCenterX + (centerTargetX - heroCenterX) * ease;
      const targetY = heroCenterY + (centerTargetY - heroCenterY) * ease;

      // ── D. Scale: Expand character to eliminate empty margins ("tidak ada ruang kosong") ──
      const baseScale = isMobile ? 0.88 : 1.0;
      const expandedScale = isMobile ? 1.18 : 1.48;
      const targetScale = baseScale + (expandedScale - baseScale) * ease;

      // ── E. Opacity: Vibrant 1.0 in Hero, subtle 0.58 in background behind sections ──
      const bgOpacity = isMobile ? 0.42 : 0.60;
      const targetOpacity = 1.0 - (1.0 - bgOpacity) * ease;

      // Deep scroll gentle fade (so projects and footer stay ultra legible)
      const scrollY = window.scrollY || 0;
      const deepFade = scrollY > 2800 ? Math.max(0.25, 1 - (scrollY - 2800) / 1400) : 1;
      const finalOpacity = targetOpacity * deepFade;

      // Floating gentle levitation
      const floatOffset = reduce ? 0 : Math.sin(time * 0.0016) * 5;

      // Canvas aspect ratio dimensions
      const baseW = Math.min(450, winW * 0.9);
      const baseH = baseW * (800 / 450);

      // Apply GPU-accelerated transforms directly to wrapper
      if (wrapper) {
        const posX = targetX - baseW / 2;
        const posY = targetY - baseH / 2 + floatOffset;

        wrapper.style.transform = `
          translate3d(${posX.toFixed(1)}px, ${posY.toFixed(1)}px, 0)
          scale(${targetScale.toFixed(3)})
          perspective(1200px)
          rotateX(${state.tiltX.toFixed(2)}deg)
          rotateY(${state.tiltY.toFixed(2)}deg)
        `;
        wrapper.style.opacity = finalOpacity.toFixed(3);
      }

      // Update ambient cyber glow position and intensity
      if (glow) {
        const glowScale = 1.0 + ease * 0.35;
        const glowOpacity = 0.45 + ease * 0.25;
        glow.style.transform = `
          translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(1)}px, 0)
          translate(-50%, -50%)
          scale(${glowScale.toFixed(2)})
        `;
        glow.style.opacity = glowOpacity.toFixed(3);
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
      suppressHydrationWarning
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Ambient Radial Cyber Glow Behind Character ── */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[28rem] h-[28rem] sm:w-[34rem] sm:h-[34rem] lg:w-[42rem] lg:h-[42rem] rounded-full blur-[110px] pointer-events-none will-change-transform"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.30) 0%, rgba(99,102,241,0.20) 40%, rgba(168,85,247,0.10) 65%, transparent 80%)",
        }}
      />

      {/* ── Frameless Digital Human Canvas Wrapper ── */}
      <div
        ref={wrapperRef}
        className="absolute top-0 left-0 will-change-transform flex items-center justify-center pointer-events-none"
        style={{
          width: "450px",
          height: "800px",
          transformOrigin: "center center",
          // Feather mask at bottom to softly dissolve torso into page background (#060a16)
          maskImage:
            "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.6) 88%, transparent 98%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 72%, rgba(0,0,0,0.6) 88%, transparent 98%)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none"
          style={{
            filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.55))",
          }}
        />
      </div>
    </div>
  );
}

export default BackgroundDigitalHuman;
