// app/api/update-appointment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, date, time, notes, status } = body;

    if (!id || !date || !time || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const pool = await getDBPool();

    await pool.request()
      .input('id', id)
      .input('date', date)
      .input('time', time)
      .input('notes', notes || '')
      .input('status', status)
      .query(`
        UPDATE Appointments
        SET AppointmentDate = @date,
            AppointmentTime = @time,
            Notes = @notes,
            Status = @status
        WHERE Id = @id
      `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[UPDATE_APPOINTMENT_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}
