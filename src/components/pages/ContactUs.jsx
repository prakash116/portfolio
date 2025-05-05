import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Mail } from 'lucide-react';
import ContactFormSection from '../ContactFormSection';
import ContactInfoSection from '../ContactInfoSection';
import FAQSection from '../FAQSection';

// 3D Floating Icons Component (same as before)
const FloatingIcons = () => {
  const icons = useRef([]);
  const { viewport } = useThree();

  useFrame((state) => {
    icons.current.forEach((icon, i) => {
      icon.position.y = Math.sin(state.clock.getElapsedTime() * 0.5 + i * 2) * 0.5;
      icon.rotation.y += 0.01;
    });
  });

  return (
    <>
      {/* Email Icon */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <group
          ref={(el) => (icons.current[0] = el)}
          position={[-viewport.width / 3, 1, -2]}
        >
          <mesh>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
          </mesh>
          <Text
            position={[0, 0, 0.11]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            @
          </Text>
        </group>
      </Float>

      {/* Phone Icon */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <group
          ref={(el) => (icons.current[1] = el)}
          position={[viewport.width / 4, -1, -1]}
        >
          <mesh>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
          </mesh>
          <Text
            position={[0, 0, 0.11]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            📞
          </Text>
        </group>
      </Float>

      {/* Location Icon */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2.2}>
        <group
          ref={(el) => (icons.current[2] = el)}
          position={[0, 0, -3]}
        >
          <mesh>
            <boxGeometry args={[1.2, 1.2, 0.2]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
          </mesh>
          <Text
            position={[0, 0, 0.11]}
            fontSize={0.6}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            📍
          </Text>
        </group>
      </Float>
    </>
  );
};

// 3D Background Component (same as before)
const ContactBackground = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  const texture = useTexture('/portfolio/grid-texture.jpg');

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -viewport.height / 2, -10]}>
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
        count={100}
        speed={0.1}
        opacity={0.8}
        color="#3b82f6"
        size={2}
        scale={[viewport.width * 2, viewport.height * 2, 2]}
      />

      <FloatingIcons />
    </>
  );
};

const ContactUs = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#f59e0b" intensity={0.5} />
          <ContactBackground />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Content */}
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
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg">
              <Mail className="inline w-5 h-5 mr-2" />
              Get In Touch
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white sm:text-6xl mb-6"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Have a project in mind or want to collaborate? Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <ContactFormSection />

          {/* Contact Info and FAQ Sections */}
          <div className="space-y-8">
            <ContactInfoSection />
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;