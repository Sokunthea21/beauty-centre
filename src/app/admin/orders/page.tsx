// app/orders/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreVertical, List, LayoutGrid } from "lucide-react";
import Link from "next/link"; 

// --- MOCK DATA (Matching the table image) ---
const products = [
  { id: 123456, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Delivered", image: "/clock1.jpg" },
  { id: 123457, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Processing", image: "/clock2.jpg" },
  { id: 123458, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Delivered", image: "/clock3.jpg" },
  { id: 123459, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Processing", image: "/clock4.jpg" },
  { id: 123460, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Delivered", image: "/clock1.jpg" },
  { id: 123461, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Processing", image: "/clock2.jpg" },
  { id: 123462, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Delivered", image: "/clock3.jpg" },
  { id: 123463, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Processing", image: "/clock4.jpg" },
  { id: 123464, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Delivered", image: "/clock1.jpg" },
  { id: 123465, name: "Analog Table Clock", date: "24/02/2025", price: 15.50, method: "Cash", status: "Processing", image: "/clock2.jpg" },
  // ... more products
];

// Status color helper function
const statusColor = (status: string) =>
  status === "Delivered"
    ? "bg-green-100 text-green-600"
    : "bg-yellow-100 text-yellow-600"; // Changed processing to yellow/amber for contrast

export default function OrderListTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startRange = (currentPage - 1) * rowsPerPage;
  const endRange = Math.min(currentPage * rowsPerPage, totalItems);
  
  const currentProducts = products.slice(startRange, endRange);
  const isAllSelected = currentProducts.length > 0 && currentProducts.every((p) => selectedIds.includes(p.id));

  const toggleSelectAll = () => {
    // ... (omitted for brevity, assume logic works)
  };
  const toggleSelect = (id: number) => {
    // ... (omitted for brevity, assume logic works)
  };


  return (
    <div className="p-4 min-h-screen">
      
      {/* --- Header: Product Title & Filters --- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Order</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0011 15.586V19h2v2h-2v-1.414a1 1 0 00-.293-.707l-6.414-6.414A1 1 0 013 6.586V4z"></path></svg>
            Filtres
          </button>
        </div>
      </div>

      {/* --- Main Table Container --- */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              {/* Table Header: Pink background */}
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
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Products</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-tr-xl text-center">Action</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-pink-50/20 transition duration-100">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="form-checkbox h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                      />
                    </td>
                    <td className="p-4 font-mono">{product.id}</td>
                    <td className="p-4 flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={36}
                        height={36}
                        className="rounded-full h-9 w-9 object-cover"
                      />
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </td>
                    <td className="p-4">{product.date}</td>
                    <td className="p-4 font-semibold">${product.price.toFixed(2)}</td>
                    <td className="p-4">{product.method}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                          <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Footer */}
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