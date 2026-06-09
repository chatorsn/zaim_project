import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

const otpStore = new Map();

export async function POST(req: Request) {
  const { loanId, userId, code, ip, userAgent } = await req.json();
  
  const stored = otpStore.get(userId);
  if (!stored || stored.code !== code || stored.expires < Date.now()) {
    return NextResponse.json({ error: 'Неверный или просроченный код' }, { status: 400 });
  }
  
  await query(
    `UPDATE loans SET status = 'active', signed_at = NOW(), signed_ip = $1, signed_user_agent = $2 WHERE id = $3`,
    [ip, userAgent, loanId]
  );
  
  const loan = await query('SELECT * FROM loans WHERE id = $1', [loanId]);
  const l = loan.rows[0];
  const paymentAmount = l.payment_amount;
  const startDate = new Date();
  
  for (let i = 1; i <= l.term; i++) {
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + i);
    await query(
      `INSERT INTO payments (loan_id, due_date, amount, status) VALUES ($1, $2, $3, 'pending')`,
      [loanId, dueDate.toISOString().split('T')[0], paymentAmount]
    );
  }
  
  await query(
    `INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)`,
    [userId, 'Договор подписан', 'Ваш договор успешно подписан. График платежей доступен в личном кабинете.']
  );
  
  otpStore.delete(userId);
  
  return NextResponse.json({ success: true });
}
