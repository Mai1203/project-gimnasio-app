'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Dumbbell, 
  Users, 
  Zap, 
  CheckCircle2, 
  Star, 
  Play, 
  ArrowRight,
} from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { cn } from '@/lib/utils';

export default function Home() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* 🎬 HERO - LUXURY MINIMALISTA */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://www.pexels.com/download/video/33261219/" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-white/70 mb-8 border-b border-white/20 pb-2">
              El Estándar de la Fuerza
            </span>
            <h1 className="text-4xl md:text-7xl font-light text-white tracking-[0.2em] mb-10 uppercase leading-tight">
              ESTHETIC <span className="font-bold text-primary">GYM</span>
            </h1>
            <p className="text-sm md:text-lg text-white/80 max-w-2xl mx-auto mb-12 font-light tracking-widest leading-relaxed">
              La convergencia entre el máximo rendimiento atlético y el diseño arquitectónico refinado. El entorno de entrenamiento más exclusivo de Colombia.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/auth/register">
                <button className="bg-primary text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500">
                  Unirse a la Élite
                </button>
              </Link>
              <Link href="/plans">
                <button className="border border-white/30 text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all duration-500">
                  Explorar Planes
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⚡ BENEFICIOS - MINIMALISMO TÉCNICO */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-6 italic">Ingeniería <br /><span className="font-bold not-italic">Refinada</span></h2>
              <div className="w-20 h-[1px] bg-primary mb-6" />
              <p className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest leading-loose">
                Curamos cada detalle: desde equipos biomecánicamente precisos hasta la atmósfera sensorial de nuestros espacios. La perfección es nuestra única métrica.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border/40">
            {[
              { 
                title: 'Alto Calibre', 
                desc: 'Discos de competición y barras personalizadas diseñadas para deflexión cero.',
                icon: <Dumbbell className="w-5 h-5" />
              },
              { 
                title: 'Sala Técnica', 
                desc: 'Entornos dedicados para levantamiento olímpico e hipertrofia de precisión.',
                icon: <Zap className="w-5 h-5" />
              },
              { 
                title: 'Óptima Humana', 
                desc: 'Evaluaciones fisiológicas avanzadas para alcanzar tu máximo techo genético.',
                icon: <Users className="w-5 h-5" />
              }
            ].map((benefit, i) => (
              <div
                key={i}
                className="p-12 md:p-16 border-r border-b last:border-r-0 md:[&:nth-child(3)]:border-r-0 border-border/40 hover:bg-secondary/5 transition-colors duration-500"
              >
                <div className="mb-10 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-sm font-black mb-6 uppercase tracking-[0.2em]">{benefit.title}</h3>
                <p className="text-muted-foreground text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧩 DISCIPLINAS - ESTILO GALERÍA */}
      <section className="py-24 md:py-32 bg-secondary/5">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-[10px] font-black tracking-[0.6em] uppercase text-primary mb-4">Portafolio de Entrenamiento</h2>
          <h3 className="text-3xl md:text-4xl font-light uppercase tracking-widest leading-none italic">Las Disciplinas</h3>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              { 
                title: 'Bodybuilding', 
                img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200' 
              },
              { 
                title: 'Weightlifting', 
                img: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&q=80&w=1200' 
              }
            ].map((cls, i) => (
              <motion.div 
                key={i}
                className="relative h-[300px] md:h-[450px] overflow-hidden group border border-border/50"
              >
                <img 
                  src={cls.img} 
                  alt={cls.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700" />
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-2xl font-light text-white uppercase tracking-[0.3em] italic">{cls.title}</h3>
                  <div className="w-10 h-[1px] bg-white mt-4 group-hover:w-20 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ TESTIMONIO - ENFOQUE ESTÉTICO */}
      <section className="py-32 md:py-48 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <blockquote className="text-2xl md:text-4xl font-light italic leading-loose text-foreground mb-16 tracking-widest">
            "Esthetic Gym redefinió mi comprensión del rendimiento. Es donde la ciencia de élite se encuentra con una estética impecable."
          </blockquote>
          <div className="flex flex-col items-center">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] mb-2">Markus Vargas</div>
            <div className="text-[10px] text-primary font-bold uppercase tracking-[0.3em]">Atleta Olímpico</div>
          </div>
        </div>
      </section>

      {/* 💸 PLANES - TABLA MINIMALISTA */}
      <section className="py-24 bg-secondary/5">
        <div className="container mx-auto px-6 mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest italic">Membresías</h2>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border/40 bg-white">
            {[
              { name: 'Básico', price: '$89.900' },
              { name: 'Profesional', price: '$149.900', popular: true },
              { name: 'Élite', price: '$269.900' }
            ].map((plan, i) => (
              <div key={i} className={cn(
                "p-12 md:p-16 border-r last:border-r-0 border-border/40 flex flex-col transition-all duration-500 hover:bg-secondary/5",
                plan.popular && "bg-secondary/10"
              )}>
                <h3 className="text-[10px] font-black uppercase tracking-[0.6em] mb-12 text-primary">{plan.name}</h3>
                <div className="text-4xl md:text-5xl font-light tracking-tighter mb-12 italic">{plan.price}<span className="text-[10px] opacity-40 ml-2 tracking-widest uppercase not-italic">/Mensual</span></div>
                <div className="space-y-4 mb-20 flex-1">
                  {['Acceso 24/7', 'App de Entrenamiento', 'Lockers'].map(f => (
                    <div key={f} className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground border-b border-border/20 pb-2">&mdash; {f}</div>
                  ))}
                </div>
                <Link href="/plans">
                  <button className="w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] border border-black text-black hover:bg-black hover:text-white transition-all duration-500">
                    Descubrir Acceso
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - EL FINAL DE LUJO */}
      <section className="py-32 md:py-48 bg-white border-t border-border/20 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-light text-foreground tracking-[0.3em] uppercase mb-16 leading-tight">Comienza Tu <br /><span className="font-bold not-italic">Legado.</span></h2>
          <Link href="/auth/register">
            <button className="bg-primary text-white border border-primary px-20 py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-transparent hover:text-primary transition-all duration-500">
              Solicitar Admisión
            </button>
          </Link>
          <p className="mt-16 text-muted-foreground text-[10px] font-bold tracking-[0.6em] uppercase">Esthetic Gym &copy; 2024</p>
        </div>
      </section>
    </div>
  );
}
