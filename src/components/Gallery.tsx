'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type GalleryItem = {
  _id: string;
  title: string;
  image: string;
  category: string;
};

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">No photos yet</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(item)}
                className="aspect-square bg-gray-300 rounded-xl overflow-hidden cursor-pointer group relative"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <span className="text-primary/50 font-heading text-sm text-center px-2">
                      {item.title}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="bg-gold text-primary px-4 py-2 rounded-full text-sm font-medium">
                    View
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-10 right-0 text-white hover:text-gold transition-colors"
                >
                  <X size={32} />
                </button>
                {selectedImage.image ? (
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                  />
                ) : (
                  <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <h3 className="text-white text-center text-xl font-heading mt-4">
                  {selectedImage.title}
                </h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}