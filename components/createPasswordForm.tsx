'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CreatePasswordFormProps {
  onSubmit: (newPassword: string) => void;
  isLoading: boolean;
}

const CreatePasswordForm: React.FC<CreatePasswordFormProps> = ({ onSubmit, isLoading }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    onSubmit(password);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="passwordInput" className="inline-block mb-2 text-base font-medium">
          Password
        </label>
        <input
          type="password"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 dark:disabled:border-zink-500 dark:disabled:text-zink-200 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          required
          placeholder="Password"
          id="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="passwordConfirmInput" className="inline-block mb-2 text-base font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 dark:disabled:border-zink-500 dark:disabled:text-zink-200 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          required
          placeholder="Confirm password"
          id="passwordConfirmInput"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="mt-8">
        <button
          type="submit"
          className="w-full text-white btn bg-custom-500 border-custom-500 hover:bg-custom-600 focus:ring focus:ring-custom-100 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="mb-0">
          Hold on, I&apos;ve got my password...{' '}
          <Link href="/login" className="underline font-medium text-custom-500">
            Click here
          </Link>
        </p>
      </div>
    </form>
  );
};

export default CreatePasswordForm;
