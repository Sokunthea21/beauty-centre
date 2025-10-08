"use client";

import { useState } from "react";
import ProductCard from "../ProductCard/component";
import { productData } from "@/app/assets/productData";

type ViewMode = "grid-2" | "grid-3" | "grid-4" | "list";

export default function ProductGrid() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-2");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = viewMode === "list" ? 4 : 4; // Adjust as needed for other modes
  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = productData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getGridCols = () => {
    switch (viewMode) {
      case "grid-2":
        return "grid-cols-1 md:grid-cols-2";
      case "grid-3":
        return "grid-cols-1 md:grid-cols-3";
      case "grid-4":
        return "grid-cols-1 md:grid-cols-3 lg:grid-cols-4";
      case "list":
        return "grid-cols-1";
      default:
        return "grid-cols-2";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 ">
      {/* Header with view mode icons */}
      <div className="flex items-center justify-between mb-6 border-t border-gray-200  pt-4">
        <div className="flex items-center gap-1 text-gray-600">
          <span className="text-md font-medium tracking-wide text-[var(--primary)]">
            VIEW AS
          </span>

          <button onClick={() => setViewMode("grid-2")}>
            <svg
              width="36"
              height="35"
              viewBox="0 0 36 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={viewMode === "grid-2" ? "text-black" : "text-gray-400"}
            >
              <rect
                x="0.711807"
                y="0.711807"
                width="33.9973"
                height="43.5773"
                stroke="currentColor"
                strokeWidth="1.42361"
                fill="none"
              />
              <rect
                x="6.43994"
                y="6.42773"
                width="9.66024"
                height="32.1435"
                fill="currentColor"
              />
              <rect
                x="19.3203"
                y="6.42773"
                width="9.66024"
                height="32.1435"
                fill="currentColor"
              />
            </svg>
          </button>

          <button onClick={() => setViewMode("grid-3")}>
            <svg
              width="50"
              height="35"
              viewBox="0 0 50 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={viewMode === "grid-3" ? "text-black" : "text-gray-400"}
            >
              <rect
                x="1.13271"
                y="0.711807"
                width="47.5764"
                height="43.5764"
                stroke="currentColor"
                strokeWidth="1.42361"
                fill="none"
              />
              <rect
                x="7.28223"
                y="6.39844"
                width="9.66024"
                height="32.2008"
                fill="currentColor"
              />
              <rect
                x="20.1626"
                y="6.39844"
                width="9.66024"
                height="32.2008"
                fill="currentColor"
              />
              <rect
                x="33.0427"
                y="6.39844"
                width="9.66024"
                height="32.2008"
                fill="currentColor"
              />
            </svg>
          </button>
          <button onClick={() => setViewMode("grid-4")}>
            <svg
              width="62"
              height="35"
              viewBox="0 0 62 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={viewMode === "grid-4" ? "text-black" : "text-gray-400"}
            >
              <rect
                x="1.13271"
                y="0.711807"
                width="59.7579"
                height="43.5773"
                stroke="currentColor"
                strokeWidth="1.42361"
                fill="none"
              />
              <rect
                x="6.86108"
                y="6.42773"
                width="9.66024"
                height="32.1435"
                fill="currentColor"
              />
              <rect
                x="19.7415"
                y="6.42773"
                width="9.66024"
                height="32.1435"
                fill="currentColor"
              />
              <rect
                x="32.6218"
                y="6.42773"
                width="9.66024"
                height="32.1435"
                fill="currentColor"
              />
              <rect
                x="45.502"
                y="6.42773"
                width="9.66024"
                height="32.1435"
                fill="currentColor"
              />
            </svg>
          </button>
          <button onClick={() => setViewMode("list")}>
            <svg
              width="49"
              height="35"
              viewBox="0 0 49 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={viewMode === "list" ? "text-black" : "text-gray-400"}
            >
              <rect
                x="1.31422"
                y="0.711807"
                width="46.8776"
                height="43.5773"
                stroke="currentColor"
                strokeWidth="1.42361"
                fill="none"
              />
              <rect
                x="7.04285"
                y="6.42773"
                width="35.4209"
                height="8.0502"
                fill="currentColor"
              />
              <rect
                x="7.04285"
                y="17.6973"
                width="35.4209"
                height="8.0502"
                fill="currentColor"
              />
              <rect
                x="7.04285"
                y="28.9688"
                width="35.4209"
                height="8.0502"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`grid ${getGridCols()} gap-6`}>
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={product.title + index}
            productData={{
              _id: product.id?.toString() ?? "",
              name: product.title ?? "Unnamed Product",
              price: 32,
              description: product.description ?? "",
              image: [
                typeof product.Image === "string"
                  ? product.Image
                  : product.Image?.src ?? "",
              ],
              offerPrice: 0,
            }}
            isList={viewMode === "list"} // If ProductCard handles layout difference
            isCompact={viewMode === "grid-2"} // For 2-column layout
            gridCols={viewMode} // Pass the current view mode
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-500 disabled:opacity-30"
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-8 h-8 text-sm rounded-full ${
              index + 1 === currentPage
                ? "bg-black text-white"
                : "text-gray-600"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-500 disabled:opacity-30"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
