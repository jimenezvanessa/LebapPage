'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Church, Users, Landmark, Clock, Image, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: Church, href: '/admin' },
  { name: 'Pastors', icon: Users, href: '/admin/pastors' },
  { name: 'Sister Churches', icon: Landmark, href: '/admin/churches' },
  { name: 'History', icon: Clock, href: '/admin/history' },
  { name: 'Gallery', icon: Image, href: '/admin/gallery' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
        <div className="md:hidden fixed top-0 left-0 right-0 bg-primary text-white z-50 px-4 py-3 flex items-center justify-between">
          <h1 className="font-heading text-lg font-bold">Admin Panel</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        <motion.aside
          initial={false}
          animate={{ 
            x: isMobileMenuOpen ? 0 : (isMobile ? -280 : 0),
            width: isMobile ? 280 : (isSidebarOpen ? 256 : 80)
          }}
          className={`bg-primary text-white fixed h-full z-50 ${isMobile ? 'top-14' : ''} ${!isMobile ? 'md:flex' : 'md:hidden'} hidden`}
        >
          <div className="p-4 flex items-center justify-between">
            {isSidebarOpen && (
              <h1 className="font-heading text-xl font-bold">Admin Panel</h1>
            )}
            {!isMobile && (
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            )}
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

        <main className={`flex-1 p-4 md:p-8 mt-16 md:mt-0 ${isMobile ? 'ml-0' : (isSidebarOpen ? 'md:ml-64' : 'md:ml-20')}`}>
          {children}
        </main>
      </div>
    </div>
  );
}