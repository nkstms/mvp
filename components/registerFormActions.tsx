'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormValues, registerSchema } from '@/lib/zodSchema';
import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { registerUser } from '@/actions/auth';
import { useRouter } from 'next/navigation';

const ClientForm = () => {
  const { register } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const [state, formAction, isPending] = useActionState(registerUser, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push('/verify-email?email=' + state.email);
    }
  }, [state?.success, router, state?.email]);

  return (
    <form action={formAction} className="mt-10" id="registerForm">
      {state?.message && (
        <p className={`mt-3 ${state?.success ? 'text-green-500' : 'text-red-500'}`}>
          {state.message}
        </p>
      )}

      <div className="mb-3">
        <label htmlFor="email-field" className="inline-block mb-2 text-base font-medium">
          Email
        </label>
        <input
          {...register('email')}
          type="text"
          id="email-field"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Enter email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="inline-block mb-2 text-base font-medium">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Enter password"
        />
      </div>

      <p className="italic text-15 text-slate-500 dark:text-zink-200">
        By registering you agree to the Tailwick{' '}
        <Link href="#!" className="underline">
          Terms of Use
        </Link>
      </p>

      <div className="mt-10">
        <button
          type="submit"
          disabled={isPending}
          className="w-full text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
        >
          {isPending ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
