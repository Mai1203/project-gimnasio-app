'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, FileText, CheckCircle } from 'lucide-react';

export default function TermsPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header */}
      <section className="bg-background py-20 border-b border-border">
        <div className="container mx-auto px-4 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 bg-primary/10 rounded-full text-primary mb-4"
          >
            <Shield size={32} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
          >
            Términos de <span className="text-primary italic">Uso</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground uppercase tracking-widest"
          >
            Última actualización: Abril {currentYear}
          </motion.p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-24 bg-muted/20 pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl"
          >
            <ScrollArea className="h-[600px] p-10 lg:p-16">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <FileText className="text-primary" /> 1. Aceptación de los Términos
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Al acceder y utilizar los servicios de Esthetic Gym, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios ni nuestras instalaciones.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <CheckCircle className="text-primary" /> 2. Reglas de Conducta
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Para mantener un ambiente seguro y profesional, todos los miembros deben:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-3 ml-4">
                    <li>Utilizar ropa y calzado deportivo adecuado en todo momento.</li>
                    <li>Limpiar el equipo después de su uso con los materiales proporcionados.</li>
                    <li>No dejar caer las pesas de manera inapropiada.</li>
                    <li>Respetar el tiempo de uso de las máquinas en horarios pico.</li>
                    <li>Tratar con respeto a otros miembros y al personal del gimnasio.</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">3. Salud y Responsabilidad</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Usted reconoce que la actividad física conlleva riesgos inherentes. Esthetic Gym no se hace responsable de lesiones personales resultantes de un uso inadecuado del equipo o de condiciones de salud preexistentes no declaradas. Se recomienda consultar a un médico antes de iniciar cualquier programa de ejercicio.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">4. Membresías y Cancelaciones</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Las membresías son personales e intransferibles. Los pagos se realizan por adelantado y no son reembolsables. Las cancelaciones deben solicitarse formalmente de acuerdo con las políticas establecidas en su contrato de membresía.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">5. Propiedad Intelectual</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Todo el contenido, diseños, logotipos y materiales presentados en nuestras plataformas son propiedad de Esthetic Gym y están protegidos por las leyes de propiedad intelectual aplicables.
                  </p>
                </div>
              </div>
            </ScrollArea>
            <div className="bg-muted p-6 text-center border-t border-border">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Esthetic Gym. Todos los derechos reservados.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
