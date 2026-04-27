import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import * as THREE from 'three';

const CONTACTS = [
  {
    icon: <Mail className="w-5 h-5" />,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    label: 'Email',
    value: 'prakashmanig000@gmail.com',
    sub: 'Typically replies within 24 hours',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    label: 'Phone',
    value: '+91 8795901180  ·  +91 8795901183',
    sub: 'Mon–Sun, 8AM – 6PM IST',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    label: 'Location',
    value: 'Azadpur, Delhi',
    sub: 'Open to remote work',
  },
];

const SOCIALS = [
  { href: 'https://github.com/prakash116',            icon: <Github className="w-5 h-5" />,   label: 'GitHub',   color: '#ffffff' },
  { href: 'https://www.linkedin.com/in/prakashmani87/', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', color: '#0a66c2' },
  { href: 'https://x.com/prakashmani87',              icon: <Twitter className="w-5 h-5" />,  label: 'X / Twitter', color: '#1d9bf0' },
];

const ContactInfoSection = () => {
  const canvasRef    = useRef(null);
  const rendererRef  = useRef(null);
  const animationRef = useRef(null);

  // ── Three.js: DNA helix + particles ────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;

    const w = canvasRef.current.clientWidth;
    const h = canvasRef.current.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Floating particles
    const count     = 60;
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities.push({ x: (Math.random() - 0.5) * 0.006, y: (Math.random() - 0.5) * 0.006 });
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ptMat = new THREE.PointsMaterial({ size: 0.055, color: 0xa855f7, transparent: true, opacity: 0.6 });
    const pts   = new THREE.Points(ptGeo, ptMat);
    scene.add(pts);

    // Helix strands (two helices offset by π)
    const helixGeo1 = new THREE.BufferGeometry();
    const helixGeo2 = new THREE.BufferGeometry();
    const steps     = 80;
    const hPos1     = new Float32Array(steps * 3);
    const hPos2     = new Float32Array(steps * 3);
    for (let i = 0; i < steps; i++) {
      const t = (i / (steps - 1)) * Math.PI * 4 - Math.PI * 2;
      hPos1[i * 3]     = Math.cos(t) * 1.8;
      hPos1[i * 3 + 1] = (i / steps) * 8 - 4;
      hPos1[i * 3 + 2] = Math.sin(t) * 1.8;
      hPos2[i * 3]     = Math.cos(t + Math.PI) * 1.8;
      hPos2[i * 3 + 1] = (i / steps) * 8 - 4;
      hPos2[i * 3 + 2] = Math.sin(t + Math.PI) * 1.8;
    }
    helixGeo1.setAttribute('position', new THREE.BufferAttribute(hPos1, 3));
    helixGeo2.setAttribute('position', new THREE.BufferAttribute(hPos2, 3));
    const helixMat1 = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.3 });
    const helixMat2 = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.25 });
    const helix1 = new THREE.Line(helixGeo1, helixMat1);
    const helix2 = new THREE.Line(helixGeo2, helixMat2);
    const helixGroup = new THREE.Group();
    helixGroup.add(helix1, helix2);
    helixGroup.position.x = 3;
    scene.add(helixGroup);

    // Rotating ring
    const ringGeo = new THREE.TorusGeometry(2.5, 0.015, 8, 72);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.12 });
    const ring    = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 4;
    scene.add(ring);

    const ringGeo2 = new THREE.TorusGeometry(1.6, 0.01, 8, 56);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.1 });
    const ring2    = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Move particles
      const pos = ptGeo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3]     += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        if (Math.abs(pos[i * 3])     > 7) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 5) velocities[i].y *= -1;
      }
      ptGeo.attributes.position.needsUpdate = true;

      helixGroup.rotation.y += 0.006;
      ring.rotation.z  += 0.003;
      ring.rotation.y  += 0.001;
      ring2.rotation.x += 0.004;
      ring2.rotation.z -= 0.002;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!canvasRef.current) return;
      const nw = canvasRef.current.clientWidth;
      const nh = canvasRef.current.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', onResize);
      [ptGeo, helixGeo1, helixGeo2, ringGeo, ringGeo2].forEach(g => g.dispose());
      [ptMat, helixMat1, helixMat2, ringMat, ringMat2].forEach(m => m.dispose());
      if (canvasRef.current?.contains(renderer.domElement))
        canvasRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden h-full"
    >
      {/* Three.js background */}
      <div ref={canvasRef} className="absolute inset-0 z-0 opacity-35" />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0d0d1a]/92 via-[#120820]/88 to-[#0d0d1a]/92" />

      {/* Card */}
      <div
        className="relative z-10 p-6 md:p-8 border border-white/[0.07] rounded-2xl h-full"
        style={{ boxShadow: '0 0 50px rgba(168,85,247,0.05), inset 0 1px 0 rgba(255,255,255,0.04)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0"
          >
            <Mail className="w-5 h-5 text-purple-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Contact Information</h2>
            <p className="text-xs text-white/35 mt-0.5">Let's build something great together</p>
          </div>
        </div>

        {/* Contact items */}
        <div className="space-y-4 mb-8">
          {CONTACTS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.color} group-hover:scale-110 transition-transform`}>
                {c.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-0.5">{c.label}</p>
                <p className="text-sm font-medium text-white/85 break-all">{c.value}</p>
                <p className="text-xs text-white/35 mt-0.5">{c.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Social links */}
        <div>
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">Follow Me</p>
          <div className="flex gap-3">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                viewport={{ once: true }}
                className="w-11 h-11 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.07] flex items-center justify-center text-white/50 hover:text-white transition-all"
                style={{ '--hover-color': s.color }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoSection;
