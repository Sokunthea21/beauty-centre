"use client";

import { useState } from "react";
import Image from "next/image";
import { List, Grid } from "lucide-react";
import Link from "next/dist/client/link";

const products = [
  {
    id: 123451,
    name: "Analog Table Clock",
    date: "24/02/2025",
    price: 15.5,
    method: "Cash",
    status: "Delivered",
    image: "/clock1.jpg",
  },
  {
    id: 123452,
    name: "Analog Table Clock",
    date: "24/02/2025",
    price: 15.5,
    method: "Cash",
    status: "Processing",
    image: "/clock2.jpg",
  },
  {
    id: 123453,
    name: "Analog Table Clock",
    date: "24/02/2025",
    price: 15.5,
    method: "Cash",
    status: "Delivered",
    image: "/clock3.jpg",
  },
  {
    id: 123454,
    name: "Analog Table Clock",
    date: "24/02/2025",
    price: 15.5,
    method: "Cash",
    status: "Processing",
    image: "/clock4.jpg",
  },
  {
    id: 123455,
    name: "Analog Table Clock",
    date: "24/02/2025",
    price: 15.5,
    method: "Cash",
    status: "Delivered",
    image: "/clock1.jpg",
  },
  {
    id: 123456,
    name: "Analog Table Clock",
    date: "24/02/2025",
    price: 15.5,
    method: "Cash",
    status: "Processing",
    image: "/clock2.jpg",
  },
  {
    id: 123457,
    name: "Analog Table Clock",
    date: "24/02/2025",
    price: 15.5,
    method: "Cash",
    status: "Delivered",
    image: "/clock3.jpg",
  },
];

const statusColor = (status: string) =>
  status === "Delivered"
    ? "bg-green-100 text-green-600"
    : "bg-blue-100 text-blue-600";

export default function ProductTable() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [view, setView] = useState<"list" | "card">("list");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All Status");

  // filter products
  const filteredProducts =
    statusFilter === "All Status"
      ? products
      : products.filter((p) => p.status === statusFilter);

  // pagination
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const isAllSelected = currentProducts.every((p) =>
    selectedIds.includes(p.id)
  );

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentProducts.some((p) => p.id === id))
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...currentProducts.filter((p) => !prev.includes(p.id)).map((p) => p.id),
      ]);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4">
      {/* Header stays OUTSIDE */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex items-center gap-2">
          {/* Always include All Status */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-1 rounded text-gray-600"
          >
            <option>Filtres</option>
            <option>Delivered</option>
            <option>Processing</option>
          </select>

          <Link href="/admin/products/add">
            <button className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600">
              + Add Product
            </button>
          </Link>

          <div className="flex border rounded overflow-hidden">
            <button
              className={`p-2 ${view === "list" ? "bg-gray-100" : ""}`}
              onClick={() => setView("list")}
            >
              <List size={18} />
            </button>
            <button
              className={`p-2 ${view === "card" ? "bg-gray-100" : ""}`}
              onClick={() => setView("card")}
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white shadow rounded-lg p-4">
        {/* List view */}
        {view === "list" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-pink-200 text-left">
                <tr>
                  <th className="p-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Products</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 border-b">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                      />
                    </td>
                    <td className="p-3">{product.id}</td>
                    <td className="p-3 flex items-center gap-2">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span>{product.name}</span>
                    </td>
                    <td className="p-3">{product.date}</td>
                    <td className="p-3">${product.price.toFixed(2)}</td>
                    <td className="p-3">{product.method}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${statusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="p-3">•••</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Card view */
          /* Card view */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                // Re-styling the card container for a cleaner look
                className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
              >
                {/* Product Image Area - now with status badge overlay */}
                <div className="relative w-full h-60">
                  {" "}
                  {/* Fixed height for consistency */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill" // Fill the parent div
                    objectFit="cover" // Cover the area without distortion
                  />
                  {/* Status Badge - positioned absolutely on the image */}
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${statusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>

                {/* Product Details - placed below the image */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{product.date}</p>{" "}
                  {/* Using 'description' for 'Moisturizer' */}
                  <p className="text-base font-bold text-gray-900 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{product.method}</p>{" "}
                  {/* Using 'sku' for '123456' */}
                  {/* Checkbox (optional - could be moved to an overlay or action menu if needed) */}
                  {/* If you want the checkbox, you might put it in an absolute position in the top-left of the image div as well */}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span>
              {currentPage}-
              {Math.min(currentPage * rowsPerPage, filteredProducts.length)} of{" "}
              {filteredProducts.length}
            </span>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              ‹
            </button>
            <button
              className="px-2 py-1 border rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
