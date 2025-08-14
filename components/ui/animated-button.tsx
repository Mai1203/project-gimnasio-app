'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
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
  primary: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white shadow-md hover:shadow-lg',
  outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white bg-transparent shadow-sm hover:shadow-md',
  ghost: 'text-gray-300 hover:text-white hover:bg-slate-800 bg-transparent',
  destructive: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl'
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ type = 'button', variant = 'primary', size = 'md', loading = false, icon, children, disabled, className, onClick }, ref) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 transform-gpu focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        whileHover={{ scale: disabled || loading ? 1 : 1.02, transition: { duration: 0.2 } }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98, transition: { duration: 0.1 } }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        )}
        <div className={cn('flex items-center gap-2', loading && 'invisible')}>
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </div>
        {variant !== 'outline' && variant !== 'ghost' && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none"
            whileHover={{ opacity: 1, x: [-100, 100], transition: { duration: 0.6 } }}
          />
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';
