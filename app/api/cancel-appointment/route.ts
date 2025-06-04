import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { id, reason } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const pool = await getDBPool();
    await pool
      .request()
      .input('id', id)
      .input('status', 'Cancelled')
      .input('notes', reason || 'Cancelled')
      .query('UPDATE Appointments SET Status = @status, Notes = @notes WHERE Id = @id');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to cancel appointment:', err);
    return NextResponse.json({ error: 'Failed to cancel' }, { status: 500 });
  }
}
