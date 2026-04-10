'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, MessageSquare, Book, Settings, LifeBuoy } from 'lucide-react';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedInput } from '@/components/ui/animated-input';

const categories = [
  { title: 'Mi Cuenta', description: 'Problemas de acceso, perfil y configuración.', icon: <Settings /> },
  { title: 'Planes y Pagos', description: 'Facturación, cambios de plan y reembolsos.', icon: <LifeBuoy /> },
  { title: 'Clases y Reservas', description: 'Cómo agendar, cancelar o modificar sesiones.', icon: <Book /> },
  { title: 'Soporte Técnico', description: 'Inconvenientes con la app o el sitio web.', icon: <MessageSquare /> },
];

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Search Header */}
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <HelpCircle size={400} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold"
          >
            ¿Cómo podemos <span className="underline decoration-white/30 italic">ayudarte?</span>
          </motion.h1>
          <div className="max-w-2xl mx-auto">
            <AnimatedInput 
              placeholder="Busca por tema (ej. Facturación, Clases...)" 
              icon={<Search size={20} />}
              className="bg-white/10 border-white/20 text-white placeholder-white/60 focus:bg-white focus:text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Explora por Categoría</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AnimatedCard variant="glass" className="p-10 text-center hover:border-primary transition-all group">
                  <div className="mb-6 p-4 bg-muted rounded-full w-fit mx-auto group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {cat.description}
                  </p>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact Teaser */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto bg-card p-12 rounded-3xl border border-border shadow-xl">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">¿Aún necesitas ayuda?</h2>
              <p className="text-muted-foreground">Nuestro equipo de soporte está disponible de Lunes a Sábado, 8:00 AM - 10:00 PM.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors">Abrir Ticket</button>
              <button className="px-8 py-3 border border-border rounded-xl font-bold hover:bg-muted transition-colors">Chat en Vivo</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
