'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@/lib/firebase';

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!loggingOut) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loggingOut]);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      router.push('/logout');
    } catch {
      setLoggingOut(false);
    }
  };

  if (loading || loggingOut) {
    return (
      <div className="grid place-items-center min-h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 text-gray-900">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24">
          <Image
            src={user.photoURL || '/offline.png'}
            alt="Profile Picture"
            width={96}
            height={96}
            className="rounded-full border-2 border-gray-300 shadow-sm"
          />
        </div>

        <h1 className="mt-4 text-2xl font-semibold">{user.displayName || 'User'} 👋</h1>
        <p className="text-sm text-gray-500">{user.email}</p>

        <span
          className={`mt-2 px-3 py-1 text-xs font-medium rounded-full ${
            user.emailVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {user.emailVerified ? '✅ Verified' : '❌ Not Verified'}
        </span>
      </div>

      <div className="mt-6 space-y-3">{/* ...existing user details code... */}</div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
