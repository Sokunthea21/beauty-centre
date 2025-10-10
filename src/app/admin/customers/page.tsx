// app/customers/page.tsx
"use client";
import { useEffect, useState } from "react";
import { MoreVertical, Filter, User } from "lucide-react";
import { getAllCustomers } from "@/api/customer.api";

export default function CustomersListTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      const response = await getAllCustomers();

      setCustomerData(response.data);
    }

    fetchCustomers();
  }, []);
  
  const totalItems = customerData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startRange = (currentPage - 1) * rowsPerPage;
  const endRange = Math.min(currentPage * rowsPerPage, totalItems);
  
  const currentCustomers = customerData.slice(startRange, endRange);
  const isAllSelected = currentCustomers.length > 0 && currentCustomers.every((c: any) => selectedIds.includes(c.id));

  const toggleSelectAll = () => {
    // Basic logic for select all
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !currentCustomers.some((c: any) => c.id === id)));
    } else {
      setSelectedIds(prev => [...prev, ...currentCustomers.filter((c: any) => !prev.includes(c.id)).map((c: any) => c.id)]);
    }
  };
  
  const toggleSelect = (id: number) => {
    // Basic logic for single selection
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };


  return (
    <div className="p-4 min-h-screen">
      
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
      <div className="bg-white rounded-xl shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              {/* Table Header: Pink background, bold text */}
              <thead className="text-left">
                <tr className="bg-[#F6A5C1] text-black font-semibold text-xs">
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
                {currentCustomers.map((customer: any) => (
                  <tr key={customer.id} className="hover:bg-pink-50/20 transition duration-100">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(customer.id)}
                        onChange={() => toggleSelect(customer.id)}
                        className="form-checkbox h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                      />
                    </td>
                    <td className="p-4 font-medium">{customer.id}</td>
                    <td className="p-4 font-medium text-gray-800">
                      {customer.profile.firstName && customer.profile.lastName
                        ? `${customer.profile.firstName} ${customer.profile.lastName}`
                        : "Guest"}
                    </td>
                    <td className="p-4">
                       <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {/* Placeholder image that looks like the image provided */}
                          <User size={18} className="text-gray-400" />
                          {/* In a real app, you'd use: 
                          <Image src={customer.image} alt={customer.name} width={32} height={32} className="rounded-full object-cover" /> 
                          */}
                       </div>
                    </td>
                    <td className="p-4">{customer.profile.phoneNumber}</td>
                    <td className="p-4">{customer.email}</td>
                    <td className="p-4">{customer.profile.addressLine}</td>
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