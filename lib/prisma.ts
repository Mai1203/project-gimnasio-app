import { PrismaClient } from '@prisma/client';

// Global variable to store the Prisma Client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a new Prisma Client instance or use the existing one
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // Enable query logging in development
  });

// In development, store the Prisma Client in the global object
// to prevent multiple instances during hot reloading
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;