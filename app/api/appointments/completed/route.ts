// app/api/appointments/completed/route.ts
import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getDBPool();
    const result = await pool.request().query(`
      SELECT * FROM CompletedAppointments ORDER BY AppointmentDate ASC
    `);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('❌ Failed to fetch completed appointments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
