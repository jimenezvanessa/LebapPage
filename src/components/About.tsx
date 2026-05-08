'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading text-primary font-bold mb-4">
            About Our Church
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
              <img src="/images/church-exterior.jpg" alt="Church" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-full -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-heading text-primary font-semibold">
              Our Identity
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Living Epistle Baptist Church is a welcoming community of believers dedicated to 
              sharing the love of God and the truth of His Word. We stand firm on the foundation 
              of biblical teaching and strive to be a beacon of hope in our community.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-off-white rounded-xl border-l-4 border-gold">
                <h4 className="font-heading text-primary font-semibold mb-2">Our Vision</h4>
                <p className="text-gray-600 text-sm">
                  To be the living epistle of Christ, known and read by all.
                </p>
              </div>
              <div className="p-4 bg-off-white rounded-xl border-l-4 border-gold">
                <h4 className="font-heading text-primary font-semibold mb-2">Our Mission</h4>
                <p className="text-gray-600 text-sm">
                  To preach the gospel, make disciples, and serve our community.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="font-heading text-primary font-semibold mb-3">Our Core Values</h4>
              <ul className="space-y-2">
                {['Faith', 'Love', 'Unity', 'Service', 'Truth'].map((value) => (
                  <li key={value} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-gold rounded-full mr-3" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}