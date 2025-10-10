"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MoreVertical, Filter } from "lucide-react";
import { getOrders } from "@/api/cart.api"; // adjust path if needed

interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: string;
    stock: number;
    image?: string; // optional if you have images
  };
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  customerId: number;
  pickerName: string;
  pickerContact: string;
  deliveryAddress: string;
  deliveryFee: string;
  subTotal: string;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  shippedAt: string | null;
  deliveredAt: string | null;
  comment: string;
  orderItems: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export default function OrderListTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data ? [response.data] : []); // adjust if API returns array
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startRange = (currentPage - 1) * rowsPerPage;
  const endRange = Math.min(currentPage * rowsPerPage, totalItems);
  const currentOrders = orders.slice(startRange, endRange);

  const isAllSelected = currentOrders.length > 0 && currentOrders.every((o) => selectedIds.includes(o.id));
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(prev => prev.filter(id => !currentOrders.some(o => o.id === id)));
    } else {
      setSelectedIds(prev => [...prev, ...currentOrders.filter(o => !prev.includes(o.id)).map(o => o.id)]);
    }
  };
  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const statusColor = (status: string) =>
    status === "paid" || status === "Delivered"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600";

  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <div className="p-4 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Orders</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition">
            <Filter size={16} className="mr-1" />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
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
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Products</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4 rounded-tr-xl text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-pink-50/20 transition duration-100">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(order.id)}
                      onChange={() => toggleSelect(order.id)}
                      className="form-checkbox h-4 w-4 text-pink-500 rounded border-gray-300 focus:ring-pink-500"
                    />
                  </td>
                  <td className="p-4 font-mono">{order.id}</td>
                  <td className="p-4">{order.pickerName}</td>
                  <td className="p-4">
                    {order.orderItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <span>{item.product.name} x{item.quantity}</span>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-semibold">${parseFloat(order.totalAmount).toFixed(2)}</td>
                  <td className="p-4">{order.paymentMethod || "N/A"}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                      {order.status}
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

          {/* Pagination */}
          <div className="flex justify-end items-center px-4 py-3 border-t text-sm text-gray-600">
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
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">{startRange + 1}-{endRange} of {totalItems}</span>
              <div className="flex items-center gap-1">
                <button
                  className="p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition duration-150"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >&lt;</button>
                <button
                  className="p-1 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition duration-150"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >&gt;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
