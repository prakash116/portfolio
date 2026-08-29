"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import {
  Code, Database, Cpu, Smartphone, Globe, Server,
  Sparkles, CheckCircle2,
} from "lucide-react";
import Link from "next/link";

// ── Static data (outside component) ─────────────────────────────────────────

const SERVICES = [
  {
    title: "Full-Stack Web Development",
    description: "End-to-end web applications using the MERN stack with clean architecture and scalable design.",
    icon: Code,
    hex:    "#06b6d4",
    topBar: "linear-gradient(to right,#06b6d4,#0891b2)",
    iconBg: "rgba(6,182,212,0.12)",
    border: "border-cyan-500/20",
    borderHover: "group-hover:border-cyan-400/40",
    glow:   "rgba(6,182,212,0.2)",
    features: [
      "Custom web application development",
      "RESTful API design & implementation",
      "Database architecture & optimization",
      "Authentication & authorization systems",
      "Third-party API integrations",
    ],
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript"],
  },
  {
    title: "Frontend Development",
    description: "Interactive, responsive UIs with React.js, Next.js, and modern design systems.",
    icon: Smartphone,
    hex:    "#3b82f6",
    topBar: "linear-gradient(to right,#3b82f6,#2563eb)",
    iconBg: "rgba(59,130,246,0.12)",
    border: "border-blue-500/20",
    borderHover: "group-hover:border-blue-400/40",
    glow:   "rgba(59,130,246,0.2)",
    features: [
      "React & Next.js component development",
      "State management (Redux / Zustand)",
      "Responsive UI/UX implementation",
      "Performance optimization & lazy loading",
      "Progressive Web Apps (PWAs)",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux"],
  },
  {
    title: "React Native Apps",
    description: "Cross-platform mobile applications for iOS and Android with native performance.",
    icon: Smartphone,
    hex:    "#a855f7",
    topBar: "linear-gradient(to right,#a855f7,#7c3aed)",
    iconBg: "rgba(168,85,247,0.12)",
    border: "border-purple-500/20",
    borderHover: "group-hover:border-purple-400/40",
    glow:   "rgba(168,85,247,0.2)",
    features: [
      "Cross-platform iOS & Android apps",
      "Role-based access control",
      "Real-time data sync & push notifications",
      "Offline-first architecture",
      "App Store & Play Store deployment",
    ],
    technologies: ["React Native", "Redux", "REST APIs", "Expo", "Firebase"],
  },
  {
    title: "Backend & API Development",
    description: "Scalable server-side applications with Node.js, Express, real-time WebSocket support.",
    icon: Server,
    hex:    "#f97316",
    topBar: "linear-gradient(to right,#f97316,#ea580c)",
    iconBg: "rgba(249,115,22,0.12)",
    border: "border-orange-500/20",
    borderHover: "group-hover:border-orange-400/40",
    glow:   "rgba(249,115,22,0.2)",
    features: [
      "RESTful & GraphQL API development",
      "JWT / OAuth authentication systems",
      "WebSocket & Socket.IO integration",
      "Middleware & rate-limiting",
      "API documentation (Swagger)",
    ],
    technologies: ["Node.js", "Express.js", "Socket.IO", "JWT", "GraphQL"],
  },
  {
    title: "Database Solutions",
    description: "MongoDB and SQL database design, modeling, optimization, and migration services.",
    icon: Database,
    hex:    "#10b981",
    topBar: "linear-gradient(to right,#10b981,#059669)",
    iconBg: "rgba(16,185,129,0.12)",
    border: "border-emerald-500/20",
    borderHover: "group-hover:border-emerald-400/40",
    glow:   "rgba(16,185,129,0.2)",
    features: [
      "NoSQL & SQL schema design",
      "Mongoose / Sequelize ORM setup",
      "Query optimization & indexing",
      "Data migration services",
      "Database security implementation",
    ],
    technologies: ["MongoDB", "MySQL", "PostgreSQL", "Mongoose", "Redis"],
  },
  {
    title: "Deployment & DevOps",
    description: "Cloud deployment, CI/CD pipelines, and infrastructure setup for production-ready apps.",
    icon: Globe,
    hex:    "#8b5cf6",
    topBar: "linear-gradient(to right,#8b5cf6,#7c3aed)",
    iconBg: "rgba(139,92,246,0.12)",
    border: "border-violet-500/20",
    borderHover: "group-hover:border-violet-400/40",
    glow:   "rgba(139,92,246,0.2)",
    features: [
      "CI/CD pipeline setup",
      "Docker containerization",
      "Cloud deployment (AWS, Vercel, Render)",
      "Serverless architecture",
      "Performance monitoring & logging",
    ],
    technologies: ["Docker", "AWS", "GitHub Actions", "Vercel", "NGINX"],
  },
];

// ── Service card ─────────────────────────────────────────────────────────────

const ServiceCard = ({ svc, index }) => {
  const Icon = svc.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className={`relative bg-[#0d0d1a]/85 backdrop-blur-sm rounded-2xl overflow-hidden border ${svc.border} ${svc.borderHover} transition-colors duration-300 group flex flex-col`}
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%,${svc.glow},transparent 65%)` }}
      />

      {/* Top accent bar */}
      <div className="h-[3px] w-full flex-shrink-0" style={{ background: svc.topBar }} />

      <div className="p-6 flex flex-col flex-1">
        {/* Icon + Title */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.12, rotate: 6 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: svc.iconBg, border: `1px solid ${svc.hex}30`, boxShadow: `0 0 14px ${svc.glow}` }}
          >
            <Icon className="w-6 h-6" style={{ color: svc.hex }} />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">{svc.title}</h3>
            <p className="text-sm text-white/50 mt-1.5 leading-relaxed">{svc.description}</p>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-5 flex-1">
          {svc.features.map((f, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07 + i * 0.05 }}
              viewport={{ once: true }}
              className="flex items-start gap-2"
            >
              <CheckCircle2
                className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                style={{ color: svc.hex, opacity: 0.7 }}
              />
              <span className="text-sm text-white/70 leading-snug">{f}</span>
            </motion.li>
          ))}
        </ul>

        {/* Tech pills */}
        <div className="pt-4 border-t border-white/[0.06]">
          <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-2.5">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {svc.technologies.map((tech, i) => (
              <motion.span
                key={i}
                whileHover={{ y: -2 }}
                className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                style={{ color: svc.hex, borderColor: `${svc.hex}35`, background: `${svc.hex}10` }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const Services = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountNode = mountRef.current;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const sv = [];
    for (let i = 0; i < 2000; i++)
      sv.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(sv, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Points(starGeo, starMat));

    // Nebulae
    const mkNebula = (color, pos, s = 1) => {
      const g = new THREE.SphereGeometry(55, 16, 16);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(...pos); mesh.scale.setScalar(s);
      scene.add(mesh);
      return { g, m };
    };
    const n1 = mkNebula(0x4a00e0, [25, 5, -130]);
    const n2 = mkNebula(0x00b4d8, [-35, -15, -170], 0.72);

    // Floating particles
    const ptCount = 60;
    const ptPos = new Float32Array(ptCount * 3);
    const ptVel = [];
    for (let i = 0; i < ptCount; i++) {
      ptPos[i * 3]     = (Math.random() - 0.5) * 18;
      ptPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      ptPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      ptVel.push({ x: (Math.random() - 0.5) * 0.007, y: (Math.random() - 0.5) * 0.007 });
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({ size: 0.06, color: 0xa855f7, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Points(ptGeo, ptMat));

    // Torus rings (service orbit theme)
    const rings = [
      { r: 3.5, tube: 0.018, color: 0x06b6d4, opacity: 0.18, rx: Math.PI / 4, ry: 0.2 },
      { r: 5.2, tube: 0.012, color: 0xa855f7, opacity: 0.13, rx: Math.PI / 6, ry: -0.3 },
      { r: 2.2, tube: 0.014, color: 0xf97316, opacity: 0.14, rx: Math.PI / 3, ry: 0.5 },
    ];
    const ringMeshes = rings.map(({ r, tube, color, opacity, rx, ry }) => {
      const g = new THREE.TorusGeometry(r, tube, 8, 80);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = rx;
      mesh.rotation.y = ry;
      scene.add(mesh);
      return mesh;
    });

    camera.position.z = 10;

    let raf;
    let running = false;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const pos = ptGeo.attributes.position.array;
      for (let i = 0; i < ptCount; i++) {
        pos[i * 3]     += ptVel[i].x;
        pos[i * 3 + 1] += ptVel[i].y;
        if (Math.abs(pos[i * 3])     > 9)  ptVel[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 6)  ptVel[i].y *= -1;
      }
      ptGeo.attributes.position.needsUpdate = true;
      ringMeshes[0].rotation.z += 0.003;
      ringMeshes[0].rotation.y += 0.001;
      ringMeshes[1].rotation.y += 0.004;
      ringMeshes[1].rotation.z -= 0.002;
      ringMeshes[2].rotation.x += 0.003;
      ringMeshes[2].rotation.z += 0.005;
      renderer.render(scene, camera);
    };

    const start = () => { if (!running) { running = true; animate(); } };
    const stop  = () => { if (running)  { running = false; cancelAnimationFrame(raf); } };
    const onVisibility = () => document.hidden ? stop() : start();
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (mountNode.contains(renderer.domElement)) mountNode.removeChild(renderer.domElement);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          Array.isArray(o.material) ? o.material.forEach(m => m.dispose()) : o.material.dispose();
        }
      });
      starGeo.dispose(); starMat.dispose();
      ptGeo.dispose(); ptMat.dispose();
      n1.g.dispose(); n1.m.dispose();
      n2.g.dispose(); n2.m.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative" style={{ background: "linear-gradient(135deg,#0d0d1a 0%,#0f0c29 50%,#0d0d1a 100%)" }}>
      {/* Three.js canvas */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[#0d0d1a]/45" />

      <div className="relative z-10 pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/6 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-32 right-0  w-80 h-80 bg-purple-500/6 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl" />
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              MERN Stack Services
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6 relative"
          >
            <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-cyan-400/20 text-8xl select-none">{"</>"}</span>
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Services
            </span>
            <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-blue-400/20 text-8xl select-none">{"{}"}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive development solutions tailored to your business needs
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-8 mt-10"
          >
            {[
              { value: "15+", label: "Projects Delivered" },
              { value: "3+",  label: "Years Experience" },
              { value: "6",   label: "Service Areas" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">{s.value}</p>
                <p className="text-sm text-white/40 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Services grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>

        {/* ── Process section ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-white mb-2">How I Work</h2>
            <div className="h-[2px] w-16 mx-auto rounded-full" style={{ background: "linear-gradient(to right,#06b6d4,#a855f7)" }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Discovery",    desc: "Understand your requirements, goals, and technical constraints.",   hex: "#06b6d4" },
              { step: "02", title: "Planning",     desc: "Architecture design, tech stack selection, and sprint planning.",   hex: "#a855f7" },
              { step: "03", title: "Development",  desc: "Agile development with regular updates and code reviews.",          hex: "#f97316" },
              { step: "04", title: "Delivery",     desc: "Testing, deployment, documentation, and post-launch support.",     hex: "#10b981" },
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative bg-[#0d0d1a]/80 backdrop-blur-sm rounded-2xl p-5 border border-white/[0.07] overflow-hidden group hover:border-white/15 transition-colors duration-300"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: `linear-gradient(to right,${p.hex},${p.hex}88)` }}
                />
                <span
                  className="inline-flex items-center justify-center min-w-[78px] px-4 py-2 rounded-2xl text-5xl font-black mb-4 leading-none border shadow-lg"
                  style={{
                    color: p.hex,
                    background: `${p.hex}18`,
                    borderColor: `${p.hex}40`,
                    boxShadow: `0 0 24px ${p.hex}18`,
                  }}
                >
                  {p.step}
                </span>
                <h4 className="text-xl font-bold text-white mb-2.5">{p.title}</h4>
                <p className="text-base text-white/65 leading-relaxed">{p.desc}</p>
                <div
                  className="absolute bottom-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none"
                  style={{ background: p.hex }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center pb-16 relative"
        >
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

          {/* CTA card */}
          <div
            className="relative max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/[0.07] p-10"
            style={{ background: "linear-gradient(135deg,rgba(6,182,212,0.06),rgba(168,85,247,0.06))", boxShadow: "0 0 60px rgba(6,182,212,0.08)" }}
          >
            <div className="h-[2px] absolute top-0 left-0 right-0" style={{ background: "linear-gradient(to right,#06b6d4,#a855f7,#3b82f6)" }} />
            <h3 className="text-2xl font-bold text-white mb-3">Ready to start your project?</h3>
            <p className="text-white/55 text-base mb-7">Let's discuss your requirements and build something amazing together.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-cyan-500/30 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Hire Me
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="mailto:prakashmanig000@gmail.com"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-white rounded-xl font-semibold transition-all"
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>
          </div>

          <div className="mt-8 text-gray-400 text-sm flex items-center justify-center gap-2">
            <span>✦</span> Building the web, one project at a time <span>✦</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
