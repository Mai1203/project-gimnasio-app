'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AnimatedButton } from '@/components/ui/animated-button';

export default function ClassesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 🎬 CINEMATIC HEADER */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-50 grayscale">
          <img 
            src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=2000" 
            alt="Performance Architecture" 
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-white" />

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] font-black tracking-[0.8em] uppercase text-primary italic mb-6 block">
              INGENIERÍA CORPORAL
            </span>
            <h1 className="text-4xl md:text-7xl font-light text-white tracking-[0.4em] uppercase">
              LAS <span className="italic font-bold lowercase">disciplinas</span>
            </h1>
            <div className="w-16 h-[1px] bg-primary mx-auto mt-10 opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Disciplines Portfolio */}
      <section className="py-32 bg-white">
        <div className="container px-8 mx-auto">
          <div className="grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-32">
            {[
              { 
                title: 'Weightlifting', 
                desc: 'Precisión técnica y transferencia de potencia absoluta.',
                img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1200' 
              },
              { 
                title: 'Arquitectura', 
                desc: 'Hipertrofia dirigida mediante mecánica de fluidos y tensión.',
                img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1200' 
              },
              { 
                title: 'Táctica', 
                desc: 'Acondicionamiento metabólico bajo fatiga controlada.',
                img: 'https://images.unsplash.com/photo-1597452485669-2c7bb5fef90d?auto=format&fit=crop&q=80&w=1200' 
              },
              { 
                title: 'Física de Combate', 
                desc: 'Desarrollo de reflejos y torque explosivo multi-axial.',
                img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1200'
              }
            ].map((cls, index) => (
              <motion.div
                key={index}
                className="cursor-pointer group"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="relative h-[400px] md:h-[600px] overflow-hidden group">
                  <img src={cls.img} alt={cls.title} className="w-full h-full object-cover grayscale transition-transform duration-[2000ms] group-hover:scale-110" />
                  <div className="absolute inset-0 transition-all duration-1000 bg-black/20 group-hover:bg-black/0" />
                  
                  {/* Hover Overlay */}
                  <div className="flex absolute inset-x-8 bottom-8 flex-col gap-6 items-start md:inset-x-12 md:bottom-12">
                    <div className="w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-1000" />
                    <button className="bg-white text-black py-5 px-10 text-[10px] font-black uppercase tracking-[0.4em] translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 hover:bg-primary hover:text-white">
                      SOLICITAR ACCESO
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 justify-between items-start mt-12 md:flex-row">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light uppercase tracking-[0.3em] mb-4 italic text-black">
                      {cls.title}
                    </h3>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.4em] max-w-sm leading-loose">
                      {cls.desc}
                    </p>
                  </div>
                  <div className="text-[10px] font-black text-black/20 tracking-widest group-hover:text-primary transition-colors">
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-48 text-center bg-white border-t border-border/10">
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-[10px] font-black tracking-[0.8em] uppercase text-black/50 mb-12 italic">
              Entrenamiento de Grado Superior
            </p>
            <Link href="/auth/register">
              <button className="bg-black text-white px-20 py-8 text-[10px] font-black uppercase tracking-[0.6em] hover:bg-primary transition-all duration-700">
                COMENZAR EVALUACIÓN
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
