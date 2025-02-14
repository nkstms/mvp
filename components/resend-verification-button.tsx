'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

export const ResendVerificationButton = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleResendVerification = async () => {
    if (!email) {
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/verify-email?email=${email}`,
        handleCodeInApp: true,
      });
      setMessage({ text: 'Verification email sent again! Check your inbox.', type: 'success' });
    } catch {
      setMessage({ text: 'Error resending email', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="text-custom-500" onClick={handleResendVerification} disabled={loading}>
        {loading ? 'Resending...' : 'try again'}
      </button>

      {message && (
        <p
          className={`mt-2 text-sm ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message.text}
        </p>
      )}
    </>
  );
};
