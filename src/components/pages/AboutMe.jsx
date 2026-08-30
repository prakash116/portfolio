"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  GraduationCap, Briefcase, Code2, Rocket, Database, Server,
  Layers, CpuIcon, Palette, Sparkles, Zap, Smartphone, Shield, RefreshCw,
  UtensilsCrossed, MapPinned, Building2, ArrowUpRight, FolderKanban,
} from "lucide-react";
import { IoLogoJavascript } from "react-icons/io";
import { SiTypescript, SiNextdotjs, SiRedux, SiGit, SiReact, SiSocketdotio } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import ProfileCard from "../MyInfo";

// ── Static data outside component — no re-creation on render ─────────────────

const EDUCATION = [
  {
    degree: "Bachelor of Technology – Computer Science",
    institution: "SR Institute of Management & Technology",
    location: "Lucknow, Uttar Pradesh",
    year: "2020 – 2024",
    type: "B.Tech Degree",
    status: "Graduated",
    description: "Specialized in Web Technologies, Cloud Computing, and Database Management Systems with a focus on practical software engineering.",
    tags: ["Data Structures", "Web Technologies", "Cloud Computing", "DBMS", "OOP"],
    icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    topBar: "linear-gradient(to right, #22d3ee, #3b82f6)",
    statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  },
  {
    degree: "Master's in Full-Stack Web Development",
    institution: "DUCAT – Pitampura",
    location: "Pitampura, New Delhi",
    year: "2024 – 2025",
    type: "Professional Training",
    status: "Certified",
    description: "Intensive full-stack training covering the MERN stack, system design, REST APIs, and building production-ready applications.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    icon: <Layers className="w-5 h-5 text-violet-400" />,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    topBar: "linear-gradient(to right, #a855f7, #6366f1)",
    statusColor: "text-violet-400 bg-violet-500/10 border-violet-500/30",
  },
];

// Newest first. `current` marks an ongoing role; `links` point at the matching
// case study on /project and the live product where one exists.
const EXPERIENCE = [
  {
    role: "Full-Stack Developer",
    company: "RestoCare · Restro Edge Pvt. Ltd.",
    location: "Kohat Enclave, Delhi",
    duration: "July 2025 – Present",
    type: "Full-time",
    current: true,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    dotColor: "bg-orange-400",
    icon: <UtensilsCrossed className="w-4 h-4 text-orange-400" />,
    responsibilities: [
      "Own the full RestoCare product surface — Customer app and Partner app on Android & iOS, the web platform, and the admin systems behind them.",
      "Shipped both apps to Google Play and the App Store and keep them in active production.",
      "Built the backend and API layer on NestJS with PostgreSQL and Supabase, including secure auth and role-based access.",
      "Optimized app performance and load times through efficient component design, caching, and lazy loading.",
    ],
    stack: ["React Native", "Next.js", "NestJS", "PostgreSQL", "Supabase"],
    links: [
      { label: "Case study", href: "/project#restocare", internal: true },
      { label: "restocare.in", href: "https://restocare.in/" },
    ],
  },
  {
    role: "Tech Head",
    company: "Aurevia Tech",
    location: "Remote",
    duration: "July 2026 – Aug 2026",
    type: "Leadership",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    dotColor: "bg-violet-400",
    icon: <Building2 className="w-4 h-4 text-violet-400" />,
    responsibilities: [
      "Led the technical build of the corporate website end to end — architecture, responsive UI, and delivery.",
      "Set up a Google Sheets–driven content layer so the team updates copy without a deploy.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Google Sheets"],
    links: [
      { label: "Case study", href: "/project#aurevia-tech", internal: true },
      { label: "aureviatech.com", href: "https://aureviatech.com/" },
    ],
  },
  {
    role: "Tech Head",
    company: "Edunovas",
    location: "Remote",
    duration: "July 2026 – Aug 2026",
    type: "Leadership",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    dotColor: "bg-emerald-400",
    icon: <GraduationCap className="w-4 h-4 text-emerald-400" />,
    responsibilities: [
      "Led the technical development of an education-focused web platform with a responsive, scalable frontend.",
      "Designed a Google Sheets–backed backend and content management flow for educators.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Google Sheets"],
    links: [
      { label: "Case study", href: "/project#edunovas", internal: true },
      { label: "edunovas.in", href: "https://www.edunovas.in/" },
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Pzee Finder",
    location: "Remote",
    duration: "Jan 2026 – Aug 2026",
    type: "Contract",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    dotColor: "bg-cyan-400",
    icon: <MapPinned className="w-4 h-4 text-cyan-400" />,
    responsibilities: [
      "Built the property and space discovery platform across mobile (React Native) and web (Next.js).",
      "Developed the NestJS backend APIs with Prisma over PostgreSQL, Redis caching, and Supabase authentication.",
      "Designed the database and auth infrastructure to scale with listing and search volume.",
    ],
    stack: ["React Native", "Next.js", "NestJS", "PostgreSQL", "Supabase", "Redis", "Prisma"],
    links: [
      { label: "Case study", href: "/project#pzee-finder", internal: true },
      { label: "pzee.in", href: "https://pzee.in/" },
    ],
  },
  {
    role: "Web Developer & UI/UX Designer",
    company: "Dobby Virtual Mall Pvt. Ltd.",
    location: "Delhi",
    duration: "Jan 2025 – June 2025",
    type: "Freelance",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    dotColor: "bg-pink-400",
    icon: <Palette className="w-4 h-4 text-pink-400" />,
    responsibilities: [
      "Developed responsive web applications using React.js with reusable component architecture.",
      "Built and integrated features aligned with e-commerce and virtual mall workflows.",
      "Optimized UI performance and improved user experience across devices.",
    ],
    stack: ["React.js", "React Native", "REST APIs", "Figma"],
    links: [
      { label: "Case study", href: "/project#dobby-virtual-mall", internal: true },
    ],
  },
  {
    role: "Web Developer",
    company: "Zoko World",
    location: "Preet Vihar, Delhi",
    duration: "June 2024 – May 2025",
    type: "Full-time",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    dotColor: "bg-cyan-400",
    icon: <Code2 className="w-4 h-4 text-cyan-400" />,
    responsibilities: [
      "Developed scalable web applications using React.js and Next.js.",
      "Improved UI performance and optimized overall user experience.",
      "Followed clean architecture principles and reusable component design.",
    ],
    stack: ["React.js", "Next.js", "REST APIs"],
    links: [
      { label: "Case study", href: "/project#zoko-world", internal: true },
      { label: "zokoworld.com", href: "https://www.zokoworld.com/" },
    ],
  },
  {
    role: "Web Developer",
    company: "Passage Consultants",
    location: "Janakpuri, New Delhi",
    duration: "April 2023 – May 2024",
    type: "Full-time",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    dotColor: "bg-violet-400",
    icon: <Layers className="w-4 h-4 text-violet-400" />,
    responsibilities: [
      "Independently developed a responsive and user-friendly website using React.js.",
      "Designed clean, modern UI to enhance client engagement and user experience.",
      "Optimized performance and ensured smooth functionality across all devices.",
    ],
    stack: ["React.js", "SEO", "Animations"],
    links: [
      { label: "Case study", href: "/project#passage-consultants", internal: true },
      { label: "passageconsultants.in", href: "https://www.passageconsultants.in/" },
    ],
  },
  {
    role: "IT Executive",
    company: "Elite India Elevator",
    location: "Azadpur, Delhi",
    duration: "May 2022 – April 2023",
    type: "Full-time",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    dotColor: "bg-orange-400",
    icon: <CpuIcon className="w-4 h-4 text-orange-400" />,
    responsibilities: [
      "Managed IT operations, handled company website and Odoo software.",
      "Prepared quotations, invoices, and AMC reports using Excel and Word.",
      "Maintained data records and supported day-to-day IT operations.",
    ],
    stack: ["Odoo", "Excel", "Website maintenance"],
    links: [
      { label: "hiliftelevator.com", href: "https://www.hiliftelevator.com/" },
    ],
  },
];

const SKILLS = [
  { name: "JavaScript",    level: 95, icon: <IoLogoJavascript     className="w-5 h-5 text-yellow-400"  />, gradient: "linear-gradient(90deg,#eab308,#f59e0b)" },
  { name: "TypeScript",    level: 80, icon: <SiTypescript         className="w-5 h-5 text-blue-400"    />, gradient: "linear-gradient(90deg,#3b82f6,#2563eb)" },
  { name: "React",         level: 95, icon: <SiReact              className="w-5 h-5 text-cyan-400"    />, gradient: "linear-gradient(90deg,#22d3ee,#06b6d4)" },
  { name: "Next.js",       level: 82, icon: <SiNextdotjs          className="w-5 h-5 text-white"       />, gradient: "linear-gradient(90deg,#e2e8f0,#94a3b8)" },
  { name: "React Native",  level: 80, icon: <TbBrandReactNative   className="w-5 h-5 text-sky-400"     />, gradient: "linear-gradient(90deg,#38bdf8,#0ea5e9)" },
  { name: "Redux Toolkit", level: 85, icon: <SiRedux              className="w-5 h-5 text-purple-400"  />, gradient: "linear-gradient(90deg,#a855f7,#7c3aed)" },
  { name: "Node.js",       level: 90, icon: <Server               className="w-5 h-5 text-green-400"  />, gradient: "linear-gradient(90deg,#4ade80,#22c55e)" },
  { name: "Express.js",    level: 90, icon: <CpuIcon              className="w-5 h-5 text-violet-400" />, gradient: "linear-gradient(90deg,#a78bfa,#7c3aed)" },
  { name: "MongoDB",       level: 85, icon: <Database             className="w-5 h-5 text-emerald-400"/>, gradient: "linear-gradient(90deg,#34d399,#10b981)" },
  { name: "Git",           level: 88, icon: <SiGit                className="w-5 h-5 text-orange-400" />, gradient: "linear-gradient(90deg,#fb923c,#f97316)" },
  { name: "WebSocket",     level: 78, icon: <Zap                  className="w-5 h-5 text-yellow-300"  />, gradient: "linear-gradient(90deg,#fde047,#facc15)" },
  { name: "Socket.io",    level: 78, icon: <SiSocketdotio        className="w-5 h-5 text-white"       />, gradient: "linear-gradient(90deg,#e2e8f0,#94a3b8)" },
  { name: "AI Agents",     level: 75, icon: <Sparkles             className="w-5 h-5 text-pink-400"   />, gradient: "linear-gradient(90deg,#f472b6,#ec4899)" },
];

const PHILOSOPHY_CARDS = [
  {
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    bg: "bg-cyan-500/10", border: "border-cyan-500/20", color: "text-cyan-400",
    title: "Clean Code",
    desc: "Every function has a purpose. I write readable, maintainable code that future-me won't hate.",
  },
  {
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    bg: "bg-yellow-500/10", border: "border-yellow-500/20", color: "text-yellow-400",
    title: "Performance First",
    desc: "Lazy loading, efficient queries, optimized bundles — speed is a feature, not an afterthought.",
  },
  {
    icon: <Smartphone className="w-5 h-5 text-sky-400" />,
    bg: "bg-sky-500/10", border: "border-sky-500/20", color: "text-sky-400",
    title: "Cross-Platform",
    desc: "One unified logic for web and mobile using React and React Native — less duplication, more reach.",
  },
  {
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    bg: "bg-emerald-500/10", border: "border-emerald-500/20", color: "text-emerald-400",
    title: "Secure by Default",
    desc: "JWT, role-based access, input validation — security is baked in from day one, not patched later.",
  },
  {
    icon: <Server className="w-5 h-5 text-violet-400" />,
    bg: "bg-violet-500/10", border: "border-violet-500/20", color: "text-violet-400",
    title: "API-First Design",
    desc: "Scalable REST APIs with clear contracts make frontends independent and integrations seamless.",
  },
  {
    icon: <RefreshCw className="w-5 h-5 text-pink-400" />,
    bg: "bg-pink-500/10", border: "border-pink-500/20", color: "text-pink-400",
    title: "Always Evolving",
    desc: "From MERN to AI Agents — I embrace new tools and stay ahead of the curve continuously.",
  },
];

// ── Section header component ─────────────────────────────────────────────────
const SectionHeader = ({ icon, title, gradient }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="w-11 h-11 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white">{title}</h2>
      <div className="h-0.5 mt-1.5 w-14 rounded-full" style={{ background: gradient }} />
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const AboutPage = () => {
  const mountRef = useRef(null);

  // Three.js particle network background
  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    try {
      const c = document.createElement("canvas");
      if (!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")))) {
        return;
      }
    } catch { return; }

    const W = window.innerWidth;
    const H = window.innerHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    // ── Particle network ─────────────────────────────────────────────────────
    const N = 85;
    const DIST = 5.0;
    const MAX_LINES = 900;

    const pArr    = new Float32Array(N * 3);
    const pVel    = [];
    const pColArr = new Float32Array(N * 3);
    const COLS    = [
      new THREE.Color(0x22d3ee), new THREE.Color(0x3b82f6),
      new THREE.Color(0xa855f7), new THREE.Color(0x06b6d4), new THREE.Color(0x818cf8),
    ];

    for (let i = 0; i < N; i++) {
      pArr[i*3]   = (Math.random() - 0.5) * 40;
      pArr[i*3+1] = (Math.random() - 0.5) * 24;
      pArr[i*3+2] = (Math.random() - 0.5) * 6;
      pVel.push({ x: (Math.random() - 0.5) * 0.012, y: (Math.random() - 0.5) * 0.012 });
      const col = COLS[Math.floor(Math.random() * COLS.length)];
      pColArr[i*3] = col.r; pColArr[i*3+1] = col.g; pColArr[i*3+2] = col.b;
    }

    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(pArr,    3));
    ptGeo.setAttribute("color",    new THREE.BufferAttribute(pColArr, 3));
    const ptMat = new THREE.PointsMaterial({
      size: 0.08, vertexColors: true, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    // Soft glow halo behind each particle (same geometry, shared)
    const glowMat = new THREE.PointsMaterial({
      size: 0.55, color: 0x67e8f9, transparent: true, opacity: 0.06,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.Points(ptGeo, ptMat));
    scene.add(new THREE.Points(ptGeo, glowMat));

    const lPosArr = new Float32Array(MAX_LINES * 6);
    const lColArr = new Float32Array(MAX_LINES * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lPosArr, 3));
    lineGeo.setAttribute("color",    new THREE.BufferAttribute(lColArr, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.45,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    scene.add(new THREE.LineSegments(lineGeo, lineMat));

    // ── Floating wireframe shapes ─────────────────────────────────────────────
    const SHAPE_DEFS = [
      { Geo: THREE.IcosahedronGeometry, args: [0.45, 0], color: 0x22d3ee, pos: [-8,  4, -2], sx: 0.004, sy: 0.006 },
      { Geo: THREE.OctahedronGeometry,  args: [0.50, 0], color: 0x7c3aed, pos: [10, -5, -1], sx: 0.005, sy: 0.004 },
      { Geo: THREE.TetrahedronGeometry, args: [0.55, 0], color: 0x3b82f6, pos: [-12,-4,  0], sx: 0.003, sy: 0.007 },
      { Geo: THREE.IcosahedronGeometry, args: [0.35, 0], color: 0xa855f7, pos: [ 7,  7, -3], sx: 0.006, sy: 0.003 },
      { Geo: THREE.OctahedronGeometry,  args: [0.40, 0], color: 0x06b6d4, pos: [14,  2, -2], sx: 0.004, sy: 0.005 },
      { Geo: THREE.TetrahedronGeometry, args: [0.45, 0], color: 0x818cf8, pos: [-6, -8, -1], sx: 0.007, sy: 0.003 },
    ];
    const shapeGeos  = SHAPE_DEFS.map(d => new d.Geo(...d.args));
    const shapeMats  = SHAPE_DEFS.map(d => new THREE.MeshBasicMaterial({ color: d.color, wireframe: true, transparent: true, opacity: 0.35 }));
    const shapeMeshes = SHAPE_DEFS.map((d, i) => {
      const m = new THREE.Mesh(shapeGeos[i], shapeMats[i]);
      m.position.set(...d.pos);
      scene.add(m);
      return m;
    });

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const vFov  = 75 * (Math.PI / 180);
    const viewH = 2 * Math.tan(vFov / 2) * 18;
    const viewW = viewH * (W / H);
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => {
      mouse.tx = ((e.clientX / W) * 2 - 1) * viewW * 0.5;
      mouse.ty = (-(e.clientY / H) * 2 + 1) * viewH * 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Animate ───────────────────────────────────────────────────────────────
    let animId;
    let t = 0;
    const MOUSE_R = 5;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.01;

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      const pos = ptGeo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        const ix = i * 3, iy = ix + 1;
        const dx = pos[ix] - mouse.x;
        const dy = pos[iy] - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_R && d > 0.01) {
          const f = (MOUSE_R - d) / MOUSE_R * 0.007;
          pVel[i].x += (dx / d) * f;
          pVel[i].y += (dy / d) * f;
        }
        pVel[i].x *= 0.994;
        pVel[i].y *= 0.994;
        pos[ix]   += pVel[i].x;
        pos[iy]   += pVel[i].y;
        if (Math.abs(pos[ix]) > 20) { pVel[i].x *= -1; pos[ix] = Math.sign(pos[ix]) * 20; }
        if (Math.abs(pos[iy]) > 12) { pVel[i].y *= -1; pos[iy] = Math.sign(pos[iy]) * 12; }
      }
      ptGeo.attributes.position.needsUpdate = true;

      // Build connection lines
      let li = 0;
      const lp = lineGeo.attributes.position.array;
      const lc = lineGeo.attributes.color.array;
      for (let i = 0; i < N && li < MAX_LINES; i++) {
        for (let j = i + 1; j < N && li < MAX_LINES; j++) {
          const ax = pos[i*3], ay = pos[i*3+1], az = pos[i*3+2];
          const bx = pos[j*3], by = pos[j*3+1], bz = pos[j*3+2];
          const dist = Math.sqrt((ax-bx)*(ax-bx) + (ay-by)*(ay-by));
          if (dist < DIST) {
            const alpha = (1 - dist / DIST) * 0.92;
            const k = li * 6;
            lp[k]   = ax; lp[k+1] = ay; lp[k+2] = az;
            lp[k+3] = bx; lp[k+4] = by; lp[k+5] = bz;
            // True gradient: endpoint A uses particle i color, endpoint B uses particle j color
            lc[k]   = pColArr[i*3]   * alpha;
            lc[k+1] = pColArr[i*3+1] * alpha;
            lc[k+2] = pColArr[i*3+2] * alpha;
            lc[k+3] = pColArr[j*3]   * alpha;
            lc[k+4] = pColArr[j*3+1] * alpha;
            lc[k+5] = pColArr[j*3+2] * alpha;
            li++;
          }
        }
      }
      lineGeo.setDrawRange(0, li * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;

      // Pulse line network opacity
      lineMat.opacity = 0.38 + Math.sin(t * 0.65) * 0.12;

      // Rotate, float and pulse shapes
      shapeMeshes.forEach((m, i) => {
        m.rotation.x     += SHAPE_DEFS[i].sx;
        m.rotation.y     += SHAPE_DEFS[i].sy;
        m.position.y      = SHAPE_DEFS[i].pos[1] + Math.sin(t + i * 1.1) * 0.6;
        shapeMats[i].opacity = 0.22 + Math.sin(t * 1.4 + i * 0.9) * 0.14;
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      ptGeo.dispose(); ptMat.dispose(); glowMat.dispose();
      lineGeo.dispose(); lineMat.dispose();
      shapeGeos.forEach(g => g.dispose());
      shapeMats.forEach(m => m.dispose());
      if (mountNode.contains(renderer.domElement))
        mountNode.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0d0d1a] via-[#0f0c29] to-[#1a1a2e] relative">

      {/* Three.js stars */}
      <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none opacity-75" />

      {/* Dot grid pattern — subtle tech texture */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Corner accent glows — small, precise */}
      <div className="fixed inset-0 z-2 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 opacity-30"
          style={{ background: "radial-gradient(ellipse at top left, #06b6d4, transparent 65%)", filter: "blur(35px)" }} />
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20"
          style={{ background: "radial-gradient(ellipse at top right, #7c3aed, transparent 65%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 opacity-20"
          style={{ background: "radial-gradient(ellipse at bottom right, #3b82f6, transparent 65%)", filter: "blur(45px)" }} />
        <div className="absolute bottom-0 left-0 w-60 h-60 opacity-15"
          style={{ background: "radial-gradient(ellipse at bottom left, #a855f7, transparent 65%)", filter: "blur(40px)" }} />
      </div>

      {/* Vignette */}
      <div className="fixed inset-0 z-3 bg-linear-to-b from-[#0d0d1a]/15 via-transparent to-[#0d0d1a]/35 pointer-events-none" />

      {/* Page content */}
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-5 max-w-7xl mx-auto">

        {/* ── Hero header ── */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-4">
            Full-Stack Developer
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            About{" "}
            <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          <p className="text-white/45 text-lg max-w-2xl mx-auto leading-relaxed">
            Crafting digital experiences with cutting-edge technologies and innovative solutions.
          </p>
        </motion.div>

        {/* ── Profile card ── */}
        <div className="mb-16">
          <ProfileCard />
        </div>

        {/* ── Education ── */}
        <section className="mb-14">
          <SectionHeader
            icon={<GraduationCap className="w-5 h-5 text-cyan-400" />}
            title="Education"
            gradient="linear-gradient(to right, #22d3ee, #3b82f6)"
          />
          <div className="grid md:grid-cols-2 gap-5">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="relative rounded-2xl border border-white/7 bg-white/2.5 hover:bg-white/5 hover:border-white/12 transition-all group overflow-hidden backdrop-blur-sm"
              >
                {/* Colored top bar */}
                <div className="h-0.75 w-full" style={{ background: edu.topBar }} />

                <div className="p-6 flex gap-5">
                  {/* Left — main content */}
                  <div className="flex-1 min-w-0">
                    {/* Icon + degree */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-2xl ${edu.bg} border ${edu.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                        {edu.icon}
                      </div>
                      <h3 className="text-[15px] font-bold text-white leading-snug">{edu.degree}</h3>
                    </div>

                    {/* Institution + location */}
                    <p className={`text-sm font-semibold ${edu.color} mb-0.5`}>{edu.institution}</p>
                    <p className="text-2xs text-white/30 mb-3">{edu.location}</p>

                    {/* Description */}
                    <p className="text-xs text-white/40 leading-relaxed mb-4">{edu.description}</p>

                    {/* Subject tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {edu.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] px-2.5 py-1 rounded-full bg-white/4 border border-white/7 text-white/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right — year + type */}
                  <div className="flex flex-col items-end justify-between gap-3 shrink-0">
                    <span className={`text-[10px] font-mono ${edu.color} ${edu.bg} border ${edu.border} px-2.5 py-1 rounded-full whitespace-nowrap`}>
                      {edu.year}
                    </span>
                    <div className="flex flex-col items-end gap-1.5">
                      <div className={`w-8 h-8 rounded-xl ${edu.bg} border ${edu.border} flex items-center justify-center opacity-50`}>
                        {edu.icon}
                      </div>
                      <p className="text-[10px] text-white/25 text-right leading-tight max-w-20">{edu.type}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="mb-14">
          <SectionHeader
            icon={<Rocket className="w-5 h-5 text-purple-400" />}
            title="Technical Skills"
            gradient="linear-gradient(to right, #a855f7, #3b82f6)"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="p-5 rounded-2xl border border-white/6 bg-white/2.5 hover:bg-white/5 hover:border-purple-500/20 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <span className="text-sm font-semibold text-white">{skill.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white/60">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/6 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: i * 0.07, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{ background: skill.gradient, boxShadow: `0 0 8px ${skill.gradient.split(',')[1]?.trim().replace(')', '')}40` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Experience timeline ── */}
        <section className="mb-14">
          <SectionHeader
            icon={<Briefcase className="w-5 h-5 text-green-400" />}
            title="Experience"
            gradient="linear-gradient(to right, #4ade80, #22d3ee)"
          />
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4.5 top-2 bottom-2 w-px bg-linear-to-b from-green-500/40 via-cyan-500/20 to-transparent" />

            <div className="space-y-5">
              {EXPERIENCE.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-2.75 top-5 w-4 h-4 rounded-full border-2 border-white/20 bg-[#0d0d1a] flex items-center justify-center">
                    {exp.current && (
                      <span className={`absolute inset-0 rounded-full ${exp.dotColor} opacity-40 animate-ping`} aria-hidden="true" />
                    )}
                    <div className={`relative w-1.5 h-1.5 rounded-full ${exp.dotColor}`} />
                  </div>

                  <div className="p-5 rounded-2xl border border-white/6 bg-white/2.5 hover:bg-white/5 hover:border-white/10 transition-all group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg ${exp.bg} border ${exp.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white leading-tight flex items-center gap-2 flex-wrap">
                            {exp.role}
                            {exp.type && (
                              <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 border border-white/10 rounded-full px-1.5 py-0.5">
                                {exp.type}
                              </span>
                            )}
                          </h3>
                          <p className={`text-xs ${exp.color} mt-0.5`}>{exp.company}</p>
                          {exp.location && (
                            <p className="text-[10px] text-white/30 mt-0.5">{exp.location}</p>
                          )}
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono ${exp.color} ${exp.bg} border ${exp.border} px-2.5 py-1 rounded-full whitespace-nowrap`}>
                        {exp.current && <span className={`w-1.5 h-1.5 rounded-full ${exp.dotColor} animate-pulse`} aria-hidden="true" />}
                        {exp.duration}
                      </span>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-1.5">
                      {exp.responsibilities.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/45">
                          <span className="text-cyan-500 mt-0.5 shrink-0 text-xs">▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Stack + links */}
                    {(exp.stack?.length || exp.links?.length) ? (
                      <div className="mt-4 pt-3 border-t border-white/6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                        {exp.stack?.length ? (
                          <ul className="flex flex-wrap gap-1.5">
                            {exp.stack.map((tech) => (
                              <li key={tech} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${exp.color} ${exp.bg} border ${exp.border}`}>
                                {tech}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {exp.links?.length ? (
                          <div className="flex flex-wrap gap-1.5">
                            {exp.links.map((link) => {
                              const cls = "inline-flex items-center gap-1 text-2xs font-semibold text-white/60 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-2 py-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyan-400";
                              return link.internal ? (
                                <Link key={link.href} href={link.href} className={cls}>
                                  <FolderKanban className="w-3 h-3" aria-hidden="true" />
                                  {link.label}
                                </Link>
                              ) : (
                                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
                                  {link.label}
                                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                                </a>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Philosophy ── */}
        <section>
          <div
            className="relative rounded-3xl border border-white/7 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(13,13,26,0.97), rgba(15,12,41,0.94))" }}
          >
            {/* Gradient top bar */}
            <div className="h-0.5 w-full" style={{ background: "linear-gradient(to right, #22d3ee, #a855f7, #f472b6)" }} />

            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 p-8 md:p-10">

              {/* Top: header + quote */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-10">
                <div className="flex-1">
                  <SectionHeader
                    icon={<Sparkles className="w-5 h-5 text-cyan-400" />}
                    title="Development Philosophy"
                    gradient="linear-gradient(to right, #22d3ee, #a855f7)"
                  />
                  <p className="text-white/50 text-base leading-relaxed max-w-2xl -mt-2">
                    I don't just write code — I craft scalable, secure, and human-centered digital products.
                    Every line serves a purpose, every API is designed to last, and every UI tells a story.
                  </p>
                </div>
                {/* Quote block */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="lg:w-72 p-5 rounded-2xl border border-cyan-500/15 bg-cyan-500/4 shrink-0"
                >
                  <span className="text-5xl text-cyan-500/30 font-serif leading-none">"</span>
                  <p className="text-sm text-white/60 italic leading-relaxed -mt-3">
                    Build for users first, scale second, and never ship something you wouldn't use yourself.
                  </p>
                  <p className="text-xs text-cyan-400/60 mt-2 font-semibold">— Prakash Mani</p>
                </motion.div>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PHILOSOPHY_CARDS.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4 }}
                    viewport={{ once: true }}
                    className={`p-5 rounded-2xl border ${card.border} bg-white/2.5 hover:bg-white/5 transition-all group cursor-default`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${card.bg} border ${card.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      {card.icon}
                    </div>
                    <h4 className={`text-sm font-bold ${card.color} mb-1.5`}>{card.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
