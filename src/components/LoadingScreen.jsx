"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

export const LOADING_DURATION_MS = 3200;

const EASE_OUT = [0.22, 1, 0.36, 1];
const TELEMETRY = [
  ["CORE PRESSURE", "97%"],
  ["SIGNAL LOCK", "STABLE"],
  ["ACCESS STATE", "ARMED"],
];

const seededValue = (index, salt = 0) => {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

function DangerCoreScene({ reduceMotion }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode || reduceMotion) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0, 8.7);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mountNode.appendChild(renderer.domElement);

    scene.fog = new THREE.FogExp2(0x050000, 0.075);
    scene.add(new THREE.AmbientLight(0xff2a00, 0.34));

    const keyLight = new THREE.PointLight(0xff2400, 14, 22, 1.8);
    keyLight.position.set(3, 2.5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffb000, 8, 18, 2);
    rimLight.position.set(-4, -2, 3);
    scene.add(rimLight);

    const reactor = new THREE.Group();
    scene.add(reactor);

    const coreGeometry = new THREE.IcosahedronGeometry(1.12, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x130202,
      emissive: 0xd81800,
      emissiveIntensity: 1.8,
      metalness: 0.78,
      roughness: 0.24,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    reactor.add(core);

    const cageGeometry = new THREE.IcosahedronGeometry(1.34, 1);
    const cageMaterial = new THREE.MeshBasicMaterial({
      color: 0xff4d22,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
    });
    const cage = new THREE.Mesh(cageGeometry, cageMaterial);
    reactor.add(cage);

    const innerGeometry = new THREE.SphereGeometry(0.78, 32, 32);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xff2600,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const innerGlow = new THREE.Mesh(innerGeometry, innerMaterial);
    reactor.add(innerGlow);

    const ringSpecs = [
      { radius: 1.86, tube: 0.025, color: 0xff2a00, tilt: [0.25, 0.5, 0] },
      { radius: 2.35, tube: 0.018, color: 0xff7a00, tilt: [1.15, 0.2, 0.7] },
      { radius: 2.82, tube: 0.012, color: 0xff1f00, tilt: [0.75, 1.25, 0.2] },
    ];
    const rings = ringSpecs.map((spec) => {
      const geometry = new THREE.TorusGeometry(spec.radius, spec.tube, 10, 160);
      const material = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.set(...spec.tilt);
      reactor.add(ring);
      return { ring, geometry, material };
    });

    const particleCount = 420;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);
    for (let index = 0; index < particleCount; index += 1) {
      const distance = 2.2 + seededValue(index, 1) * 8;
      const angle = seededValue(index, 2) * Math.PI * 2;
      const offset = index * 3;
      particlePositions[offset] = Math.cos(angle) * distance;
      particlePositions[offset + 1] = (seededValue(index, 3) - 0.5) * 7;
      particlePositions[offset + 2] = Math.sin(angle) * distance * 0.48 - seededValue(index, 4) * 4;
      particleSpeeds[index] = 0.35 + seededValue(index, 5) * 0.8;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff4b18,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);

    const shardGeometry = new THREE.TetrahedronGeometry(0.12, 0);
    const shards = Array.from({ length: 20 }, (_, index) => {
      const material = new THREE.MeshBasicMaterial({
        color: index % 3 === 0 ? 0xffa000 : 0xff2600,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const shard = new THREE.Mesh(shardGeometry, material);
      const angle = seededValue(index, 6) * Math.PI * 2;
      const radius = 3.3 + seededValue(index, 7) * 3.8;
      shard.position.set(
        Math.cos(angle) * radius,
        (seededValue(index, 8) - 0.5) * 5.2,
        Math.sin(angle) * 1.8,
      );
      shard.userData = {
        speed: 0.2 + seededValue(index, 9) * 0.6,
        phase: angle,
        radius,
      };
      scene.add(shard);
      return { shard, material };
    });

    const clock = new THREE.Clock();
    let frameId;

    const resize = () => {
      const width = mountNode.clientWidth || window.innerWidth;
      const height = mountNode.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const pulse = 1 + Math.sin(elapsed * 7) * 0.055;

      reactor.rotation.y = elapsed * 0.42;
      reactor.rotation.x = Math.sin(elapsed * 0.65) * 0.16;
      core.rotation.x += 0.007;
      core.rotation.z -= 0.005;
      cage.rotation.y -= 0.014;
      cage.rotation.z += 0.009;
      innerGlow.scale.setScalar(pulse * 1.08);
      coreMaterial.emissiveIntensity = 1.65 + Math.sin(elapsed * 7) * 0.45;

      rings.forEach(({ ring }, index) => {
        ring.rotation.z += (index % 2 === 0 ? 1 : -1) * (0.009 + index * 0.004);
        ring.rotation.y += 0.003 + index * 0.0015;
      });

      particleField.rotation.y = elapsed * 0.055;
      particleField.rotation.z = Math.sin(elapsed * 0.3) * 0.06;

      const positions = particleGeometry.attributes.position.array;
      for (let index = 0; index < particleCount; index += 1) {
        const offset = index * 3;
        positions[offset + 2] += particleSpeeds[index] * 0.018;
        if (positions[offset + 2] > 4.5) positions[offset + 2] = -8;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      shards.forEach(({ shard }, index) => {
        const orbit = elapsed * shard.userData.speed * 0.15 + shard.userData.phase;
        shard.position.x = Math.cos(orbit) * shard.userData.radius;
        shard.position.z = Math.sin(orbit) * 2.2;
        shard.rotation.x += 0.012 + index * 0.0002;
        shard.rotation.y -= 0.016;
      });

      camera.position.z = 8.7 - Math.min(elapsed * 0.16, 0.55);
      renderer.render(scene, camera);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
      coreGeometry.dispose();
      coreMaterial.dispose();
      cageGeometry.dispose();
      cageMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      shardGeometry.dispose();
      rings.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      shards.forEach(({ material }) => material.dispose());
      renderer.dispose();
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [reduceMotion]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}

function Corner({ className }) {
  return (
    <div
      className={`absolute h-10 w-10 border-red-500/70 sm:h-14 sm:w-14 ${className}`}
      aria-hidden="true"
    />
  );
}

export default function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const seconds = LOADING_DURATION_MS / 1000;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Entering Prakash Mani portfolio"
      className="fixed inset-0 z-[60] isolate overflow-hidden bg-[#030303] font-mono text-white"
      initial={{ opacity: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 1.08, filter: "blur(10px) brightness(1.8)" }
      }
      transition={{ duration: 0.72, ease: EASE_OUT }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,27,27,0.28),transparent_34%),linear-gradient(135deg,#030303_0%,#120202_48%,#020202_100%)]" />
      <DangerCoreScene reduceMotion={reduceMotion} />

      <div
        className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(239,68,68,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.13)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_74%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(255,255,255,0.018)_4px)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_22%,rgba(0,0,0,0.88)_100%)]"
        aria-hidden="true"
      />

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 z-20 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-[0_0_22px_rgba(239,68,68,0.9)]"
          initial={{ top: "-5%", opacity: 0 }}
          animate={{ top: "105%", opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 1.45, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-x-0 top-0 h-2 bg-[repeating-linear-gradient(135deg,#ef2b13_0px,#ef2b13_10px,#120202_10px,#120202_20px)] opacity-85" />
      <div className="absolute inset-x-0 bottom-0 h-2 bg-[repeating-linear-gradient(135deg,#ef2b13_0px,#ef2b13_10px,#120202_10px,#120202_20px)] opacity-85" />

      <Corner className="left-5 top-7 border-l-2 border-t-2 sm:left-10 sm:top-12" />
      <Corner className="right-5 top-7 border-r-2 border-t-2 sm:right-10 sm:top-12" />
      <Corner className="bottom-7 left-5 border-b-2 border-l-2 sm:bottom-12 sm:left-10" />
      <Corner className="bottom-7 right-5 border-b-2 border-r-2 sm:bottom-12 sm:right-10" />

      <div className="absolute left-7 top-10 hidden w-52 text-[9px] uppercase tracking-[0.25em] text-red-200/55 lg:block">
        <p className="mb-5 text-red-400/90">{"// Reactor telemetry"}</p>
        <div className="space-y-4">
          {TELEMETRY.map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.12 }}
            >
              <div className="mb-1.5 flex justify-between">
                <span>{label}</span>
                <span className="text-orange-300">{value}</span>
              </div>
              <div className="h-px overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-orange-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  style={{ originX: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 + index * 0.12 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute right-7 top-10 hidden text-right text-[9px] uppercase leading-6 tracking-[0.24em] text-red-200/45 lg:block">
        <p className="text-red-400/90">Sector PM-87</p>
        <p>Gateway 00 / Root</p>
        <p>Threat protocol active</p>
        <p className="mt-3 text-orange-300/80">Identity verified</p>
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          className="flex w-full max-w-3xl flex-col items-center text-center"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.84, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <motion.div
            className="mb-5 inline-flex items-center gap-3 border border-red-500/25 bg-red-950/30 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.34em] text-red-300 backdrop-blur-md sm:text-[10px]"
            animate={reduceMotion ? undefined : { borderColor: ["rgba(239,68,68,.2)", "rgba(251,146,60,.65)", "rgba(239,68,68,.2)"] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          >
            <span className="relative flex h-2 w-2">
              {!reduceMotion && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,1)]" />
            </span>
            Threat level / critical
          </motion.div>

          <motion.p
            className="mb-2 text-[10px] font-semibold uppercase tracking-[0.46em] text-orange-200/60 sm:text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Authorization accepted
          </motion.p>

          <motion.h1
            className="relative text-5xl font-black uppercase leading-none tracking-[-0.055em] text-white [text-shadow:0_0_34px_rgba(239,68,68,0.42)] sm:text-7xl md:text-8xl"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, letterSpacing: "0.12em", filter: "blur(8px)" }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, letterSpacing: "-0.055em", filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE_OUT }}
          >
            Danger
            <span className="block bg-gradient-to-r from-red-600 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Entry Mode
            </span>
          </motion.h1>

          <motion.div
            className="mt-5 flex items-center gap-3 text-[9px] uppercase tracking-[0.34em] text-white/38 sm:text-[10px]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <span className="h-px w-8 bg-red-500/60 sm:w-14" />
            Prakash Mani / Portfolio
            <span className="h-px w-8 bg-red-500/60 sm:w-14" />
          </motion.div>

          <div className="mt-9 w-full max-w-md">
            <div className="mb-2 flex items-center justify-between text-[8px] uppercase tracking-[0.3em] text-red-200/45 sm:text-[9px]">
              <span>Opening secure gateway</span>
              <span className="text-orange-300/80">PM//001</span>
            </div>
            <div className="relative h-2 overflow-hidden border border-red-500/25 bg-black/55 p-[2px]">
              <motion.div
                className="h-full w-full bg-[linear-gradient(90deg,#991b1b_0%,#ef2b13_50%,#fb923c_100%)] shadow-[0_0_20px_rgba(239,68,68,0.8)]"
                style={{ originX: 0 }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: seconds, ease: "easeInOut" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_17px,rgba(0,0,0,0.78)_18px,rgba(0,0,0,0.78)_20px)]" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.p
        className="absolute bottom-10 left-1/2 w-full -translate-x-1/2 px-16 text-center text-[8px] uppercase tracking-[0.28em] text-red-200/35 sm:bottom-12 sm:text-[9px] sm:tracking-[0.42em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.25, 0.75, 0.25] }}
        transition={{ duration: 1.1, repeat: Infinity }}
      >
        Do not close // establishing hostile-environment link
      </motion.p>
    </motion.div>
  );
}
