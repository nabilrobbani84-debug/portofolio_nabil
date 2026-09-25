"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
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
    title: "FlowSphere Management Dashboard",
    description:
      "Dashboard manajemen tim & proyek modern berbasis Angular 19. Menyajikan visualisasi data interaktif dengan Chart.js, papan tugas (kanban), analitik produktivitas, serta manajemen tim dan anggota. Dilengkapi elemen 3D dengan Three.js, animasi confetti, dan integrasi EmailJS untuk notifikasi instan (penugasan tugas, mention, dan persetujuan workflow). Ditata dengan Tailwind CSS, aksesibilitas yang diperhatikan, dan cakupan unit test yang komprehensif.",
    badges: [
      { label: "Angular 19", color: "rose", icon: "🅰️" },
      { label: "TypeScript", color: "sky", icon: "TS" },
      { label: "Tailwind CSS", color: "cyan", icon: "🎨" },
      { label: "Chart.js", color: "purple", icon: "📊" },
      { label: "Three.js", color: "indigo", icon: "🧊" },
      { label: "EmailJS", color: "amber", icon: "✉️" },
    ],
    accent: "from-sky-500 via-indigo-500 to-purple-500",
    github: "https://github.com/nabilrobbani84-debug/Management_Dashboard",
    image: "/flowsphere.svg",
    featured: true,
  },
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
    demo: "https://ruqyah-syariyyah.vercel.app",
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
    title: "FinTech Core API",
    description:
      "Monorepo platform transaksi keuangan berbasis microservices dengan backend Go dan pendekatan Clean Architecture. Sistem mencakup Auth Service untuk JWT, RBAC, bcrypt, enkripsi data user AES-GCM, dan HMAC email lookup; Transaction Service untuk deposit, withdraw, transfer, monthly report, Server-Sent Events, serta ledger PostgreSQL dengan row locking untuk menjaga konsistensi transaksi. Dilengkapi dashboard Next.js dan demo Streamlit aman untuk showcase arsitektur, endpoint explorer, snapshot ledger, dan simulasi transaksi tanpa koneksi ke sistem finansial produksi.",
    badges: [
      { label: "Go", color: "sky", icon: "GO" },
      { label: "Microservices", color: "indigo", icon: "µ" },
      { label: "PostgreSQL", color: "sky", icon: "🐘" },
      { label: "MySQL", color: "orange", icon: "🗄️" },
      { label: "gRPC", color: "purple", icon: "RPC" },
      { label: "Docker", color: "cyan", icon: "🐳" },
      { label: "Streamlit", color: "rose", icon: "▶" },
    ],
    accent: "from-emerald-500 via-cyan-500 to-blue-500",
    github: "https://github.com/nabilrobbani84-debug/fintech_api",
    demo: "https://share.streamlit.io/nabilrobbani84-debug/fintech_api/main/streamlit_app.py",
    image: "/fintech-core-api.svg",
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

const MAX_BADGES = 4;

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const visibleBadges = project.badges.slice(0, MAX_BADGES);
  const hiddenCount = project.badges.length - visibleBadges.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: "easeOut" }}
      className="group relative h-full"
    >
      {/* Glow backdrop */}
      <div
        className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${project.accent} opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-500`}
      />

      <div className="relative h-full flex flex-col rounded-2xl bg-slate-900/90 border border-white/8 overflow-hidden backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">

        {/* ── Image (fixed aspect ratio) ── */}
        <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-20`} />

          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-7xl font-black bg-gradient-to-br ${project.accent} bg-clip-text text-transparent opacity-25`}>
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Fade for legibility */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-900/90 to-transparent" />

          {/* Number tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br ${project.accent} text-white text-xs font-bold shadow-lg`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-1 p-5 md:p-6 gap-4">

          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 transition-colors group-hover:text-sky-300">
              {project.title}
            </h3>

            {/* Description clamped to 3 lines for uniform height */}
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Badges (capped) */}
          <div className="flex flex-wrap gap-1.5">
            {visibleBadges.map((badge) => (
              <span
                key={badge.label}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${badgeColors[badge.color]}`}
              >
                <span className="text-[10px]">{badge.icon}</span>
                {badge.label}
              </span>
            ))}
            {hiddenCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/10 bg-white/5 text-gray-400">
                +{hiddenCount}
              </span>
            )}
          </div>

          {/* Action Buttons (pinned to bottom) */}
          <div className="flex items-center gap-2.5 mt-auto pt-4 border-t border-white/5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-xs font-medium transition-all duration-200"
              >
                <Github size={14} />
                Code
              </a>
            )}
            {project.demo && project.demo !== "#" && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r ${project.accent} text-white text-xs font-semibold shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200`}
              >
                <ExternalLink size={14} />
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
            <span className="eyebrow">Portfolio</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
              Kumpulan proyek pilihan yang menunjukkan kemampuan teknis dan kreativitas dalam pengembangan software.
            </p>
          </div>
        </ScrollReveal>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
