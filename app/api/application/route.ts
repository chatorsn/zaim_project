import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, term, type, fullName, phone, email, companyName, userId } = body;
    
    // Если userId передан, используем его, иначе создаём нового пользователя
    let actualUserId = userId;
    
    if (!actualUserId && phone) {
      let user = await query('SELECT * FROM users WHERE phone = $1', [phone]);
      if (user.rows.length === 0) {
        user = await query(
          'INSERT INTO users (phone, name, email) VALUES ($1, $2, $3) RETURNING *',
          [phone, fullName || phone, email || null]
        );
      }
      actualUserId = user.rows[0].id;
    }
    
    const result = await query(
      `INSERT INTO applications (user_id, amount, term, type, company_name, status) 
       VALUES ($1, $2, $3, $4, $5, 'new') RETURNING *`,
      [actualUserId, amount, term, type, companyName || null]
    );
    
    return NextResponse.json({ success: true, application: result.rows[0] });
  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json({ success: false, error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ applications: [] });
    }
    
    const result = await query(
      'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    
    return NextResponse.json({ applications: result.rows });
  } catch (error) {
    console.error('GET applications error:', error);
    return NextResponse.json({ applications: [] });
  }
}
