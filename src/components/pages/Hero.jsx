import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Database,
  Settings,
  Download,
  Eye,
  Mail,
  CodeXml,
  Server,
  Cpu,
} from "lucide-react";
import {
  IoLogoJavascript,
  IoLogoNodejs,
  IoLogoHtml5,
  IoMdImages,
  IoLogoCss3,
  IoIosChatboxes,
} from "react-icons/io";
import {
  SiExpress,
  SiPostman,
  SiSocketdotio,
  SiTypescript,
  SiGraphql,
  SiDocker,
  SiPostgresql,
} from "react-icons/si";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RiTailwindCssFill } from "react-icons/ri";
import {
  FaReact,
  FaGithub,
  FaNpm,
  FaAws,
  FaSwatchbook,
  FaShoppingCart,
  FaCar,
} from "react-icons/fa";
import { CiRoute, CiChat1 } from "react-icons/ci";
import { VscVscodeInsiders } from "react-icons/vsc";
import { GiLift } from "react-icons/gi";
import toast from "react-hot-toast";

const HeroSection = () => {
  const threeContainerRef = useRef(null);
  const [bgMode, setBgMode] = useState(0);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const animationRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);

  const techStack = [
    // Frontend
    {
      name: "HTML5",
      icon: <IoLogoHtml5 className="w-5 h-5" />,
      color: "text-orange-500",
      category: "frontend",
    },
    {
      name: "CSS3",
      icon: <IoLogoCss3 className="w-5 h-5" />,
      color: "text-blue-500",
      category: "frontend",
    },
    {
      name: "JavaScript",
      icon: <IoLogoJavascript className="w-5 h-5" />,
      color: "text-yellow-400",
      category: "frontend",
    },
    {
      name: "Tailwind",
      icon: <RiTailwindCssFill className="w-5 h-5" />,
      color: "text-cyan-400",
      category: "frontend",
    },
    {
      name: "React",
      icon: <FaReact className="w-5 h-5" />,
      color: "text-blue-400",
      category: "frontend",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="w-5 h-5" />,
      color: "text-blue-600",
      category: "frontend",
    },

    // Backend
    {
      name: "Node.js",
      icon: <IoLogoNodejs className="w-5 h-5" />,
      color: "text-green-500",
      category: "backend",
    },
    {
      name: "Express",
      icon: <SiExpress className="w-5 h-5" />,
      color: "text-gray-300",
      category: "backend",
    },
    {
      name: "Socket IO",
      icon: <SiSocketdotio className="w-5 h-5" />,
      color: "text-gray-300",
      category: "backend",
    },
    {
      name: "REST API",
      icon: <CiRoute className="w-5 h-5" />,
      color: "text-gray-300",
      category: "backend",
    },
    {
      name: "GraphQL",
      icon: <SiGraphql className="w-5 h-5" />,
      color: "text-pink-600",
      category: "backend",
    },
    {
      name: "MongoDB",
      icon: <Database className="w-5 h-5" />,
      color: "text-green-400",
      category: "backend",
    },

    // Dev Tools
    {
      name: "Git",
      icon: <FaGithub className="w-5 h-5" />,
      color: "text-white",
      category: "tools",
    },
    {
      name: "Docker",
      icon: <SiDocker className="w-5 h-5" />,
      color: "text-blue-400",
      category: "tools",
    },
    {
      name: "AWS",
      icon: <FaAws className="w-5 h-5" />,
      color: "text-yellow-400",
      category: "tools",
    },
    {
      name: "npm",
      icon: <FaNpm className="w-5 h-5" />,
      color: "text-red-500",
      category: "tools",
    },
    {
      name: "VS Code",
      icon: <VscVscodeInsiders className="w-5 h-5" />,
      color: "text-sky-500",
      category: "tools",
    },
    {
      name: "Postman",
      icon: <SiPostman className="w-5 h-5" />,
      color: "text-orange-500",
      category: "tools",
    },

    // Projects
    {
      name: "E-Commerce",
      icon: <FaShoppingCart className="w-5 h-5" />,
      color: "text-pink-500",
      category: "project",
    },
    {
      name: "LMS",
      icon: <FaSwatchbook className="w-5 h-5" />,
      color: "text-cyan-500",
      category: "project",
    },
    {
      name: "Chat App",
      icon: <IoIosChatboxes className="w-5 h-5" />,
      color: "text-cyan-600",
      category: "project",
    },
    {
      name: "Photo Storage",
      icon: <IoMdImages className="w-5 h-5" />,
      color: "text-indigo-700",
      category: "project",
    },
    {
      name: "Hi-Lift",
      icon: <GiLift className="w-5 h-5" />,
      color: "text-pink-100",
      category: "project",
    },
    {
      name: "Vehicle Renting",
      icon: <FaCar className="w-5 h-5" />,
      color: "text-blue-600",
      category: "project",
    },
  ];

  // Initialize Three.js scene
  const initThree = () => {
    if (!threeContainerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    threeContainerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x3a86ff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create initial background
    createBackground();

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      updateBackground();
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

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      threeContainerRef.current?.removeChild(renderer.domElement);
      cleanUpBackground();
    };
  };

  // Create different background types
  const createBackground = () => {
    cleanUpBackground();

    const scene = sceneRef.current;
    if (!scene) return;

    switch (bgMode) {
      case 0: // Particle System
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 2000;

        const posArray = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.05,
          color: 0x3a86ff,
          transparent: true,
          opacity: 0.8,
        });

        const particlesMesh = new THREE.Points(
          particlesGeometry,
          particlesMaterial
        );
        scene.userData.particles = particlesMesh;
        scene.add(particlesMesh);
        break;

      case 1: // Wireframe Sphere
        const sphereGeometry = new THREE.IcosahedronGeometry(5, 2);
        const sphereMaterial = new THREE.MeshBasicMaterial({
          color: 0x3a0ca3,
          wireframe: true,
          transparent: true,
          opacity: 0.6,
        });

        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.userData.sphere = sphere;
        scene.add(sphere);
        break;

      case 2: // 3D Grid
        const gridSize = 20;
        const gridDivisions = 20;
        const gridHelper = new THREE.GridHelper(
          gridSize,
          gridDivisions,
          0x3a86ff,
          0x3a0ca3
        );
        gridHelper.position.y = -5;
        gridHelper.rotation.x = Math.PI / 2;
        scene.userData.grid = gridHelper;
        scene.add(gridHelper);

        // Add floating cubes
        const cubes = [];
        for (let i = 0; i < 10; i++) {
          const size = Math.random() * 0.5 + 0.3;
          const geometry = new THREE.BoxGeometry(size, size, size);
          const material = new THREE.MeshBasicMaterial({
            color: 0x3a86ff,
            transparent: true,
            opacity: 0.7,
            wireframe: true,
          });
          const cube = new THREE.Mesh(geometry, material);
          cube.position.x = (Math.random() - 0.5) * 15;
          cube.position.y = (Math.random() - 0.5) * 15;
          cube.position.z = (Math.random() - 0.5) * 15;
          cube.userData = {
            speed: Math.random() * 0.02 + 0.01,
            rotationSpeed: Math.random() * 0.02 + 0.01,
          };
          cubes.push(cube);
          scene.add(cube);
        }
        scene.userData.cubes = cubes;
        break;
    }
  };

  // Update background animations
  const updateBackground = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    switch (bgMode) {
      case 0: // Particle System
        if (scene.userData.particles) {
          scene.userData.particles.rotation.x += 0.0005;
          scene.userData.particles.rotation.y += 0.0005;
        }
        break;

      case 1: // Wireframe Sphere
        if (scene.userData.sphere) {
          scene.userData.sphere.rotation.x += 0.005;
          scene.userData.sphere.rotation.y += 0.005;
        }
        break;

      case 2: // 3D Grid
        if (scene.userData.cubes) {
          scene.userData.cubes.forEach((cube) => {
            cube.position.y += cube.userData.speed;
            cube.rotation.x += cube.userData.rotationSpeed;
            cube.rotation.y += cube.userData.rotationSpeed;

            if (cube.position.y > 10) cube.position.y = -10;
          });
        }
        break;
    }
  };

  // Clean up previous background
  const cleanUpBackground = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (scene.userData.particles) {
      scene.remove(scene.userData.particles);
      scene.userData.particles.geometry.dispose();
      scene.userData.particles.material.dispose();
      delete scene.userData.particles;
    }

    if (scene.userData.sphere) {
      scene.remove(scene.userData.sphere);
      scene.userData.sphere.geometry.dispose();
      scene.userData.sphere.material.dispose();
      delete scene.userData.sphere;
    }

    if (scene.userData.grid) {
      scene.remove(scene.userData.grid);
      scene.userData.grid.geometry.dispose();
      scene.userData.grid.material.dispose();
      delete scene.userData.grid;
    }

    if (scene.userData.cubes) {
      scene.userData.cubes.forEach((cube) => {
        scene.remove(cube);
        cube.geometry.dispose();
        cube.material.dispose();
      });
      delete scene.userData.cubes;
    }
  };

  // Cycle through background modes
  const cycleBackground = () => {
    setBgMode((prev) => (prev + 1) % 3);
  };

  useEffect(() => {
    initThree();
  }, []);

  useEffect(() => {
    createBackground();
  }, [bgMode]);

  const downloadResume = () => {
    try {
      const resumeUrl = "/portfolio/PRAKASH.pdf";
      const link = document.createElement("a");
      fetch(resumeUrl)
        .then((response) => {
          if (!response.ok) throw new Error("File missing");
          link.href = resumeUrl;
          link.download = "Prakash Mani CV.pdf";
          toast.success("Resume Downloaded")
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          toast.error("Sorry, resume is currently unavailable");
          console.error(error);
        });
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <section className="relative overflow-hidden  bg-gradient-to-br from-gray-800/70 via-purple-900/30 to-violet-800/50 min-h-screen flex flex-col lg:flex-row">
      {/* Three.js container */}
      <div ref={threeContainerRef} className="absolute inset-0 z-0" />

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />

      {/* Animated binary code background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-white/30"
            style={{
              fontSize: `${Math.random() * 1 + 0.5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.8, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
      </div>

      {/* Floating tech stack icons */}
      <div className="absolute inset-0 overflow-hidden">
        {techStack.map((tech, i) => (
          <motion.div
            key={i}
            className={`absolute ${tech.color}`}
            style={{
              fontSize: `${Math.random() * 3 + 1}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {tech.icon}
          </motion.div>
        ))}
      </div>

      {/* Background toggle button */}
      <motion.button
        onClick={cycleBackground}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-8 right-8 z-20 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white"
        title="Change background"
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Left Container - Introduction */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 flex flex-col items-center"
          >
            <motion.div
              className="inline-block px-4 py-1 mb-4 text-xs font-medium text-white bg-white/10 rounded-full backdrop-blur-md border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              FULL-STACK MERN DEVELOPER
            </motion.div>

            <motion.h1 className="text-4xl flex justify-center items-center font-bold leading-tight sm:text-5xl text-white">
              <center className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Hi, I'm Prakash Mani
              </center>
            </motion.h1>

            <motion.center className="text-3xl flex justify-center items-center font-bold mt-4 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Modern Web Solutions Architect
            </motion.center>

            <motion.center
              className="mt-6 mb-8 text-lg text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I craft scalable, performant web applications with cutting-edge
              technologies. Passionate about creating seamless user experiences
              and robust backend systems.
            </motion.center>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <NavLink to="/project">
                <motion.button
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0, 255, 255, 0.3)",
                    background: "linear-gradient(to right, #00d2ff, #3a7bd5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-lg transition-all border border-white/20 flex items-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View Projects
                </motion.button>
              </NavLink>
              <NavLink to="/contact">
                <motion.button
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px rgba(74, 222, 128, 0.3)",
                    background: "linear-gradient(to right, #10b981, #3b82f6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-lg shadow-lg transition-all border border-white/20 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Hire Me
                </motion.button>
              </NavLink>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Container - Tech Stack */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center p-8 bg-black/10 backdrop-blur-sm border-l border-white/10">
        <div className="max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <CodeXml className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                My Tech Stack
              </h3>
            </div>

            {/* Tech Stack Categories */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              <div
                className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                onMouseEnter={() => setHoveredTech("frontend")}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <h4 className="font-medium text-blue-400">Frontend</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack
                    .filter((t) => t.category === "frontend")
                    .map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          tech.color
                        } ${
                          hoveredTech === "frontend"
                            ? "bg-white/10"
                            : "bg-white/5"
                        }`}
                      >
                        {tech.icon}
                        <span className="text-xs font-medium text-white">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>

              <div
                className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                onMouseEnter={() => setHoveredTech("backend")}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                  <h4 className="font-medium text-purple-400">Backend</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack
                    .filter((t) => t.category === "backend")
                    .map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          tech.color
                        } ${
                          hoveredTech === "backend"
                            ? "bg-white/10"
                            : "bg-white/5"
                        }`}
                      >
                        {tech.icon}
                        <span className="text-xs font-medium text-white">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>

              <div
                className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                onMouseEnter={() => setHoveredTech("tools")}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <h4 className="font-medium text-yellow-400">Dev Tools</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack
                    .filter((t) => t.category === "tools")
                    .map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          tech.color
                        } ${
                          hoveredTech === "tools" ? "bg-white/10" : "bg-white/5"
                        }`}
                      >
                        {tech.icon}
                        <span className="text-xs font-medium text-white">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>

              <div
                className="p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                onMouseEnter={() => setHoveredTech("fullstack")}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <h4 className="font-medium text-green-400">Projects</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack
                    .filter((t) => t.category === "project")
                    .map((tech, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                          tech.color
                        } ${
                          hoveredTech === "fullstack"
                            ? "bg-white/10"
                            : "bg-white/5"
                        }`}
                      >
                        {tech.icon}
                        <span className="text-xs font-medium text-white">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Cpu className="w-5 h-5 text-purple-400" />
                  <h4 className="font-medium text-purple-400">
                    Frontend Mastery
                  </h4>
                </div>
                <p className="text-sm text-white/70">
                  Interactive UIs, Responsive design, State management, and
                  Performance optimization
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Server className="w-5 h-5 text-blue-400" />
                  <h4 className="font-medium text-blue-400">
                    Backend Expertise
                  </h4>
                </div>
                <p className="text-sm text-white/70">
                  Scalable APIs, Database design, Authentication, and Cloud
                  deployment
                </p>
              </div>
            </div>

            {/* Download Resume */}
            <motion.button
              onClick={downloadResume}
              whileHover={{
                y: -5,
                background: "rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-6 px-6 py-3 text-lg font-semibold text-white border-2 border-white/30 rounded-lg bg-white/5 backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Full Resume
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
