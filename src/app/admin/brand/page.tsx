"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

// --- MOCK DATA FOR BRAND CARDS (Increased for better pagination demonstration) ---
const brands = [
  { id: 1, name: "Anua", productCount: 100, image: "/brand_anua.png" },
  { id: 2, name: "Beauty of Joseon", productCount: 100, image: "/brand_boj.png" },
  { id: 3, name: "Mary & May", productCount: 100, image: "/brand_marymay.png" },
  { id: 4, name: "Skin1004", productCount: 100, image: "/brand_skin1004.png" },
  { id: 5, name: "Innisfree", productCount: 100, image: "/brand_innisfree.png" },
  { id: 6, name: "COSRX", productCount: 100, image: "/brand_cosrx.png" },
  { id: 7, name: "Round Lab", productCount: 100, image: "/brand_roundlab.png" },
  // Adding more brands to demonstrate pagination over multiple pages (12 total items = 2 pages)
  { id: 8, name: "Pyunkang Yul", productCount: 100, image: "/brand_anua.png" },
  { id: 9, name: "Dr. Jart+", productCount: 100, image: "/brand_boj.png" },
  { id: 10, name: "Laneige", productCount: 100, image: "/brand_marymay.png" },
  { id: 11, name: "Sulwhasoo", productCount: 100, image: "/brand_skin1004.png" },
  { id: 12, name: "Missha", productCount: 100, image: "/brand_innisfree.png" },
];

export default function BrandGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 columns, 2 rows

  // Pagination Logic
  const totalItems = brands.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentBrands = brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- FIXED: Simplified and corrected pagination rendering ---
  const renderPagination = () => {
    // Only render controls if there is more than one page
    if (totalPages <= 1) return null;

    // Use a simpler approach to render page buttons without complex ellipsis logic
    // since the total number of pages is likely small in most admin interfaces.
    // If you need complex ellipsis, a dedicated library or robust implementation is better.
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      const isCurrent = i === currentPage;
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`h-7 w-7 rounded-full text-sm font-medium transition duration-150 ${
            isCurrent
              ? 'bg-[#F6A5C1] text-white' // Use theme color
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-500 disabled:opacity-30 h-7 w-7 flex items-center justify-center"
          aria-label="Previous Page"
        >
          &lt;
        </button>

        {/* Page Number Buttons */}
        <div className="flex items-center gap-1">
          {pages}
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-500 disabled:opacity-30 h-7 w-7 flex items-center justify-center"
          aria-label="Next Page"
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 min-h-screen">
      
      {/* --- Header: Brand Title & Add Brand Button --- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Brand</h1>
        <div className="flex items-center gap-4">
          
          {/* Add Brand Button */}
          <Link href="/admin/brand/add" passHref>
            <button className="flex items-center bg-[#F6A5C1] text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-150">
              <Plus size={20} className="mr-1" /> Add Brand
            </button>
          </Link>
        </div>
      </div>

      {/* --- Main Content: Brand Grid Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBrands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden transition duration-300 hover:shadow-lg"
          >
            {/* Brand Image/Logo Area */}
            <div className="relative w-full h-60 p-10 flex items-center justify-center"> {/* Added padding for logos */}
              <Image
                src={brand.image}
                alt={brand.name}
                layout="fill"
                objectFit="contain" // Use 'contain' for logos to prevent cropping and respect aspect ratio
                className="p-10" // Padding on the image for better logo display
              />
            </div>
            
            {/* Brand Info */}
            <div className="p-8">
              <h3 className="text-lg font-semibold text-gray-800">
                {brand.name}
              </h3>
              <p className="text-gray-500 text-sm">
                Product ({brand.productCount})
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Pagination Controls --- */}
      <div className="flex justify-center mt-8">
        {renderPagination()}
      </div>
    </div>
  );
}