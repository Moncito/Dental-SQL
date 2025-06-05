import { sendSms } from '@/lib/twilio';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { phone, fullName, reason } = await req.json();

  const body = `Hello ${fullName}, your appointment has been cancelled. Reason: ${reason} - Dentty Clinic`;

  try {
    await sendSms(phone, body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
