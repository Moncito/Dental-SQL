// lib/db.ts
import sql from 'mssql';

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER as string,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// ❗ Export a function that resolves the connection
let _pool: sql.ConnectionPool | null = null;

export async function getDBPool(): Promise<sql.ConnectionPool> {
  if (_pool) return _pool;

  try {
    _pool = await sql.connect(config);
    console.log('✅ Connected to SQL Server');
    return _pool;
  } catch (err) {
    console.error('❌ SQL Server Connection Error:', err);
    throw err;
  }
}
