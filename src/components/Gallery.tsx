'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Worship Service', category: 'worship' },
  { id: 2, title: 'Youth Fellowship', category: 'youth' },
  { id: 3, title: 'Sunday School', category: 'children' },
  { id: 4, title: 'Church Outreach', category: 'outreach' },
  { id: 5, title: 'Fellowship Day', category: 'events' },
  { id: 6, title: 'Bible Study', category: 'worship' },
  { id: 7, title: 'Music Ministry', category: 'worship' },
  { id: 8, title: 'Community Service', category: 'outreach' },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading text-primary font-bold mb-4">
            Photo Gallery
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Capturing moments of worship, fellowship, and community
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(item.id)}
              className="aspect-square bg-gray-300 rounded-xl overflow-hidden cursor-pointer group relative"
            >
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                <span className="text-primary/50 font-heading text-sm text-center px-2">
                  {item.title}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gold text-primary px-4 py-2 rounded-full text-sm font-medium">
                  View
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-4 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-heading text-primary font-semibold">
                    {galleryItems.find((i) => i.id === selectedImage)?.title}
                  </h3>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-gray-400">Image Placeholder</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}