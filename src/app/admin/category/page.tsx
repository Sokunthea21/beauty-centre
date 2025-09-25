"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react"; // Using Plus for the Add Category button

// --- MOCK DATA FOR CATEGORY CARDS ---
const categories = [
  { id: 1, name: "Sunscreen", description: "Moisturizer", sku: "123456", image: "/category_sunscreen.jpg" },
  { id: 2, name: "Cleansing", description: "Moisturizer", sku: "123456", image: "/category_cleansing.jpg" },
  { id: 3, name: "Toner", description: "Moisturizer", sku: "123456", image: "/category_toner.jpg" },
  { id: 4, name: "Serum", description: "Moisturizer", sku: "123456", image: "/category_serum.jpg" },
  { id: 5, name: "Foam", description: "Moisturizer", sku: "123456", image: "/category_foam.jpg" },
  { id: 6, name: "lipstick", description: "Moisturizer", sku: "123456", image: "/category_lipstick.jpg" },
  { id: 7, name: "Masks", description: "Moisturizer", sku: "123456", image: "/category_mask.jpg" },
  { id: 8, name: "Cream", description: "Moisturizer", sku: "123456", image: "/category_cream.jpg" },
  { id: 9, name: "Eyes", description: "Moisturizer", sku: "123456", image: "/category_eyes.jpg" },
  // Add more categories as needed for pagination testing
];

export default function CategoryGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 3 columns, 2 rows as per image

  // Pagination Logic
  const totalItems = categories.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to render pagination dots (1, 2, ..., 7)
  const renderPagination = (): JSX.Element[] => {
    const pages: JSX.Element[] = [];
    const maxPagesToShow = 5; // e.g., 1, 2, ..., 7

    for (let i = 1; i <= totalPages; i++) {
        // Logic to show first few, last, and around current page
        if (i <= maxPagesToShow || i === totalPages || (i > currentPage - 1 && i < currentPage + 2)) {
            const isCurrent = i === currentPage;
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
            !(pages[pages.length - 1] && 
              (typeof (pages[pages.length - 1] as any)?.props?.children === "string" && (pages[pages.length - 1] as any)?.props?.children === '...')) &&
            i > maxPagesToShow &&
            i < totalPages
        ) {
            pages.push(<span key={`ellipsis-${i}`} className="px-2">...</span>);
        }
    }
    return pages;
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      
      {/* --- Header: Category Title, Filters, Add Category Button --- */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Category</h1>
        <div className="flex items-center gap-4">

          {/* Filters Button */}
          <button className="flex items-center bg-white border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0011 15.586V19h2v2h-2v-1.414a1 1 0 00-.293-.707l-6.414-6.414A1 1 0 013 6.586V4z"></path></svg>
            Filtres
          </button>
          
          {/* Add Category Button */}
          <Link href="/admin/category/add" passHref> {/* Assuming an add category page */}
            <button className="flex items-center bg-pink-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-150">
                <Plus size={20} className="mr-1" /> Add Category
            </button>
          </Link>
          {/* Note: The image for Category page does not show view toggle buttons (List/Grid) */}
        </div>
      </div>

      {/* --- Main Content: Category Grid Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
          >
            {/* Category Image Area */}
            <div className="relative w-full h-60"> {/* Fixed height for consistency */}
              <Image
                src={category.image}
                alt={category.name}
                layout="fill" // Fill the parent div
                objectFit="cover" // Cover the area without distortion
              />
            </div>
            
            {/* Category Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
              <p className="text-gray-500 text-sm">{category.description}</p>
              <p className="text-xs text-gray-400 mt-0.5">{category.sku}</p>
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