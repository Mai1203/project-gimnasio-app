// ==========================================
// TIPOS Y INTERFACES DEL SISTEMA DE GIMNASIO
// ==========================================

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipPlan: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  address?: string;
  emergencyContact?: string;
  birthDate?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // en meses
  features: string[];
  color: string;
  popular?: boolean;
}

export interface DashboardStats {
  dailyRevenue: number;
  dailyVisitors: number;
  totalRevenue: number;
  activeMembers: number;
  newMembersToday: number;
  popularPlan: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  membershipPlan: string;
  status: 'active' | 'inactive' | 'suspended';
  address?: string;
  emergencyContact?: string;
  birthDate?: string;
}

export interface PlanFormData {
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  color: string;
  popular?: boolean;
}