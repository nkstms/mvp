import UserProfile from '@/components/userProfile';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-xl font-semibold">Espace de travail</h1>
      <div className="w-full max-w-md">
        <UserProfile />
      </div>
    </div>
  );
}
