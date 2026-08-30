"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Full-viewport Three.js backdrop for /project:
//   1. an aurora / nebula plane driven by a simplex-noise fragment shader
//   2. a three-depth starfield with per-star twinkle and size attenuation
//   3. occasional shooting stars
// Pointer and scroll both feed a gentle parallax. With reduced motion the
// scene renders a single still frame.

const NOISE_GLSL = /* glsl */ `
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  float fbm(vec3 p){
    float f = 0.0;
    f += 0.5000 * snoise(p); p *= 2.02;
    f += 0.2500 * snoise(p); p *= 2.03;
    f += 0.1250 * snoise(p); p *= 2.01;
    f += 0.0625 * snoise(p);
    return f / 0.9375;
  }
`;

const AURORA_VERT = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const AURORA_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2  uPointer;
  uniform float uAspect;
  ${NOISE_GLSL}

  const vec3 CYAN   = vec3(0.13, 0.83, 0.93);
  const vec3 VIOLET = vec3(0.60, 0.40, 0.98);
  const vec3 EMBER  = vec3(0.98, 0.57, 0.24);
  const vec3 INK    = vec3(0.03, 0.03, 0.08);

  void main(){
    vec2 uv = vUv;
    vec2 p  = vec2(uv.x * uAspect, uv.y);
    p += uPointer * 0.04;

    float t = uTime * 0.045;
    float drift = uScroll * 0.00035;

    // Two flowing curtains of noise, offset from each other so the colour
    // bands slide past one another instead of breathing in lockstep.
    float n1 = fbm(vec3(p * vec2(0.9, 1.6) + vec2(t * 0.6, -drift), t));
    float n2 = fbm(vec3(p * vec2(1.7, 0.8) + vec2(-t * 0.4, drift * 0.6 + 3.1), t * 0.7 + 10.0));

    float band = smoothstep(0.15, 0.85, n1 * 0.5 + 0.5);
    float veil = smoothstep(0.30, 0.95, n2 * 0.5 + 0.5);

    vec3 col = mix(VIOLET, CYAN, band);
    col = mix(col, EMBER, veil * band * 0.55);

    // Light pools around the top-right and bottom-left so the panels sit
    // over a darker centre and stay readable.
    float pool = 0.0;
    pool += smoothstep(1.2, 0.0, distance(p, vec2(uAspect * 0.85, 0.88)));
    pool += smoothstep(1.4, 0.0, distance(p, vec2(uAspect * 0.12, 0.15)));
    pool += smoothstep(1.0, 0.0, distance(p, vec2(uAspect * 0.55, 0.50))) * 0.35;

    float intensity = (band * 0.55 + veil * 0.35) * (0.18 + pool * 0.72);
    intensity *= 0.9 + 0.1 * sin(uTime * 0.3 + uv.x * 6.0);

    vec3 outCol = INK + col * intensity;
    gl_FragColor = vec4(outCol, clamp(intensity * 1.15, 0.0, 0.7));
  }
`;

const STAR_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute vec3  aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  varying vec3  vColor;
  void main(){
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.55 + 0.45 * sin(uTime * aSpeed + aPhase);
    vAlpha = twinkle;
    vColor = aColor;
    gl_PointSize = aSize * uPixelRatio * (260.0 / -mv.z) * (0.7 + 0.3 * twinkle);
    gl_Position = projectionMatrix * mv;
  }
`;

const STAR_FRAG = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  varying vec3  vColor;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    float core = smoothstep(0.5, 0.05, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.35;
    float a = (core + halo) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

const STAR_TINTS = [
  new THREE.Color("#ffffff"),
  new THREE.Color("#bfefff"),
  new THREE.Color("#d9c8ff"),
  new THREE.Color("#ffd9b8"),
];

const buildStars = (count, spread, depthNear, depthFar, sizeMin, sizeMax) => {
  const pos   = new Float32Array(count * 3);
  const size  = new Float32Array(count);
  const phase = new Float32Array(count);
  const speed = new Float32Array(count);
  const color = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    pos[i * 3]     = (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
    pos[i * 3 + 2] = -THREE.MathUtils.lerp(depthNear, depthFar, Math.random());
    size[i]  = THREE.MathUtils.lerp(sizeMin, sizeMax, Math.random() ** 2);
    phase[i] = Math.random() * Math.PI * 2;
    speed[i] = THREE.MathUtils.lerp(0.4, 1.8, Math.random());
    const tint = STAR_TINTS[Math.floor(Math.random() * STAR_TINTS.length)];
    color[i * 3] = tint.r; color[i * 3 + 1] = tint.g; color[i * 3 + 2] = tint.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSize",    new THREE.BufferAttribute(size, 1));
  geo.setAttribute("aPhase",   new THREE.BufferAttribute(phase, 1));
  geo.setAttribute("aSpeed",   new THREE.BufferAttribute(speed, 1));
  geo.setAttribute("aColor",   new THREE.BufferAttribute(color, 3));
  return geo;
};

const ProjectBackdrop = ({ reduceMotion = false }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return undefined;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    mountNode.appendChild(renderer.domElement);

    // ── Layer 1: aurora plane (screen-space) ──
    const auroraScene  = new THREE.Scene();
    const auroraCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const auroraMat = new THREE.ShaderMaterial({
      vertexShader:   AURORA_VERT,
      fragmentShader: AURORA_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime:    { value: 0 },
        uScroll:  { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uAspect:  { value: window.innerWidth / window.innerHeight },
      },
    });
    auroraScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), auroraMat));

    // ── Layer 2: stars + shooting stars (perspective) ──
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.z = 1;

    const starUniforms = { uTime: { value: 0 }, uPixelRatio: { value: renderer.getPixelRatio() } };
    const starMat = new THREE.ShaderMaterial({
      vertexShader:   STAR_VERT,
      fragmentShader: STAR_FRAG,
      uniforms: starUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const layers = [
      { geo: buildStars(900, 220, 60, 160, 0.6, 1.6), parallax: 0.35 },
      { geo: buildStars(500, 160, 25, 60,  1.0, 2.6), parallax: 0.7  },
      { geo: buildStars(140, 110, 8,  25,  1.6, 4.0), parallax: 1.2  },
    ].map(({ geo, parallax }) => {
      const points = new THREE.Points(geo, starMat);
      points.userData.parallax = parallax;
      scene.add(points);
      return points;
    });

    const STREAK_COUNT = 3;
    const streaks = Array.from({ length: STREAK_COUNT }, () => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
      const mat = new THREE.LineBasicMaterial({ color: 0xbfefff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const line = new THREE.Line(geo, mat);
      line.userData = { active: false, t: 0, nextAt: 2 + Math.random() * 6, from: new THREE.Vector3(), dir: new THREE.Vector3(), len: 0 };
      scene.add(line);
      return line;
    });

    const launchStreak = (line, now) => {
      const d = line.userData;
      d.active = true;
      d.t = 0;
      d.from.set((Math.random() - 0.5) * 90, 20 + Math.random() * 30, -THREE.MathUtils.lerp(20, 45, Math.random()));
      d.dir.set(-(0.6 + Math.random() * 0.8), -(0.5 + Math.random() * 0.5), 0).normalize();
      d.len = 10 + Math.random() * 14;
      d.startedAt = now;
      d.duration = 0.9 + Math.random() * 0.6;
    };

    const updateStreak = (line, now) => {
      const d = line.userData;
      if (!d.active) {
        if (now >= d.nextAt) launchStreak(line, now);
        return;
      }
      const p = (now - d.startedAt) / d.duration;
      if (p >= 1) {
        d.active = false;
        d.nextAt = now + 3 + Math.random() * 9;
        line.material.opacity = 0;
        return;
      }
      const head = d.from.clone().addScaledVector(d.dir, p * d.len * 2.2);
      const tail = head.clone().addScaledVector(d.dir, -d.len * Math.min(1, p * 3) * (1 - p * 0.5));
      const arr = line.geometry.attributes.position.array;
      arr[0] = tail.x; arr[1] = tail.y; arr[2] = tail.z;
      arr[3] = head.x; arr[4] = head.y; arr[5] = head.z;
      line.geometry.attributes.position.needsUpdate = true;
      line.material.opacity = Math.sin(p * Math.PI) * 0.9;
    };

    // ── Input ──
    const pointer = new THREE.Vector2(0, 0);
    const pointerTarget = new THREE.Vector2(0, 0);
    let scrollY = window.scrollY;
    const onPointerMove = (e) => {
      pointerTarget.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    const onPointerLeave = () => pointerTarget.set(0, 0);
    const onScroll = () => { scrollY = window.scrollY; };
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      auroraMat.uniforms.uAspect.value = w / h;
      starUniforms.uPixelRatio.value = renderer.getPixelRatio();
    };

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      pointer.lerp(pointerTarget, 0.04);

      auroraMat.uniforms.uTime.value   = elapsed;
      auroraMat.uniforms.uScroll.value = scrollY;
      auroraMat.uniforms.uPointer.value.copy(pointer);
      starUniforms.uTime.value = elapsed;

      layers.forEach((points) => {
        const k = points.userData.parallax;
        points.position.x = pointer.x * 3 * k;
        points.position.y = pointer.y * 2 * k + scrollY * 0.012 * k;
        points.rotation.z = elapsed * 0.004 * k;
      });
      streaks.forEach((s) => updateStreak(s, elapsed));

      renderer.clear();
      renderer.render(auroraScene, auroraCamera);
      renderer.render(scene, camera);
    };

    const frame = () => {
      raf = window.requestAnimationFrame(frame);
      renderFrame();
    };
    const start = () => { if (!running) { running = true; frame(); } };
    const stop  = () => { if (running)  { running = false; window.cancelAnimationFrame(raf); } };
    const onVisibility = () => (document.hidden ? stop() : start());

    if (reduceMotion) {
      renderFrame();
    } else {
      start();
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (mountNode.contains(renderer.domElement)) mountNode.removeChild(renderer.domElement);
      [auroraScene, scene].forEach((s) => s.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      }));
      renderer.dispose();
    };
  }, [reduceMotion]);

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
};

export default ProjectBackdrop;
