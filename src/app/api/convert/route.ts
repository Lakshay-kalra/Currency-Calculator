import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const rateLimitMap = new Map<string, { count: number, timestamp: number }>();

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'anon';
  const now = Date.now();
  const rateLimit = rateLimitMap.get(ip);
  
  if (rateLimit && now - rateLimit.timestamp < 60000) { 
    if (rateLimit.count > 30) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
    rateLimit.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const amountStr = searchParams.get('amount');

  if (!from || !to || !amountStr) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const amount = parseFloat(amountStr);

  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`, {
      next: { revalidate: 3600 },
    });
    
    if (!res.ok) throw new Error('API failure');
    
    const data = await res.json();
    const rate = data.rates[to];
    
    if (!rate) {
      return NextResponse.json({ error: 'Invalid currency code' }, { status: 400 });
    }

    const result = amount * rate;

    try {
      if (process.env.DATABASE_URL && prisma) {
        await prisma.conversionHistory.create({
          data: {
            from,
            to,
            amount,
            result,
          }
        });
      }
    } catch (dbErr) {
      console.error('DB Error:', dbErr);
    }

    return NextResponse.json({
      from,
      to,
      amount,
      result,
      rate,
      timestamp: data.time_last_update_unix
    });
  } catch {
    return NextResponse.json({ error: 'Failed to convert' }, { status: 500 });
  }
}
