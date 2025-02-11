import Link from 'next/link';
import AuthIcons from './authIcons';

const LoginForm = () => {
  return (
    <form action="index.html" className="mt-10" id="signInForm">
      <div
        className="hidden px-4 py-3 mb-3 text-sm text-green-500 border border-green-200 rounded-md bg-green-50 dark:bg-green-400/20 dark:border-green-500/50"
        id="successAlert"
      >
        You have <b>successfully</b> signed in.
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="inline-block mb-2 text-base font-medium">
          UserName/ Email ID
        </label>
        <input
          type="text"
          id="username"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Enter username or email"
        />
        <div id="username-error" className="hidden mt-1 text-sm text-red-500">
          Please enter a valid email address.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="inline-block mb-2 text-base font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
          placeholder="Enter password"
        />
        <div id="password-error" className="hidden mt-1 text-sm text-red-500">
          Password must be at least 8 characters long and contain both letters and numbers.
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <input
            id="checkboxDefault1"
            className="border rounded-sm appearance-none size-4 bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-custom-500 checked:border-custom-500 dark:checked:bg-custom-500 dark:checked:border-custom-500 checked:disabled:bg-custom-400 checked:disabled:border-custom-400"
            type="checkbox"
            value=""
          />
          <label
            htmlFor="checkboxDefault1"
            className="inline-block text-base font-medium align-middle cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <div id="remember-error" className="hidden mt-1 text-sm text-red-500">
          Please check the &quot;Remember me&quot; before submitting the form.
        </div>
      </div>
      <div className="mt-10">
        <button
          type="submit"
          className="w-full text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"
        >
          Sign In
        </button>
      </div>

      <div className="relative text-center my-9 before:absolute before:top-3 before:left-0 before:right-0 before:border-t before:border-t-slate-200 dark:before:border-t-zink-500">
        <h5 className="inline-block px-2 py-0.5 text-sm bg-white text-slate-500 dark:bg-zink-600 dark:text-zink-200 rounded relative">
          Sign In with
        </h5>
      </div>

      <AuthIcons />

      <div className="mt-10 text-center">
        <p className="mb-0 text-slate-500 dark:text-zink-200">
          Don&apos;t have an account ?{' '}
          <Link
            href="/register"
            className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500"
          >
            {' '}
            SignUp
          </Link>{' '}
        </p>
      </div>
    </form>
  );
};
export default LoginForm;
