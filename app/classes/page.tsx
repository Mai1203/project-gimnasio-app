'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';

export default function ClassesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-white text-center border-b border-border/20 overflow-hidden">
        <div className="container mx-auto px-6 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-black tracking-[0.6em] uppercase text-primary mb-4"
          >
            Entrenamiento Táctico
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-light tracking-widest text-foreground uppercase italic"
          >
            Las <span className="font-bold not-italic">Disciplinas</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] text-muted-foreground max-w-xl mx-auto uppercase tracking-[0.3em] font-bold leading-loose"
          >
            Una selección curada de arquetipos de alto rendimiento diseñados para la estructura anatómica moderna.
          </motion.p>
        </div>
      </section>

      {/* Disciplines Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {[
              { 
                title: 'Weightlifting', 
                desc: 'Enfoque técnico de grado de competición.',
                img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac00dc?auto=format&fit=crop&q=80&w=1200' 
              },
              { 
                title: 'Arquitectura', 
                desc: 'Hipertrofia a través de mecánica de precisión.',
                img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?auto=format&fit=crop&q=80&w=1200' 
              },
              { 
                title: 'Táctica', 
                desc: 'Acondicionamiento metabólico multifuncional.',
                img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200' 
              },
              { 
                title: 'Física de Combate', 
                desc: 'Potencia explosiva y optimización de reflejos.',
                img: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=1200' 
              }
            ].map((cls, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative h-[350px] md:h-[500px] overflow-hidden border border-border/40 transition-all duration-1000 mb-8">
                  <img src={cls.img} alt={cls.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700" />
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0">
                  <div>
                    <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-2 italic">{cls.title}</h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em]">{cls.desc}</p>
                  </div>
                  <AnimatedButton variant="outline" className="text-[10px] font-black uppercase tracking-[0.4em] px-8 py-4 border-black text-black hover:bg-black hover:text-white rounded-none transition-all duration-500">
                    Solicitar Acceso
                  </AnimatedButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-32 bg-secondary/5 text-center">
        <div className="container mx-auto px-6">
          <p className="text-[10px] font-black tracking-[0.6em] uppercase text-muted-foreground mb-8">Coaching Privado Disponible Bajo Solicitud</p>
          <div className="w-12 h-[1px] bg-primary mx-auto" />
        </div>
      </section>
    </div>
  );
}
