"use client"
import UserProfile from '@/components/userProfile';
import { CldUploadWidget } from 'next-cloudinary';

export default function Profile() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-xl font-semibold">Espace de travail</h1>
      <div className="w-full max-w-md">
        <UserProfile /> 
 <CldUploadWidget uploadPreset="<Your Upload Preset>">
   {({ open }) => {
     return (
       <button onClick={() => open()}>
         Upload an Image
       </button>
     );
   }}
 </CldUploadWidget>

      </div>
    </div>
  );
}
