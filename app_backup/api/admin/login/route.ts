import { NextResponse } from 'next/server';

// Временное хранилище для демо
const admins = [
  { login: 'admin', password: 'admin123', role: 'admin' },
  { login: 'operator', password: 'operator123', role: 'operator' }
];

export async function POST(req: Request) {
  try {
    const { login, password } = await req.json();
    
    const admin = admins.find(a => a.login === login);
    
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Неверный логин' }, { status: 401 });
    }
    
    if (admin.password !== password) {
      return NextResponse.json({ success: false, error: 'Неверный пароль' }, { status: 401 });
    }
    
    return NextResponse.json({ 
      success: true, 
      token: 'dummy-token', 
      role: admin.role 
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
  }
}
