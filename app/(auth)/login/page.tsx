import LoginForm from '@/components/loginForm';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign In',
};

const LoginPage = () => {
  return (
    <div className="mb-0 w-screen lg:mx-auto lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
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
          <h4 className="mb-1 text-custom-500 dark:text-custom-500">Welcome Back !</h4>
          <p className="text-slate-500 dark:text-zink-200">Sign in to continue to Tailwick.</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;
