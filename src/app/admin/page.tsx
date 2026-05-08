'use client';

import { motion } from 'framer-motion';
import { Church, Users, Landmark, Clock, Image } from 'lucide-react';

const stats = [
  { name: 'Total Pastors', value: '5', icon: Users, color: 'bg-blue-500' },
  { name: 'Sister Churches', value: '3', icon: Landmark, color: 'bg-green-500' },
  { name: 'History Events', value: '5', icon: Clock, color: 'bg-purple-500' },
  { name: 'Gallery Photos', value: '8', icon: Image, color: 'bg-yellow-500' },
];

export default function AdminDashboard() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-heading text-primary font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Living Epistle Baptist Church Admin</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.name}</p>
                <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-heading text-primary font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/pastors" className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold hover:bg-gold/5 transition-colors text-center">
            <Users className="mx-auto text-primary mb-2" size={24} />
            <span className="text-sm font-medium">Add Pastor</span>
          </a>
          <a href="/admin/churches" className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold hover:bg-gold/5 transition-colors text-center">
            <Landmark className="mx-auto text-primary mb-2" size={24} />
            <span className="text-sm font-medium">Add Church</span>
          </a>
          <a href="/admin/history" className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold hover:bg-gold/5 transition-colors text-center">
            <Clock className="mx-auto text-primary mb-2" size={24} />
            <span className="text-sm font-medium">Add History</span>
          </a>
          <a href="/admin/gallery" className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-gold hover:bg-gold/5 transition-colors text-center">
            <Image className="mx-auto text-primary mb-2" size={24} />
            <span className="text-sm font-medium">Upload Photo</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-primary rounded-xl p-6 text-white"
      >
        <h2 className="text-xl font-heading font-semibold mb-2">View Website</h2>
        <p className="text-white/70 mb-4">See how your website looks to visitors</p>
        <a
          href="/"
          className="inline-block bg-gold text-primary px-6 py-2 rounded-lg font-medium hover:bg-gold-light transition-colors"
        >
          Go to Website
        </a>
      </motion.div>
    </div>
  );
}