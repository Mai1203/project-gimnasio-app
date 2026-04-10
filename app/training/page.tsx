'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Zap, Flame, Target, ChevronRight } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';

const trainingTypes = [
  {
    title: 'Musculación y Fuerza',
    description: 'Aumenta tu masa muscular y potencia con equipos de peso libre de última generación.',
    icon: <Dumbbell className="h-8 w-8 text-primary" />,
    level: 'Todos los niveles',
    duration: '60-90 min',
  },
  {
    title: 'HIIT & Cardio Intenso',
    description: 'Sesiones de alta intensidad para quemar grasa y mejorar tu condición cardiovascular.',
    icon: <Zap className="h-8 w-8 text-primary" />,
    level: 'Intermedio/Avanzado',
    duration: '45 min',
  },
  {
    title: 'Cross Training',
    description: 'Entrenamiento funcional y versátil que desafía todo tu cuerpo en cada movimiento.',
    icon: <Flame className="h-8 w-8 text-primary" />,
    level: 'Avanzado',
    duration: '60 min',
  },
  {
    title: 'Entrenamiento Específico',
    description: 'Rutinas diseñadas para objetivos claros: pérdida de peso, tonificación o competencia.',
    icon: <Target className="h-8 w-8 text-primary" />,
    level: 'Personalizado',
    duration: 'Varía',
  },
];

export default function TrainingPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-background py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Saca tu Máximo Potencial
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground"
          >
            Nuestros <span className="text-primary italic">Entrenamientos</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Descubre programas diseñados por expertos para transformar tu físico. No importa de dónde vengas, aquí es donde empiezas a ser invencible.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingTypes.map((type, index) => (
              <AnimatedCard key={index} className="flex flex-col h-full bg-card hover:border-primary/50 transition-colors">
                <div className="p-8 flex flex-col h-full">
                  <div className="mb-6 p-4 bg-muted rounded-2xl w-fit">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{type.title}</h3>
                  <p className="text-muted-foreground mb-8 line-clamp-3">
                    {type.description}
                  </p>
                  <div className="mt-auto space-y-4 pt-6 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Nivel:</span>
                      <span className="font-semibold text-foreground">{type.level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duración:</span>
                      <span className="font-semibold text-foreground">{type.duration}</span>
                    </div>
                    <AnimatedButton variant="ghost" className="w-full justify-between" icon={<ChevronRight size={18} />}>
                      Más Información
                    </AnimatedButton>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold lg:text-5xl">¿No sabes por dónde empezar?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Recibe una evaluación gratuita y diseño de rutina inicial por uno de nuestros entrenadores de élite.
          </p>
          <div className="flex justify-center">
            <AnimatedButton size="xl" className="bg-white text-primary hover:bg-white/90">
              Solicitar Evaluación Gratuita
            </AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
