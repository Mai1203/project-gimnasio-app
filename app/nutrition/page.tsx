'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Salad, Heart, Coffee, Apple, ArrowRight, ShieldCheck } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';

const services = [
  {
    title: 'Plan Alimentario',
    description: 'Menús semanales equilibrados adaptados a tus gustos y necesidades energéticas.',
    icon: <Salad className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Análisis Corporal',
    description: 'Evaluación detallada de composición de grasa, músculo y agua mediante Bioimpedancia.',
    icon: <Heart className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Suplementación',
    description: 'Asesoramiento experto sobre suplementos que realmente funcionan para tus metas.',
    icon: <Coffee className="h-6 w-6 text-primary" />,
  },
  {
    title: 'Seguimiento Mensual',
    description: 'Revisiones constantes para ajustar el plan según tu progreso y evolución.',
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
  },
];

export default function NutritionPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-background overflow-hidden border-b border-border">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-square max-w-lg mx-auto rounded-3xl bg-muted overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 flex items-center justify-center text-primary/10">
                  <Apple size={200} strokeWidth={1} />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="order-1 lg:order-2"
            >
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Alimentación Inteligente</span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8">
                Servicio de <span className="text-primary italic">Nutrición</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                El entrenamiento es solo el 30%, el resto sucede en la cocina. Nuestros nutricionistas titulados te guiarán para potenciar tus resultados.
              </p>
              <AnimatedButton size="xl" icon={<ArrowRight size={20} />}>
                Agendar Consulta Online
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-16">¿Qué incluye el servicio?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <AnimatedCard key={index} variant="glass" className="p-10 hover:border-primary/50 transition-colors">
                <div className="mb-6 p-5 bg-primary/10 rounded-2xl w-fit mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-serif italic mb-8 leading-snug"
          >
            "Tu cuerpo es el único lugar que tienes para vivir. Cuídalo desde adentro hacia afuera con una nutrición consciente y profesional."
          </motion.p>
          <div className="h-1 w-20 bg-primary mx-auto" />
        </div>
      </section>
    </div>
  );
}
