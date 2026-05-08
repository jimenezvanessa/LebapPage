'use client';

import { motion } from 'framer-motion';

const churches = [
  {
    name: 'Grace Baptist Church',
    location: 'Manila, Philippines',
    pastor: 'Pastor John Doe',
    description: 'A sister church dedicated to spreading the Gospel in the metro area.',
  },
  {
    name: 'Faith Baptist Church',
    location: 'Cebu City, Philippines',
    Pastor: 'Pastor Jane Smith',
    description: 'Serving the community in the Visayas region with love and truth.',
  },
  {
    name: 'Hope Baptist Church',
    location: 'Davao City, Philippines',
    Pastor: 'Pastor Mike Wilson',
    description: 'A growing fellowship in Mindanao bringing hope to many.',
  },
];

export default function SisterChurches() {
  return (
    <section id="sister-churches" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading text-white font-bold mb-4">
            Sister Churches
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Our brothers and sisters in Christ across the nation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {churches.map((church, index) => (
            <motion.div
              key={church.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="aspect-video bg-white/10 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 font-heading text-lg">{church.name}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading text-white font-semibold mb-2">
                  {church.name}
                </h3>
                <p className="text-gold text-sm font-medium mb-3">{church.location}</p>
                <p className="text-white/70 text-sm mb-3">{church.description}</p>
                <p className="text-white/50 text-sm">
                  <span className="text-gold">Pastor:</span> {church.pastor || church.Pastor}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}