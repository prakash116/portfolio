import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { FaCode, FaArrowRight, FaArrowLeft, FaGithub, FaExternalLinkAlt, FaCheck, FaLightbulb } from "react-icons/fa";
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiJavascript, SiNextdotjs, SiTypescript } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const TECH_STACKS = [
  {
    id: 1,
    name: "JavaScript",
    icon: <SiJavascript size={36} />,
    description: "Versatile scripting language for web development — both client-side and server-side.",
    codeExample: `// Arrow function with array methods
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n * n);

console.log(squared); // [1, 4, 9, 16, 25]`,
    proficiency: 95,
    useCases: ["Web interactivity", "Server-side programming", "Mobile app development"],
    projectIdeas: ["Interactive web games", "Form validation scripts", "Dynamic content loaders"],
    color: "#F7DF1E",
    docsLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    githubLink: "https://github.com/tc39/ecma262",
  },
  {
    id: 2,
    name: "React",
    icon: <SiReact size={36} />,
    description: "Declarative component-based UI library for building interactive interfaces.",
    codeExample: `// Functional component with hooks
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
    proficiency: 95,
    useCases: ["Single page apps", "Interactive dashboards", "Progressive web apps"],
    projectIdeas: ["Task management app", "Real-time chat interface", "Data visualisation dashboard"],
    color: "#61DAFB",
    docsLink: "https://react.dev/",
    githubLink: "https://github.com/facebook/react",
  },
  {
    id: 3,
    name: "Node.js",
    icon: <SiNodedotjs size={36} />,
    description: "JavaScript runtime built on Chrome's V8 engine for server-side applications.",
    codeExample: `// Read a file asynchronously
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}

readFile();`,
    proficiency: 90,
    useCases: ["Backend services", "CLI tools", "Web servers"],
    projectIdeas: ["API gateway", "Web scraper", "Automation scripts"],
    color: "#68A063",
    docsLink: "https://nodejs.org/api/documentation.html",
    githubLink: "https://github.com/nodejs/node",
  },
  {
    id: 4,
    name: "Express.js",
    icon: <SiExpress size={36} />,
    description: "Fast, unopinionated web framework for Node.js — the standard for REST APIs.",
    codeExample: `// Basic Express server
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.listen(3000, () =>
  console.log('Server running on port 3000')
);`,
    proficiency: 90,
    useCases: ["REST APIs", "Server-side rendering", "Middleware systems"],
    projectIdeas: ["Authentication service", "File upload API", "Payment gateway integration"],
    color: "#a0a0a0",
    docsLink: "https://expressjs.com/",
    githubLink: "https://github.com/expressjs/express",
  },
  {
    id: 5,
    name: "MongoDB",
    icon: <SiMongodb size={36} />,
    description: "NoSQL document database with flexible schemas for modern applications.",
    codeExample: `// Create & query documents
await db.users.insertOne({
  name: "Prakash Mani",
  email: "p@example.com",
  skills: ["React", "Node.js"],
});

const devs = await db.users
  .find({ skills: "React" })
  .sort({ name: 1 })
  .toArray();`,
    proficiency: 85,
    useCases: ["User profiles", "Product catalogs", "Content management"],
    projectIdeas: ["Blog with comments", "E-commerce database", "Real-time analytics"],
    color: "#4DB33D",
    docsLink: "https://docs.mongodb.com/",
    githubLink: "https://github.com/mongodb/mongo",
  },
  {
    id: 6,
    name: "Next.js",
    icon: <SiNextdotjs size={36} />,
    description: "React framework for production — SSR, SSG, file-based routing, and API routes in one package.",
    codeExample: `// App Router page with Server Component
export default async function Page({ params }) {
  const data = await fetch(
    \`https://api.example.com/posts/\${params.id}\`,
    { next: { revalidate: 60 } }
  ).then(r => r.json());

  return (
    <article>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </article>
  );
}`,
    proficiency: 88,
    useCases: ["Server-side rendering", "Static site generation", "Full-stack apps"],
    projectIdeas: ["Blog with MDX", "E-commerce storefront", "SaaS dashboard"],
    color: "#ffffff",
    docsLink: "https://nextjs.org/docs",
    githubLink: "https://github.com/vercel/next.js",
  },
  {
    id: 7,
    name: "React Native",
    icon: <TbBrandReactNative size={36} />,
    description: "Build native iOS & Android apps using React — one codebase, truly native performance.",
    codeExample: `// React Native screen with hooks
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
      <TouchableOpacity onPress={() => setCount(c => c + 1)}>
        <Text style={styles.btn}>Tap me</Text>
      </TouchableOpacity>
    </View>
  );
}`,
    proficiency: 82,
    useCases: ["Cross-platform mobile apps", "Native device APIs", "Offline-capable apps"],
    projectIdeas: ["Food delivery app", "Fitness tracker", "Real-time chat app"],
    color: "#61DAFB",
    docsLink: "https://reactnative.dev/docs/getting-started",
    githubLink: "https://github.com/facebook/react-native",
  },
  {
    id: 8,
    name: "TypeScript",
    icon: <SiTypescript size={36} />,
    description: "Typed superset of JavaScript that compiles to plain JS — catch bugs at compile time, not runtime.",
    codeExample: `// Typed API response with generics
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}`,
    proficiency: 85,
    useCases: ["Large codebases", "Team collaboration", "Auto-completion & refactoring"],
    projectIdeas: ["Type-safe REST client", "CLI tool", "Typed React component library"],
    color: "#3178C6",
    docsLink: "https://www.typescriptlang.org/docs/",
    githubLink: "https://github.com/microsoft/TypeScript",
  },
];

const AUTOPLAY_MS = 6000;

/** One slide. `active` drives the entrance animations so they replay each time the slide is shown. */
const TechCard = ({ tech, active }) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <article
      className="h-full flex flex-col md:flex-row rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(13,13,26,0.92) 0%, rgba(10,10,20,0.95) 100%)",
        border: `1px solid ${tech.color}28`,
        boxShadow: `0 0 50px ${tech.color}12, inset 0 1px 0 rgba(255,255,255,0.04)`,
      }}
    >
      {/* ── Left panel ── */}
      <div className="flex-1 p-6 md:p-8 flex flex-col min-w-0">

        {/* Icon + name */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-2xl opacity-40"
              style={{ background: `radial-gradient(closest-side, ${tech.color}, transparent)` }} />
            <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: `${tech.color}18`, border: `1px solid ${tech.color}35` }}>
              <span style={{ color: tech.color }}>{tech.icon}</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-none mb-0.5">
              {tech.name}
            </h2>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: tech.color }}>
              Core Technology
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/50 text-base leading-relaxed mb-5">{tech.description}</p>

        {/* Proficiency bar */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-white/35 uppercase tracking-widest">Proficiency</span>
            <span className="text-base font-bold text-white">{tech.proficiency}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <motion.div
              className="h-full rounded-full"
              initial={false}
              animate={{ width: active ? `${tech.proficiency}%` : "0%" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{
                background: `linear-gradient(90deg, ${tech.color}70, ${tech.color})`,
                boxShadow: `0 0 10px ${tech.color}60`,
              }}
            />
          </div>
        </div>

        {/* Use cases */}
        <div className="mb-auto">
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2.5">Use Cases</h3>
          <ul className="space-y-2">
            {tech.useCases.map((uc, i) => (
              <motion.li
                key={uc}
                initial={false}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ delay: active ? 0.1 + i * 0.07 : 0 }}
                className="flex items-center gap-2.5 text-base text-white/60"
              >
                <FaCheck className="w-3 h-3 flex-shrink-0" style={{ color: tech.color }} />
                {uc}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-white/[0.05]">
          <a href={tech.docsLink} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/55 hover:text-white border border-white/[0.07] transition-all font-medium">
            <FaExternalLinkAlt className="w-3 h-3" /> Docs
          </a>
          <a href={tech.githubLink} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/55 hover:text-white border border-white/[0.07] transition-all font-medium">
            <FaGithub className="w-3 h-3" /> GitHub
          </a>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowCode((p) => !p)}
            tabIndex={active ? 0 : -1}
            className="ml-auto flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border transition-all font-semibold"
            style={{
              background: showCode ? `${tech.color}18` : "rgba(255,255,255,0.04)",
              borderColor: showCode ? `${tech.color}45` : "rgba(255,255,255,0.07)",
              color: showCode ? tech.color : "rgba(255,255,255,0.45)",
            }}
          >
            <FaCode className="w-3 h-3" />
            {showCode ? "Hide Code" : "View Code"}
          </motion.button>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px self-stretch my-5"
        style={{ background: `linear-gradient(to bottom, transparent, ${tech.color}25, transparent)` }} />

      {/* ── Right panel ── */}
      <div className="flex-1 p-6 md:p-8 bg-black/15 min-w-0 overflow-auto">
        <AnimatePresence mode="wait" initial={false}>
          {showCode ? (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {/* Fake browser chrome */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <span className="ml-2 text-xs text-white/20 font-mono">
                  example.{tech.name.toLowerCase().replace(/[\s.]/g, "")}
                </span>
              </div>
              <pre className="rounded-xl p-4 overflow-x-auto text-sm font-mono leading-relaxed border border-white/[0.05]"
                style={{ background: "rgba(5,5,15,0.7)" }}>
                <code className="text-emerald-300/80">{tech.codeExample}</code>
              </pre>
            </motion.div>
          ) : (
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="h-full flex flex-col"
            >
              {/* Icon — only the visible slide animates, so hidden slides cost nothing */}
              <div className="flex flex-col items-center pt-2 mb-5">
                <motion.div
                  style={{ color: tech.color }}
                  animate={active ? { scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] } : { scale: 1, rotate: 0 }}
                  transition={active ? { repeat: Infinity, duration: 5, ease: "easeInOut" } : { duration: 0.2 }}
                  className="mb-2"
                >
                  <span style={{ fontSize: 52 }}>{tech.icon}</span>
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-0.5">Project Ideas</h3>
                <p className="text-xs text-white/30">Click "View Code" for code examples</p>
              </div>

              {/* Project idea cards */}
              <div className="space-y-2.5">
                {tech.projectIdeas.map((idea, i) => (
                  <motion.div
                    key={idea}
                    initial={false}
                    animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                    transition={{ delay: active ? i * 0.07 : 0 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.05] hover:border-white/[0.12] transition-colors group cursor-default"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    <FaLightbulb className="w-3.5 h-3.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ color: tech.color }} />
                    <span className="text-base text-white/60 group-hover:text-white/85 transition-colors">{idea}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
};

/**
 * "My Tech Arsenal" carousel.
 * Built on Embla (the engine behind shadcn/ui's Carousel): native drag/swipe,
 * looping autoplay, and zero per-frame work while idle.
 */
const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  const tech = TECH_STACKS[selectedIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0d0d1a] to-[#080810] py-16 px-4 md:px-8"
      aria-roledescription="carousel"
      aria-label="My tech arsenal"
    >
      {/* Ambient glow — static gradients, no canvas, no per-frame cost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(640px 320px at 20% 0%, rgba(34,211,238,0.10), transparent 70%)," +
            "radial-gradient(640px 320px at 80% 100%, rgba(139,92,246,0.12), transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-3">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">My Tech Arsenal</h2>
          <p className="text-white/35 text-base mt-1.5">Technologies I build production apps with</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden rounded-2xl">
            <div className="flex touch-pan-y">
              {TECH_STACKS.map((t, i) => (
                <div
                  key={t.id}
                  className="flex-[0_0_100%] min-w-0 min-h-[440px] md:min-h-[460px]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${TECH_STACKS.length}: ${t.name}`}
                  aria-hidden={i !== selectedIndex}
                >
                  <TechCard tech={t} active={i === selectedIndex} />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop nav arrows (outside card) */}
          <button onClick={scrollPrev} aria-label="Previous technology"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 hidden md:flex w-10 h-10 rounded-full items-center justify-center text-white/40 hover:text-white border border-white/[0.08] bg-[#0d0d1a] hover:bg-white/[0.1] transition-all z-20">
            <FaArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={scrollNext} aria-label="Next technology"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 hidden md:flex w-10 h-10 rounded-full items-center justify-center text-white/40 hover:text-white border border-white/[0.08] bg-[#0d0d1a] hover:bg-white/[0.1] transition-all z-20">
            <FaArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile nav arrows (inside card) */}
          <button onClick={scrollPrev} aria-label="Previous technology"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex md:hidden w-8 h-8 rounded-full items-center justify-center text-white/40 bg-black/40 border border-white/[0.07] z-20">
            <FaArrowLeft className="w-3 h-3" />
          </button>
          <button onClick={scrollNext} aria-label="Next technology"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex md:hidden w-8 h-8 rounded-full items-center justify-center text-white/40 bg-black/40 border border-white/[0.07] z-20">
            <FaArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Pill indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {TECH_STACKS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => scrollTo(i)}
              aria-label={`Go to ${t.name}`}
              aria-current={i === selectedIndex ? "true" : undefined}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.8 }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === selectedIndex ? 28 : 8,
                height: 8,
                backgroundColor: i === selectedIndex ? tech.color : "rgba(255,255,255,0.18)",
                boxShadow: i === selectedIndex ? `0 0 10px ${tech.color}70` : "none",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
