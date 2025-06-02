// lib/verifySession.ts
import { cookies } from 'next/headers';
import { adminAuth } from './firebaseAdmin';

export async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) {
    throw new Error('No session cookie found');
  }

  const decoded = await adminAuth.verifySessionCookie(session, true);
  return decoded; // includes uid, email, etc.
}
