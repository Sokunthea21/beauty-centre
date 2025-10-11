"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/component";
import { getAllProducts } from "@/api/product.api";

type ViewMode = "grid-2" | "grid-3" | "grid-4" | "list";

interface ProductGridProps {
  selectedCategory?: number | null;
  selectedBrand?: number | null;
}

export default function ProductGrid({ selectedCategory, selectedBrand }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-2");
  const [currentPage, setCurrentPage] = useState(1);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);
      
      try {
        // Build query parameters based on props
        const params: any = {};
        
        if (selectedCategory !== null && selectedCategory !== undefined) {
          params.categoryId = selectedCategory;
        }
        
        if (selectedBrand !== null && selectedBrand !== undefined) {
          params.brandId = selectedBrand;
        }

        console.log('Fetching products with params:', params);
        
        const response = await getAllProducts(params);
        
        console.log('API Response:', response);
        
        setProductData(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
        setProductData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory, selectedBrand]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedBrand]);

  const itemsPerPage = 4;
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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="text-red-500 text-lg">⚠️</div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (productData.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <div className="text-gray-400 text-6xl">🔍</div>
          <p className="text-gray-600 text-lg">No products found</p>
          <p className="text-gray-500 text-sm">Try adjusting your filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header with view mode icons */}
      <div className="flex items-center justify-between mb-6 border-t border-gray-200 pt-4">
        <div className="flex items-center gap-1 text-gray-600">
          <span className="text-md font-medium tracking-wide text-[var(--primary)]">
            VIEW AS
          </span>

          <button 
            onClick={() => setViewMode("grid-2")} 
            aria-label="2 column grid view"
            className="p-1 hover:bg-gray-100 rounded transition"
          >
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

          <button 
            onClick={() => setViewMode("grid-3")} 
            aria-label="3 column grid view"
            className="p-1 hover:bg-gray-100 rounded transition"
          >
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

          <button 
            onClick={() => setViewMode("grid-4")} 
            aria-label="4 column grid view"
            className="p-1 hover:bg-gray-100 rounded transition"
          >
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

          <button 
            onClick={() => setViewMode("list")} 
            aria-label="list view"
            className="p-1 hover:bg-gray-100 rounded transition"
          >
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

        <div className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, productData.length)} of {productData.length} products
        </div>
      </div>

      {/* Product Grid */}
      <div className={`grid ${getGridCols()} gap-6`}>
        {visibleProducts.map((product: any, index) => (
          <ProductCard
            key={product.id ? `${product.id}-${index}` : `product-${index}`}
            productData={{
              _id: product.id?.toString() ?? "",
              name: product.name ?? "Unnamed Product",
              price: product.price ?? 0,
              description: product.description ?? "",
              image: [
                product.productImages?.[0]?.productImage ?? ""
              ],
              offerPrice: product.offerPrice ?? 0,
              rating: product.ratingSum ?? 0,
              ratingCount: product.ratingCount ?? 0
            }}
            isList={viewMode === "list"}
            isCompact={viewMode === "grid-2"}
            gridCols={viewMode}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-black transition"
            aria-label="Previous page"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`w-8 h-8 text-sm rounded-full transition ${
                index + 1 === currentPage
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handlePageChange(index + 1)}
              aria-label={`Page ${index + 1}`}
              aria-current={index + 1 === currentPage ? "page" : undefined}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed hover:text-black transition"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}