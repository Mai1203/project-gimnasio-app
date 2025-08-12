'use client';

// ==========================================
// CONTEXTO GLOBAL DE LA APLICACIÓN
// ==========================================

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Plan, DashboardStats, AuthUser } from '@/types';
import { mockUsers, mockPlans, mockDashboardStats } from '@/lib/mock-data';

interface AppContextType {
  // Estado de autenticación
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  
  // Gestión de usuarios
  users: User[];
  addUser: (user: Omit<User, 'id' | 'joinDate'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
  
  // Gestión de planes
  plans: Plan[];
  addPlan: (plan: Omit<Plan, 'id'>) => void;
  updatePlan: (id: string, plan: Partial<Plan>) => void;
  deletePlan: (id: string) => void;
  getPlanById: (id: string) => Plan | undefined;
  
  // Dashboard stats
  dashboardStats: DashboardStats;
  updateDashboardStats: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [plans, setPlans] = useState<Plan[]>(mockPlans);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(mockDashboardStats);

  // Funciones de autenticación
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de autenticación - en producción sería una llamada a API
    if (email === 'admin@gym.com' && password === 'admin123') {
      setUser({
        id: '1',
        email: email,
        name: 'Administrador',
        role: 'admin'
      });
      return true;
    }
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    // Simulación de registro - en producción sería una llamada a API
    const newUser: AuthUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: 'user'
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  // Funciones de gestión de usuarios
  const addUser = (userData: Omit<User, 'id' | 'joinDate'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [...prev, newUser]);
    updateDashboardStats();
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
    updateDashboardStats();
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    updateDashboardStats();
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  // Funciones de gestión de planes
  const addPlan = (planData: Omit<Plan, 'id'>) => {
    const newPlan: Plan = {
      ...planData,
      id: Date.now().toString()
    };
    setPlans(prev => [...prev, newPlan]);
  };

  const updatePlan = (id: string, planData: Partial<Plan>) => {
    setPlans(prev => prev.map(plan => 
      plan.id === id ? { ...plan, ...planData } : plan
    ));
  };

  const deletePlan = (id: string) => {
    setPlans(prev => prev.filter(plan => plan.id !== id));
  };

  const getPlanById = (id: string) => {
    return plans.find(plan => plan.id === id);
  };

  // Actualizar estadísticas del dashboard
  const updateDashboardStats = () => {
    const activeUsers = users.filter(user => user.status === 'active');
    const today = new Date().toISOString().split('T')[0];
    const newToday = users.filter(user => user.joinDate === today);
    
    setDashboardStats({
      activeMembers: activeUsers.length,
      newMembersToday: newToday.length,
      dailyRevenue: Math.floor(Math.random() * 20000) + 5000, // Simulación
      dailyVisitors: Math.floor(Math.random() * 200) + 100, // Simulación
      totalRevenue: dashboardStats.totalRevenue + 1500, // Simulación
      popularPlan: 'Premium'
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    users,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    plans,
    addPlan,
    updatePlan,
    deletePlan,
    getPlanById,
    dashboardStats,
    updateDashboardStats
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
};