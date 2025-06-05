// app/api/get-appointments/route.ts
import {  NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getDBPool();
    const result = await pool.request().query(`
      SELECT * FROM Appointments WHERE Status = 'Pending'
    `);

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error('❌ Failed to fetch appointments:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
