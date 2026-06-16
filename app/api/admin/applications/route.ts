import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// (если у тебя есть auth — сюда можно добавить проверку токена)

export async function GET(req: Request) {
  try {
    const result = await query(`
      SELECT a.*, u.phone, u.name as user_name 
      FROM applications a 
      LEFT JOIN users u ON a.user_id = u.id 
      ORDER BY a.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      applications: result.rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Database error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      );
    }

    const result = await query(
      `UPDATE applications SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (!result.rows.length) {
      return NextResponse.json(
        { success: false, error: 'Application not found' },
        { status: 404 }
      );
    }

    const app = result.rows[0];

    // если одобрено — создаём займ
    if (status === 'approved') {
      const dailyRate = 0.008;
      const r = dailyRate;
      const n = app.term;
      const P = Number(app.amount);

      const pow = Math.pow(1 + r, n);
      const payment = P * (r * pow) / (pow - 1);
      const total = payment * n;

      await query(
        `INSERT INTO loans 
        (application_id, user_id, amount, term, daily_rate, payment_amount, total_amount, status)
        VALUES ($1,$2,$3,$4,$5,$6,$7,'pending_sign')`,
        [app.id, app.user_id, app.amount, app.term, dailyRate, payment, total]
      );

      await query(
        `INSERT INTO notifications (user_id, title, message)
         VALUES ($1,$2,$3)`,
        [
          app.user_id,
          'Заявка одобрена',
          `Ваша заявка на ${app.amount} € одобрена.`,
        ]
      );
    }

    return NextResponse.json({
      success: true,
      application: app,
    });
  } catch (error) {
    console.error('PUT error:', error);

    return NextResponse.json(
      { success: false, error: 'Update failed' },
      { status: 500 }
    );
  }
}