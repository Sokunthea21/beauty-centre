"use client";

import React, { useState } from "react";
import Image from "next/image"; // For optimized image handling
import { MoreVertical } from "lucide-react"; // For the action menu icon

// --- TypeScript Interface for an Order ---
interface Order {
  id: string;
  productName: string; // Changed from 'product' to 'productName' for clarity
  productImage: string; // Added for the product image in the table
  date: string;
  price: number; // Changed to number for proper formatting
  method: string;
  status: "Delivered" | "Processing" | "Pending" | "Cancelled"; // Expanded status types
}

// --- Mock Data (Extended to include product images and various statuses) ---
const mockOrders: Order[] = [
  {
    id: "123456",
    productName: "Analog Table Clock",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🕰️",
    date: "24/02/2025",
    price: 15.5,
    method: "Cash",
    status: "Delivered",
  },
  {
    id: "123457",
    productName: "Digital Wall Art",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🖼️",
    date: "24/02/2025",
    price: 25.0,
    method: "Credit Card",
    status: "Processing",
  },
  {
    id: "123458",
    productName: "Vintage Radio",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=📻",
    date: "25/02/2025",
    price: 80.75,
    method: "PayPal",
    status: "Pending",
  },
  {
    id: "123459",
    productName: "Smart Home Speaker",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🔊",
    date: "25/02/2025",
    price: 49.99,
    method: "Cash",
    status: "Delivered",
  },
  {
    id: "123460",
    productName: "Desk Lamp",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=💡",
    date: "26/02/2025",
    price: 30.25,
    method: "Credit Card",
    status: "Processing",
  },
  {
    id: "123461",
    productName: "Ergonomic Chair",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🪑",
    date: "26/02/2025",
    price: 299.0,
    method: "PayPal",
    status: "Delivered",
  },
  {
    id: "123462",
    productName: "Portable Charger",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🔋",
    date: "27/02/2025",
    price: 19.99,
    method: "Cash",
    status: "Processing",
  },
  {
    id: "123463",
    productName: "Bluetooth Headphones",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🎧",
    date: "27/02/2025",
    price: 75.0,
    method: "Credit Card",
    status: "Pending",
  },
  {
    id: "123464",
    productName: "Coffee Machine",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=☕",
    date: "28/02/2025",
    price: 120.0,
    method: "Cash",
    status: "Delivered",
  },
  {
    id: "123465",
    productName: "Robot Vacuum",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🤖",
    date: "28/02/2025",
    price: 350.5,
    method: "PayPal",
    status: "Processing",
  },
  // Repeat for more rows to fill the table as in the image
  {
    id: "123466",
    productName: "Smartwatch",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=⌚",
    date: "01/03/2025",
    price: 199.99,
    method: "Credit Card",
    status: "Delivered",
  },
  {
    id: "123467",
    productName: "Gaming Console",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🎮",
    date: "01/03/2025",
    price: 499.0,
    method: "Cash",
    status: "Processing",
  },
  {
    id: "123468",
    productName: "Wireless Mouse",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=🖱️",
    date: "02/03/2025",
    price: 29.99,
    method: "PayPal",
    status: "Delivered",
  },
  {
    id: "123469",
    productName: "Mechanical Keyboard",
    productImage: "https://via.placeholder.com/40/F0E6EF?text=⌨️",
    date: "02/03/2025",
    price: 89.5,
    method: "Credit Card",
    status: "Processing",
  },
];

// Helper function to get status badge classes
const getStatusClasses = (status: Order["status"]) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Processing":
      return "bg-blue-100 text-blue-700"; // Changed to blue for Processing
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function RevenueOrderTable() {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (id: string) => {
    setSelectedOrders((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allOrderIds = new Set(mockOrders.map((order) => order.id));
      setSelectedOrders(allOrderIds);
    } else {
      setSelectedOrders(new Set());
    }
  };

  const isAllSelected =
    selectedOrders.size === mockOrders.length && mockOrders.length > 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      {/* Table Header with Title and View All Button */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">REVENUE ORDER</h3>
        <button className="px-4 py-2 text-sm bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
          View All
        </button>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="text-left">
            {/* Adjusted color for header text */}
            <tr className="bg-[#F6A5C1] text-black font-semibold text-xs">
              {/* Checkbox Header */}
              <th className="p-3 text-center rounded-tl-xl">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-pink-600 rounded"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold  tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold  tracking-wider">
                Products
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold  tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold  tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold tracking-wider">
                Method
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold  tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-center rounded-tr-xl text-xs font-semibold tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-gray-700 text-sm">
            {mockOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                {/* Row Checkbox */}
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-pink-600 rounded"
                    checked={selectedOrders.has(order.id)}
                    onChange={() => handleCheckboxChange(order.id)}
                  />
                </td>

                {/* Order ID */}
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">
                  {order.id}
                </td>

                {/* Product with Image */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      width={40}
                      height={40}
                      className="w-8 h-8 rounded-full object-cover mr-3 border border-gray-100"
                    />
                    <span className="text-gray-900">{order.productName}</span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {order.date}
                </td>

                {/* Price */}
                <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(order.price)}
                </td>

                {/* Method */}
                <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                  {order.method}
                </td>

                {/* Status Badge */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Action Button (MoreVertical Icon) */}
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <button className="text-gray-500 hover:text-gray-900 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
