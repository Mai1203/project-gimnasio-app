'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Users, Target, Award, ArrowRight } from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedCard } from '@/components/ui/animated-card';

export default function AboutPage() {
  const stats = [
    { label: 'Años de Experiencia', value: '10+', icon: Award },
    { label: 'Miembros Activos', value: '2,500+', icon: Users },
    { label: 'Entrenadores Certificados', value: '25+', icon: Target },
    { label: 'Transformaciones Reales', value: '500+', icon: Dumbbell },
  ];

  const values = [
    {
      title: 'Excelencia',
      description: 'Buscamos la perfección en cada entrenamiento y servicio que ofrecemos.',
      icon: <Award className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Comunidad',
      description: 'Más que un gimnasio, somos una familia apoyándonos mutuamente.',
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Innovación',
      description: 'Equipamiento de última generación y métodos de entrenamiento vanguardistas.',
      icon: <Dumbbell className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                Sobre <span className="text-primary italic">Esthetic Gym</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Nuestra misión es empoderarte para alcanzar tu mejor versión física y mental mediante un enfoque integral del fitness, combinando tecnología, comunidad y pasión.
              </p>
              <div className="flex flex-wrap gap-4">
                <AnimatedButton size="lg" icon={<ArrowRight size={20} />}>
                  ¡Únete Ahora!
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg">
                  Nuestra Historia
                </AnimatedButton>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/10 overflow-hidden shadow-2xl relative">
                {/* Simulating a high-res image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-primary/30">
                  <Dumbbell size={150} strokeWidth={1} />
                </div>
              </div>
              <div className="absolute -bottom-10 -left-10 bg-card p-6 rounded-2xl shadow-xl border border-border hidden md:block">
                <p className="text-3xl font-bold text-primary">#1</p>
                <p className="text-sm text-muted-foreground">Gimnasio en la Región</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-4xl lg:text-5xl font-extrabold text-foreground">{stat.value}</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-16">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <AnimatedCard key={index} variant="glass" className="p-8 text-left">
                <div className="mb-4 inline-block bg-primary/10 p-4 rounded-xl">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
