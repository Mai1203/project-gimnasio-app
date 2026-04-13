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
  Target,
  UserCheck,
  Calendar,
  Award,
} from 'lucide-react';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedCard } from '@/components/ui/animated-card';
import { cn } from '@/lib/utils';

export default function Home() {
const containerRef = useRef(null);

  const personalTrainingBenefits = [
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

  return (
    <div ref={containerRef} className="flex overflow-x-hidden flex-col min-h-screen bg-white snap-y snap-mandatory scroll-smooth">
      {/* 🎬 HERO 1 - LUXURY MINIMALISTA */}
      <section id="hero1" className="flex overflow-hidden relative flex-shrink-0 justify-center items-center h-screen snap-start snap-always">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="w-full h-full"
            initial={{ filter: "blur(10px)" }}
            whileInView={{ filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
          >
            <video autoPlay muted loop playsInline className="object-cover w-full h-full">
              <source src="https://res.cloudinary.com/dnz8iu8wm/video/upload/f_auto,q_auto/hero1_1920_1080_25fps_v1srdu.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-white/70 mb-8 border-b border-white/20 pb-2">
              El Estándar de la Fuerza
            </span>
            <h1 className="text-4xl md:text-8xl font-light text-white tracking-[0.3em] mb-12 uppercase leading-tight">
              ESTHETIC <span className="font-bold text-primary">GYM</span>
            </h1>
            <p className="mx-auto mb-16 max-w-2xl text-sm font-light tracking-widest leading-relaxed md:text-lg text-white/80">
              La convergencia entre el máximo rendimiento atlético y el diseño arquitectónico refinado. El entorno de entrenamiento más exclusivo de Colombia.
            </p>
            <div className="flex flex-col gap-6 justify-center sm:flex-row">
              <Link href="/auth/register">
                <button className="bg-primary text-white px-16 py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700">
                  Unirse a la Élite
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🎬 HERO 2 - TECNOLOGÍA Y PRECISIÓN */}
      <section id="hero2" className="flex overflow-hidden relative flex-shrink-0 justify-center items-center h-screen snap-start snap-always">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="w-full h-full"
            initial={{ filter: "blur(10px)" }}
            whileInView={{ filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
          >
            <video autoPlay muted loop playsInline className="object-cover w-full h-full">
              <source src="https://res.cloudinary.com/dnz8iu8wm/video/upload/f_auto,q_auto/hero2_1920_1080_25fps_gqkyso.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-white/70 mb-8 border-b border-white/20 pb-2">
              Ingeniería Aplicada
            </span>
            <h2 className="text-4xl md:text-8xl font-light text-white tracking-[0.3em] mb-12 uppercase leading-tight">
              PRECISIÓN <br /><span className="font-bold text-primary">ANALÍTICA</span>
            </h2>
            <p className="mx-auto mb-16 max-w-3xl text-sm font-light tracking-widest leading-relaxed md:text-lg text-white/80">
              Equipamiento de grado científico y biomecánica avanzada. En Esthetic Gym, cada repetición se diseña para una eficiencia absoluta y resultados estéticos superiores.
            </p>
            <div className="flex flex-col gap-6 justify-center sm:flex-row">
              <Link href="/classes">
                <button className="border border-white/30 text-white px-16 py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-white/10 transition-all duration-700">
                  Disciplinas Técnicas
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 🎬 HERO 3 - MENTALIDAD Y LEGADO */}
      <section id="hero3" className="flex overflow-hidden relative flex-shrink-0 justify-center items-center h-screen snap-start snap-always">
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="w-full h-full"
            initial={{ filter: "blur(10px)" }}
            whileInView={{ filter: "blur(0px)" }}
            transition={{ duration: 1.5 }}
          >
            <video autoPlay muted loop playsInline className="object-cover w-full h-full">
              <source src="https://res.cloudinary.com/dnz8iu8wm/video/upload/f_auto,q_auto/hero3_1920_1080_25fps_lfioqc.mp4" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.6em] uppercase text-white/70 mb-8 border-b border-white/20 pb-2">
              Forja tu propia historia
            </span>
            <h2 className="text-4xl md:text-8xl font-light text-white tracking-[0.3em] mb-12 uppercase leading-tight">
              TU <span className="italic font-bold text-primary">LEGADO</span> <br />COMIENZA AQUÍ
            </h2>
            <p className="mx-auto mb-16 max-w-2xl text-sm font-light tracking-widest leading-relaxed md:text-lg text-white/80">
              No es solo entrenamiento. Es la arquitectura de tu mejor versión. Únete al colectivo que está definiendo la excelencia física en la nación.
            </p>
            <div className="flex flex-col gap-6 justify-center sm:flex-row">
              <Link href="/auth/register">
                <button className="bg-white text-black px-20 py-6 text-[10px] font-black uppercase tracking-[0.6em] hover:bg-primary hover:text-white transition-all duration-700">
                  Solicitar Admisión
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ⚡ REST OF CONTENT - SILKY TRANSITION */}
      <div className="relative z-10 bg-white snap-align-none">
        {/* 🏆 SECCIÓN PERSONAL TRAINING (ORIGINAL) */}
        <section className="relative py-24 bg-background overflow-hidden border-b border-border">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              >
                <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Servicio Premium</span>
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-black mb-8">
                  Entrenamiento <span className="text-primary italic">Personal</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                  Alcanza tus metas el doble de rápido con el apoyo de nuestros entrenadores de élite. Diseñamos el camino hacia tu éxito personal.
                </p>
                <AnimatedButton size="xl" icon={<ArrowRight size={20} />}>
                  Reservar Sesión de Evaluación
                </AnimatedButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1.2 }}
                className="relative aspect-video rounded-3xl bg-muted overflow-hidden shadow-2xl border border-border"
              >
                <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                  <UserCheck size={120} strokeWidth={1} />
                </div>
                {/* Se puede añadir una imagen aquí si se desea */}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 uppercase tracking-tight italic">
              ¿Por qué elegir un <span className="not-italic text-primary">Personal Trainer?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
              {personalTrainingBenefits.map((benefit, index) => (
                <AnimatedCard key={index} variant="glass" className="p-8 border border-border/50">
                  <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white md:py-32">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col gap-8 justify-between items-end mb-20 md:flex-row">
            <div className="max-w-xl">
              <h2 className="mb-6 text-3xl italic font-light tracking-widest uppercase md:text-4xl">Ingeniería <br /><span className="not-italic font-bold">Refinada</span></h2>
              <div className="w-20 h-[1px] bg-primary mb-6" />
              <p className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest leading-loose">
                Curamos cada detalle: desde equipos biomecánicamente precisos hasta la atmósfera sensorial de nuestros espacios. La perfección es nuestra única métrica.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 border md:grid-cols-3 border-border/40">
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
      <section className="py-24 md:py-32 bg-secondary/5 snap-align-none">
        <div className="container px-6 mx-auto mb-16 text-center">
          <h2 className="text-[10px] font-black tracking-[0.6em] uppercase text-primary mb-4">Portafolio de Entrenamiento</h2>
          <h3 className="text-3xl italic font-light tracking-widest leading-none uppercase md:text-4xl">Las Disciplinas</h3>
        </div>

        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
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
                  className="object-cover absolute inset-0 w-full h-full transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-all duration-700 bg-black/20 group-hover:bg-black/0" />
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
      <section className="py-32 text-center bg-white md:py-48 snap-align-none">
        <div className="container px-6 mx-auto max-w-4xl">
          <blockquote className="mb-16 text-2xl italic font-light tracking-widest leading-loose md:text-4xl text-foreground">
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
        <div className="container px-6 mx-auto mb-20 text-center">
          <h2 className="text-3xl italic font-light tracking-widest uppercase md:text-4xl">Membresías</h2>
        </div>

        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 gap-0 bg-white border lg:grid-cols-3 border-border/40">
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
                <div className="mb-12 text-4xl italic font-light tracking-tighter md:text-5xl">{plan.price}<span className="text-[10px] opacity-40 ml-2 tracking-widest uppercase not-italic">/Mensual</span></div>
                <div className="flex-1 mb-20 space-y-4">
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
      <section className="overflow-hidden relative py-32 bg-white border-t md:py-48 border-border/20">
        <div className="container px-6 mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light text-foreground tracking-[0.3em] uppercase mb-16 leading-tight">Comienza Tu <br /><span className="not-italic font-bold">Legado.</span></h2>
          <Link href="/auth/register">
            <button className="bg-primary text-white border border-primary px-20 py-6 text-[10px] font-black uppercase tracking-[0.5em] hover:bg-transparent hover:text-primary transition-all duration-500">
              Solicitar Admisión
            </button>
          </Link>
          <p className="mt-16 text-muted-foreground text-[10px] font-bold tracking-[0.6em] uppercase">Esthetic Gym &copy; 2024</p>
        </div>
      </section>
    </div>
  </div>
);
}
