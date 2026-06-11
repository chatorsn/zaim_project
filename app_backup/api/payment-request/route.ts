import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  const { loanId, userId, amount, reference } = await req.json();
  
  const result = await query(
    `INSERT INTO payment_requests (loan_id, user_id, amount, reference, status)
     VALUES ($1, $2, $3, $4, 'pending') RETURNING *`,
    [loanId, userId, amount, reference]
  );
  
  await query(
    `INSERT INTO notifications (user_id, title, message)
     VALUES ($1, $2, $3)`,
    [userId, 'Заявка на оплату', `Ваша заявка на оплату ${amount} € принята и ожидает проверки`]
  );
  
  return NextResponse.json({ success: true, request: result.rows[0] });
}
