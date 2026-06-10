import { Pool } from 'pg';

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'zaim_db',
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
