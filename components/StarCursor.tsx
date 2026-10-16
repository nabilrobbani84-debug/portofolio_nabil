"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

const StarCursor = () => {
  const { theme, mounted } = useTheme();
  const isDark = mounted ? theme === "dark" : true;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const cursor = useRef({ x: 0, y: 0 });
  const lastCursor = useRef({ x: 0, y: 0 });
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const onMouseMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove);

    const darkColors = ["#00f3ff", "#bc13fe", "#ffffff", "#ffd700"]; // Cyan, Purple, White, Gold
    const lightColors = ["#0284c7", "#7c3aed", "#2563eb", "#d97706", "#059669"]; // Rich vibrant jewel tones

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 3 + 1.2; // 1.2-4.2px
      const speedX = (Math.random() - 0.5) * 1.5;
      const speedY = (Math.random() - 0.5) * 1.5;
      const life = Math.random() * 20 + 30; // 30-50 frames
      const palette = isDarkRef.current ? darkColors : lightColors;
      const color = palette[Math.floor(Math.random() * palette.length)];

      particles.current.push({
        x,
        y,
        size,
        speedX,
        speedY,
        life,
        maxLife: life,
        color,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      });
    };

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number,
      rotation: number
    ) => {
      const cx = x;
      const cy = y;
      const step = Math.PI / spikes;

      ctx.beginPath();
      let rot = rotation;
      for (let i = 0; i < spikes; i++) {
        let sx = cx + Math.cos(rot) * outerRadius;
        let sy = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(sx, sy);
        rot += step;

        sx = cx + Math.cos(rot) * innerRadius;
        sy = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(sx, sy);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate cursor position for smoother trails
      const dx = cursor.current.x - lastCursor.current.x;
      const dy = cursor.current.y - lastCursor.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spawn particles based on movement distance
      if (dist > 2) {
        const steps = Math.min(dist, 5);
        for (let i = 0; i < steps; i++) {
          const lerpX = lastCursor.current.x + dx * (i / steps);
          const lerpY = lastCursor.current.y + dy * (i / steps);
          if (Math.random() > 0.5) createParticle(lerpX, lerpY);
        }
      }

      lastCursor.current = { ...cursor.current };

      // Update and draw particles
      particles.current.forEach((p, index) => {
        p.life--;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.life <= 0) {
          particles.current.splice(index, 1);
        } else {
          const opacity = p.life / p.maxLife;
          ctx.globalAlpha = opacity;
          ctx.fillStyle = p.color;

          ctx.save();
          ctx.translate(p.x, p.y);
          drawStar(ctx, 0, 0, 4, p.size, p.size / 3, p.rotation);
          ctx.fill();
          ctx.restore();
        }
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: isDark ? "screen" : "normal" }}
    />
  );
};

export default StarCursor;

