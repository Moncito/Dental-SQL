'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import dynamic from 'next/dynamic';
import successAnimation from '@/components/lottie/success.json';
import { CheckCircle } from 'lucide-react';
import { useWindowSize } from 'react-use';

// ✅ Dynamically import Confetti (Client-side only)
const Confetti = dynamic(() => import('react-confetti'), { ssr: false });

export default function AppointmentSuccessPage() {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowConfetti(false);
      router.push('/');
    }, 10000); // 10 seconds

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {showConfetti && width && height && (
        <Confetti width={width} height={height} />
      )}

      {/* Dentty Tag */}
      <div className="absolute top-4 left-4 text-blue-600 font-bold text-xl">
        Dentty 🦷
      </div>

      <div className="max-w-md w-full flex flex-col items-center">
        <Lottie animationData={successAnimation} loop={false} className="w-48 h-48" />
        <h1 className="text-3xl font-bold text-green-600 mt-6 flex items-center gap-2">
          <CheckCircle className="w-6 h-6" /> Appointment Confirmed!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for booking with Dentty. You’ll receive an SMS once your appointment is approved.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Redirecting to homepage in 10 seconds...
        </p>
      </div>
    </main>
  );
}
