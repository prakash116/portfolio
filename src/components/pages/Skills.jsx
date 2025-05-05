import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Code, Cpu, Database, Server, GitBranch, Layout, Sparkles } from 'lucide-react';
import Carousel from '../Carousel';
import { FaHtml5 } from "react-icons/fa6";
import { FaCss3, FaReact  } from "react-icons/fa";
import { TbBrandRedux } from "react-icons/tb";
import { SiSocketdotio, SiExpress, SiMongodb, SiPostgresql, SiMysql} from "react-icons/si";
import { RiNodejsLine } from "react-icons/ri";



// Language Icons (you can import actual SVG files or use these as placeholders)
const LanguageIcons = {
  HTML: <FaHtml5 color='tomato' size={20}/>,
  CSS: <FaCss3 color='purple ' size={20}/>,
  JavaScript: (
    <svg viewBox="0 0 32 32" className="w-5 h-5">
      <path fill="#F7DF1E" d="M1.612 27.077l2.833-1.715c.545 1.002 1.042 1.85 2.237 1.85 1.141 0 1.863-.464 1.863-2.266V8.776h3.495v16.144c0 3.747-2.195 5.452-5.395 5.452-2.891 0-4.586-1.5-5.033-3.295m13.947-5.452l2.833-1.641c.747 1.227 1.715 2.133 3.422 2.133 1.437 0 2.355-.6 2.355-1.5 0-1.042-.939-1.414-2.52-2.02l-.866-.373c-2.502-1.064-4.164-2.402-4.164-5.227 0-2.602 1.982-4.57 5.082-4.57 2.207 0 3.797.78 4.941 2.824l-2.707 1.736c-.6-1.064-1.242-1.482-2.237-1.482-.993 0-1.623.639-1.623 1.482 0 1.039.63 1.411 2.133 1.982l.866.373c2.948 1.264 4.617 2.554 4.617 5.453 0 3.121-2.446 4.805-5.73 4.805-3.211 0-5.285-1.5-6.3-3.45"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 32 32" className="w-5 h-5">
      <path fill="#007ACC" d="M1.612 27.077l2.833-1.715c.545 1.002 1.042 1.85 2.237 1.85 1.141 0 1.863-.464 1.863-2.266V8.776h3.495v16.144c0 3.747-2.195 5.452-5.395 5.452-2.891 0-4.586-1.5-5.033-3.295m13.947-5.452l2.833-1.641c.747 1.227 1.715 2.133 3.422 2.133 1.437 0 2.355-.6 2.355-1.5 0-1.042-.939-1.414-2.52-2.02l-.866-.373c-2.502-1.064-4.164-2.402-4.164-5.227 0-2.602 1.982-4.57 5.082-4.57 2.207 0 3.797.78 4.941 2.824l-2.707 1.736c-.6-1.064-1.242-1.482-2.237-1.482-.993 0-1.623.639-1.623 1.482 0 1.039.63 1.411 2.133 1.982l.866.373c2.948 1.264 4.617 2.554 4.617 5.453 0 3.121-2.446 4.805-5.73 4.805-3.211 0-5.285-1.5-6.3-3.45"/>
      <path fill="#FFF" d="M15.988 7.108h3.495v16.144h-3.495z"/>
    </svg>
  ),
  React: <FaReact color='cyan ' size={20}/>,
  "Node.js": <RiNodejsLine color='green' size={20}/>,
  MongoDB: <SiMongodb color='darkgreen' size={20}/>,
  PostgreSQL: <SiPostgresql color='white' size={20}/> ,
  "Express.js": <SiExpress color='pantone ' size={20}/>,
  "Tailwind CSS": (
    <svg viewBox="0 0 32 32" className="w-5 h-5">
      <path fill="#38B2AC" d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1z"/>
    </svg>
  ),
  Redux: <TbBrandRedux color='blue ' size={20}/>,
  Zustand: (
    <svg viewBox="0 0 32 32" className="w-5 h-5">
      <path fill="#000000" d="M16 1.612l-4.8 2.688v5.376l-3.2-1.792-1.6.896v7.168l-1.6.896v8.576l1.6.896v.896l-1.6.896v1.792l1.6.896 1.6-.896v-1.792l-1.6-.896v-.896l3.2 1.792v1.792l-1.6.896v1.792l1.6.896 1.6-.896v-1.792l-1.6-.896v-5.376l3.2 1.792v5.376l-1.6.896v1.792l1.6.896 1.6-.896v-1.792l-1.6-.896v-5.376l6.4-3.584v-5.376l1.6-.896v-8.576l-1.6-.896-3.2 1.792v-5.376l-4.8-2.688z"/>
    </svg>
  ),
  "Socket.IO": <SiSocketdotio color='black' size={20}/>,
  MySQL: <SiMysql  color='pink' size={20}/>
};

const SkillsPage = () => {
  const mountRef = useRef(null);
  const skillsContainerRef = useRef(null);

  // Three.js setup
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced cosmic background
    const createStarfield = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        starVertices.push(
          (Math.random() - 0.5) * 2500,
          (Math.random() - 0.5) * 2500,
          (Math.random() - 0.5) * 2500
        );
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      
      // Create different star sizes
      const starsSmall = new THREE.Points(starGeometry, starMaterial);
      scene.add(starsSmall);

      // Medium stars
      const mediumMaterial = starMaterial.clone();
      mediumMaterial.size = 0.2;
      mediumMaterial.color.setHSL(0.6, 0.8, 0.7);
      const starsMedium = new THREE.Points(starGeometry, mediumMaterial);
      scene.add(starsMedium);

      // Large stars (fewer)
      const largeGeometry = new THREE.BufferGeometry();
      const largeVertices = [];
      for (let i = 0; i < 500; i++) {
        largeVertices.push(
          (Math.random() - 0.5) * 2500,
          (Math.random() - 0.5) * 2500,
          (Math.random() - 0.5) * 2500
        );
      }
      largeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(largeVertices, 3));
      const largeMaterial = starMaterial.clone();
      largeMaterial.size = 0.5;
      largeMaterial.color.setHSL(0.1, 0.8, 0.9);
      const starsLarge = new THREE.Points(largeGeometry, largeMaterial);
      scene.add(starsLarge);
    };
    createStarfield();

    // Enhanced nebula effect
    const createNebula = () => {
      // Main nebula
      const nebulaGeometry = new THREE.SphereGeometry(80, 64, 64);
      const nebulaMaterial = new THREE.MeshPhongMaterial({
        color: 0x4a00e0,
        transparent: true,
        opacity: 0.1,
        emissive: 0x4a00e0,
        emissiveIntensity: 0.3,
        specular: 0xffffff,
        shininess: 50,
        blending: THREE.AdditiveBlending
      });
      const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
      nebula.position.set(30, 10, -150);
      scene.add(nebula);

      // Secondary nebula
      const nebula2Geometry = new THREE.SphereGeometry(60, 64, 64);
      const nebula2Material = nebulaMaterial.clone();
      nebula2Material.color.setHSL(0.8, 0.8, 0.6);
      nebula2Material.emissive.setHSL(0.8, 0.8, 0.3);
      const nebula2 = new THREE.Mesh(nebula2Geometry, nebula2Material);
      nebula2.position.set(-50, -20, -200);
      scene.add(nebula2);
    };
    createNebula();

    // Tech orbs with enhanced effects
    const skillCategories = [
      { name: "Frontend", color: 0x4fd1c5, icon: <Layout /> },
      { name: "Backend", color: 0x9f7aea, icon: <Server /> },
      { name: "Database", color: 0xed8936, icon: <Database /> }
    ];

    const orbs = skillCategories.map((category, i) => {
      const geometry = new THREE.SphereGeometry(2, 64, 64);
      const material = new THREE.MeshPhongMaterial({
        color: category.color,
        transparent: true,
        opacity: 0.9,
        emissive: category.color,
        emissiveIntensity: 0.5,
        specular: 0xffffff,
        shininess: 100,
        wireframe: false
      });
      
      const orb = new THREE.Mesh(geometry, material);
      orb.position.x = (i - 1) * 6;
      orb.position.y = 0;
      orb.position.z = 0;
      
      // Add glow effect
      const glowGeometry = new THREE.SphereGeometry(2.2, 64, 64);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: category.color,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      orb.add(glow);
      
      scene.add(orb);
      return orb;
    });

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add point lights for each orb
    const pointLights = orbs.map((orb, i) => {
      const light = new THREE.PointLight(skillCategories[i].color, 1, 20);
      light.position.copy(orb.position);
      scene.add(light);
      return light;
    });

    // Add hemisphere light for more natural illumination
    const hemisphereLight = new THREE.HemisphereLight(0x4a00e0, 0xed8936, 0.5);
    scene.add(hemisphereLight);

    // Camera position and animation
    camera.position.z = 15;
    camera.position.y = 2;

    // Animation
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Animate orbs with more complex motion
      orbs.forEach((orb, i) => {
        orb.rotation.x += 0.005 + Math.sin(time * 0.2 + i) * 0.002;
        orb.rotation.y += 0.005 + Math.cos(time * 0.3 + i) * 0.003;
        
        // Floating animation with more variation
        orb.position.y = Math.sin(time * 0.7 + i * 2) * 2;
        orb.position.x = (i - 1) * 6 + Math.sin(time * 0.5 + i) * 1.5;
        orb.position.z = Math.cos(time * 0.4 + i) * 1;
        
        // Update corresponding point light position
        pointLights[i].position.copy(orb.position);
      });

      // Gentle camera movement
      camera.position.y = 2 + Math.sin(time * 0.3) * 0.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Skills data with more technologies
  const skills = {
    frontend: [
      { name: "HTML", level: 98 },
      { name: "CSS", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Tailwind CSS", level: 85 },
      { name: "React", level: 95 },
      { name: "Redux", level: 80 },
      { name: "Zustand", level: 75 },
      { name: "TypeScript", level: 85 }
    ],
    backend: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "Socket.IO", level: 80 }
    ],
    database: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 75 },
      { name: "MySQL", level: 75 }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 overflow-hidden relative">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl"></div>
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg">
              <Sparkles className="inline w-5 h-5 mr-2" />
              Technical Skills
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white sm:text-6xl mb-6"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Skills</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Technologies I've mastered to build exceptional digital experiences
          </motion.p>
        </div>
        <Carousel/>
        {/* Skills Grid */}
        <div ref={skillsContainerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          {/* Frontend Skills */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center mb-8"
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md"></div>
                <div className="relative p-3 rounded-full bg-gray-800/80 backdrop-blur-sm mr-4 border border-cyan-500/30">
                  <Layout className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Frontend</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.frontend.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 h-full hover:border-cyan-500/30 transition-colors duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-5 h-5 mr-2">
                        {LanguageIcons[skill.name] || <Code className="w-5 h-5 text-cyan-400" />}
                      </div>
                      <h3 className="font-medium text-white">{skill.name}</h3>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1, type: 'spring' }}
                        viewport={{ once: true }}
                        className="h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                      />
                    </div>
                    <div className="text-right text-sm text-gray-400 mt-1">
                      {skill.level}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Backend Skills */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center mb-8"
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-md"></div>
                <div className="relative p-3 rounded-full bg-gray-800/80 backdrop-blur-sm mr-4 border border-purple-500/30">
                  <Server className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Backend</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.backend.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 h-full hover:border-purple-500/30 transition-colors duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-5 h-5 mr-2">
                        {LanguageIcons[skill.name] || <Cpu className="w-5 h-5 text-purple-400" />}
                      </div>
                      <h3 className="font-medium text-white">{skill.name}</h3>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1, type: 'spring' }}
                        viewport={{ once: true }}
                        className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                      />
                    </div>
                    <div className="text-right text-sm text-gray-400 mt-1">
                      {skill.level}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Database Skills */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center mb-8"
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-orange-500/20 rounded-full blur-md"></div>
                <div className="relative p-3 rounded-full bg-gray-800/80 backdrop-blur-sm mr-4 border border-orange-500/30">
                  <Database className="w-8 h-8 text-orange-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Database</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.database.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="relative bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 h-full hover:border-orange-500/30 transition-colors duration-300">
                    <div className="flex items-center mb-3">
                      <div className="w-5 h-5 mr-2">
                        {LanguageIcons[skill.name] || <GitBranch className="w-5 h-5 text-orange-400" />}
                      </div>
                      <h3 className="font-medium text-white">{skill.name}</h3>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1, type: 'spring' }}
                        viewport={{ once: true }}
                        className="h-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                      />
                    </div>
                    <div className="text-right text-sm text-gray-400 mt-1">
                      {skill.level}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center pb-32 relative"
        >
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute -top-20 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full filter blur-3xl opacity-20"></div>

          <h3 className="text-2xl font-bold text-white mb-6">Ready to build something amazing?</h3>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-cyan-500/30 transition-all relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="relative">Let's Connect</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          </motion.a>

          <div className="mt-8 text-gray-400 text-sm flex items-center justify-center">
            <span className="mr-2">✦</span> Powered by cutting-edge technologies <span className="ml-2">✦</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;