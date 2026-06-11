import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await query('UPDATE notifications SET is_read = true WHERE id = $1', [id]);
  return NextResponse.json({ success: true });
}
