import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { loanId, otp } = body;

    if (!loanId || !otp) {
      return NextResponse.json(
        { error: 'loanId and otp are required' },
        { status: 400 }
      );
    }

    if (otp !== '1234') {
      return NextResponse.json(
        { error: 'Invalid OTP code' },
        { status: 400 }
      );
    }

    const loanResult = await pool.query(
      'SELECT * FROM loans WHERE id = $1',
      [loanId]
    );

    if (loanResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'Loan not found' },
        { status: 404 }
      );
    }

    const loan = loanResult.rows[0];

    if (loan.status !== 'pending_sign') {
      return NextResponse.json(
        { error: 'Loan is not pending signature' },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get('user-agent') || 'unknown';
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    await pool.query(
      `UPDATE loans 
       SET status = 'active', 
           signed_at = NOW(),
           signed_ip = $1,
           signed_user_agent = $2
       WHERE id = $3`,
      [ip, userAgent, loanId]
    );

    const totalAmount = Number(loan.total_amount);
    const term = loan.term;
    const paymentAmount = Number(loan.payment_amount);
    const startDate = new Date();

    const paymentPromises = [];
    for (let i = 1; i <= term; i++) {
      const dueDate = new Date(startDate);
      dueDate.setDate(dueDate.getDate() + i);
      
      paymentPromises.push(
        pool.query(
          `INSERT INTO payments (loan_id, due_date, amount, status, number) 
           VALUES ($1, $2, $3, 'pending', $4)`,
          [loanId, dueDate, paymentAmount, i]
        )
      );
    }
    await Promise.all(paymentPromises);

    return NextResponse.json({
      success: true,
      loanId: loanId,
      status: 'active',
      message: 'Loan signed successfully',
      paymentSchedule: {
        total: term,
        amount: paymentAmount,
        totalAmount: totalAmount
      }
    });

  } catch (error) {
    console.error('Error signing loan:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
