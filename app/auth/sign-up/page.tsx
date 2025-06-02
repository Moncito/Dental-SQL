'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import Link from 'next/link';
import Lottie from 'lottie-react';
import animationData from '@/components/lottie/dentist.json';
import { toast } from 'sonner';
import { User, Mail, Lock, KeyRound } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm) return toast.error('Passwords do not match');
    if (!agree) return toast.error('Please agree to the terms');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created! Redirecting to login...');
      setTimeout(() => router.push('/log-in'), 1500);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(msg);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-12 text-black">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative w-full">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative w-full">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative w-full">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="relative w-full">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-black w-5 h-5" />
              <input
                type="password"
                placeholder="Repeat your password"
                className="w-full pl-10 pr-3 py-2 border rounded bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-black">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label>
                I agree to all statements in{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of service
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              REGISTER
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <Link href="/log-in" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white hidden md:flex items-center justify-center p-8">
          <Lottie animationData={animationData} loop={true} className="w-full max-w-sm" />
        </div>
      </div>
    </main>
  );
}
