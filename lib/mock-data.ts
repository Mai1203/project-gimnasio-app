// ==========================================
// DATOS MOCK PARA EL SISTEMA DE GIMNASIO
// ==========================================

import { User, Plan, DashboardStats } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'carlos@gmail.com',
    phone: '+52 123 456 7890',
    joinDate: '2024-01-15',
    membershipPlan: 'Premium',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    address: 'Calle Reforma 123, CDMX',
    emergencyContact: '+52 987 654 3210',
    birthDate: '1985-06-20'
  },
  {
    id: '2',
    name: 'María Rodríguez',
    email: 'maria@gmail.com',
    phone: '+52 234 567 8901',
    joinDate: '2024-02-10',
    membershipPlan: 'Básico',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    address: 'Av. Insurgentes 456, CDMX',
    emergencyContact: '+52 876 543 2109',
    birthDate: '1990-03-15'
  },
  {
    id: '3',
    name: 'Juan Pérez',
    email: 'juan@gmail.com',
    phone: '+52 345 678 9012',
    joinDate: '2023-12-05',
    membershipPlan: 'VIP',
    status: 'inactive',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    address: 'Colonia Roma 789, CDMX',
    emergencyContact: '+52 765 432 1098',
    birthDate: '1992-11-08'
  },
  {
    id: '4',
    name: 'Ana García',
    email: 'ana@gmail.com',
    phone: '+52 456 789 0123',
    joinDate: '2024-03-01',
    membershipPlan: 'Premium',
    status: 'active',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    address: 'Zona Rosa 321, CDMX',
    emergencyContact: '+52 654 321 0987',
    birthDate: '1988-07-25'
  }
];

export const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Básico',
    description: 'Perfecto para comenzar tu journey fitness',
    price: 599,
    duration: 1,
    features: [
      'Acceso al área de pesas',
      'Casilleros incluidos',
      'Horario de 6am a 10pm',
      'Apoyo básico de entrenadores'
    ],
    color: 'from-slate-600 to-slate-800',
    popular: false
  },
  {
    id: '2',
    name: 'Premium',
    description: 'La opción más popular para fitness completo',
    price: 899,
    duration: 1,
    features: [
      'Todo lo del plan Básico',
      'Acceso a clases grupales',
      'Zona de cardio premium',
      'Entrenamiento personalizado (2 sesiones)',
      'Acceso 24/7',
      'Área de spa y vapor'
    ],
    color: 'from-amber-500 to-orange-600',
    popular: true
  },
  {
    id: '3',
    name: 'VIP',
    description: 'Experiencia premium completa sin límites',
    price: 1299,
    duration: 1,
    features: [
      'Todo lo del plan Premium',
      'Entrenador personal dedicado',
      'Acceso a zona VIP exclusiva',
      'Nutricionista incluido',
      'Tratamientos de spa ilimitados',
      'Estacionamiento preferencial',
      'Invitados sin costo (2 por mes)'
    ],
    color: 'from-purple-600 to-indigo-700',
    popular: false
  }
];

export const mockDashboardStats: DashboardStats = {
  dailyRevenue: 12450,
  dailyVisitors: 156,
  totalRevenue: 342500,
  activeMembers: 1247,
  newMembersToday: 8,
  popularPlan: 'Premium'
};