'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { confirmPasswordReset, applyActionCode } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import CreatePasswordForm from '@/components/createPasswordForm';
import Image from 'next/image';
import Link from 'next/link';

const AccountActionPage = () => {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode'); // Firebase action code
  const mode = searchParams.get('mode'); // Action type: resetPassword or verifyEmail
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    try {
      setLoading(true);
      await applyActionCode(auth, oobCode as string);
      setMessage('✅ Email verified successfully! You can now log in.');
    } catch {
      setMessage('❌ Email verification failed. Link may be expired.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (newPassword: string) => {
    if (!oobCode) {
      setMessage('❌ Invalid or expired reset link.');
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage('✅ Password reset successful! You can now log in.');
    } catch {
      setMessage('❌ Failed to reset password. Link may be expired.');
    } finally {
      setLoading(false);
    }
  };

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
          <h4 className="mb-2 text-custom-500 dark:text-custom-500">
            {mode === 'resetPassword' ? 'Set a New Password' : 'Verify Your Email'}
          </h4>
          <p className="mb-8 text-slate-500 dark:text-zink-200">
            {mode === 'resetPassword'
              ? 'Your new password should be distinct from any of your prior passwords.'
              : 'Click the button below to confirm your email address.'}
          </p>
        </div>

        {message && <p className="text-center mb-4 text-sm">{message}</p>}

        {mode === 'resetPassword' && (
          <CreatePasswordForm onSubmit={handlePasswordReset} isLoading={loading} />
        )}

        {mode === 'verifyEmail' && (
          <button
            onClick={verifyEmail}
            disabled={loading}
            className="w-full mt-4 py-2 text-white bg-custom-500 rounded-md hover:bg-custom-600 transition"
          >
            {loading ? 'Verifying...' : 'Confirm Email'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountActionPage;
