import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import {
  Building2,
  BookOpen,
  Car,
  Cloud,
  ExternalLink,
  Globe,
  Github,
  MessageCircle,
  Smartphone,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { GiLift } from "react-icons/gi";
import toast from "react-hot-toast";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionButton = motion.button;
const MotionSpan = motion.span;

const ACCENT_HEX = {
  purple: 0x9f7aea,
  cyan: 0x00b5d8,
  emerald: 0x38b2ac,
  blue: 0x4299e1,
  orange: 0xed8936,
};

const ACCENT_STYLES = {
  purple: {
    iconText: "text-purple-400",
    yearText: "text-purple-400",
    gradient: "from-purple-500 to-purple-600",
    panelGradient: "from-purple-900/30 to-purple-800/30",
    panelTint: "from-purple-900/10 to-purple-800/10",
    border: "border-purple-400/20",
    borderHover: "group-hover:border-purple-400/40",
    cardHover: "group-hover:border-purple-400/50",
    shadowHover: "group-hover:shadow-purple-500/20",
    buttonHover: "hover:bg-purple-900/30",
    demoShadow: "hover:shadow-purple-500/30",
  },
  cyan: {
    iconText: "text-cyan-400",
    yearText: "text-cyan-400",
    gradient: "from-cyan-500 to-cyan-600",
    panelGradient: "from-cyan-900/30 to-cyan-800/30",
    panelTint: "from-cyan-900/10 to-cyan-800/10",
    border: "border-cyan-400/20",
    borderHover: "group-hover:border-cyan-400/40",
    cardHover: "group-hover:border-cyan-400/50",
    shadowHover: "group-hover:shadow-cyan-500/20",
    buttonHover: "hover:bg-cyan-900/30",
    demoShadow: "hover:shadow-cyan-500/30",
  },
  emerald: {
    iconText: "text-emerald-400",
    yearText: "text-emerald-400",
    gradient: "from-emerald-500 to-emerald-600",
    panelGradient: "from-emerald-900/30 to-emerald-800/30",
    panelTint: "from-emerald-900/10 to-emerald-800/10",
    border: "border-emerald-400/20",
    borderHover: "group-hover:border-emerald-400/40",
    cardHover: "group-hover:border-emerald-400/50",
    shadowHover: "group-hover:shadow-emerald-500/20",
    buttonHover: "hover:bg-emerald-900/30",
    demoShadow: "hover:shadow-emerald-500/30",
  },
  blue: {
    iconText: "text-blue-400",
    yearText: "text-blue-400",
    gradient: "from-blue-500 to-blue-600",
    panelGradient: "from-blue-900/30 to-blue-800/30",
    panelTint: "from-blue-900/10 to-blue-800/10",
    border: "border-blue-400/20",
    borderHover: "group-hover:border-blue-400/40",
    cardHover: "group-hover:border-blue-400/50",
    shadowHover: "group-hover:shadow-blue-500/20",
    buttonHover: "hover:bg-blue-900/30",
    demoShadow: "hover:shadow-blue-500/30",
  },
  orange: {
    iconText: "text-orange-400",
    yearText: "text-orange-400",
    gradient: "from-orange-500 to-orange-600",
    panelGradient: "from-orange-900/30 to-orange-800/30",
    panelTint: "from-orange-900/10 to-orange-800/10",
    border: "border-orange-400/20",
    borderHover: "group-hover:border-orange-400/40",
    cardHover: "group-hover:border-orange-400/50",
    shadowHover: "group-hover:shadow-orange-500/20",
    buttonHover: "hover:bg-orange-900/30",
    demoShadow: "hover:shadow-orange-500/30",
  },
};

const OVERLAY_PARTICLES = Array.from({ length: 30 }, (_, index) => ({
  id: `particle-${index}`,
  size: Math.random() * 6 + 2,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  moveX: Math.random() * 100 - 50,
  moveY: Math.random() * 100 - 50,
  duration: Math.random() * 20 + 10,
}));

const RAW_PROJECTS = [
  {
    title: "E-Commerce Platform",
    description:
      "Full-featured online marketplace with payment integration and admin dashboard.",
    technologies: ["React", "Redux", "Node.js", "Express.js", "MongoDB"],
    period: "Mar 2025 - Jun 2025",
    icon: TiShoppingCart,
    accent: "purple",
  },
  {
    title: "Elite India Marketing",
    description:
      "Admin manages all controls, including task assignment, real-time tracking, and implementation of annual sales and purchase graphs.",
    technologies: [
      "JavaScript",
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "MongoDB",
    ],
    period: "Jan 2025 - Mar 2025",
    icon: GiLift,
    accent: "cyan",
  },
  {
    title: "Chat Application",
    description:
      "Real-time chat platform with user authentication, Socket.IO integration, and a responsive UI.",
    technologies: [
      "Tailwind",
      "React",
      "Zustand",
      "Node.js",
      "Express.js",
      "Socket.IO",
      "MongoDB",
    ],
    period: "Oct 2024 - Dec 2024",
    icon: MessageCircle,
    accent: "emerald",
    git: "https://github.com/prakash116/Chat-App.git",
    url: "https://chat-app-atkl.onrender.com/",
  },
  {
    title: "Library Management System",
    description:
      "A web-based system for managing book inventories, user records, and issue/return tracking.",
    technologies: ["React", "Redux", "Node.js", "Express", "MongoDB"],
    period: "Jul 2024 - Sep 2024",
    icon: BookOpen,
    accent: "blue",
    git: "https://github.com/prakash116/LMS.git",
  },
  {
    title: "Media Storage Solution",
    description:
      "Secure cloud-based file storage with encryption and sharing capabilities.",
    technologies: [
      "Cloudinary",
      "React",
      "Context API",
      "Node.js",
      "Express",
    ],
    period: "Apr 2024 - Jun 2024",
    icon: Cloud,
    accent: "blue",
    git: "https://github.com/prakash116/MediaCaptureAndStorage.git",
  },
  {
    title: "Vehicle Renting",
    description:
      "Online vehicle rental platform with booking management and user-friendly interface.",
    technologies: [
      "Bootstrap",
      "JavaScript",
      "React",
      "Context API",
      "API Integration",
    ],
    period: "Jan 2024 - Mar 2024",
    icon: Car,
    accent: "orange",
  },

  // 🔥 REAL PROJECTS (MOST IMPORTANT)

  {
    title: "Restocare Ecosystem",
    description:
      "Complete service ecosystem including Customer App, Partner App, and Web Platform with booking flows, authentication, and role-based access control.",
    technologies: [
      "React Native",
      "React.js",
      "Redux",
      "REST APIs",
      "Role-Based Access",
      "Performance Optimization",
    ],
    period: "Jul 2025 - Present",
    icon: Smartphone,
    accent: "cyan",
  },
  {
    title: "Dobby Virtual Mall",
    description:
      "E-commerce web and mobile platform with responsive UI, API integration, and scalable frontend architecture.",
    technologies: [
      "React.js",
      "React Native",
      "REST APIs",
      "Figma",
      "Responsive UI",
    ],
    period: "Jan 2025 - Jun 2025",
    icon: Store,
    accent: "purple",
  },
  {
    title: "Zoko World",
    description:
      "Responsive, high-performance web application built with reusable components, dynamic data rendering, and optimized frontend architecture.",
    technologies: [
      "React.js",
      "Next.js",
      "REST APIs",
      "Reusable Components",
      "Frontend Optimization",
    ],
    period: "Jun 2024 - Dec 2024",
    icon: Globe,
    accent: "emerald",
  },
  {
    title: "Passage Consultants",
    description:
      "Professional company website for immigration and visa consultancy services with reusable UI components, animations, and optimized loading speed.",
    technologies: [
      "React.js",
      "Animations",
      "Reusable UI",
      "SEO Optimization",
      "Performance Tuning",
    ],
    period: "Jan 2024 - May 2024",
    icon: Building2,
    accent: "blue",
  },
];

const MONTH_INDEX = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const parsePeriodPart = (value, isEnd = false) => {
  const trimmedValue = value.trim();

  if (trimmedValue === "Present") {
    return new Date(9999, 11, 31).getTime();
  }

  if (/^\d{4}$/.test(trimmedValue)) {
    const year = Number(trimmedValue);
    return new Date(year, isEnd ? 11 : 0, isEnd ? 31 : 1).getTime();
  }

  const [monthLabel, yearLabel] = trimmedValue.split(" ");
  const monthIndex = MONTH_INDEX[monthLabel];
  const year = Number(yearLabel);

  if (monthIndex === undefined || Number.isNaN(year)) {
    return 0;
  }

  return new Date(year, monthIndex, isEnd ? 28 : 1).getTime();
};

const getProjectTimelineRange = (period) => {
  const [startPart, endPart] = period.includes(" - ")
    ? period.split(" - ")
    : [period, period];

  return {
    start: parsePeriodPart(startPart),
    end: parsePeriodPart(endPart, true),
  };
};

const PROJECTS = [...RAW_PROJECTS].sort((projectA, projectB) => {
  const rangeA = getProjectTimelineRange(projectA.period);
  const rangeB = getProjectTimelineRange(projectB.period);

  if (rangeB.end !== rangeA.end) {
    return rangeB.end - rangeA.end;
  }

  return rangeB.start - rangeA.start;
});

const createStarfield = (scene) => {
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  const starCount = 5000;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i += 3) {
    starPositions[i] = (Math.random() - 0.5) * 2000;
    starPositions[i + 1] = (Math.random() - 0.5) * 2000;
    starPositions[i + 2] = (Math.random() - 0.5) * 2000;
  }

  starsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3)
  );

  scene.add(new THREE.Points(starsGeometry, starsMaterial));
};

const createNebula = (scene) => {
  const nebulaGeometry = new THREE.SphereGeometry(50, 24, 24);
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

const createTimeline = (scene) => {
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
  scene.add(new THREE.Line(timelineGeometry, timelineMaterial));

  const glowGeometry = new THREE.BufferGeometry();
  glowGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions.slice(), 3)
  );
  const glowMaterial = new THREE.LineBasicMaterial({
    color: 0x4fd1c5,
    transparent: true,
    opacity: 0.1,
    linewidth: 10,
  });
  scene.add(new THREE.Line(glowGeometry, glowMaterial));
};

const createTechOrbs = (scene) => {
  const orbs = [];

  PROJECTS.forEach((project, index) => {
    const color = ACCENT_HEX[project.accent] ?? 0xffffff;
    const orb = new THREE.Mesh(
      new THREE.SphereGeometry(1.2, 24, 24),
      new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.9,
        emissive: color,
        emissiveIntensity: 0.3,
        specular: 0xffffff,
        shininess: 50,
      })
    );

    orb.position.y = index * 12 - 30;
    orb.position.x = (index % 2 === 0 ? 1 : -1) * 5;
    orb.userData = { hover: false };

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 12, 12),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
      })
    );
    orb.add(core);

    scene.add(orb);
    orbs.push(orb);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(6);
    linePositions[0] = 0;
    linePositions[1] = orb.position.y;
    linePositions[2] = 0;
    linePositions[3] = orb.position.x;
    linePositions[4] = orb.position.y;
    linePositions[5] = 0;
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.3,
      linewidth: 2,
    });
    scene.add(new THREE.Line(lineGeometry, lineMaterial));
  });

  return orbs;
};

const ProjectCard = ({ project, index, onCode, onDemo }) => {
  const accent = ACCENT_STYLES[project.accent] ?? ACCENT_STYLES.purple;
  const ProjectIcon = project.icon;
  const isEven = index % 2 === 0;

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className={`relative flex ${
        isEven ? "justify-between" : "justify-between flex-row-reverse"
      }`}
    >
      <div
        className={`w-full md:w-2/5 relative group ${isEven ? "pr-0" : "pl-0"}`}
      >
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${accent.gradient} rounded-xl blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
        />

        <div
          className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
            isEven ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-gradient-to-br ${accent.gradient} border-2 border-white/20 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300`}
          >
            <Zap className="w-3 h-3 text-white" />
          </div>
        </div>

        <div
          className={`absolute top-0 ${
            isEven
              ? "right-0 md:right-auto md:left-full ml-8"
              : "left-0 md:left-auto md:right-full mr-8"
          } ${accent.yearText} font-semibold text-sm md:text-base flex items-center max-w-[12rem] md:max-w-none leading-snug`}
        >
          <span className="mr-2 opacity-70">{"\u2022"}</span>
          {project.period}
        </div>

        <div
          className={`relative bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl shadow-lg h-full border border-gray-800 overflow-hidden transition-all duration-300 ${accent.cardHover} group-hover:shadow-lg`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${accent.panelTint}`}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${accent.panelGradient} mr-4 border ${accent.border} ${accent.shadowHover} transition-shadow duration-300`}
              >
                <ProjectIcon className={`w-6 h-6 ${accent.iconText}`} />
              </div>
              <h3 className="text-xl font-semibold text-white">{project.title}</h3>
            </div>

            <p className="text-gray-300 mb-4">{project.description}</p>

            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                <span className="w-4 h-px bg-gray-600 mr-2" />
                Built with:
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <MotionSpan
                    key={`${project.title}-${tech}`}
                    whileHover={{ y: -2 }}
                    className={`px-3 py-1 bg-gray-800/70 text-gray-300 rounded-full text-xs font-medium border ${accent.border} ${accent.borderHover} transition-colors duration-300`}
                  >
                    {tech}
                  </MotionSpan>
                ))}
              </div>
            </div>

            <div className="flex space-x-3 mt-auto pt-4 border-t border-gray-800">
              <MotionButton
                type="button"
                onClick={onCode}
                whileHover={{ y: -2 }}
                className={`flex items-center px-4 py-2 bg-gray-800/70 text-gray-300 rounded-lg text-sm font-medium transition ${accent.buttonHover} border ${accent.border} ${accent.borderHover}`}
              >
                <Github className="w-4 h-4 mr-2" />
                Code
              </MotionButton>
              <MotionButton
                type="button"
                onClick={onDemo}
                whileHover={{ y: -2, scale: 1.02 }}
                className={`flex items-center px-4 py-2 bg-gradient-to-r ${accent.gradient} text-white rounded-lg text-sm font-medium transition opacity-90 hover:opacity-100 shadow-md ${accent.demoShadow}`}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </MotionButton>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`hidden md:flex w-2/5 ${
          isEven ? "pl-8" : "pr-8"
        } items-center justify-center`}
      >
        {isEven ? (
          <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm">
            <div className="absolute inset-0 flex flex-col justify-center items-center p-6">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                {project.technologies.length}+
              </div>
              <div className="text-lg text-gray-300 mb-2">Technologies Used</div>

              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {project.technologies.map((tech, techIndex) => (
                  <MotionDiv
                    key={`${project.title}-${tech}-showcase`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: techIndex * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    className={`p-3 rounded-lg bg-gradient-to-br ${accent.panelTint} border ${accent.border}`}
                  >
                    <div className="text-sm text-gray-300">{tech}</div>
                  </MotionDiv>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-xl" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-xl" />
              <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-full bg-purple-500/10 blur-lg" />
            </div>
          </div>
        ) : (
          <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm">
            <div className="absolute inset-0 p-6 font-mono">
              <div className="text-sm text-gray-400">
                <div className="mb-2">
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-cyan-400">
                    {project.title.replace(/\s/g, "")}
                  </span>
                  <span className="text-gray-500">() {"{"}</span>
                </div>
                <div className="ml-4 mb-1">
                  <span className="text-blue-400">const</span>{" "}
                  <span className="text-emerald-400">techStack</span>{" "}
                  <span className="text-gray-500">= [</span>
                </div>
                <div className="ml-8">
                  {project.technologies.map((tech, techIndex) => (
                    <div
                      key={`${project.title}-${tech}-code`}
                      className="text-yellow-300"
                    >
                      "{tech}"
                      {techIndex < project.technologies.length - 1 ? "," : ""}
                    </div>
                  ))}
                </div>
                <div className="ml-4 text-gray-500">];</div>
                <div className="mt-2 text-gray-500">{"}"}</div>
              </div>
            </div>

            <MotionDiv
              animate={{ x: [0, 100, 0], y: [0, 20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-6 right-6 w-3 h-6 bg-cyan-400 rounded-sm"
            />
          </div>
        )}
      </div>
    </MotionDiv>
  );
};

const ProjectsPage = () => {
  const mountRef = useRef(null);
  const projectsContainerRef = useRef(null);
  const scrollYRef = useRef(0);
  const containerMetricsRef = useRef({ top: 0, height: 1 });

  useEffect(() => {
    if (!mountRef.current) {
      return undefined;
    }

    const mountNode = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountNode.appendChild(renderer.domElement);

    createStarfield(scene);
    createNebula(scene);
    createTimeline(scene);
    const techOrbs = createTechOrbs(scene);

    scene.add(new THREE.AmbientLight(0x404040, 1.5));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 40;

    const updateMeasurements = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;

      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);

      if (projectsContainerRef.current) {
        containerMetricsRef.current = {
          top: projectsContainerRef.current.offsetTop,
          height: Math.max(projectsContainerRef.current.offsetHeight, 1),
        };
      }
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    let animationFrameId = 0;
    let isRunning = false;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      const time = performance.now() * 0.001;

      techOrbs.forEach((orb, index) => {
        orb.rotation.x += 0.005;
        orb.rotation.y += 0.005;

        const pulse = Math.sin(time * 2 + index) * 0.1 + 1;
        orb.scale.set(pulse, pulse, pulse);
        orb.position.x =
          (index % 2 === 0 ? 5 : -5) + Math.sin(time + index) * 1.5;
        orb.position.z = Math.cos(time * 0.5 + index) * 2;
        orb.material.emissiveIntensity = THREE.MathUtils.lerp(
          orb.material.emissiveIntensity,
          orb.userData.hover ? 0.8 : 0.3,
          0.1
        );
      });

      const { top, height } = containerMetricsRef.current;
      const scrollProgress = Math.min(
        1,
        Math.max(
          0,
          (scrollYRef.current - top + window.innerHeight * 0.3) / height
        )
      );
      camera.position.y =
        -scrollProgress * (PROJECTS.length * 12 - window.innerHeight * 0.1);

      renderer.render(scene, camera);
    };

    const startAnimation = () => {
      if (isRunning) {
        return;
      }
      isRunning = true;
      animate();
    };

    const stopAnimation = () => {
      if (!isRunning) {
        return;
      }
      isRunning = false;
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    updateMeasurements();
    handleScroll();
    startAnimation();

    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }

        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, []);

  const openProjectLink = (url) => {
    if (!url) {
      toast.success("Coming Soon");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 overflow-hidden relative">
      <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />

      <div className="fixed inset-0 pointer-events-none z-1">
        {OVERLAY_PARTICLES.map((particle) => (
          <MotionDiv
            key={particle.id}
            className="absolute rounded-full bg-cyan-500/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, particle.moveY],
              x: [0, particle.moveX],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl opacity-30" />
          <div className="absolute -top-40 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-20" />

          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-block mb-6 relative"
          >
            <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-xl" />
            <div className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium shadow-lg">
              <Sparkles className="inline w-5 h-5 mr-2" />
              Interactive Portfolio
            </div>
          </MotionDiv>

          <MotionH1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold text-white sm:text-6xl mb-6 relative"
          >
            <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-20 text-8xl select-none">
              {"</>"}
            </span>
            Project{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Timeline
            </span>
            <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-20 text-8xl select-none">
              {"{}"}
            </span>
          </MotionH1>

          <MotionP
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto relative"
          >
            <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-60">
              {"\u276F"}
            </span>
            Explore my work through this cosmic 3D timeline experience
          </MotionP>
        </div>

        <div
          ref={projectsContainerRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative"
        >
          <div className="relative space-y-32">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${project.period}`}
                project={project}
                index={index}
                onCode={() => openProjectLink(project.git)}
                onDemo={() => openProjectLink(project.url)}
              />
            ))}
          </div>
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 text-center pb-32 relative"
        >
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-20" />

          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to start your cosmic journey?
          </h3>
          <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-cyan-500/30 transition-all relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <Sparkles className="w-5 h-5 mr-2" />
              Get In Touch
            </Link>
          </MotionDiv>

          <div className="mt-8 text-gray-400 text-sm flex items-center justify-center">
            <span className="mr-2">{"\u2726"}</span>
            Crafted with cosmic energy
            <span className="ml-2">{"\u2726"}</span>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default ProjectsPage;
