import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";
import BackgroundDigitalHuman from "@/components/digital-human/BackgroundDigitalHuman";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* ── Fixed Persistent Background Digital Human (Zero background cutout, follows scroll holding sunglasses) ── */}
      <BackgroundDigitalHuman />

      {/* ── Page Content Layers ── */}
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
    </main>
  );
}
