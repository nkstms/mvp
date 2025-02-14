import Link from 'next/link';
import UserProfile from '@/components/userProfile';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-xl font-semibold">Espace de travail</h1>
      <div className="w-full max-w-md">
        <UserProfile />
        <div className="flex flex-row items-center justify-center gap-2 mt-4">
          <Link
            href="/login"
            className="inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
