import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma || 
  (process.env.DATABASE_URL ? new PrismaClient() : (undefined as unknown as PrismaClient));

if (process.env.NODE_ENV !== 'production' && prisma) globalForPrisma.prisma = prisma;
