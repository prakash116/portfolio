import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, User, MessageSquare, CheckCircle, Loader2, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_p52ityf';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_j2yiuja';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'rk3VyQHl2omE-tVMu';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      emailjs.init({ publicKey: PUBLIC_KEY });
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_name: 'Prakash',
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone || 'Not provided',
          from_role: '',
          reply_to: formData.email,
          message: formData.message,
        }
      );
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      window.setTimeout(() => setSubmitSuccess(false), 4000);
    } catch {
      setSubmitError(true);
      window.setTimeout(() => setSubmitError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const inputStyle = (id) => ({
    background: focused === id ? 'rgba(34,211,238,0.05)' : 'rgba(255,255,255,0.03)',
    borderColor: focused === id ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.08)',
    boxShadow: focused === id ? '0 0 0 3px rgba(34,211,238,0.08)' : 'none',
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative rounded-2xl overflow-hidden h-full"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.10),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_24%),linear-gradient(135deg,_rgba(13,13,26,0.96),_rgba(15,12,41,0.92),_rgba(13,13,26,0.96))]" />

      <div
        className="relative z-10 p-6 md:p-8 border border-white/[0.07] rounded-2xl backdrop-blur-sm h-full flex flex-col"
        style={{ boxShadow: '0 0 50px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.04)' }}
      >
        <div className="flex items-center gap-3 mb-7">
          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
          >
            <Mail className="w-5 h-5 text-cyan-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white leading-tight">Send Me a Message</h2>
            <p className="text-xs text-white/35 mt-0.5">I&apos;ll reply within 24 hours</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
              Your Name
            </label>
            <div className="relative">
              <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === 'name' ? 'text-cyan-400' : 'text-white/20'}`} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
                required
                placeholder="Your full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200 border"
                style={inputStyle('name')}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === 'email' ? 'text-cyan-400' : 'text-white/20'}`} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                required
                placeholder="hello@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200 border"
                style={inputStyle('email')}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
              Mobile
            </label>
            <div className="relative">
              <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${focused === 'phone' ? 'text-cyan-400' : 'text-white/20'}`} />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200 border"
                style={inputStyle('phone')}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="message" className="block text-xs font-semibold text-white/40 uppercase tracking-wider">
                Your Message
              </label>
              <span className="text-[10px] text-white/25 font-mono tabular-nums">
                {formData.message.length}/500
              </span>
            </div>
            <div className="relative">
              <MessageSquare className={`absolute left-3.5 top-3.5 w-4 h-4 transition-colors duration-200 ${focused === 'message' ? 'text-cyan-400' : 'text-white/20'}`} />
              <textarea
                id="message"
                name="message"
                rows="4"
                maxLength={500}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                required
                placeholder="Hello, I'd like to talk about..."
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/20 outline-none transition-all duration-200 border resize-none"
                style={inputStyle('message')}
              />
            </div>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {submitError && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-400 text-center"
              >
                Failed to send. Please try again.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting || submitSuccess}
            whileHover={!isSubmitting && !submitSuccess ? { scale: 1.02, boxShadow: '0 0 30px rgba(34,211,238,0.30)' } : {}}
            whileTap={!isSubmitting && !submitSuccess ? { scale: 0.98 } : {}}
            className="w-full flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 mt-auto"
            style={{
              background: submitSuccess
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : submitError
                ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                : 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              boxShadow: submitSuccess
                ? '0 4px 20px rgba(16,185,129,0.3)'
                : submitError
                ? '0 4px 20px rgba(239,68,68,0.3)'
                : '0 4px 20px rgba(34,211,238,0.2)',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                </motion.span>
              ) : submitSuccess ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" /> Message Sent!
                </motion.span>
              ) : submitError ? (
                <motion.span
                  key="error"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  Try Again
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactFormSection;
