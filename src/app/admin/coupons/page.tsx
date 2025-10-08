// app/coupons/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Filter, Plus } from "lucide-react";

// --- MOCK DATA FOR COUPON TABLE ---
const coupons = [
  { id: 1, code: "SUMMER20", discount: "20%", type: "Percentage", uses: 150, expiry: "2025/08/30", status: "Active" },
  { id: 2, code: "WELCOME10", discount: "$10", type: "Fixed Amount", uses: 450, expiry: "2025/12/31", status: "Active" },
  { id: 3, code: "FREESHIP", discount: "Free Shipping", type: "Shipping", uses: 900, expiry: "2024/11/15", status: "Expired" },
  { id: 4, code: "FALLSALE", discount: "15%", type: "Percentage", uses: 80, expiry: "2025/10/31", status: "Active" },
  { id: 5, code: "SPRING5", discount: "$5", type: "Fixed Amount", uses: 230, expiry: "2025/05/01", status: "Expired" },
  { id: 6, code: "NEWYEAR25", discount: "25%", type: "Percentage", uses: 60, expiry: "2026/01/01", status: "Active" },
  { id: 7, code: "TESTCOUPON", discount: "5%", type: "Percentage", uses: 1, expiry: "2025/11/01", status: "Active" },
];

// Status color helper function (reusing styles from other tables)
const statusColor = (status: string) =>
  status === "Active"
    ? "bg-green-100 text-green-600"
    : "bg-red-100 text-red-600";

export default function CouponManagementPage() {
  const [selectedIds] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalItems = coupons.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startRange = (currentPage - 1) * rowsPerPage;
  const endRange = Math.min(currentPage * rowsPerPage, totalItems);
  
  const currentCoupons = coupons.slice(startRange, endRange);
  const isAllSelected = currentCoupons.length > 0 && currentCoupons.every((c) => selectedIds.includes(c.id));

  // Placeholder functions for selection logic
  const toggleSelectAll = () => {/* ... */};
  const toggleSelect = (id: number) => {/* ... */};


  return (
    <div className="p-4 min-h-screen">
      
      {/* --- Header: Title, Filters, & Add Coupon Button --- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Coupon</h1>
        <div className="flex items-center gap-4">
          
          {/* Filters Button */}
          <button className="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition">
            <Filter size={16} className="mr-1" />
            Filtres
          </button>

          {/* Add Coupon Button */}
          <Link href="/admin/coupons/add" passHref> {/* Assuming an add coupon page */}
            <button className="flex items-center bg-[#F6A5C1] text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-150">
                <Plus size={20} className="mr-1" /> Add Coupon
            </button>
          </Link>
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
                  <th className="p-4">Coupon Code</th>
                  <th className="p-4">Discount</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Uses</th>
                  <th className="p-4">Expiry Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-tr-xl text-center">Action</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                {currentCoupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-pink-50/20 transition duration-100">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(coupon.id)}
                        onChange={() => toggleSelect(coupon.id)}
                        className="form-checkbox h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                      />
                    </td>
                    <td className="p-4 font-mono font-bold text-gray-800">
                        {coupon.code}
                    </td>
                    <td className="p-4 font-semibold">{coupon.discount}</td>
                    <td className="p-4">{coupon.type}</td>
                    <td className="p-4">{coupon.uses}</td>
                    <td className="p-4">{coupon.expiry}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                          coupon.status
                        )}`}
                      >
                        {coupon.status}
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

            {/* Pagination Footer (Reusing the common pagination style) */}
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