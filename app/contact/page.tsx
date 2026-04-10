'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Instagram, Twitter, Facebook } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedInput } from '@/components/ui/animated-input';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-background py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground"
          >
            Ponte en <span className="text-primary italic">Contacto</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            ¿Tienes alguna pregunta o estás listo para empezar? Escríbenos y te responderemos en menos de 24 horas.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AnimatedCard variant="default" className="p-10 shadow-2xl">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatedInput label="Nombre" placeholder="Tu nombre" icon={<Send size={18} className="rotate-45" />} />
                    <AnimatedInput label="Email" type="email" placeholder="tu@email.com" icon={<Mail size={18} />} />
                  </div>
                  <AnimatedInput label="Asunto" placeholder="¿Cómo podemos ayudarte?" />
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/80 ml-1">Mensaje</label>
                    <textarea 
                      className="w-full min-h-[150px] rounded-xl border border-border bg-background px-4 py-4 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="Escribe aquí tu mensaje..."
                    />
                  </div>
                  <AnimatedButton size="xl" className="w-full" icon={<Send size={20} />}>Enviar Mensaje</AnimatedButton>
                </form>
              </AnimatedCard>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                {[
                  { icon: <MapPin />, title: 'Ubicación', description: 'Av. Reforma 123, Ciudad de México' },
                  { icon: <Phone />, title: 'Llámanos', description: '+52 55 1234 5678' },
                  { icon: <Mail />, title: 'Email', description: 'hola@estheticgym.com' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 items-center">
                    <div className="p-5 bg-primary/10 text-primary rounded-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Connect */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Síguenos en redes</h3>
                <div className="flex gap-4">
                  {[<Instagram />, <Twitter />, <Facebook />].map((icon, idx) => (
                    <motion.a
                      key={idx}
                      href="#"
                      whileHover={{ y: -5, backgroundColor: 'hsl(var(--primary))', color: 'white' }}
                      className="p-4 bg-card rounded-xl border border-border text-muted-foreground transition-all"
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Placeholder for Interactive Map */}
              <div className="w-full h-64 rounded-3xl bg-muted overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                  <MapPin size={100} strokeWidth={1} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
