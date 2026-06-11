import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'lumen_db',
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
