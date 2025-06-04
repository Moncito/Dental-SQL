// app/api/save-appointment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      name,
      email,
      PhoneNumber, // ✅ match casing with your form/body
      service,
      date,
      time,
      notes,
    } = data;

    const db = await getDBPool();

    await db
      .request()
      .input('FullName', name)
      .input('Email', email)
      .input('PhoneNumber', PhoneNumber) // ✅ Match with SQL column
      .input('Service', service)
      .input('AppointmentDate', date)
      .input('AppointmentTime', time)
      .input('Notes', notes || '')
      .query(`
        INSERT INTO appointments (
          FullName, Email, PhoneNumber, Service, AppointmentDate, AppointmentTime, Notes
        )
        VALUES (
          @FullName, @Email, @PhoneNumber, @Service, @AppointmentDate, @AppointmentTime, @Notes
        )
      `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error saving appointment:', error);
    return NextResponse.json({ error: 'Failed to save appointment' }, { status: 500 });
  }
}