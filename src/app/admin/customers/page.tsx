// app/customers/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical, Filter, User } from "lucide-react";
import Link from "next/link"; 

// --- MOCK DATA FOR CUSTOMER TABLE ---
const customers = [
  { id: 1, number: '01', name: "Sarah Hassan", phone: "012 234 5678", email: "sarahhassan@gmail.com", address: "Siem Reap", image: "/avatar1.jpg" },
  { id: 2, number: '02', name: "John Doe", phone: "012 234 5678", email: "johndoe@gmail.com", address: "Phnom Penh", image: "/avatar2.jpg" },
  { id: 3, number: '03', name: "Alex Smith", phone: "012 234 5678", email: "alexsmith@gmail.com", address: "Battambang", image: "/avatar3.jpg" },
  { id: 4, number: '04', name: "Alice Johnson", phone: "012 234 5678", email: "alicej@gmail.com", address: "Sihanoukville", image: "/avatar4.jpg" },
  { id: 5, number: '05', name: "David Williams", phone: "012 234 5678", email: "davidw@gmail.com", address: "Kep", image: "/avatar5.jpg" },
  { id: 6, number: '06', name: "Emily Brown", phone: "012 234 5678", email: "emilyb@gmail.com", address: "Kampot", image: "/avatar6.jpg" },
  { id: 7, number: '07', name: "Michael Clark", phone: "012 234 5678", email: "michaelc@gmail.com", address: "Takeo", image: "/avatar7.jpg" },
  // Adding more customers for pagination testing
];

export default function CustomersListTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalItems = customers.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startRange = (currentPage - 1) * rowsPerPage;
  const endRange = Math.min(currentPage * rowsPerPage, totalItems);
  
  const currentCustomers = customers.slice(startRange, endRange);
  const isAllSelected = currentCustomers.length > 0 && currentCustomers.every((c) => selectedIds.includes(c.id));

  const toggleSelectAll = () => {
    // Basic logic for select all
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !currentCustomers.some(c => c.id === id)));
    } else {
      setSelectedIds(prev => [...prev, ...currentCustomers.filter(c => !prev.includes(c.id)).map(c => c.id)]);
    }
  };
  
  const toggleSelect = (id: number) => {
    // Basic logic for single selection
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };


  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      
      {/* --- Header: Customers Title & Filters Button --- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Customers</h1>
        <div className="flex items-center gap-4">
          
          {/* Filters Button */}
          <button className="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition">
            <Filter size={16} className="mr-1" />
            Filtres
          </button>
        </div>
      </div>

      {/* --- Main Table Container --- */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              {/* Table Header: Pink background, bold text */}
              <thead className="text-left">
                <tr className="bg-pink-100 text-pink-700 font-semibold uppercase text-xs">
                  <th className="p-4 rounded-tl-xl">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="form-checkbox h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                    />
                  </th>
                  <th className="p-4">Number</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Photo</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Address</th>
                  <th className="p-4 rounded-tr-xl text-center">Action</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                {currentCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-pink-50/20 transition duration-100">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(customer.id)}
                        onChange={() => toggleSelect(customer.id)}
                        className="form-checkbox h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                      />
                    </td>
                    <td className="p-4 font-medium">{customer.number}</td>
                    <td className="p-4 font-medium text-gray-800">{customer.name}</td>
                    <td className="p-4">
                       <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {/* Placeholder image that looks like the image provided */}
                          <User size={18} className="text-gray-400" />
                          {/* In a real app, you'd use: 
                          <Image src={customer.image} alt={customer.name} width={32} height={32} className="rounded-full object-cover" /> 
                          */}
                       </div>
                    </td>
                    <td className="p-4">{customer.phone}</td>
                    <td className="p-4">{customer.email}</td>
                    <td className="p-4">{customer.address}</td>
                    <td className="p-4 text-center">
                      {/* Action Menu represented by vertical ellipsis */}
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                          <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Footer (Aligned to bottom right) */}
            <div className="flex justify-end items-center px-4 py-3 border-t text-sm text-gray-600">
              
              {/* Rows Per Page Dropdown */}
              <div className="flex items-center gap-2 mr-6">
                <span className="text-gray-500">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded px-2 py-1 bg-white text-gray-700 focus:ring-pink-500 focus:border-pink-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
              
              {/* Item Range and Nav Buttons */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">
                    {startRange + 1}-{endRange} of {totalItems}
                </span>

                <div className="flex items-center gap-1">
                    <button
                        className="p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition duration-150"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        &lt;
                    </button>
                    <button
                        className="p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition duration-150"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        &gt;
                    </button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}