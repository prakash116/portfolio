import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber"; // Added useThree import
import { OrbitControls, Float, Sparkles, Text } from "@react-three/drei";
import { Mail, Phone, MapPin, Briefcase } from "lucide-react";
import { FaGraduationCap } from "react-icons/fa";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D Canvas Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl">
          <div className="flex items-center justify-center h-full text-red-400">
            3D rendering failed. Please refresh.
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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

  const techData = [
    { position: [-3, 1, -2], color: "#4DB33D", size: 1, text: "M" },
    { position: [3, -1, -1], color: "#000000", size: 1, text: "E" },
    { position: [0, 0, -3], color: "#61DAFB", size: 1.2, text: "R" },
    { position: [3, 0.5, -2], color: "#339933", size: 1, text: "N" },
  ];

  return (
    <>
      {techData.map((tech, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <group ref={(el) => (icons.current[i] = el)} position={tech.position}>
            <mesh>
              <boxGeometry args={[tech.size, tech.size, 0.2]} />
              <meshStandardMaterial
                color={tech.color}
                emissive={tech.color}
                emissiveIntensity={0.5}
              />
            </mesh>
            <Text
              position={[0, 0, 0.11]}
              fontSize={tech.size * 0.5}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
            >
              {tech.text}
            </Text>
          </group>
        </Float>
      ))}
    </>
  );
};

const ProfileInfoItem = ({ icon, label, value }) => {
  return (
    <motion.div 
      whileHover={{ y: -3 }}
      className="flex items-start gap-3 p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700"
    >
      <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>
      <div className="text-left">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
    </motion.div>
  );
};

const TechBadge = ({ color, text }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-3 py-1 rounded-full flex items-center gap-2"
      style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}
    >
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm font-medium text-white">{text}</span>
    </motion.div>
  );
};

const ProfileCard = () => {
  const [canvasError, setCanvasError] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Attempting to recover...");
      setCanvasError(true);
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
      setCanvasError(false);
    };

    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      }
    };
  }, []);

  return (
    <div className="relative md:h-[50vh] min-h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10 opacity-50" ref={canvasRef}>
        <ErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              preserveDrawingBuffer: true,
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.5} />
            
            {!canvasError && (
              <>
                <FloatingTechIcons />
                <Sparkles
                  position={[0, 0, 0]}
                  count={100}
                  speed={0.1}
                  opacity={0.6}
                  color="#3b82f6"
                  size={2}
                  scale={[20, 20, 10]}
                />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  enableRotate={false} 
                />
              </>
            )}
          </Canvas>
        </ErrorBoundary>
      </div>

      {/* Fallback if canvas fails */}
      {canvasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center">
          <p className="text-red-400">3D rendering unavailable</p>
        </div>
      )}

      {/* Profile Content */}
      <div className="relative z-10 h-full bg-blue-800/10 flex md:gap-30 flex-col lg:flex-row items-center justify-center px-8">
        {/* Profile Image - Increased size */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute rounded-full blur group-hover:opacity-100 transition-opacity"></div>
          <div className="relative h-64 w-64 rounded-full border-4 border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br"></div>
            <img 
              src="/portfolio.prakash.png" 
              alt="Profile"
              className="h-full w-full object-cover mix-blend-luminosity"
            />
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 text-center lg:text-left"
        >
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">Prakash Mani</h1>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-cyan-400">
              <Briefcase className="w-5 h-5" />
              <span className="text-xl font-medium">MERN Stack Developer</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto lg:mx-0">
            <ProfileInfoItem icon={<Mail />} label="Email" value="prakashmanig000@gmail.com" />
            <ProfileInfoItem icon={<Phone />} label="Phone" value="+91 8795901180" />
            <ProfileInfoItem icon={<FaGraduationCap />} label="Qualification" value="Bachelor of Technology - { Computer Science and Technology }" />
            <ProfileInfoItem icon={<MapPin />} label="Address" value="Dubauli, Kushinagar Uttar Pradesh India 274302" />
            <ProfileInfoItem icon={<MapPin />} label="City/State" value="Padrauna, Uttar Pradesh" />
            <ProfileInfoItem icon={<MapPin />} label="Country" value="India" />
          </div>

          {/* Tech Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2"
          >
            <TechBadge color="#4DB33D" text="MongoDB" />
            <TechBadge color="#000000" text="Express" />
            <TechBadge color="#61DAFB" text="React" />
            <TechBadge color="#339933" text="Node.js" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileCard;
