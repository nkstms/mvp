import Image from 'next/image';
import Link from 'next/link';
import { LogOut as LogOutIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LogOut',
};

const LogoutPage = () => {
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
          <div className="mb-4 text-center">
            <LogOutIcon className="mx-auto text-purple-500 size-6 fill-purple-100" />
          </div>
          <h4 className="mb-2 text-custom-500 dark:text-custom-500">You are Logged Out</h4>
          <p className="mb-8 text-slate-500 dark:text-zink-200">Thank you for using NKS TMS</p>
        </div>

        <Link
          href="/login"
          className="w-full text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};
export default LogoutPage;
