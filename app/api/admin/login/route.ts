import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { login, password } = await req.json();
    
    const result = await query('SELECT * FROM admins WHERE login = $1', [login]);
    const admin = result.rows[0];
    
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Неверный логин' }, { status: 401 });
    }
    
    if (password !== admin.password) {
      return NextResponse.json({ success: false, error: 'Неверный пароль' }, { status: 401 });
    }
    
    // Возвращаем роль
    return NextResponse.json({ 
      success: true, 
      token: 'dummy-token', 
      role: admin.role 
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
