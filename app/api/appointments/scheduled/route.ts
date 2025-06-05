// app/api/appointments/scheduled/route.ts
import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getDBPool();
    const result = await pool.request().query(`
      SELECT 
        Id, FullName, Email, PhoneNumber, Service, AppointmentDate, AppointmentTime 
      FROM Appointments 
      WHERE Status = 'Scheduled' 
      ORDER BY AppointmentDate ASC
    `);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('❌ Failed to fetch scheduled appointments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
