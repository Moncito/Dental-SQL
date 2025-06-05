'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth.action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminAuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn({ email, password });
    if (res.success) {
      toast.success('Login successful!');
      router.push('/admin');
    } else {
      toast.error(res.message || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Dentty Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="admin@dentty.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-6">
          © {new Date().getFullYear()} Dentty. Admin access only.
        </p>
      </div>
    </div>
  );
}
