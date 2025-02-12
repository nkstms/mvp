'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import AuthIcons from './authIcons';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (email === '' || password === '') {
        setError('Email and password are required');
        return;
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        await signOut(auth);
        setError('Email not verified. A new verification email has been sent.');
        return;
      }

      setSuccess('You have successfully signed in.');
      router.push('/');
      console.log('User:', user);
    } catch {
      setError('Account not found! Please sign up');
    }
  };

  return (
    <form onSubmit={handleSignIn} className="mt-10">
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
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="inline-block mb-2 text-base font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
          className="w-full text-white btn bg-custom-500 border-custom-500 hover:bg-custom-600 focus:ring focus:ring-custom-100 dark:ring-custom-400/20"
        >
          Sign In
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link href="/forgot-password" className="text-sm text-custom-500 hover:underline">
          Forgot Password?
        </Link>
      </div>

      <div className="relative text-center my-9 before:absolute before:top-3 before:left-0 before:right-0 before:border-t before:border-t-slate-200 dark:before:border-t-zink-500">
        <h5 className="inline-block px-2 py-0.5 text-sm bg-white text-slate-500 dark:bg-zink-600 dark:text-zink-200 rounded relative">
          Sign In with
        </h5>
      </div>

      <AuthIcons />

      <div className="mt-10 text-center">
        <p className="text-slate-500 dark:text-zink-200">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-semibold underline text-custom-500 hover:text-custom-600"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
