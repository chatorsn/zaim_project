import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET - получить список всех админов
export async function GET(req: NextRequest) {
  try {
    const authToken = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await pool.query(
      'SELECT id, login, role, created_at FROM admins ORDER BY created_at DESC'
    );
    
    return NextResponse.json({ admins: result.rows });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - создать нового админа
export async function POST(req: NextRequest) {
  try {
    const authToken = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { login, password, role } = body;

    if (!login || !password) {
      return NextResponse.json({ error: 'Login and password required' }, { status: 400 });
    }

    const existing = await pool.query('SELECT id FROM admins WHERE login = $1', [login]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Admin with this login already exists' }, { status: 409 });
    }

    const result = await pool.query(
      'INSERT INTO admins (login, password, role, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, login, role, created_at',
      [login, password, role || 'operator']
    );

    return NextResponse.json({ admin: result.rows[0] });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - удалить админа
export async function DELETE(req: NextRequest) {
  try {
    const authToken = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Admin ID required' }, { status: 400 });
    }

    await pool.query('DELETE FROM admins WHERE id = $1', [id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
