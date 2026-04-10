'use client';

// ==========================================
// PANEL DE ADMINISTRACIÓN PRINCIPAL (DASHBOARD)
// ==========================================

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  DollarSign,
  UserPlus,
  Activity,
  Calendar,
  Target,
  BarChart3,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { useApp } from '@/context/AppContext';
import { AnimatedCard } from '@/components/ui/animated-card';
import { AnimatedButton } from '@/components/ui/animated-button';

export default function AdminDashboard() {
  const { user, dashboardStats, users, plans } = useApp();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Cargando...</p>;
  }

  if (!session) {
    return <p>No tienes acceso a esta página</p>;
  }

  // Datos para gráficos y estadísticas
  const quickStats = [
    {
      title: 'Miembros Activos',
      value: dashboardStats.activeMembers.toLocaleString(),
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-500/20 to-cyan-600/20',
    },
    {
      title: 'Ingresos del Día',
      value: `$${dashboardStats.dailyRevenue.toLocaleString()}`,
      change: '+8%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-500/20 to-emerald-600/20',
    },
    {
      title: 'Visitantes Hoy',
      value: dashboardStats.dailyVisitors.toString(),
      change: '+15%',
      icon: Activity,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-500/20 to-violet-600/20',
    },
    {
      title: 'Nuevos Miembros',
      value: dashboardStats.newMembersToday.toString(),
      change: '+5%',
      icon: UserPlus,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-500/20 to-orange-600/20',
    },
  ];

  const quickActions = [
    {
      title: 'Agregar Usuario',
      description: 'Registrar nuevo miembro',
      icon: UserPlus,
      href: '/admin/users?action=add',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Crear Plan',
      description: 'Nuevo plan de membresía',
      icon: Plus,
      href: '/admin/plans?action=add',
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Ver Reportes',
      description: 'Análisis y métricas',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'from-purple-500 to-violet-600',
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: Target,
      href: '/admin/settings',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  // Usuarios recientes (últimos 5)
  const recentUsers = users.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
              Panel de Administración
            </h1>
            <p className="text-gray-400">
              Bienvenido de nuevo, {session.user?.name}. Aquí tienes un resumen
              de Esthetic Gym.
            </p>
          </div>

          <div className="mt-4 flex space-x-3 md:mt-0">
            <AnimatedButton variant="outline" size="md">
              <Calendar size={18} />
              Hoy: {new Date().toLocaleDateString('es-MX')}
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <AnimatedCard key={index} variant="glass" delay={index * 0.1}>
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={`rounded-xl bg-gradient-to-br p-3 ${stat.bgColor}`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-400">
                      {stat.change}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                  </div>

                  {/* Barra de progreso decorativa */}
                  <div className="mt-4 h-1 w-full rounded-full bg-slate-700">
                    <motion.div
                      className={`h-1 bg-gradient-to-r ${stat.color} rounded-full`}
                      initial={{ width: '0%' }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: index * 0.2 + 0.5 }}
                    />
                  </div>
                </div>
              </AnimatedCard>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Acciones rápidas */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="mb-6 text-2xl font-bold text-white">
                Acciones Rápidas
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} href={action.href}>
                      <AnimatedCard variant="glass" delay={index * 0.1}>
                        <div className="group cursor-pointer p-6">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`rounded-xl bg-gradient-to-br p-3 ${action.color} transition-transform duration-200 group-hover:scale-110`}
                            >
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-white transition-colors group-hover:text-amber-400">
                                {action.title}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {action.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </AnimatedCard>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Usuarios recientes */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Usuarios Recientes
                </h2>
                <Link href="/admin/users">
                  <AnimatedButton variant="ghost" size="sm">
                    Ver todos
                  </AnimatedButton>
                </Link>
              </div>

              <AnimatedCard variant="glass">
                <div className="p-6">
                  <div className="space-y-4">
                    {recentUsers.map((user, index) => (
                      <motion.div
                        key={user.id}
                        className="flex items-center space-x-4 rounded-lg p-3 transition-colors hover:bg-white/5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 font-semibold text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-white">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {user.membershipPlan}
                          </p>
                        </div>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            user.status === 'active'
                              ? 'bg-green-400'
                              : user.status === 'inactive'
                                ? 'bg-gray-400'
                                : 'bg-red-400'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {recentUsers.length === 0 && (
                    <div className="py-8 text-center text-gray-400">
                      <Users className="mx-auto mb-4 h-12 w-12 opacity-50" />
                      <p>No hay usuarios registrados aún</p>
                    </div>
                  )}
                </div>
              </AnimatedCard>
            </motion.div>
          </div>
        </div>

        {/* Sección de estadísticas de ingresos */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Resumen financiero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-white">
              Resumen Financiero
            </h2>

            <AnimatedCard variant="gradient">
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Ingresos totales</span>
                    <span className="text-2xl font-bold text-white">
                      ${dashboardStats.totalRevenue.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Plan más popular</span>
                    <span className="font-semibold text-amber-400">
                      {dashboardStats.popularPlan}
                    </span>
                  </div>

                  <div className="border-t border-slate-700 pt-4">
                    <Link href="/admin/reports">
                      <AnimatedButton className="w-full">
                        <BarChart3 size={18} />
                        Ver Reportes Completos
                      </AnimatedButton>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>

          {/* Planes disponibles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Planes Disponibles
              </h2>
              <Link href="/admin/plans">
                <AnimatedButton variant="outline" size="sm">
                  Gestionar
                </AnimatedButton>
              </Link>
            </div>

            <div className="space-y-3">
              {plans.slice(0, 3).map((plan, index) => (
                <AnimatedCard key={plan.id} variant="glass" delay={index * 0.1}>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {plan.features.length} características
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">
                          ${plan.price}
                        </p>
                        <p className="text-sm text-gray-400">
                          /{plan.duration} mes{plan.duration > 1 ? 'es' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
