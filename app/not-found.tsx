import { Home } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 | NKS TMS',
};

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen py-16 bg-cover bg-auth-pattern dark:bg-auth-pattern-dark ">
      <div className="mb-0 border-none shadow-none lg:w-[500px] card bg-white/70 dark:bg-zink-500/70">
        <div className="!px-10 !py-12 card-body">
          <Link href="/">
            <Image
              src="/logo-light.png"
              width={112}
              height={476}
              alt="logo"
              className="hidden h-6 mx-auto dark:block"
            />
            <Image
              src="/logo-dark.png"
              width={112}
              height={476}
              alt="logo"
              className="block h-6 mx-auto dark:hidden"
            />
          </Link>

          <div className="mt-10">
            <Image
              src="/error-404.png"
              width={112}
              height={476}
              alt="error"
              className="h-64 mx-auto"
            />
          </div>
          <div className="mt-8 text-center">
            <h4 className="mb-2 text-purple-500">OPPS, PAGE NOT FOUND</h4>
            <p className="mb-6 text-slate-500 dark:text-zink-200">
              It will be as straightforward as Occidental; in fact, it will be just like Occidental
              to an English speaker.
            </p>
            <Link
              href="/"
              className="text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
            >
              <Home className="inline-block size-3 ltr:mr-1 rtl:ml-1" />{' '}
              <span className="align-middle">Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
