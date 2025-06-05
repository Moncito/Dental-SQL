// app/api/move-to-scheduled/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { Id } = await req.json();

    const pool = await getDBPool();

    // Update appointment status
    await pool.request()
      .input('Id', Id)
      .query(`UPDATE Appointments SET Status = 'Scheduled' WHERE Id = @Id`);

    // Fetch updated appointment (including email)
    const result = await pool.request()
      .input('Id', Id)
      .query(`SELECT FullName, Email, AppointmentDate, AppointmentTime FROM Appointments WHERE Id = @Id`);

    const appt = result.recordset[0];

    return NextResponse.json({
      success: true,
      appointment: appt,
    });
  } catch (err) {
    console.error('❌ Move to scheduled failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
