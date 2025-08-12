'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dumbbell, Users, TrendingUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

/**
 * Landing page for GymControl
 * Showcases the main features and provides entry points
 */
export default function Home() {
  const features = [
    {
      icon: Users,
      title: 'Gestión de Usuarios',
      description: 'Administra miembros, planes y suscripciones de manera eficiente.',
    },
    {
      icon: TrendingUp,
      title: 'Reportes Financieros',
      description: 'Visualiza ingresos, tendencias y KPIs en tiempo real.',
    },
    {
      icon: Shield,
      title: 'Seguridad Avanzada',
      description: 'Autenticación robusta y protección de datos.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-primary rounded-2xl"
          >
            <Dumbbell className="w-10 h-10 text-white" />
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6">
            <span className="text-gradient">GymControl</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed">
            Sistema integral de gestión para gimnasios modernos.
            <br />
            Controla usuarios, planes, ingresos y más.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="min-w-[200px]">
                Ir al Dashboard
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost" size="lg" className="min-w-[200px]">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Funcionalidades Principales
            </h2>
            <p className="text-text-secondary text-lg">
              Herramientas diseñadas para optimizar la gestión de tu gimnasio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                >
                  <Card hover className="text-center h-full">
                    <div className="p-4 bg-primary bg-opacity-20 rounded-xl inline-block mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-text-muted">
            © 2024 GymControl. Sistema de gestión para gimnasios.
          </p>
        </div>
      </footer>
    </div>
  );
}