export type Language = "id" | "en";

export interface ProjectData {
  title: string;
  category: "Web Apps" | "Internal Systems" | "APIs" | "Mobile Apps";
  description: {
    id: string;
    en: string;
  };
  badges: Array<{
    label: string;
    color: "cyan" | "purple" | "rose" | "amber" | "sky" | "orange" | "green" | "indigo";
    icon: string;
  }>;
  github?: string;
  demo?: string;
  image?: string;
  accent: string;
  featured?: boolean;
}

export const translations = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      skills: "Keahlian",
      experience: "Pengalaman",
      projects: "Proyek",
      certifications: "Sertifikasi",
      contact: "Kontak",
      hireMe: "Rekrut Saya",
      selectMode: "Pilih Mode:",
      selectLang: "Pilih Bahasa:",
    },
    hero: {
      badge: "Tersedia untuk Karir & Freelance",
      greeting: "Halo, saya Nabil Robbani 👋",
      headingPrefix: "Membangun",
      headingGradient: "pengalaman web modern",
      rolePrefix: "Saya seorang",
      roles: ["Frontend Developer", "Fullstack Developer", "Software Engineer"],
      bio: "Software Engineer yang berfokus membangun aplikasi web modern, performa tinggi, dan pengalaman digital intuitif menggunakan React, Next.js, dan Laravel.",
      viewWork: "Lihat Karya Saya",
      contactMe: "Hubungi Saya",
      stats: {
        projects: "Proyek Selesai",
        gpa: "IPK / GPA",
        experience: "Tahun Pengalaman",
      },
      interactiveStatus: "Video Interaktif",
      scrollHint: "Scroll ke bawah untuk melihat pergerakan",
      resetTitle: "Reset ke atas",
    },
    about: {
      eyebrow: "Tentang Saya",
      titlePrefix: "Mengenal saya",
      titleGradient: "lebih dekat",
      role: "Software Engineer",
      education: "Lulusan Teknik Informatika (2026) — IPK 3.63",
      institution: "STT Terpadu Nurul Fikri, Indonesia",
      bio1: "Saya lulusan Teknik Informatika dari Sekolah Tinggi Teknologi Terpadu Nurul Fikri tahun 2026 dengan IPK 3.63 yang memiliki passion mendalam dalam pengembangan aplikasi web modern dan user-friendly.",
      bio2: "Berpengalaman membangun aplikasi frontend maupun fullstack menggunakan React, Next.js, dan Laravel. Saya senang mengubah ide menjadi produk nyata yang berdampak, sambil terus belajar teknologi terbaru untuk menghasilkan solusi software berkualitas tinggi.",
      highlights: [
        {
          title: "Clean Code",
          desc: "Menulis kode yang rapi, terstruktur, dan mudah dikembangkan tim.",
        },
        {
          title: "Fast Learner",
          desc: "Cepat beradaptasi dengan teknologi dan tools baru sesuai kebutuhan.",
        },
        {
          title: "Team Player",
          desc: "Terbiasa berkolaborasi lintas fungsi dan memimpin tim media.",
        },
        {
          title: "Detail-Oriented",
          desc: "Fokus pada UX, performa, dan kualitas hasil akhir produk.",
        },
      ],
    },
    skills: {
      eyebrow: "Tech Stack",
      titlePrefix: "Keahlian",
      titleGradient: "Teknis",
      subtitle: "Teknologi dan tools yang saya gunakan untuk membangun produk digital yang cepat, andal, dan menarik.",
    },
    experience: {
      eyebrow: "Karir",
      titlePrefix: "Pengalaman",
      titleGradient: "Kerja",
      items: [
        {
          role: "Fullstack Developer",
          company: "PT. Winnicode Garuda Indonesia",
          type: "Magang",
          period: "Feb 2025 - Sekarang",
          location: "Bandung, Indonesia (Remote)",
          description: "Mengembangkan dan memelihara aplikasi web menggunakan teknologi full-stack modern. Berkolaborasi dengan tim lintas fungsi untuk menghasilkan solusi perangkat lunak berkualitas tinggi.",
          skills: ["Figma", "Front-End Development", "React", "Laravel"],
        },
        {
          role: "Ketua Tim Inti Media",
          company: "GROW WITH DATA STT TERPADU NURUL FIKRI",
          type: "Paruh Waktu",
          period: "Jan 2025 - Sekarang",
          location: "Jakarta Selatan, Indonesia (Hybrid)",
          description: "Memimpin tim media untuk memproduksi konten dan strategi yang menarik. Mengelola alur kerja tim dan memastikan konsistensi pesan brand di berbagai platform.",
          skills: ["Team Leadership", "Figma", "Content Strategy", "Communication"],
        },
      ],
    },
    projects: {
      eyebrow: "Proyek",
      titlePrefix: "Proyek",
      titleGradient: "Pilihan",
      subtitle: "Kumpulan proyek pilihan yang menunjukkan kemampuan teknis dan kreativitas dalam pengembangan software.",
      viewAllGithub: "Lihat semua proyek",
      filterLabels: {
        all: "Semua",
        webApps: "Aplikasi Web",
        internalSystems: "Sistem Internal",
        apis: "API",
        mobileApps: "Aplikasi Mobile",
      },
      btnCode: "Kode",
      btnDemo: "Live Demo",
      showAll: "Tampilkan semua",
      showLess: "Tampilkan lebih sedikit",
      emptyCategory: "Belum ada proyek di kategori ini.",
      footerNote: "dan masih banyak lagi ·",
      footerLink: "Lihat semua di GitHub →",
    },
    certifications: {
      eyebrow: "Kredensial",
      title: "Sertifikasi",
    },
    footer: {
      eyebrow: "Kontak",
      titlePrefix: "Mari bekerja",
      titleGradient: "bersama",
      subtitle: "Punya proyek menarik atau peluang kerja? Saya terbuka untuk kolaborasi, magang, maupun freelance. Jangan ragu untuk menghubungi saya.",
      chatWhatsapp: "Chat via WhatsApp",
      rights: "Semua hak cipta dilindungi.",
      waMessage: "Halo Nabil, saya tertarik untuk berkolaborasi dengan Anda!",
    },
    whatsappFloat: {
      tooltip: "💬 Chat dengan Nabil di WhatsApp",
      waMessage: "Halo Nabil, saya tertarik untuk berkolaborasi dengan Anda!",
    },
    preloader: {
      stages: [
        { threshold: 0, text: "MEMULAI ANTARMUKA SISTEM..." },
        { threshold: 25, text: "MEMUAT ASET DIGITAL HUMAN..." },
        { threshold: 55, text: "MENGONFIGURASI LINGKUNGAN 3D..." },
        { threshold: 80, text: "SINKRONISASI MODUL INTERAKTIF..." },
        { threshold: 96, text: "SISTEM SIAP. MEMASUKI PORTOFOLIO..." },
      ],
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      certifications: "Certifications",
      contact: "Contact",
      hireMe: "Hire Me",
      selectMode: "Select Mode:",
      selectLang: "Language:",
    },
    hero: {
      badge: "Available for Career & Freelance",
      greeting: "Hi, I'm Nabil Robbani 👋",
      headingPrefix: "I build modern",
      headingGradient: "web experiences",
      rolePrefix: "I'm a",
      roles: ["Frontend Developer", "Fullstack Developer", "Software Engineer"],
      bio: "Software Engineer specializing in building modern, high-performance web applications and seamless digital experiences using React, Next.js, and Laravel.",
      viewWork: "View My Work",
      contactMe: "Contact Me",
      stats: {
        projects: "Projects Built",
        gpa: "GPA / IPK",
        experience: "Years Coding",
      },
      interactiveStatus: "Interactive Video",
      scrollHint: "Scroll down to see motion",
      resetTitle: "Reset to top",
    },
    about: {
      eyebrow: "About Me",
      titlePrefix: "Get to know",
      titleGradient: "me better",
      role: "Software Engineer",
      education: "Informatics Engineering Graduate (2026) — GPA 3.63",
      institution: "STT Terpadu Nurul Fikri, Indonesia",
      bio1: "I am an Informatics Engineering graduate from Sekolah Tinggi Teknologi Terpadu Nurul Fikri in 2026 with a GPA of 3.63, with a deep passion for modern, high-performance, and user-centric web applications.",
      bio2: "Experienced in building frontend and fullstack web applications using React, Next.js, and Laravel. I enjoy turning complex ideas into impactful real-world software while continuously mastering cutting-edge technologies to craft top-tier software solutions.",
      highlights: [
        {
          title: "Clean Code",
          desc: "Writing clean, structured, and maintainable code built for team scalability.",
        },
        {
          title: "Fast Learner",
          desc: "Quickly adapting to emerging technologies, tools, and technical challenges.",
        },
        {
          title: "Team Player",
          desc: "Experienced in cross-functional collaboration and leading digital media teams.",
        },
        {
          title: "Detail-Oriented",
          desc: "Laser-focused on user experience (UX), performance, and fine craft.",
        },
      ],
    },
    skills: {
      eyebrow: "Tech Stack",
      titlePrefix: "Technical",
      titleGradient: "Skills",
      subtitle: "Technologies and tools I leverage to engineer fast, reliable, and engaging digital products.",
    },
    experience: {
      eyebrow: "Career",
      titlePrefix: "Work",
      titleGradient: "Experience",
      items: [
        {
          role: "Fullstack Developer",
          company: "PT. Winnicode Garuda Indonesia",
          type: "Internship",
          period: "Feb 2025 - Present",
          location: "Bandung, Indonesia (Remote)",
          description: "Developing and maintaining web applications using modern full-stack technologies. Collaborating with cross-functional teams to deliver high-quality software solutions.",
          skills: ["Figma", "Front-End Development", "React", "Laravel"],
        },
        {
          role: "Core Team Lead of Media",
          company: "GROW WITH DATA STT TERPADU NURUL FIKRI",
          type: "Part-time",
          period: "Jan 2025 - Present",
          location: "Jakarta Selatan, Indonesia (Hybrid)",
          description: "Leading the media team to produce engaging content and strategies. Managing team workflows and ensuring consistent brand messaging across platforms.",
          skills: ["Team Leadership", "Figma", "Content Strategy", "Communication"],
        },
      ],
    },
    projects: {
      eyebrow: "Projects",
      titlePrefix: "Featured",
      titleGradient: "Projects",
      subtitle: "Curated collection of projects demonstrating technical depth and creativity in software engineering.",
      viewAllGithub: "View all projects",
      filterLabels: {
        all: "All",
        webApps: "Web Apps",
        internalSystems: "Internal Systems",
        apis: "APIs",
        mobileApps: "Mobile Apps",
      },
      btnCode: "Code",
      btnDemo: "Live Demo",
      showAll: "Show all",
      showLess: "Show less",
      emptyCategory: "No projects in this category yet.",
      footerNote: "and much more ·",
      footerLink: "See all on GitHub →",
    },
    certifications: {
      eyebrow: "Credentials",
      title: "Certifications",
    },
    footer: {
      eyebrow: "Contact",
      titlePrefix: "Let's work",
      titleGradient: "together",
      subtitle: "Have an exciting project or career opportunity? I'm open for collaboration, internships, and freelance. Don't hesitate to reach out.",
      chatWhatsapp: "Chat via WhatsApp",
      rights: "All rights reserved.",
      waMessage: "Hello Nabil, I'm interested in collaborating with you!",
    },
    whatsappFloat: {
      tooltip: "💬 Chat with Nabil on WhatsApp",
      waMessage: "Hello Nabil, I'm interested in collaborating with you!",
    },
    preloader: {
      stages: [
        { threshold: 0, text: "INITIALIZING NEURAL INTERFACE..." },
        { threshold: 25, text: "LOADING DIGITAL HUMAN ASSETS..." },
        { threshold: 55, text: "CONFIGURING 3D ENVIRONMENT..." },
        { threshold: 80, text: "SYNCHRONIZING INTERACTIVE MODULES..." },
        { threshold: 96, text: "SYSTEM READY. ENTERING PORTFOLIO..." },
      ],
    },
  },
};

export const projectsData: ProjectData[] = [
  {
    title: "FlowSphere Management Dashboard",
    category: "Internal Systems",
    description: {
      id: "Dashboard manajemen tim & proyek modern berbasis Angular 19. Menyajikan visualisasi data interaktif dengan Chart.js, papan tugas (kanban), analitik produktivitas, serta manajemen tim dan anggota. Dilengkapi elemen 3D dengan Three.js, animasi confetti, dan integrasi EmailJS untuk notifikasi instan (penugasan tugas, mention, dan persetujuan workflow). Ditata dengan Tailwind CSS, aksesibilitas yang diperhatikan, dan cakupan unit test yang komprehensif.",
      en: "Modern team & project management dashboard built with Angular 19. Delivers interactive data visualizations with Chart.js, Kanban task boards, productivity analytics, and member management. Features 3D elements powered by Three.js, confetti animations, and EmailJS integration for instant notifications (task assignments, mentions, workflow approvals). Styled with Tailwind CSS, high accessibility, and comprehensive unit tests.",
    },
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
    category: "Web Apps",
    description: {
      id: "Platform bisnis digital modern untuk jasa duplikat kunci profesional. Website dibangun menggunakan Next.js & TypeScript untuk performa optimal, menampilkan landing page atraktif dengan desain dark navy & gold yang elegan, sistem pemesanan terintegrasi WhatsApp, halaman detail layanan (motor, mobil, rumah, brankas), serta fitur layanan panggil 24 jam. Backend menggunakan Java Spring Boot yang dicontainerisasi dengan Docker untuk kemudahan deployment. Frontend di-deploy ke Firebase Hosting untuk distribusi CDN global yang stabil dan cepat.",
      en: "Modern digital business platform for professional key duplication services. Built using Next.js & TypeScript for optimal speed, featuring an elegant dark navy & gold landing page, integrated WhatsApp ordering, detailed service pages (motorcycles, cars, homes, safes), and 24/7 emergency dispatch. Backend uses Java Spring Boot containerized with Docker for seamless deployment, with frontend deployed on Firebase Hosting for fast global CDN distribution.",
    },
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
    category: "Web Apps",
    description: {
      id: "Platform web komprehensif untuk digitalisasi klinik pengobatan Islami. Fitur utama mencakup sistem reservasi terintegrasi WhatsApp Gateway, manajemen konten admin, dan optimasi SEO lokal menggunakan Structured Data untuk meningkatkan visibilitas bisnis di mesin pencari.",
      en: "Comprehensive web platform digitizing an Islamic therapy clinic. Core features include reservation bookings integrated with WhatsApp Gateway, admin content management, and local SEO optimization using Structured Data to boost search engine visibility.",
    },
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
    category: "Internal Systems",
    description: {
      id: "Sistem pemesanan warkop berbasis QR yang menghubungkan mode pembeli, kasir, dan admin dalam satu aplikasi. Pembeli dapat scan QR meja, memilih menu beserta varian, lalu membayar via tunai atau QRIS; kasir dapat memantau pesanan masuk, konfirmasi pembayaran, dan melihat riwayat transaksi; sementara admin mengelola menu, meja, QR code, laporan, pajak, keamanan akses, sinkronisasi Firestore, dan integrasi Google Sheets.",
      en: "QR-based café ordering system uniting customer, cashier, and admin portals in one app. Customers scan table QR codes, choose items with custom variants, and pay via cash or QRIS; cashiers monitor orders and confirm payments; while admins manage menus, tables, QR codes, sales reports, tax settings, Firestore sync, and Google Sheets integration.",
    },
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
    category: "APIs",
    description: {
      id: "Monorepo platform transaksi keuangan berbasis microservices dengan backend Go dan pendekatan Clean Architecture. Sistem mencakup Auth Service untuk JWT, RBAC, bcrypt, enkripsi data user AES-GCM, dan HMAC email lookup; Transaction Service untuk deposit, withdraw, transfer, monthly report, Server-Sent Events, serta ledger PostgreSQL dengan row locking untuk menjaga konsistensi transaksi. Dilengkapi dashboard Next.js dan demo Streamlit aman untuk showcase arsitektur, endpoint explorer, snapshot ledger, dan simulasi transaksi tanpa koneksi ke sistem finansial produksi.",
      en: "High-concurrency financial transaction monorepo engineered in Go following Clean Architecture principles. Features an Auth Service (JWT, RBAC, bcrypt, AES-GCM user data encryption, HMAC email lookups) and Transaction Service (deposits, withdrawals, transfers, monthly reports, Server-Sent Events, and PostgreSQL row-locked ledgers). Includes a Next.js dashboard and secure Streamlit sandbox for architectural demonstration without touching production networks.",
    },
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
    category: "Web Apps",
    description: {
      id: "Sistem perpustakaan universitas modern dengan fitur peminjaman digital dan manajemen stok buku real-time. Menggunakan PostgreSQL untuk manajemen relasi data yang kompleks dengan performa tinggi, keamanan data terjamin, dan autentikasi multi-role via NextAuth.",
      en: "Modern university library system featuring digital borrowing and real-time book inventory management. Uses PostgreSQL for complex relational data handling with high performance, secure data architecture, and multi-role authentication via NextAuth.",
    },
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
    category: "Web Apps",
    description: {
      id: "Platform pencarian kerja modern yang menghubungkan talenta dengan perusahaan impian. Menampilkan antarmuka yang bersih dengan fitur pencarian kerja canggih, sistem filter multi-kriteria, dan dashboard pelamar yang intuitif dan responsif di semua perangkat.",
      en: "Modern recruitment and job-hunting platform connecting talented professionals with forward-thinking companies. Offers an intuitive interface with smart job search, multi-criteria filters, and responsive applicant tracking dashboards across all devices.",
    },
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
    category: "Mobile Apps",
    description: {
      id: "Aplikasi mobile monitoring TTD (Tablet Tambah Darah) remaja putri dengan sistem pelaporan digital yang terintegrasi, dashboard kepatuhan untuk tenaga kesehatan, dan fitur edukasi kesehatan terpadu. Dikembangkan menggunakan metodologi Scrum dan diuji dengan Blackbox Testing & UAT.",
      en: "Mobile tracking application for iron supplementation among young women, featuring integrated digital reporting, health worker compliance dashboards, and health education modules. Developed using Scrum and thoroughly verified with Blackbox Testing and UAT.",
    },
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
    category: "Internal Systems",
    description: {
      id: "Ticketing system berbasis web yang komprehensif dengan fitur reporting detail, sistem auto-assignment tiket ke agen yang tersedia, dan Role-Based Access Control (RBAC) menggunakan tiga level pengguna: Admin, Agent, dan User untuk manajemen permintaan dukungan yang efisien.",
      en: "Comprehensive web ticketing system with detailed reporting, auto-assignment to available support agents, and Role-Based Access Control (RBAC) across Admin, Agent, and User tiers for highly efficient request management.",
    },
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
    category: "Web Apps",
    description: {
      id: "Web application informatif film yang menampilkan koleksi film dengan data lengkap dari TMDB API. Dilengkapi fitur pencarian real-time, halaman detail film, sistem rating, dan state management yang efisien untuk pengalaman browsing film yang menyenangkan.",
      en: "Informative cinema web application showcasing movie discovery powered by the TMDB API. Features real-time search, movie detail overviews, rating systems, and smooth state management for an enjoyable movie browsing experience.",
    },
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
    category: "Internal Systems",
    description: {
      id: "Sistem manajemen stok dan kasir (POS) untuk toko bayi premium dengan dashboard analitik penjualan real-time. Fitur utama meliputi manajemen produk, transaksi kasir, laporan harian/bulanan, dan manajemen stok otomatis untuk membantu operasional toko berjalan lebih efisien.",
      en: "Inventory management and Point-of-Sale (POS) system for premium baby apparel retail with real-time sales analytics. Core features include product cataloging, checkout transactions, daily/monthly reports, and automated stock alerts.",
    },
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
