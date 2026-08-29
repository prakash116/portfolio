import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiTypescript, SiExpress } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const INFO_ITEMS = [
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Email",
    value: "prakashmanig000@gmail.com",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Phone",
    value: "+91 8795901180",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: <GraduationCap className="w-4 h-4" />,
    label: "Qualification",
    value: "B.Tech – Computer Science",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Location",
    value: "Azadpur, Delhi · India",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

const STATS = [
  { value: "2.5+", label: "Years Exp." },
  { value: "5+", label: "Projects" },
  { value: "10+", label: "Technologies" },
];

const TECH_STACK = [
  { icon: <SiReact className="w-3.5 h-3.5" />,           label: "React",        color: "#22d3ee" },
  { icon: <SiNextdotjs className="w-3.5 h-3.5" />,       label: "Next.js",      color: "#e2e8f0" },
  { icon: <TbBrandReactNative className="w-3.5 h-3.5" />,label: "React Native", color: "#38bdf8" },
  { icon: <SiNodedotjs className="w-3.5 h-3.5" />,       label: "Node.js",      color: "#4ade80" },
  { icon: <SiExpress className="w-3.5 h-3.5" />,         label: "Express.js",   color: "#a78bfa" },
  { icon: <SiMongodb className="w-3.5 h-3.5" />,         label: "MongoDB",      color: "#34d399" },
  { icon: <SiTypescript className="w-3.5 h-3.5" />,      label: "TypeScript",   color: "#60a5fa" },
];

const ProfileCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative rounded-3xl overflow-hidden border border-white/[0.07]"
    style={{
      background: "linear-gradient(135deg, rgba(13,13,26,0.97) 0%, rgba(15,12,41,0.95) 50%, rgba(13,13,26,0.97) 100%)",
      boxShadow: "0 0 60px rgba(34,211,238,0.06), 0 0 120px rgba(168,85,247,0.04)",
    }}
  >
    {/* Ambient corner glows */}
    <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />
    {/* Top gradient bar */}
    <div className="h-[2px] w-full" style={{ background: "linear-gradient(to right, #22d3ee, #a855f7, #3b82f6)" }} />

    <div className="relative z-10 p-5 md:p-7 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-stretch">

      {/* ── Left: photo + name ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col items-center justify-between gap-5 flex-shrink-0"
      >
        {/* Photo with animated ring */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-6px] rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #22d3ee, #a855f7, #3b82f6, #22d3ee)",
              padding: "2px",
              borderRadius: "9999px",
            }}
          />
          <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#0d0d1a]">
            <Image
              src="/prakash.png"
              alt="Prakash Mani"
              width={144}
              height={144}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online dot */}
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0d0d1a]">
            <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
          </div>
        </div>

        {/* Name + title */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Prakash Mani</h2>
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">MERN Stack Developer</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <Calendar className="w-3 h-3 text-white/30" />
            <span className="text-[11px] text-white/30">Available for work</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2.5">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="text-center px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <p className="text-base font-extrabold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent leading-none">
                {s.value}
              </p>
              <p className="text-[9px] text-white/35 mt-0.5 whitespace-nowrap">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Right: info + tech ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 w-full min-w-0 flex flex-col justify-between gap-3"
      >
        {/* Info grid — flex-1 + auto-rows fills available height */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1"
          style={{ gridAutoRows: "1fr" }}
        >
          {INFO_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              whileHover={{ y: -2 }}
              className={`h-full flex items-center gap-3 p-3.5 rounded-xl border ${item.border} bg-white/[0.025] hover:bg-white/[0.05] transition-all group`}
            >
              <div className={`w-8 h-8 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center flex-shrink-0 ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-white/35 uppercase tracking-wider mb-0.5">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-white/85 break-all leading-snug">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech stack */}
        <div>
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-2.5">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                whileHover={{ y: -3, scale: 1.08 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.09] transition-all cursor-default"
              >
                <span style={{ color: tech.color }} className="flex-shrink-0">{tech.icon}</span>
                <span className="text-xs font-semibold text-white/80">{tech.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default ProfileCard;
