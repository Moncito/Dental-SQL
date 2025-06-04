import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const pool = await getDBPool();
    await pool.request().input('id', id).query('DELETE FROM Appointments WHERE Id = @id AND Status = \'Cancelled\'');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to delete cancelled appointment:', err);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
