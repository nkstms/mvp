'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { confirmPasswordReset, applyActionCode } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import CreatePasswordForm from '@/components/createPasswordForm';

const AuthActionClient = ({ mode, oobCode }: { mode?: string; oobCode?: string }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyEmail = async () => {
    if (!oobCode) return;
    try {
      setLoading(true);
      await applyActionCode(auth, oobCode);
      router.push(`/auth-action/status?mode=verifyEmail`);
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
      router.push(`/auth-action/status?mode=resetPassword`);
    } catch {
      setMessage('❌ Failed to reset password. Link may be expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
    </>
  );
};

export default AuthActionClient;
