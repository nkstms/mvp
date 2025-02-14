import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { StatusClientContent } from '@/components/status-client';

export const dynamic = 'force-dynamic';

const StatusContent = async ({ searchParams }: { searchParams: Promise<{ mode?: string }> }) => {
  const { mode } = await searchParams;

  if (!mode) {
    return (
      <div className="text-center">
        <p className="text-red-500">Invalid status page access</p>
        <Link href="/" className="text-custom-500 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

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

        <StatusClientContent mode={mode} />
      </div>
    </div>
  );
};

const AuthActionStatusPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-custom-500"></div>
        </div>
      }
    >
      <StatusContent searchParams={searchParams} />
    </Suspense>
  );
};

export default AuthActionStatusPage;
