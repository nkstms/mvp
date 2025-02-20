'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Employee, SortField, SortDirection } from '../types/employee';

interface ClientTableProps {
  initialData: Employee[];
}

export default function ClientTable({ initialData }: ClientTableProps) {
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

  const sortedAndFilteredEmployees = initialData
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

  const totalItems = sortedAndFilteredEmployees.length;
  const totalPages = Math.ceil(totalItems / entriesCount);
  const startIndex = (currentPage - 1) * entriesCount;
  const endIndex = startIndex + entriesCount;
  const currentItems = sortedAndFilteredEmployees.slice(startIndex, endIndex);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6">
        {/* Controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 dark:text-gray-300">
            <span>Show</span>
            <select
              value={entriesCount}
              onChange={(e) => {
                setEntriesCount(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 dark:bg-gray-700 dark:border-gray-600"
            >
              {[10, 25, 50, 100].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Name <SortIcon field="name" />
                </th>
                <th
                  onClick={() => handleSort('position')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Position <SortIcon field="position" />
                </th>
                <th
                  onClick={() => handleSort('office')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Office <SortIcon field="office" />
                </th>
                <th
                  onClick={() => handleSort('age')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Age <SortIcon field="age" />
                </th>
                <th
                  onClick={() => handleSort('startDate')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  Start date <SortIcon field="startDate" />
                </th>
                <th
                  onClick={() => handleSort('salary')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
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
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">{employee.age}</td>
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

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-700 dark:text-gray-400">
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
  );
}
