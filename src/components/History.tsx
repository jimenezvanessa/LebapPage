'use client';

import { motion } from 'framer-motion';

const timelineEvents = [
  {
    year: '2020',
    title: 'Church Founded',
    description: 'Living Epistle Baptist Church was established with a vision to spread the Gospel.',
  },
  {
    year: '2021',
    title: 'First Building',
    description: 'Acquired our permanent place of worship and fellowship.',
  },
  {
    year: '2022',
    title: 'Growing Community',
    description: 'Expanded our ministries and welcomed new members to our family.',
  },
  {
    year: '2023',
    title: 'Sister Churches',
    description: 'Established partnerships with sister churches in the region.',
  },
  {
    year: '2024',
    title: 'Community Impact',
    description: 'Launched outreach programs serving the local community.',
  },
];

export default function History() {
  return (
    <section id="history" className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading text-primary font-bold mb-4">
            Our History
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A journey of faith, growth, and divine purpose
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gold/30" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <span className="inline-block px-3 py-1 bg-gold text-primary rounded-full text-sm font-semibold mb-3">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-heading text-primary font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-white shadow-lg" />

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}