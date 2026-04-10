'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import Link from 'next/link';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { cn } from '@/lib/utils';

const plans = []; // Removed old data to use the inline hardcoded array instead

export default function PlansPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 🎬 CINEMATIC HEADER */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-40 grayscale">
          <img 
            src="https://images.unsplash.com/photo-1574673001865-45270342cb7b?auto=format&fit=crop&q=80&w=2000" 
            alt="Elite Environment" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-white" />
        
        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-black tracking-[0.8em] uppercase text-primary italic mb-6 block">
              ADMISIÓN PRIVADA
            </span>
            <h1 className="text-4xl md:text-7xl font-light text-white tracking-[0.4em] uppercase">
              LAS <span className="font-bold">MEMBRESÍAS</span>
            </h1>
            <div className="w-12 h-[1px] bg-primary mx-auto mt-8 opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border/20">
            {[
              { 
                name: 'BÁSICO', 
                price: '$89.900', 
                desc: 'Acceso táctico a la infraestructura base de Esthetic Gym.',
                features: ['Acceso 24/7', 'Protocolo Digital', 'Lockers Técnicos'],
                popular: false
              },
              { 
                name: 'PROFESIONAL', 
                price: '$149.900', 
                desc: 'Optimización avanzada con acceso a disciplinas técnicas.',
                features: ['Métricas de Rendimiento', 'Disciplinas Colectivas', 'Análisis Bio-Mecánico'],
                popular: true
              },
              { 
                name: 'ÉLITE', 
                price: '$269.900', 
                desc: 'El máximo estándar en arquitectura humana personalizada.',
                features: ['Coach de Fuerza Privado', 'Suite de Recuperación', 'Membresía Global'],
                popular: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={cn(
                  "relative p-12 md:p-20 border-r last:border-r-0 border-border/20 flex flex-col transition-all duration-1000 group",
                  plan.popular && "bg-secondary/5"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-primary" />
                )}
                <div className="text-[10px] font-black uppercase tracking-[0.6em] mb-16 text-black/40 group-hover:text-primary transition-colors duration-500">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-4 mb-16">
                  <span className="text-5xl md:text-6xl font-light tracking-tighter italic text-black">{plan.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">/mes</span>
                </div>
                <p className="mb-16 text-[10px] font-bold leading-[2.5] text-muted-foreground uppercase tracking-[0.3em] max-w-xs">
                  {plan.desc}
                </p>

                <div className="space-y-8 mb-20 flex-1">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-black/60 border-b border-border/10 pb-4">
                      <span className="text-primary font-black italic">&mdash;</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/auth/register" className="w-full">
                  <button className="w-full bg-black text-white py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-primary transition-all duration-700 relative group overflow-hidden">
                    <span className="relative z-10">SOLICITAR ACCESO</span>
                    <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer Info */}
      <section className="py-24 bg-white border-t border-border/10 text-center">
        <div className="container mx-auto px-6 opacity-30">
          <p className="text-[10px] text-muted-foreground font-bold tracking-[0.6em] uppercase">Protocolo de ingreso: Cuota única de $50.000 COP</p>
        </div>
      </section>
    </div>
  );
}
