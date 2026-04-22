import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 0; // Dynamic route

export async function GET() {
  try {
    if (!process.env.DATABASE_URL || !prisma) {
      return NextResponse.json({ history: [] }); 
    }
    const history = await prisma.conversionHistory.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    return NextResponse.json({ history });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
