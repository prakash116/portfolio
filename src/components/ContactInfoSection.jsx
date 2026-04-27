import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const CONTACTS = [
  {
    icon: <Mail className="w-5 h-5" />,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    label: 'Email',
    value: 'prakashmanig000@gmail.com',
    sub: 'Typically replies within 24 hours',
  },
  {
    icon: <Phone className="w-5 h-5" />,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    label: 'Phone',
    value: '+91 8795901180',
    sub: 'Mon-Sun, 8AM - 6PM IST',
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    label: 'Location',
    value: 'Azadpur, Delhi',
    sub: 'Open to remote work',
  },
];

const SOCIALS = [
  { href: 'https://github.com/prakash116', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/prakashmani87/', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
  { href: 'https://x.com/prakashmani87', icon: <Twitter className="w-5 h-5" />, label: 'X / Twitter' },
];

const ContactInfoSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden h-full"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(168,85,247,0.10),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(34,211,238,0.08),_transparent_26%),linear-gradient(135deg,_rgba(13,13,26,0.96),_rgba(18,8,32,0.92),_rgba(13,13,26,0.96))]" />

      <div
        className="relative z-10 p-6 md:p-8 border border-white/[0.07] rounded-2xl h-full backdrop-blur-sm flex flex-col"
        style={{ boxShadow: '0 0 50px rgba(168,85,247,0.05), inset 0 1px 0 rgba(255,255,255,0.04)' }}
      >
        <div className="flex items-center gap-3 mb-7">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(168,85,247,0.12)]"
          >
            <Mail className="w-5 h-5 text-purple-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Contact Information</h2>
            <p className="text-xs text-white/35 mt-0.5">Let&apos;s build something great together</p>
          </div>
        </div>

        <div className="space-y-4 mb-8 flex-1">
          {CONTACTS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.color} group-hover:scale-110 transition-transform`}>
                {c.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-0.5">{c.label}</p>
                <p className="text-sm font-medium text-white/85 break-all">{c.value}</p>
                <p className="text-xs text-white/35 mt-0.5">{c.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        <div>
          <p className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3">Follow Me</p>
          <div className="flex gap-3">
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                viewport={{ once: true }}
                className="w-11 h-11 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.07] flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoSection;
