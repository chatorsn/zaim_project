import { NextResponse } from 'next/server';

// Глобальное хранилище (доступно из любого места)
declare global {
  var otpStore: Map<string, { code: string; expires: number }>;
}

if (!global.otpStore) {
  global.otpStore = new Map();
}

export async function POST(req: Request) {
  try {
    const { loanId, userId } = await req.json();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const key = `${userId}-${loanId}`;
    global.otpStore.set(key, { code, expires: Date.now() + 5 * 60 * 1000 });
    console.log(`[OTP] Ключ: ${key}, Код: ${code}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
