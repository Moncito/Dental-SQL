// app/api/move-to-complete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { Id } = await req.json();

    if (!Id) {
      return NextResponse.json({ error: 'Missing appointment ID' }, { status: 400 });
    }

    const pool = await getDBPool();

    // Step 1: Get the original appointment
    const getResult = await pool.request()
      .input('Id', Id)
      .query(`SELECT * FROM Appointments WHERE Id = @Id`);

    const appointment = getResult.recordset[0];

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Step 2: Insert into CompletedAppointments
    await pool.request()
      .input('Id', appointment.Id)
      .input('FullName', appointment.FullName)
      .input('Email', appointment.Email)
      .input('PhoneNumber', appointment.PhoneNumber)
      .input('Service', appointment.Service)
      .input('Notes', appointment.Notes ?? '')
      .input('AppointmentDate', appointment.AppointmentDate)
      .input('AppointmentTime', appointment.AppointmentTime)
      .input('Status', appointment.Status)
      .input('CancelReason', appointment.CancelReason ?? '')
      .query(`
        INSERT INTO CompletedAppointments (
          Id, FullName, Email, PhoneNumber, Service, Notes,
          AppointmentDate, AppointmentTime, Status, CancelReason
        ) VALUES (
          @Id, @FullName, @Email, @PhoneNumber, @Service, @Notes,
          @AppointmentDate, @AppointmentTime, @Status, @CancelReason
        )
      `);

    // Step 3: Delete from Appointments
    await pool.request()
      .input('Id', Id)
      .query(`DELETE FROM Appointments WHERE Id = @Id`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Move to complete failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
