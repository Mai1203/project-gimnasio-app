'use client';

// ==========================================
// PÁGINA DE INICIO DE SESIÓN
// ==========================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApp } from '@/context/AppContext';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedInput } from '@/components/ui/animated-input';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';

// Schema de validación con Zod
const loginSchema = z.object({
  email: z.string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z.string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login } = useApp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError('');

    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        router.push('/dashboard');
      } else {
        setLoginError('Email o contraseña incorrectos');
      }
    } catch (error) {
      setLoginError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-md w-full space-y-8">
        
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Botón de regreso */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>

          {/* Logo y título */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-2xl">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-400">
            Accede a tu cuenta de PowerGym
          </p>
        </motion.div>

        {/* Formulario de login */}
        <AnimatedCard variant="glass">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            
            {/* Error general */}
            {loginError && (
              <motion.div
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-400 text-sm text-center">{loginError}</p>
              </motion.div>
            )}

            {/* Demo credentials info */}
            <motion.div
              className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-blue-400 text-sm text-center mb-2">
                <strong>Credenciales de demostración:</strong>
              </p>
              <p className="text-blue-300 text-xs text-center">
                Email: admin@gym.com | Contraseña: admin123
              </p>
            </motion.div>

            {/* Campo Email */}
            <div>
              <AnimatedInput
                {...register('email')}
                type="email"
                label="Email"
                icon={<Mail size={18} />}
                error={errors.email?.message}
                placeholder="tu@email.com"
              />
            </div>

            {/* Campo Password */}
            <div>
              <AnimatedInput
                {...register('password')}
                type="password"
                label="Contraseña"
                icon={<Lock size={18} />}
                error={errors.password?.message}
                placeholder="Tu contraseña"
              />
            </div>

            {/* Opciones adicionales */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  className="rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900"
                />
                <span className="text-gray-300">Recordarme</span>
              </label>
              
              <Link
                href="/auth/forgot-password"
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Botón de envío */}
            <AnimatedButton
              type="submit"
              size="lg"
              loading={isLoading}
              className="w-full"
              icon={<LogIn size={20} />}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </AnimatedButton>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900/90 text-gray-400">¿No tienes cuenta?</span>
              </div>
            </div>

            {/* Link a registro */}
            <Link href="/auth/register">
              <AnimatedButton
                variant="outline"
                size="lg"
                className="w-full"
              >
                Crear cuenta nueva
              </AnimatedButton>
            </Link>
          </form>
        </AnimatedCard>

        {/* Footer */}
        <motion.p
          className="text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Al iniciar sesión, aceptas nuestros{' '}
          <Link href="/terms" className="text-amber-400 hover:text-amber-300">
            Términos de Servicio
          </Link>{' '}
          y{' '}
          <Link href="/privacy" className="text-amber-400 hover:text-amber-300">
            Política de Privacidad
          </Link>
        </motion.p>
      </div>
    </div>
  );
}