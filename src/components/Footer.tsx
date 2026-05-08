'use client';

import { motion } from 'framer-motion';
import { Church, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <img src="/images/logo.png" alt="Logo" className="h-12 w-12 object-contain rounded" />
              <div>
                <span className="text-white font-heading text-lg font-bold block">
                  Living Epistle
                </span>
                <span className="text-gold text-xs font-medium">
                  Baptist Church
                </span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              Living Epistle Baptist Church - The Church of the living God, the pillar and ground of the truth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-heading text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'History', 'Pastors', 'Sister Churches', 'Gallery', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-white/70 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-white font-heading text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-white/70">
                <MapPin size={18} className="text-gold" />
                <span>Philippines</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Phone size={18} className="text-gold" />
                <span>+63 (XXX) XXX-XXXX</span>
              </li>
              <li className="flex items-center space-x-3 text-white/70">
                <Mail size={18} className="text-gold" />
                <span>info@lebc.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-white font-heading text-lg font-semibold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/LEBapchurch"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 rounded-full text-white hover:bg-gold hover:text-primary transition-colors text-sm"
              >
                Facebook
              </a>
              <a
                href="#"
                className="px-4 py-2 bg-white/10 rounded-full text-white hover:bg-gold hover:text-primary transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="#"
                className="px-4 py-2 bg-white/10 rounded-full text-white hover:bg-gold hover:text-primary transition-colors text-sm"
              >
                YouTube
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50">
            © {new Date().getFullYear()} Living Epistle Baptist Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}