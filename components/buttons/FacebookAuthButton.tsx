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
      className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-white btn bg-[#1877f2] border-[#1877f2] hover:bg-[#0c64d2] hover:border-[#0c64d2] focus:bg-[#0c64d2] focus:border-[#0c64d2] active:bg-[#0c64d2]"
      onClick={handleFacebookSignIn}
    >
      {children}
    </button>
  );
};
