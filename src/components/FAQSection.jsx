import { motion } from 'framer-motion';

const FAQSection = () => {
  return (
    <div className="relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-xl blur opacity-20"></div>
      <div className="relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-medium text-white">What's your typical response time?</h3>
            <p className="text-gray-300 mt-1">I usually respond to emails within 24 hours on weekdays.</p>
          </div>
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-medium text-white">Do you work with international clients?</h3>
            <p className="text-gray-300 mt-1">Yes, I'm open to working with clients from anywhere in the world.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">What's your availability for new projects?</h3>
            <p className="text-gray-300 mt-1">I'm currently accepting new projects. Let's discuss your timeline!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;