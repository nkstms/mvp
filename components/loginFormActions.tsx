'use client';

import { useState } from 'react';
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '@/lib/zodSchema';

const LoginFormActions = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    setError('');
    setSuccess('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        await signOut(auth);
        setError('Email not verified. A new verification email has been sent.');
        return;
      }

      setSuccess('You have successfully signed in.');
      router.push('/');
    } catch {
      setError('Invalid email or password. Please check your credentials and try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success && (
        <div className="px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50">
          {success}
        </div>
      )}

      {error && (
        <div className="px-4 py-3 mb-3 text-sm text-red-500 border border-red-200 rounded-md bg-red-50 dark:bg-red-400/20 dark:border-red-500/50">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="email" className="inline-block mb-2 text-base font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 ${
            errors.email ? 'border-red-500' : ''
          }`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="inline-block mb-2 text-base font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className={`form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 ${
            errors.password ? 'border-red-500' : ''
          }`}
          placeholder="Enter your password"
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <input
          id="remember-me"
          type="checkbox"
          className="border rounded-sm appearance-none size-4 bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500"
        />
        <label htmlFor="remember-me" className="inline-block text-base font-medium cursor-pointer">
          Remember me
        </label>
      </div>

      <div className="mt-10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white btn bg-custom-500 border-custom-500 hover:bg-custom-600 focus:ring focus:ring-custom-100 dark:ring-custom-400/20"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </form>
  );
};

export default LoginFormActions;
