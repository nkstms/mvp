'use client';

import Link from 'next/link';

export const StatusClientContent = ({ mode }: { mode: string }) => {
  return (
    <div className="mt-8 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
  );
};
