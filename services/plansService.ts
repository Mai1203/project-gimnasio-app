import { prisma } from '@/lib/prisma';
import { Plan } from '@prisma/client';

export interface CreatePlanData {
  name: string;
  priceCents: number;
  durationDays: number;
  description?: string;
  features?: string[];
}

export interface UpdatePlanData extends Partial<CreatePlanData> {
  id: string;
}

/**
 * Plans service layer for handling plan-related operations
 * Manages gym membership plans and subscriptions
 */
export class PlansService {
  
  /**
   * Get all plans
   */
  static async getPlans(activeOnly: boolean = false) {
    return prisma.plan.findMany({
      where: activeOnly ? { active: true } : undefined,
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      },
      orderBy: {
        priceCents: 'asc',
      },
    });
  }

  /**
   * Get plan by ID
   */
  static async getPlanById(id: string) {
    return prisma.plan.findUnique({
      where: { id },
      include: {
        users: {
          where: { active: true },
          select: {
            id: true,
            name: true,
            email: true,
            membershipStartDate: true,
            membershipEndDate: true,
          },
        },
        _count: {
          select: {
            users: true,
          },
        },
      },
    });
  }

  /**
   * Create a new plan
   */
  static async createPlan(data: CreatePlanData): Promise<Plan> {
    return prisma.plan.create({
      data,
    });
  }

  /**
   * Update an existing plan
   */
  static async updatePlan(data: UpdatePlanData): Promise<Plan> {
    const { id, ...updateData } = data;
    
    return prisma.plan.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete a plan (soft delete by setting active to false)
   */
  static async deletePlan(id: string): Promise<Plan> {
    return prisma.plan.update({
      where: { id },
      data: { active: false },
    });
  }

  /**
   * Get plan statistics
   */
  static async getPlanStats() {
    const plans = await prisma.plan.findMany({
      where: { active: true },
      include: {
        _count: {
          select: {
            users: {
              where: {
                active: true,
                membershipEndDate: { gt: new Date() },
              },
            },
          },
        },
      },
    });

    const totalRevenue = await prisma.transaction.aggregate({
      where: {
        type: 'PAYMENT',
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
      _sum: {
        amountCents: true,
      },
    });

    return {
      plans: plans.map(plan => ({
        ...plan,
        activeSubscriptions: plan._count.users,
        monthlyRevenue: (plan._count.users * plan.priceCents) / 100,
      })),
      totalMonthlyRevenue: (totalRevenue._sum.amountCents || 0) / 100,
    };
  }

  /**
   * Get most popular plan
   */
  static async getMostPopularPlan() {
    const planWithUserCount = await prisma.plan.findMany({
      where: { active: true },
      include: {
        _count: {
          select: {
            users: {
              where: {
                active: true,
                membershipEndDate: { gt: new Date() },
              },
            },
          },
        },
      },
      orderBy: {
        users: {
          _count: 'desc',
        },
      },
      take: 1,
    });

    return planWithUserCount[0];
  }
}