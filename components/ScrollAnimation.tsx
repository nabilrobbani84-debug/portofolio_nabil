"use client";

import { motion, Variants, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import React, { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
}

export const ScrollReveal = ({ children, width = "fit-content", className = "", delay = 0 }: ScrollRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1], // Custom bezier for smooth "apple-like" motion
        delay: delay
      }}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredList = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: 0.15,
                        delayChildren: delay
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const listVariants: Variants = {
    hidden: { 
        opacity: 0, 
        y: 40, 
        filter: "blur(5px)",
        scale: 0.9,
        rotateX: 10 // Slight 3D rotation
    },
    show: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        scale: 1,
        rotateX: 0,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 0.8
        }
    }
};

export const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            variants={listVariants}
            className={className}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   PARALLAX UTILITIES (scroll-linked, GPU-accelerated transforms)
   ───────────────────────────────────────────────────────────── */

interface ParallaxProps {
  children: React.ReactNode;
  /** Vertical travel in px across the element's scroll range. Positive = moves up as you scroll down. */
  offset?: number;
  className?: string;
  /** Optional: fade in/out as it scrolls through the viewport */
  fade?: boolean;
}

/**
 * Moves its children vertically at a different rate than the page scroll,
 * creating a depth/parallax effect. Honors prefers-reduced-motion.
 */
export const Parallax = ({ children, offset = 80, className = "", fade = false }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y, opacity: fade ? opacity : undefined }}>
        {children}
      </motion.div>
    </div>
  );
};

/**
 * A decorative floating blob/orb that drifts on scroll for ambient depth.
 * Purely visual — place inside a `relative` section, absolutely positioned.
 */
export const ParallaxBlob = ({
  className = "",
  offset = 120,
  x = 0,
}: {
  className?: string;
  offset?: number;
  x?: number;
}) => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -offset]);
  const xShift = useTransform(scrollYProgress, [0, 1], [0, x]);

  return (
    <motion.div
      aria-hidden="true"
      style={reduce ? undefined : { y, x: xShift }}
      className={className}
    />
  );
};

/** Small helper to build your own scroll-linked transform for a section. */
export const useSectionParallax = (
  ref: React.RefObject<HTMLElement | null>,
  from = 60,
  to = -60
): MotionValue<number> => {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return useTransform(scrollYProgress, [0, 1], [from, to]);
};
