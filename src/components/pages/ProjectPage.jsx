import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import {
  Code2,
  Server,
  Database,
  Cpu,
  Cloud,
  GitBranch,
  Github,
  ExternalLink,
  Zap,
  Sparkles,
  MessageCircle,
  Car,
  BookOpen,
} from "lucide-react";
import { TiShoppingCart } from "react-icons/ti";
import { GiLift } from "react-icons/gi";

const ProjectsPage = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const projectsContainerRef = useRef(null);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-featured online marketplace with payment integration and admin dashboard.",
      technologies: ["React", "Redux", "Node.js", "Express.js", "MongoDB"],
      year: "2025",
      icon: <TiShoppingCart className="w-6 h-6 text-purple-400" />,
      accent: "purple",
    },
    {
      title: "Elite India Markiting",
      description:
        "Admin manages all controls, including task assignment, real-time tracking, and implementation of annual sales and purchase graphs.",
      technologies: [
        "JavaScript",
        "Raect",
        "Readux",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      year: "2025",
      icon: <GiLift className="w-6 h-6 text-cyan-400" />,
      accent: "cyan",
    },
    {
      title: "Chat Application",
      description:
        "Real-time chat platform with user authentication, Socket.IO integration, and a responsive UI.",
      technologies: ["Tailwind", "React", "Zustand", "Node.js", "Express.js", "Socket.IO", "MongoDB"],
      year: "2024",
      icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
      accent: "purple",
    },
    {
      title: "Library Management System",
      description: "A web-based system for managing book inventories, user records, and issue/return tracking.",
      technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
      year: "2024",
      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
      accent: "blue",
    },
    {
      title: "Media Storage Solution",
      description: "Secure cloud-based file storage with encryption and sharing capabilities.",
      technologies: ["Cloudinary", "React", "Context API", "Node.js", "Express"],
      year: "2024",
      icon: <Cloud className="w-6 h-6 text-blue-400" />,
      accent: "blue",
    },
    {
      title: "Vehicle Renting",
      description: "Online vehicle rental platform with booking management and user-friendly interface.",
      technologies: ["Bootstrap","JavaScript", "React", "Context API", "API Integration"],
      year: "2023",
      icon: <Car className="w-6 h-6 text-orange-400" />,
      accent: "orange",
    },
  ];

  useEffect(() => {
    // Three.js Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Cosmic Background
    const createStarfield = () => {
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const starsVertices = [];
      for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starsVertices.push(x, y, z);
      }

      starsGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(starsVertices, 3)
      );
      const starField = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starField);
    };
    createStarfield();

    // Nebula Effect
    const createNebula = () => {
      const nebulaGeometry = new THREE.SphereGeometry(50, 32, 32);
      const nebulaMaterial = new THREE.MeshBasicMaterial({
        color: 0x4a00e0,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      });
      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
      nebula.position.set(20, 0, -100);
      scene.add(nebula);

      const nebula2 = nebula.clone();
      nebula2.material = nebula.material.clone();
      nebula2.material.color.setHex(0x00b4d8);
      nebula2.position.set(-30, 40, -150);
      nebula2.scale.set(0.7, 0.7, 0.7);
      scene.add(nebula2);
    };
    createNebula();

    // Central Timeline with Glow Effect
    const createTimeline = () => {
      const timelineGeometry = new THREE.BufferGeometry();
      const count = 300;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = 0;
        positions[i + 1] = (i / 3) * 0.3 - 45;
        positions[i + 2] = 0;
      }
      timelineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const timelineMaterial = new THREE.LineBasicMaterial({
        color: 0x4fd1c5,
        transparent: true,
        opacity: 0.5,
        linewidth: 3,
      });
      const timeline = new THREE.Line(timelineGeometry, timelineMaterial);
      scene.add(timeline);

      // Glow effect
      const glowGeometry = new THREE.BufferGeometry();
      glowGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      const glowMaterial = new THREE.LineBasicMaterial({
        color: 0x4fd1c5,
        transparent: true,
        opacity: 0.1,
        linewidth: 10,
      });
      const glow = new THREE.Line(glowGeometry, glowMaterial);
      scene.add(glow);
    };
    createTimeline();

    // Floating Tech Orbs
    const createTechOrbs = () => {
      const orbs = [];
      projects.forEach((project, i) => {
        const geometry = new THREE.SphereGeometry(1.2, 32, 32);
        const material = new THREE.MeshPhongMaterial({
          color: getColor(project.accent),
          transparent: true,
          opacity: 0.9,
          emissive: getColor(project.accent),
          emissiveIntensity: 0.3,
          specular: 0xffffff,
          shininess: 50,
        });

        const orb = new THREE.Mesh(geometry, material);
        orb.position.y = i * 12 - 30;
        orb.position.x = (i % 2 === 0 ? 1 : -1) * 5;
        orb.userData = { hover: false };

        // Inner core
        const coreGeometry = new THREE.SphereGeometry(0.4, 16, 16);
        const coreMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.8,
        });
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        orb.add(core);

        scene.add(orb);
        orbs.push(orb);

        // Connecting energy lines
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(2 * 3);
        linePositions[0] = 0;
        linePositions[1] = orb.position.y;
        linePositions[2] = 0;
        linePositions[3] = orb.position.x;
        linePositions[4] = orb.position.y;
        linePositions[5] = 0;
        lineGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(linePositions, 3)
        );

        const lineMaterial = new THREE.LineBasicMaterial({
          color: getColor(project.accent),
          transparent: true,
          opacity: 0.3,
          linewidth: 2,
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
      });
      return orbs;
    };
    const techOrbs = createTechOrbs();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Camera Position
    camera.position.z = 40;
    camera.position.y = 0;

    // Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Animate orbs
      techOrbs.forEach((orb, i) => {
        orb.rotation.x += 0.005;
        orb.rotation.y += 0.005;

        // Pulsing animation
        const pulse = Math.sin(time * 2 + i) * 0.1 + 1;
        orb.scale.set(pulse, pulse, pulse);

        // Gentle floating motion
        orb.position.x = (i % 2 === 0 ? 5 : -5) + Math.sin(time + i) * 1.5;
        orb.position.z = Math.cos(time * 0.5 + i) * 2;

        // Glow effect when hovered
        if (orb.userData.hover) {
          orb.material.emissiveIntensity = THREE.MathUtils.lerp(
            orb.material.emissiveIntensity,
            0.8,
            0.1
          );
        } else {
          orb.material.emissiveIntensity = THREE.MathUtils.lerp(
            orb.material.emissiveIntensity,
            0.3,
            0.1
          );
        }
      });

      // Scroll sync
      if (projectsContainerRef.current) {
        const scrollY = window.scrollY;
        const containerTop = projectsContainerRef.current.offsetTop;
        const containerHeight = projectsContainerRef.current.offsetHeight;
        const scrollProgress = Math.min(
          1,
          Math.max(
            0,
            (scrollY - containerTop + window.innerHeight * 0.3) /
              containerHeight
          )
        );
        camera.position.y =
          -scrollProgress * (projects.length * 12 - window.innerHeight * 0.1);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const getColor = (accent) => {
    const colors = {
      purple: 0x9f7aea,
      cyan: 0x00b5d8,
      emerald: 0x38b2ac,
      blue: 0x4299e1,
      orange: 0xed8936,
      pink: 0xed64a6,
    };
    return colors[accent] || 0xffffff;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 overflow-hidden relative">
      {/* Cosmic Background Canvas */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Floating Particles Overlay */}
      <div className="fixed inset-0 pointer-events-none z-1">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-500/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header with Cosmic Flare */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute -top-40 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-20"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg">
              <Sparkles className="inline w-5 h-5 mr-2" />
              Interactive Portfolio
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white sm:text-6xl mb-6 relative"
          >
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-20 text-8xl select-none">
              {"</>"}
            </span>
            Project{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Timeline
            </span>
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-20 text-8xl select-none">
              {"{}"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto relative"
          >
            <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-60">
              ❯
            </span>
            Explore my work through this cosmic 3D timeline experience
          </motion.p>
        </div>

        {/* Timeline with Projects */}
        <div
          ref={projectsContainerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative"
        >
          {/* Projects */}
          <div className="relative space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className={`relative flex ${
                  index % 2 === 0
                    ? "justify-between"
                    : "justify-between flex-row-reverse"
                }`}
              >
                {/* Project Card */}
                <div
                  className={`w-full md:w-2/5 relative group ${
                    index % 2 === 0 ? "pr-0" : "pl-0"
                  }`}
                >
                  {/* Glow Effect */}
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r from-${project.accent}-500 to-${project.accent}-600 rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  ></div>

                  {/* Timeline Node */}
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
                      index % 2 === 0
                        ? "right-0 translate-x-1/2"
                        : "left-0 -translate-x-1/2"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-br from-${project.accent}-500 to-${project.accent}-600 border-2 border-white/20 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300`}
                    >
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Year Marker */}
                  <div
                    className={`absolute top-0 ${
                      index % 2 === 0
                        ? "right-0 md:right-auto md:left-full ml-8"
                        : "left-0 md:left-auto md:right-full mr-8"
                    } text-${
                      project.accent
                    }-400 font-bold text-lg flex items-center`}
                  >
                    <span className="mr-2 opacity-70">⏤</span> {project.year}
                  </div>

                  {/* Card Content */}
                  <div
                    className={`relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg h-full border border-gray-800 overflow-hidden transition-all duration-300 group-hover:border-${project.accent}-400/50 group-hover:shadow-lg`}
                  >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30"></div>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br from-${project.accent}-900/10 to-${project.accent}-800/10`}
                      ></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-br from-${project.accent}-900/30 to-${project.accent}-800/30 mr-4 border border-${project.accent}-400/20 group-hover:shadow-${project.accent}-500/20 transition-shadow duration-300`}
                        >
                          {project.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-gray-300 mb-4">
                        {project.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                          <span className="w-4 h-px bg-gray-600 mr-2"></span>
                          Built with:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <motion.span
                              key={i}
                              whileHover={{ y: -2 }}
                              className={`px-3 py-1 bg-gray-800/70 text-gray-300 rounded-full text-xs font-medium border border-${project.accent}-400/20 group-hover:border-${project.accent}-400/40 transition-colors duration-300`}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-auto pt-4 border-t border-gray-800">
                        <motion.a
                          href="#"
                          whileHover={{ y: -2 }}
                          className={`flex items-center px-4 py-2 bg-gray-800/70 text-gray-300 rounded-lg text-sm font-medium transition hover:bg-${project.accent}-900/30 border border-${project.accent}-400/20 group-hover:border-${project.accent}-400/40`}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </motion.a>
                        <motion.a
                          href="#"
                          whileHover={{ y: -2, scale: 1.02 }}
                          className={`flex items-center px-4 py-2 bg-gradient-to-r from-${project.accent}-500 to-${project.accent}-600 text-white rounded-lg text-sm font-medium transition opacity-90 hover:opacity-100 shadow-md hover:shadow-${project.accent}-500/30`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creative Design Element on Opposite Side */}
                <div
                  className={`hidden md:flex w-2/5 ${
                    index % 2 === 0 ? "pl-8" : "pr-8"
                  } items-center justify-center`}
                >
                  {index % 2 === 0 ? (
                    // Tech Stack Visualization
                    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm">
                      <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                          {project.technologies.length}+
                        </div>
                        <div className="text-lg text-gray-300 mb-2">
                          Technologies Used
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 mt-4">
                          {project.technologies.map((tech, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: i * 0.1,
                                type: "spring",
                                stiffness: 100,
                              }}
                              className={`p-3 rounded-lg bg-gradient-to-br from-${project.accent}-900/20 to-${project.accent}-800/20 border border-${project.accent}-400/20`}
                            >
                              <div className="text-sm text-gray-300">
                                {tech}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-xl"></div>
                        <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-purple-500/10 blur-lg"></div>
                      </div>
                    </div>
                  ) : (
                    // Code Visualization
                    <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm">
                      <div className="absolute inset-0 p-6 font-mono">
                        <div className="text-sm text-gray-400">
                          <div className="mb-2">
                            <span className="text-purple-400">function</span>{" "}
                            <span className="text-cyan-400">
                              {project.title.replace(/\s/g, "")}
                            </span>
                            <span className="text-gray-500">() {"{"}</span>
                          </div>
                          <div className="ml-4 mb-1">
                            <span className="text-blue-400">const</span>{" "}
                            <span className="text-emerald-400">techStack</span>{" "}
                            <span className="text-gray-500">= [</span>
                          </div>
                          <div className="ml-8">
                            {project.technologies.map((tech, i) => (
                              <div key={i} className="text-yellow-300">
                                '{tech}'
                                {i < project.technologies.length - 1 ? "," : ""}
                              </div>
                            ))}
                          </div>
                          <div className="ml-4 text-gray-500">];</div>
                          <div className="mt-2 text-gray-500">{"}"}</div>
                        </div>
                      </div>

                      <motion.div
                        animate={{ x: [0, 100, 0], y: [0, 20, 0] }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="absolute bottom-6 right-6 w-3 h-6 bg-cyan-400 rounded-sm"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer CTA with Cosmic Flare */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center pb-32 relative"
        >
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-20"></div>

          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to start your cosmic journey?
          </h3>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-cyan-500/30 transition-all relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            <Sparkles className="w-5 h-5 mr-2" />
            Get In Touch
          </motion.a>

          <div className="mt-8 text-gray-400 text-sm flex items-center justify-center">
            <span className="mr-2">✦</span> Crafted with cosmic energy{" "}
            <span className="ml-2">✦</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;