'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface Plan {
  id: string;
  name: string;
  priceCents: number;
  durationDays: number;
  description: string;
  features: string[];
  activeSubscriptions: number;
  active: boolean;
}

/**
 * Plans management page
 * Displays gym membership plans with pricing and features
 */
export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockPlans: Plan[] = [
        {
          id: '1',
          name: 'Plan Básico',
          priceCents: 2999,
          durationDays: 30,
          description: 'Acceso básico al gimnasio durante 30 días',
          features: ['Acceso al área de pesas', 'Acceso al área de cardio', 'Casillero incluido'],
          activeSubscriptions: 45,
          active: true,
        },
        {
          id: '2',
          name: 'Plan Premium',
          priceCents: 4999,
          durationDays: 30,
          description: 'Acceso completo con clases grupales',
          features: [
            'Todo lo del Plan Básico',
            'Clases grupales ilimitadas',
            'Acceso a la sauna',
            'Nutricionista incluido',
          ],
          activeSubscriptions: 78,
          active: true,
        },
        {
          id: '3',
          name: 'Plan VIP',
          priceCents: 7999,
          durationDays: 30,
          description: 'Acceso VIP con entrenador personal',
          features: [
            'Todo lo del Plan Premium',
            '2 sesiones de entrenamiento personal',
            'Acceso 24/7',
            'Área VIP exclusiva',
          ],
          activeSubscriptions: 23,
          active: true,
        },
      ];
      setPlans(mockPlans);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatPrice = (priceCents: number) => {
    return `$${(priceCents / 100).toFixed(2)}`;
  };

  const getPlanColor = (index: number) => {
    const colors = ['border-primary', 'border-secondary', 'border-accent'];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-60 bg-surface-hover rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Planes</h1>
          <p className="text-text-secondary mt-2">
            Gestiona los planes de membresía del gimnasio
          </p>
        </div>
        <Button size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Plan
        </Button>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className={`border-2 ${getPlanColor(index)} relative overflow-hidden`}>
              {/* Popular badge for middle plan */}
              {index === 1 && (
                <div className="absolute top-4 right-4 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{plan.name}</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(plan.priceCents)}
                    </div>
                    <div className="text-sm text-text-muted">
                      /{plan.durationDays} días
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-text-secondary text-sm">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-text-primary"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Subscribers */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center text-sm text-text-muted">
                    <Users className="h-4 w-4 mr-2" />
                    {plan.activeSubscriptions} suscriptores
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-error" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Plans Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Planes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {plans.reduce((sum, plan) => sum + plan.activeSubscriptions, 0)}
                </div>
                <p className="text-text-muted">Total Suscriptores</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  ${plans.reduce((sum, plan) => sum + (plan.priceCents * plan.activeSubscriptions), 0) / 100}
                </div>
                <p className="text-text-muted">Ingresos Mensuales</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-info">{plans.length}</div>
                <p className="text-text-muted">Planes Activos</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  ${(plans.reduce((sum, plan) => sum + plan.priceCents, 0) / plans.length / 100).toFixed(2)}
                </div>
                <p className="text-text-muted">Precio Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}