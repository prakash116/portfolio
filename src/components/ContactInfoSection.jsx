import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ContactInfoSection = () => {
  const MotionNavLink = motion(NavLink);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl blur opacity-20"></div>
        <div className="relative bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl border border-gray-700 h-full">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                <Mail className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Email</h3>
                <p className="text-gray-300">prakashmanig000@gmail.com</p>
                <p className="text-gray-400 text-sm mt-1">Typically replies within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-green-500/10 rounded-lg text-green-400">
                <Phone className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Phone</h3>
                <p className="text-gray-300">+91 8795901180 , +91 8795901183</p>
                <p className="text-gray-400 text-sm mt-1">Mon-Sun, 8AM - 6PM EST</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 p-3 bg-amber-500/10 rounded-lg text-amber-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Location</h3>
                <p className="text-gray-300">Azadpur Delhi</p>
                <p className="text-gray-400 text-sm mt-1">Open to remote work</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-white mb-4">Follow Me</h3>
            <div className="flex space-x-4">
              <MotionNavLink
                to="https://github.com/prakash116"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </MotionNavLink>
              <MotionNavLink
                to="https://www.linkedin.com/in/prakashmani87/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </MotionNavLink>
              <MotionNavLink
                to="https://x.com/prakashmani87"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </MotionNavLink>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoSection;