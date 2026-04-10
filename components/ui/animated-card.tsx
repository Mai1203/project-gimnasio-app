'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// ✅ Tipamos correctamente las props incluyendo el ref
type AnimatedCardProps = React.ComponentPropsWithRef<typeof motion.div> & {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'border';
  hover?: boolean;
  delay?: number;
};

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      className,
      children,
      variant = 'default',
      hover = true,
      delay = 0,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-card text-card-foreground border border-border shadow-sm',
      glass: 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl',
      gradient:
        'bg-gradient-to-br from-white to-secondary/5 border border-border/50',
      border:
        'bg-transparent border-2 border-border hover:border-primary/50',
    };

    const cardVariants = {
      hidden: { opacity: 0, y: 30, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          delay: delay,
          ease: [0.25, 0.4, 0.55, 1.4],
        },
      },
    };

    const hoverVariants = hover
      ? {
          scale: 1.02,
          y: -5,
          transition: {
            duration: 0.3,
            ease: 'easeOut',
          },
        }
      : {};

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl',
          'relative overflow-hidden',
          variants[variant],
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={hoverVariants}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
        <div className="relative z-10">{children}</div>
        {hover && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-0"
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
