"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Database, Settings, Download, Eye, Mail, CodeXml, Server, Cpu, Sparkles } from "lucide-react";
import { IoLogoJavascript, IoLogoNodejs, IoIosChatboxes } from "react-icons/io";
import { SiExpress, SiPostman, SiSocketdotio, SiTypescript, SiGraphql, SiDocker, SiNextdotjs, SiRedux, SiFigma } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaReact, FaGithub, FaAws, FaUtensils, FaMapMarkedAlt, FaBuilding, FaGraduationCap } from "react-icons/fa";
import { CiRoute } from "react-icons/ci";
import { VscVscodeInsiders } from "react-icons/vsc";
import { BsRobot } from "react-icons/bs";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import toast from "react-hot-toast";

const HeroSection = () => {
  const threeContainerRef = useRef(null);
  const [bgMode, setBgMode] = useState(0);
  const bgModeRef = useRef(0);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  const techCategories = useMemo(() => [
    {
      id: "frontend",
      label: "Frontend",
      dotColor: "bg-cyan-400",
      textColor: "text-cyan-400",
      items: [
        { name: "React.js",      icon: <FaReact className="w-4 h-4 text-cyan-400" /> },
        { name: "Next.js",       icon: <SiNextdotjs className="w-4 h-4 text-white" /> },
        { name: "React Native",  icon: <TbBrandReactNative className="w-4 h-4 text-blue-400" /> },
        { name: "TypeScript",    icon: <SiTypescript className="w-4 h-4 text-blue-500" /> },
        { name: "Redux Toolkit", icon: <SiRedux className="w-4 h-4 text-purple-500" /> },
        { name: "Tailwind CSS",  icon: <RiTailwindCssFill className="w-4 h-4 text-cyan-400" /> },
        { name: "JavaScript",    icon: <IoLogoJavascript className="w-4 h-4 text-yellow-400" /> },
      ],
    },
    {
      id: "backend",
      label: "Backend",
      dotColor: "bg-purple-400",
      textColor: "text-purple-400",
      items: [
        { name: "Node.js",    icon: <IoLogoNodejs className="w-4 h-4 text-green-500" /> },
        { name: "Express.js", icon: <SiExpress className="w-4 h-4 text-gray-300" /> },
        { name: "REST APIs",  icon: <CiRoute className="w-4 h-4 text-gray-300" /> },
        { name: "MongoDB",    icon: <Database className="w-4 h-4 text-green-400" /> },
        { name: "Socket.io",  icon: <SiSocketdotio className="w-4 h-4 text-gray-300" /> },
        { name: "GraphQL",    icon: <SiGraphql className="w-4 h-4 text-pink-500" /> },
      ],
    },
    {
      id: "tools",
      label: "Dev Tools",
      dotColor: "bg-yellow-400",
      textColor: "text-yellow-400",
      items: [
        { name: "VS Code",   icon: <VscVscodeInsiders className="w-4 h-4 text-sky-500" /> },
        { name: "Cursor AI", icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
        { name: "GitHub",    icon: <FaGithub className="w-4 h-4 text-white" /> },
        { name: "Postman",   icon: <SiPostman className="w-4 h-4 text-orange-500" /> },
        { name: "Docker",    icon: <SiDocker className="w-4 h-4 text-blue-400" /> },
        { name: "AWS",       icon: <FaAws className="w-4 h-4 text-yellow-400" /> },
        { name: "AI Agents", icon: <BsRobot className="w-4 h-4 text-violet-400" /> },
      ],
    },
    {
      id: "projects",
      label: "Projects",
      dotColor: "bg-green-400",
      textColor: "text-green-400",
      items: [
        { name: "RestoCare",    icon: <FaUtensils className="w-4 h-4 text-orange-400" /> },
        { name: "Pzee Finder",  icon: <FaMapMarkedAlt className="w-4 h-4 text-cyan-400" /> },
        { name: "Aurevia Tech", icon: <FaBuilding className="w-4 h-4 text-purple-400" /> },
        { name: "Edunovas",     icon: <FaGraduationCap className="w-4 h-4 text-emerald-400" /> },
        { name: "Chat App",     icon: <IoIosChatboxes className="w-4 h-4 text-sky-400" /> },
        { name: "Figma",        icon: <SiFigma className="w-4 h-4 text-pink-400" /> },
      ],
    },
  ], []);

  const floatingBgIcons = useMemo(() => [
    { el: <FaReact />,        color: "text-cyan-400/25",   left: "8%",  top: "12%" },
    { el: <SiNextdotjs />,    color: "text-white/20",      left: "78%", top: "8%"  },
    { el: <IoLogoNodejs />,   color: "text-green-500/25",  left: "15%", top: "72%" },
    { el: <SiTypescript />,   color: "text-blue-500/25",   left: "88%", top: "58%" },
    { el: <SiDocker />,       color: "text-blue-400/25",   left: "62%", top: "82%" },
    { el: <Database />,       color: "text-green-400/25",  left: "48%", top: "22%" },
    { el: <FaGithub />,       color: "text-white/20",      left: "92%", top: "28%" },
    { el: <SiGraphql />,      color: "text-pink-500/25",   left: "32%", top: "88%" },
    { el: <FaAws />,          color: "text-yellow-400/25", left: "70%", top: "42%" },
    { el: <SiFigma />,        color: "text-pink-400/25",   left: "3%",  top: "50%" },
  ], []);

  // ─── Three.js helpers ─────────────────────────────────────────────────────
  const cleanUpBackground = () => {
    const scene = sceneRef.current;
    if (!scene) return;
    ["particles", "sphere", "grid", "cubes"].forEach((key) => {
      const obj = scene.userData[key];
      if (!obj) return;
      (Array.isArray(obj) ? obj : [obj]).forEach((o) => {
        scene.remove(o);
        o.geometry?.dispose();
        o.material?.dispose();
      });
      delete scene.userData[key];
    });
  };

  const updateBackground = () => {
    const scene = sceneRef.current;
    const mode = bgModeRef.current;
    if (!scene) return;
    if (mode === 0 && scene.userData.particles) {
      scene.userData.particles.rotation.x += 0.0004;
      scene.userData.particles.rotation.y += 0.0004;
    }
    if (mode === 1 && scene.userData.sphere) {
      scene.userData.sphere.rotation.x += 0.004;
      scene.userData.sphere.rotation.y += 0.004;
    }
    if (mode === 2 && scene.userData.cubes) {
      scene.userData.cubes.forEach((c) => {
        c.position.y += c.userData.speed;
        c.rotation.x += c.userData.rotSpeed;
        c.rotation.y += c.userData.rotSpeed;
        if (c.position.y > 10) c.position.y = -10;
      });
    }
  };

  const initThree = () => {
    if (!threeContainerRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    threeContainerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;

    scene.add(new THREE.AmbientLight(0x404040));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(1, 1, 1);
    scene.add(dirLight);
    const ptLight = new THREE.PointLight(0x3a86ff, 0.8, 100);
    ptLight.position.set(5, 5, 5);
    scene.add(ptLight);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      updateBackground();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      if (threeContainerRef.current?.contains(renderer.domElement)) {
        threeContainerRef.current.removeChild(renderer.domElement);
      }
      cleanUpBackground();
      controls.dispose();
      renderer.dispose();
    };
  };

  const createBackground = () => {
    cleanUpBackground();
    const scene = sceneRef.current;
    if (!scene) return;

    if (bgMode === 0) {
      const count = 1500;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 20;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ size: 0.05, color: 0x3a86ff, transparent: true, opacity: 0.7 });
      const mesh = new THREE.Points(geo, mat);
      scene.userData.particles = mesh;
      scene.add(mesh);
    } else if (bgMode === 1) {
      const geo = new THREE.IcosahedronGeometry(5, 2);
      const mat = new THREE.MeshBasicMaterial({ color: 0x3a0ca3, wireframe: true, transparent: true, opacity: 0.5 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.userData.sphere = mesh;
      scene.add(mesh);
    } else {
      const grid = new THREE.GridHelper(20, 20, 0x3a86ff, 0x3a0ca3);
      grid.position.y = -5;
      grid.rotation.x = Math.PI / 2;
      scene.userData.grid = grid;
      scene.add(grid);
      const cubes = Array.from({ length: 8 }, () => {
        const s = Math.random() * 0.5 + 0.3;
        const geo = new THREE.BoxGeometry(s, s, s);
        const mat = new THREE.MeshBasicMaterial({ color: 0x3a86ff, transparent: true, opacity: 0.6, wireframe: true });
        const cube = new THREE.Mesh(geo, mat);
        cube.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15);
        cube.userData = { speed: Math.random() * 0.02 + 0.01, rotSpeed: Math.random() * 0.02 + 0.01 };
        scene.add(cube);
        return cube;
      });
      scene.userData.cubes = cubes;
    }
  };

  // The Three.js scene mounts once; live values are held in refs.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { return initThree(); }, []);
  useEffect(() => {
    bgModeRef.current = bgMode;
    createBackground();
    // createBackground intentionally follows only the selected background mode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgMode]);

  const downloadResume = () => {
    fetch("/PRAKASH.pdf")
      .then((res) => {
        if (!res.ok) throw new Error();
        const link = document.createElement("a");
        link.href = "/PRAKASH.pdf";
        link.download = "Prakash Mani CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Resume Downloaded");
      })
      .catch(() => toast.error("Resume currently unavailable"));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d0d1a] via-[#0f0c29] to-[#1a1a2e] min-h-screen flex flex-col lg:flex-row">
      {/* Three.js canvas */}
      <div ref={threeContainerRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-black/25" />

      {/* Floating bg icons — reduced count for perf */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingBgIcons.map((item, i) => (
          <motion.div
            key={i}
            className={`absolute text-2xl ${item.color}`}
            style={{ left: item.left, top: item.top, willChange: "transform" }}
            animate={{ y: [-15, 15], x: [-8, 8] }}
            transition={{ duration: 12 + i * 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            {item.el}
          </motion.div>
        ))}
      </div>

      {/* Subtle binary overlay — reduced to 20 */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.06] pointer-events-none select-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.span
            key={i}
            className="absolute font-mono text-white text-sm"
            style={{ left: `${(i * 5.1) % 100}%`, top: `${(i * 7.3) % 100}%`, willChange: "opacity" }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
          >
            {i % 2 === 0 ? "1" : "0"}
          </motion.span>
        ))}
      </div>

      {/* Bg mode toggle */}
      <motion.button
        onClick={() => setBgMode((p) => (p + 1) % 3)}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="absolute bottom-6 right-6 z-20 p-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-white/50 hover:text-white/90 transition-colors"
        title="Change 3D background"
      >
        <Settings className="w-4 h-4" />
      </motion.button>

      {/* ──────────────────────────── LEFT PANEL ────────────────────────────── */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-8 py-16 lg:px-14">
        <div className="w-full max-w-lg">

          {/* Available pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs text-green-400 font-medium tracking-widest uppercase">Available for Work</span>
          </motion.div>

          {/* Role badge */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-white/5 border border-white/10 rounded-full text-[11px] font-semibold text-white/60 backdrop-blur-sm tracking-wider"
          >
            <CodeXml className="w-3 h-3 text-cyan-400" />
            FULL-STACK DEVELOPER · WEB &amp; MOBILE
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-3"
          >
            <p className="text-white/40 text-base mb-1 font-light">Hi, I'm</p>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-none bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              Prakash Mani
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-5"
          >
            Modern Web Solutions Architect
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-white/50 text-sm leading-relaxed mb-8 max-w-md"
          >
            Building scalable web & mobile products with React Native, Next.js, NestJS, and PostgreSQL. Passionate about clean architecture, seamless UX, and shipping ideas to production.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-8 pb-8 mb-8 border-b border-white/[0.07]"
          >
            {[
              { val: "3+",    lbl: "Years Exp" },
              { val: "13+", lbl: "Projects" },
              { val: "10+", lbl: "Technologies" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold bg-gradient-to-b from-cyan-300 to-blue-400 bg-clip-text text-transparent">{s.val}</div>
                <div className="text-[11px] text-white/30 mt-0.5 font-medium">{s.lbl}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-3"
          >
            <Link href="/project">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(34,211,238,0.4)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-sm shadow-lg"
              >
                <Eye className="w-4 h-4" /> View Projects
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(74,222,128,0.35)" }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl text-sm shadow-lg"
              >
                <Mail className="w-4 h-4" /> Hire Me
              </motion.button>
            </Link>
          </motion.div>

          {/* Resume download */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            onClick={downloadResume}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-2.5 text-xs text-white/45 hover:text-white/75 border border-white/10 hover:border-white/25 rounded-xl bg-white/[0.03] backdrop-blur-sm transition-all font-medium tracking-wide"
          >
            <Download className="w-3.5 h-3.5" /> Download Full Resume
          </motion.button>
        </div>
      </div>

      {/* ──────────────────────────── RIGHT PANEL ───────────────────────────── */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center px-6 py-10 lg:px-12 lg:border-l border-white/[0.05]">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-6">
              <CodeXml className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">My Tech Stack</h2>
              <span className="ml-auto px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400 font-mono">
                v3.0
              </span>
            </div>

            {/* 2×2 category cards */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {techCategories.map((cat, ci) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + ci * 0.07 }}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-sm"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2 h-2 rounded-full ${cat.dotColor}`} />
                    <span className={`text-xs font-bold ${cat.textColor} tracking-widest uppercase`}>
                      {cat.label}
                    </span>
                    <span className="ml-auto text-xs text-white/25 font-mono">{cat.items.length}</span>
                  </div>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, ii) => (
                      <motion.span
                        key={ii}
                        whileHover={{ scale: 1.08, y: -1 }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.14] border border-white/[0.08] text-white/70 text-xs font-medium cursor-default transition-colors"
                      >
                        {item.icon}
                        {item.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info row */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <Cpu className="w-4 h-4 text-purple-400" />,
                  color: "text-purple-400",
                  title: "Frontend Mastery",
                  desc: "Interactive UIs, responsive design, state management & performance",
                },
                {
                  icon: <Server className="w-4 h-4 text-blue-400" />,
                  color: "text-blue-400",
                  title: "Backend Expertise",
                  desc: "Scalable APIs, database design, authentication & cloud deployment",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.08 }}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {card.icon}
                    <span className={`text-sm font-semibold ${card.color}`}>{card.title}</span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
