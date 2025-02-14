import Image from 'next/image';
import Link from 'next/link';
import { ResendVerificationButton } from '@/components/resend-verification-button';

export const dynamic = 'force-dynamic';

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const email = (await searchParams).email as string;

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
          <h4 className="mb-1 text-custom-500 dark:text-custom-500">Verify Email</h4>
          <p className="mb-4 text-slate-500 dark:text-zink-200">
            Did you not receive an email? Please <ResendVerificationButton email={email} />
          </p>

          <Link href="/login">
            <button
              type="button"
              className="px-2 py-1.5 text-xs text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
            >
              Skip Now
            </button>
          </Link>
        </div>

        <div className="pt-10 text-center">
          <Image
            src="/auth-email.png"
            width={333}
            height={349}
            alt="Auth Email"
            className="block w-2/3 mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
