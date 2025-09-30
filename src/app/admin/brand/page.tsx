"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

// --- MOCK DATA FOR BRAND CARDS ---
const brands = [
  { id: 1, name: "Anua", productCount: 100, image: "/brand_anua.png" },
  { id: 2, name: "Beauty of Joseon", productCount: 100, image: "/brand_boj.png" },
  { id: 3, name: "Mary & May", productCount: 100, image: "/brand_marymay.png" },
  { id: 4, name: "Skin1004", productCount: 100, image: "/brand_skin1004.png" },
  { id: 5, name: "Innisfree", productCount: 100, image: "/brand_innisfree.png" },
  { id: 6, name: "COSRX", productCount: 100, image: "/brand_cosrx.png" },
  { id: 7, name: "Round Lab", productCount: 100, image: "/brand_roundlab.png" },
  // Add more brands for pagination testing
];

export default function BrandGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 columns, 2 rows as per image

  // Pagination Logic
  const totalItems = brands.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentBrands = brands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to render pagination dots (reused from previous components)
  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5; 

    for (let i = 1; i <= totalPages; i++) {
        const isCurrent = i === currentPage;
        
        // Simplified logic to handle ellipses for the final look
        if (i <= maxPagesToShow || i === totalPages || (i > currentPage - 1 && i < currentPage + 2)) {
            pages.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`h-7 w-7 rounded-full text-sm font-medium transition duration-150 ${
                        isCurrent 
                            ? 'bg-pink-500 text-white' 
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {i}
                </button>
            );
        } else if (
            !(
                pages[pages.length - 1] &&
                (pages[pages.length - 1] as any).type === "span" &&
                (pages[pages.length - 1] as any).props &&
                (pages[pages.length - 1] as any).props.children === "..."
            )
        ) {
            pages.push(<span key={`ellipsis-${i}`} className="px-2">...</span>);
        }
    }
    return pages;
  };

  return (
    <div className="p-4 min-h-screen">
      
      {/* --- Header: Brand Title & Add Brand Button --- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Brand</h1>
        <div className="flex items-center gap-4">
          {/* Note: Filters button is absent in the Brand image, only the Add Brand button is present */}
          
          {/* Add Brand Button */}
          <Link href="/admin/brand/add" passHref> {/* Assuming an add brand page */}
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
            <div className="relative w-full h-60">
              {/* Note: Using a simple Image component here. For real logos, you might use a specific dimension */}
              <Image
                src={brand.image}
                alt={brand.name}
                layout="fill" 
                objectFit="cover" // Ensure logo fits without cropping
                className="cover"
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

      {/* --- Pagination Dots --- */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-1">
            {renderPagination()}
        </div>
      </div>
    </div>
  );
}