import { prisma } from '@/lib/prisma';
import { User, Role } from '@prisma/client';

export interface CreateUserData {
  name: string;
  email: string;
  password?: string;
  role?: Role;
  phone?: string;
  address?: string;
  birthDate?: Date;
  planId?: string;
}

export interface UpdateUserData extends Partial<CreateUserData> {
  id: string;
}

/**
 * User service layer for handling user-related operations
 * Provides CRUD operations and business logic for users
 */
export class UsersService {
  
  /**
   * Get all users with pagination
   */
  static async getUsers(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        include: {
          plan: true,
          _count: {
            select: {
              checkIns: true,
              transactions: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        plan: true,
        checkIns: {
          orderBy: { at: 'desc' },
          take: 10,
        },
        transactions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  /**
   * Create a new user
   */
  static async createUser(data: CreateUserData): Promise<User> {
    return prisma.user.create({
      data: {
        ...data,
        membershipStartDate: data.planId ? new Date() : null,
        membershipEndDate: data.planId 
          ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
          : null,
      },
      include: {
        plan: true,
      },
    });
  }

  /**
   * Update an existing user
   */
  static async updateUser(data: UpdateUserData): Promise<User> {
    const { id, ...updateData } = data;
    
    return prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        plan: true,
      },
    });
  }

  /**
   * Delete a user (soft delete by setting active to false)
   */
  static async deleteUser(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }

  /**
   * Get user statistics
   */
  static async getUserStats() {
    const [
      totalUsers,
      activeUsers,
      newUsersThisMonth,
      usersWithActivePlans,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { active: true } }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
      prisma.user.count({
        where: {
          planId: { not: null },
          membershipEndDate: { gt: new Date() },
          active: true,
        },
      }),
    ]);

    return {
      total: totalUsers,
      active: activeUsers,
      newThisMonth: newUsersThisMonth,
      withActivePlans: usersWithActivePlans,
    };
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(query: string, limit: number = 10) {
    return prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { email: { contains: query, mode: 'insensitive' } },
        ],
        active: true,
      },
      include: {
        plan: true,
      },
      take: limit,
    });
  }
}