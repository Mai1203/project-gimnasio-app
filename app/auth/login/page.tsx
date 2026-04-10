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
  const [loginError, setLoginError] = useState('');
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
      setLoginError('Credenciales inválidas');
    } else {
      router.push('/dashboard');
    }

    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 🎬 HIGH-END BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Gym" 
          className="w-full h-full object-cover opacity-40 grayscale transition-all duration-[3000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-lg px-8 py-12">
        {/* HEADER */}
        <motion.div
          className="text-center mb-16 pt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/" className="inline-block mb-12">
            <span className="text-[10px] font-black tracking-[0.8em] uppercase text-primary italic">
              E S T H E T I C
            </span>
            <h1 className="text-3xl font-light text-white tracking-[0.4em] mt-10 uppercase">
              ACCESO <span className="font-bold">ÉLITE</span>
            </h1>
          </Link>
          <div className="w-12 h-[1px] bg-primary mx-auto opacity-50" />
        </motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {loginError && (
                <div className="text-[10px] text-primary font-black uppercase tracking-[0.3em] text-center border-b border-primary/20 pb-4">
                  {loginError}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 block ml-1">
                  Identidad / Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light tracking-widest focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/10"
                  placeholder="USUARIO@ELITE.COM"
                />
                {errors.email && (
                  <span className="text-[8px] text-primary/70 uppercase tracking-widest font-black mt-2 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50 block ml-1">
                  Protocolo / Contraseña
                </label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white font-light tracking-widest focus:outline-none focus:border-primary transition-all duration-500 placeholder:text-white/10"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <span className="text-[8px] text-primary/70 uppercase tracking-widest font-black mt-2 block">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link
                  href="/auth/forgot-password"
                  className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] hover:text-primary transition-colors italic"
                >
                  ¿Olvido de Credenciales?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black py-6 text-[10px] font-black uppercase tracking-[0.6em] hover:bg-primary hover:text-white transition-all duration-700 disabled:opacity-50 group overflow-hidden relative"
              >
                <span className="relative z-10">
                  {isLoading ? 'VERIFICANDO...' : 'RECLAMAR ACCESO'}
                </span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>

              <div className="pt-8 text-center">
                <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em]">
                  ¿Sin Membresía?{' '}
                  <Link href="/auth/register" className="text-primary hover:text-white transition-colors">
                    Solicitar Admisión
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>

        {/* FOOTER */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link href="/" className="inline-flex items-center space-x-4 text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 hover:text-white transition-all duration-500">
            <ArrowLeft size={14} />
            <span>Regresar al Origen</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
