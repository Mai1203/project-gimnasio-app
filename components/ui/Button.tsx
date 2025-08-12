'use client';

import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

// Button variants for different styles
const buttonVariants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary', 
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};

// Button sizes
const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>,
    MotionProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * Animated Button component with Framer Motion
 * Supports different variants, sizes, and loading states
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    disabled,
    children, 
    ...props 
  }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'btn',
          buttonVariants[variant],
          buttonSizes[size],
          'relative overflow-hidden',
          (disabled || loading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        transition={{ duration: 0.15 }}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="spinner h-4 w-4" />
          </div>
        )}
        <span className={loading ? 'invisible' : 'visible'}>
          {children}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';