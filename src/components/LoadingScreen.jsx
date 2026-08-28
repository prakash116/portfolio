import { motion, useReducedMotion } from "framer-motion";

/** How long the loader stays up before the site is revealed. App.jsx uses this for its timer. */
export const LOADING_DURATION_MS = 2000;

const NAME = "Prakash Mani";
const EASE_OUT = [0.22, 1, 0.36, 1];

// Same "P" as public/m.svg so the loader and the favicon are literally the same mark.
const P_PATH =
  "M30 20H70C85 20 100 35 100 50C100 65 85 80 70 80H50V100H30V20Z";

/**
 * Full-screen intro shown once on first load.
 * The brand "P" draws itself, then fills with the brand gradient while a
 * determinate bar tracks the real timer — so it reads as progress, not a wait.
 */
const LoadingScreen = () => {
  const reduceMotion = useReducedMotion();
  const seconds = LOADING_DURATION_MS / 1000;

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-[#0b0a14] text-white"
      initial={{ opacity: 1 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {/* Atmosphere: the same hues the hero opens with, so the reveal feels continuous */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/25 blur-3xl" />

      <div className="relative flex flex-col items-center gap-7 px-6">
        {/* Brand mark */}
        <div className="relative h-28 w-28 sm:h-32 sm:w-32">
          {/* Orbit ring */}
          <motion.svg
            viewBox="0 0 120 120"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <linearGradient id="loader-ring" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="1.5" />
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="none"
              stroke="url(#loader-ring)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="90 262"
            />
          </motion.svg>

          {/* The "P" draws itself, then fills */}
          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="loader-p" x1="30" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <g transform="translate(60 60) scale(0.68) translate(-65 -60)">
              <motion.path
                d={P_PATH}
                stroke="url(#loader-p)"
                strokeWidth="5"
                strokeLinejoin="round"
                fill="url(#loader-p)"
                initial={reduceMotion ? { pathLength: 1, fillOpacity: 1 } : { pathLength: 0, fillOpacity: 0 }}
                animate={{ pathLength: 1, fillOpacity: 1 }}
                transition={{
                  pathLength: { duration: 1.1, ease: "easeInOut" },
                  fillOpacity: { duration: 0.5, delay: 0.9 },
                }}
              />
            </g>
          </svg>
        </div>

        {/* Name */}
        <div className="flex flex-col items-center gap-2 text-center">
          <motion.span
            className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Portfolio
          </motion.span>
          <motion.h1
            className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
            initial={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)", y: 6 }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)", y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
          >
            {NAME}
          </motion.h1>
        </div>

        {/* Determinate progress — fills over exactly the loader's lifetime */}
        <div className="h-0.5 w-52 overflow-hidden rounded-full bg-white/10 sm:w-64" aria-hidden="true">
          <motion.div
            className="h-full w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: seconds, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
