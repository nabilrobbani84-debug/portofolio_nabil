"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import React, { useRef } from "react";

import Image from "next/image";
import { StaggeredList, StaggerItem } from "./ScrollAnimation";

const projects = [
  {
    title: "Ruqyah Syar'iyyah",
    description: "Platform web komprehensif untuk digitalisasi klinik pengobatan Islami. Fitur utama mencakup sistem reservasi terintegrasi WhatsApp Gateway, manajemen konten admin, dan optimasi SEO lokal menggunakan Structured Data.",
    stack: ["Django", "Python", "Tailwind CSS", "PostgreSQL"],
    color: "from-green-800 to-amber-500",
    github: "https://github.com/nabilrobbani84-debug/ruqyah-syariyyah",
    image: "/ruqyah.png"
  },
  {
    title: "BookWise Library",
    description: "Sistem perpustakaan universitas modern dengan fitur peminjaman digital dan manajemen stok buku real-time. Menggunakan PostgreSQL untuk manajemen relasi data yang kompleks dengan performa tinggi dan keamanan data terjamin.",
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "NextAuth"],
    design: ["Figma"],
    color: "from-blue-600 to-indigo-700",
    github: "https://github.com/nabilrobbani84-debug/university-_library",
    image: "/bookwise.png"
  },
  {
    title: "Recruitment Platform",
    description: "Platform pencarian kerja modern yang menghubungkan talenta dengan perusahaan impian. Menampilkan antarmuka yang bersih dengan fitur pencarian kerja canggih dan dashboard pelamar yang intuitif.",
    stack: ["Typescript", "React.js", "Tailwind CSS"],
    design: ["Figma"],
    color: "from-blue-500 to-cyan-400",
    github: "https://github.com/nabilrobbani84-debug/Recruitment",
    image: "/recruitment.png"
  },
  {
    title: "Modiva App",
    description: "Aplikasi mobile monitoring TTD remaja putri dengan pelaporan digital, dashboard kepatuhan, dan edukasi kesehatan terpadu.",
    stack: ["React Native", "Expo", "NativeWind"],
    testing: ["Blackbox Testing", "UAT"],
    methodology: ["Scrum"],
    design: ["Figma"],
    color: "from-rose-500 to-red-600",
    github: "https://github.com/nabilrobbani84-debug/mobile_app_Tester",
    image: "/modiva_v2.png"
  },
  {
    title: "Helpdesk Hub",
    description: "Ticketing system berbasis web dengan fitur reporting, auto-assignment, dan RBAC.",
    stack: ["React.js", "Laravel", "MySQL"],
    color: "from-blue-600 to-cyan-500",
    github: "https://github.com/nabilrobbani84-debug/helpdesk",
    // demo: "https://your-deploy-url.com", // Uncomment and add URL when ready
    image: "/helpdesk.png"
  },
  {
    title: "Web MovieApp",
    description: "Web app informatif film dengan integrasi API dan state management efisien.",
    stack: ["React.js", "CSS", "API"],
    color: "from-purple-600 to-pink-500",
    github: "https://github.com/nabilrobbani84/MF-Project2-Kelompok4", 
    // demo: "#", // Uncomment and add URL when ready
    image: "/movieapp.png"
  },
  {
    title: "Kidstation",
    description: "Sistem manajemen stok dan kasir (POS) untuk toko bayi premium dengan dashboard analitik penjualan real-time.",
    stack: ["Laravel", "MySQL", "Bootstrap"],
    color: "from-indigo-600 to-blue-500",
    github: "https://github.com/nabilrobbani84-debug/kidstation",
    image: "/kidstation.png"
  },
];

const ProjectCard = ({ project }: { project: any }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[32rem] w-full rounded-xl bg-slate-900 border border-white/10 group perspective-1000 cursor-pointer"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-4 bg-slate-800 shadow-lg rounded-xl overflow-hidden flex flex-col"
      >
        {/* Image / Header Section */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden transform-style-3d">
            {project.image ? (
                <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
                     <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover object-top"
                     />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                </div>
            ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`} />
            )}
            
            {!project.image && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-bold text-white/10">{project.title.substring(0, 2)}</h3>
                 </div>
            )}
        </div>
        
        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1 transform translate-z-10 bg-slate-800">
            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
            <p className="text-gray-300 mb-4 text-sm line-clamp-3">{project.description}</p>
            
            <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-2">
                    {project.stack.map((tech: string) => (
                        <span key={tech} className="px-2 py-1 text-xs rounded bg-white/10 border border-white/5 text-gray-400">
                            {tech}
                        </span>
                    ))}
                </div>

                {project.testing && (
                  <div className="flex flex-wrap gap-2 mb-2">
                      {project.testing.map((test: string) => (
                          <span key={test} className="px-2 py-1 text-xs rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">
                              {test}
                          </span>
                      ))}
                  </div>
                )}

                {project.methodology && (
                  <div className="flex flex-wrap gap-2 mb-2">
                      {project.methodology.map((method: string) => (
                          <span key={method} className="px-2 py-1 text-xs rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                              {method}
                          </span>
                      ))}
                  </div>
                )}

                {project.design && (
                  <div className="flex flex-wrap gap-2 mb-4">
                      {project.design.map((tool: string) => (
                          <span key={tool} className="px-2 py-1 text-xs rounded bg-purple-500/10 border border-purple-500/20 text-purple-400">
                              {tool}
                          </span>
                      ))}
                  </div>
                )}

                {!project.design && !project.methodology && !project.testing && <div className="mb-4"></div>}

                <div className="flex gap-3">
                    {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 hover:text-cyan-400 transition-all text-white text-sm font-medium z-20"
                        title="View Code"
                    >
                        <Github size={18} />
                        <span>GitHub</span>
                    </a>
                    )}
                    {project.demo && project.demo !== '#' && (
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-all text-sm font-medium z-20"
                        title="Live Demo"
                    >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                    </a>
                    )}
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};


export default function Projects() {
  return (
    <section id="projects" className="py-20 text-white relative">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
          Featured <span className="text-cyan-400">Projects</span>
        </h2>
        
        <StaggeredList className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {projects.map((project, index) => (
             <StaggerItem key={index}>
                <ProjectCard project={project} />
             </StaggerItem>
          ))}
        </StaggeredList>
      </div>
    </section>
  );
}
