import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, User, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import * as THREE from 'three';

const ContactFormSection = () => {
  const [formData, setFormData]       = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focused, setFocused]         = useState(null);

  const canvasRef    = useRef(null);
  const rendererRef  = useRef(null);
  const animationRef = useRef(null);

  // ── Three.js particle ring background ──────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current) return;

    const w = canvasRef.current.clientWidth;
    const h = canvasRef.current.clientHeight;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Particle field
    const count    = 70;
    const positions = new Float32Array(count * 3);
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities.push({ x: (Math.random() - 0.5) * 0.007, y: (Math.random() - 0.5) * 0.007 });
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ptMat = new THREE.PointsMaterial({ size: 0.055, color: 0x22d3ee, transparent: true, opacity: 0.65 });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    // Rotating rings
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.018, 8, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.18 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(3.2, 0.01, 8, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.1 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(1.4, 0.012, 8, 48);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.12 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    scene.add(ring3);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const pos = ptGeo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3]     += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        if (Math.abs(pos[i * 3])     > 7) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 5) velocities[i].y *= -1;
      }
      ptGeo.attributes.position.needsUpdate = true;

      ring1.rotation.z += 0.003;
      ring1.rotation.x += 0.001;
      ring2.rotation.y += 0.004;
      ring2.rotation.z += 0.001;
      ring3.rotation.x += 0.002;
      ring3.rotation.z -= 0.003;

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
      [ptGeo, ring1Geo, ring2Geo, ring3Geo].forEach(g => g.dispose());
      [ptMat, ring1Mat, ring2Mat, ring3Mat].forEach(m => m.dispose());
      if (canvasRef.current?.contains(renderer.domElement))
        canvasRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 1500);
  }, []);

  // Shared input style
  const inputStyle = (id) => ({
    background:  focused === id ? 'rgba(34,211,238,0.05)' : 'rgba(255,255,255,0.03)',
    borderColor: focused === id ? 'rgba(34,211,238,0.4)'  : 'rgba(255,255,255,0.08)',
    boxShadow:   focused === id ? '0 0 0 3px rgba(34,211,238,0.08)' : 'none',
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Three.js background */}
      <div ref={canvasRef} className="absolute inset-0 z-0 opacity-35" />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0d0d1a]/92 via-[#0f0c29]/88 to-[#0d0d1a]/92" />

      {/* Card content */}
      <div
        className="relative z-10 p-6 md:p-8 border border-white/[0.07] rounded-2xl"
        style={{ boxShadow: '0 0 50px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.04)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-7">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0"
          >
            <Mail className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Send Me a Message</h2>
            <p className="text-xs text-white/35 mt-0.5">I'll reply within 24 hours</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
              Your Name
            </label>
            <div className="relative">
              <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === 'name' ? 'text-cyan-400' : 'text-white/20'}`} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                required
                placeholder="Prakash Mani"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200 border"
                style={inputStyle('name')}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === 'email' ? 'text-cyan-400' : 'text-white/20'}`} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
                placeholder="hello@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200 border"
                style={inputStyle('email')}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="message" className="block text-xs font-semibold text-white/40 uppercase tracking-wider">
                Your Message
              </label>
              <span className="text-[10px] text-white/25 font-mono tabular-nums">
                {formData.message.length}/500
              </span>
            </div>
            <div className="relative">
              <MessageSquare className={`absolute left-3.5 top-3.5 w-4 h-4 transition-colors duration-200 ${focused === 'message' ? 'text-cyan-400' : 'text-white/20'}`} />
              <textarea
                id="message"
                name="message"
                rows="5"
                maxLength={500}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                required
                placeholder="Hello, I'd like to talk about..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200 border resize-none"
                style={inputStyle('message')}
              />
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting || submitSuccess}
            whileHover={!isSubmitting && !submitSuccess ? { scale: 1.02, boxShadow: '0 0 30px rgba(34,211,238,0.38)' } : {}}
            whileTap={!isSubmitting && !submitSuccess ? { scale: 0.98 } : {}}
            className="w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300"
            style={{
              background: submitSuccess
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              boxShadow: submitSuccess
                ? '0 4px 20px rgba(16,185,129,0.3)'
                : '0 4px 20px rgba(34,211,238,0.2)',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSubmitting ? (
                <motion.span key="loading"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </motion.span>
              ) : submitSuccess ? (
                <motion.span key="success"
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Message Sent!
                </motion.span>
              ) : (
                <motion.span key="idle"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

        </form>
      </div>
    </motion.div>
  );
};

export default ContactFormSection;
