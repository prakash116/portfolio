import { motion, useScroll, useTransform } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  Rocket,
  Database,
  Server,
  Cloud,
  Layers,
  CpuIcon,
  Terminal,
  Palette,
  ServerCog,
} from "lucide-react";
import { IoLogoJavascript } from "react-icons/io";
import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import ProfileCard from "../MyInfo";

const AboutPage = () => {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const [webGLError, setWebGLError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);

  // Check WebGL support
  const isWebGLAvailable = useCallback(() => {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }, []);

  // Handle resize function
  const handleResize = useCallback((camera, renderer) => {
    if (!camera || !renderer) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  // Three.js setup
  useEffect(() => {
    if (!mountRef.current || !isWebGLAvailable()) {
      setWebGLError(true);
      return;
    }

    let scene, camera, renderer;
    let animationId;
    let resizeObserver;

    const initThreeJS = () => {
      try {
        // Scene setup
        scene = new THREE.Scene();

        // Camera setup
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );

        // Renderer setup with error handling
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          });
        } catch (rendererError) {
          console.error("WebGLRenderer creation failed:", rendererError);
          setWebGLError(true);
          return;
        }

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Safely append renderer DOM element
        if (mountRef.current && renderer.domElement) {
          mountRef.current.appendChild(renderer.domElement);
        } else {
          setWebGLError(true);
          return;
        }

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

        // Camera Position
        camera.position.z = 40;
        camera.position.y = 0;

        // Animation
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          if (renderer && scene && camera) {
            try {
              renderer.render(scene, camera);
            } catch (error) {
              console.error("Rendering error:", error);
              cancelAnimationFrame(animationId);
              setWebGLError(true);
            }
          }
        };
        animate();

        // Handle resize with observer
        resizeObserver = new ResizeObserver(() => {
          handleResize(camera, renderer);
        });
        resizeObserver.observe(document.body);

        // Handle context lost
        renderer.domElement.addEventListener('webglcontextlost', (event) => {
          console.warn('WebGL context lost');
          event.preventDefault();
          setWebGLError(true);
        }, false);

        renderer.domElement.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored');
          initThreeJS();
        }, false);

      } catch (error) {
        console.error("Three.js initialization error:", error);
        setWebGLError(true);
      }
    };

    initThreeJS();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      if (mountRef.current && renderer?.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of Three.js resources
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [isWebGLAvailable, handleResize]);

  // Education data
  const education = [
    {
      degree: "Bachelor of Technology (CSE)",
      institution: "SR INSTITUTE OF MANAGEMENT & TECHNOLOGY",
      year: "2020-2024",
      description: "Specialized in Web Technologies and Cloud Computing",
      icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
    },
    {
      degree: "Master's in Web Development",
      institution: "DUCAT - Pitampura",
      year: "2024-2025",
      description: "Focus on Software Development and Algorithms",
      icon: <Layers className="w-6 h-6 text-blue-400" />,
    },
  ];

  // Experience data
  const experience = [
    {
      role: "MERN Stack Developer",
      company: "Freelance MERN Stack Developer",
      duration: "Currently",
      responsibilities: [
        "Completed multiple client projects as a freelance MERN Stack Developer.",
        "Built full-stack web apps using MongoDB, Express.js, React, and Node.js",
        "Designed responsive UIs with React.js and Tailwind CSS",
        "Created secure REST APIs and integrated third-party services.",
        "Managed databases and backend logic with Node.js and MongoDB",
        "Fixed bugs and optimized app performance",
      ],
      icon: <Terminal className="w-6 h-6 text-green-400" />,
    },
    {
      role: "MERN Stack Developer Intern",
      company: "DUCAT - Pitampura",
      duration: "Sep 2024 – April 2025",
      responsibilities: [
        "Developed full-stack web applications using MongoDB, Express.js, React, and Node.js",
        "Built reusable components and managed state using React and Redux",
        "Implemented RESTful APIs and handled CRUD operations",
        "Worked on user authentication and authorization using JWT and cookies",
      ],
      icon: <ServerCog className="w-6 h-6 text-green-500" />,
    },
    {
      role: "Frontend Developer Intern",
      company: "Analyze Infotech Pvt. Ltd., Lucknow, Uttar Pradesh",
      duration: "June 2022 | Feb 2023",
      responsibilities: [
        "Built responsive user interfaces using React.js and CSS",
        "Collaborated with backend team to integrate RESTful APIs",
        "Worked on dynamic frontend components and state management",
        "Participated in code reviews and team stand-up meetings",
      ],
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
    },
    {
      role: "Web Designing Intern",
      company: "Internshala",
      duration: "May 2022 – July 2022",
      responsibilities: [
        "Designed website layouts using HTML, CSS, and Bootstrap",
        "Created responsive web pages compatible across devices",
        "Improved UI/UX based on feedback and design principles",
        "Collaborated with mentors to follow industry best practices",
      ],
      icon: <Palette className="w-6 h-6 text-pink-400" />,
    },
  ];

  // Skills data
  const skills = [
    {
      name: "JavaScript",
      level: 95,
      icon: <IoLogoJavascript className="w-5 h-5 text-blue-400" />,
      color: "bg-blue-500",
    },
    {
      name: "React",
      level: 95,
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      color: "bg-cyan-500",
    },
    {
      name: "Node.js",
      level: 90,
      icon: <Server className="w-5 h-5 text-green-400" />,
      color: "bg-green-500",
    },
    {
      name: "MongoDB",
      level: 85,
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      color: "bg-emerald-500",
    },
    {
      name: "Express",
      level: 90,
      icon: <CpuIcon className="w-5 h-5 text-violet-400" />,
      color: "bg-violet-500",
    },
    {
      name: "AWS",
      level: 70,
      icon: <Cloud className="w-5 h-5 text-orange-400" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 overflow-hidden relative"
      style={{ position: 'relative' }} // Ensure container has relative position
    >
      {/* Three.js Canvas */}
      {webGLError ? (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-950 z-0" />
      ) : (
        <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
      )}

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
        {/* Parallax header */}
        <motion.div
          style={{ y: y1 }}
          className="relative pt-32 pb-5 px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg">
                MERN Stack Developer
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white sm:text-6xl mb-6"
          >
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Me
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Crafting digital experiences with cutting-edge technologies and
            innovative solutions.
          </motion.p>
        </motion.div>
        <div className="mb-10">
          <ProfileCard />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
          {/* Education Section */}
          <motion.section
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center mb-12"
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md"></div>
                <div className="relative p-3 rounded-full bg-gray-800 mr-4 border border-gray-700">
                  <GraduationCap className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Education</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-gray-800 p-8 rounded-xl shadow-lg h-full border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-lg bg-gray-700 mr-4">
                          {edu.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {edu.degree}
                          </h3>
                          <p className="text-cyan-400">{edu.institution}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-full text-sm font-medium">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            className="mb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center mb-12"
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md"></div>
                <div className="relative p-3 rounded-full bg-gray-800 mr-4 border border-gray-700">
                  <Briefcase className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Experience</h2>
            </motion.div>

            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <div className="p-2 rounded-lg bg-gray-700 mr-4">
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {exp.role}
                          </h3>
                          <p className="text-green-400">{exp.company}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gray-700 text-green-400 rounded-full text-sm font-medium">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {exp.responsibilities.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * i }}
                          viewport={{ once: true }}
                          className="flex items-start text-gray-300"
                        >
                          <span className="mr-3 mt-1 text-cyan-500">▹</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            className="mb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center mb-12"
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-md"></div>
                <div className="relative p-3 rounded-full bg-gray-800 mr-4 border border-gray-700">
                  <Rocket className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">
                Technical Skills
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                  <div className="relative bg-gray-800 p-6 rounded-xl shadow-lg h-full border border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg bg-gray-700 mr-3`}>
                        {skill.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {skill.name}
                      </h3>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: index * 0.1,
                          type: "spring",
                        }}
                        viewport={{ once: true }}
                        className={`h-2.5 rounded-full ${skill.color}`}
                      />
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                      className="text-sm text-gray-400 text-right"
                    >
                      {skill.level}% proficiency
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Philosophy Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
              <div className="absolute inset-0 border border-cyan-500/30 rounded-3xl pointer-events-none"></div>
              <motion.div
                className="relative z-10 p-12 text-white"
                initial={{ y: 50 }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Development Philosophy
                </h2>
                <motion.p
                  className="text-xl mb-8 max-w-3xl text-gray-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  I believe in creating technology that's not just functional
                  but delightful to use. Every line of code should serve a
                  purpose and every interface should tell a story.
                </motion.p>

                <div className="flex flex-wrap gap-4">
                  {[
                    "Clean Code Principles",
                    "User-Centric Design",
                    "Performance Optimization",
                    "Continuous Learning",
                    "Agile Development",
                    "Collaborative Approach",
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="px-6 py-3 bg-white/5 rounded-full backdrop-blur-sm border border-cyan-500/20 text-cyan-400"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;