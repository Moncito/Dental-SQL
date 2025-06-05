import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getDBPool();
    const result = await pool.request().query(`
      SELECT
        ca.Id,
        ca.FullName,
        ca.AppointmentDate,
        ca.AppointmentTime,
        ca.Service,
        s.phoneNumber
      FROM CancelledAppointments ca
      LEFT JOIN appointment_summary s
        ON ca.FullName = s.fullName
        AND ca.AppointmentDate = s.appointmentDate
    `);

    return NextResponse.json(result.recordset);
  } catch (error) {
    console.error('❌ Failed to fetch cancelled appointments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
