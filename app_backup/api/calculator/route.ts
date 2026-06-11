import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, term } = await req.json();
    const dailyRate = 0.008;
    const r = dailyRate;
    const n = term;
    const P = amount;
    const pow = Math.pow(1 + r, n);
    const payment = P * (r * pow) / (pow - 1);
    const total = payment * n;
    
    return NextResponse.json({
      paymentAmount: Math.round(payment * 100) / 100,
      totalAmount: Math.round(total * 100) / 100,
      dailyRate: dailyRate * 100
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
