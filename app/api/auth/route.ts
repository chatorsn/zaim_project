import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// Глобальное хранилище (простое решение для демо)
declare global {
  var otpStore: Map<string, { code: string; expires: number }>;
}

if (!global.otpStore) {
  global.otpStore = new Map();
}

const otpStore = global.otpStore;

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(phone, { code, expires: Date.now() + 5 * 60 * 1000 });
    console.log(`[OTP] ${phone} -> ${code}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { phone, code } = await req.json();
    const stored = otpStore.get(phone);
    
    console.log('Проверка:', { phone, code, stored });
    
    if (!stored) {
      return NextResponse.json({ error: 'Код не запрошен' }, { status: 400 });
    }
    
    if (stored.code !== code) {
      return NextResponse.json({ error: `Неверный код. Ожидался ${stored.code}, получен ${code}` }, { status: 400 });
    }
    
    if (stored.expires < Date.now()) {
      return NextResponse.json({ error: 'Код просрочен' }, { status: 400 });
    }
    
    let user = await query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (user.rows.length === 0) {
      user = await query('INSERT INTO users (phone, name) VALUES ($1, $2) RETURNING *', [phone, phone]);
    }
    
    otpStore.delete(phone);
    return NextResponse.json({ success: true, user: user.rows[0] });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
