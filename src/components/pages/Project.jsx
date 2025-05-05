import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
// ... (other imports remain the same)

const ProjectsPage = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const projectsContainerRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // ... (projects array remains the same)

  useEffect(() => {
    // Initialize Three.js only once
    if (!sceneRef.current) {
      // Three.js Scene Setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;
      
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      rendererRef.current = renderer;
      
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
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
        });
        return orbs;
      };
      createTechOrbs();

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Camera Position
      camera.position.z = 40;
      camera.position.y = 0;
    }

    // Animation
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      
      if (sceneRef.current && cameraRef.current && rendererRef.current) {
        const time = Date.now() * 0.001;
        
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
          cameraRef.current.position.y =
            -scrollProgress * (projects.length * 12 - window.innerHeight * 0.1);
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    // Start animation
    animate();

    // Handle resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameIdRef.current);
      
      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // ... (rest of the component remains the same)
};