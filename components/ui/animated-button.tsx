'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface AnimatedButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl transition-all',
  secondary:
    'bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-md hover:shadow-lg transition-all',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent shadow-sm hover:shadow-md transition-all',
  ghost: 'text-muted-foreground hover:text-foreground hover:bg-muted bg-transparent',
  destructive:
    'bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg hover:shadow-xl transition-all',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

export const AnimatedButton = forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      type = 'button',
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      children,
      disabled,
      className,
      onClick,
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          'relative inline-flex transform-gpu items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        whileHover={{
          scale: disabled || loading ? 1 : 1.02,
          transition: { duration: 0.2 },
        }}
        whileTap={{
          scale: disabled || loading ? 1 : 0.98,
          transition: { duration: 0.1 },
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/20">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
        <div className={cn('flex items-center gap-2', loading && 'invisible')}>
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </div>
        {variant !== 'outline' && variant !== 'ghost' && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0"
            whileHover={{
              opacity: 1,
              x: [-100, 100],
              transition: { duration: 0.6 },
            }}
          />
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
