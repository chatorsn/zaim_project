import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM payment_requests ORDER BY created_at DESC'
    );
    return NextResponse.json({ success: true, requests: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    
    const result = await query(
      'UPDATE payment_requests SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (status === 'approved') {
      const reqData = result.rows[0];
      await query(
        `INSERT INTO notifications (user_id, title, message)
         VALUES ($1, $2, $3)`,
        [reqData.user_id, 'Платёж подтверждён', `Ваш платёж ${reqData.amount} € подтверждён`]
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
