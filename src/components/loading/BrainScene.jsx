"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  BRAIN_HEIGHT,
  BRAIN_WIDTH,
  CEREBELLUM_FOLIA,
  CHIP,
  MAX_RADIUS,
  REGIONS,
  SULCI,
  createRandom,
  pointAlong,
  radiusFromChip,
  routeTraces,
  sampleBrain,
  sampleNodes,
  tracePath,
} from "./brainAnatomy";

// Shared with the loader UI so the DOM and the WebGL scene speak one palette.
export const PALETTE = {
  void: "#04060f",
  ember: "#7a1e02",
  amber: "#ff7a18",
  gold: "#ffc65c",
  circuit: "#38bdf8",
  signal: "#c8f7ff",
  chip: "#0b2f4d",
  ink: "#e8f4ff",
};

const BRAIN_WORLD_WIDTH = 7.4;
const UNIT = BRAIN_WORLD_WIDTH / BRAIN_WIDTH; // design px -> world units
const CAMERA_Z = 10;
const CAMERA_FOV = 38;
const ASSEMBLE_SECONDS = 1.3;
const REVEAL_FRACTION = 0.62; // circuits finish lighting up this far into the load

// Stacked-layout budgeting, in CSS pixels. The copy block is measured live via
// copyRef; COPY_BLOCK_PX is only the fallback bound when no ref is provided.
const WIDE_BREAKPOINT_PX = 1024;
// Kept in sync with the `short-landscape` custom variant in globals.css:
// below the lg breakpoint, landscape viewports up to this height put the copy
// beside the brain instead of underneath it.
const SHORT_LANDSCAPE_MAX_PX = 620;
const COPY_BLOCK_PX = 250;
const TOP_MARGIN_PX = 24;
const SAFETY_PX = 30;

const clamp01 = (value) => Math.min(Math.max(value, 0), 1);
const easeOutCubic = (t) => 1 - (1 - clamp01(t)) ** 3;
const easeInOut = (t) => {
  const x = clamp01(t);
  return x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;
};

const toWorld = (x, y) => [
  (x - BRAIN_WIDTH / 2) * UNIT,
  -(y - BRAIN_HEIGHT / 2) * UNIT,
];

// Custom shaders output colour values as-is, so hand them plain sRGB floats
// instead of THREE.Color (which would convert to linear working space).
const rgb = (hex) =>
  new THREE.Vector3(
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  );

/* ------------------------------------------------------------------ */
/* Canvas textures                                                     */
/* ------------------------------------------------------------------ */

function makeCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function toTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

// The circuit board itself: every routed trace drawn twice, once as a wide soft
// halo and once as a bright core, with a solder pad at each bend and endpoint.
// Drawn at 3x so the traces stay crisp when the brain fills a large viewport.
const TRACE_SCALE = 3;

function makeTraceTexture(routes) {
  const canvas = makeCanvas(BRAIN_WIDTH * TRACE_SCALE, BRAIN_HEIGHT * TRACE_SCALE);
  const ctx = canvas.getContext("2d");
  if (!ctx) return toTexture(canvas);

  ctx.scale(TRACE_SCALE, TRACE_SCALE);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const stroke = (route) => {
    ctx.beginPath();
    route.points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
  };

  // Soft halo pass.
  ctx.shadowColor = PALETTE.circuit;
  ctx.shadowBlur = 14;
  ctx.strokeStyle = "rgba(56,189,248,0.34)";
  ctx.lineWidth = 5.5;
  routes.forEach(stroke);

  // Bright core pass.
  ctx.shadowBlur = 8;
  ctx.strokeStyle = "rgba(186,240,255,0.95)";
  ctx.lineWidth = 1.7;
  routes.forEach(stroke);

  // Pads: a filled disc at every bend, a larger ring at every endpoint.
  routes.forEach((route) => {
    route.points.forEach((point, index) => {
      const isEnd = index === route.points.length - 1;
      ctx.beginPath();
      ctx.arc(point.x, point.y, isEnd ? 4.2 : 2.4, 0, Math.PI * 2);
      ctx.fillStyle = isEnd ? "rgba(200,247,255,0.95)" : "rgba(120,215,255,0.85)";
      ctx.shadowBlur = isEnd ? 16 : 8;
      ctx.fill();

      if (isEnd) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 7.5, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56,189,248,0.6)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    });
  });

  return toTexture(canvas);
}

// The glowing mass of the brain: a blurred fill with a hotter rim and hotter
// fissures. Without this the cortex is only a constellation of dots — this is
// what makes it read as a lit, solid organ with the circuit sunk into it.
function makeBodyTexture() {
  const scale = 2;
  const canvas = makeCanvas(BRAIN_WIDTH * scale, BRAIN_HEIGHT * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return toTexture(canvas);

  ctx.scale(scale, scale);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.filter = "blur(13px)";

  ctx.fillStyle = "rgba(196,64,6,0.55)";
  REGIONS.forEach((commands) => {
    tracePath(ctx, commands);
    ctx.closePath();
    ctx.fill();
  });

  ctx.strokeStyle = "rgba(255,138,34,0.85)";
  ctx.lineWidth = 11;
  REGIONS.forEach((commands) => {
    tracePath(ctx, commands);
    ctx.closePath();
    ctx.stroke();
  });

  ctx.strokeStyle = "rgba(255,120,26,0.62)";
  ctx.lineWidth = 8;
  [...SULCI, ...CEREBELLUM_FOLIA].forEach((commands) => {
    tracePath(ctx, commands);
    ctx.stroke();
  });

  return toTexture(canvas);
}

// The processor: a die with a bright rim, pin stubs on all four sides, and the
// label. Drawn with generous padding so the glow is not clipped by the sprite.
function makeChipTexture() {
  const size = 512;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext("2d");
  if (!ctx) return toTexture(canvas);

  const centre = size / 2;
  const die = size * 0.44;
  const half = die / 2;

  ctx.strokeStyle = "rgba(140,225,255,0.9)";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.shadowColor = PALETTE.circuit;
  ctx.shadowBlur = 18;
  for (let index = 0; index < 7; index += 1) {
    const offset = ((index + 0.5) / 7 - 0.5) * (die - 22);
    const stub = die * 0.22;
    [
      [centre + offset, centre - half, centre + offset, centre - half - stub],
      [centre + offset, centre + half, centre + offset, centre + half + stub],
      [centre - half, centre + offset, centre - half - stub, centre + offset],
      [centre + half, centre + offset, centre + half + stub, centre + offset],
    ].forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
  }

  ctx.shadowBlur = 34;
  ctx.fillStyle = "rgba(10,44,74,0.96)";
  ctx.beginPath();
  ctx.roundRect(centre - half, centre - half, die, die, 14);
  ctx.fill();

  ctx.strokeStyle = "rgba(160,235,255,0.95)";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.shadowBlur = 26;
  ctx.shadowColor = "rgba(190,245,255,0.9)";
  ctx.fillStyle = "#eafcff";
  ctx.font = `bold ${Math.round(die * 0.46)}px "Barlow Condensed", "Arial Narrow", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AI", centre, centre + die * 0.03);

  return toTexture(canvas);
}

// A soft radial falloff, used for the brain's ambient bloom and the chip halo.
function makeGlowTexture() {
  const size = 256;
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext("2d");
  if (!ctx) return toTexture(canvas);

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.32)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.08)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return toTexture(canvas);
}

/* ------------------------------------------------------------------ */
/* Shaders                                                             */
/* ------------------------------------------------------------------ */

const SOFT_POINT_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vSoft;

  void main() {
    float distanceToCentre = length(gl_PointCoord - 0.5);
    float alpha = 1.0 - smoothstep(0.5 - vSoft, 0.5, distanceToCentre);
    alpha *= vAlpha;
    if (alpha < 0.006) discard;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

// The cortex. Particles converge from outside, then light up in a wave that
// travels outward from the chip. The rim carries the amber; the interior stays
// dark so the circuit underneath reads.
const CORTEX_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uAssemble;
  uniform float uReveal;
  uniform float uIntensity;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uGroupScale;
  uniform vec3 uEmber;
  uniform vec3 uAmber;
  uniform vec3 uGold;

  attribute float aSeed;
  attribute float aSize;
  attribute float aInside;
  attribute float aRadius;
  attribute float aRim;
  attribute vec3 aScatter;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSoft;

  void main() {
    vec3 pos = position;
    pos.x += sin(uTime * 0.8 + aSeed * 31.0) * 0.009;
    pos.y += cos(uTime * 0.7 + aSeed * 19.0) * 0.009;
    pos += aScatter * (1.0 - uAssemble);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uGroupScale * uPixelRatio * uScale / -mvPosition.z;

    // Energy wave sweeping out from the chip, plus a crest at its leading edge.
    float lit = smoothstep(uReveal + 0.1, uReveal - 0.03, aRadius);
    float crest = exp(-pow((aRadius - uReveal) * 9.0, 2.0));

    float rim = clamp(1.0 - aInside + aRim, 0.0, 1.0);
    vec3 colour = mix(uEmber, uAmber, rim);
    colour = mix(colour, uGold, pow(rim, 3.0) * 0.85);
    colour = mix(colour, vec3(1.0), crest * 0.7);
    vColor = colour;

    float twinkle = 0.72 + 0.28 * sin(uTime * 2.3 + aSeed * 44.0);
    vAlpha = (0.4 + 0.6 * pow(rim, 1.5)) * lit * twinkle * uIntensity
      + crest * 0.55 * uIntensity;
    vSoft = 0.22 + 0.4 * aInside;
  }
`;

// Signal pulses running the routed traces. Positions are written from the CPU
// each frame, so the shader only handles the look.
const PULSE_VERTEX = /* glsl */ `
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uGroupScale;
  uniform vec3 uSignal;

  attribute float aSize;
  attribute float aAlpha;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSoft;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uGroupScale * uPixelRatio * uScale / -mvPosition.z;
    vColor = uSignal;
    vAlpha = aAlpha;
    vSoft = 0.48;
  }
`;

// Synapse nodes: bright cyan points speckled through the cortex that flicker
// awake as the reveal wave passes them.
const NODE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uAssemble;
  uniform float uReveal;
  uniform float uIntensity;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform float uGroupScale;
  uniform vec3 uCircuit;
  uniform vec3 uSignal;

  attribute float aSeed;
  attribute float aSize;
  attribute float aRadius;
  attribute vec3 aScatter;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSoft;

  void main() {
    vec3 pos = position + aScatter * (1.0 - uAssemble);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float flicker = 0.35 + 0.65 * pow(
      0.5 + 0.5 * sin(uTime * (1.6 + aSeed * 3.4) + aSeed * 62.0), 2.2);
    float lit = smoothstep(uReveal + 0.08, uReveal - 0.02, aRadius);
    float crest = exp(-pow((aRadius - uReveal) * 10.0, 2.0));

    gl_PointSize = aSize * (1.0 + crest * 1.4) * uGroupScale * uPixelRatio
      * uScale / -mvPosition.z;
    vColor = mix(uCircuit, uSignal, flicker * 0.8 + crest);
    vAlpha = (0.25 + 0.75 * flicker) * lit * uIntensity + crest * 0.6 * uIntensity;
    vSoft = 0.4;
  }
`;

// Dust in the surrounding space, so the brain does not float on a flat void.
const MOTE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uPixelRatio;
  uniform float uScale;
  uniform vec3 uCircuit;

  attribute float aSeed;
  attribute float aSize;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vSoft;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.25 + aSeed * 26.0) * 0.28;
    pos.x += cos(uTime * 0.19 + aSeed * 17.0) * 0.22;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * uScale / -mvPosition.z;

    vColor = uCircuit;
    vAlpha = (0.1 + 0.32 * fract(aSeed * 7.3))
      * (0.5 + 0.5 * sin(uTime * 1.1 + aSeed * 50.0)) * uIntensity;
    vSoft = 0.45;
  }
`;

// The trace board. The texture holds the artwork; the shader gates it on the
// same outward sweep as the cortex and rides a travelling shimmer along it.
const TRACE_FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform float uReveal;
  uniform float uIntensity;
  uniform float uGain;
  uniform vec2 uChip;
  uniform vec2 uSize;
  uniform float uMaxRadius;

  varying vec2 vUv;

  void main() {
    vec4 texel = texture2D(uMap, vUv);
    if (texel.a < 0.01) discard;

    vec2 design = vec2(vUv.x * uSize.x, (1.0 - vUv.y) * uSize.y);
    float radius = clamp(distance(design, uChip) / uMaxRadius, 0.0, 1.0);

    float lit = smoothstep(uReveal + 0.08, uReveal - 0.02, radius);
    float crest = exp(-pow((radius - uReveal) * 11.0, 2.0));
    float shimmer = 0.8 + 0.2 * sin(uTime * 3.4 - radius * 16.0);

    float energy = (lit * shimmer + crest * 0.9) * uIntensity * uGain;
    gl_FragColor = vec4(texel.rgb * texel.a * energy, texel.a * energy);
  }
`;

const TRACE_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function pointsMaterial(vertexShader, uniforms) {
  return new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader: SOFT_POINT_FRAGMENT,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
}

/* ------------------------------------------------------------------ */
/* Scene pieces                                                        */
/* ------------------------------------------------------------------ */

// Dots along a bezier path, used for the cortex rim and the sulci. These are
// the brightest amber in the scene, so the folds read as ridges.
function dotsAlongPath(commands, { closed, spacing, random }) {
  const path = new THREE.Path();
  commands.forEach(([command, ...coords]) => {
    if (command === "M") path.moveTo(coords[0], coords[1]);
    else if (command === "L") path.lineTo(coords[0], coords[1]);
    else path.bezierCurveTo(...coords);
  });
  if (closed) path.closePath();

  const count = Math.max(20, Math.round(path.getLength() / spacing));
  return path.getSpacedPoints(count).map((point) => ({
    x: point.x + (random() - 0.5) * 2.6,
    y: point.y + (random() - 0.5) * 2.6,
  }));
}

function createCortex(samples, random, uniforms) {
  const rimDots = [];
  REGIONS.forEach((commands) => {
    rimDots.push(...dotsAlongPath(commands, { closed: true, spacing: 1.5, random }));
  });
  [...SULCI, ...CEREBELLUM_FOLIA].forEach((commands) => {
    rimDots.push(...dotsAlongPath(commands, { closed: false, spacing: 1.7, random }));
  });

  const particles = [
    ...samples.map((sample) => ({
      ...sample,
      size: 0.03 + random() ** 2 * 0.09,
      rim: 0,
    })),
    ...rimDots.map((dot) => ({
      x: dot.x,
      y: dot.y,
      inside: 0,
      radius: radiusFromChip(dot.x, dot.y),
      size: 0.05 + random() * 0.05,
      rim: 1, // forced to the brightest end of the ramp
    })),
  ];

  const count = particles.length;
  const positions = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const insides = new Float32Array(count);
  const radii = new Float32Array(count);
  const rims = new Float32Array(count);

  particles.forEach((particle, index) => {
    const [x, y] = toWorld(particle.x, particle.y);
    positions.set([x, y, (random() - 0.5) * 0.35], index * 3);
    seeds[index] = random();
    sizes[index] = particle.size;
    insides[index] = particle.inside;
    radii[index] = particle.radius;
    rims[index] = particle.rim;

    // Particles converge inward from a shell around the brain.
    const angle = random() * Math.PI * 2;
    const distance = 1.6 + random() * 3.4;
    scatter.set(
      [Math.cos(angle) * distance, Math.sin(angle) * distance, (random() - 0.5) * 2],
      index * 3,
    );
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aInside", new THREE.BufferAttribute(insides, 1));
  geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));
  geometry.setAttribute("aRim", new THREE.BufferAttribute(rims, 1));

  const material = pointsMaterial(CORTEX_VERTEX, {
    ...uniforms,
    uEmber: { value: rgb(PALETTE.ember) },
    uAmber: { value: rgb(PALETTE.amber) },
    uGold: { value: rgb(PALETTE.gold) },
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = 3;
  return { points, geometry, material };
}

// One travelling pulse per trace, alternating outbound and inbound, so the
// board reads as two-way traffic rather than a fountain.
function createPulses(routes, random, uniforms) {
  const pulses = routes.map((route, index) => ({
    route,
    speed: 0.24 + random() * 0.4,
    phase: random(),
    outbound: index % 3 !== 0,
  }));

  const count = pulses.length;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

  const material = pointsMaterial(PULSE_VERTEX, {
    ...uniforms,
    uSignal: { value: rgb(PALETTE.signal) },
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = 5;

  const update = (elapsed, reveal, intensity) => {
    pulses.forEach((pulse, index) => {
      const travel = (elapsed * pulse.speed + pulse.phase) % 1;
      const t = pulse.outbound ? travel : 1 - travel;
      const { x, y } = pointAlong(pulse.route, t);
      const [wx, wy] = toWorld(x, y);
      positions.set([wx, wy, 0.12], index * 3);

      // Fade in at both ends of the run, and only once the trace is lit.
      const ends = Math.sin(travel * Math.PI);
      const lit = pulse.route.radius <= reveal + 0.05 ? 1 : 0;
      sizes[index] = 0.13 + 0.07 * ends;
      alphas[index] = ends * lit * intensity;
    });
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.aSize.needsUpdate = true;
    geometry.attributes.aAlpha.needsUpdate = true;
  };

  return { points, geometry, material, update };
}

function createNodes(nodes, random, uniforms) {
  const count = nodes.length;
  const positions = new Float32Array(count * 3);
  const scatter = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);
  const radii = new Float32Array(count);

  nodes.forEach((node, index) => {
    const [x, y] = toWorld(node.x, node.y);
    positions.set([x, y, 0.09], index * 3);
    seeds[index] = node.seed;
    sizes[index] = 0.06 + random() ** 2 * 0.09;
    radii[index] = node.radius;
    const angle = random() * Math.PI * 2;
    const distance = 1.4 + random() * 3;
    scatter.set(
      [Math.cos(angle) * distance, Math.sin(angle) * distance, 0],
      index * 3,
    );
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));

  const material = pointsMaterial(NODE_VERTEX, {
    ...uniforms,
    uCircuit: { value: rgb(PALETTE.circuit) },
    uSignal: { value: rgb(PALETTE.signal) },
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = 5;
  return { points, geometry, material };
}

function createMotes(random, uniforms, count = 220) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const sizes = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    positions.set(
      [(random() - 0.5) * 22, (random() - 0.5) * 13, -2 - random() * 4],
      index * 3,
    );
    seeds[index] = random();
    sizes[index] = 0.04 + random() ** 2 * 0.1;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  const material = pointsMaterial(MOTE_VERTEX, {
    ...uniforms,
    uCircuit: { value: rgb(PALETTE.circuit) },
  });
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = 0;
  return { points, geometry, material };
}

// A full-brain plane driven by the reveal shader. Used twice: once for the
// glowing body, once for the circuit artwork on top of it.
function createBoard(texture, uniforms, { z, renderOrder, gain }) {
  const geometry = new THREE.PlaneGeometry(
    BRAIN_WIDTH * UNIT,
    BRAIN_HEIGHT * UNIT,
  );
  const material = new THREE.ShaderMaterial({
    uniforms: {
      ...uniforms,
      uMap: { value: texture },
      uChip: { value: new THREE.Vector2(CHIP.x, CHIP.y) },
      uSize: { value: new THREE.Vector2(BRAIN_WIDTH, BRAIN_HEIGHT) },
      uMaxRadius: { value: MAX_RADIUS },
      uGain: { value: gain },
    },
    vertexShader: TRACE_VERTEX,
    fragmentShader: TRACE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = z;
  mesh.renderOrder = renderOrder;
  return { mesh, geometry, material, texture };
}

function createGlows(glowTexture) {
  const [chipX, chipY] = toWorld(CHIP.x, CHIP.y);

  const bloomMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: new THREE.Color(PALETTE.amber),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const bloom = new THREE.Sprite(bloomMaterial);
  bloom.scale.set(11.5, 9, 1);
  bloom.position.set(0, 0, -1);
  bloom.renderOrder = 1;

  const haloMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: new THREE.Color(PALETTE.circuit),
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const halo = new THREE.Sprite(haloMaterial);
  halo.scale.set(3.4, 3.4, 1);
  halo.position.set(chipX, chipY, 0.08);
  halo.renderOrder = 6;

  const update = (elapsed, intensity, reveal) => {
    bloomMaterial.opacity = 0.5 * intensity * (0.8 + 0.2 * Math.sin(elapsed * 1.6));
    const beat = 0.5 + 0.5 * Math.sin(elapsed * 2.8);
    haloMaterial.opacity = (0.3 + 0.35 * beat) * intensity * clamp01(reveal * 3);
    const size = 3.2 + beat * 0.5;
    halo.scale.set(size, size, 1);
  };

  return { bloom, halo, bloomMaterial, haloMaterial, update };
}

function createChip(chipTexture) {
  const [x, y] = toWorld(CHIP.x, CHIP.y);
  const material = new THREE.SpriteMaterial({
    map: chipTexture,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(material);
  const size = CHIP.size * UNIT * 2.3; // the texture includes pins and padding
  sprite.scale.set(size, size, 1);
  sprite.position.set(x, y, 0.15);
  sprite.renderOrder = 7;

  const update = (elapsed, intensity) => {
    material.opacity = intensity * (0.86 + 0.14 * Math.sin(elapsed * 2.8));
  };

  return { sprite, material, update };
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function BrainScene({
  reduceMotion = false,
  durationMs = 3200,
  copyRef = null,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return undefined;

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

    // Sampling needs a 2D canvas context. If that is unavailable there is no
    // brain to draw, so leave the backdrop and copy to stand on their own.
    const random = createRandom(97);
    const samples = sampleBrain();
    const routes = routeTraces();
    const nodes = sampleNodes();
    if (samples.length === 0) {
      renderer.dispose();
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    mountNode.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 0.1, 50);
    camera.position.z = CAMERA_Z;

    const group = new THREE.Group();
    scene.add(group);

    // One set of uniform objects, shared by every material, so a single write
    // per frame drives the whole scene.
    const shared = {
      uTime: { value: 0 },
      uAssemble: { value: 0 },
      uReveal: { value: 0 },
      uIntensity: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uScale: { value: 1 },
      uGroupScale: { value: 1 },
    };

    const glowTexture = makeGlowTexture();
    const chipTexture = makeChipTexture();

    const motes = createMotes(random, shared);
    const glows = createGlows(glowTexture);
    const bodyTexture = makeBodyTexture();
    const body = createBoard(bodyTexture, shared, { z: -0.4, renderOrder: 2, gain: 1 });
    const board = createBoard(makeTraceTexture(routes), shared, {
      z: 0.05,
      renderOrder: 4,
      gain: 1,
    });
    const cortex = createCortex(samples, random, shared);
    const nodeField = createNodes(nodes, random, shared);
    const pulses = createPulses(routes, random, shared);
    const chip = createChip(chipTexture);

    scene.add(motes.points); // fixed to the viewport, not the brain group
    group.add(glows.bloom);
    group.add(body.mesh);
    group.add(board.mesh);
    group.add(cortex.points);
    group.add(nodeField.points);
    group.add(pulses.points);
    group.add(glows.halo);
    group.add(chip.sprite);

    const durationSeconds = durationMs / 1000;
    const clock = new THREE.Clock();
    let frameId = 0;

    const renderAt = (elapsed, forcedProgress) => {
      const progress = forcedProgress ?? easeInOut(Math.min(elapsed / durationSeconds, 1));
      const assemble = easeOutCubic(elapsed / ASSEMBLE_SECONDS);
      // Circuits finish lighting well before the load does, leaving the brain
      // fully awake for the last stretch.
      const reveal = easeOutCubic(progress / REVEAL_FRACTION) * 1.05;
      const intensity = easeOutCubic(elapsed / 0.9);

      shared.uTime.value = elapsed;
      shared.uAssemble.value = assemble;
      shared.uReveal.value = reveal;
      shared.uIntensity.value = intensity;

      pulses.update(elapsed, reveal, intensity);
      glows.update(elapsed, intensity, reveal);
      chip.update(elapsed, intensity * assemble);
      renderer.render(scene, camera);
    };

    const layout = () => {
      const width = mountNode.clientWidth || window.innerWidth;
      const height = mountNode.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      // Let three.js also set the canvas CSS size: without it the canvas lays
      // out at width * devicePixelRatio CSS pixels and overflows the viewport
      // on any display scaled above 100% (every phone, most laptops).
      renderer.setSize(width, height);

      const visibleHeight = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));
      const visibleWidth = visibleHeight * camera.aspect;
      // Matches the breakpoints at which the copy sits beside the brain: the
      // `lg:` breakpoint, plus short landscape viewports (phones held
      // sideways) via the `short-landscape` variant. Otherwise the copy is
      // stacked underneath, so the brain has to make room.
      const wide =
        width >= WIDE_BREAKPOINT_PX ||
        (width >= height && height <= SHORT_LANDSCAPE_MAX_PX);

      if (wide) {
        const scale = Math.min(
          1.0,
          Math.max(0.8, visibleWidth / 13),
          // Never let the brain outgrow the viewport height.
          (visibleHeight * 0.95) / (BRAIN_HEIGHT * UNIT),
        );
        group.scale.setScalar(scale);
        group.position.set(-visibleWidth * 0.2, 0.1, 0);
        shared.uGroupScale.value = scale;
      } else {
        // Fit the brain into the band above the stacked copy, measured in CSS
        // pixels and converted to world units. offsetTop ignores the entrance
        // transforms framer applies inside the copy block, so the measurement
        // is stable while the copy animates in.
        const copyEl = copyRef ? copyRef.current : null;
        const copyTopPx = copyEl
          ? copyEl.offsetTop
          : height - height * 0.07 - COPY_BLOCK_PX;
        const bandPx = Math.max(
          height * 0.3,
          copyTopPx - TOP_MARGIN_PX - SAFETY_PX,
        );
        const brainWorldHeight = BRAIN_HEIGHT * UNIT;
        const scale = Math.min(
          (visibleWidth * 0.98) / BRAIN_WORLD_WIDTH,
          ((bandPx / height) * visibleHeight) / brainWorldHeight,
        );
        // The brain is wide, so on a portrait screen its width sets the scale
        // and the band has slack left over. Centre it in that slack rather than
        // hanging it from the top, or a gap opens above the copy.
        const bandCentrePx = TOP_MARGIN_PX + bandPx / 2;
        group.scale.setScalar(scale);
        group.position.set(0, visibleHeight * (0.5 - bandCentrePx / height), 0);
        shared.uGroupScale.value = scale;
      }

      shared.uScale.value = height * 0.5;
      shared.uPixelRatio.value = renderer.getPixelRatio();
    };

    // Frame shown when the visitor prefers reduced motion: assembled, fully lit.
    const STILL_TIME = 2.4;
    const STILL_PROGRESS = 1;

    const onResize = () => {
      layout();
      if (reduceMotion) renderAt(STILL_TIME, STILL_PROGRESS);
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      renderAt(clock.getElapsedTime());
    };

    layout();
    if (reduceMotion) {
      renderAt(STILL_TIME, STILL_PROGRESS);
    } else {
      animate();
    }
    window.addEventListener("resize", onResize);

    // The copy block changes height as the web fonts land and as text wraps,
    // which moves the band the brain has to fit into.
    let copyObserver;
    if (copyRef?.current && typeof ResizeObserver !== "undefined") {
      copyObserver = new ResizeObserver(onResize);
      copyObserver.observe(copyRef.current);
    }

    return () => {
      if (copyObserver) copyObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frameId);
      [cortex, nodeField, pulses, motes].forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      [body, board].forEach(({ geometry, material, texture }) => {
        geometry.dispose();
        material.dispose();
        texture.dispose();
      });
      glows.bloomMaterial.dispose();
      glows.haloMaterial.dispose();
      chip.material.dispose();
      glowTexture.dispose();
      chipTexture.dispose();
      renderer.dispose();
      if (mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [reduceMotion, durationMs, copyRef]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
