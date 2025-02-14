import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import AuthActionClient from '@/components/AuthActionClient';

export const dynamic = 'force-dynamic';

const AccountActionPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ oobCode?: string; mode?: string }>;
}) => {
  const { oobCode, mode } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-custom-500"></div>
        </div>
      }
    >
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
            <h4 className="mb-2 text-custom-500 dark:text-custom-500">
              {mode === 'resetPassword' ? 'Set a New Password' : 'Verify Your Email'}
            </h4>
            <p className="mb-8 text-slate-500 dark:text-zink-200">
              {mode === 'resetPassword'
                ? 'Your new password should be distinct from any of your prior passwords.'
                : 'Click the button below to confirm your email address.'}
            </p>
          </div>

          <AuthActionClient mode={mode} oobCode={oobCode} />
        </div>
      </div>
    </Suspense>
  );
};

export default AccountActionPage;
