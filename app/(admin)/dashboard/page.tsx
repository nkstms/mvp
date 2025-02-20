import { employees } from '@/data/employees';
import ClientTable from '@/components/ClientTable';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold dark:text-white">Datatable</h2>
        </div>
        <ClientTable initialData={employees} />
      </main>
    </div>
  );
}
