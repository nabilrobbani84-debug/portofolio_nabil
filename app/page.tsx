"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import FloatingNav from "@/components/FloatingNav";

const BackgroundDigitalHuman = dynamic(
  () => import("@/components/digital-human/BackgroundDigitalHuman"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 transition-colors duration-300">
      {/* ── Persistent Scroll-Driven Transparent Digital Human ── */}
      <BackgroundDigitalHuman />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Footer />
      </div>

      {/* Floating pill navigation (scroll-spy + animated notch indicator) */}
      <FloatingNav />
    </main>
  );
}
