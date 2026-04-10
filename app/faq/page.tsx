'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: '¿Cuáles son los horarios de apertura?',
    answer: 'Abrimos de Lunes a Viernes de 5:00 AM a 11:00 PM, Sábados de 7:00 AM a 9:00 PM y Domingos de 8:00 AM a 4:00 PM.',
  },
  {
    question: '¿Necesito experiencia previa para las clases grupales?',
    answer: 'No, todas nuestras clases están diseñadas para adaptarse a diferentes niveles. Nuestros instructores te guiarán sin importar si eres principiante o experto.',
  },
  {
    question: '¿Puedo cancelar mi membresía en cualquier momento?',
    answer: 'Sí, nuestras membresías recurrentes pueden cancelarse con un aviso de 15 días antes de tu próxima fecha de facturación. No hay penalizaciones ocultas.',
  },
  {
    question: '¿Tienen estacionamiento para socios?',
    answer: 'Sí, contamos con estacionamiento privado y gratuito para todos nuestros miembros durante su permanencia en el gimnasio.',
  },
  {
    question: '¿Cómo reservo una sesión de entrenamiento personal?',
    answer: 'Puedes reservarla directamente desde nuestra aplicación móvil, en el mostrador del gimnasio o contactándonos vía WhatsApp.',
  },
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header */}
      <section className="bg-background py-20 text-center">
        <div className="container mx-auto px-4 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground"
          >
            Preguntas <span className="text-primary italic">Frecuentes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Todo lo que necesitas saber sobre Esthetic Gym en un solo lugar.
          </motion.p>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="py-24 bg-muted/20 pb-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-primary/50 transition-all"
                >
                  <AccordionTrigger className="text-left font-bold text-lg hover:text-primary hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Missing Question Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">¿No encontraste lo que buscabas?</h2>
          <p className="mb-8 opacity-90">Escríbenos directamente y resolveremos tu duda personalmente.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-primary rounded-xl font-bold shadow-xl transition-all"
          >
            Enviar Consulta Directa
          </motion.button>
        </div>
      </section>
    </div>
  );
}
