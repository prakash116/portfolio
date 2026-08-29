"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, User, Mail, Code2, LayoutTemplate } from 'lucide-react';
import * as THREE from 'three';
import { FaServicestack } from "react-icons/fa";

const NavLogo = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.clientWidth  || 48;
    const h = el.clientHeight || 48;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(38, w / h, 0.1, 100);
    camera.position.z = 4.8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // Core: 3 layered glow spheres
    const coreGeo  = new THREE.SphereGeometry(0.26, 16, 16);
    const coreMat  = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
    const core     = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    const halo1Geo = new THREE.SphereGeometry(0.42, 16, 16);
    const halo1Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Mesh(halo1Geo, halo1Mat));

    const halo2Geo = new THREE.SphereGeometry(0.62, 16, 16);
    const halo2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Mesh(halo2Geo, halo2Mat));

    // Ring 1: cyan — flat equatorial
    const r1Geo = new THREE.TorusGeometry(1.05, 0.042, 8, 64);
    const r1Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.9 });
    const ring1 = new THREE.Mesh(r1Geo, r1Mat);
    scene.add(ring1);

    // Ring 2: purple — 60° tilt
    const r2Geo = new THREE.TorusGeometry(1.05, 0.032, 8, 64);
    const r2Mat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.80 });
    const ring2 = new THREE.Mesh(r2Geo, r2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 5;
    scene.add(ring2);

    // Ring 3: blue — near-perpendicular
    const r3Geo = new THREE.TorusGeometry(0.82, 0.026, 8, 52);
    const r3Mat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.70 });
    const ring3 = new THREE.Mesh(r3Geo, r3Mat);
    ring3.rotation.x = Math.PI / 2;
    ring3.rotation.z = Math.PI / 6;
    scene.add(ring3);

    // Electrons
    const mkElectron = (size, color) => {
      const g = new THREE.SphereGeometry(size, 8, 8);
      const m = new THREE.MeshBasicMaterial({ color, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Mesh(g, m);
      scene.add(mesh);
      return { mesh, g, m };
    };
    const e1 = mkElectron(0.11, 0xffffff);
    const e2 = mkElectron(0.09, 0xd946ef);
    const e3 = mkElectron(0.08, 0x60a5fa);

    // Electron glow halos
    const mkEGlow = (size, color) => {
      const g = new THREE.SphereGeometry(size, 8, 8);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
      const mesh = new THREE.Mesh(g, m);
      scene.add(mesh);
      return mesh;
    };
    const eg1 = mkEGlow(0.2, 0xffffff);
    const eg2 = mkEGlow(0.16, 0xd946ef);
    const eg3 = mkEGlow(0.14, 0x60a5fa);

    // Floating micro-particles
    const ptCount = 18;
    const ptPos   = new Float32Array(ptCount * 3);
    const ptVel   = [];
    for (let i = 0; i < ptCount; i++) {
      const r = 1.3 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI;
      ptPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      ptPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      ptPos[i*3+2] = r * Math.cos(phi);
      ptVel.push({ x: (Math.random()-0.5)*0.008, y: (Math.random()-0.5)*0.008, z: (Math.random()-0.5)*0.005 });
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({ size: 0.055, color: 0xa5f3fc, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Points(ptGeo, ptMat));

    // Group to wobble the whole scene
    const group = new THREE.Group();
    scene.children.forEach(c => group.add(c));
    scene.add(group);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;

      ring1.rotation.z += 0.020;
      ring2.rotation.z -= 0.014;
      ring3.rotation.y += 0.017;

      core.rotation.y += 0.014;
      const pulse = 1 + Math.sin(t * 3.5) * 0.08;
      core.scale.setScalar(pulse);

      const a1 = t * 1.8;
      const p1 = new THREE.Vector3(Math.cos(a1) * 1.05, Math.sin(a1) * 1.05, 0);
      e1.mesh.position.copy(p1); eg1.position.copy(p1);

      const a2 = t * 1.3 + 2.1;
      const p2 = new THREE.Vector3(
        Math.cos(a2) * 1.05,
        Math.sin(a2) * 1.05 * Math.cos(Math.PI/3) - Math.sin(a2) * 1.05 * Math.sin(Math.PI/3) * Math.sin(Math.PI/5),
        Math.sin(a2) * 1.05 * Math.sin(Math.PI/3)
      );
      e2.mesh.position.copy(p2); eg2.position.copy(p2);

      const a3 = t * 2.1 + 4.2;
      const p3 = new THREE.Vector3(
        Math.cos(a3) * 0.82 * Math.cos(Math.PI/6),
        Math.sin(a3) * 0.82,
        Math.cos(a3) * 0.82 * Math.sin(Math.PI/6)
      );
      e3.mesh.position.copy(p3); eg3.position.copy(p3);

      const pos = ptGeo.attributes.position.array;
      for (let i = 0; i < ptCount; i++) {
        pos[i*3]   += ptVel[i].x;
        pos[i*3+1] += ptVel[i].y;
        pos[i*3+2] += ptVel[i].z;
        const dist = Math.sqrt(pos[i*3]**2 + pos[i*3+1]**2 + pos[i*3+2]**2);
        if (dist > 2.0 || dist < 1.2) { ptVel[i].x *= -1; ptVel[i].y *= -1; ptVel[i].z *= -1; }
      }
      ptGeo.attributes.position.needsUpdate = true;

      group.rotation.y = Math.sin(t * 0.4) * 0.25;
      group.rotation.x = Math.sin(t * 0.3) * 0.12;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      [coreGeo, halo1Geo, halo2Geo, r1Geo, r2Geo, r3Geo, e1.g, e2.g, e3.g, ptGeo].forEach(g => g.dispose());
      [coreMat, halo1Mat, halo2Mat, r1Mat, r2Mat, r3Mat, e1.m, e2.m, e3.m, ptMat].forEach(m => m.dispose());
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    const initialResizeFrame = window.requestAnimationFrame(() => {
      setIsMobile(checkMobile());
    });

    const handleResize = () => {
      setIsMobile(checkMobile());
      if (!checkMobile()) setIsOpen(false);
    };
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialResizeFrame);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && isOpen && navbarRef.current && !navbarRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  const navItems = [
    { name: 'Home',     path: '/home',     icon: <Home size={15} /> },
    { name: 'About Me', path: '/about',    icon: <User size={15} /> },
    { name: 'Projects', path: '/project',  icon: <LayoutTemplate size={15} /> },
    { name: 'Skills',   path: '/skill',    icon: <Code2 size={15} /> },
    { name: 'Services', path: '/services', icon: <FaServicestack size={15} /> },
  ];

  return (
    <header
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a14]/95 backdrop-blur-xl shadow-xl shadow-black/40 border-b border-white/[0.08]'
          : 'bg-[#0a0a14]/60 backdrop-blur-md border-b border-white/[0.05]'
      }`}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-400/60 to-blue-500/0" />
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-4 lg:px-8">

        {/* ── Logo ── */}
        <Link href="/" aria-label="Back to homepage" className="flex items-center gap-2.5 group flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-12 h-12 flex-shrink-0"
          >
            <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-lg group-hover:bg-cyan-500/30 transition-all duration-300" />
            <NavLogo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="block"
          >
            <p className="text-sm sm:text-base font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent leading-tight">
              Prakash Mani
            </p>
            <p className="text-[8px] sm:text-[9px] text-white/25 font-medium tracking-[0.2em] uppercase leading-none">
              MERN Developer
            </p>
          </motion.div>
        </Link>

        {/* ── Desktop Nav ── */}
        {!isMobile && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-0.5"
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.path;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  <Link href={item.path} aria-current={isActive ? 'page' : undefined}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 ${
                        isActive
                          ? 'text-white bg-white/[0.07]'
                          : 'text-white/45 hover:text-white/85 hover:bg-white/[0.04]'
                      }`}
                    >
                      <span className={`transition-colors duration-200 ${isActive ? 'text-cyan-400' : ''}`}>
                        {item.icon}
                      </span>
                      {item.name}
                      {isActive && (
                        <motion.span
                          layoutId="navUnderline"
                          className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
        )}

        {/* ── Right side ── */}
        <div className="flex items-center gap-2">
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(34,211,238,0.35)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-cyan-500/20"
                >
                  <Mail size={14} />
                  Hire Me
                </motion.button>
              </Link>
            </motion.div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-white/55 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: 90,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0a0a14]/98 backdrop-blur-xl"
          >
            {/* Top gradient accent */}
            <div className="h-[1px] bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-transparent" />

            <div className="px-4 py-4 space-y-1.5">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 text-white border border-cyan-500/20'
                          : 'text-white/50 hover:text-white/85 hover:bg-white/[0.04] border border-transparent'
                      }`}>
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                        )}
                        <span className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-white/30'}`}>{item.icon}</span>
                        {item.name}
                        {isActive && (
                          <span className="ml-auto flex items-center gap-1">
                            <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
                          </span>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile Hire Me */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.05 }}
                className="pt-2 pb-2"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/25"
                  >
                    <Mail size={15} />
                    Hire Me
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
