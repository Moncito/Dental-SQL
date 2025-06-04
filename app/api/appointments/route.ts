import { NextRequest, NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { fullName, email, phone, service, date, time, notes } = data;

    if (!fullName || !email || !phone || !service || !date || !time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = await pool;
    await db
      .request()
      .input('fullName', fullName)
      .input('email', email)
      .input('phone', phone)
      .input('service', service)
      .input('date', date)
      .input('time', time)
      .input('notes', notes || '')
      .query(`
        INSERT INTO appointments (fullName, email, phone, service, appointmentDate, appointmentTime, notes)
        VALUES (@fullName, @email, @phone, @service, @date, @time, @notes)
      `);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error saving appointment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
