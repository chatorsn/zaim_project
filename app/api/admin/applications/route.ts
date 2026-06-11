import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'lumen_db',
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT a.*, u.phone, u.name as user_name 
      FROM applications a 
      LEFT JOIN users u ON a.user_id = u.id 
      ORDER BY a.created_at DESC
    `);
    client.release();
    return NextResponse.json({ success: true, applications: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const client = await pool.connect();
    
    await client.query('UPDATE applications SET status = $1 WHERE id = $2', [status, id]);
    
    // Если заявка одобрена, создаём займ
    if (status === 'approved') {
      const app = await client.query('SELECT * FROM applications WHERE id = $1', [id]);
      const application = app.rows[0];
      
      const dailyRate = 0.008;
      const r = dailyRate;
      const n = application.term;
      const P = Number(application.amount);
      const pow = Math.pow(1 + r, n);
      const payment = P * (r * pow) / (pow - 1);
      const total = payment * n;
      
      await client.query(
        `INSERT INTO loans (application_id, user_id, amount, term, daily_rate, payment_amount, total_amount, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending_sign')`,
        [application.id, application.user_id, application.amount, application.term, dailyRate, payment, total]
      );
    }
    
    client.release();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
  }
}
