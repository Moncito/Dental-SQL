// app/api/get-cancelled-appointments/route.ts
import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getDBPool();
    const result = await pool
      .request()
      .query(`SELECT * FROM CancelledAppointments ORDER BY AppointmentDate DESC`);

    return NextResponse.json(result.recordset || []);
  } catch (err) {
    console.error('[GET_CANCELLED_ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch cancelled appointments' }, { status: 500 });
  }
}
