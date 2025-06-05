import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      email,
      PhoneNumber,
      service,
      date,
      time,
      notes,
    } = await req.json();

    const pool = await getDBPool();

    await pool.request()
      .input('FullName', name)
      .input('Email', email)
      .input('PhoneNumber', PhoneNumber)
      .input('Service', service)
      .input('Notes', notes || '')
      .input('AppointmentDate', date)
      .input('AppointmentTime', time)
      .input('Status', 'Pending') // ✅ default status
      .input('CreatedAt', new Date())
      .query(`
        INSERT INTO Appointments
        (FullName, Email, PhoneNumber, Service, Notes, AppointmentDate, AppointmentTime, Status, CreatedAt)
        VALUES
        (@FullName, @Email, @PhoneNumber, @Service, @Notes, @AppointmentDate, @AppointmentTime, @Status, @CreatedAt)
      `);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Error saving appointment:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
