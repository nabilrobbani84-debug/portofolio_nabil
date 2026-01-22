"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

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
