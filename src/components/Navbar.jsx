import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, User, Mail, Sparkles, Code2, LayoutTemplate } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FaServicestack } from "react-icons/fa";

const AnimatedLogo = () => {
  const meshRef = useRef();
  const groupRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      <pointLight color="#3b82f6" intensity={1.5} distance={6} />
    </group>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen]   = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
      if (!checkMobile()) setIsOpen(false);
    };
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
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
    { name: 'Home',     path: 'home',     icon: <Home size={15} /> },
    { name: 'About Me', path: 'about',    icon: <User size={15} /> },
    { name: 'Projects', path: 'project',  icon: <LayoutTemplate size={15} /> },
    { name: 'Skills',   path: 'skill',    icon: <Code2 size={15} /> },
    { name: 'Services', path: 'services', icon: <FaServicestack size={15} /> },
  ];

  return (
    <header
      ref={navbarRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a14]/90 backdrop-blur-xl shadow-xl shadow-black/30 border-b border-white/[0.08]'
          : 'bg-[#0a0a14]/50 backdrop-blur-md border-b border-white/[0.04]'
      }`}
    >
      {/* Gradient glow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-5 lg:px-8">

        {/* ── Logo ── */}
        <NavLink to="/" aria-label="Back to homepage" className="flex items-center gap-2.5 group flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-9 h-9"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md group-hover:bg-blue-500/40 transition-colors duration-300" />
            <Canvas camera={{ position: [0, 0, 5], fov: 25 }} className="w-full h-full relative z-10">
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <AnimatedLogo />
            </Canvas>
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="hidden sm:block"
          >
            <p className="text-base font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent leading-tight">
              Prakash Mani
            </p>
            <p className="text-[9px] text-white/25 font-medium tracking-[0.2em] uppercase leading-none">
              MERN Developer
            </p>
          </motion.div>
        </NavLink>

        {/* ── Desktop Nav ── */}
        {!isMobile && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-0.5"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.05 }}
              >
                <NavLink to={item.path}>
                  {({ isActive }) => (
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
                  )}
                </NavLink>
              </motion.div>
            ))}
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
              <NavLink to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 22px rgba(34,211,238,0.35)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg shadow-cyan-500/20"
                >
                  <Mail size={14} />
                  Hire Me
                </motion.button>
              </NavLink>
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
            className="overflow-hidden border-t border-white/[0.05] bg-[#0a0a14]/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                  >
                    {({ isActive }) => (
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-500/10 text-white border border-blue-500/20'
                          : 'text-white/50 hover:text-white/85 hover:bg-white/[0.04]'
                      }`}>
                        <span className={isActive ? 'text-cyan-400' : 'text-white/30'}>{item.icon}</span>
                        {item.name}
                        {isActive && (
                          <span className="ml-auto flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
                          </span>
                        )}
                      </div>
                    )}
                  </NavLink>
                </motion.div>
              ))}

              {/* Mobile Hire Me */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.04 + 0.05 }}
                className="pt-2 pb-1"
              >
                <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/20">
                    <Mail size={15} />
                    Hire Me
                  </button>
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
