'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/church-exterior.jpg)' }} />
      <div className="absolute inset-0 bg-primary/70" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white font-bold mb-6">
            Living Epistle Baptist Church
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 font-medium mb-8"
        >
          Welcome to the House of God
        </motion.p>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gold font-medium italic mb-10 max-w-3xl mx-auto"
        >
          "The Church of the living God, the pillar and ground of the truth."
          <span className="block text-white/70 text-base mt-2 not-italic">— 1 Timothy 3:15</span>
        </motion.blockquote>

        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-gold text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-gold/30"
        >
          Learn More
        </motion.a>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 1.5, delay: 1.2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-gold transition-colors"
      >
        <ChevronDown size={40} />
      </motion.a>
    </section>
  );
}