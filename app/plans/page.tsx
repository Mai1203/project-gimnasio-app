'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { cn } from '@/lib/utils';

const plans = []; // Removed old data to use the inline hardcoded array instead

export default function PlansPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <section className="py-24 md:py-32 bg-white text-center border-b border-border/20">
        <div className="container mx-auto px-6 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black tracking-[0.6em] uppercase text-primary mb-4"
          >
            Inversión
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-light tracking-widest text-foreground uppercase italic"
          >
            Las <span className="font-bold not-italic">Membresías</span>
          </motion.h1>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border/40">
            {[
              { 
                name: 'Básico', 
                price: '$89.900', 
                desc: 'Acceso sin restricciones a nuestras áreas principales de entrenamiento.',
                features: ['Acceso 24/7', 'Soporte Técnico', 'Lockers Estándar'],
                popular: false
              },
              { 
                name: 'Profesional', 
                price: '$149.900', 
                desc: 'Acceso integral incluyendo clases de rendimiento técnico.',
                features: ['Todos los servicios Básicos', 'Clases de Rendimiento', 'Estrategia Nutricional'],
                popular: true
              },
              { 
                name: 'Élite', 
                price: '$269.900', 
                desc: 'El máximo estándar en optimización humana personalizada.',
                features: ['Todos los servicios Pro', 'Coach de Fuerza Privado', 'Acceso a Suite de Recuperación'],
                popular: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "p-12 md:p-16 border-r last:border-r-0 border-border/40 flex flex-col transition-all duration-700 hover:bg-secondary/5",
                  plan.popular && "bg-secondary/5"
                )}
              >
                <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-primary">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-4xl md:text-5xl font-light tracking-tighter italic">{plan.price}</span>
                  <span className="text-[10px] opacity-40 font-bold uppercase tracking-widest">/mes</span>
                </div>
                <p className="mb-12 text-[10px] font-bold leading-loose text-muted-foreground uppercase tracking-widest">
                  {plan.desc}
                </p>

                <div className="space-y-6 mb-16 flex-1">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-border/20 pb-2">
                      <span className="text-primary">&mdash;</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <AnimatedButton
                  variant="outline"
                  className="w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] border-black text-black hover:bg-black hover:text-white transition-all duration-500 rounded-none"
                >
                  Adquirir Acceso
                </AnimatedButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer Info */}
      <section className="py-20 bg-white border-t border-border/20 text-center">
        <div className="container mx-auto px-6">
          <p className="text-[10px] text-muted-foreground font-bold tracking-[0.4em] uppercase">Todos los planes requieren una cuota única de inscripción de $50.000 COP</p>
        </div>
      </section>
    </div>
  );
}
