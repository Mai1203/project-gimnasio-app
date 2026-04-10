'use client';

// ==========================================
// COMPONENTE DE INPUT ANIMADO REUTILIZABLE
// ==========================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface AnimatedInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedInput = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, label, error, icon, size = 'md', type, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const sizes = {
      sm: 'h-10 px-3 text-sm',
      md: 'h-12 px-4 text-base',
      lg: 'h-14 px-5 text-lg',
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value !== '');
      props.onChange?.(e);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className="relative">
        {/* Container del input */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Input field */}
          <div className="relative">
            {/* Ícono izquierdo */}
            {icon && (
              <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-400">
                {icon}
              </div>
            )}

            {/* Campo de entrada */}
            <input
              ref={ref}
              type={inputType}
              className={cn(
                // Base styles
                'w-full rounded-lg border bg-background text-foreground placeholder-transparent backdrop-blur-sm transition-all duration-300',
                'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50',
                'peer',
                // Sizes
                sizes[size],
                // Con ícono
                icon && 'pl-10',
                // Con botón de password
                type === 'password' && 'pr-12',
                // Estados de error
                error
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                  : focused
                    ? 'border-primary shadow-lg shadow-primary/20'
                    : 'border-border hover:border-primary/50',
                className
              )}
              placeholder=" " // Necesario para el efecto de label flotante
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={handleInputChange}
              {...props}
            />

            {/* Botón para mostrar/ocultar password */}
            {type === 'password' && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>

          {/* Label flotante */}
          {label && (
            <motion.label
              className={cn(
                'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 transition-all duration-300',
                'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400',
                'peer-focus:top-0 peer-focus:mx-1 peer-focus:bg-background peer-focus:px-2 peer-focus:text-xs peer-focus:text-primary',
                // Ajustes con ícono
                icon && 'left-10 peer-focus:left-3',
                // Si tiene valor, mantener label arriba
                hasValue && 'top-0 mx-1 bg-background px-2 text-xs',
                hasValue &&
                  (focused || error ? 'text-primary' : 'text-muted-foreground')
              )}
              animate={{
                y: focused || hasValue ? -24 : 0,
                scale: focused || hasValue ? 0.85 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.label>
          )}

          {/* Línea de enfoque decorativa */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: focused ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Mensaje de error */}
        {error && (
          <motion.p
            className="mt-2 flex items-center gap-1 text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="h-1 w-1 rounded-full bg-red-400" />
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';

export { AnimatedInput };
