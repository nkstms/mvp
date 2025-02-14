import Link from 'next/link';
import AuthIcons from './authIcons';
import LoginFormActions from './loginFormActions';

const LoginForm = () => {
  return (
    <div className="mt-10">
      <LoginFormActions />

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
    </div>
  );
};

export default LoginForm;
