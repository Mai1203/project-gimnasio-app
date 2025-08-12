'use client';

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
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  
  // Datos de estadísticas del gimnasio
  const gymStats = [
    { number: '1000+', label: 'Miembros Activos', icon: Users },
    { number: '50+', label: 'Entrenadoras Expertos', icon: Target },
    { number: '15+', label: 'Años de Experiencia', icon: Trophy },
    { number: '24/7', label: 'Acceso Disponible', icon: Zap }
  ];

  // Características principales
  const features = [
    {
      icon: Dumbbell,
      title: 'Equipamiento Profesional',
      description: 'Maquinas de última generación y pesas libres para todos los niveles.'
    },
    {
      icon: Heart,
      title: 'Entrenamiento Personalizado',
      description: 'Planes diseñados específicamente para tus objetivos y nivel fitness.'
    },
    {
      icon: Users,
      title: 'Comunidad Motivadora',
      description: 'Únete a una comunidad que te apoya en cada paso de tu transformación.'
    },
    {
      icon: Trophy,
      title: 'Resultados Comprobados',
      description: 'Miles de historias de éxito respaldan nuestros métodos de entrenamiento.'
    }
  ];

  // Testimonios
  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Miembro VIP',
      content: 'PowerGym cambió mi vida completamente. Los entrenadoras son excepcionales y las instalaciones de primera clase.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      name: 'María García',
      role: 'Miembro Premium',
      content: 'El ambiente motivador y el apoyo del equipo me ayudaron a alcanzar mis metas más rápido de lo que imaginé.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      name: 'Juan Pérez',
      role: 'Miembro Básico',
      content: 'Increíble relación calidad-precio. Las instalaciones son modernas y el personal muy profesional.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ];

  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-slate-900/60 to-black/70 z-10" />
          <img
            src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
            alt="Gimnasio moderno"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
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
              className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Únete a PowerGym y descubre el poder que llevas dentro. Con equipamiento de última generación 
              y entrenadoras expertos, tu transformación comienza aquí.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
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
                className="flex items-center gap-3 px-6 py-3 text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300"
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
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
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl">
                      <Icon className="w-8 h-8 text-amber-400" />
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Por qué elegir 
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> PowerGym</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre las características que nos hacen el gimnasio líder en transformación física y mental.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedCard key={index} variant="glass" delay={index * 0.1}>
                  <div className="p-6 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl">
                        <Icon className="w-8 h-8 text-amber-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Historias de 
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Éxito</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Conoce las experiencias de nuestros miembros y cómo PowerGym cambió sus vidas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={index} variant="glass" delay={index * 0.2}>
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-300 text-center mb-6 italic">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30"
                    />
                    <div className="text-left">
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-amber-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              ¿Listo para transformarte?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              No esperes más para comenzar tu journey hacia una versión mejor de ti mismo. 
              Únete a PowerGym hoy y descubre tu verdadero potencial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <AnimatedButton size="xl" icon={<CheckCircle />}>
                  Únete Ahora
                </AnimatedButton>
              </Link>
              <Link href="/plans">
                <AnimatedButton variant="outline" size="xl" icon={<ArrowRight />}>
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