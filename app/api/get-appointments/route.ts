// app/api/get-appointments/route.ts
import { NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function GET() {
  try {
    const db = await getDBPool();

    const result = await db.query(`
      SELECT Id, FullName, Email, PhoneNumber, Service, AppointmentDate, AppointmentTime, Notes
      FROM appointments
      ORDER BY AppointmentDate DESC, AppointmentTime DESC
    `);

    console.log('Result:', result);

    return NextResponse.json(result.recordset || []);
  } catch (error) {
    console.error('❌ Error fetching appointments:', error);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}