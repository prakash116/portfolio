import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Code, Cpu, Database, Server, Layout, Sparkles, Globe, Wifi, Wrench } from 'lucide-react';
import Carousel from '../Carousel';
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3, FaReact, FaGitAlt } from "react-icons/fa";
import { TbBrandRedux, TbBrandReactNative } from "react-icons/tb";
import { SiSocketdotio, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiTailwindcss, SiTypescript, SiNextdotjs } from "react-icons/si";
import { RiNodejsLine } from "react-icons/ri";

// ── Static data (outside component — no re-creation on render) ───────────────

const SKILL_ICONS = {
  'HTML':         <FaHtml5        className="w-4 h-4" style={{ color: '#e34f26' }} />,
  'CSS':          <FaCss3         className="w-4 h-4" style={{ color: '#2965f1' }} />,
  'JavaScript':   <span className="text-[11px] font-black" style={{ color: '#f7df1e' }}>JS</span>,
  'TypeScript':   <SiTypescript   className="w-4 h-4" style={{ color: '#3178c6' }} />,
  'React':        <FaReact        className="w-4 h-4" style={{ color: '#61dafb' }} />,
  'Next.js':      <SiNextdotjs    className="w-4 h-4 text-white" />,
  'React Native': <TbBrandReactNative className="w-4 h-4" style={{ color: '#61dafb' }} />,
  'Tailwind CSS': <SiTailwindcss  className="w-4 h-4" style={{ color: '#38bdf8' }} />,
  'Redux':        <TbBrandRedux   className="w-4 h-4" style={{ color: '#764abc' }} />,
  'Zustand':      <span className="text-[9px] font-black text-white/70">ZS</span>,
  'Node.js':      <RiNodejsLine   className="w-4 h-4" style={{ color: '#68a063' }} />,
  'Express.js':   <SiExpress      className="w-4 h-4 text-white/60" />,
  'Socket.IO':    <SiSocketdotio  className="w-4 h-4 text-white/80" />,
  'REST APIs':    <Globe          className="w-4 h-4" style={{ color: '#a855f7' }} />,
  'MongoDB':      <SiMongodb      className="w-4 h-4" style={{ color: '#4db33d' }} />,
  'PostgreSQL':   <SiPostgresql   className="w-4 h-4" style={{ color: '#336791' }} />,
  'MySQL':        <SiMysql        className="w-4 h-4" style={{ color: '#00758f' }} />,
  'Git':          <FaGitAlt       className="w-4 h-4" style={{ color: '#f05032' }} />,
  'WebSocket':    <Wifi           className="w-4 h-4" style={{ color: '#10b981' }} />,
  'AI Agents':    <Cpu            className="w-4 h-4" style={{ color: '#10b981' }} />,
  'Figma':        <span className="text-[9px] font-black" style={{ color: '#f24e1e' }}>Fig</span>,
};

const CATEGORIES = [
  {
    key:          'frontend',
    label:        'Frontend',
    Icon:         Layout,
    hex:          '#06b6d4',
    topBar:       'linear-gradient(to right,#06b6d4,#0891b2)',
    barGrad:      'linear-gradient(to right,#06b6d4,#0284c7)',
    iconBg:       'rgba(6,182,212,0.12)',
    border:       'border-cyan-500/20',
    borderHover:  'hover:border-cyan-400/35',
    glow:         'rgba(6,182,212,0.18)',
    headerGlow:   'bg-cyan-500/15',
    headerBorder: 'border-cyan-500/25',
    headerIcon:   'text-cyan-400',
  },
  {
    key:          'backend',
    label:        'Backend',
    Icon:         Server,
    hex:          '#a855f7',
    topBar:       'linear-gradient(to right,#a855f7,#7c3aed)',
    barGrad:      'linear-gradient(to right,#a855f7,#7c3aed)',
    iconBg:       'rgba(168,85,247,0.12)',
    border:       'border-purple-500/20',
    borderHover:  'hover:border-purple-400/35',
    glow:         'rgba(168,85,247,0.18)',
    headerGlow:   'bg-purple-500/15',
    headerBorder: 'border-purple-500/25',
    headerIcon:   'text-purple-400',
  },
  {
    key:          'database',
    label:        'Database',
    Icon:         Database,
    hex:          '#f97316',
    topBar:       'linear-gradient(to right,#f97316,#ea580c)',
    barGrad:      'linear-gradient(to right,#f97316,#ea580c)',
    iconBg:       'rgba(249,115,22,0.12)',
    border:       'border-orange-500/20',
    borderHover:  'hover:border-orange-400/35',
    glow:         'rgba(249,115,22,0.18)',
    headerGlow:   'bg-orange-500/15',
    headerBorder: 'border-orange-500/25',
    headerIcon:   'text-orange-400',
  },
  {
    key:          'tools',
    label:        'Tools & Others',
    Icon:         Wrench,
    hex:          '#10b981',
    topBar:       'linear-gradient(to right,#10b981,#059669)',
    barGrad:      'linear-gradient(to right,#10b981,#059669)',
    iconBg:       'rgba(16,185,129,0.12)',
    border:       'border-emerald-500/20',
    borderHover:  'hover:border-emerald-400/35',
    glow:         'rgba(16,185,129,0.18)',
    headerGlow:   'bg-emerald-500/15',
    headerBorder: 'border-emerald-500/25',
    headerIcon:   'text-emerald-400',
  },
];

const SKILLS = {
  frontend: [
    { name: 'HTML',         level: 98 },
    { name: 'CSS',          level: 95 },
    { name: 'JavaScript',   level: 95 },
    { name: 'TypeScript',   level: 82 },
    { name: 'React',        level: 95 },
    { name: 'Next.js',      level: 80 },
    { name: 'React Native', level: 85 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'Redux',        level: 82 },
    { name: 'Zustand',      level: 75 },
  ],
  backend: [
    { name: 'Node.js',    level: 90 },
    { name: 'Express.js', level: 90 },
    { name: 'Socket.IO',  level: 80 },
    { name: 'REST APIs',  level: 90 },
  ],
  database: [
    { name: 'MongoDB',    level: 88 },
    { name: 'PostgreSQL', level: 75 },
    { name: 'MySQL',      level: 75 },
  ],
  tools: [
    { name: 'Git',       level: 90 },
    { name: 'WebSocket', level: 78 },
    { name: 'AI Agents', level: 72 },
    { name: 'Figma',     level: 70 },
  ],
};

// ── Sub-components ────────────────────────────────────────────────────────────

const SectionHeader = ({ cat, skillCount }) => {
  const { Icon } = cat;
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-8"
    >
      <div className="relative flex-shrink-0">
        <div className={`absolute -inset-2 ${cat.headerGlow} rounded-full blur-md`} />
        <div
          className={`relative w-12 h-12 rounded-2xl bg-[#0d0d1a]/80 border ${cat.headerBorder} flex items-center justify-center`}
          style={{ boxShadow: `0 0 18px ${cat.glow}` }}
        >
          <Icon className={`w-6 h-6 ${cat.headerIcon}`} />
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold text-white leading-none">{cat.label}</h2>
        <div className="h-[2px] mt-2 rounded-full w-14" style={{ background: cat.topBar }} />
      </div>

      <span
        className="text-xs font-bold rounded-full px-3 py-1 border flex-shrink-0"
        style={{ color: cat.hex, borderColor: `${cat.hex}40`, background: `${cat.hex}10` }}
      >
        {skillCount} skills
      </span>
    </motion.div>
  );
};

const SkillCard = ({ skill, cat, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
    viewport={{ once: true }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={`relative bg-[#0d0d1a]/80 backdrop-blur-sm rounded-2xl overflow-hidden border ${cat.border} ${cat.borderHover} transition-colors duration-300 group`}
    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.45)' }}
  >
    {/* Hover glow */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
      style={{ background: `radial-gradient(ellipse at 50% 0%,${cat.glow},transparent 70%)` }}
    />
    {/* Top accent bar */}
    <div className="h-[3px] w-full" style={{ background: cat.topBar }} />

    <div className="p-5">
      {/* Icon + name */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
          style={{ background: cat.iconBg, border: `1px solid ${cat.hex}30` }}
        >
          {SKILL_ICONS[skill.name] ?? <Code className="w-4 h-4" style={{ color: cat.hex }} />}
        </div>
        <span className="font-semibold text-white/90 text-sm leading-tight">{skill.name}</span>
      </div>

      {/* Progress track */}
      <div className="h-1.5 rounded-full bg-white/[0.07] overflow-hidden mb-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.2, delay: index * 0.06, type: 'spring', stiffness: 55, damping: 12 }}
          viewport={{ once: true }}
          className="h-full rounded-full"
          style={{ background: cat.barGrad, boxShadow: `0 0 8px ${cat.hex}55` }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-semibold text-white/25 uppercase tracking-widest">Proficiency</span>
        <span className="text-xs font-bold" style={{ color: cat.hex }}>{skill.level}%</span>
      </div>
    </div>
  </motion.div>
);

// ── Main component ────────────────────────────────────────────────────────────

const SkillsPage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountNode = mountRef.current;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    // Stars (light count)
    const starGeo = new THREE.BufferGeometry();
    const starVerts = [];
    for (let i = 0; i < 2000; i++) {
      starVerts.push((Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000, (Math.random() - 0.5) * 2000);
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVerts, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Points(starGeo, starMat));

    // Nebulae (low-poly)
    const addNebula = (color, pos, scale = 1) => {
      const geo  = new THREE.SphereGeometry(50, 16, 16);
      const mat  = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.1, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      mesh.scale.setScalar(scale);
      scene.add(mesh);
      return { geo, mat };
    };
    const n1 = addNebula(0x4a00e0, [30, 10, -150]);
    const n2 = addNebula(0x9f3fbf, [-50, -20, -200], 0.75);

    // Category orbs (frontend/backend/database)
    const orbColors  = [0x06b6d4, 0xa855f7, 0xf97316];
    const orbMeshes  = [];
    const orbGeos    = [];
    const orbMats    = [];
    orbColors.forEach((clr, i) => {
      const geo  = new THREE.SphereGeometry(1.5, 24, 24);
      const mat  = new THREE.MeshPhongMaterial({ color: clr, transparent: true, opacity: 0.88, emissive: clr, emissiveIntensity: 0.35 });
      const orb  = new THREE.Mesh(geo, mat);
      orb.position.set((i - 1) * 6, 0, 0);
      // Glow shell
      const glGeo = new THREE.SphereGeometry(1.75, 16, 16);
      const glMat = new THREE.MeshBasicMaterial({ color: clr, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending });
      orb.add(new THREE.Mesh(glGeo, glMat));
      scene.add(orb);
      orbMeshes.push(orb);
      orbGeos.push(geo, glGeo);
      orbMats.push(mat, glMat);
    });

    scene.add(new THREE.AmbientLight(0x404040, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);

    camera.position.set(0, 2, 15);

    let raf;
    let running = false;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      orbMeshes.forEach((orb, i) => {
        orb.rotation.x += 0.004 + Math.sin(t * 0.2 + i) * 0.002;
        orb.rotation.y += 0.004 + Math.cos(t * 0.3 + i) * 0.002;
        orb.position.y = Math.sin(t * 0.7 + i * 2) * 1.8;
        orb.position.x = (i - 1) * 6 + Math.sin(t * 0.5 + i) * 1.2;
        orb.material.emissiveIntensity = 0.3 + Math.sin(t + i) * 0.12;
      });
      camera.position.y = 2 + Math.sin(t * 0.3) * 0.4;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    const start = () => { if (!running) { running = true; animate(); } };
    const stop  = () => { if (running)  { running = false; cancelAnimationFrame(raf); } };
    const handleVisibility = () => document.hidden ? stop() : start();
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    start();
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (mountNode.contains(renderer.domElement)) mountNode.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          Array.isArray(obj.material) ? obj.material.forEach(m => m.dispose()) : obj.material.dispose();
        }
      });
      starGeo.dispose(); starMat.dispose();
      n1.geo.dispose(); n1.mat.dispose();
      n2.geo.dispose(); n2.mat.dispose();
      orbGeos.forEach(g => g.dispose());
      orbMats.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative" style={{ background: 'linear-gradient(135deg,#0d0d1a 0%,#0f0c29 50%,#0d0d1a 100%)' }}>
      {/* Three.js canvas */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
      {/* Overlay tint */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-[#0d0d1a]/40" />

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-32 right-0  w-80 h-80 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl" />
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Technical Skills
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
              Skills
            </span>
            <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-blue-400/20 text-8xl select-none">{"{}"}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Technologies I've mastered to build exceptional digital experiences
          </motion.p>
        </div>

        {/* ── Skill sections ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {CATEGORIES.map((cat, ci) => (
            <motion.section
              key={cat.key}
              className="mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionHeader cat={cat} skillCount={SKILLS[cat.key].length} />

              <div className={`grid gap-4 ${
                cat.key === 'frontend'
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
                  : cat.key === 'backend' || cat.key === 'tools'
                  ? 'grid-cols-2 md:grid-cols-4'
                  : 'grid-cols-2 md:grid-cols-3'
              }`}>
                {SKILLS[cat.key].map((skill, si) => (
                  <SkillCard key={skill.name} skill={skill} cat={cat} index={si} />
                ))}
              </div>

              {/* Section divider */}
              {ci < CATEGORIES.length - 1 && (
                <div className="mt-14 h-px" style={{ background: 'linear-gradient(to right,transparent,rgba(255,255,255,0.07),transparent)' }} />
              )}
            </motion.section>
          ))}
        </div>

        <Carousel />

        {/* ── Footer CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center pb-32 relative"
        >
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl opacity-20 pointer-events-none" />
          <h3 className="text-2xl font-bold text-white mb-6">Ready to build something amazing?</h3>
          <motion.a
            href="mailto:prakashmanig000@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-cyan-500/30 transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Let's Connect
          </motion.a>
          <div className="mt-8 text-gray-400 text-sm flex items-center justify-center gap-2">
            <span>✦</span> Powered by cutting-edge technologies <span>✦</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;
