import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

declare global {
  var otpStore: Map<string, { code: string; expires: number }>;
}

export async function POST(req: Request) {
  try {
    const { loanId, userId, code, ip, userAgent } = await req.json();
    const key = `${userId}-${loanId}`;
    const stored = global.otpStore?.get(key);
    
    console.log('Проверка OTP:', { key, receivedCode: code, storedCode: stored?.code });
    
    if (!stored) {
      return NextResponse.json({ error: 'Код не запрошен. Сначала получите код.' }, { status: 400 });
    }
    
    if (stored.code !== code) {
      return NextResponse.json({ error: `Неверный код. Ожидался: ${stored.code}` }, { status: 400 });
    }
    
    if (stored.expires < Date.now()) {
      return NextResponse.json({ error: 'Код просрочен' }, { status: 400 });
    }
    
    // Обновляем статус займа
    await query(
      `UPDATE loans SET status = 'active', signed_at = NOW(), signed_ip = $1, signed_user_agent = $2 WHERE id = $3`,
      [ip, userAgent, loanId]
    );
    
    // Получаем информацию о займе
    const loan = await query('SELECT * FROM loans WHERE id = $1', [loanId]);
    const l = loan.rows[0];
    const paymentAmount = l.payment_amount;
    const startDate = new Date();
    
    // Создаём график платежей
    for (let i = 1; i <= l.term; i++) {
      const dueDate = new Date(startDate);
      dueDate.setDate(dueDate.getDate() + i);
      await query(
        `INSERT INTO payments (loan_id, due_date, amount, status) VALUES ($1, $2, $3, 'pending')`,
        [loanId, dueDate.toISOString().split('T')[0], paymentAmount]
      );
    }
    
    // Добавляем уведомление
    await query(
      `INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)`,
      [userId, 'Договор подписан', 'Ваш договор успешно подписан. График платежей доступен в личном кабинете.']
    );
    
    global.otpStore.delete(key);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
