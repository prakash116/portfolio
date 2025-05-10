import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code as CodeIcon,
  Heart,
  Send,
  ArrowRight,
  Box,
  Rss,
  Image as ImageIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AnimatedFooter = () => {
  const currentYear = new Date().getFullYear();
  const threeContainerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const animationRef = useRef(null);
  const shapesRef = useRef([]);
  const modelViewerRef = useRef(null);
  const [webGLError, setWebGLError] = useState(false);
  const MotionNavLink = motion(NavLink);
  // Social links data
  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "https://github.com/prakash116",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://x.com/prakashmani87",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/prakashmani87/",
    },
  ];

  // Quick links data
  const quickLinks = [
    { name: "Home", url: "/home" },
    { name: "About Me", url: "/about" },
    { name: "Projects", url: "/project" },
    { name: "Skills", url: "/skill" },
    { name: "Services", url: "/services" },
    { name: "Contact", url: "/contact" },
  ];

  // Contact info data
  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, text: "prakashmanig000@gmail.com" },
    { icon: <Phone className="w-5 h-5" />, text: "+91 8795901180" },
    { icon: <MapPin className="w-5 h-5" />, text: "Azadpur, Delhi 110033" },
  ];

  // Check WebGL support
  const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  };

  // Initialize Three.js scene
  useEffect(() => {
    if (!threeContainerRef.current || !isWebGLAvailable()) {
      setWebGLError(true);
      return;
    }

    let cleanup = () => {};

    try {
      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 25;
      camera.position.y = 5;
      cameraRef.current = camera;

      // Renderer setup with error handling
      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: false,
          antialias: true,
          powerPreference: "high-performance",
        });
      } catch (rendererError) {
        console.error("WebGLRenderer creation failed:", rendererError);
        setWebGLError(true);
        return;
      }

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x111111, 1);
      rendererRef.current = renderer;

      // Safely append renderer DOM element
      if (threeContainerRef.current && renderer.domElement) {
        threeContainerRef.current.appendChild(renderer.domElement);
      } else {
        setWebGLError(true);
        return;
      }

      // Controls setup
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controlsRef.current = controls;

      // Enhanced lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 2);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Create floating shapes
      const createShapes = () => {
        const shapes = [];
        const geometryTypes = [
          new THREE.IcosahedronGeometry(1, 0),
          new THREE.TorusGeometry(0.8, 0.2, 16, 32),
          new THREE.OctahedronGeometry(1, 0),
          new THREE.ConeGeometry(1, 2, 32),
        ];

        for (let i = 0; i < 12; i++) {
          const geometry =
            geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
          const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(
              Math.random() * 0.7 + 0.3,
              Math.random() * 0.7 + 0.3,
              Math.random() * 0.7 + 0.3
            ),
            transparent: true,
            opacity: 0.9,
            wireframe: Math.random() > 0.7,
            shininess: 150,
            specular: 0xffffff,
          });

          const shape = new THREE.Mesh(geometry, material);
          shape.position.x = (Math.random() - 0.5) * 40;
          shape.position.y = (Math.random() - 0.5) * 20;
          shape.position.z = (Math.random() - 0.5) * 40;
          shape.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );

          shape.userData = {
            speed: Math.random() * 0.02 + 0.01,
            rotationSpeed: Math.random() * 0.02 + 0.01,
            direction: new THREE.Vector3(
              Math.random() - 0.5,
              Math.random() - 0.5,
              Math.random() - 0.5
            ).normalize(),
          };

          shapes.push(shape);
          scene.add(shape);
        }

        shapesRef.current = shapes;
      };

      // Animation loop
      const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
          return;
        }

        animationRef.current = requestAnimationFrame(animate);

        shapesRef.current.forEach((shape) => {
          shape.position.addScaledVector(
            shape.userData.direction,
            shape.userData.speed
          );
          shape.rotation.x += shape.userData.rotationSpeed;
          shape.rotation.y += shape.userData.rotationSpeed;

          if (Math.abs(shape.position.x) > 25) shape.userData.direction.x *= -1;
          if (Math.abs(shape.position.y) > 15) shape.userData.direction.y *= -1;
          if (Math.abs(shape.position.z) > 25) shape.userData.direction.z *= -1;
        });

        controlsRef.current?.update();
        renderer.render(scene, camera);
      };

      createShapes();
      animate();

      // Handle resize
      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup function
      cleanup = () => {
        window.removeEventListener("resize", handleResize);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }

        if (threeContainerRef.current && rendererRef.current?.domElement) {
          threeContainerRef.current.removeChild(renderer.domElement);
        }

        shapesRef.current.forEach((shape) => {
          if (shape && sceneRef.current) {
            sceneRef.current.remove(shape);
            if (shape.geometry) shape.geometry.dispose();
            if (shape.material) shape.material.dispose();
          }
        });

        if (rendererRef.current) {
          renderer.dispose();
        }

        if (controlsRef.current) {
          controls.dispose();
        }
      };
    } catch (error) {
      console.error("Three.js initialization error:", error);
      setWebGLError(true);
    }

    return cleanup;
  }, []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900/10 to-gray-800/90 text-white md:py-10 overflow-hidden">
      {/* Three.js background with fallback */}
      {webGLError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0" />
      ) : (
        <div
          ref={threeContainerRef}
          className="absolute inset-0 z-0 opacity-70"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/20 to-transparent z-1" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:p-0 p-10 gap-10 md:gap-25 mb-10">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-2"
          >
            <motion.h3
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500"
              whileHover={{ scale: 1.02 }}
            >
              About Me
            </motion.h3>
            <motion.p
              className="text-gray-300 text-lg"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Full-stack developer specializing in modern web technologies with
              a passion for interactive experiences.
            </motion.p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <MotionNavLink
                  key={index}
                  to={link.url}
                  target="_blank"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.2,
                    boxShadow: "0 5px 15px rgba(59, 130, 246, 0.5)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
                  aria-label={link.name}
                >
                  {link.icon}
                </MotionNavLink>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.h3
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
              whileHover={{ scale: 1.02 }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-3 grid md:grid-cols-1 grid-cols-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                    type: "spring",
                    stiffness: 300,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10 }}
                >
                  <NavLink
                    to={link.url}
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-3 text-lg"
                  >
                    <motion.span
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      whileHover={{ scale: 1.5 }}
                    />
                    {link.name}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.h3
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
              whileHover={{ scale: 1.02 }}
            >
              Contact
            </motion.h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 text-gray-300 text-lg"
                  whileHover={{ x: 5 }}
                >
                  <motion.span className="mt-1" whileHover={{ scale: 1.2 }}>
                    {item.icon}
                  </motion.span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* 3D Art Gallery Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.h3
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-500"
              whileHover={{ scale: 1.02 }}
            >
              3D Art Gallery
            </motion.h3>

            <motion.div
              className="relative h-48 rounded-xl overflow-hidden border border-white/20 group"
              whileHover={{ scale: 1.02 }}
              ref={modelViewerRef}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-4"
                >
                  <Box className="w-12 h-12 text-violet-400" />
                </motion.div>
                <motion.p
                  className="text-white/80 text-lg font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {webGLError
                    ? "WebGL not supported in your browser"
                    : "Interactive 3D models coming soon!"}
                </motion.p>
                <motion.p
                  className="text-sm text-violet-300 mt-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  (Powered by Three.js)
                </motion.p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-600/20 group-hover:opacity-80 transition-opacity" />
            </motion.div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-12"
        />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-400 text-lg"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <CodeIcon className="w-6 h-6" />
            <span>&copy; {currentYear} All Rights Reserved</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </motion.span>
            <span>by Prakash Mani</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <span>v1.0.0</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {!webGLError && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      )}
    </footer>
  );
};

export default AnimatedFooter;
