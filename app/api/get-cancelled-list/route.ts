import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getDBPool();
    const result = await pool
      .request()
      .query(`SELECT * FROM CancelledAppointments`);

    return NextResponse.json(result.recordset || []);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch cancelled list' }, { status: 500 });
  }
}
