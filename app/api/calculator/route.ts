import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { amount, term } = await req.json();
  
  const dailyRate = 0.008; // 0.8% в день
  const totalAmount = amount + (amount * dailyRate * term);
  const paymentAmount = totalAmount / term;
  
  return NextResponse.json({
    paymentAmount: Math.round(paymentAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    dailyRate: dailyRate * 100
  });
}
