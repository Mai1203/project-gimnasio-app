'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  UserPlus, 
  TrendingUp,
  Calendar,
  Activity
} from 'lucide-react';
import { KPI } from '@/components/ui/KPI';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface DashboardStats {
  todaysRevenue: number;
  todaysCheckIns: number;
  newSubscriptions: number;
  totalRevenue: number;
  revenueTrend: {
    change: number;
    isPositive: boolean;
  };
}

/**
 * Main dashboard page with animated KPIs
 * Shows key metrics and overview of gym operations
 */
export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats({
        todaysRevenue: 1250,
        todaysCheckIns: 45,
        newSubscriptions: 8,
        totalRevenue: 125430,
        revenueTrend: {
          change: 12.5,
          isPositive: true,
        },
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <div className="text-text-secondary">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>

        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-20 bg-surface-hover rounded"></div>
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
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <div className="text-text-secondary">
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <KPI
            title="Ingresos Hoy"
            value={stats?.todaysRevenue || 0}
            icon={DollarSign}
            prefix="$"
            trend={stats?.revenueTrend}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <KPI
            title="Check-ins Hoy"
            value={stats?.todaysCheckIns || 0}
            icon={Users}
            trend={{ value: 8.3, isPositive: true }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <KPI
            title="Nuevas Suscripciones"
            value={stats?.newSubscriptions || 0}
            icon={UserPlus}
            trend={{ value: 15.2, isPositive: true }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <KPI
            title="Total Acumulado"
            value={stats?.totalRevenue || 0}
            icon={TrendingUp}
            prefix="$"
            animate={false}
          />
        </motion.div>
      </motion.div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Actividad Reciente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-surface-hover rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Nueva suscripción</p>
                    <p className="text-xs text-text-muted">Juan Pérez - Plan Premium</p>
                  </div>
                  <span className="text-xs text-text-muted ml-auto">hace 5 min</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-surface-hover rounded-lg">
                  <div className="w-2 h-2 bg-info rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Check-in</p>
                    <p className="text-xs text-text-muted">María García</p>
                  </div>
                  <span className="text-xs text-text-muted ml-auto">hace 12 min</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-surface-hover rounded-lg">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Pago pendiente</p>
                    <p className="text-xs text-text-muted">Carlos López - Plan Básico</p>
                  </div>
                  <span className="text-xs text-text-muted ml-auto">hace 1 hora</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Próximos Vencimientos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Ana Rodríguez</p>
                    <p className="text-xs text-text-muted">Plan VIP</p>
                  </div>
                  <span className="text-xs text-warning">2 días</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Luis Martínez</p>
                    <p className="text-xs text-text-muted">Plan Premium</p>
                  </div>
                  <span className="text-xs text-warning">5 días</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Sofia Chen</p>
                    <p className="text-xs text-text-muted">Plan Básico</p>
                  </div>
                  <span className="text-xs text-warning">1 semana</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}