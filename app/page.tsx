'use client';
import { useState, useEffect } from 'react';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedCard } from '@/components/ui/animated-card';
import {
  Dumbbell,
  Users,
  Trophy,
  Heart,
  Target,
  Zap,
  Star,
  ArrowRight,
  PlayCircle,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const [isMobile, setIsmobile] = useState(false);
  // Datos de estadísticas del gimnasio
  const gymStats = [
    { number: '1000+', label: 'Miembros Activos', icon: Users },
    { number: '50+', label: 'Entrenadoras Expertos', icon: Target },
    { number: '15+', label: 'Años de Experiencia', icon: Trophy },
    { number: '24/7', label: 'Acceso Disponible', icon: Zap },
  ];

  // Características principales
  const features = [
    {
      icon: Dumbbell,
      title: 'Equipamiento Profesional',
      description:
        'Maquinas de última generación y pesas libres para todos los niveles.',
    },
    {
      icon: Heart,
      title: 'Entrenamiento Personalizado',
      description:
        'Planes diseñados específicamente para tus objetivos y nivel fitness.',
    },
    {
      icon: Users,
      title: 'Comunidad Motivadora',
      description:
        'Únete a una comunidad que te apoya en cada paso de tu transformación.',
    },
    {
      icon: Trophy,
      title: 'Resultados Comprobados',
      description:
        'Miles de historias de éxito respaldan nuestros métodos de entrenamiento.',
    },
  ];

  // Testimonios
  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Miembro VIP',
      content:
        'PowerGym cambió mi vida completamente. Los entrenadoras son excepcionales y las instalaciones de primera clase.',
      rating: 5,
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    {
      name: 'María García',
      role: 'Miembro Premium',
      content:
        'El ambiente motivador y el apoyo del equipo me ayudaron a alcanzar mis metas más rápido de lo que imaginé.',
      rating: 5,
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
    {
      name: 'Juan Pérez',
      role: 'Miembro Básico',
      content:
        'Increíble relación calidad-precio. Las instalaciones son modernas y el personal muy profesional.',
      rating: 5,
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsmobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/70 via-slate-900/60 to-black/70" />

          <picture>
            {/* Imagen para móvil */}
            <source
              media="(max-width: 768px)"
              srcSet="https://images.pexels.com/photos/2468339/pexels-photo-2468339.jpeg?auto=compress&cs=tinysrgb&w=1080&h=1920&dpr=2"
            />
            {/* Imagen para desktop */}
            <source
              media="(min-width: 769px)"
              srcSet="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=2560&h=1440&dpr=2"
            />

            {/* Fallback */}
            <img
              src="https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=2560&h=1440&dpr=2"
              alt="Gimnasio moderno"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </picture>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="mb-6 text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforma tu
              <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Cuerpo y Mente
              </span>
            </motion.h1>

            <motion.p
              className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-200 sm:text-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Únete a PowerGym y descubre el poder que llevas dentro. Con
              equipamiento de última generación y entrenadoras expertos, tu
              transformación comienza aquí.
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/auth/register">
                <AnimatedButton size="xl" icon={<Zap />}>
                  Comienza Ahora
                </AnimatedButton>
              </Link>

              <motion.button
                className="flex items-center gap-3 rounded-lg border-2 border-white/30 px-6 py-3 text-white transition-all duration-300 hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle size={24} />
                <span className="font-semibold">Ver Tour Virtual</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
            <div className="mt-2 h-3 w-1 rounded-full bg-white" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {gymStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 p-4">
                      <Icon className="h-8 w-8 text-amber-400" />
                    </div>
                  </div>
                  <div className="mb-2 text-3xl font-bold text-white lg:text-4xl">
                    {stat.number}
                  </div>
                  <div className="font-medium text-gray-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-transparent to-slate-900/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              ¿Por qué elegir
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                {' '}
                PowerGym
              </span>
              ?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Descubre las características que nos hacen el gimnasio líder en
              transformación física y mental.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedCard key={index} variant="glass" delay={index * 0.1}>
                  <div className="p-6 text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 p-4">
                        <Icon className="h-8 w-8 text-amber-400" />
                      </div>
                    </div>
                    <h3 className="mb-4 text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
              Historias de
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Éxito
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">
              Conoce las experiencias de nuestros miembros y cómo PowerGym
              cambió sus vidas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={index} variant="glass" delay={index * 0.2}>
                <div className="p-6">
                  {/* Rating */}
                  <div className="mb-4 flex justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-current text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="mb-6 text-center italic text-gray-300">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full border-2 border-amber-500/30 object-cover"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-amber-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              ¿Listo para transformarte?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
              No esperes más para comenzar tu journey hacia una versión mejor de
              ti mismo. Únete a PowerGym hoy y descubre tu verdadero potencial.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/auth/register">
                <AnimatedButton size="xl" icon={<CheckCircle />}>
                  Únete Ahora
                </AnimatedButton>
              </Link>
              <Link href="/plans">
                <AnimatedButton
                  variant="outline"
                  size="xl"
                  icon={<ArrowRight />}
                >
                  Ver Planes
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
