"use client";

import { useEffect } from "react";

// Synthesised UI click tones, matched to the site's circuit aesthetic. Web
// Audio generates them on the fly, so there are no sound files to load.
// Volumes are kept low so they sit under the ambient music, not on top of it.

const CLICKABLE = "button, a, [role='button'], input[type='submit']";
const MIN_GAP_MS = 70; // one sound per tap, even when events double-fire

export default function ClickSounds() {
  useEffect(() => {
    let ctx;
    const getCtx = () => {
      if (!ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        ctx = new AudioCtx();
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    };

    // One short pitched blip: freq sweeps from -> to while the gain decays.
    const tone = (audio, { type, from, to, duration, volume, delay = 0 }) => {
      const start = audio.currentTime + delay;
      const osc = audio.createOscillator();
      const gain = audio.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(from, start);
      osc.frequency.exponentialRampToValueAtTime(to, start + duration);
      gain.gain.setValueAtTime(volume, start);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      osc.connect(gain);
      gain.connect(audio.destination);
      osc.start(start);
      osc.stop(start + duration + 0.02);
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    };

    // Buttons: a two-layer "chip tap" — a low thock with a bright ping on top.
    const buttonTone = (audio) => {
      tone(audio, { type: "triangle", from: 520, to: 320, duration: 0.09, volume: 0.055 });
      tone(audio, { type: "sine", from: 1250, to: 1600, duration: 0.05, volume: 0.03, delay: 0.01 });
    };

    // Links: a single lighter tick, quicker and higher than the button tap.
    const linkTone = (audio) => {
      tone(audio, { type: "sine", from: 950, to: 1300, duration: 0.055, volume: 0.04 });
    };

    let lastAt = 0;
    const playFor = (element) => {
      const now = performance.now();
      if (now - lastAt < MIN_GAP_MS) return;
      lastAt = now;

      const audio = getCtx();
      if (!audio) return;
      if (element.tagName === "A") linkTone(audio);
      else buttonTone(audio);
    };

    const resolveTarget = (event) => {
      const element = event.target?.closest?.(CLICKABLE);
      if (!element || element.disabled) return null;
      if (element.closest("[data-no-click-sound]")) return null;
      return element;
    };

    const onPointerDown = (event) => {
      if (event.button !== 0) return; // primary button / touch only
      const element = resolveTarget(event);
      if (element) playFor(element);
    };

    // Keyboard activation gets the same feedback as a pointer tap.
    const onKeyDown = (event) => {
      if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
      const element = resolveTarget(event);
      if (element) playFor(element);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
      if (ctx) ctx.close();
    };
  }, []);

  return null;
}
