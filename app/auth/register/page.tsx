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
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import { signIn } from 'next-auth/react';

import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedInput } from '@/components/ui/animated-input';
import { AnimatedCard } from '@/components/ui/animated-card';
import { cn } from '@/lib/utils';

// Schema de validación con Zod
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'El nombre es requerido')
      .min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().min(1, 'El email es requerido').email('Email inválido'),
    phone: z
      .string()
      .min(1, 'El teléfono es requerido')
      .min(10, 'El teléfono debe tener al menos 10 dígitos'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
      ),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
    terms: z.boolean().refine(val => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password', '');

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;

    if (score < 2) return { strength: 'DÉBIL', color: 'bg-primary' };
    if (score < 4) return { strength: 'MEDIA', color: 'bg-yellow-500' };
    return { strength: 'SÓLIDA', color: 'bg-green-500' };
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setRegisterError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setRegisterError(result.error || 'Error al procesar solicitud');
        setIsLoading(false);
        return;
      }

      const loginRes = await signIn('credentials', {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: '/dashboard',
      });

      if (loginRes?.error) {
        setRegisterError('Cuenta creada pero error al autenticar');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      setRegisterError('Error técnico de conexión. Intente luego.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-y-auto bg-black py-32 px-8">
      {/* 🎬 HIGH-END BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2000" 
          alt="Elite Performance" 
          className="w-full h-full object-cover opacity-30 grayscale transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black z-10" />
      </div>

      <div className="relative z-20 w-full max-w-2xl py-20">
        {/* HEADER */}
        <motion.div
          className="text-center mb-16 pt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[10px] font-black tracking-[0.8em] uppercase text-primary italic mb-4 block">
            ADMISIÓN COLECTIVA
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-[0.4em] mt-16 mb-4 uppercase">
            RECLAMAR <span className="font-bold">LEGADO</span>
          </h1>
          <div className="w-16 h-[1px] bg-primary mx-auto opacity-40" />
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-20 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
              {registerError && (
                <div className="text-[10px] text-primary font-black uppercase tracking-[0.3em] text-center border-b border-primary/20 pb-4">
                  {registerError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 block ml-1">
                    Identidad / Nombre
                  </label>
                  <input
                    {...register('name')}
                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light tracking-widest focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/5"
                    placeholder="NOMBRE COMPLETO"
                  />
                  {errors.name && (
                    <span className="text-[8px] text-primary/70 uppercase tracking-widest font-black mt-2 block italic">{errors.name.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 block ml-1">
                    Enlace / Email
                  </label>
                  <input
                    {...register('email')}
                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light tracking-widest focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/5"
                    placeholder="USUARIO@ELITE.COM"
                  />
                  {errors.email && (
                    <span className="text-[8px] text-primary/70 uppercase tracking-widest font-black mt-2 block italic">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 block ml-1">
                  Contacto / Teléfono
                </label>
                <input
                  {...register('phone')}
                  className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light tracking-widest focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/5"
                  placeholder="+57 -- --- ---"
                />
                {errors.phone && (
                  <span className="text-[8px] text-primary/70 uppercase tracking-widest font-black mt-2 block italic">{errors.phone.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 block ml-1">
                    Protocolo / Contraseña
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light tracking-widest focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/5"
                    placeholder="••••••••"
                  />
                  {passwordStrength && (
                    <div className="mt-4 flex items-center space-x-3">
                      <div className="h-[2px] w-20 bg-white/10 overflow-hidden">
                        <div className={cn("h-full transition-all duration-500", passwordStrength.color, passwordStrength.strength === 'DÉBIL' ? 'w-1/3' : passwordStrength.strength === 'MEDIA' ? 'w-2/3' : 'w-full')} />
                      </div>
                      <span className="text-[8px] font-black tracking-widest uppercase opacity-40">{passwordStrength.strength}</span>
                    </div>
                  )}
                  {errors.password && (
                    <span className="text-[8px] text-primary/70 uppercase tracking-widest font-black mt-2 block italic">{errors.password.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 block ml-1">
                    Verificación
                  </label>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light tracking-widest focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/5"
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <span className="text-[8px] text-primary/70 uppercase tracking-widest font-black mt-2 block italic">{errors.confirmPassword.message}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-4 pt-4">
                <input
                  {...register('terms')}
                  type="checkbox"
                  className="mt-1 w-4 h-4 bg-transparent border border-white/20 text-primary focus:ring-0 focus:outline-none cursor-pointer"
                />
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 leading-relaxed">
                  Confirmo mi adhesión a los{' '}
                  <Link href="/terms" className="text-primary hover:text-white underline decoration-primary/20 transition-all">
                    Términos de Código
                  </Link>{' '}
                  y{' '}
                  <Link href="/privacy" className="text-primary hover:text-white underline decoration-primary/20 transition-all">
                    Privacidad
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black py-7 text-[10px] font-black uppercase tracking-[0.8em] hover:bg-primary hover:text-white transition-all duration-700 disabled:opacity-50 group relative overflow-hidden"
              >
                <span className="relative z-10">{isLoading ? 'PROCESANDO SOLICITUD...' : 'RECLAMAR ADMISIÓN'}</span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>

              <div className="pt-8 text-center">
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em]">
                  ¿Ya eres parte del colectivo?{' '}
                  <Link href="/auth/login" className="text-primary hover:text-white transition-colors">
                    Reclamar Acceso
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link href="/" className="inline-flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 hover:text-white transition-all duration-500">
            <ArrowLeft size={16} />
            <span>Abandonar Proceso</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
