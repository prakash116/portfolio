"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import BrainScene, { PALETTE } from "./loading/BrainScene";

export const LOADING_DURATION_MS = 3200;

const EASE_OUT = [0.22, 1, 0.36, 1];

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Sensor grain, inlined so the loader has no asset requests to wait on.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")";

export default function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const seconds = LOADING_DURATION_MS / 1000;

  // `initial` is what gets server-rendered into the style attribute, so it must
  // not depend on reduced motion: that preference is only known on the client,
  // and branching on it here breaks hydration. Reduced motion instead collapses
  // each entrance to zero duration, so the copy simply appears in place.
  const enter = (delay, duration = 0.7) => ({
    duration: reduceMotion ? 0 : duration,
    delay: reduceMotion ? 0 : delay,
    ease: EASE_OUT,
  });

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading the portfolio of Prakash Mani"
      className={`${display.className} fixed inset-0 z-60 isolate overflow-hidden`}
      style={{ backgroundColor: PALETTE.void, color: PALETTE.ink }}
      initial={{ opacity: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, scale: 1.05, filter: "blur(16px) brightness(1.7)" }
      }
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      {/* Ambient light: warm where the brain sits, cool across the copy. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_46%,rgba(255,122,24,0.2),transparent_52%),radial-gradient(ellipse_at_74%_58%,rgba(56,189,248,0.14),transparent_55%),radial-gradient(ellipse_at_50%_120%,rgba(56,189,248,0.1),transparent_60%)]"
        aria-hidden="true"
      />
      {/* Faint circuit grid, masked to the centre so edges stay clean. */}
      <div
        className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(56,189,248,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.07)_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_at_center,black,transparent_72%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
        aria-hidden="true"
      />

      <BrainScene reduceMotion={reduceMotion} durationMs={LOADING_DURATION_MS} />

      {/* Vignette, above the scene, to seat the glow in the dark. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(2,4,10,0.7)_100%)]"
        aria-hidden="true"
      />

      {/* Copy: stacked under the brain on phones, beside it on wide screens. */}
      <div className="absolute inset-x-6 bottom-[7vh] z-10 text-center lg:inset-x-auto lg:inset-y-0 lg:right-[7vw] lg:flex lg:w-[38vw] lg:max-w-136 lg:flex-col lg:justify-center lg:text-left">
        <motion.p
          className={`${mono.className} text-[10px] uppercase tracking-[0.42em] sm:text-xs`}
          style={{ color: PALETTE.circuit }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter(0.3)}
        >
          Neural core online
        </motion.p>

        <motion.p
          className="mt-4 text-[clamp(1.1rem,5.2vw,1.9rem)] font-medium leading-none tracking-wide lg:text-[clamp(1.6rem,2.1vw,2.4rem)]"
          style={{ color: "rgba(232,244,255,0.7)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter(0.42)}
        >
          Loading the work of
        </motion.p>

        <motion.h1
          className="mt-2 text-[clamp(2.2rem,12.5vw,4.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.01em] lg:mt-3 lg:text-[clamp(3.4rem,4.6vw,5.4rem)]"
          style={{ textShadow: "0 0 38px rgba(56,189,248,0.45)" }}
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={enter(0.55, 0.8)}
        >
          Prakash Mani
        </motion.h1>

        <motion.span
          className="mx-auto mt-3 block h-0.75 w-28 sm:w-36 lg:mx-0 lg:mt-4 lg:w-44"
          style={{
            originX: 0,
            background: `linear-gradient(90deg, ${PALETTE.circuit}, ${PALETTE.amber})`,
            boxShadow: "0 0 18px rgba(255,122,24,0.75)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={enter(1, 0.6)}
          aria-hidden="true"
        />

        <motion.p
          className="mt-4 text-[clamp(1.4rem,7vw,2.5rem)] font-medium leading-none lg:mt-5 lg:text-[clamp(2rem,2.6vw,3rem)]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter(0.85)}
        >
          Full-stack{" "}
          <span
            className="font-bold uppercase"
            style={{ color: PALETTE.amber, textShadow: "0 0 26px rgba(255,122,24,0.6)" }}
          >
            developer
          </span>
        </motion.p>

        <motion.div
          className="mx-auto mt-8 w-full max-w-xs lg:mx-0 lg:mt-10 lg:max-w-sm"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={enter(1.1)}
        >
          <div
            className={`${mono.className} mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] sm:text-xs`}
            style={{ color: "rgba(232,244,255,0.45)" }}
          >
            <span>Initialising</span>
            <span style={{ color: PALETTE.circuit }}>Three.js</span>
          </div>
          <div className="h-0.75 w-full overflow-hidden rounded-full bg-[rgba(56,189,248,0.14)]">
            <motion.div
              className="h-full w-full rounded-full"
              style={{
                originX: 0,
                background: `linear-gradient(90deg, ${PALETTE.circuit} 0%, ${PALETTE.signal} 45%, ${PALETTE.amber} 100%)`,
                boxShadow: "0 0 14px rgba(56,189,248,0.8)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: seconds, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      <motion.p
        className={`${mono.className} absolute bottom-8 left-10 z-10 hidden text-xs uppercase tracking-[0.3em] sm:block`}
        style={{ color: "rgba(232,244,255,0.35)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={enter(1.25, 0.6)}
      >
        Built with Three.js + Next.js
      </motion.p>
    </motion.div>
  );
}
