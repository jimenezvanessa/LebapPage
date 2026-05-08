'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Church, Users, Landmark, Clock, Image, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: Church, href: '/admin' },
  { name: 'Pastors', icon: Users, href: '/admin/pastors' },
  { name: 'Sister Churches', icon: Landmark, href: '/admin/churches' },
  { name: 'History', icon: Clock, href: '/admin/history' },
  { name: 'Gallery', icon: Image, href: '/admin/gallery' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthorized(true);
      return;
    }
    const admin = sessionStorage.getItem('admin');
    if (!admin) {
      router.replace('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router, isLoginPage]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin');
    router.push('/admin/login');
  };

  if (isAuthorized === null || isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <motion.aside
          initial={false}
          animate={{ width: isSidebarOpen ? 256 : 80 }}
          className="bg-primary text-white fixed h-full z-50"
        >
          <div className="p-4 flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="font-heading text-xl font-bold">Admin Panel</h1>
            )}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              {isSidebarOpen ? '◀' : '▶'}
            </button>
          </div>
          
          <nav className="mt-8 px-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors"
              >
                <item.icon size={20} />
                {isSidebarOpen && <span>{item.name}</span>}
              </a>
            ))}
          </nav>

          <div className="absolute bottom-4 left-0 right-0 px-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors text-gold w-full"
            >
              <LogOut size={20} />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </motion.aside>

        <main className={`flex-1 p-8 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}