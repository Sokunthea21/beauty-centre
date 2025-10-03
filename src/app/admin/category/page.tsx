"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react"; // Using Plus for the Add Category button

// --- MOCK DATA FOR CATEGORY CARDS ---
const categories = [
  {
    id: 1,
    name: "Sunscreen",
    description: "Moisturizer",
    sku: "SKU-S-1001",
    image: "/category_sunscreen.jpg",
  },
  {
    id: 2,
    name: "Cleansing",
    description: "Moisturizer",
    sku: "SKU-C-1002",
    image: "/category_cleansing.jpg",
  },
  {
    id: 3,
    name: "Toner",
    description: "Moisturizer",
    sku: "SKU-T-1003",
    image: "/category_toner.jpg",
  },
  {
    id: 4,
    name: "Serum",
    description: "Moisturizer",
    sku: "SKU-SE-1004",
    image: "/category_serum.jpg",
  },
  {
    id: 5,
    name: "Foam",
    description: "Moisturizer",
    sku: "SKU-F-1005",
    image: "/category_foam.jpg",
  },
  {
    id: 6,
    name: "Lipstick",
    description: "Moisturizer",
    sku: "SKU-L-1006",
    image: "/category_lipstick.jpg",
  },
  {
    id: 7,
    name: "Masks",
    description: "Moisturizer",
    sku: "SKU-M-1007",
    image: "/category_mask.jpg",
  },
  {
    id: 8,
    name: "Cream",
    description: "Moisturizer",
    sku: "SKU-CR-1008",
    image: "/category_cream.jpg",
  },
  {
    id: 9,
    name: "Eyes",
    description: "Moisturizer",
    sku: "SKU-E-1009",
    image: "/category_eyes.jpg",
  },
  // Added 3 more for a cleaner page split (12 total items = 2 pages of 6)
  {
    id: 10,
    name: "Lotion",
    description: "Moisturizer",
    sku: "SKU-LO-1010",
    image: "/category_sunscreen.jpg",
  },
  {
    id: 11,
    name: "Oil",
    description: "Moisturizer",
    sku: "SKU-O-1011",
    image: "/category_cleansing.jpg",
  },
  {
    id: 12,
    name: "Packs",
    description: "Moisturizer",
    sku: "SKU-P-1012",
    image: "/category_toner.jpg",
  },
];

export default function CategoryGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 columns, 2 rows

  // Pagination Logic
  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- FIXED: Implementation of handlePageChange ---
  function handlePageChange(page: number): void {
    // Ensure the new page number is within the valid range
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return (
    <div className="p-4 min-h-screen">
      {/* --- Header: Category Title, Filters, Add Category Button --- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Category</h1>
        <div className="flex items-center gap-4">
          {/* Add Category Button */}
          <Link href="/admin/category/add" passHref>
            <button className="flex items-center bg-[#F6A5C1] text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-150">
              <Plus size={20} className="mr-1" /> Add Category
            </button>
          </Link>
        </div>
      </div>

      {/* --- Main Content: Category Grid Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition duration-300 hover:shadow-lg"
          >
            {/* Category Image Area */}
            <div className="relative w-full h-60">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill" // Fill the parent div
                objectFit="cover" // Cover the area without distortion
              />
            </div>

            {/* Category Info */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
              {/* Using SKU property for the sub-text */}
              <p className="text-xs text-gray-400 mt-0.5">{category.sku}</p> 
            </div>
          </div>
        ))}
      </div>

      {/* --- Pagination Controls (FIXED: Only rendered once) --- */}
      {totalPages > 1 && ( // Only show pagination if there is more than 1 page
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-500 disabled:opacity-30 p-2"
            aria-label="Previous Page"
          >
            &lt;
          </button>

          {/* Page Number Buttons */}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 text-sm rounded-full ${
                index + 1 === currentPage
                  ? "bg-[#F6A5C1] text-white font-bold" // Use the theme color for active
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-500 disabled:opacity-30 p-2"
            aria-label="Next Page"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}