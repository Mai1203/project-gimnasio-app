'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Sparkles, Wind, Moon, ArrowRight, Sun } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';

const treatments = [
  {
    title: 'Masaje Deportivo',
    description: 'Recuperación profunda de tejidos para optimizar el rendimiento y prevenir lesiones.',
    icon: <Sparkles className="h-6 w-6 text-primary" />,
    duration: '60 min',
  },
  {
    title: 'Sauna Finlandés',
    description: 'Elimina toxinas y relaja tu sistema nervioso en un ambiente de calor controlado.',
    icon: <Sun className="h-6 w-6 text-primary" />,
    duration: '20-30 min',
  },
  {
    title: 'Baño de Vapor',
    description: 'Limpia tus poros y mejora tu respiración con nuestra sala de vapor aromático.',
    icon: <Waves className="h-6 w-6 text-primary" />,
    duration: '20 min',
  },
  {
    title: 'Zona de Meditación',
    description: 'Espacio de absoluto silencio con luz tenue para desconectar del ruido exterior.',
    icon: <Moon className="h-6 w-6 text-primary" />,
    duration: 'Libre',
  },
];

export default function SpaPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
        {/* Placeholder for serene spa video/image background */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center opacity-30">
            <Waves size={200} className="text-primary/20" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl"
          >
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Refugio de Bienestar</span>
            <h1 className="text-6xl lg:text-8xl font-bold tracking-tight text-foreground mb-8">
              Spa & <span className="text-primary italic">Relajación</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              El descanso es parte del entrenamiento. Equilibra tu cuerpo y mente en nuestro santuario de calma exclusivo para miembros.
            </p>
            <div className="flex gap-4">
              <AnimatedButton size="xl">Ver Catálogo de Masajes</AnimatedButton>
              <AnimatedButton variant="outline" size="xl">Reservar Turno</AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Experiencias de Recuperación</h2>
            <p className="text-muted-foreground max-w-xl mx-auto italic">Diseñadas para revitalizar tus sentidos después de una sesión intensa.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {treatments.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatedCard className="p-10 border-none shadow-2xl bg-muted/30 group hover:bg-white transition-colors">
                  <div className="mb-6 p-4 bg-white rounded-full w-fit group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
                    <Wind size={14} />
                    <span>{item.duration}</span>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Perk */}
      <section className="py-24 bg-muted/10 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Inclusión en Planes VIP</h2>
            <p className="text-lg text-muted-foreground">
              Ten en cuenta que el acceso a la zona de vapor y meditación es ilimitado para socios del plan **Elite VIP**. Los masajes deportivos requieren reservación previa.
            </p>
            <AnimatedButton size="lg" icon={<ArrowRight size={20} />}>Explorar Membresía VIP</AnimatedButton>
          </div>
        </div>
      </section>
    </div>
  );
}
