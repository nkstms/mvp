"use client"
import { getUsers } from '../types/employee';//

import React, { useEffect, useState } from 'react';//
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Users, SortField, SortDirection } from '../types/employee';



// interface ClientTableProps {
//   initialData: Users[];
// }

// export default function ClientTable({ initialData }: ClientTableProps) {
export default function ClientTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesCount, setEntriesCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('nom');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const [users, setUsers] = useState<Users[]>([]);//
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {//
    const fetchClients = async () => {
      try{
      const data = await getUsers();
      setUsers(data);
      setError(null)
    }catch(error){
      console.error("Failed to fetch users:",error)
      setError("Failed to fetch users. Please try again later.");
    }finally{
      setLoading(false)
    }
    };
    
    fetchClients();
  }, []);//
  
  console.log(users)//

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

  const sortedAndFilteredEmployees = users
    .filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase().trim())
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
    <th
      onClick={() => handleSort('nom')}
      className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
    >
      nom <SortIcon field="nom" />
    </th>
    {/* Other columns... */}
                <th
                  onClick={() => handleSort('nom')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  nom <SortIcon field="nom" />
                </th>
                <th
                  onClick={() => handleSort('prenom')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  prenom <SortIcon field="prenom" />
                </th>
                <th
                  onClick={() => handleSort('email')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  email <SortIcon field="email" />
                </th>
                <th
                  onClick={() => handleSort('telephone')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  telephone <SortIcon field="telephone" />
                </th>
                <th
                  onClick={() => handleSort('dateInscription')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  date d &apos inscription <SortIcon field="dateInscription" />
                </th>
                <th
                  onClick={() => handleSort('lieu')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  lieu <SortIcon field="lieu" />
                </th>
                <th
                  onClick={() => handleSort('typeStructure')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  type de structure <SortIcon field="typeStructure" />
                </th>
                <th
                  onClick={() => handleSort('typeCompte')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  type de Compte <SortIcon field="typeCompte" />
                </th>
                <th
                  onClick={() => handleSort('statutCompte')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  statut de compte <SortIcon field="statutCompte" />
                </th>
                <th
                  onClick={() => handleSort('typeProfil')}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-900 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                >
                  type de profil <SortIcon field="typeProfil" />
                </th>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentItems.map((employee, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
        {employee.nom}
      </td>
      {/* Other columns... */}
    </tr>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.nom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.prenom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.telephone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.dateInscription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.lieu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.typeStructure}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.typeCompte}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.statutCompte}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap dark:text-gray-300">
                    {employee.typeProfil}
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
























