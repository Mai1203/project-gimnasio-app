'use client';

// ==========================================
// COMPONENTE DE BOTÓN ANIMADO REUTILIZABLE
// ==========================================

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    icon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    
    // Variantes de estilos
    const variants = {
      primary: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white shadow-md hover:shadow-lg',
      outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white bg-transparent shadow-sm hover:shadow-md',
      ghost: 'text-gray-300 hover:text-white hover:bg-slate-800 bg-transparent',
      destructive: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl'
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 transform-gpu',
          'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants & sizes
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        // Animaciones con Framer Motion
        whileHover={{ 
          scale: disabled || loading ? 1 : 1.02,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: disabled || loading ? 1 : 0.98,
          transition: { duration: 0.1 }
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {/* Overlay de loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
          </motion.div>
        )}
        
        {/* Contenido del botón */}
        <div className={cn('flex items-center gap-2', loading && 'invisible')}>
          {icon && (
            <motion.span
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {icon}
            </motion.span>
          )}
          <span>{children}</span>
        </div>

        {/* Efecto de brillo en hover */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
          whileHover={{ 
            opacity: variant === 'outline' || variant === 'ghost' ? 0 : 1,
            x: [-100, 100],
            transition: { duration: 0.6 }
          }}
        />
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export { AnimatedButton };