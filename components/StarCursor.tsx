"use client";

import React, { useEffect, useRef } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const cursor = useRef({ x: 0, y: 0 });
  const lastCursor = useRef({ x: 0, y: 0 });

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

    const colors = ["#00f3ff", "#bc13fe", "#ffffff", "#ffd700"]; // Cyan, Purple, White, Gold

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 3 + 1; // Random size 1-4px
      const speedX = (Math.random() - 0.5) * 1.5;
      const speedY = (Math.random() - 0.5) * 1.5;
      const life = Math.random() * 20 + 30; // 30-50 frames
      const color = colors[Math.floor(Math.random() * colors.length)];
      
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
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    };

    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, spikes: number, outerRadius: number, innerRadius: number, rotation: number) => {
        let cx = x;
        let cy = y;
        let step = Math.PI / spikes;

        ctx.beginPath();
        let rot = rotation;
        for (let i = 0; i < spikes; i++) {
            let x = cx + Math.cos(rot) * outerRadius;
            let y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
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
         const steps = Math.min(dist, 5); // Limit interpolation steps
         for(let i=0; i<steps; i++){
            const lerpX = lastCursor.current.x + (dx * (i/steps));
            const lerpY = lastCursor.current.y + (dy * (i/steps));
            // Chance to spawn
            if(Math.random() > 0.5) createParticle(lerpX, lerpY);
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
          
          // Draw small star shape
          ctx.save();
          ctx.translate(p.x, p.y);
          // Simplified star drawing or simple circle for performance if needed
          // Using small 4-point star ("sparkle")
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
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default StarCursor;
