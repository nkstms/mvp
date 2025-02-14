'use client';

import { auth } from '@/lib/firebase';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export const FacebookAuthButton = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (error) {
      console.error('Error during Facebook sign-in: ', error);
    }
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 active:text-white active:bg-custom-600 active:border-custom-600"
      onClick={handleFacebookSignIn}
    >
      {children}
    </button>
  );
};
