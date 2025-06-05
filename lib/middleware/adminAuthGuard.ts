import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function adminAuthGuard() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) return redirect('/admin/log-in');

  try {
    const decoded = await adminAuth.verifySessionCookie(session, true);
    if (!decoded.admin) redirect('/admin/log-in');
  } catch (err) {
    console.error('Invalid session:', err);
    redirect('/admin/log-in');
  }
}
