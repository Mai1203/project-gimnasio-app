import { prisma } from '@/lib/prisma';
import { TransactionType } from '@prisma/client';

/**
 * Cashbox service for handling financial operations and reports
 * Manages daily cash flow, transactions, and financial KPIs
 */
export class CashboxService {
  
  /**
   * Get today's financial summary
   */
  static async getTodaysSummary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      todaysRevenue,
      todaysTransactions,
      todaysCheckIns,
      todaysNewSubscriptions,
    ] = await Promise.all([
      // Today's revenue
      prisma.transaction.aggregate({
        where: {
          type: TransactionType.PAYMENT,
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
        _sum: {
          amountCents: true,
        },
        _count: true,
      }),

      // All today's transactions
      prisma.transaction.findMany({
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),

      // Today's check-ins
      prisma.checkIn.count({
        where: {
          at: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),

      // Today's new subscriptions
      prisma.user.count({
        where: {
          membershipStartDate: {
            gte: today,
            lt: tomorrow,
          },
          planId: { not: null },
        },
      }),
    ]);

    return {
      revenue: (todaysRevenue._sum.amountCents || 0) / 100,
      revenueTransactionCount: todaysRevenue._count,
      checkIns: todaysCheckIns,
      newSubscriptions: todaysNewSubscriptions,
      transactions: todaysTransactions.map(t => ({
        ...t,
        amount: t.amountCents / 100,
      })),
    };
  }

  /**
   * Get monthly financial summary
   */
  static async getMonthlySummary(year?: number, month?: number) {
    const targetDate = new Date(year || new Date().getFullYear(), month || new Date().getMonth());
    const startOfMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
    const startOfNextMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 1);

    const [
      monthlyRevenue,
      monthlyExpenses,
      monthlyCheckIns,
      monthlyNewUsers,
      dailyRevenue,
    ] = await Promise.all([
      // Monthly revenue
      prisma.transaction.aggregate({
        where: {
          type: TransactionType.PAYMENT,
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
          },
        },
        _sum: {
          amountCents: true,
        },
      }),

      // Monthly refunds/expenses
      prisma.transaction.aggregate({
        where: {
          type: { in: [TransactionType.REFUND, TransactionType.MANUAL] },
          amountCents: { lt: 0 },
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
          },
        },
        _sum: {
          amountCents: true,
        },
      }),

      // Monthly check-ins
      prisma.checkIn.count({
        where: {
          at: {
            gte: startOfMonth,
            lt: startOfNextMonth,
          },
        },
      }),

      // Monthly new users
      prisma.user.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
          },
        },
      }),

      // Daily revenue breakdown for the month
      prisma.$queryRaw`
        SELECT 
          DATE(created_at) as date,
          SUM(amount_cents) as total_cents,
          COUNT(*) as transaction_count
        FROM transactions 
        WHERE type = 'PAYMENT' 
          AND created_at >= ${startOfMonth}
          AND created_at < ${startOfNextMonth}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `,
    ]);

    return {
      revenue: (monthlyRevenue._sum.amountCents || 0) / 100,
      expenses: Math.abs((monthlyExpenses._sum.amountCents || 0) / 100),
      netIncome: ((monthlyRevenue._sum.amountCents || 0) + (monthlyExpenses._sum.amountCents || 0)) / 100,
      checkIns: monthlyCheckIns,
      newUsers: monthlyNewUsers,
      dailyBreakdown: dailyRevenue,
    };
  }

  /**
   * Get total accumulated revenue
   */
  static async getTotalRevenue() {
    const totalRevenue = await prisma.transaction.aggregate({
      where: {
        type: TransactionType.PAYMENT,
      },
      _sum: {
        amountCents: true,
      },
    });

    return (totalRevenue._sum.amountCents || 0) / 100;
  }

  /**
   * Generate daily cash report
   */
  static async generateDailyReport(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const [
      transactions,
      checkIns,
      newSubscriptions,
      expiredMemberships,
    ] = await Promise.all([
      prisma.transaction.findMany({
        where: {
          createdAt: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),

      prisma.checkIn.findMany({
        where: {
          at: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          at: 'desc',
        },
      }),

      prisma.user.findMany({
        where: {
          membershipStartDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
          planId: { not: null },
        },
        include: {
          plan: true,
        },
      }),

      prisma.user.findMany({
        where: {
          membershipEndDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
          active: true,
        },
        include: {
          plan: true,
        },
      }),
    ]);

    // Calculate totals
    const totalRevenue = transactions
      .filter(t => t.type === TransactionType.PAYMENT)
      .reduce((sum, t) => sum + t.amountCents, 0) / 100;

    const totalRefunds = Math.abs(transactions
      .filter(t => t.type === TransactionType.REFUND)
      .reduce((sum, t) => sum + t.amountCents, 0)) / 100;

    return {
      date,
      summary: {
        totalRevenue,
        totalRefunds,
        netRevenue: totalRevenue - totalRefunds,
        totalCheckIns: checkIns.length,
        newSubscriptions: newSubscriptions.length,
        expiredMemberships: expiredMemberships.length,
      },
      details: {
        transactions: transactions.map(t => ({
          ...t,
          amount: t.amountCents / 100,
        })),
        checkIns,
        newSubscriptions,
        expiredMemberships,
      },
    };
  }

  /**
   * Get revenue trends (last 7 days vs previous 7 days)
   */
  static async getRevenueTrends() {
    const today = new Date();
    const last7Days = new Date(today);
    last7Days.setDate(today.getDate() - 7);
    const last14Days = new Date(today);
    last14Days.setDate(today.getDate() - 14);

    const [currentPeriod, previousPeriod] = await Promise.all([
      prisma.transaction.aggregate({
        where: {
          type: TransactionType.PAYMENT,
          createdAt: {
            gte: last7Days,
            lt: today,
          },
        },
        _sum: {
          amountCents: true,
        },
      }),

      prisma.transaction.aggregate({
        where: {
          type: TransactionType.PAYMENT,
          createdAt: {
            gte: last14Days,
            lt: last7Days,
          },
        },
        _sum: {
          amountCents: true,
        },
      }),
    ]);

    const currentRevenue = (currentPeriod._sum.amountCents || 0) / 100;
    const previousRevenue = (previousPeriod._sum.amountCents || 0) / 100;
    
    const percentageChange = previousRevenue > 0 
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
      : 0;

    return {
      current: currentRevenue,
      previous: previousRevenue,
      change: percentageChange,
      isPositive: percentageChange >= 0,
    };
  }
}