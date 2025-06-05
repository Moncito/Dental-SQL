// app/api/move-to-cancelled/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { Id, CancelReason = '' } = await req.json();

    if (!Id) {
      return NextResponse.json({ error: 'Missing appointment ID' }, { status: 400 });
    }

    const pool = await getDBPool();

    // Update appointment status and reason
    await pool.request()
      .input('Id', Id)
      .input('CancelReason', CancelReason)
      .query(`
        UPDATE Appointments 
        SET Status = 'Cancelled', CancelReason = @CancelReason 
        WHERE Id = @Id
      `);

    // Fetch updated appointment (including email)
    const result = await pool.request()
      .input('Id', Id)
      .query(`SELECT FullName, Email, CancelReason FROM Appointments WHERE Id = @Id`);

    const appt = result.recordset[0];

    return NextResponse.json({
      success: true,
      appointment: appt,
    });
  } catch (err) {
    console.error('❌ Move to cancelled failed:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
