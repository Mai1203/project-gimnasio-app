'use client';

import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

//  Tipado de variantes
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';

//  Función para obtener las clases según la variante
export const buttonVariants = (variant: ButtonVariant = 'primary') => {
  const variants: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'btn-danger',
    outline: 'btn-outline',
    
  };
  return variants[variant];
};

//  Tamaños de botón
const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
  icon: 'h-8 w-8 p-0', // tamaño para botones tipo icono
  default: 'px-4 py-2',
};

//  Props del botón
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>,
    MotionProps {
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
  loading?: boolean;
  children: React.ReactNode;
}

//  Componente Button
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          'btn relative overflow-hidden rounded-lg font-semibold transition-all duration-150',
          buttonVariants(variant),
          buttonSizes[size],
          (disabled || loading) && 'cursor-not-allowed opacity-50',
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
        <span className={loading ? 'invisible' : 'visible'}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
