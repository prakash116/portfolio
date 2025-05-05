import React, { useState, useRef, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  Float,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { Code, Database, Cpu, Smartphone, Globe, Server } from "lucide-react";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in 3D Canvas:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-700 text-center">
          <p className="text-red-400">3D rendering failed. Please refresh.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Custom Text component for icons
const IconText = ({ children, ...props }) => {
  return (
    <Text
      font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
      {...props}
    >
      {children}
    </Text>
  );
};

// 3D Floating Tech Icons Component
const FloatingTechIcons = () => {
  const icons = useRef([]);
  const { viewport } = useThree();

  useFrame((state) => {
    icons.current.forEach((icon, i) => {
      if (icon) {
        icon.position.y =
          Math.sin(state.clock.getElapsedTime() * 0.5 + i * 2) * 0.5;
        icon.rotation.y += 0.01;
      }
    });
  });

  return (
    <>
      {/* MongoDB Icon */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group
          ref={(el) => (icons.current[0] = el)}
          position={[-viewport.width / 3, 1, -2]}
        >
          <mesh>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial
              color="#4DB33D"
              emissive="#4DB33D"
              emissiveIntensity={0.5}
            />
          </mesh>
          <IconText
            position={[0, 0, 0.11]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            MDB
          </IconText>
        </group>
      </Float>

      {/* Express Icon */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <group
          ref={(el) => (icons.current[1] = el)}
          position={[viewport.width / 4, -1, -1]}
        >
          <mesh>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial
              color="#000000"
              emissive="#000000"
              emissiveIntensity={0.5}
            />
          </mesh>
          <IconText
            position={[0, 0, 0.11]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            EX
          </IconText>
        </group>
      </Float>

      {/* React Icon */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2.2}>
        <group ref={(el) => (icons.current[2] = el)} position={[0, 0, -3]}>
          <mesh>
            <boxGeometry args={[1.2, 1.2, 0.2]} />
            <meshStandardMaterial
              color="#61DAFB"
              emissive="#61DAFB"
              emissiveIntensity={0.5}
            />
          </mesh>
          <IconText
            position={[0, 0, 0.11]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            R
          </IconText>
        </group>
      </Float>

      {/* Node.js Icon */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.8}>
        <group
          ref={(el) => (icons.current[3] = el)}
          position={[viewport.width / 3, 0.5, -2]}
        >
          <mesh>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial
              color="#339933"
              emissive="#339933"
              emissiveIntensity={0.5}
            />
          </mesh>
          <IconText
            position={[0, 0, 0.11]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            N
          </IconText>
        </group>
      </Float>
    </>
  );
};

// 3D Background Component
const ServicesBackground = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  const texture = useTexture("/grid-texture.jpg");

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -viewport.height / 2, -10]}
      >
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshStandardMaterial
          color="#1e293b"
          map={texture}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          metalness={0.5}
          roughness={0.7}
        />
      </mesh>

      <Sparkles
        position={[0, 0, -5]}
        count={50}
        speed={0.1}
        opacity={0.6}
        color="#3b82f6"
        size={1.5}
        scale={[viewport.width * 1.5, viewport.height * 1.5, 2]}
      />

      <FloatingTechIcons />
    </>
  );
};

const SERVICES = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description:
      "End-to-end web application development using the MERN stack (MongoDB, Express, React, Node.js)",
    icon: <Code className="w-8 h-8" />,
    color: "#3b82f6",
    features: [
      "Custom web application development",
      "RESTful API design and implementation",
      "Database architecture and optimization",
      "Authentication and authorization systems",
      "Third-party API integrations",
    ],
    technologies: [
      { name: "MongoDB", shortName: "M", color: "#4DB33D" },
      { name: "Express.js", shortName: "E", color: "#000000" },
      { name: "React", shortName: "R", color: "#61DAFB" },
      { name: "Node.js", shortName: "N", color: "#339933" },
      { name: "JavaScript", shortName: "JS", color: "#F7DF1E" },
    ],
  },
  {
    id: 2,
    title: "Frontend Development",
    description:
      "Interactive and responsive user interfaces built with React.js",
    icon: <Smartphone className="w-8 h-8" />,
    color: "#61DAFB",
    features: [
      "React component development",
      "State management with Redux/Context",
      "Responsive UI/UX design",
      "Performance optimization",
      "Progressive Web Apps (PWAs)",
    ],
    technologies: [
      { name: "React", shortName: "R", color: "#61DAFB" },
      { name: "JavaScript", shortName: "JS", color: "#F7DF1E" },
      { name: "HTML5", shortName: "H5", color: "#E34F26" },
      { name: "CSS3", shortName: "C3", color: "#1572B6" },
      { name: "Redux", shortName: "RX", color: "#764ABC" },
      { name: "TypeScript", shortName: "TS", color: "#3178C6" },
    ],
  },
  {
    id: 3,
    title: "Backend Development",
    description: "Scalable server-side applications with Node.js and Express",
    icon: <Server className="w-8 h-8" />,
    color: "#339933",
    features: [
      "RESTful API development",
      "Authentication systems (JWT, OAuth)",
      "Server-side rendering",
      "Middleware development",
      "API documentation (Swagger)",
    ],
    technologies: [
      { name: "Node.js", shortName: "N", color: "#339933" },
      { name: "Express.js", shortName: "E", color: "#000000" },
      { name: "MongoDB", shortName: "M", color: "#4DB33D" },
      { name: "REST", shortName: "REST", color: "#FF6B6B" },
      { name: "JWT", shortName: "JWT", color: "#F7DF1E" },
      { name: "GraphQL", shortName: "GQL", color: "#E10098" },
    ],
  },
  {
    id: 4,
    title: "API Development",
    description: "Custom API development and integration services",
    icon: <Cpu className="w-8 h-8" />,
    color: "#f59e0b",
    features: [
      "Custom API development",
      "Third-party API integration",
      "Webhook implementation",
      "GraphQL API development",
      "API security and rate limiting",
    ],
    technologies: [
      { name: "REST", shortName: "REST", color: "#FF6B6B" },
      { name: "GraphQL", shortName: "GQL", color: "#E10098" },
      { name: "Express.js", shortName: "E", color: "#000000" },
      { name: "Postman", shortName: "PM", color: "#FF6C37" },
      { name: "Swagger", shortName: "SW", color: "#85EA2D" },
      { name: "JWT", shortName: "JWT", color: "#F7DF1E" },
    ],
  },
  {
    id: 5,
    title: "Database Solutions",
    description:
      "MongoDB database design, implementation, and optimization for your applications",
    icon: <Database className="w-8 h-8" />,
    color: "#4DB33D",
    features: [
      "NoSQL database design",
      "Data modeling and schema design",
      "Query optimization",
      "Data migration services",
      "Database security implementation",
    ],
    technologies: [
      { name: "MongoDB", shortName: "M", color: "#4DB33D" },
      { name: "Mongoose", shortName: "MG", color: "#880000" },
      { name: "Redis", shortName: "RD", color: "#DC382D" },
      { name: "Firebase", shortName: "FB", color: "#FFCA28" },
      { name: "SQL", shortName: "SQL", color: "#00758F" },
    ],
  },
  {
    id: 6,
    title: "Deployment & DevOps",
    description: "Application deployment and cloud infrastructure setup",
    icon: <Globe className="w-8 h-8" />,
    color: "#8b5cf6",
    features: [
      "CI/CD pipeline setup",
      "Docker containerization",
      "Cloud deployment (AWS, GCP, Azure)",
      "Serverless architecture",
      "Performance monitoring",
    ],
    technologies: [
      { name: "Docker", shortName: "DK", color: "#2496ED" },
      { name: "AWS", shortName: "AWS", color: "#FF9900" },
      { name: "GitHub Actions", shortName: "GH", color: "#2088FF" },
      { name: "NGINX", shortName: "NX", color: "#009639" },
      { name: "Kubernetes", shortName: "K8", color: "#326CE5" },
      { name: "Vercel", shortName: "VC", color: "#000000" },
    ],
  },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [canvasError, setCanvasError] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Handle WebGL context events
    const canvas = canvasRef.current?.querySelector("canvas");
    if (canvas) {
      const handleContextLost = (event) => {
        event.preventDefault();
        console.warn("WebGL context lost. Attempting to recover...");
        setCanvasError(true);
      };

      const handleContextRestored = () => {
        console.log("WebGL context restored");
        setCanvasError(false);
      };

      canvas.addEventListener("webglcontextlost", handleContextLost);
      canvas.addEventListener("webglcontextrestored", handleContextRestored);

      return () => {
        window.removeEventListener("resize", handleResize);
        canvas.removeEventListener("webglcontextlost", handleContextLost);
        canvas.removeEventListener(
          "webglcontextrestored",
          handleContextRestored
        );
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 -z-10" ref={canvasRef}>
        <ErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 50 }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight
                position={[-10, -10, -10]}
                color="#f59e0b"
                intensity={0.5}
              />
              {!canvasError && <ServicesBackground />}
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={!isMobile}
              />
            </Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Show fallback if canvas fails */}
      {canvasError && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 -z-10"></div>
      )}

      <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg">
              MERN Stack Services
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white sm:text-6xl mb-6"
          >
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Comprehensive MERN stack solutions tailored to your business needs
          </motion.p>
        </motion.div>

        {/* Services Tabs (Mobile) */}
        {isMobile && (
          <div className="mb-8">
            <div className="flex overflow-x-auto pb-2 space-x-2">
              {SERVICES.map((service, index) => (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    activeTab === index
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {service.title.split(" ")[0]}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services List (Desktop) */}
          {!isMobile && (
            <div className="space-y-4">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveTab(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-xl cursor-pointer transition-all ${
                    activeTab === index
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30"
                      : "bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="p-3 rounded-lg mr-4"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Service Details */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 h-full">
                <div className="flex items-center mb-6">
                  <div
                    className="p-3 rounded-lg mr-4"
                    style={{
                      backgroundColor: `${SERVICES[activeTab].color}20`,
                    }}
                  >
                    {SERVICES[activeTab].icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {SERVICES[activeTab].title}
                    </h2>
                    <p className="text-gray-300">
                      {SERVICES[activeTab].description}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {SERVICES[activeTab].features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 mt-1 mr-3">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: SERVICES[activeTab].color,
                            }}
                          ></div>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {SERVICES[activeTab].technologies?.map((tech, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="flex items-center px-4 py-2 bg-gray-700/50 rounded-lg"
                        style={{ borderLeft: `3px solid ${tech.color}` }}
                      >
                        <span
                          className="mr-2 font-bold"
                          style={{ color: tech.color }}
                        >
                          {tech.shortName}
                        </span>
                        <span className="text-white">{tech.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
