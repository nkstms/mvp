'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/firebase';

export default function Home() {
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

    return () => unsubscribe(); // Cleanup subscription
  }, [loggingOut]); // Prevent updates when logging out

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await signOut(auth);
      router.push('/logout');
    } catch (error) {
      console.error('Logout failed:', error);
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
  console.log(user);

  return (
    <div>
      {user ? (
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 text-gray-900">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="relative w-24 h-24">
              <Image
                src={user.photoURL || '/offline.png'}
                alt="Profile Picture"
                width={96}
                height={96}
                className="rounded-full border-2 border-gray-300 shadow-sm"
              />
            </div>

            {/* User Info */}
            <h1 className="mt-4 text-2xl font-semibold">{user.displayName || 'User'} 👋</h1>
            <p className="text-sm text-gray-500">{user.email}</p>

            {/* Status */}
            <span
              className={`mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                user.emailVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {user.emailVerified ? '✅ Verified' : '❌ Not Verified'}
            </span>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">Phone:</span>
              <span>{user.phoneNumber || 'Not Provided'}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">User ID:</span>
              <span className="truncate">{user.uid}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">Provider:</span>
              <span>{user.providerData[0]?.providerId || 'Unknown'}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">Created At:</span>
              <span>{user.metadata.creationTime}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">Last Sign-In:</span>
              <span>{user.metadata.lastSignInTime}</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <h1 className="text-xl font-semibold">Espace de travail Vide</h1>
          <div className="flex flex-row items-center justify-center gap-2">
            <Link
              href="/login"
              className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </Link>

            <Link
              href="/register"
              className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
