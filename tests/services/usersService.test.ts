import { UsersService } from '@/services/usersService';

// Mock Prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  },
}));

describe('UsersService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return paginated users with correct structure', async () => {
      const mockUsers = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          plan: { name: 'Basic Plan' },
          _count: { checkIns: 5, transactions: 2 },
        },
      ];

      const { prisma } = require('@/lib/prisma');
      prisma.user.findMany.mockResolvedValue(mockUsers);
      prisma.user.count.mockResolvedValue(1);

      const result = await UsersService.getUsers(1, 10);

      expect(result).toEqual({
        users: mockUsers,
        total: 1,
        pages: 1,
        currentPage: 1,
      });

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
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
      });
    });
  });

  describe('createUser', () => {
    it('should create user with membership dates when plan is provided', async () => {
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        planId: 'plan-123',
      };

      const mockCreatedUser = {
        id: '1',
        ...userData,
        membershipStartDate: new Date(),
        membershipEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };

      const { prisma } = require('@/lib/prisma');
      prisma.user.create.mockResolvedValue(mockCreatedUser);

      const result = await UsersService.createUser(userData);

      expect(result).toEqual(mockCreatedUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          ...userData,
          membershipStartDate: expect.any(Date),
          membershipEndDate: expect.any(Date),
        }),
        include: {
          plan: true,
        },
      });
    });
  });
});