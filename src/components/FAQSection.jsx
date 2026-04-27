import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'What response time should I expect?',
    answer: 'Most messages get a reply within 24 hours on weekdays, often sooner when the project brief is clear.',
  },
  {
    question: 'Do you work with international clients?',
    answer: 'Yes. I regularly collaborate remotely and can adapt to async workflows, shared docs, and scheduled calls.',
  },
  {
    question: 'Are you available for new projects right now?',
    answer: 'Yes. If you share scope, timeline, and current priorities, I can quickly tell you whether the fit is right.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/55 shadow-[0_24px_60px_rgba(2,6,23,0.36)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.1),_transparent_30%)]" />
      <div className="relative z-10 p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-200">
            <HelpCircle className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
            <p className="mt-1 text-sm text-slate-400">A few quick answers before you reach out.</p>
          </div>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <div
                key={item.question}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] px-5 py-4"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-base font-semibold text-white">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default FAQSection;
