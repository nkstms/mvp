// components/ui/ImageUploader.tsx
'use client'; // Mark as a Client Component

import { CldUploadButton } from 'next-cloudinary';

interface ImageUploaderProps {
  onUpload: (url: string) => void; // Callback function to handle the uploaded image URL
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  return (
    <CldUploadButton
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} // Your Cloudinary upload preset
      onUpload={(result: any) => {
        // Extract the secure URL of the uploaded image
        const url = result.info.secure_url;
        onUpload(url); // Pass the URL to the parent component
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Upload Image
    </CldUploadButton>
  );
}