"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const TRACK_URL = "/Glass%20Circuit.mp3";
const TRACK_NAME = "Glass Circuit";
// Ambient bed, not foreground music — keep it well under speech volume.
const TARGET_VOLUME = 0.18;
const FADE_MS = 1400;

// Staggered so the four bars never sync up into a metronome.
const EQ_BARS = [
  { duration: 0.9, delay: 0 },
  { duration: 1.15, delay: 0.2 },
  { duration: 0.8, delay: 0.35 },
  { duration: 1.05, delay: 0.1 },
];

export default function MusicPlayer() {
  const reduceMotion = useReducedMotion();
  const audioRef = useRef(null);
  const fadeRef = useRef(0);
  // Set once the visitor pauses on purpose, so the autoplay fallback never
  // restarts music they turned off.
  const userPausedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const fadeTo = (target, onDone) => {
    const audio = audioRef.current;
    if (!audio) return;
    window.cancelAnimationFrame(fadeRef.current);

    const from = audio.volume;
    const start = performance.now();
    const step = (now) => {
      // rAF timestamps can precede `start` by a fraction of a frame, so clamp
      // both ends or the first step computes a volume just outside [0, 1].
      const t = Math.min(Math.max((now - start) / FADE_MS, 0), 1);
      audio.volume = Math.min(Math.max(from + (target - from) * t, 0), 1);
      if (t < 1) fadeRef.current = window.requestAnimationFrame(step);
      else if (onDone) onDone();
    };
    fadeRef.current = window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    audio.volume = 0;

    let disposed = false;
    const interactions = ["pointerdown", "keydown", "touchstart"];
    const removeListeners = () => {
      interactions.forEach((type) =>
        window.removeEventListener(type, onFirstInteraction),
      );
    };

    const tryPlay = () =>
      audio
        .play()
        .then(() => {
          if (disposed) return;
          setPlaying(true);
          fadeTo(TARGET_VOLUME);
          removeListeners();
        })
        .catch(() => {
          // Autoplay blocked — the interaction listeners stay armed.
        });

    const onFirstInteraction = () => {
      if (!userPausedRef.current && audio.paused) tryPlay();
      else removeListeners();
    };

    tryPlay();
    interactions.forEach((type) =>
      window.addEventListener(type, onFirstInteraction),
    );

    return () => {
      disposed = true;
      removeListeners();
      window.cancelAnimationFrame(fadeRef.current);
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userPausedRef.current = false;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          fadeTo(TARGET_VOLUME);
        })
        .catch(() => {});
    } else {
      userPausedRef.current = true;
      setPlaying(false);
      fadeTo(0, () => audio.pause());
    }
  };

  return (
    <motion.div
      className="fixed bottom-5 left-5 z-40 sm:bottom-6 sm:left-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.5 }}
    >
      <audio ref={audioRef} src={TRACK_URL} loop preload="auto" />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : "Play background music"}
        aria-pressed={playing}
        className="group flex cursor-pointer items-center rounded-full border border-cyan-400/30 bg-[#0b2f4d]/75 shadow-[0_0_24px_rgba(56,189,248,0.22)] backdrop-blur-md transition-all duration-300 outline-offset-2 outline-cyan-300 hover:border-cyan-300/60 hover:shadow-[0_0_34px_rgba(56,189,248,0.4)] focus-visible:outline-2"
      >
        <span className="relative flex h-11 w-11 items-center justify-center">
          {playing && !reduceMotion && (
            <span
              className="absolute inset-0 rounded-full border border-cyan-400/50"
              style={{ animation: "music-ping 2.6s ease-out infinite" }}
              aria-hidden="true"
            />
          )}

          {playing ? (
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              {EQ_BARS.map((bar, index) => (
                <span
                  key={index}
                  className="h-full w-[3px] origin-bottom rounded-full"
                  style={{
                    background: "linear-gradient(to top, #38bdf8, #c8f7ff)",
                    boxShadow: "0 0 6px rgba(56,189,248,0.8)",
                    animation: reduceMotion
                      ? "none"
                      : `music-eq ${bar.duration}s ease-in-out ${bar.delay}s infinite`,
                    transform: reduceMotion ? "scaleY(0.6)" : undefined,
                  }}
                />
              ))}
            </span>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="ml-0.5 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            >
              <path
                d="M2.5 1.5v11l9.5-5.5z"
                fill="#c8f7ff"
                style={{ filter: "drop-shadow(0 0 5px rgba(56,189,248,0.9))" }}
              />
            </svg>
          )}
        </span>

        <span
          className={`${mono.className} max-w-0 overflow-hidden text-[10px] tracking-[0.3em] whitespace-nowrap text-cyan-100/80 uppercase opacity-0 transition-all duration-500 group-hover:max-w-44 group-hover:pr-4 group-hover:opacity-100 group-focus-visible:max-w-44 group-focus-visible:pr-4 group-focus-visible:opacity-100`}
        >
          {TRACK_NAME}
        </span>
      </button>
    </motion.div>
  );
}
