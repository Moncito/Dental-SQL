// app/api/delete-completed-appointment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { Id } = await req.json();

    if (!Id) {
      return NextResponse.json({ error: 'Missing appointment ID' }, { status: 400 });
    }

    const pool = await getDBPool();
    await pool.request()
      .input('Id', Id)
      .query(`DELETE FROM CompletedAppointments WHERE Id = @Id`);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to delete completed appointment:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
