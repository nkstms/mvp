import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Twitter, Facebook, Github, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AuthIcons = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Start the sign-in process
      const result = await signInWithPopup(auth, provider);

      // The signed-in user info
      const user = result.user;
      console.log('User signed in: ', user);
      router.push('/');
    } catch (error) {
      console.error('Error during Google sign-in: ', error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        type="button"
        className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 active:text-white active:bg-custom-600 active:border-custom-600"
      >
        <Facebook className="w-4 h-4" />
      </button>
      <button
        type="button"
        className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-white btn bg-orange-500 border-orange-500 hover:text-white hover:bg-orange-600 hover:border-orange-600 focus:text-white focus:bg-orange-600 focus:border-orange-600 active:text-white active:bg-orange-600 active:border-orange-600"
        onClick={handleGoogleSignIn}
      >
        <Mail className="w-4 h-4" />
      </button>
      <button
        type="button"
        className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-white btn bg-sky-500 border-sky-500 hover:text-white hover:bg-sky-600 hover:border-sky-600 focus:text-white focus:bg-sky-600 focus:border-sky-600 active:text-white active:bg-sky-600 active:border-sky-600"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        type="button"
        className="flex items-center justify-center size-[37.5px] transition-all duration-200 ease-linear p-0 text-white btn bg-slate-500 border-slate-500 hover:text-white hover:bg-slate-600 hover:border-slate-600 focus:text-white focus:bg-slate-600 focus:border-slate-600 active:text-white active:bg-slate-600 active:border-slate-600"
      >
        <Github className="w-4 h-4" />
      </button>
    </div>
  );
};
export default AuthIcons;
