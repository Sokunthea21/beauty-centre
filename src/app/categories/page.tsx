"use client";
import { useState } from "react";
import Layout from "../../components/Layout/component";
import CategorySidebar from "../../components/CategorySidebar/component";
import BrandFilter from "../../components/BrandFilter/component";
import Filters from "../../components/Filters/component";
import ProductGrid from "../../components/ProductGrid/page";

// Funnel Icon Component
const FunnelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16l-5.333 8L9.333 12L4 4zM7 17v4M17 17v4" />
  </svg>
);

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Define the exact width for the mobile drawer to match the visual
  const drawerWidth = "w-[280px]";

  return (
    <Layout title="Sunscreen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
        {/* Filter Toggle Button (Mobile Only) */}
        <div className="w-full flex justify-start mb-4 md:hidden">
          <button
            onClick={toggleFilters}
            className="flex items-center space-x-2 text-lg font-medium text-gray-600 border border-gray-300 p-2 rounded-lg hover:bg-gray-50 transition"
          >
            <FunnelIcon className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* MOBILE FILTER DRAWER - External Close Button Structure */}
        <div
          className={`
                        fixed top-0 bottom-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
                        ${drawerWidth} 
                        md:relative md:block md:w-[19%] md:mr-5 md:space-y-6 md:sticky md:top-6 md:z-10 md:h-fit
                        ${
                          isFilterOpen
                            ? "translate-x-0"
                            : "-translate-x-full md:translate-x-0"
                        }
                        ${!isFilterOpen && "hidden md:block"} 
                    `}
        >
          {/* Dark Close Bar (Fixed position relative to the viewport) */}
          {isFilterOpen && (
            <div
              className={`fixed top-0 md:hidden z-50`}
              style={{ left: "280px" }}
            >
              <button
                onClick={toggleFilters}
                // Dark square styling for the close button
                className="h-14 w-14 flex items-center justify-center bg-gray-800 text-white"
                aria-label="Close filters"
              >
                {/* Close Icon (X) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
  
          {/* Filter Content Panel (White background, full height) */}
          <div className=" h-full overflow-y-auto">
            {/* Filter Content: padding starts here */}
            <div className="p-4 space-y-6 pb-20">
              <CategorySidebar />
              <BrandFilter />
              <Filters />
            </div>
          </div>
        </div>

        {/* Product Grid Section */}
        <div className="w-full md:w-[80%]">
          <ProductGrid />
        </div>

        {/* Backdrop Overlay */}
        {isFilterOpen && (
          <div
            onClick={toggleFilters}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </div>
    </Layout>
  );
}
