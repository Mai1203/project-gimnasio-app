'use client';

// ==========================================
// BARRA DE NAVEGACIÓN PRINCIPAL ANIMADA
// ==========================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';
import { 
  Dumbbell, 
  Home, 
  Users, 
  CreditCard, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  Settings
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useApp();
  const pathname = usePathname();

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Links de navegación
  const navLinks = [
    { href: '/', label: 'Inicio', icon: Home },
    ...(user ? [
      { href: '/dashboard', label: 'Panel', icon: BarChart3 },
      { href: '/dashboard/users', label: 'Usuarios', icon: Users },
      { href: '/dashboard/plans', label: 'Planes', icon: CreditCard },
      { href: '/dashboard/cashbox', label: 'Caja', icon: CreditCard },
    ] : [])
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 shadow-lg' 
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                PowerGym
              </span>
            </Link>
          </motion.div>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200',
                      'hover:bg-slate-800/50 relative',
                      isActive
                        ? 'text-amber-400 bg-slate-800/30'
                        : 'text-gray-300 hover:text-white'
                    )}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                    
                    {/* Indicador activo */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg"
                        layoutId="activeTab"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Acciones de usuario */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-300">
                  <span className="text-amber-400">{user.name}</span>
                </div>
                <motion.button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <LogOut size={18} />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <motion.button
            className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-slate-800 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Menú móvil */}
      <motion.div
        className={cn(
          'md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50',
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        )}
        initial={false}
        animate={{ 
          maxHeight: isMobileMenuOpen ? 400 : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200',
                  isActive
                    ? 'text-amber-400 bg-slate-800/50'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800/30'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
          
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          ) : (
            <div className="space-y-2 pt-2 border-t border-slate-700/50">
              <Link
                href="/auth/login"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-800/30 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/auth/register"
                className="block px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;