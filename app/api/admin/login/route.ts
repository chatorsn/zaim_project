import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { login, password } = await req.json();
    
    // Временная заглушка без БД
    if (login === 'admin' && password === 'admin123') {
      return NextResponse.json({ 
        success: true, 
        token: 'dummy-token', 
        role: 'admin' 
      });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Неверный логин или пароль' 
    }, { status: 401 });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}
