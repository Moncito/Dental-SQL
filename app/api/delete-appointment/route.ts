import { NextRequest, NextResponse } from 'next/server';
import { getDBPool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing appointment ID' }, { status: 400 });
    }

    const pool = await getDBPool();
    await pool.request().input('id', id).query(`
      DELETE FROM Appointments WHERE Id = @id
    `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[SQL_DELETE_ERROR]', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}
