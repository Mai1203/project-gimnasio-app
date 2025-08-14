'use client';

// ==========================================
// PÁGINA DE REGISTRO DE USUARIOS
// ==========================================

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus, Mail, Lock, User, Phone, ArrowLeft, CheckCircle } from 'lucide-react';
import { signIn } from "next-auth/react";

import { useApp } from '@/context/AppContext';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedInput } from '@/components/ui/animated-input';
import { AnimatedCard } from '@/components/ui/animated-card';

// Schema de validación con Zod
const registerSchema = z.object({
  name: z.string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  phone: z.string()
    .min(1, 'El teléfono es requerido')
    .min(10, 'El teléfono debe tener al menos 10 dígitos'),
  password: z.string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
  confirmPassword: z.string()
    .min(1, 'Confirma tu contraseña'),
  terms: z.boolean().refine(val => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const { register: registerUser } = useApp();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const password = watch('password', '');

  // Función para verificar la fuerza de la contraseña
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    if (score < 2) return { strength: 'Débil', color: 'bg-red-500', width: '20%' };
    if (score < 4) return { strength: 'Media', color: 'bg-yellow-500', width: '60%' };
    return { strength: 'Fuerte', color: 'bg-green-500', width: '100%' };
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setRegisterError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password
        })
      });

      const result = await res.json();

      if (!res.ok) {
        setRegisterError(result.error || "Error al crear la cuenta");
        setIsLoading(false);
        return;
      }

      // Login automático después de registrarse
      const loginRes = await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/dashboard"
      });

      if (loginRes?.error) {
        setRegisterError("Cuenta creada pero error al iniciar sesión");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setRegisterError("Error al registrarse. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent" />
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
            <div className="p-4 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl shadow-2xl">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Crear Cuenta
          </h2>
          <p className="text-gray-400">
            Únete a la comunidad PowerGym
          </p>
        </motion.div>

        {/* Formulario de registro */}
        <AnimatedCard variant="glass">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
            
            {/* Error general */}
            {registerError && (
              <motion.div
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-400 text-sm text-center">{registerError}</p>
              </motion.div>
            )}

            {/* Campo Nombre */}
            <div>
              <AnimatedInput
                {...register('name')}
                type="text"
                label="Nombre completo"
                icon={<User size={18} />}
                error={errors.name?.message}
                placeholder="Tu nombre completo"
              />
            </div>

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

            {/* Campo Teléfono */}
            <div>
              <AnimatedInput
                {...register('phone')}
                type="tel"
                label="Teléfono"
                icon={<Phone size={18} />}
                error={errors.phone?.message}
                placeholder="+52 123 456 7890"
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
              
              {/* Indicador de fuerza de contraseña */}
              {password && passwordStrength && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-slate-700 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: passwordStrength.width }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{passwordStrength.strength}</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Campo Confirmar Password */}
            <div>
              <AnimatedInput
                {...register('confirmPassword')}
                type="password"
                label="Confirmar contraseña"
                icon={<CheckCircle size={18} />}
                error={errors.confirmPassword?.message}
                placeholder="Confirma tu contraseña"
              />
            </div>

            {/* Términos y condiciones */}
            <div className="flex items-start space-x-3">
              <input
                {...register('terms')}
                type="checkbox"
                className="mt-1 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500 focus:ring-offset-slate-900"
              />
              <label className="text-sm text-gray-300">
                Acepto los{' '}
                <Link href="/terms" className="text-amber-400 hover:text-amber-300">
                  términos y condiciones
                </Link>{' '}
                y la{' '}
                <Link href="/privacy" className="text-amber-400 hover:text-amber-300">
                  política de privacidad
                </Link>
              </label>
            </div>
            
            {errors.terms && (
              <p className="text-red-400 text-sm">{errors.terms.message}</p>
            )}

            {/* Botón de envío */}
            <AnimatedButton
              type="submit"
              size="lg"
              loading={isLoading}
              className="w-full"
              icon={<UserPlus size={20} />}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </AnimatedButton>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900/90 text-gray-400">¿Ya tienes cuenta?</span>
              </div>
            </div>

            {/* Link a login */}
            <Link href="/auth/login">
              <AnimatedButton
                variant="outline"
                size="lg"
                className="w-full"
              >
                Iniciar sesión
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
          Al crear una cuenta, aceptas nuestros términos de servicio y política de privacidad.
        </motion.p>
      </div>
    </div>
  );
}