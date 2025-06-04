// app/api/move-to-cancelled/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const {
      Id,
      FullName,
      AppointmentDate,
      AppointmentTime,
      Service,
    } = await req.json();

    if (!Id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const pool = await getDBPool();

    // Insert into CancelledAppointments
    await pool.request()
      .input('Id', Id)
      .input('FullName', FullName)
      .input('AppointmentDate', AppointmentDate)
      .input('AppointmentTime', AppointmentTime)
      .input('Service', Service)
      .query(`
        INSERT INTO CancelledAppointments (Id, FullName, AppointmentDate, AppointmentTime, Service)
        VALUES (@Id, @FullName, @AppointmentDate, @AppointmentTime, @Service)
      `);

    // Delete from original Appointments
    await pool.request().input('Id', Id).query(`
      DELETE FROM Appointments WHERE Id = @Id
    `);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Move to cancelled failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
