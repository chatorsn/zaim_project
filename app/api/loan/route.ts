import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ loans: [] });
    }
    
    const result = await query(
      'SELECT * FROM loans WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    
    return NextResponse.json({ loans: result.rows });
  } catch (error) {
    console.error('GET loans error:', error);
    return NextResponse.json({ loans: [] });
  }
}
