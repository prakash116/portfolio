import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, User, Mail, Sparkles } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Code2, LayoutTemplate } from 'lucide-react';
import * as THREE from 'three';
import { FaServicestack } from "react-icons/fa";

// Enhanced Three.js Animated Logo Component
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

// Cosmic Background Component
const CosmicBackground = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main starfield */}
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      {/* Nebula effect */}
      <mesh position={[10, 5, -50]}>
        <sphereGeometry args={[20, 32, 32]} />
        <meshBasicMaterial 
          color={new THREE.Color(0x4a00e0)} 
          transparent 
          opacity={0.1} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navbarRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle resize for mobile detection
  useEffect(() => {
    const checkMobile = () => window.innerWidth <= 768;
    setIsMobile(checkMobile());

    const handleResize = () => {
      setIsMobile(checkMobile());
      if (!checkMobile()) setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  const navItems = [
    { name: 'Home', path: '/portfolio/home', icon: <Home size={18} /> },
    { name: 'About Me', path: '/portfolio/about', icon: <User size={18} /> },
    { name: 'Projects', path: '/portfolio/project', icon: <LayoutTemplate size={18} /> },
    { name: 'Skills', path: '/portfolio/skill', icon: <Code2 size={18} /> },
    { name: 'Services', path: '/portfolio/services', icon: <FaServicestack size={18} /> }, 
    { name: 'Contact', path: '/portfolio/contact', icon: <Mail size={18} /> },
  ];

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  const menuVariants = {
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.3
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-5, 5],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 2,
          ease: 'easeInOut'
        }
      }
    }
  };

  return (
    <>
      {/* Cosmic background canvas */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <CosmicBackground />
        </Canvas>
      </div>

      {/* Navbar with glass morphism effect */}
      <header 
        ref={navbarRef}
        className="fixed w-full p-4 bg-white/80 dark:bg-gray-900/40 text-gray-900 dark:text-white z-50 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/30"
      >
        <div className="flex justify-between h-10 mx-auto items-center max-w-7xl">
          {/* Logo with Three.js animation */}
          <NavLink 
            to="/portfolio/" 
            aria-label="Back to homepage" 
            className="flex items-center p-2"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              variants={floatingVariants}
              animate="float"
              className="relative w-10 h-10"
            >
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 25 }} 
                className="w-full h-full"
                ref={canvasRef}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <AnimatedLogo />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Sparkles className="w-6 h-6 text-blue-500" />
              </motion.div>
            </motion.div>
            <motion.span 
              className="text-xl font-bold ml-2 hidden sm:inline-block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Prakash Mani
            </motion.span>
          </NavLink>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.ul 
              className="items-stretch hidden space-x-3 md:flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  className="flex"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-md transition-all ${
                        isActive
                          ? 'bg-blue-100/80 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300 shadow-sm'
                          : 'hover:bg-gray-100/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:shadow-sm'
                      }`
                    }
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <motion.button
              className="flex justify-end p-2 md:hidden text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden bg-white/90 dark:bg-gray-800/90 overflow-hidden shadow-lg rounded-lg mt-2 backdrop-blur-md border border-gray-200/30 dark:border-gray-800/30"
            >
              <motion.ul className="px-4 space-y-2 pb-4">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    variants={itemVariants}
                    custom={index}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-md transition-all ${
                          isActive
                            ? 'bg-blue-100/80 dark:bg-blue-900/80 text-blue-700 dark:text-blue-300 shadow-sm'
                            : 'hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                        }`
                      }
                    >
                      <motion.span 
                        className="mr-3"
                        whileHover={{ rotate: 15 }}
                      >
                        {item.icon}
                      </motion.span>
                      {item.name}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;