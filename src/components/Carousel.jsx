import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import {
  FaCode,
  FaArrowRight,
  FaArrowLeft,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiJavascript } from "react-icons/si";

// TECH_STACKS array remains the same as in your original code
const TECH_STACKS = [
  {
    id: 1,
    name: "JavaScript",
    icon: <SiJavascript size={40} />,
    description:
      "Versatile scripting language for web development, both client-side and server-side",
    codeExample: `// Arrow function with array methods
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n * n);

console.log(squared); // [1, 4, 9, 16, 25]`,
    proficiency: 95,
    useCases: [
      "Web interactivity",
      "Server-side programming",
      "Mobile app development",
    ],
    projectIdeas: [
      "Interactive web games",
      "Form validation scripts",
      "Dynamic content loaders",
    ],
    color: "#F7DF1E",
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    githubLink: "https://github.com/tc39/ecma262",
  },
  {
    id: 2,
    name: "React",
    icon: <SiReact size={40} />,
    description:
      "Declarative component-based UI library for building interactive interfaces",
    codeExample: `// Functional component with hooks
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    proficiency: 95,
    useCases: [
      "Single page apps",
      "Interactive dashboards",
      "Progressive web apps",
    ],
    projectIdeas: [
      "Task management app",
      "Real-time chat interface",
      "Data visualization dashboard",
    ],
    color: "#61DAFB",
    docsLink: "https://reactjs.org/docs/getting-started.html",
    githubLink: "https://github.com/facebook/react",
  },
  {
    id: 3,
    name: "Node.js",
    icon: <SiNodedotjs size={40} />,
    description:
      "JavaScript runtime built on Chrome's V8 engine for server-side applications",
    codeExample: `// Read a file asynchronously
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFile();`,
    proficiency: 90,
    useCases: ["Backend services", "CLI tools", "Web servers"],
    projectIdeas: ["API gateway", "Web scraper", "Automation scripts"],
    color: "#339933",
    docsLink: "https://nodejs.org/en/docs/",
    githubLink: "https://github.com/nodejs/node",
  },
  {
    id: 4,
    name: "Express.js",
    icon: <SiExpress size={40} />,
    description: "Fast, unopinionated web framework for Node.js",
    codeExample: `// Basic Express server
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
    proficiency: 90,
    useCases: ["REST APIs", "Server-side rendering", "Middleware systems"],
    projectIdeas: [
      "Authentication service",
      "File upload API",
      "Payment gateway integration",
    ],
    color: "#000000",
    docsLink: "https://expressjs.com/",
    githubLink: "https://github.com/expressjs/express",
  },
  {
    id: 5,
    name: "MongoDB",
    icon: <SiMongodb size={40} />,
    description:
      "NoSQL document database with flexible schemas for modern applications",
    codeExample: `// Create a new document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  skills: ["JavaScript", "Node.js"]
});`,
    proficiency: 85,
    useCases: ["User profiles", "Product catalogs", "Content management"],
    projectIdeas: [
      "Blog with user comments",
      "E-commerce product database",
      "Real-time analytics dashboard",
    ],
    color: "#4DB33D",
    docsLink: "https://docs.mongodb.com/",
    githubLink: "https://github.com/mongodb/mongo",
  },

];
const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showCode, setShowCode] = useState(false);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef(null);

  // Check for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Three.js background with floating tech icons - SINGLE INSTANCE
  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up previous renderer if it exists
    if (rendererRef.current) {
      cancelAnimationFrame(animationRef.current);
      containerRef.current.removeChild(rendererRef.current.domElement);
      rendererRef.current.dispose();
    }

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create floating tech icons
    const icons = [];
    const geometries = [
      new THREE.TorusGeometry(0.5, 0.2, 16, 32),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.SphereGeometry(0.6, 32, 32),
      new THREE.ConeGeometry(0.6, 1, 32),
    ];

    TECH_STACKS.forEach((tech, i) => {
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color(tech.color),
        emissive: new THREE.Color(tech.color).multiplyScalar(0.2),
        specular: new THREE.Color(0x111111),
        shininess: 30,
        transparent: true,
        opacity: 0.9,
      });

      const icon = new THREE.Mesh(geometries[i], material);

      // Position in a circular formation
      const angle = (i / TECH_STACKS.length) * Math.PI * 2;
      icon.position.x = Math.cos(angle) * 5;
      icon.position.y = Math.sin(angle) * 3;
      icon.position.z = (Math.random() - 0.5) * 10;

      // Random velocity
      icon.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        angle: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      };

      scene.add(icon);
      icons.push(icon);
    });

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    TECH_STACKS.forEach((tech, i) => {
      const angle = (i / TECH_STACKS.length) * Math.PI * 2;
      const light = new THREE.PointLight(tech.color, 1, 10);
      light.position.set(Math.cos(angle) * 3, Math.sin(angle) * 2, 2);
      scene.add(light);
    });

    camera.position.z = 10;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      icons.forEach((icon) => {
        icon.position.add(icon.userData.velocity);

        if (Math.abs(icon.position.x) > 8) icon.userData.velocity.x *= -1;
        if (Math.abs(icon.position.y) > 5) icon.userData.velocity.y *= -1;
        if (Math.abs(icon.position.z) > 10) icon.userData.velocity.z *= -1;

        icon.userData.angle += icon.userData.rotationSpeed;
        icon.rotation.x = icon.userData.angle;
        icon.rotation.y = icon.userData.angle;
      });

      const currentAngle = (currentIndex / TECH_STACKS.length) * Math.PI * 2;
      const targetX = Math.cos(currentAngle) * 5;
      const targetY = Math.sin(currentAngle) * 3;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      if (
        rendererRef.current &&
        containerRef.current &&
        rendererRef.current.domElement
      ) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  // Update camera position when currentIndex changes
  useEffect(() => {
    if (!sceneRef.current) return;

    // This effect will now just update the camera target based on currentIndex
    // The actual animation happens in the main animation loop
  }, [currentIndex]);

  // Auto-rotate carousel
  useEffect(() => {
    const rotate = () => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TECH_STACKS.length);
    };

    timeoutRef.current = setTimeout(rotate, 8000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  // Navigation functions remain the same
  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TECH_STACKS.length);
    resetTimer();
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + TECH_STACKS.length) % TECH_STACKS.length
    );
    resetTimer();
  };

  const goToIndex = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    resetTimer();
  };

  const resetTimer = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % TECH_STACKS.length);
    }, 8000);
  };

  // Responsive animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? (isMobile ? 300 : 500) : isMobile ? -300 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        scale: { duration: 0.2 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? (isMobile ? 300 : 500) : isMobile ? -300 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const currentTech = TECH_STACKS[currentIndex];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900 text-white">
      {/* Three.js background container */}
      <div ref={containerRef} className="absolute inset-0 z-0 opacity-20" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-gray-900/20 to-gray-900/30" />

      <div className="relative z-10 flex flex-col items-center justify-start pt-16 px-4 pb-5 md:pb-8"> {/* Added pb-20 for mobile and md:pb-8 for desktop */}
        <div className="w-full max-w-6xl mx-auto relative">
          {/* Main carousel content */}
          <div className="relative w-full h-auto min-h-[400px] md:min-h-[500px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex flex-col md:flex-row bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700/50"
              >
                {/* Navigation arrows - more responsive positioning */}
                <button
                  onClick={goToPrev}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-900/80 hover:bg-gray-700 transition-all shadow-lg z-20"
                  aria-label="Previous"
                >
                  <FaArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-900/80 hover:bg-gray-700 transition-all shadow-lg z-20"
                  aria-label="Next"
                >
                  <FaArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Toggle code button */}
                <button
                  onClick={() => setShowCode(!showCode)}
                  className={`absolute top-4 right-4 p-2 md:p-3 rounded-full transition-all shadow-lg z-20 flex items-center ${
                    showCode
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-900/80 hover:bg-gray-700"
                  }`}
                  aria-label="Toggle Code"
                >
                  <FaCode className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                {/* Tech info panel */}
                <div className="flex-1 p-4 md:p-6 flex flex-col">
                  <div className="flex items-center mb-3 md:mb-4">
                    <motion.div
                      className="text-3xl md:text-4xl mr-3"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 20,
                        ease: "linear",
                      }}
                    >
                      {currentTech.icon}
                    </motion.div>
                    <motion.h2
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: currentTech.color }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentTech.name}
                    </motion.h2>
                  </div>

                  <motion.p
                    className="text-gray-300 text-sm md:text-base mb-4 md:mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentTech.description}
                  </motion.p>

                  {/* Proficiency meter */}
                  <motion.div
                    className="mb-4 md:mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex justify-between mb-1 text-sm md:text-base">
                      <span>Proficiency</span>
                      <span>{currentTech.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 md:h-2.5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentTech.proficiency}%` }}
                        transition={{ delay: 0.8, duration: 1 }}
                        style={{ backgroundColor: currentTech.color }}
                      />
                    </div>
                  </motion.div>

                  {/* Use cases */}
                  <motion.div
                    className="mb-4 md:mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <h3 className="text-base md:text-lg font-semibold mb-2">
                      Common Use Cases
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 text-sm md:text-base space-y-1">
                      {currentTech.useCases.map((useCase, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 + i * 0.1 }}
                        >
                          {useCase}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Documentation links */}
                  <motion.div
                    className="mt-auto flex gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <a
                      href={currentTech.docsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      Docs
                    </a>
                    <a
                      href={currentTech.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm px-3 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                    >
                      <FaGithub className="mr-2" />
                      GitHub
                    </a>
                  </motion.div>
                </div>

                {/* Dynamic right panel - better responsive behavior */}
                <div
                  className={`flex-1 bg-gray-900/50 p-4 md:p-6 overflow-auto ${
                    isMobile ? "border-t" : "border-l"
                  } border-gray-700/50`}
                >
                  {showCode ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="h-full"
                    >
                      <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
                        Code Example
                      </h3>
                      <pre className="bg-gray-800 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
                        <code className="text-gray-300 font-mono">
                          {currentTech.codeExample}
                        </code>
                      </pre>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="h-full flex flex-col items-center justify-center text-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="text-5xl md:text-6xl mb-4"
                        style={{ color: currentTech.color }}
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "easeInOut",
                        }}
                      >
                        {currentTech.icon}
                      </motion.div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        Explore {currentTech.name}
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base max-w-md">
                        Click the code button to see examples for{" "}
                        {currentTech.name}
                      </p>
                      <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
                        {currentTech.projectIdeas
                          .slice(0, isMobile ? 2 : 4)
                          .map((idea, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + i * 0.2 }}
                              className="p-3 bg-gray-800/50 rounded-lg text-xs md:text-sm"
                            >
                              {idea}
                            </motion.div>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6 mb-4 md:mb-0"> {/* Added mb-4 for mobile */}
            {TECH_STACKS.map((tech, index) => (
              <motion.button
                key={tech.id}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to ${tech.name}`}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
