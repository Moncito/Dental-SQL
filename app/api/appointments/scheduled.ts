import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const pool = await getDBPool();
    const result = await pool.request().query(`
      SELECT
        sa.Id,
        sa.FullName,
        sa.AppointmentDate,
        sa.AppointmentTime,
        sa.Service,
        s.phoneNumber
      FROM ScheduledAppointments sa
      LEFT JOIN appointment_summary s
        ON sa.FullName = s.fullName AND sa.AppointmentDate = s.appointmentDate
    `);

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error('❌ Failed to fetch scheduled appointments with phone:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
