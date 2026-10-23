"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import {
  Award,
  Briefcase,
  Code2,
  FolderKanban,
  Home,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useLanguage } from "./LanguageProvider";

/* ────────────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────────────── */
type SectionId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "certifications"
  | "contact";

interface NavItem {
  readonly id: SectionId;
  readonly icon: LucideIcon;
}

/* ────────────────────────────────────────────────────────────────
   Menu configuration
   ──────────────────────────────────────────────────────────────── */
const MENU: readonly NavItem[] = [
  { id: "home", icon: Home },
  { id: "about", icon: User },
  { id: "skills", icon: Code2 },
  { id: "experience", icon: Briefcase },
  { id: "projects", icon: FolderKanban },
  { id: "certifications", icon: Award },
  { id: "contact", icon: Mail },
];

const SECTION_IDS: readonly SectionId[] = MENU.map((item) => item.id);

const EMPTY_POSITIONS: Record<SectionId, number> = {
  home: 0,
  about: 0,
  skills: 0,
  experience: 0,
  projects: 0,
  certifications: 0,
  contact: 0,
};

/* ────────────────────────────────────────────────────────────────
   Geometry / motion constants
   ──────────────────────────────────────────────────────────────── */
const ORB_SIZE = 48; // 3D floating orb diameter (px)
const ORB_RADIUS = ORB_SIZE / 2;
const SOCKET_SIZE = 44; // Recessed socket bed diameter (px)
const SOCKET_RADIUS = SOCKET_SIZE / 2;
const SCROLL_OFFSET = 70; // Header offset compensation
const AUTO_HIDE_DELTA = 8;
const AUTO_HIDE_THRESHOLD = 100;

/* Snappy 3D spring dynamics */
const SPRING_ORB: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 26,
  mass: 0.75,
};

const SPRING_SOCKET: Transition = {
  type: "spring",
  stiffness: 340,
  damping: 28,
  mass: 0.8,
};

const SPRING_ICON: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 22,
};

/* ────────────────────────────────────────────────────────────────
   3D Mobile Floating Action Navigation
   ──────────────────────────────────────────────────────────────── */
export default function FloatingNav() {
  const { t, lang } = useLanguage();
  const reduced = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<SectionId, HTMLButtonElement>());

  const [active, setActive] = useState<SectionId>("home");
  const activeRef = useRef<SectionId>("home");
  const [positions, setPositions] =
    useState<Record<SectionId, number>>(EMPTY_POSITIONS);
  const [measured, setMeasured] = useState(false);
  const [hidden, setHidden] = useState(false);

  const orbX = useMotionValue(0);
  const socketX = useMotionValue(0);
  const initializedRef = useRef(false);

  /* Stable per-item ref callbacks */
  const itemRefCallbacks = useMemo(() => {
    const callbacks = {} as Record<
      SectionId,
      (el: HTMLButtonElement | null) => void
    >;
    for (const item of MENU) {
      callbacks[item.id] = (el) => {
        if (el) itemRefs.current.set(item.id, el);
        else itemRefs.current.delete(item.id);
      };
    }
    return callbacks;
  }, []);

  /* Measure horizontal centers of all items */
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const next: Record<SectionId, number> = { ...EMPTY_POSITIONS };

    for (const item of MENU) {
      const el = itemRefs.current.get(item.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      next[item.id] = rect.left + rect.width / 2 - containerRect.left;
    }

    setPositions(next);
    setMeasured(true);
  }, []);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* Animate 3D Orb and Recessed Socket */
  useEffect(() => {
    if (!measured) return;

    const centerX = positions[activeRef.current] ?? 0;
    const targetOrb = centerX - ORB_RADIUS;
    const targetSocket = centerX - SOCKET_RADIUS;

    if (!initializedRef.current) {
      initializedRef.current = true;
      orbX.jump(targetOrb);
      socketX.jump(targetSocket);
      return;
    }

    const orbAnim = animate(
      orbX,
      targetOrb,
      reduced ? { type: "tween", duration: 0.15 } : SPRING_ORB,
    );
    const socketAnim = animate(
      socketX,
      targetSocket,
      reduced ? { type: "tween", duration: 0.15 } : SPRING_SOCKET,
    );

    return () => {
      orbAnim.stop();
      socketAnim.stop();
    };
  }, [active, measured, positions, orbX, socketX, reduced]);

  /* ── Scroll-spy ── */
  const setActiveSafe = useCallback((id: SectionId) => {
    activeRef.current = id;
    setActive(id);
  }, []);

  const syncHash = useCallback((id: SectionId, push: boolean) => {
    try {
      if (push) window.history.pushState(null, "", `#${id}`);
      else window.history.replaceState(null, "", `#${id}`);
    } catch {
      /* no-op */
    }
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const ratios = new Map<SectionId, number>(
      SECTION_IDS.map((id) => [id, 0]),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best: SectionId = activeRef.current;
        let bestRatio = 0;
        for (const id of SECTION_IDS) {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }

        if (bestRatio > 0 && best !== activeRef.current) {
          setActiveSafe(best);
          syncHash(best, false);
        }
      },
      { threshold: 0.4 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSafe, syncHash]);

  /* ── Smooth scrolling ── */
  const scrollToSection = useCallback(
    (id: SectionId) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (reduced) {
        el.scrollIntoView({ block: "start" });
        return;
      }

      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const top =
        el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    },
    [reduced],
  );

  const handleSelect = useCallback(
    (id: SectionId) => {
      setActiveSafe(id);
      syncHash(id, true);
      scrollToSection(id);
    },
    [setActiveSafe, syncHash, scrollToSection],
  );

  /* ── Hash change listener ── */
  useEffect(() => {
    const readHash = (): SectionId | null => {
      const raw = window.location.hash.replace("#", "");
      return SECTION_IDS.includes(raw as SectionId)
        ? (raw as SectionId)
        : null;
    };

    const initial = readHash();
    if (initial) setActiveSafe(initial);

    const onHashChange = () => {
      const id = readHash();
      if (id) {
        setActiveSafe(id);
        scrollToSection(id);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [setActiveSafe, scrollToSection]);

  /* ── Auto-hide on scroll ── */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (y < AUTO_HIDE_THRESHOLD) setHidden(false);
        else if (delta > AUTO_HIDE_DELTA) setHidden(true);
        else if (delta < -AUTO_HIDE_DELTA) setHidden(false);

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Keyboard navigation ── */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (index + 1) % MENU.length;
          break;
        case "ArrowLeft":
          nextIndex = (index - 1 + MENU.length) % MENU.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = MENU.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const next = MENU[nextIndex];
      itemRefs.current.get(next.id)?.focus();
      handleSelect(next.id);
    },
    [handleSelect],
  );

  const ActiveIcon = MENU.find((item) => item.id === active)?.icon ?? Home;

  return (
    /* md:hidden ensures this component is ONLY rendered on mobile devices (<768px) */
    <motion.nav
      aria-label={lang === "id" ? "Navigasi mobile" : "Mobile navigation"}
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 pb-[env(safe-area-inset-bottom)] md:hidden"
      initial={reduced ? false : { y: 100, opacity: 0 }}
      animate={{ y: hidden ? 120 : 0, opacity: hidden ? 0 : 1 }}
      transition={
        reduced
          ? { duration: 0.15 }
          : { type: "spring", stiffness: 280, damping: 26, mass: 0.85 }
      }
    >
      {/* 3D Perspective Wrapper */}
      <div
        className="pointer-events-auto relative w-full max-w-[380px]"
        style={{ perspective: 1000 }}
      >
        {/* ── 3D Pill Dock Chassis ── */}
        <div
          ref={containerRef}
          className="relative flex h-[58px] w-full items-center justify-between rounded-full px-2"
          style={{
            background:
              "linear-gradient(180deg, rgba(34, 34, 38, 0.94) 0%, rgba(18, 18, 22, 0.98) 100%)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: "1px solid rgba(255, 255, 255, 0.14)",
            boxShadow:
              "0 22px 48px -8px rgba(0, 0, 0, 0.78), 0 8px 18px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.8), 0 0 20px rgba(91, 225, 43, 0.12)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top 3D Specular Light Rim (Curved Glass Highlight) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-0 h-[1.5px] rounded-full opacity-70"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.7) 50%, transparent 100%)",
            }}
          />

          {/* ── 3D Sunken Socket (Notch Bed under active orb) ── */}
          {measured && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-[7px] rounded-full"
              style={{
                width: SOCKET_SIZE,
                height: SOCKET_SIZE,
                x: socketX,
                background:
                  "linear-gradient(180deg, rgba(10, 10, 13, 0.95) 0%, rgba(22, 22, 28, 0.9) 100%)",
                boxShadow:
                  "inset 0 3px 6px rgba(0, 0, 0, 0.95), inset 0 1px 2px rgba(0, 0, 0, 0.9), 0 1px 0 rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.04)",
              }}
            >
              {/* Subtle green ambient light pool inside the socket */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 50% 60%, rgba(91, 225, 43, 0.28) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          )}

          {/* ── 3D Floating Orb Contact Shadow ── */}
          {measured && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-[44px] h-[5px] w-[26px] rounded-full bg-black/75 blur-[2px]"
              style={{
                x: orbX,
                marginLeft: 11,
              }}
              animate={
                reduced
                  ? undefined
                  : {
                      scale: [1, 0.85, 1],
                      opacity: [0.75, 0.55, 0.75],
                    }
              }
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut",
              }}
            />
          )}

          {/* ── Inactive & Interactive Nav Buttons ── */}
          {MENU.map((item, index) => {
            const isActive = item.id === active;
            return (
              <motion.button
                key={item.id}
                ref={itemRefCallbacks[item.id]}
                type="button"
                onClick={() => handleSelect(item.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                tabIndex={isActive ? 0 : -1}
                aria-label={t.nav[item.id]}
                aria-current={isActive ? "page" : undefined}
                className="group relative z-10 flex h-full flex-1 items-center justify-center rounded-full outline-none transition-transform active:scale-90"
                whileTap={reduced || isActive ? undefined : { scale: 0.85 }}
                transition={SPRING_ICON}
              >
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  className={`transition-all duration-200 ${
                    isActive
                      ? "opacity-0 scale-75"
                      : "text-slate-400 group-hover:text-white group-active:text-[#5be12b] opacity-80"
                  }`}
                />
              </motion.button>
            );
          })}

          {/* ── 3D Floating Orb (Hero Active Element) ── */}
          {measured && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-0 z-20 flex items-center justify-center rounded-full"
              style={{
                top: -20,
                width: ORB_SIZE,
                height: ORB_SIZE,
                x: orbX,
                /* 3D Hyper-tactile Spherical Shader */
                background:
                  "radial-gradient(circle at 34% 28%, #afff75 0%, #5be12b 40%, #1e8e0a 78%, #0d4603 100%)",
                boxShadow:
                  "0 0 26px rgba(91, 225, 43, 0.8), 0 10px 22px -2px rgba(0, 0, 0, 0.65), inset 0 2px 4px rgba(255, 255, 255, 0.8), inset 0 -3px 4px rgba(0, 0, 0, 0.5), 0 0 0 3px rgba(18, 18, 22, 0.95)",
                transformStyle: "preserve-3d",
              }}
              animate={
                reduced
                  ? undefined
                  : {
                      y: [0, -3.5, 0],
                    }
              }
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut",
              }}
            >
              {/* Top-left Specular Glass Glint */}
              <div
                className="pointer-events-none absolute left-[7px] top-[5px] h-[10px] w-[16px] rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at 40% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.3) 50%, transparent 80%)",
                  transform: "rotate(-25deg)",
                }}
              />

              {/* 3D Floating HUD Label Pill (Active Section Name) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, y: 4, scale: 0.85 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, y: -4, scale: 0.85 }
                  }
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="pointer-events-none absolute -top-8 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 px-2.5 py-0.5 shadow-2xl backdrop-blur-md"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(28, 28, 34, 0.95) 0%, rgba(12, 12, 16, 0.98) 100%)",
                    boxShadow:
                      "0 8px 20px -3px rgba(0, 0, 0, 0.7), 0 0 12px rgba(91, 225, 43, 0.35)",
                  }}
                >
                  {/* Glowing 3D Micro-LED */}
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-[#5be12b]"
                    style={{
                      boxShadow: "0 0 6px #5be12b, 0 0 10px #5be12b",
                    }}
                  />
                  <span className="text-[10px] font-bold tracking-wider text-white">
                    {t.nav[active]}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* 3D Active Icon with Flip / Pop Effect */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={active}
                  initial={
                    reduced
                      ? false
                      : { scale: 0.3, rotateY: 90, opacity: 0 }
                  }
                  animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                  exit={
                    reduced
                      ? undefined
                      : { scale: 0.3, rotateY: -90, opacity: 0 }
                  }
                  transition={SPRING_ICON}
                  className="absolute inset-0 flex items-center justify-center text-[#082a05]"
                  style={{
                    filter: "drop-shadow(0 1px 1px rgba(255, 255, 255, 0.35))",
                  }}
                >
                  <ActiveIcon size={22} strokeWidth={2.5} />
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
