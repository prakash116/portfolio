// An AI brain in lateral view, facing left, described in a 600 x 520 design
// space (y grows downward, like a canvas). The scene samples these shapes, so
// every element — the glowing cortex, the circuit routing, the chip — is
// derived from this file rather than positioned by hand in the scene.

export const BRAIN_WIDTH = 600;
export const BRAIN_HEIGHT = 520;

// The processor at the centre of the cerebrum. Circuit traces fan out from its
// pins, and the reveal animation sweeps outward from here.
export const CHIP = { x: 286, y: 206, size: 56 };

// Longest run from the chip to a far corner of the brain, used to normalise the
// reveal radius so it always finishes exactly at the edge.
export const MAX_RADIUS = 300;

// Path commands: M = moveTo, C = bezierCurveTo (two control points then the
// end point). Each region is closed.

export const CEREBRUM = [
  ["M", 76, 236],
  ["C", 78, 180, 112, 140, 156, 126], // frontal pole rising to the front gyri
  ["C", 172, 92, 214, 78, 248, 96], // gyrus
  ["C", 266, 66, 308, 60, 336, 82], // gyrus over the crown
  ["C", 358, 62, 398, 70, 414, 100], // gyrus
  ["C", 448, 102, 476, 126, 490, 160], // toward the occipital
  ["C", 506, 194, 502, 232, 484, 258], // occipital pole
  ["C", 468, 284, 442, 298, 416, 302], // under the occipital
  ["C", 398, 316, 376, 326, 352, 330], // under-surface
  ["C", 326, 348, 292, 354, 264, 344], // temporal lobe
  ["C", 234, 350, 208, 338, 192, 316], // temporal pole
  ["C", 166, 312, 142, 298, 128, 280], // forward along the underside
  ["C", 100, 276, 74, 264, 76, 236],
];

export const CEREBELLUM = [
  ["M", 388, 306],
  ["C", 408, 284, 448, 282, 474, 300],
  ["C", 500, 318, 502, 356, 480, 376],
  ["C", 456, 396, 412, 394, 392, 374],
  ["C", 376, 358, 376, 322, 388, 306],
];

export const STEM = [
  ["M", 352, 320],
  ["C", 370, 316, 386, 328, 390, 348],
  ["C", 394, 382, 388, 424, 378, 456],
  ["C", 373, 472, 354, 474, 347, 460],
  ["C", 338, 426, 338, 372, 342, 342],
  ["C", 344, 328, 346, 321, 352, 320],
];

export const REGIONS = [CEREBRUM, CEREBELLUM, STEM];

// Sulci: the fissures between the folds. These carry the brightest amber, so
// the cortex reads as ridged rather than as a flat blob.
export const SULCI = [
  [["M", 116, 214], ["C", 150, 196, 186, 194, 214, 208]],
  [["M", 132, 262], ["C", 172, 246, 214, 248, 244, 266]],
  [["M", 170, 150], ["C", 198, 168, 210, 196, 208, 224]],
  [["M", 250, 110], ["C", 254, 146, 246, 178, 228, 204]],
  [["M", 262, 316], ["C", 268, 284, 262, 254, 244, 232]],
  [["M", 330, 98], ["C", 332, 136, 340, 166, 358, 190]],
  [["M", 342, 318], ["C", 348, 286, 344, 256, 330, 234]],
  [["M", 412, 112], ["C", 400, 148, 402, 182, 418, 210]],
  [["M", 466, 138], ["C", 446, 170, 442, 208, 454, 244]],
  [["M", 486, 258], ["C", 458, 250, 432, 254, 412, 268]],
  [["M", 300, 62], ["C", 296, 100, 300, 132, 314, 158]],
  [["M", 190, 320], ["C", 208, 300, 214, 276, 210, 252]],
];

// The cerebellum's own finer banding.
export const CEREBELLUM_FOLIA = [
  [["M", 394, 320], ["C", 424, 310, 458, 314, 482, 330]],
  [["M", 390, 344], ["C", 422, 336, 456, 340, 482, 354]],
  [["M", 398, 366], ["C", 426, 360, 454, 364, 474, 374]],
];

export function tracePath(ctx, commands) {
  ctx.beginPath();
  commands.forEach(([command, ...coords]) => {
    if (command === "M") ctx.moveTo(coords[0], coords[1]);
    else if (command === "L") ctx.lineTo(coords[0], coords[1]);
    else ctx.bezierCurveTo(...coords);
  });
}

// Deterministic pseudo-random so the brain looks the same on every load.
export function createRandom(seed = 1) {
  let state = seed >>> 0 || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

export function radiusFromChip(x, y) {
  return clamp01(Math.hypot(x - CHIP.x, y - CHIP.y) / MAX_RADIUS);
}

/** Rasterises the regions once and returns an inside-test. */
export function createMask() {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = BRAIN_WIDTH;
  canvas.height = BRAIN_HEIGHT;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  ctx.fillStyle = "#000";
  REGIONS.forEach((commands) => {
    tracePath(ctx, commands);
    ctx.closePath();
    ctx.fill();
  });

  const { data } = ctx.getImageData(0, 0, BRAIN_WIDTH, BRAIN_HEIGHT);
  return (x, y) => {
    const ix = Math.round(x);
    const iy = Math.round(y);
    if (ix < 0 || iy < 0 || ix >= BRAIN_WIDTH || iy >= BRAIN_HEIGHT) return false;
    return data[(iy * BRAIN_WIDTH + ix) * 4 + 3] > 127;
  };
}

/**
 * Samples the brain interior on a jittered grid. Each point carries:
 *   inside   0 at the rim, 1 deep inside — the cortex glow rides on the rim
 *   radius   0 at the chip, 1 at the far edge — drives the reveal sweep
 */
export function sampleBrain({ stride = 3, seed = 11 } = {}) {
  const isInside = createMask();
  if (!isInside) return [];

  const random = createRandom(seed);
  const points = [];

  for (let gy = 0; gy < BRAIN_HEIGHT; gy += stride) {
    for (let gx = 0; gx < BRAIN_WIDTH; gx += stride) {
      const x = gx + (random() - 0.5) * stride;
      const y = gy + (random() - 0.5) * stride;
      if (!isInside(x, y)) continue;

      let neighbours = 0;
      for (let ring = 1; ring <= 3; ring += 1) {
        const step = ring * 5;
        if (isInside(x + step, y)) neighbours += 1;
        if (isInside(x - step, y)) neighbours += 1;
        if (isInside(x, y + step)) neighbours += 1;
        if (isInside(x, y - step)) neighbours += 1;
      }

      points.push({ x, y, inside: neighbours / 12, radius: radiusFromChip(x, y) });
    }
  }

  return points;
}

/**
 * Routes PCB-style traces from the chip's pins out to points in the cortex:
 * a straight run off the pin, a 45-degree turn, then a straight run to the pad.
 * Returns polylines in design space, each with its cumulative length so the
 * scene can send a pulse travelling along it.
 */
function segmentInside(a, b, isInside) {
  const steps = Math.max(2, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 4));
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    if (!isInside(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)) return false;
  }
  return true;
}

function measure(points) {
  let length = 0;
  for (let i = 1; i < points.length; i += 1) {
    length += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return length;
}

/**
 * Routes PCB-style traces from the chip pins out into the cortex: a straight
 * run off the pin, a 45-degree turn, then a straight run to the pad. Every
 * segment is walked against the brain mask, so no trace escapes the outline.
 * A second pass hangs shorter branches off the trunks for board density.
 */
export function routeTraces({ perSide = 11, seed = 5 } = {}) {
  const isInside = createMask();
  if (!isInside) return [];

  const random = createRandom(seed);
  const half = CHIP.size / 2;
  const sides = [
    { dx: 0, dy: -1, along: "x" },
    { dx: 1, dy: 0, along: "y" },
    { dx: 0, dy: 1, along: "x" },
    { dx: -1, dy: 0, along: "y" },
  ];

  const routes = [];

  sides.forEach((side) => {
    for (let index = 0; index < perSide; index += 1) {
      const offset = ((index + 0.5) / perSide - 0.5) * (CHIP.size - 8);
      const pin = {
        x: CHIP.x + side.dx * half + (side.along === "x" ? offset : 0),
        y: CHIP.y + side.dy * half + (side.along === "y" ? offset : 0),
      };

      const runOut = 12 + random() * 30;
      const elbow = { x: pin.x + side.dx * runOut, y: pin.y + side.dy * runOut };

      const turn = random() < 0.5 ? -1 : 1;
      const perpendicular = side.along === "x" ? { x: turn, y: 0 } : { x: 0, y: turn };
      // A third of the traces stay orthogonal, the rest break away at 45
      // degrees. Real boards mix the two, and it stops the fan from reading as
      // a symmetric starburst.
      const orthogonal = random() < 0.34;
      const diagonalStep = orthogonal
        ? { x: perpendicular.x, y: perpendicular.y }
        : { x: side.dx + perpendicular.x, y: side.dy + perpendicular.y };

      // Extend the diagonal and the final run as far as the cortex allows.
      let bend = elbow;
      for (let step = 0; step < 26; step += 1) {
        const candidate = {
          x: bend.x + diagonalStep.x * 7,
          y: bend.y + diagonalStep.y * 7,
        };
        if (!segmentInside(bend, candidate, isInside)) break;
        bend = candidate;
        if (step > 5 && random() < 0.06) break;
      }

      let end = bend;
      for (let step = 0; step < 24; step += 1) {
        const candidate = { x: end.x + side.dx * 7, y: end.y + side.dy * 7 };
        if (!segmentInside(end, candidate, isInside)) break;
        end = candidate;
        if (step > 4 && random() < 0.07) break;
      }

      const points = [pin, elbow, bend, end];
      const length = measure(points);
      if (length < 34) continue;
      routes.push({ points, length, radius: radiusFromChip(end.x, end.y) });
    }
  });

  // Branches: short spurs off a trunk, ending in their own pad.
  const trunks = [...routes];
  trunks.forEach((trunk, index) => {
    if (index % 2 !== 0) return;
    const anchor = pointAlong(trunk, 0.45 + random() * 0.4);
    const axis = random() < 0.5 ? { x: 1, y: 0 } : { x: 0, y: 1 };
    const way = random() < 0.5 ? -1 : 1;

    let tip = anchor;
    for (let step = 0; step < 12; step += 1) {
      const candidate = { x: tip.x + axis.x * way * 7, y: tip.y + axis.y * way * 7 };
      if (!segmentInside(tip, candidate, isInside)) break;
      tip = candidate;
      if (step > 1 && random() < 0.3) break;
    }

    const points = [anchor, tip];
    const length = measure(points);
    if (length < 18) return;
    routes.push({ points, length, radius: radiusFromChip(tip.x, tip.y), branch: true });
  });

  return routes;
}

/** Position along a routed polyline, t in 0..1 of its total length. */
export function pointAlong(route, t) {
  const target = clamp01(t) * route.length;
  let travelled = 0;
  for (let i = 1; i < route.points.length; i += 1) {
    const a = route.points[i - 1];
    const b = route.points[i];
    const segment = Math.hypot(b.x - a.x, b.y - a.y);
    if (travelled + segment >= target) {
      const local = segment === 0 ? 0 : (target - travelled) / segment;
      return { x: a.x + (b.x - a.x) * local, y: a.y + (b.y - a.y) * local };
    }
    travelled += segment;
  }
  const last = route.points[route.points.length - 1];
  return { x: last.x, y: last.y };
}

/** A sparse scatter of synapse nodes through the interior of the brain. */
export function sampleNodes({ count = 260, seed = 61 } = {}) {
  const isInside = createMask();
  if (!isInside) return [];

  const random = createRandom(seed);
  const nodes = [];
  let guard = 0;
  while (nodes.length < count && guard < count * 40) {
    guard += 1;
    const x = random() * BRAIN_WIDTH;
    const y = random() * BRAIN_HEIGHT;
    if (!isInside(x, y)) continue;
    nodes.push({ x, y, radius: radiusFromChip(x, y), seed: random() });
  }
  return nodes;
}
