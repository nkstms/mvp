import Image from 'next/image';
import Link from 'next/link';
import ForgotPasswordForm from '@/components/forgotPasswordForm';

const ForgotPasswordPage = () => {
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
          <h4 className="mb-2 text-custom-500 dark:text-custom-500">Forgot Password?</h4>
          <p className="mb-8 text-slate-500 dark:text-zink-200">Reset your password</p>
        </div>

        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
