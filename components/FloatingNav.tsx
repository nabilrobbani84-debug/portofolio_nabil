"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
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
   Menu configuration — reorder / add sections here only.
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
   Geometry / motion constants (px) — tweak freely.
   ──────────────────────────────────────────────────────────────── */
const INDICATOR_SIZE = 48; // green circle diameter
const INDICATOR_RADIUS = INDICATOR_SIZE / 2;
const INDICATOR_LIFT = 26; // how far the circle rises above the pill
const NOTCH_RADIUS = 27; // cutout radius (circle + breathing room)
const NOTCH_CENTER_Y = -INDICATOR_LIFT + INDICATOR_RADIUS; // circle center vs pill top
const SCROLL_OFFSET = 72; // fixed top-navbar compensation
const AUTO_HIDE_DELTA = 6; // scroll px needed to trigger hide/show
const AUTO_HIDE_THRESHOLD = 120; // keep visible near the top of the page

const SPRING_INDICATOR: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.9,
};

/* Notch trails the circle by 30ms for an organic, liquid feel. */
const SPRING_NOTCH: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 28,
  mass: 0.9,
  delay: 0.03,
};

const SPRING_ICON: Transition = {
  type: "spring",
  stiffness: 340,
  damping: 22,
};

const SPRING_BUTTON: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 22,
};

/* ────────────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────────────── */
export default function FloatingNav() {
  const { t, lang } = useLanguage();
  const reduced = useReducedMotion();

  const surfaceRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<SectionId, HTMLButtonElement>());

  const [active, setActive] = useState<SectionId>("home");
  const activeRef = useRef<SectionId>("home");
  const [positions, setPositions] =
    useState<Record<SectionId, number>>(EMPTY_POSITIONS);
  const [measured, setMeasured] = useState(false);
  const [hovered, setHovered] = useState<SectionId | null>(null);
  const [hidden, setHidden] = useState(false);

  const indicatorX = useMotionValue(0);
  const notchX = useMotionValue(0);
  const initializedRef = useRef(false);

  /* Stable per-item ref callbacks so React never detaches/reattaches. */
  const itemRefCallbacks = useMemo(() => {
    const callbacks = {} as Record<SectionId, (el: HTMLButtonElement | null) => void>;
    for (const item of MENU) {
      callbacks[item.id] = (el) => {
        if (el) itemRefs.current.set(item.id, el);
        else itemRefs.current.delete(item.id);
      };
    }
    return callbacks;
  }, []);

  /* Reduced-motion aware transitions. */
  const indicatorTransition: Transition = useMemo(
    () =>
      reduced
        ? { type: "tween", duration: 0.15, ease: "easeOut" }
        : SPRING_INDICATOR,
    [reduced],
  );

  const notchTransition: Transition = useMemo(
    () =>
      reduced
        ? { type: "tween", duration: 0.12, ease: "easeOut" }
        : SPRING_NOTCH,
    [reduced],
  );

  /* ── Dynamic curved cutout (the "notch") ─────────────────────────
     Writes the mask straight to the DOM node so the circle + notch
     glide without triggering React re-renders. */
  const applyMask = useCallback((x: number) => {
    const surface = surfaceRef.current;
    if (!surface) return;

    const centerX = x + INDICATOR_RADIUS;
    const inner = NOTCH_RADIUS - 0.7;
    const outer = NOTCH_RADIUS - 0.1;
    const mask = `radial-gradient(circle ${NOTCH_RADIUS}px at ${centerX.toFixed(
      2,
    )}px ${NOTCH_CENTER_Y.toFixed(2)}px, transparent 0 ${inner}px, black ${outer}px)`;

    surface.style.maskImage = mask;
    surface.style.webkitMaskImage = mask;
  }, []);

  /* ── Measurement: centers of every item, relative to the pill ── */
  const measure = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;

    const contentRect = content.getBoundingClientRect();
    const next: Record<SectionId, number> = { ...EMPTY_POSITIONS };

    for (const item of MENU) {
      const el = itemRefs.current.get(item.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      next[item.id] = rect.left + rect.width / 2 - contentRect.left;
    }

    setPositions(next);
    setMeasured(true);
  }, []);

  useEffect(() => {
    measure();

    const content = contentRef.current;
    if (!content) return;

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(content);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* ── Animate indicator + notch (notch trails by a tiny delay) ── */
  useEffect(() => {
    if (!measured) return;

    const target = (positions[activeRef.current] ?? 0) - INDICATOR_RADIUS;

    // First layout: place everything instantly (no entrance slide).
    if (!initializedRef.current) {
      initializedRef.current = true;
      indicatorX.jump(target);
      notchX.jump(target);
      applyMask(target);
      return;
    }

    const indicatorAnimation = animate(indicatorX, target, indicatorTransition);
    const notchAnimation = animate(notchX, target, notchTransition);

    return () => {
      indicatorAnimation.stop();
      notchAnimation.stop();
    };
  }, [
    active,
    measured,
    positions,
    indicatorX,
    notchX,
    applyMask,
    indicatorTransition,
    notchTransition,
  ]);

  useMotionValueEvent(notchX, "change", (latest) => applyMask(latest));

  /* ── Scroll-spy (IntersectionObserver, threshold 0.5) ── */
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
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
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
      { threshold: 0.5 },
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

      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
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

  /* ── Initial hash + browser back/forward ── */
  useEffect(() => {
    const readHash = (): SectionId | null => {
      const raw = window.location.hash.replace("#", "");
      return SECTION_IDS.includes(raw as SectionId) ? (raw as SectionId) : null;
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

  /* ── Auto-hide on scroll down, reveal on scroll up ── */
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

  /* ── Keyboard: arrows + Home/End move focus & activate ── */
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
    <motion.nav
      aria-label={lang === "id" ? "Navigasi utama" : "Main navigation"}
      className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 pb-[env(safe-area-inset-bottom)] sm:bottom-6"
      initial={reduced ? false : { y: 80, opacity: 0 }}
      animate={{ y: hidden ? 130 : 0, opacity: hidden ? 0 : 1 }}
      transition={
        reduced
          ? { duration: 0.15 }
          : { type: "spring", stiffness: 260, damping: 26, mass: 0.9 }
      }
    >
      <div className="pointer-events-auto relative h-16 max-w-[420px]">
        {/* ── Pill surface (masked with the moving notch) ── */}
        <div
          ref={surfaceRef}
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0) 42%), var(--floating-nav-bg)",
            backdropFilter: "blur(18px) saturate(1.4)",
            WebkitBackdropFilter: "blur(18px) saturate(1.4)",
            boxShadow:
              "var(--floating-nav-shadow), inset 0 0 0 1px var(--floating-nav-border)",
          }}
        />

        {/* ── Interactive content layer (never masked) ── */}
        <div
          ref={contentRef}
          className="relative flex h-full items-center gap-1 px-2 sm:gap-1.5 sm:px-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hovered && measured && !hidden && (
              <motion.div
                key={hovered}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="pointer-events-none absolute -top-11 z-20 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-white"
                style={{
                  left: positions[hovered] ?? 0,
                  x: "-50%",
                  background: "var(--floating-nav-tooltip-bg)",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.35)",
                }}
              >
                {t.nav[hovered]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Menu items */}
          {MENU.map((item, index) => {
            const isActive = item.id === active;
            return (
              <motion.button
                key={item.id}
                ref={itemRefCallbacks[item.id]}
                type="button"
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered(null)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                tabIndex={isActive ? 0 : -1}
                aria-label={t.nav[item.id]}
                aria-current={isActive ? "page" : undefined}
                className="floating-nav-item group relative flex h-full w-11 items-center justify-center rounded-full outline-none sm:w-14"
                whileHover={reduced || isActive ? undefined : { scale: 1.1, y: -2 }}
                whileTap={reduced || isActive ? undefined : { scale: 0.9 }}
                transition={SPRING_BUTTON}
              >
                <item.icon
                  size={22}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  className={`floating-nav-icon h-5 w-5 sm:h-[22px] sm:w-[22px] ${
                    isActive ? "opacity-0" : "opacity-100"
                  }`}
                />
              </motion.button>
            );
          })}

          {/* Active indicator (green circle + dark icon) */}
          {measured && (
            <motion.div
              aria-hidden
              className="absolute left-0 z-10 flex items-center justify-center rounded-full"
              style={{
                top: -INDICATOR_LIFT,
                width: INDICATOR_SIZE,
                height: INDICATOR_SIZE,
                x: indicatorX,
                background: "var(--floating-nav-accent)",
                boxShadow:
                  "0 0 24px var(--floating-nav-accent-glow), 0 6px 18px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 0 0 3px var(--floating-nav-bg-solid)",
              }}
            >
              <AnimatePresence initial={false}>
                <motion.span
                  key={active}
                  initial={reduced ? false : { scale: 0.35, rotate: -18, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={reduced ? undefined : { scale: 0.35, rotate: 12, opacity: 0 }}
                  transition={SPRING_ICON}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: "var(--floating-nav-accent-ink)" }}
                >
                  <ActiveIcon size={24} strokeWidth={2.4} />
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
