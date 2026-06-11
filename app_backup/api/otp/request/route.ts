import { NextResponse } from 'next/server';

const otpStore = new Map();

export async function POST(req: Request) {
  const { loanId, userId } = await req.json();
  
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(userId, { code, expires: Date.now() + 5 * 60 * 1000 });
  
  console.log(`[OTP] Для займа ${loanId}, пользователь ${userId} -> код ${code}`);
  
  return NextResponse.json({ success: true });
}
