'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState } from 'react';
import { resetPassword } from '@/actions/auth';

const ForgotPasswordPage = () => {
  const [state, formAction, isPending] = useActionState(resetPassword, null);

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

        <form action={formAction} className="mt-8">
          {state?.message && (
            <p className={`mt-3 ${state?.success ? 'text-red-500' : 'text-green-500'}`}>
              {state.message}
            </p>
          )}
          <div>
            <label htmlFor="emailInput" className="inline-block mb-2 text-base font-medium">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
              placeholder="Enter email"
              id="emailInput"
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
              disabled={isPending}
            >
              {isPending ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="mb-0">
              Wait, I remember my password...{' '}
              <Link href="/login" className="underline fw-medium text-custom-500">
                Click here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
