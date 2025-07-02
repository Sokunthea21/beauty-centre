// src/app/(auth)/verify-email/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthImage from '@/components/Login & Register/AuthImage';

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get('email');

    if (!email) {
        router.replace('/signup');
        return null;
    }

  return (
    <div className="flex w-full h-screen">
      <AuthImage src="otp-bg.jpg" alt="White cosmetics" />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full text-center">
            <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
            <p className="text-gray-600 mb-8">
                A verification link has been sent to:
            </p>
            <p className="text-lg font-medium text-pink-600 mb-8 break-all">{email}</p>
            <p className="text-gray-500 mb-8">
                Please click the link in that email to activate your account.
            </p>
            <Link href="/login">
                <span className="w-full inline-block bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition duration-300">
                    Back to Login
                </span>
            </Link>
        </div>
      </div>
    </div>
  );
}
