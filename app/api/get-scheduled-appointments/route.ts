import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getDBPool();
    const result = await pool
      .request()
      .query("SELECT * FROM Appointments WHERE Status = 'Scheduled'");
    return NextResponse.json(result.recordset || []);
  } catch (err) {
    console.error('[GET_SCHEDULED_ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch scheduled' }, { status: 500 });
  }
}
