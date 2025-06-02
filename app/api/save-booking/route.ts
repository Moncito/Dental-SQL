import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/verifySession';

export async function POST(req: NextRequest) {
  try {
    const user = await verifySession(); // 👈 Verifies session
    const data = await req.json();

    // Save data logic here — e.g., to MS SQL
    console.log('Authenticated user:', user.uid, data);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Auth error:', err);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
