"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { List, Grid, MoreVertical } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "@/api/product.api";

const statusColor = (stock: number) =>
  stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600";

export default function ProductTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [view, setView] = useState<"list" | "card">("list");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All Stock");

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        if (response.success && response.data) {
          setProducts(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on stock
  const filteredProducts =
    statusFilter === "All Stock"
      ? products
      : statusFilter === "In Stock"
      ? products.filter((p) => p.stock > 0)
      : products.filter((p) => p.stock === 0);

  // Pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startRange = (currentPage - 1) * rowsPerPage;
  const endRange = Math.min(currentPage * rowsPerPage, totalItems);
  const currentProducts = filteredProducts.slice(startRange, endRange);

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
    <div className="p-4 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Products</h2>
        <div className="flex items-center gap-4">
          {/* Stock filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 bg-white px-3 py-2 rounded-lg text-gray-700 font-medium transition duration-150"
          >
            <option value="All Stock" className="text-gray-500">
              All Stock
            </option>
            <option value="In Stock" className="text-green-600">
              In Stock
            </option>
            <option value="Out of Stock" className="text-red-600">
              Out of Stock
            </option>
          </select>

          {/* Add Product Button */}
          <Link href="/admin/products/add">
            <button className="flex items-center bg-[#F6A5C1] text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-150">
              + Add Product
            </button>
          </Link>

          {/* View toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              className={`p-2 transition-colors duration-150 ${
                view === "list"
                  ? "bg-pink-100 text-pink-600"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => setView("list")}
              aria-label="List view"
            >
              <List size={18} />
            </button>
            <button
              className={`p-2 transition-colors duration-150 ${
                view === "card"
                  ? "bg-pink-100 text-pink-600"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
              onClick={() => setView("card")}
              aria-label="Card view"
            >
              <Grid size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg">
        {/* List view */}
        {view === "list" ? (
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
                  <th className="p-4">ID</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 rounded-tr-xl text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 text-sm">
                {currentProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-pink-50/20 transition duration-100"
                  >
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
                        src={
                          `http://localhost:8080${product.productImages[0]?.productImage}` ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        width={32}
                        height={32}
                        className="rounded-full h-9 w-9 object-cover"
                      />
                      <span className="font-medium text-gray-800">
                        {product.name}
                      </span>
                    </td>
                    <td className="p-4">
                      {product.category?.category || "N/A"}
                    </td>
                    <td className="p-4">{product.brand?.brand || "N/A"}</td>
                    <td className="p-4">${Number(product.price).toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                          product.stock
                        )}`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
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
          </div>
        ) : (
          /* Card view */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
              >
                <div className="relative w-full h-60">
                  <Image
                    src={
                      `http://localhost:8080${product.productImages[0].productImage}` ||
                      "/placeholder.png"
                    }
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${statusColor(
                      product.stock
                    )}`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {product.category?.category}
                  </p>
                  <p className="text-base font-bold text-gray-900 mt-1">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {product.brand?.brand}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

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

          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-700">
              {startRange + 1}-{endRange} of {totalItems}
            </span>
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
  );
}
