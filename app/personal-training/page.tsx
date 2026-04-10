'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Target, Calendar, Award, ArrowRight } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';

const benefits = [
  {
    title: 'Plan a Medida',
    description: 'Entrenamientos adaptados 100% a tu anatomía, objetivos y nivel de experiencia.',
    icon: <Target className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Atención Exclusiva',
    description: 'Corrección técnica en tiempo real para maximizar resultados y evitar lesiones.',
    icon: <UserCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Flexibilidad Horaria',
    description: 'Sesiones que se ajustan a tu agenda para que el fitness no sea un obstáculo.',
    icon: <Calendar className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Motivación Constante',
    description: 'Un compañero experto que te impulsará a superar tus propios límites cada día.',
    icon: <Award className="h-6 w-6 text-primary" />,
  },
];

export default function PersonalTrainingPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-background overflow-hidden border-b border-border">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Servicio Premium</span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8">
                Entrenamiento <span className="text-primary italic">Personal</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                Alcanza tus metas el doble de rápido con el apoyo de nuestros entrenadores de élite. Diseñamos el camino hacia tu éxito personal.
              </p>
              <AnimatedButton size="xl" icon={<ArrowRight size={20} />}>
                Reservar Sesión de Evaluación
              </AnimatedButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative aspect-video rounded-3xl bg-muted overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                <UserCheck size={120} strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">¿Por qué elegir un Personal Trainer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {benefits.map((benefit, index) => (
              <AnimatedCard key={index} variant="glass" className="p-8">
                <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-1 bg-opacity-10">
            <div className="bg-card rounded-[22px] p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Paquetes Disponibles</h2>
              <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
                Ofrecemos sesiones individuales, paquetes de 10 sesiones o acompañamiento mensual intensivo. Consulta disponibilidad y tarifas personalizadas.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <AnimatedButton variant="primary" size="lg">Ver Tarifas Públicas</AnimatedButton>
                <AnimatedButton variant="outline" size="lg">Hablar con un Entrenador</AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
