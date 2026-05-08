'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Church, Lock, User } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Login failed');
        return;
      }

      sessionStorage.setItem('admin', username);
      router.push('/admin');
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl"
      >
        <div className="text-center mb-6 md:mb-8">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <Church className="text-primary" size={28} md:size={32} />
          </div>
          <h1 className="text-xl md:text-2xl font-heading text-primary font-bold">Admin Login</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Living Epistle Baptist Church</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} md:size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-base"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} md:size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-200 rounded-xl focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-base"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-primary py-2 md:py-3 rounded-xl font-semibold hover:bg-gold-light transition-colors disabled:opacity-50 text-base"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <Link href="/" className="block text-center text-gray-500 text-sm mt-4 md:mt-6 hover:text-gold">
          ← Back to Website
        </Link>
      </motion.div>
    </div>
  );
}