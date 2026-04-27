import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import * as THREE from "three";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/prakash116",
    icon: Github,
  },
  {
    name: "Twitter",
    href: "https://x.com/prakashmani87",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/prakashmani87/",
    icon: Linkedin,
  },
];

const quickLinks = [
  { name: "Home", to: "/home" },
  { name: "About Me", to: "/about" },
  { name: "Projects", to: "/project" },
  { name: "Skills", to: "/skill" },
  { name: "Services", to: "/services" },
  { name: "Contact", to: "/contact" },
];

const contactInfo = [
  {
    label: "Email",
    value: "prakashmanig000@gmail.com",
    href: "mailto:prakashmanig000@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+91 8795901180",
    href: "tel:+918795901180",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Azadpur, Delhi 110033",
    href: "https://maps.google.com/?q=Azadpur,Delhi,110033",
    icon: MapPin,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: "easeOut" },
};

function Footer() {
  const currentYear = new Date().getFullYear();
  const backgroundRef = useRef(null);
  const [webglEnabled, setWebglEnabled] = useState(true);

  useEffect(() => {
    const container = backgroundRef.current;
    if (!container) return undefined;

    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    if (!gl) {
      setWebglEnabled(false);
      return undefined;
    }

    let frameId;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.set(0, 0, 22);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const clock = new THREE.Clock();

    const shapes = [];
    const geometryPool = [
      new THREE.IcosahedronGeometry(1.25, 0),
      new THREE.OctahedronGeometry(1.35, 0),
      new THREE.TorusGeometry(1.1, 0.24, 16, 36),
      new THREE.ConeGeometry(1, 2.3, 16),
    ];

    for (let index = 0; index < 16; index += 1) {
      const geometry = geometryPool[index % geometryPool.length];
      const material = new THREE.MeshBasicMaterial({
        color: index % 3 === 0 ? 0xff9bd2 : index % 2 === 0 ? 0xb794f4 : 0x7df9ff,
        wireframe: true,
        transparent: true,
        opacity: index % 3 === 0 ? 0.95 : 0.72,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 34,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.userData = {
        driftX: (Math.random() - 0.5) * 0.012,
        driftY: (Math.random() - 0.5) * 0.008,
        spinX: Math.random() * 0.008 + 0.002,
        spinY: Math.random() * 0.008 + 0.002,
        offset: Math.random() * Math.PI * 2,
      };

      group.add(mesh);
      shapes.push(mesh);
    }

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 40;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 18;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xbefcff,
      size: 0.14,
      transparent: true,
      opacity: 0.9,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambient);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (!clientWidth || !clientHeight) return;

      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      group.rotation.y += 0.0018;
      group.rotation.x = Math.sin(elapsed * 0.15) * 0.08;
      particles.rotation.y -= 0.0008;

      shapes.forEach((shape, index) => {
        shape.rotation.x += shape.userData.spinX;
        shape.rotation.y += shape.userData.spinY;
        shape.position.x += shape.userData.driftX;
        shape.position.y += shape.userData.driftY;
        shape.position.y += Math.sin(elapsed * 0.9 + shape.userData.offset) * 0.006;

        if (Math.abs(shape.position.x) > 18) shape.userData.driftX *= -1;
        if (Math.abs(shape.position.y) > 8) shape.userData.driftY *= -1;
      });

      renderer.render(scene, camera);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);

      shapes.forEach((shape) => {
        shape.material.dispose();
      });

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      geometryPool.forEach((geometry) => geometry.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#08111f] text-white">
      {webglEnabled && (
        <div
          ref={backgroundRef}
          className="absolute inset-0 z-0 opacity-90 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.92),rgba(0,0,0,0.82))]"
          aria-hidden="true"
        />
      )}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_26%),radial-gradient(circle_at_85%_15%,_rgba(249,115,22,0.16),_transparent_22%),linear-gradient(180deg,_rgba(8,17,31,0.68),_rgba(5,10,18,0.84))]" />
      <div className="absolute inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
      <div className="absolute left-10 top-12 z-[1] h-40 w-40 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="absolute bottom-10 right-10 z-[1] h-40 w-40 rounded-full bg-orange-400/12 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-10">
        <motion.div
          {...fadeUp}
          className="mb-12 flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:flex-row md:items-end md:justify-between md:p-8"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
              <Sparkles className="h-4 w-4" />
              Available for freelance and full-time roles
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Let&apos;s build a polished digital experience together.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
              Full-stack developer focused on fast, modern interfaces with
              thoughtful interaction design and reliable engineering.
            </p>
          </div>

          <a
            href="mailto:prakashmanig000@gmail.com"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            Start a conversation
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_1fr]">
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.05 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
              About Me
            </p>
            <p className="mt-4 max-w-md text-lg leading-8 text-slate-300">
              Building responsive, high-performance products with modern web
              technologies and a strong eye for UI detail.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-fuchsia-300">
              Quick Links
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.to}
                    className="group inline-flex items-center gap-3 text-base text-slate-300 transition duration-300 hover:text-white"
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-orange-300 transition duration-300 group-hover:scale-125" />
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">
              Contact
            </p>
            <div className="mt-5 space-y-4">
              {contactInfo.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Location" ? "_blank" : undefined}
                  rel={label === "Location" ? "noreferrer" : undefined}
                  className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition duration-300 hover:border-white/15 hover:bg-white/[0.06]"
                >
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="block min-w-0">
                    <span className="block text-xs uppercase tracking-[0.24em] text-slate-500">
                      {label}
                    </span>
                    <span className="mt-1 block break-words text-sm leading-6 text-slate-200 md:text-base">
                      {value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between"
        >
          <p>&copy; {currentYear} Prakash Mani. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Crafted with
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            for clean code and better user experiences.
          </p>
          <p>v1.0.0</p>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
