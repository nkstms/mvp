import Link from 'next/link';
import AuthIcons from './authIcons';
import ClientForm from '@/components/registerFormActions';

const RegisterForm = () => {
  return (
    <div className="mt-10">
      <ClientForm />

      <div className="relative text-center my-9 before:absolute before:top-3 before:left-0 before:right-0 before:border-t before:border-t-slate-200 dark:before:border-t-zink-500">
        <h5 className="inline-block px-2 py-0.5 text-sm bg-white text-slate-500 dark:bg-zink-600 dark:text-zink-200 rounded relative">
          Create account with
        </h5>
      </div>

      <AuthIcons />

      <div className="mt-10 text-center">
        <p className="mb-0 text-slate-500 dark:text-zink-200">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold underline text-custom-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
