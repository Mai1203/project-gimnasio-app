import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger white background only after passing the 3 Hero sections (300vh approx)
      setIsScrolled(window.scrollY > window.innerHeight * 2.8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/plans', label: 'Planes' },
    { href: '/classes', label: 'Disciplinas' },
    ...(session?.user ? [{ href: '/dashboard', label: 'Cuenta' }] : []),
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setIsMobileMenuOpen(false);
  };

  const isLightPage = pathname !== '/';

  return (
    <>
      <motion.nav
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-700 ease-in-out',
          isScrolled || isLightPage
            ? 'bg-white/80 backdrop-blur-md border-b border-border/40 py-4'
            : 'bg-white/5 backdrop-blur-sm py-8' // Subtle glass effect over heroes
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center space-x-4">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image 
                  src="/Logo.svg" 
                  alt="Logo" 
                  width={60} 
                  height={60} 
                  className={cn(
                    "transition-all duration-500",
                    isScrolled || isLightPage ? "brightness-0" : "brightness-0 invert"
                  )} 
                />
              </div>
              <span className={cn(
                "text-xs md:text-sm font-black tracking-[0.5em] uppercase transition-colors duration-500",
                isScrolled || isLightPage ? "text-black" : "text-white"
              )}>
                Esthetic <span className="text-primary italic">Gym</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden items-center space-x-12 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-300 relative py-1",
                    pathname === link.href ? "text-primary" : (isScrolled || isLightPage ? "text-black/60 hover:text-black" : "text-white/60 hover:text-white")
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden items-center space-x-8 lg:flex">
              {session?.user ? (
                <button
                  onClick={handleLogout}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-[0.4em] transition-colors",
                    isScrolled || isLightPage ? "text-black/40 hover:text-primary" : "text-white/40 hover:text-primary"
                  )}
                >
                  Salir
                </button>
              ) : (
                <Link href="/auth/login">
                  <button className={cn(
                    "px-8 py-3 text-[10px] font-black uppercase tracking-[0.4em] border transition-all duration-500",
                    isScrolled || isLightPage 
                      ? "border-black text-black hover:bg-black hover:text-white"
                      : "border-white/30 text-white hover:bg-white hover:text-black"
                  )}>
                    Acceder
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "p-2 transition-colors lg:hidden",
                isScrolled || isLightPage ? "text-black" : "text-white"
              )}
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] h-screen w-full bg-white lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Minimal Brand ID at top */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-primary italic">
                G Y M
              </span>
            </div>

            {/* Explicit Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute right-8 top-10 p-2 text-black hover:text-primary transition-colors"
            >
              <X size={32} strokeWidth={1} />
            </button>

            <div className="flex h-full flex-col items-center justify-center space-y-16 px-8 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl md:text-2xl font-light uppercase tracking-[0.8em] text-black hover:text-primary transition-all duration-500"
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="h-[1px] w-8 bg-black/10" />
              
              {!session?.user && (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[10px] font-black uppercase tracking-[0.6em] text-primary"
                >
                  Entrar
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
