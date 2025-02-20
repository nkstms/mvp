'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Employee {
  name: string;
  position: string;
  office: string;
  age: number;
  startDate: string;
  salary: number;
}

type SortField = keyof Employee;
type SortDirection = 'asc' | 'desc';

const employees: Employee[] = [
  {
    name: 'Airi Satou',
    position: 'Accountant',
    office: 'Tokyo',
    age: 33,
    startDate: '2008-11-28',
    salary: 162700,
  },
  {
    name: 'Angelica Ramos',
    position: 'Chief Executive Officer (CEO)',
    office: 'London',
    age: 47,
    startDate: '2009-10-09',
    salary: 1200000,
  },
  {
    name: 'Ashton Cox',
    position: 'Junior Technical Author',
    office: 'San Francisco',
    age: 66,
    startDate: '2009-01-12',
    salary: 86000,
  },
  {
    name: 'Bradley Greer',
    position: 'Software Engineer',
    office: 'London',
    age: 41,
    startDate: '2012-10-13',
    salary: 132000,
  },
  {
    name: 'Brenden Wagner',
    position: 'Software Engineer',
    office: 'San Francisco',
    age: 28,
    startDate: '2011-06-07',
    salary: 206850,
  },
  {
    name: 'Brielle Williamson',
    position: 'Integration Specialist',
    office: 'New York',
    age: 61,
    startDate: '2012-12-02',
    salary: 372000,
  },
  {
    name: 'Bruno Nash',
    position: 'Software Engineer',
    office: 'London',
    age: 38,
    startDate: '2011-05-03',
    salary: 163500,
  },
  {
    name: 'Caesar Vance',
    position: 'Pre-Sales Support',
    office: 'New York',
    age: 21,
    startDate: '2011-12-12',
    salary: 106450,
  },
  {
    name: 'Cara Stevens',
    position: 'Sales Assistant',
    office: 'New York',
    age: 46,
    startDate: '2011-12-06',
    salary: 145600,
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedAndFilteredEmployees = employees
    .filter((employee) =>
      Object.values(employee).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

  // Calculate pagination
  const totalItems = sortedAndFilteredEmployees.length;
  const totalPages = Math.ceil(totalItems / entriesCount);
  const startIndex = (currentPage - 1) * entriesCount;
  const endIndex = startIndex + entriesCount;
  const currentItems = sortedAndFilteredEmployees.slice(startIndex, endIndex);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return (
      <span className="inline-block ml-1">
        {sortDirection === 'asc' ? (
          <ChevronUp size={14} className="inline" />
        ) : (
          <ChevronDown size={14} className="inline" />
        )}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold dark:text-white">Datatable</h2>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 dark:text-gray-300">
                <span>Show</span>
                <select
                  value={entriesCount}
                  onChange={(e) => {
                    setEntriesCount(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page when changing entries
                  }}
                  className="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
              </div>

              <div className="flex items-center gap-2 dark:text-gray-300">
                <span>Search:</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <th
                      className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('name')}
                    >
                      Name <SortIcon field="name" />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('position')}
                    >
                      Position <SortIcon field="position" />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('office')}
                    >
                      Office <SortIcon field="office" />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('age')}
                    >
                      Age <SortIcon field="age" />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('startDate')}
                    >
                      Start date <SortIcon field="startDate" />
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleSort('salary')}
                    >
                      Salary <SortIcon field="salary" />
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {currentItems.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                        {employee.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                        {employee.office}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                        {employee.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                        {employee.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                        ${employee.salary.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add pagination info and controls */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
