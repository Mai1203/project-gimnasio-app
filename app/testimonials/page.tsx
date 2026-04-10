'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Miembro por 2 años',
    content: 'Esthetic Gym cambió por completo mi perspectiva del ejercicio. Las máquinas son de primera y el ambiente te motiva a darlo todo cada día.',
    avatar: 'CM',
    rating: 5,
  },
  {
    name: 'Laura García',
    role: 'Atleta de Entrenamiento Personal',
    content: 'Los entrenadores aquí son excepcionales. Perdí 15kg en 6 meses con un plan estructurado y apoyo constante. ¡El mejor gimnasio que he probado!',
    avatar: 'LG',
    rating: 5,
  },
  {
    name: 'Roberto Sánchez',
    role: 'Bajo Plan Pro',
    content: 'Las clases grupales de HIIT son lo que más disfruto. Energía pura y resultados reales en poco tiempo. Altamente recomendado.',
    avatar: 'RS',
    rating: 5,
  },
  {
    name: 'Elena Torres',
    role: 'Sociedad VIP',
    content: 'La sección de Spa y el soporte post-entrenamiento son de nivel mundial. Es el lugar perfecto para desestresarse y mantenerse en forma.',
    avatar: 'ET',
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header */}
      <section className="bg-background py-20 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
          <Quote size={400} />
        </div>
        <div className="container mx-auto px-4 relative z-10 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground"
          >
            Nuestras <span className="text-primary italic">Historias</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Lo que nuestros miembros dicen sobre su experiencia en Esthetic Gym. Transformaciones reales, resultados reales.
          </motion.p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-muted/20 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatedCard variant="glass" className="p-10 h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Quote size={80} />
                  </div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-xl text-foreground/90 italic mb-8 leading-relaxed">
                    "{testi.content}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-border pt-6">
                    <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {testi.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{testi.name}</h4>
                      <p className="text-sm text-muted-foreground">{testi.role}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">¿Listo para escribir tu propia historia?</h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <AnimatedButton size="xl">Comenzar mi Transformación</AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
