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
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { useApp } from '@/context/AppContext';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedInput } from '@/components/ui/animated-input';
import { AnimatedCard } from '@/components/ui/animated-card';
// Schema de validación con Zod
const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
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
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError('');

    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setLoginError('Email o contraseña incorrectos');
    } else {
      router.push('/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative w-full max-w-md space-y-8">
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
            className="mb-8 inline-flex items-center space-x-2 text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>

          {/* Logo y título */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-primary p-4 shadow-2xl">
              <LogIn className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <h2 className="mb-2 text-3xl font-bold text-foreground">Iniciar Sesión</h2>
          <p className="text-muted-foreground">Accede a tu cuenta de Esthetic Gym</p>
        </motion.div>

        {/* Formulario de login */}
        <AnimatedCard variant="glass">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8">
            {/* Error general */}
            {loginError && (
              <motion.div
                className="rounded-lg border border-destructive/20 bg-destructive/10 p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-center text-sm text-destructive">{loginError}</p>
              </motion.div>
            )}

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
                  className="rounded border-border bg-background text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-foreground font-medium">Recordarme</span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary font-medium transition-colors hover:text-primary/80"
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
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">
                  ¿No tienes cuenta?
                </span>
              </div>
            </div>

            {/* Link a registro */}
            <Link href="/auth/register">
              <AnimatedButton variant="outline" size="lg" className="w-full">
                Crear cuenta nueva
              </AnimatedButton>
            </Link>
          </form>
        </AnimatedCard>

        {/* Footer */}
        <motion.p
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Al iniciar sesión, aceptas nuestros{' '}
          <Link href="/terms" className="text-primary hover:text-primary/80 font-medium">
            Términos de Servicio
          </Link>{' '}
          y{' '}
          <Link href="/privacy" className="text-primary hover:text-primary/80 font-medium">
            Política de Privacidad
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
