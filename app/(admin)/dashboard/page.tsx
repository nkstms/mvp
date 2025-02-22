"use client"

import { employees } from '@/data/employees';
import ClientTable from '@/components/ClientTable';
import { useState } from 'react';
import ImageUploader from '@/components/ui/ImageUploader';


export default function Page() {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = (url) => {
    setImageUrl(url);
    // Save the URL to Firebase or your database
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div>
      <h1>Admin Dashboard</h1>
      <ImageUploader onUpload={handleUpload} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" width={200} height={200} />}
    </div>
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold dark:text-white">Datatable</h2>
        </div>
        <ClientTable initialData={employees} />
      </main>
      
    </div>
  );
}
