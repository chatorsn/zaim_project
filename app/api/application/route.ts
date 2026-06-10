import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, term, type, fullName, phone, email, companyName } = body;
    
    console.log('Received application:', body);
    
    // Создаём или находим пользователя
    let user = await query('SELECT * FROM users WHERE phone = $1', [phone]);
    if (user.rows.length === 0) {
      user = await query(
        'INSERT INTO users (phone, name, email) VALUES ($1, $2, $3) RETURNING *',
        [phone, fullName, email || null]
      );
    }
    const userId = user.rows[0].id;
    
    // Создаём заявку
    const result = await query(
      `INSERT INTO applications (user_id, amount, term, type, company_name, status) 
       VALUES ($1, $2, $3, $4, $5, 'new') RETURNING *`,
      [userId, amount, term, type, companyName || null]
    );
    
    return NextResponse.json({ success: true, application: result.rows[0] });
  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
