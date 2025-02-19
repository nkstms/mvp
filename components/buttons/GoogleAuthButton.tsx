'use client';

import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const GoogleAuthButton = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error('Error during Google sign-in: ', error);
    }
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 bg-white text-gray-600 btn border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:bg-gray-50 focus:border-gray-400 active:bg-gray-100"
      onClick={handleGoogleSignIn}
    >
      {children}
    </button>
  );
};
