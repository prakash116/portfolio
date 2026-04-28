import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import {
  Building2,
  BookOpen,
  Car,
  Cloud,
  ExternalLink,
  Globe,
  Github,
  MessageCircle,
  Smartphone,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { GiLift } from "react-icons/gi";
import toast from "react-hot-toast";

const MotionDiv    = motion.div;
const MotionH1     = motion.h1;
const MotionP      = motion.p;
const MotionButton = motion.button;
const MotionSpan   = motion.span;

const ACCENT_HEX = {
  purple:  0x9f7aea,
  cyan:    0x00b5d8,
  emerald: 0x38b2ac,
  blue:    0x4299e1,
  orange:  0xed8936,
};

const ACCENT_STYLES = {
  purple: {
    iconText:    "text-purple-400",
    yearText:    "text-purple-300",
    gradient:    "from-purple-500 to-purple-600",
    panelGradient: "from-purple-900/30 to-purple-800/30",
    panelTint:   "from-purple-900/10 to-purple-800/10",
    border:      "border-purple-400/20",
    borderHover: "group-hover:border-purple-400/40",
    cardHover:   "group-hover:border-purple-400/50",
    shadowHover: "group-hover:shadow-purple-500/20",
    buttonHover: "hover:bg-purple-900/30",
    demoShadow:  "hover:shadow-purple-500/30",
    hex:         "#a855f7",
    topBar:      "linear-gradient(to right,#a855f7,#7c3aed)",
    glowRgba:    "rgba(168,85,247,0.25)",
  },
  cyan: {
    iconText:    "text-cyan-400",
    yearText:    "text-cyan-300",
    gradient:    "from-cyan-500 to-cyan-600",
    panelGradient: "from-cyan-900/30 to-cyan-800/30",
    panelTint:   "from-cyan-900/10 to-cyan-800/10",
    border:      "border-cyan-400/20",
    borderHover: "group-hover:border-cyan-400/40",
    cardHover:   "group-hover:border-cyan-400/50",
    shadowHover: "group-hover:shadow-cyan-500/20",
    buttonHover: "hover:bg-cyan-900/30",
    demoShadow:  "hover:shadow-cyan-500/30",
    hex:         "#06b6d4",
    topBar:      "linear-gradient(to right,#06b6d4,#0891b2)",
    glowRgba:    "rgba(6,182,212,0.25)",
  },
  emerald: {
    iconText:    "text-emerald-400",
    yearText:    "text-emerald-300",
    gradient:    "from-emerald-500 to-emerald-600",
    panelGradient: "from-emerald-900/30 to-emerald-800/30",
    panelTint:   "from-emerald-900/10 to-emerald-800/10",
    border:      "border-emerald-400/20",
    borderHover: "group-hover:border-emerald-400/40",
    cardHover:   "group-hover:border-emerald-400/50",
    shadowHover: "group-hover:shadow-emerald-500/20",
    buttonHover: "hover:bg-emerald-900/30",
    demoShadow:  "hover:shadow-emerald-500/30",
    hex:         "#10b981",
    topBar:      "linear-gradient(to right,#10b981,#059669)",
    glowRgba:    "rgba(16,185,129,0.25)",
  },
  blue: {
    iconText:    "text-blue-400",
    yearText:    "text-blue-300",
    gradient:    "from-blue-500 to-blue-600",
    panelGradient: "from-blue-900/30 to-blue-800/30",
    panelTint:   "from-blue-900/10 to-blue-800/10",
    border:      "border-blue-400/20",
    borderHover: "group-hover:border-blue-400/40",
    cardHover:   "group-hover:border-blue-400/50",
    shadowHover: "group-hover:shadow-blue-500/20",
    buttonHover: "hover:bg-blue-900/30",
    demoShadow:  "hover:shadow-blue-500/30",
    hex:         "#3b82f6",
    topBar:      "linear-gradient(to right,#3b82f6,#2563eb)",
    glowRgba:    "rgba(59,130,246,0.25)",
  },
  orange: {
    iconText:    "text-orange-400",
    yearText:    "text-orange-300",
    gradient:    "from-orange-500 to-orange-600",
    panelGradient: "from-orange-900/30 to-orange-800/30",
    panelTint:   "from-orange-900/10 to-orange-800/10",
    border:      "border-orange-400/20",
    borderHover: "group-hover:border-orange-400/40",
    cardHover:   "group-hover:border-orange-400/50",
    shadowHover: "group-hover:shadow-orange-500/20",
    buttonHover: "hover:bg-orange-900/30",
    demoShadow:  "hover:shadow-orange-500/30",
    hex:         "#f97316",
    topBar:      "linear-gradient(to right,#f97316,#ea580c)",
    glowRgba:    "rgba(249,115,22,0.25)",
  },
};

const OVERLAY_PARTICLES = Array.from({ length: 30 }, (_, index) => ({
  id:       `particle-${index}`,
  size:     Math.random() * 6 + 2,
  left:     `${Math.random() * 100}%`,
  top:      `${Math.random() * 100}%`,
  moveX:    Math.random() * 100 - 50,
  moveY:    Math.random() * 100 - 50,
  duration: Math.random() * 20 + 10,
}));

const RAW_PROJECTS = [
  {
    title: "Restocare Ecosystem",
    description: "Complete service ecosystem including Customer App, Partner App, and Web Platform with booking flows, authentication, and role-based access control.",
    technologies: ["React Native", "React.js", "Redux", "REST APIs", "Role-Based Access", "Performance Optimization"],
    period: "Jul 2025 - April 2026",
    icon: Smartphone,
    accent: "cyan",
    status: "live",
    visual: "mobile",
  },
   {
    title: "Zoko World",
    description: "Responsive, high-performance web application built with reusable components, dynamic data rendering, and optimized frontend architecture.",
    technologies: ["React.js", "Next.js", "REST APIs", "Reusable Components", "Frontend Optimization"],
    period: "June 2024 - May 2025",
    icon: Globe,
    accent: "emerald",
  },
  {
    title: "Passage Consultants (Freelance)",
    description: "Professional company website for immigration and visa consultancy services with reusable UI components, animations, and optimized loading speed.",
    technologies: ["React.js", "Animations", "Reusable UI", "SEO Optimization", "Performance Tuning"],
    period: "Jun 2025 - Sep 2025",
    icon: Building2,
    accent: "blue",
  },
  {
    title: "Dobby Virtual Mall (Freelance)",
    description: "E-commerce web and mobile platform with responsive UI, API integration, and scalable frontend architecture.",
    technologies: ["React.js", "React Native", "REST APIs", "Figma", "Responsive UI"],
    period: "Jan 2025 - Jun 2025",
    icon: Store,
    accent: "purple",
    status: "complete",
    visual: "browser",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured online marketplace with payment integration and admin dashboard.",
    technologies: ["React", "Redux", "Node.js", "Express.js", "MongoDB"],
    period: "Jan 2025 - Jun 2025",
    icon: TiShoppingCart,
    accent: "purple",
  },
  {
    title: "Elite India Marketing",
    description: "Admin manages all controls, including task assignment, real-time tracking, and implementation of annual sales and purchase graphs.",
    technologies: ["JavaScript", "React", "Redux", "Node.js", "Express.js", "MongoDB"],
    period: "Jan 2024 - Dec 2024",
    icon: GiLift,
    accent: "cyan",
  },
  {
    title: "Chat Application",
    description: "Real-time chat platform with user authentication, Socket.IO integration, and a responsive UI.",
    technologies: ["Tailwind", "React", "Zustand", "Node.js", "Express.js", "Socket.IO", "MongoDB"],
    period: "Oct 2024 - Dec 2024",
    icon: MessageCircle,
    accent: "emerald",
    git: "https://github.com/prakash116/Chat-App.git",
    url: "https://chat-app-atkl.onrender.com/",
  },
  {
    title: "Library Management System",
    description: "A web-based system for managing book inventories, user records, and issue/return tracking.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    period: "Jul 2024 - Sep 2024",
    icon: BookOpen,
    accent: "blue",
    git: "https://github.com/prakash116/LMS.git",
  },
  {
    title: "Media Storage Solution",
    description: "Secure cloud-based file storage with encryption and sharing capabilities.",
    technologies: ["Cloudinary", "React", "Context API", "Node.js", "Express"],
    period: "Apr 2024 - Jun 2024",
    icon: Cloud,
    accent: "blue",
    git: "https://github.com/prakash116/MediaCaptureAndStorage.git",
  },
  {
    title: "Vehicle Renting",
    description: "Online vehicle rental platform with booking management and user-friendly interface.",
    technologies: ["Bootstrap", "JavaScript", "React", "Context API", "API Integration"],
    period: "Jan 2024 - Mar 2024",
    icon: Car,
    accent: "orange",
  },
];

const MONTH_INDEX = {
  Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11,
  January:0, February:1, March:2, April:3, June:5, July:6, August:7, September:8, October:9, November:10, December:11,
};

const parsePeriodPart = (value, isEnd = false) => {
  const trimmedValue = value.trim();
  if (trimmedValue === "Present") return new Date(9999, 11, 31).getTime();
  if (/^\d{4}$/.test(trimmedValue)) {
    const year = Number(trimmedValue);
    return new Date(year, isEnd ? 11 : 0, isEnd ? 31 : 1).getTime();
  }
  const [monthLabel, yearLabel] = trimmedValue.split(" ");
  const monthIndex = MONTH_INDEX[monthLabel];
  const year = Number(yearLabel);
  if (monthIndex === undefined || Number.isNaN(year)) return 0;
  return new Date(year, monthIndex, isEnd ? 28 : 1).getTime();
};

const getProjectTimelineRange = (period) => {
  const [startPart, endPart] = period.includes(" - ") ? period.split(" - ") : [period, period];
  return { start: parsePeriodPart(startPart), end: parsePeriodPart(endPart, true) };
};

const PROJECTS = [...RAW_PROJECTS].sort((a, b) => {
  const ra = getProjectTimelineRange(a.period);
  const rb = getProjectTimelineRange(b.period);
  if (rb.end !== ra.end) return rb.end - ra.end;
  return rb.start - ra.start;
});

// ── Three.js helpers ─────────────────────────────────────────────────────────

const createStarfield = (scene) => {
  const geo = new THREE.BufferGeometry();
  const mat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
  const count = 2000;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i]   = (Math.random() - 0.5) * 2000;
    pos[i+1] = (Math.random() - 0.5) * 2000;
    pos[i+2] = (Math.random() - 0.5) * 2000;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(geo, mat));
};

const createNebula = (scene) => {
  const geo  = new THREE.SphereGeometry(50, 16, 16);
  const mat  = new THREE.MeshBasicMaterial({ color: 0x4a00e0, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(20, 0, -100);
  scene.add(mesh);
  const mesh2 = mesh.clone();
  mesh2.material = mat.clone();
  mesh2.material.color.setHex(0x00b4d8);
  mesh2.position.set(-30, 40, -150);
  mesh2.scale.setScalar(0.7);
  scene.add(mesh2);
};

const createTimeline = (scene) => {
  const count = 300;
  const pos   = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    pos[i]   = 0;
    pos[i+1] = (i / 3) * 0.3 - 45;
    pos[i+2] = 0;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.5 })));
  const geo2 = new THREE.BufferGeometry();
  geo2.setAttribute("position", new THREE.BufferAttribute(pos.slice(), 3));
  scene.add(new THREE.Line(geo2, new THREE.LineBasicMaterial({ color: 0x4fd1c5, transparent: true, opacity: 0.1 })));
};

const createTechOrbs = (scene) => {
  const orbs = [];
  PROJECTS.forEach((project, index) => {
    const color = ACCENT_HEX[project.accent] ?? 0xffffff;
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 16, 16),
      new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.9, emissive: color, emissiveIntensity: 0.3, specular: 0xffffff, shininess: 50 })
    );
    orb.position.y = index * 12 - 30;
    orb.position.x = (index % 2 === 0 ? 1 : -1) * 5;
    orb.userData   = { hover: false };
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
    );
    orb.add(core);
    scene.add(orb);
    orbs.push(orb);
    const lp = new Float32Array([0, orb.position.y, 0, orb.position.x, orb.position.y, 0]);
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    scene.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 })));
  });
  return orbs;
};

// ── Visual mockup components ──────────────────────────────────────────────────

const MobileMockup = ({ accent }) => (
  <div className="relative flex items-center justify-center h-64 select-none">
    {/* Depth phone */}
    <MotionDiv
      animate={{ y: [0, -6, 0], rotate: [-3, -5, -3] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-12 top-4 w-28 h-52 rounded-[18px] border-2 overflow-hidden"
      style={{ borderColor: `${accent.hex}30`, background: "rgba(13,13,26,0.9)", boxShadow: `0 8px 32px ${accent.glowRgba}` }}
    >
      <div className="h-[3px] w-full" style={{ background: accent.topBar }} />
      <div className="p-2 space-y-1.5 mt-2">
        {[0,1,2,3].map((i) => (
          <div key={i} className="h-2 rounded-full opacity-30" style={{ background: accent.hex, width: i === 2 ? "60%" : "85%" }} />
        ))}
        <div className="mt-3 h-16 rounded-xl opacity-20" style={{ background: `linear-gradient(135deg, ${accent.hex}, transparent)` }} />
      </div>
    </MotionDiv>

    {/* Foreground phone */}
    <MotionDiv
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      className="relative w-32 h-56 rounded-[20px] border-2 overflow-hidden z-10"
      style={{ borderColor: `${accent.hex}60`, background: "rgba(10,10,20,0.95)", boxShadow: `0 12px 40px ${accent.glowRgba}, 0 0 0 1px ${accent.hex}20` }}
    >
      <div className="h-6 flex items-center justify-between px-3" style={{ background: `${accent.hex}15` }}>
        <div className="flex gap-0.5">
          {[0,1,2].map((i) => <div key={i} className="w-0.5 h-2 rounded-full" style={{ background: accent.hex, opacity: 0.6 + i * 0.15 }} />)}
        </div>
        <div className="w-8 h-1.5 rounded-full" style={{ background: `${accent.hex}50` }} />
      </div>
      <div className="h-[2px]" style={{ background: accent.topBar }} />
      <div className="p-2 space-y-2 mt-1">
        <div className="h-2.5 rounded-full w-3/4" style={{ background: `${accent.hex}50` }} />
        <div className="h-2 rounded-full w-full opacity-30" style={{ background: accent.hex }} />
        <div className="h-2 rounded-full w-5/6 opacity-25" style={{ background: accent.hex }} />
        <div className="mt-2 h-12 rounded-xl" style={{ background: `linear-gradient(135deg, ${accent.hex}30, ${accent.hex}10)`, border: `1px solid ${accent.hex}20` }} />
        <div className="grid grid-cols-2 gap-1 mt-1">
          {[0,1].map((i) => (
            <div key={i} className="h-8 rounded-lg" style={{ background: `${accent.hex}15`, border: `1px solid ${accent.hex}20` }} />
          ))}
        </div>
      </div>
    </MotionDiv>
  </div>
);

const BrowserMockup = ({ accent }) => (
  <MotionDiv
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className="relative w-full h-64 rounded-xl overflow-hidden border select-none"
    style={{ borderColor: `${accent.hex}30`, background: "rgba(10,10,20,0.95)", boxShadow: `0 12px 40px ${accent.glowRgba}` }}
  >
    {/* Browser chrome */}
    <div className="h-8 flex items-center gap-2 px-3" style={{ background: `${accent.hex}12`, borderBottom: `1px solid ${accent.hex}20` }}>
      <div className="flex gap-1.5">
        {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="flex-1 h-5 rounded-full mx-2 flex items-center px-2" style={{ background: `${accent.hex}10`, border: `1px solid ${accent.hex}20` }}>
        <div className="h-1.5 rounded-full w-3/4 opacity-40" style={{ background: accent.hex }} />
      </div>
    </div>
    <div className="h-[2px]" style={{ background: accent.topBar }} />
    {/* Page content */}
    <div className="p-3 space-y-2">
      <div className="flex items-center justify-between h-5">
        <div className="h-2 w-16 rounded-full" style={{ background: `${accent.hex}60` }} />
        <div className="flex gap-3">
          {[0,1,2].map((i) => <div key={i} className="h-1.5 w-8 rounded-full opacity-30" style={{ background: accent.hex }} />)}
        </div>
      </div>
      <div className="h-16 rounded-lg mt-1" style={{ background: `linear-gradient(135deg, ${accent.hex}20, ${accent.hex}08)`, border: `1px solid ${accent.hex}15` }}>
        <div className="p-2 space-y-1.5">
          <div className="h-2 rounded-full w-1/2" style={{ background: `${accent.hex}50` }} />
          <div className="h-1.5 rounded-full w-3/4 opacity-30" style={{ background: accent.hex }} />
          <div className="h-4 rounded w-16 mt-1" style={{ background: `${accent.hex}40` }} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 mt-2">
        {[0,1,2].map((i) => (
          <div key={i} className="h-14 rounded-lg" style={{ background: `${accent.hex}12`, border: `1px solid ${accent.hex}18` }}>
            <div className="h-[2px] rounded-t-lg" style={{ background: accent.topBar }} />
          </div>
        ))}
      </div>
    </div>
  </MotionDiv>
);

// ── Project card ──────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index, onCode, onDemo }) => {
  const accent      = ACCENT_STYLES[project.accent] ?? ACCENT_STYLES.purple;
  const ProjectIcon = project.icon;
  const isEven      = index % 2 === 0;

  const renderVisual = () => {
    if (project.visual === "mobile")  return <MobileMockup accent={accent} />;
    if (project.visual === "browser") return <BrowserMockup accent={accent} />;

    if (isEven) {
      return (
        <div
          className="relative w-full h-64 rounded-xl overflow-hidden border"
          style={{ borderColor: `${accent.hex}25`, background: "rgba(13,13,26,0.85)", boxShadow: `0 0 30px ${accent.glowRgba}` }}
        >
          <div className="h-[3px]" style={{ background: accent.topBar }} />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
            <div
              className="text-5xl font-extrabold mb-3 bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right,${accent.hex},#fff)` }}
            >
              {project.technologies.length}+
            </div>
            <div className="text-sm text-white/50 mb-4 uppercase tracking-widest">Technologies Used</div>
            <div className="flex flex-wrap justify-center gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ color: accent.hex, background: `${accent.hex}15`, border: `1px solid ${accent.hex}30` }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className="relative w-full h-64 rounded-xl overflow-hidden border"
        style={{ borderColor: `${accent.hex}25`, background: "rgba(13,13,26,0.85)" }}
      >
        <div className="h-[3px]" style={{ background: accent.topBar }} />
        <div className="absolute inset-0 p-5 font-mono text-sm overflow-hidden">
          <div className="mb-2">
            <span className="text-purple-400">function </span>
            <span style={{ color: accent.hex }}>{project.title.replace(/\s/g, "")}</span>
            <span className="text-white/30">{"() {"}</span>
          </div>
          <div className="ml-4 mb-1">
            <span className="text-blue-400">const </span>
            <span className="text-emerald-400">techStack </span>
            <span className="text-white/30">{"= ["}</span>
          </div>
          {project.technologies.map((tech, i) => (
            <div key={tech} className="ml-8 text-yellow-300">
              "{tech}"{i < project.technologies.length - 1 ? "," : ""}
            </div>
          ))}
          <div className="ml-4 text-white/30">];</div>
          <div className="mt-2 text-white/30">{"}"}</div>
        </div>
        <MotionDiv
          animate={{ x: [0, 100, 0], y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-5 right-5 w-2 h-5 rounded-sm"
          style={{ background: accent.hex }}
        />
      </div>
    );
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className={`relative flex ${isEven ? "justify-between" : "justify-between flex-row-reverse"}`}
    >
      {/* Period badge — centered on the vertical timeline */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-5 z-20 items-center gap-2 whitespace-nowrap pointer-events-none">
        <MotionSpan
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 rounded-full block flex-shrink-0"
          style={{ background: accent.hex, boxShadow: `0 0 8px ${accent.hex}` }}
        />
        <MotionSpan
          animate={{ boxShadow: [`0 0 8px ${accent.glowRgba}`, `0 0 24px ${accent.hex}99`, `0 0 8px ${accent.glowRgba}`] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className={`text-sm font-bold ${accent.yearText} rounded-full px-5 py-1.5 border`}
          style={{
            background: `linear-gradient(135deg, ${accent.glowRgba}, rgba(255,255,255,0.05))`,
            borderColor: `${accent.hex}60`,
            textShadow: `0 0 10px ${accent.hex}`,
            backdropFilter: "blur(8px)",
          }}
        >
          {project.period}
        </MotionSpan>
        <MotionSpan
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="w-1.5 h-1.5 rounded-full block flex-shrink-0"
          style={{ background: accent.hex, boxShadow: `0 0 8px ${accent.hex}` }}
        />
      </div>

      {/* ── Card column ── */}
      <div className={`w-full md:w-2/5 relative group ${isEven ? "pr-0" : "pl-0"}`}>

        {/* Timeline node with pulsing ring */}
        <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-10 ${isEven ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}`}>
          <div className="relative">
            <MotionDiv
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-[-5px] rounded-full"
              style={{ background: `${accent.hex}30` }}
            />
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${accent.gradient} border-2 border-white/20 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300`}>
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Hover glow halo */}
        <div
          className="absolute -inset-1 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${accent.glowRgba}, transparent 70%)` }}
        />

        {/* Card */}
        <div
          className={`relative bg-[#0d0d1a]/85 backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${accent.cardHover}`}
          style={{ borderColor: `${accent.hex}25`, boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
        >
          {/* Colored top bar */}
          <div className="h-[3px] w-full" style={{ background: accent.topBar }} />

          <div className="p-6">
            {/* Icon + Title + Status badge */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${accent.hex}15`, border: `1px solid ${accent.hex}30`, boxShadow: `0 0 12px ${accent.glowRgba}` }}
              >
                <ProjectIcon className={`w-6 h-6 ${accent.iconText}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                  {project.status === "live" && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      LIVE
                    </span>
                  )}
                  {project.status === "complete" && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                      COMPLETE
                    </span>
                  )}
                </div>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-4 leading-relaxed">{project.description}</p>

            {/* Tech pills */}
            <div className="mb-5">
              <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <MotionSpan
                    key={`${project.title}-${tech}`}
                    whileHover={{ y: -2 }}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{ color: accent.hex, background: `${accent.hex}15`, border: `1px solid ${accent.hex}30` }}
                  >
                    {tech}
                  </MotionSpan>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t" style={{ borderColor: `${accent.hex}15` }}>
              <MotionButton
                type="button"
                onClick={onCode}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white/70 hover:text-white transition-all border"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: `${accent.hex}25` }}
              >
                <Github className="w-4 h-4" />
                Code
              </MotionButton>
              <MotionButton
                type="button"
                onClick={onDemo}
                whileHover={{ y: -2, scale: 1.02 }}
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${accent.gradient} text-white rounded-lg text-sm font-semibold shadow-md`}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </MotionButton>
            </div>
          </div>
        </div>
      </div>

      {/* ── Visual panel ── */}
      <div className={`hidden md:flex w-2/5 ${isEven ? "pl-8" : "pr-8"} items-center justify-center`}>
        {renderVisual()}
      </div>
    </MotionDiv>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const ProjectsPage = () => {
  const mountRef              = useRef(null);
  const projectsContainerRef  = useRef(null);
  const scrollYRef            = useRef(0);
  const containerMetricsRef   = useRef({ top: 0, height: 1 });

  useEffect(() => {
    if (!mountRef.current) return undefined;
    const mountNode = mountRef.current;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    createStarfield(scene);
    createNebula(scene);
    createTimeline(scene);
    const techOrbs = createTechOrbs(scene);

    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    camera.position.z = 40;

    const updateMeasurements = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (projectsContainerRef.current) {
        containerMetricsRef.current = {
          top:    projectsContainerRef.current.offsetTop,
          height: Math.max(projectsContainerRef.current.offsetHeight, 1),
        };
      }
    };

    const handleScroll = () => { scrollYRef.current = window.scrollY; };

    let raf       = 0;
    let isRunning = false;

    const animate = () => {
      raf = window.requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      techOrbs.forEach((orb, i) => {
        orb.rotation.x += 0.005;
        orb.rotation.y += 0.005;
        const pulse = Math.sin(time * 2 + i) * 0.1 + 1;
        orb.scale.set(pulse, pulse, pulse);
        orb.position.x = (i % 2 === 0 ? 5 : -5) + Math.sin(time + i) * 1.5;
        orb.position.z = Math.cos(time * 0.5 + i) * 2;
        orb.material.emissiveIntensity = THREE.MathUtils.lerp(orb.material.emissiveIntensity, 0.3, 0.1);
      });
      const { top, height } = containerMetricsRef.current;
      const scrollProgress  = Math.min(1, Math.max(0, (scrollYRef.current - top + window.innerHeight * 0.3) / height));
      camera.position.y     = -scrollProgress * (PROJECTS.length * 12 - window.innerHeight * 0.1);
      renderer.render(scene, camera);
    };

    const start = () => { if (!isRunning) { isRunning = true;  animate(); } };
    const stop  = () => { if (isRunning)  { isRunning = false; window.cancelAnimationFrame(raf); raf = 0; } };
    const onVisibility = () => document.hidden ? stop() : start();

    updateMeasurements();
    handleScroll();
    start();

    window.addEventListener("resize",            updateMeasurements);
    window.addEventListener("scroll",            handleScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize",            updateMeasurements);
      window.removeEventListener("scroll",            handleScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      if (mountNode.contains(renderer.domElement)) mountNode.removeChild(renderer.domElement);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) Array.isArray(o.material) ? o.material.forEach(m => m.dispose()) : o.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  const openProjectLink = (url) => {
    if (!url) { toast.success("Coming Soon"); return; }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{ background: "linear-gradient(135deg,#0d0d1a 0%,#0f0c29 50%,#0d0d1a 100%)" }}
    >
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[#0d0d1a]/40" />

      {/* Overlay particles */}
      <div className="fixed inset-0 pointer-events-none z-[2]">
        {OVERLAY_PARTICLES.map((p) => (
          <MotionDiv
            key={p.id}
            className="absolute rounded-full bg-cyan-500/20"
            style={{ width: `${p.size}px`, height: `${p.size}px`, left: p.left, top: p.top }}
            animate={{ y: [0, p.moveY], x: [0, p.moveX], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, repeatType: "reverse" }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute -top-40 right-0   w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20" />

          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl" />
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Interactive Portfolio
            </div>
          </MotionDiv>

          <MotionH1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white sm:text-6xl mb-6 relative"
          >
            <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-cyan-400/20 text-8xl select-none">{"</>"}</span>
            Project{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Timeline</span>
            <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-blue-400/20 text-8xl select-none">{"{}"}</span>
          </MotionH1>

          <MotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Explore my work through this cosmic 3D timeline experience
          </MotionP>
        </div>

        {/* ── Timeline ── */}
        <div ref={projectsContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative">
          <div className="relative space-y-32">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${project.period}`}
                project={project}
                index={index}
                onCode={() => openProjectLink(project.git)}
                onDemo={() => openProjectLink(project.url)}
              />
            ))}
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center pb-32 relative px-4"
        >
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-20" />
          <h3 className="text-2xl font-bold text-white mb-6">Ready to start your cosmic journey?</h3>
          <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Get In Touch
            </Link>
          </MotionDiv>
          <div className="mt-8 text-gray-400 text-sm flex items-center justify-center gap-2">
            <span>✦</span> Crafted with cosmic energy <span>✦</span>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default ProjectsPage;
