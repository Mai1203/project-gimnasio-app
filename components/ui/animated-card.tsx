'use client';

// ==========================================
// COMPONENTE DE TARJETA ANIMADA REUTILIZABLE
// ==========================================

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'border';
  hover?: boolean;
  delay?: number;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, children, variant = 'default', hover = true, delay = 0, ...props }, ref) => {
    
    // Variantes de estilos para las tarjetas
    const variants = {
      default: 'bg-slate-800/50 border border-slate-700/50',
      glass: 'bg-white/5 backdrop-blur-lg border border-white/10',
      gradient: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30',
      border: 'bg-transparent border-2 border-slate-700 hover:border-amber-500/50'
    };

    // Variantes de animación
    const cardVariants = {
      hidden: { 
        opacity: 0, 
        y: 30,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          delay: delay,
          ease: [0.25, 0.4, 0.55, 1.4]
        }
      }
    };

    const hoverVariants = hover ? {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    } : {};

    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300',
          'relative overflow-hidden',
          // Variant styles
          variants[variant],
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={hoverVariants}
        {...props}
      >
        {/* Efecto de brillo interno */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60" />
        
        {/* Borde interno sutil */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
        
        {/* Contenido */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Efecto de hover glow */}
        {hover && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

export { AnimatedCard };