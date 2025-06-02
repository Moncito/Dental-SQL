'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import Link from 'next/link';
import Lottie from 'lottie-react';
import animationData from '@/components/lottie/dentist.json';
import { toast } from 'sonner';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();

      const res = await fetch('/api/auth/set-session', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error('Failed to set session');

      toast.success('✅ Successfully logged in! Redirecting...');
      router.push('/appointment');
    } catch (error: unknown) {
      let message = 'An unexpected error occurred.';
      if (error instanceof Error) {
        if (error.message.includes('auth/user-not-found')) {
          message = '❌ User not registered. Please sign up first.';
        } else if (error.message.includes('auth/wrong-password')) {
          message = '❌ Incorrect password. Please try again.';
        } else if (error.message.includes('auth/invalid-email')) {
          message = '❌ Invalid email address format.';
        }
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Please enter your email first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('📩 Password reset email sent!');
    } catch (error: unknown) {
      let message = 'An error occurred.';
      if (error instanceof Error && error.message.includes('auth/user-not-found')) {
        message = '❌ No user found with this email.';
      }
      toast.error(message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 text-black">
          <h2 className="text-3xl font-bold mb-6 text-center">Log in</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 pointer-events-none" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative w-full">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5 pointer-events-none" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded transition ${
                loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'
              }`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <div className="text-sm text-center text-gray-600">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:underline cursor-pointer mt-2"
              >
                Forgot Password?
              </button>
            </div>

            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{' '}
              <Link href="auth/sign-up" className="text-blue-600 hover:underline cursor-pointer">
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Lottie Animation */}
        <div className="w-full md:w-1/2 bg-white hidden md:flex items-center justify-center p-8">
          <Lottie animationData={animationData} loop className="w-full max-w-sm" />
        </div>
      </div>
    </main>
  );
}
