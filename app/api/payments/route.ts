import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const loanId = searchParams.get('loanId');
  
  if (!loanId) {
    return NextResponse.json({ success: false, error: 'Loan ID required' }, { status: 400 });
  }
  
  try {
    const result = await query(
      'SELECT * FROM payments WHERE loan_id = $1 ORDER BY due_date ASC',
      [loanId]
    );
    return NextResponse.json({ success: true, payments: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
  }
}
