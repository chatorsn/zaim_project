import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  const { login, password } = await req.json();
  const result = await query('SELECT * FROM admins WHERE login = $1', [login]);
  const admin = result.rows[0];
  if (!admin) {
    return NextResponse.json({ error: 'Неверный логин' }, { status: 401 });
  }
  if (password !== 'admin123' && password !== 'operator123') {
    return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 });
  }
  return NextResponse.json({ success: true, token: 'dummy-token', role: admin.role });
}
