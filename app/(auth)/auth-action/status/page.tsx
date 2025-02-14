'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const StatusContent = () => {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  if (!mode) {
    return (
      <div className="text-center">
        <p className="text-red-500">Invalid status page access</p>
        <Link href="/" className="text-custom-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-0 w-screen lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
      <div className="!px-10 !py-12 card-body">
        <Link href="/">
          <Image
            src="/logo-light.png"
            width={112}
            height={476}
            alt="Logo Light"
            className="hidden h-6 mx-auto dark:block"
          />
          <Image
            src="/logo-dark.png"
            width={112}
            height={476}
            alt="Logo Dark"
            className="block h-6 mx-auto dark:hidden"
          />
        </Link>

        <div className="mt-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h4 className="mb-2 text-custom-500 dark:text-custom-500">
            {mode === 'resetPassword' ? 'Password Reset Successful!' : 'Email Verified!'}
          </h4>
          <p className="mb-8 text-slate-500 dark:text-zink-200">
            {mode === 'resetPassword'
              ? 'Your password has been successfully reset. You can now log in with your new password.'
              : 'Your email has been successfully verified. You can now access all features of your account.'}
          </p>
          <Link
            href="/login"
            className="w-full inline-block py-2 text-white bg-custom-500 rounded-md hover:bg-custom-600 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const AuthActionStatusPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-custom-500"></div>
        </div>
      }
    >
      <StatusContent />
    </Suspense>
  );
};

export default AuthActionStatusPage;
