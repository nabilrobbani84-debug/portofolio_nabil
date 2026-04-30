"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Layers, Cpu, Server, Container, Rocket } from "lucide-react";
import Image from "next/image";
import { ScrollReveal } from "./ScrollAnimation";

// ─── Data ───────────────────────────────────────────────────────────────────

interface Badge {
  label: string;
  color: "cyan" | "purple" | "rose" | "amber" | "sky" | "orange" | "green" | "indigo";
  icon: string;
}

interface Project {
  title: string;
  description: string;
  badges: Badge[];
  github?: string;
  demo?: string;
  image?: string;
  accent: string;        // tailwind gradient class
  featured?: boolean;   // first card gets larger treatment
}

const projects: Project[] = [
  {
    title: "Dukun Duplikat Kunci",
    description:
      "Platform bisnis digital modern untuk jasa duplikat kunci profesional. Website dibangun menggunakan Next.js & TypeScript untuk performa optimal, menampilkan landing page atraktif dengan desain dark navy  & gold yang elegan, sistem pemesanan terintegrasi WhatsApp, halaman detail layanan (motor, mobil, rumah, brankas), serta fitur layanan panggil 24 jam. Backend menggunakan Java Spring Boot yang dicontainerisasi dengan Docker untuk kemudahan deployment. Frontend di-deploy ke Firebase Hosting untuk distribusi CDN global yang stabil dan cepat.",
    badges: [
      { label: "Next.js", color: "cyan", icon: "▲" },
      { label: "TypeScript", color: "sky", icon: "TS" },
      { label: "Tailwind CSS", color: "cyan", icon: "🎨" },
      { label: "Java Spring Boot", color: "orange", icon: "☕" },
      { label: "Docker", color: "sky", icon: "🐳" },
      { label: "Firebase Hosting", color: "amber", icon: "🚀" },
    ],
    accent: "from-yellow-500 via-amber-400 to-orange-500",
    github: "https://github.com/nabilrobbani84-debug/duplikat_kunci",
    image: "/duplikat-kunci.svg",
    featured: true,
  },
  {
    title: "Ruqyah Syar'iyyah",
    description:
      "Platform web komprehensif untuk digitalisasi klinik pengobatan Islami. Fitur utama mencakup sistem reservasi terintegrasi WhatsApp Gateway, manajemen konten admin, dan optimasi SEO lokal menggunakan Structured Data untuk meningkatkan visibilitas bisnis di mesin pencari.",
    badges: [
      { label: "Django", color: "green", icon: "🐍" },
      { label: "Python", color: "amber", icon: "🐍" },
      { label: "Tailwind CSS", color: "cyan", icon: "🎨" },
      { label: "PostgreSQL", color: "sky", icon: "🐘" },
    ],
    accent: "from-green-500 via-emerald-400 to-teal-500",
    github: "https://github.com/nabilrobbani84-debug/ruqyah-syariyyah",
    image: "/ruqyah.png",
  },
  {
    title: "Warkop QR Payment System",
    description:
      "Sistem pemesanan warkop berbasis QR yang menghubungkan mode pembeli, kasir, dan admin dalam satu aplikasi. Pembeli dapat scan QR meja, memilih menu beserta varian, lalu membayar via tunai atau QRIS; kasir dapat memantau pesanan masuk, konfirmasi pembayaran, dan melihat riwayat transaksi; sementara admin mengelola menu, meja, QR code, laporan, pajak, keamanan akses, sinkronisasi Firestore, dan integrasi Google Sheets.",
    badges: [
      { label: "React.js", color: "cyan", icon: "⚛️" },
      { label: "TypeScript", color: "sky", icon: "TS" },
      { label: "Vite", color: "purple", icon: "⚡" },
      { label: "Firebase", color: "amber", icon: "🔥" },
      { label: "Firestore", color: "green", icon: "DB" },
      { label: "QR Code", color: "indigo", icon: "QR" },
    ],
    accent: "from-cyan-500 via-blue-500 to-rose-500",
    github: "https://github.com/nabilrobbani84-debug/system_payment-warkop",
    demo: "https://warkop-d23a1.web.app",
    image: "/warkop-payment.svg",
  },
  {
    title: "BookWise Library",
    description:
      "Sistem perpustakaan universitas modern dengan fitur peminjaman digital dan manajemen stok buku real-time. Menggunakan PostgreSQL untuk manajemen relasi data yang kompleks dengan performa tinggi, keamanan data terjamin, dan autentikasi multi-role via NextAuth.",
    badges: [
      { label: "Next.js", color: "cyan", icon: "▲" },
      { label: "PostgreSQL", color: "sky", icon: "🐘" },
      { label: "Tailwind CSS", color: "cyan", icon: "🎨" },
      { label: "NextAuth", color: "purple", icon: "🔐" },
      { label: "Figma", color: "purple", icon: "🎭" },
    ],
    accent: "from-blue-500 via-indigo-500 to-violet-600",
    github: "https://github.com/nabilrobbani84-debug/university-_library",
    image: "/bookwise.png",
  },
  {
    title: "Recruitment Platform",
    description:
      "Platform pencarian kerja modern yang menghubungkan talenta dengan perusahaan impian. Menampilkan antarmuka yang bersih dengan fitur pencarian kerja canggih, sistem filter multi-kriteria, dan dashboard pelamar yang intuitif dan responsif di semua perangkat.",
    badges: [
      { label: "TypeScript", color: "sky", icon: "TS" },
      { label: "React.js", color: "cyan", icon: "⚛️" },
      { label: "Tailwind CSS", color: "cyan", icon: "🎨" },
      { label: "Figma", color: "purple", icon: "🎭" },
    ],
    accent: "from-blue-400 via-cyan-400 to-sky-500",
    github: "https://github.com/nabilrobbani84-debug/Recruitment",
    image: "/recruitment.png",
  },
  {
    title: "Modiva App",
    description:
      "Aplikasi mobile monitoring TTD (Tablet Tambah Darah) remaja putri dengan sistem pelaporan digital yang terintegrasi, dashboard kepatuhan untuk tenaga kesehatan, dan fitur edukasi kesehatan terpadu. Dikembangkan menggunakan metodologi Scrum dan diuji dengan Blackbox Testing & UAT.",
    badges: [
      { label: "React Native", color: "cyan", icon: "📱" },
      { label: "Expo", color: "indigo", icon: "⚡" },
      { label: "NativeWind", color: "cyan", icon: "🌬️" },
      { label: "Figma", color: "purple", icon: "🎭" },
      { label: "Scrum", color: "amber", icon: "🔄" },
      { label: "UAT", color: "rose", icon: "✅" },
    ],
    accent: "from-rose-500 via-pink-500 to-red-500",
    github: "https://github.com/nabilrobbani84-debug/mobile_app_Tester",
    image: "/modiva_v2.png",
  },
  {
    title: "Helpdesk Hub",
    description:
      "Ticketing system berbasis web yang komprehensif dengan fitur reporting detail, sistem auto-assignment tiket ke agen yang tersedia, dan Role-Based Access Control (RBAC) menggunakan tiga level pengguna: Admin, Agent, dan User untuk manajemen permintaan dukungan yang efisien.",
    badges: [
      { label: "React.js", color: "cyan", icon: "⚛️" },
      { label: "Laravel", color: "rose", icon: "🔥" },
      { label: "MySQL", color: "orange", icon: "🗄️" },
    ],
    accent: "from-blue-500 via-cyan-400 to-teal-500",
    github: "https://github.com/nabilrobbani84-debug/helpdesk",
    image: "/helpdesk.png",
  },
  {
    title: "Web MovieApp",
    description:
      "Web application informatif film yang menampilkan koleksi film dengan data lengkap dari TMDB API. Dilengkapi fitur pencarian real-time, halaman detail film, sistem rating, dan state management yang efisien untuk pengalaman browsing film yang menyenangkan.",
    badges: [
      { label: "React.js", color: "cyan", icon: "⚛️" },
      { label: "CSS", color: "purple", icon: "🎨" },
      { label: "TMDB API", color: "amber", icon: "🎬" },
    ],
    accent: "from-purple-500 via-violet-500 to-pink-500",
    github: "https://github.com/nabilrobbani84/MF-Project2-Kelompok4",
    image: "/movieapp.png",
  },
  {
    title: "Kidstation",
    description:
      "Sistem manajemen stok dan kasir (POS) untuk toko bayi premium dengan dashboard analitik penjualan real-time. Fitur utama meliputi manajemen produk, transaksi kasir, laporan harian/bulanan, dan manajemen stok otomatis untuk membantu operasional toko berjalan lebih efisien.",
    badges: [
      { label: "Laravel", color: "rose", icon: "🔥" },
      { label: "MySQL", color: "orange", icon: "🗄️" },
      { label: "Bootstrap", color: "purple", icon: "🅱️" },
    ],
    accent: "from-indigo-500 via-blue-500 to-cyan-500",
    github: "https://github.com/nabilrobbani84-debug/kidstation",
    image: "/kidstation.png",
  },
];

// ─── Badge Color Map ─────────────────────────────────────────────────────────

const badgeColors: Record<string, string> = {
  cyan:   "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
  rose:   "bg-rose-500/10 border-rose-500/30 text-rose-400",
  amber:  "bg-amber-500/10 border-amber-500/30 text-amber-400",
  sky:    "bg-sky-500/10 border-sky-500/30 text-sky-400",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-400",
  green:  "bg-green-500/10 border-green-500/30 text-green-400",
  indigo: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
};

// ─── Project Card ────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
      className="group relative"
    >
      {/* Glow backdrop */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500`}
      />

      <div className="relative rounded-2xl bg-slate-900/90 border border-white/8 overflow-hidden backdrop-blur-sm flex flex-col md:flex-row">

        {/* ── Image Panel ── */}
        <div className={`relative w-full md:w-[42%] shrink-0 min-h-[220px] md:min-h-[280px] overflow-hidden ${isEven ? "md:order-first" : "md:order-last"}`}>
          {/* Gradient accent bar */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20`} />

          {project.image ? (
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
              />
              {/* Overlay fade */}
              <div className={`absolute inset-0 bg-gradient-to-r ${isEven ? "from-transparent to-slate-900/70" : "from-slate-900/70 to-transparent"} md:block hidden`} />
              <div className="absolute inset-0 bg-slate-900/30 md:hidden" />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-7xl font-black bg-gradient-to-br ${project.accent} bg-clip-text text-transparent opacity-20`}>
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Number tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${project.accent} text-white text-xs font-bold shadow-lg`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Content Panel ── */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-4">

          {/* Title */}
          <div>
            <h3 className={`text-xl md:text-2xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:${project.accent} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}>
              {project.title}
            </h3>

            {/* Description — full text, no clamp */}
            <p className="text-gray-400 text-sm md:text-[0.93rem] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {project.badges.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${badgeColors[badge.color]}`}
              >
                <span className="text-[10px]">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-1">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200"
              >
                <Github size={15} />
                Source Code
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${project.accent} text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
              >
                <ExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────

export default function Projects() {
  return (
    <section id="projects" className="py-24 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl">

        {/* Section header */}
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase border border-cyan-400/30 rounded-full bg-cyan-400/10">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Projects
              </span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              Kumpulan proyek pilihan yang menunjukkan kemampuan teknis dan kreativitas dalam pengembangan software.
            </p>
          </div>
        </ScrollReveal>

        {/* Project list */}
        <div className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Footer note */}
        <ScrollReveal width="100%">
          <p className="text-center text-gray-600 text-sm mt-12">
            dan masih banyak lagi ·{" "}
            <a
              href="https://github.com/nabilrobbani84-debug"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-400 underline underline-offset-2 transition-colors"
            >
              Lihat semua di GitHub →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
