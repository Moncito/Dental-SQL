import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebaseAdmin';
import { redirect } from 'next/navigation';

export async function adminAuthGuard() {
  const sessionCookie = (await cookies()).get('session')?.value;
  if (!sessionCookie) redirect('/admin/log-in');

  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
  if (!decoded.admin) redirect('/admin/log-in');
}
