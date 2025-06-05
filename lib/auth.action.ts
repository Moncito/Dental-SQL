'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { adminAuth } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';

export async function signIn({ email, password }: { email: string; password: string }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const decoded = await adminAuth.verifyIdToken(idToken);

    if (!decoded.admin) {
      return { success: false, message: 'Access denied. Not an admin.' };
    }

    // ✅ Await cookies()
    (await cookies()).set('session', sessionCookie, {
      httpOnly: true,
      secure: true,
      path: '/',
      maxAge: expiresIn / 1000,
    });

    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    console.error('❌ Admin login error:', err.message || error);
    return { success: false, message: 'Invalid credentials or not authorized.' };
  }
}
