"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Car,
  Check,
  Cloud,
  Globe,
  GraduationCap,
  MapPinned,
  MessageCircle,
  ShoppingCart,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { FaApple, FaGithub, FaGooglePlay } from "react-icons/fa";
import { GiLift } from "react-icons/gi";
import { EARLIER_PROJECTS, PLATFORMS, PROJECTS } from "@/data/projects";
import ProjectBackdrop from "@/components/projects/ProjectBackdrop";

const MotionDiv     = motion.div;
const MotionH1      = motion.h1;
const MotionP       = motion.p;
const MotionSpan    = motion.span;
const MotionArticle = motion.article;

// ── Tokens ───────────────────────────────────────────────────────────────────

const MONO = "ui-monospace, 'Cascadia Code', 'SF Mono', Menlo, Consolas, monospace";

const ACCENTS = {
  orange:  { hex: "#fb923c", deep: "#ea580c", glow: "rgba(251,146,60,0.28)",  text: "text-orange-300"  },
  cyan:    { hex: "#22d3ee", deep: "#0891b2", glow: "rgba(34,211,238,0.28)",  text: "text-cyan-300"    },
  purple:  { hex: "#c084fc", deep: "#7c3aed", glow: "rgba(192,132,252,0.28)", text: "text-purple-300"  },
  emerald: { hex: "#34d399", deep: "#059669", glow: "rgba(52,211,153,0.28)",  text: "text-emerald-300" },
  blue:    { hex: "#60a5fa", deep: "#2563eb", glow: "rgba(96,165,250,0.28)",  text: "text-blue-300"    },
};

const PROJECT_ICONS = {
  utensils:   UtensilsCrossed,
  map:        MapPinned,
  building:   Building2,
  graduation: GraduationCap,
  store:      Store,
  cart:       ShoppingCart,
  globe:      Globe,
  elevator:   GiLift,
  chat:       MessageCircle,
  book:       BookOpen,
  cloud:      Cloud,
  car:        Car,
};

const LINK_META = {
  play:   { Icon: FaGooglePlay, store: "Google Play" },
  apple:  { Icon: FaApple,      store: "App Store"   },
  web:    { Icon: Globe,        store: "Website"     },
  github: { Icon: FaGithub,     store: "GitHub"      },
};

const ALL_PROJECTS = [...PROJECTS, ...EARLIER_PROJECTS];
const STORE_LISTINGS = ALL_PROJECTS.reduce(
  (n, p) => n + p.links.filter((l) => l.kind === "play" || l.kind === "apple").length, 0,
);
const LIVE_SITES = ALL_PROJECTS.reduce(
  (n, p) => n + p.links.filter((l) => l.kind === "web").length, 0,
);
const PLATFORM_COUNT = new Set(ALL_PROJECTS.flatMap((p) => p.platforms)).size;

// ── Device mockups ───────────────────────────────────────────────────────────

const PhoneMockup = ({ accent, float, className = "", delay = 0 }) => (
  <MotionDiv
    animate={float ? { y: [0, -10, 0] } : undefined}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    className={`rounded-[22px] border overflow-hidden select-none ${className}`}
    style={{
      borderColor: `${accent.hex}55`,
      background: "rgba(8,8,18,0.96)",
      boxShadow: `0 20px 50px -10px ${accent.glow}, 0 0 0 1px ${accent.hex}18`,
    }}
  >
    <div className="h-6 flex items-center justify-between px-3" style={{ background: `${accent.hex}12` }}>
      <div className="flex gap-0.5">
        {[0, 1, 2].map((i) => <div key={i} className="w-0.5 h-2 rounded-full" style={{ background: accent.hex, opacity: 0.5 + i * 0.2 }} />)}
      </div>
      <div className="w-10 h-1.5 rounded-full" style={{ background: `${accent.hex}45` }} />
    </div>
    <div className="p-2.5 space-y-2">
      <div className="h-2.5 rounded-full w-2/3" style={{ background: `${accent.hex}60` }} />
      <div className="h-1.5 rounded-full w-full" style={{ background: `${accent.hex}28` }} />
      <div className="h-1.5 rounded-full w-4/5" style={{ background: `${accent.hex}20` }} />
      <div className="mt-2 h-14 rounded-xl" style={{ background: `linear-gradient(135deg, ${accent.hex}38, ${accent.hex}0c)`, border: `1px solid ${accent.hex}25` }} />
      <div className="grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-9 rounded-lg" style={{ background: `${accent.hex}12`, border: `1px solid ${accent.hex}1e` }} />
        ))}
      </div>
      <div className="h-7 rounded-lg mt-1" style={{ background: `linear-gradient(90deg, ${accent.hex}, ${accent.deep})`, opacity: 0.85 }} />
    </div>
  </MotionDiv>
);

const BrowserMockup = ({ accent, float, className = "" }) => (
  <MotionDiv
    animate={float ? { y: [0, -6, 0] } : undefined}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className={`rounded-xl overflow-hidden border select-none ${className}`}
    style={{
      borderColor: `${accent.hex}30`,
      background: "rgba(8,8,18,0.96)",
      boxShadow: `0 24px 60px -16px ${accent.glow}`,
    }}
  >
    <div className="h-7 flex items-center gap-2 px-3" style={{ background: `${accent.hex}10`, borderBottom: `1px solid ${accent.hex}1e` }}>
      <div className="flex gap-1.5">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.8 }} />)}
      </div>
      <div className="flex-1 h-4 rounded-full mx-2 flex items-center px-2" style={{ background: `${accent.hex}0c`, border: `1px solid ${accent.hex}1a` }}>
        <div className="h-1 rounded-full w-1/2" style={{ background: `${accent.hex}55` }} />
      </div>
    </div>
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="h-2 w-14 rounded-full" style={{ background: `${accent.hex}70` }} />
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => <div key={i} className="h-1.5 w-7 rounded-full" style={{ background: `${accent.hex}30` }} />)}
        </div>
      </div>
      <div className="h-16 rounded-lg" style={{ background: `linear-gradient(135deg, ${accent.hex}26, ${accent.hex}06)`, border: `1px solid ${accent.hex}18` }}>
        <div className="p-2.5 space-y-1.5">
          <div className="h-2 rounded-full w-2/5" style={{ background: `${accent.hex}60` }} />
          <div className="h-1.5 rounded-full w-3/5" style={{ background: `${accent.hex}30` }} />
          <div className="h-4 rounded-md w-14 mt-1.5" style={{ background: `linear-gradient(90deg, ${accent.hex}, ${accent.deep})`, opacity: 0.8 }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 rounded-lg" style={{ background: `${accent.hex}0f`, border: `1px solid ${accent.hex}18` }}>
            <div className="h-0.5 rounded-t-lg" style={{ background: `linear-gradient(90deg, ${accent.hex}, ${accent.deep})` }} />
          </div>
        ))}
      </div>
    </div>
  </MotionDiv>
);

const DeviceStage = ({ stage, accent, float }) => {
  if (stage === "apps") {
    return (
      <div className="relative w-full max-w-105 mx-auto h-64 sm:h-72 lg:h-80">
        <BrowserMockup accent={accent} float={float} className="absolute left-0 top-4 w-[78%] sm:w-[76%] opacity-80" />
        <PhoneMockup accent={accent} float={float} delay={0.6} className="absolute right-2 bottom-0 w-28 sm:w-32 z-10" />
        <PhoneMockup accent={accent} float={float} delay={1.2} className="absolute right-26 sm:right-31 bottom-6 w-23 sm:w-26 opacity-70 scale-[0.92]" />
      </div>
    );
  }
  return (
    <div className="relative w-full max-w-105 mx-auto h-56 sm:h-64 lg:h-72 flex items-center">
      <BrowserMockup accent={accent} float={float} className="w-full" />
    </div>
  );
};

// ── Project panel ────────────────────────────────────────────────────────────

const PlatformMatrix = ({ built, accent }) => (
  <ul className="flex flex-wrap gap-1.5" aria-label="Platforms delivered">
    {PLATFORMS.map((platform) => {
      const lit = built.includes(platform.key);
      return (
        <li
          key={platform.key}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-2xs font-semibold tracking-wide"
          style={{
            fontFamily: MONO,
            color: lit ? accent.hex : "rgba(255,255,255,0.28)",
            background: lit ? `${accent.hex}14` : "rgba(255,255,255,0.02)",
            border: `1px solid ${lit ? `${accent.hex}45` : "rgba(255,255,255,0.08)"}`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: lit ? accent.hex : "rgba(255,255,255,0.15)", boxShadow: lit ? `0 0 8px ${accent.hex}` : "none" }}
            aria-hidden="true"
          />
          {platform.label}
          <span className="sr-only">{lit ? " — delivered" : " — not part of this project"}</span>
        </li>
      );
    })}
  </ul>
);

const ProjectLink = ({ link, projectName, accent }) => {
  const { Icon, store } = LINK_META[link.kind];
  const isWeb = link.kind === "web";
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${projectName} — ${link.label} on ${store}`}
      className="group/link inline-flex items-center gap-2.5 rounded-lg pl-2.5 pr-3 py-2 text-sm transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d1a]"
      style={{
        background: isWeb ? `linear-gradient(90deg, ${accent.hex}, ${accent.deep})` : "rgba(255,255,255,0.04)",
        border: `1px solid ${isWeb ? "transparent" : `${accent.hex}30`}`,
        color: isWeb ? "#0b0b16" : "rgba(255,255,255,0.85)",
        "--tw-ring-color": accent.hex,
      }}
    >
      <Icon className="w-4 h-4 shrink-0" style={{ color: isWeb ? "#0b0b16" : accent.hex }} aria-hidden="true" />
      <span className="flex flex-col leading-tight text-left">
        <span className="font-semibold">{link.label}</span>
        {!isWeb && <span className="text-[10px] uppercase tracking-widest opacity-60">{store}</span>}
      </span>
      <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-50 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" aria-hidden="true" />
    </a>
  );
};

const ProjectPanel = ({ project, index, reduceMotion }) => {
  const accent = ACCENTS[project.accent] ?? ACCENTS.cyan;
  const Icon   = PROJECT_ICONS[project.icon] ?? Globe;
  const ongoing = project.period.end === "Present";

  return (
    <MotionArticle
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay: 0.05 }}
      className="relative scroll-mt-28 lg:grid lg:grid-cols-[168px_1fr] lg:gap-8"
      id={project.slug}
    >
      {/* Rail label (desktop) */}
      <div className="hidden lg:flex flex-col items-end pt-8 pr-8 relative">
        <span
          className="absolute -right-1.25 top-9.5 w-2.5 h-2.5 rounded-full border-2 border-[#070711] z-10"
          style={{ background: accent.hex, boxShadow: `0 0 14px ${accent.hex}` }}
          aria-hidden="true"
        />
        <span className="text-2xs tracking-[0.2em] uppercase text-white/35" style={{ fontFamily: MONO }}>
          {ongoing ? "Since" : "Shipped"}
        </span>
        <span className={`mt-1 text-sm font-semibold ${accent.text}`} style={{ fontFamily: MONO }}>
          {ongoing ? project.period.start : project.period.end}
        </span>
        <span className="mt-4 text-2xs text-white/30" style={{ fontFamily: MONO }}>
          {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Panel */}
      <div className="group relative">
        <div
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
          style={{ background: `radial-gradient(60% 60% at 80% 20%, ${accent.glow}, transparent 70%)` }}
          aria-hidden="true"
        />
        <div
          className="relative rounded-3xl overflow-hidden border bg-[#0b0b18]/85 backdrop-blur-md transition-colors duration-300"
          style={{ borderColor: `${accent.hex}22`, boxShadow: "0 30px 60px -30px rgba(0,0,0,0.8)" }}
        >
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${accent.hex}, ${accent.deep} 60%, transparent)` }} />

          <div className="grid gap-8 p-6 sm:p-8 lg:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
            {/* ── Copy column ── */}
            <div className="min-w-0 order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-2xs uppercase tracking-[0.18em]" style={{ fontFamily: MONO }}>
                <span className={`${accent.text} font-semibold`}>{project.role}</span>
                <span className="text-white/20" aria-hidden="true">·</span>
                <span className="text-white/45">{project.period.start} — {project.period.end}</span>
                {project.status === "live" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold text-emerald-300 bg-emerald-400/10 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    Live
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${accent.hex}14`, border: `1px solid ${accent.hex}35`, boxShadow: `inset 0 0 20px ${accent.hex}10` }}
                  aria-hidden="true"
                >
                  <Icon className="w-6 h-6" style={{ color: accent.hex }} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none">{project.name}</h2>
                  <p className="mt-2 text-sm sm:text-base text-white/55">{project.tagline}</p>
                </div>
              </div>

              <p className="mt-6 text-white/70 leading-relaxed max-w-prose">{project.summary}</p>

              <div className="mt-7">
                <p className="text-2xs uppercase tracking-[0.2em] text-white/35 mb-3" style={{ fontFamily: MONO }}>What I built</p>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {project.built.map((item) => (
                    <li key={item.label} className="flex items-start gap-2.5 rounded-xl px-3 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="mt-0.5 w-4 h-4 rounded-md flex items-center justify-center shrink-0" style={{ background: `${accent.hex}1a`, border: `1px solid ${accent.hex}45` }} aria-hidden="true">
                        <Check className="w-3 h-3" style={{ color: accent.hex }} strokeWidth={3} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white/90 leading-tight">{item.label}</span>
                        <span className="block text-xs text-white/45 mt-0.5">{item.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-2xs uppercase tracking-[0.2em] text-white/35 mb-3" style={{ fontFamily: MONO }}>Platforms</p>
                <PlatformMatrix built={project.platforms} accent={accent} />
              </div>

              <div className="mt-6">
                <p className="text-2xs uppercase tracking-[0.2em] text-white/35 mb-3" style={{ fontFamily: MONO }}>Stack</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ color: accent.hex, background: `${accent.hex}12`, border: `1px solid ${accent.hex}30` }}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 flex flex-wrap gap-2.5 border-t" style={{ borderColor: `${accent.hex}18` }}>
                {project.links.map((link) => (
                  <ProjectLink key={link.href} link={link} projectName={project.name} accent={accent} />
                ))}
              </div>
            </div>

            {/* ── Stage column ── */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-28">
              <DeviceStage stage={project.stage} accent={accent} float={!reduceMotion} />
            </div>
          </div>
        </div>
      </div>
    </MotionArticle>
  );
};

// ── Earlier work card ────────────────────────────────────────────────────────

const EarlierProjectCard = ({ project, index, reduceMotion }) => {
  const accent = ACCENTS[project.accent] ?? ACCENTS.cyan;
  const Icon   = PROJECT_ICONS[project.icon] ?? Globe;

  return (
    <MotionDiv
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative scroll-mt-28 flex flex-col rounded-2xl border bg-[#0b0b18]/85 backdrop-blur-md overflow-hidden transition-colors duration-300"
      style={{ borderColor: `${accent.hex}1e` }}
      id={project.slug}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${accent.hex}, ${accent.deep} 60%, transparent)` }} />
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: MONO }}>
          <span className={`${accent.text} font-semibold truncate`}>{project.role}</span>
          <span className="text-white/40 whitespace-nowrap">{project.period.start} — {project.period.end}</span>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: `${accent.hex}14`, border: `1px solid ${accent.hex}35` }}
            aria-hidden="true"
          >
            <Icon className="w-5 h-5" style={{ color: accent.hex }} />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-white leading-tight flex items-center gap-2 flex-wrap">
              {project.name}
              {project.status === "live" && (
                <span className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-300 bg-emerald-400/10 border border-emerald-400/30" style={{ fontFamily: MONO }}>
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  Live
                </span>
              )}
            </h3>
            <p className="mt-1 text-xs text-white/50">{project.tagline}</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-white/65 leading-relaxed">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="text-2xs font-semibold px-2 py-0.5 rounded-full"
              style={{ color: accent.hex, background: `${accent.hex}12`, border: `1px solid ${accent.hex}2a` }}
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          <ul className="flex gap-1" aria-label="Platforms delivered">
            {PLATFORMS.map((platform) => {
              const lit = project.platforms.includes(platform.key);
              return (
                <li
                  key={platform.key}
                  title={platform.label}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: lit ? accent.hex : "rgba(255,255,255,0.12)", boxShadow: lit ? `0 0 6px ${accent.hex}` : "none" }}
                >
                  <span className="sr-only">{platform.label}{lit ? " — delivered" : " — not part of this project"}</span>
                </li>
              );
            })}
          </ul>

          {project.links.length > 0 ? (
            <div className="flex gap-2">
              {project.links.map((link) => {
                const { Icon: LinkIcon, store } = LINK_META[link.kind];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} — ${link.label} on ${store}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white/80 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d1a]"
                    style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${accent.hex}30`, "--tw-ring-color": accent.hex }}
                  >
                    <LinkIcon className="w-3.5 h-3.5" style={{ color: accent.hex }} aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/30" style={{ fontFamily: MONO }}>
              {project.role === "Personal project" ? "Private repo" : "Client work"}
            </span>
          )}
        </div>
      </div>
    </MotionDiv>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: ALL_PROJECTS.length, label: "projects delivered" },
  { value: STORE_LISTINGS,    label: "app store listings" },
  { value: LIVE_SITES,        label: "live websites" },
  { value: PLATFORM_COUNT,    label: "platforms covered" },
];

const ProjectsPage = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen overflow-hidden relative bg-[#070711]">
      <ProjectBackdrop reduceMotion={reduceMotion} />
      {/* Soft vignette so panel text stays readable over the brightest aurora pools */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, rgba(7,7,17,0) 40%, rgba(7,7,17,0.55) 100%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* ── Header ── */}
        <header className="pt-32 pb-14 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" aria-hidden="true" />
          <div className="absolute -top-32 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />

          <div className="max-w-6xl mx-auto">
            <MotionDiv
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 text-2xs uppercase tracking-[0.22em] text-cyan-300/80"
              style={{ fontFamily: MONO }}
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              Selected work · 2024 — 2026
            </MotionDiv>

            <MotionH1
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] max-w-3xl"
            >
              Products I&rsquo;ve shipped,{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-sky-400 to-purple-400">end to end.</span>
            </MotionH1>

            <MotionP
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-6 text-lg text-white/60 max-w-2xl leading-relaxed"
            >
              Mobile apps in the stores, web platforms in production, and the backends that keep them running.
              Each entry below is a product real people use — not a demo.
            </MotionP>

            <MotionDiv
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm overflow-hidden"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="px-5 py-4 border-white/10 not-first:border-l max-sm:nth-3:border-l-0 max-sm:nth-[n+3]:border-t">
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums" style={{ fontFamily: MONO }}>{stat.value}</div>
                  <div className="mt-1 text-2xs uppercase tracking-[0.18em] text-white/40" style={{ fontFamily: MONO }}>{stat.label}</div>
                </div>
              ))}
            </MotionDiv>
          </div>
        </header>

        {/* ── Case studies ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative" aria-label="Projects">
          {/* Rail line (desktop) */}
          <div className="hidden lg:block absolute left-[calc(168px+2rem-1px)] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 8%, rgba(255,255,255,0.12) 92%, transparent)" }} aria-hidden="true" />
          <div className="space-y-12 lg:space-y-16">
            {PROJECTS.map((project, index) => (
              <ProjectPanel key={project.slug} project={project} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
        </section>

        {/* ── Earlier work ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24" aria-labelledby="earlier-work-heading">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-2xs uppercase tracking-[0.22em] text-white/35 mb-3" style={{ fontFamily: MONO }}>2024 — 2025</p>
              <h2 id="earlier-work-heading" className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Earlier work</h2>
            </div>
            <p className="text-sm text-white/50 max-w-md">
              Client sites, employer products, and the personal builds where I learned the stack — {EARLIER_PROJECTS.length} projects.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {EARLIER_PROJECTS.map((project, index) => (
              <EarlierProjectCard key={project.slug} project={project} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <MotionDiv
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pb-32 relative px-4"
        >
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" aria-hidden="true" />
          <p className="text-2xs uppercase tracking-[0.22em] text-white/35 mb-4" style={{ fontFamily: MONO }}>Next project</p>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">Have something that needs to ship?</h3>
          <MotionDiv whileHover={reduceMotion ? undefined : { scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d1a]"
            >
              Start a conversation
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </MotionDiv>
        </MotionDiv>
      </div>
    </div>
  );
};

export default ProjectsPage;
