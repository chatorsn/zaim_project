import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(`
      SELECT a.*, u.phone, u.name as user_name 
      FROM applications a 
      LEFT JOIN users u ON a.user_id = u.id 
      ORDER BY a.created_at DESC
    `);
    return NextResponse.json({ success: true, applications: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    
    const result = await query(
      'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (status === 'approved' && result.rows[0]) {
      const app = result.rows[0];
      const dailyRate = 0.008;
      const r = dailyRate;
      const n = app.term;
      const P = Number(app.amount);
      const pow = Math.pow(1 + r, n);
      const payment = P * (r * pow) / (pow - 1);
      const total = payment * n;
      
      await query(
        `INSERT INTO loans (application_id, user_id, amount, term, daily_rate, payment_amount, total_amount, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending_sign')`,
        [app.id, app.user_id, app.amount, app.term, dailyRate, payment, total]
      );
      
      await query(
        `INSERT INTO notifications (user_id, title, message)
         VALUES ($1, $2, $3)`,
        [app.user_id, 'Заявка одобрена', `Ваша заявка на сумму ${app.amount} € одобрена. Подпишите договор в личном кабинете.`]
      );
    }
    
    return NextResponse.json({ success: true, application: result.rows[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
