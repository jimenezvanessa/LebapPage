'use client';

import { motion } from 'framer-motion';

const pastors = [
  {
    name: 'Ezzard Ayson',
    position: 'Lead Pastor',
    bio: 'Leading our church with wisdom, compassion, and dedication to the Word of God.',
    isLead: true,
  },
  {
    name: 'Pastor Placeholder 2',
    position: 'Associate Pastor',
    bio: 'Placeholder - Upload photo and details through admin panel.',
    isLead: false,
  },
  {
    name: 'Pastor Placeholder 3',
    position: 'Youth Pastor',
    bio: 'Placeholder - Upload photo and details through admin panel.',
    isLead: false,
  },
  {
    name: 'Pastor Placeholder 4',
    position: 'Worship Leader',
    bio: 'Placeholder - Upload photo and details through admin panel.',
    isLead: false,
  },
  {
    name: 'Pastor Placeholder 5',
    position: 'Discipleship Pastor',
    bio: 'Placeholder - Upload photo and details through admin panel.',
    isLead: false,
  },
];

export default function Pastors() {
  return (
    <section id="pastors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading text-primary font-bold mb-4">
            Meet Our Pastors
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of shepherds guiding the flock of God
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {pastors.map((pastor, index) => (
            <motion.div
              key={pastor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                {pastor.isLead ? (
                  <img src="/images/pastor-ezzard.jpg" alt={pastor.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <span className="text-primary/30 font-heading text-lg text-center px-4">
                      {pastor.name}
                    </span>
                  </div>
                )}
                {pastor.isLead && (
                  <div className="absolute top-4 right-4 bg-gold text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    Lead Pastor
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-heading text-primary font-semibold mb-1">
                  {pastor.name}
                </h3>
                <p className="text-gold text-sm font-medium mb-3">{pastor.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pastor.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}