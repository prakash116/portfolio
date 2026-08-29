"use client";

import { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Mail } from 'lucide-react';
import * as THREE from 'three';
import ContactFormSection from '../ContactFormSection';
import ContactInfoSection from '../ContactInfoSection';
import FAQSection from '../FAQSection';

const NETWORK_NODES = [
  { position: [-4.5, 1.8, -2.3], color: '#67e8f9', orbit: [0.38, 0.22, 1.1] },
  { position: [-1.6, 3.1, -1.6], color: '#7dd3fc', orbit: [0.24, 0.14, 0.6] },
  { position: [2.1, 2.5, -2.2], color: '#a5b4fc', orbit: [0.28, 0.18, 1.9] },
  { position: [4.6, 0.5, -2.8], color: '#c084fc', orbit: [0.33, 0.2, 2.3] },
  { position: [1.8, -2.3, -1.9], color: '#38bdf8', orbit: [0.27, 0.16, 3.4] },
  { position: [-2.9, -2.8, -2.6], color: '#22d3ee', orbit: [0.31, 0.15, 2.8] },
];

const NETWORK_LINKS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 2],
  [1, 4],
  [2, 5],
];

const seededValue = (index, salt) => {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const WaveGrid = () => {
  const meshRef = useRef(null);
  const grid = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(34, 28, 48, 40);
    const basePositions = Float32Array.from(geometry.attributes.position.array);
    return { geometry, basePositions };
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    const time = state.clock.getElapsedTime();
    const positions = mesh.geometry.attributes.position;

    for (let index = 0; index < positions.count; index += 1) {
      const offset = index * 3;
      const x = grid.basePositions[offset];
      const y = grid.basePositions[offset + 1];
      const ripple =
        Math.sin(x * 0.38 + time * 1.15) * 0.28 +
        Math.cos(y * 0.46 - time * 0.9) * 0.24 +
        Math.sin((x + y) * 0.2 + time * 0.55) * 0.12;

      positions.array[offset + 2] = grid.basePositions[offset + 2] + ripple;
    }

    positions.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={grid.geometry}
      position={[0, -6.5, -10]}
      rotation={[-1.18, 0, 0]}
    >
      <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.16} />
    </mesh>
  );
};

const ParticleField = () => {
  const pointsRef = useRef(null);
  const particles = useMemo(() => {
    const count = 420;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = [];
    const cyan = new THREE.Color('#67e8f9');
    const blue = new THREE.Color('#60a5fa');
    const violet = new THREE.Color('#c084fc');

    for (let index = 0; index < count; index += 1) {
      const radius = 3.8 + seededValue(index, 1) * 8.8;
      const angle = seededValue(index, 2) * Math.PI * 2;
      const y = (seededValue(index, 3) - 0.5) * 10.5;
      const depth = -6 - seededValue(index, 4) * 10;
      const speed = 0.08 + seededValue(index, 5) * 0.18;
      const phase = seededValue(index, 6) * Math.PI * 2;
      const drift = 0.15 + seededValue(index, 7) * 0.5;
      const bobRange = 0.08 + seededValue(index, 8) * 0.22;
      const bobSpeed = 0.8 + seededValue(index, 9) * 0.7;
      const color = cyan
        .clone()
        .lerp(seededValue(index, 10) > 0.65 ? violet : blue, seededValue(index, 11));
      const offset = index * 3;

      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = y;
      positions[offset + 2] = Math.sin(angle) * radius * 0.55 + depth;

      colors[offset] = color.r;
      colors[offset + 1] = color.g;
      colors[offset + 2] = color.b;

      seeds.push({ radius, angle, y, depth, speed, phase, drift, bobRange, bobSpeed });
    }

    return { positions, colors, seeds };
  }, []);

  useFrame((state) => {
    const cloud = pointsRef.current;

    if (!cloud) {
      return;
    }

    const time = state.clock.getElapsedTime();
    const attribute = cloud.geometry.attributes.position;

    particles.seeds.forEach((seed, index) => {
      const offset = index * 3;
      const orbit = seed.angle + time * seed.speed;
      const radius = seed.radius + Math.sin(time * 0.7 + seed.phase) * seed.drift;

      attribute.array[offset] = Math.cos(orbit) * radius;
      attribute.array[offset + 1] =
        seed.y + Math.sin(time * seed.bobSpeed + seed.phase) * seed.bobRange;
      attribute.array[offset + 2] =
        Math.sin(orbit) * radius * 0.55 +
        seed.depth +
        Math.cos(time * 0.45 + seed.phase) * seed.drift * 1.6;
    });

    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};

const SignalCore = () => {
  const clusterRef = useRef(null);
  const shellRef = useRef(null);
  const ringRefs = useRef([]);
  const lineRef = useRef(null);
  const nodeRefs = useRef([]);
  const linePositions = useMemo(
    () => new Float32Array(NETWORK_LINKS.length * 2 * 3),
    []
  );

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (clusterRef.current) {
      clusterRef.current.rotation.y += delta * 0.16;
      clusterRef.current.rotation.x = Math.sin(time * 0.25) * 0.08;
      clusterRef.current.position.y = Math.sin(time * 0.6) * 0.24;
    }

    if (shellRef.current) {
      shellRef.current.rotation.x += delta * 0.28;
      shellRef.current.rotation.y -= delta * 0.18;
      const pulse = 1 + Math.sin(time * 1.45) * 0.05;
      shellRef.current.scale.setScalar(pulse);
    }

    ringRefs.current.forEach((ring, index) => {
      if (!ring) {
        return;
      }

      ring.rotation.z += delta * (index % 2 === 0 ? 0.12 : -0.18);
      ring.rotation.x = Math.sin(time * 0.45 + index) * 0.45;
      ring.rotation.y = Math.cos(time * 0.35 + index * 0.8) * 0.55;
    });

    nodeRefs.current.forEach((node, index) => {
      if (!node) {
        return;
      }

      const [x, y, z] = NETWORK_NODES[index].position;
      const [orbitX, orbitY, phase] = NETWORK_NODES[index].orbit;

      node.position.set(
        x + Math.sin(time * 0.8 + phase) * orbitX,
        y + Math.cos(time * 1.1 + phase) * orbitY,
        z + Math.sin(time * 0.6 + phase) * orbitX * 0.5
      );

      const pulse = 1 + Math.sin(time * 2 + phase) * 0.12;
      node.scale.setScalar(pulse);
    });

    if (lineRef.current) {
      NETWORK_LINKS.forEach(([startIndex, endIndex], index) => {
        const start = nodeRefs.current[startIndex]?.position;
        const end = nodeRefs.current[endIndex]?.position;
        const offset = index * 6;

        if (!start || !end) {
          return;
        }

        linePositions[offset] = start.x;
        linePositions[offset + 1] = start.y;
        linePositions[offset + 2] = start.z;
        linePositions[offset + 3] = end.x;
        linePositions[offset + 4] = end.y;
        linePositions[offset + 5] = end.z;
      });

      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={clusterRef} position={[3.2, 1.9, -2.8]} scale={1.08}>
      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.55}>
        <group ref={shellRef}>
          <mesh>
            <icosahedronGeometry args={[1.28, 1]} />
            <meshStandardMaterial
              color="#8be9fd"
              emissive="#0ea5e9"
              emissiveIntensity={0.9}
              roughness={0.2}
              metalness={0.15}
              wireframe
            />
          </mesh>
          <mesh scale={0.72}>
            <sphereGeometry args={[1.82, 48, 48]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.055} />
          </mesh>
        </group>
      </Float>

      {[2.3, 3.25, 4.2].map((radius, index) => (
        <mesh
          key={radius}
          ref={(element) => {
            ringRefs.current[index] = element;
          }}
          rotation={[0.6 + index * 0.2, 0.2 + index * 0.15, index * 0.4]}
        >
          <torusGeometry args={[radius, 0.03, 16, 160]} />
          <meshBasicMaterial
            color={index === 1 ? '#c084fc' : '#38bdf8'}
            transparent
            opacity={index === 1 ? 0.16 : 0.22}
          />
        </mesh>
      ))}

      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#7dd3fc" transparent opacity={0.5} />
      </lineSegments>

      {NETWORK_NODES.map((node, index) => (
        <mesh
          key={node.color}
          ref={(element) => {
            nodeRefs.current[index] = element;
          }}
        >
          <sphereGeometry args={[0.11, 24, 24]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={2.3}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
};

const ContactScene = () => {
  return (
    <>
      <color attach="background" args={['#040816']} />
      <fog attach="fog" args={['#040816', 10, 28]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight intensity={0.4} color="#d8f3ff" groundColor="#020617" />
      <pointLight position={[5, 4, 8]} intensity={1.8} color="#38bdf8" />
      <pointLight position={[-6, -4, 5]} intensity={1.2} color="#c084fc" />
      <spotLight position={[0, 8, 10]} angle={0.34} intensity={1.4} penumbra={1} color="#67e8f9" />

      <ParticleField />
      <WaveGrid />
      <SignalCore />

      <mesh position={[-8.5, 4.6, -12]}>
        <sphereGeometry args={[4.8, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.12} />
      </mesh>

      <mesh position={[8.4, -1.2, -13]}>
        <sphereGeometry args={[5.4, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.12} />
      </mesh>

      <mesh position={[0.4, 6.2, -16]} rotation={[0.4, 0.15, 0]}>
        <ringGeometry args={[2.8, 3.3, 64]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.14} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

const ContactUs = () => {
  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#040816]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.4, 13], fov: 46 }}
          gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
          className="h-full w-full"
        >
          <ContactScene />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_16%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_80%_22%,rgba(96,165,250,0.08),transparent_18%),radial-gradient(circle_at_50%_72%,rgba(168,85,247,0.08),transparent_26%),linear-gradient(180deg,rgba(3,8,20,0.08)_0%,rgba(4,8,22,0.28)_55%,rgba(3,6,18,0.58)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-25 [background-image:linear-gradient(rgba(125,211,252,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.08)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-[8%] top-[12%] h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-[8%] top-[24%] h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-[62%] h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/8 blur-3xl" />
      </div>

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
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl" />
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg shadow-cyan-500/20 border border-white/10">
              <Mail className="inline w-5 h-5 mr-2" />
              Get In Touch
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white sm:text-6xl mb-6 tracking-tight"
          >
            Contact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Me
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300/90 max-w-3xl mx-auto leading-relaxed"
          >
            Have a project in mind or want to collaborate? Feel free to reach out!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-8 flex max-w-max items-center gap-3 rounded-full border border-cyan-400/15 bg-slate-950/35 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-100/70 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
            Live Signal Background
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <ContactFormSection />
          <ContactInfoSection />
        </div>

        <div className="mt-8 lg:mt-10">
          <FAQSection />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
