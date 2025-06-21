'use client';
import { useMemo, useState } from "react";
import {
  LayoutGrid,
  List,
  Rows,
  Columns,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

const categories = [
  "Sunscreen",
  "Oil Cleansers",
  "Toners",
  "Serum",
  "Water Cleansers",
];

const brand = [
  "Anua",
  "Beauty of joseon",
  "Mary & May",
  "Skin1004",
  "innisfree",
];

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

const allProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `All-Around Safe Block Essence Sun SPF45+`,
  price: "$32.00",
  image: `/images/sunscreen-1${(i % 9) + 1}.jpg`,
  description: `The BENTON Aloe BHA Skin Toner is a hydrating and exfoliating toner that preps the skin for the rest of your skincare routine. Aloe vera soothes and moisturizes, salicylic acid exfoliates, reduces sebum, and treats acne-prone skin, and snail mucin helps with regenerating skin cells and improving skin elasticity. This toner is suitable for all skin types, especially those prone to acne or sensitivity.`,
}));

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState("Toners");
  const [view, setView] = useState("grid-cols-2");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openSections, setOpenSections] = useState({
    productType: false,
    ingredientType: false,
    skinType: true,
    priceRange: true,
  });

  const [currentPage, setCurrentPage] = useState(1); 
  const productsPerPage = 12;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return allProducts.slice(startIndex, endIndex);
  }, [currentPage, productsPerPage]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        className={`
          p-2
          rounded-full
          bg-gray-100
          text-gray-600
          hover:bg-gray-200
          focus:outline-none
          focus:ring-2
          focus:ring-gray-300
          transition-colors
          duration-200
          flex items-center justify-center
          disabled:opacity-50
          disabled:cursor-not-allowed
        `}
        disabled={currentPage === 1} // Disable if on the first page
        aria-label="Previous page"
      >
        {/* SVG icon for left arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
    );

    pageNumbers.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`
          px-4 py-2
          font-inter
          text-lg
          ${currentPage === 1 ? 'font-bold text-gray-900 underline' : 'text-gray-700'}
          hover:text-gray-900
          focus:outline-none
        `}
        aria-label="Page 1"
      >
        1
      </button>
    );

    if (currentPage > 3) {
      pageNumbers.push(
        <span key="ellipsis-start" className="px-2 text-lg font-inter text-gray-700">
          .....
        </span>
      );
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue;

      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`
            px-4 py-2
            font-inter
            text-lg
            ${currentPage === i ? 'font-bold text-gray-900 underline' : 'text-gray-700'}
            hover:text-gray-900
            focus:outline-none
          `}
          aria-label={`Page ${i}`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="ellipsis-end" className="px-2 text-lg font-inter text-gray-700">
          .....
        </span>
      );
    }

    if (totalPages > 1) {
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`
            px-4 py-2
            font-inter
            text-lg
            ${currentPage === totalPages ? 'font-bold text-gray-900 underline' : 'text-gray-700'}
            hover:text-gray-900
            focus:outline-none
          `}
          aria-label={`Page ${totalPages}`}
        >
          {totalPages}
        </button>
      );
    }

    pageNumbers.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        className={`
          p-2
          rounded-full
          bg-gray-100
          text-gray-600
          hover:bg-gray-200
          focus:outline-none
          focus:ring-2
          focus:ring-gray-300
          transition-colors
          duration-200
          flex items-center justify-center
          disabled:opacity-50
          disabled:cursor-not-allowed
        `}
        disabled={currentPage === totalPages} // Disable if on the last page
        aria-label="Next page"
      >
        {/* SVG icon for right arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-gray-800">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b">
        <h1 className="text-lg font-semibold text-rose-800">{selectedCategory}</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-60 pl-5 py-8 bg-white border-b md:border-b-0 border-gray-200 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "block" : "hidden"
        } md:block`} >
        
        <div className="md:sticky md:top-0">
        {/* Categories */}
          <div className="bg-white rounded-lg shadow-md p-4 w-auto​ mb-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">CATEGORIES</h2>
            <div className="relative h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-10rem)] pr-2">
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={`cursor-pointer text-sm ${
                        selectedCategory === cat
                          ? "text-rose-700 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setSelectedCategory(cat)} >
                      {cat}
                    </li>
                  ))}
                </ul>
              <div className="absolute right-0 top-0 h-40 w-1 bg-gray-200 rounded-full">
                <div className="absolute top-0 left-0 w-full h-17 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        {/* brand */}
          <div className="bg-white rounded-lg shadow-md p-4 w-auto​ mb-5">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">BRAND</h2>
            <div className="relative h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-10rem)] pr-2">
                  {brand.map((cat) => (
                    <li
                      key={cat}
                      className={`cursor-pointer text-sm ${
                        selectedCategory === cat
                          ? "text-rose-700 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setSelectedCategory(cat)} >
                      {cat}
                    </li>
                  ))}
                </ul>
              <div className="absolute right-0 top-0 h-40 w-1 bg-gray-200 rounded-full">
                <div className="absolute top-0 left-0 w-full h-17 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="border border-gray-100 rounded-sm p-5 shadow-md bg-white mb-5">
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-800">FILTERS</h2>

              {/* Product Type */}
              <div>
                <div
                  className="flex justify-between items-center font-medium cursor-pointer mt-4 border-b border-b-gray-300 pb-3"
                  onClick={() => toggleSection("productType")}
                >
                  <span>Product Type</span>
                  {openSections.productType ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openSections.productType && (
                  <div className="mt-2 space-y-2 text-gray-700">
                    {/* Product type options go here */}
                  </div>
                )}
              </div>

              {/* Ingredient Type */}
              <div>
                <div
                  className="flex justify-between items-center font-medium cursor-pointer mt-3 border-b border-b-gray-300 pb-3"
                  onClick={() => toggleSection("ingredientType")}
                >
                  <span>Ingredient Type</span>
                  {openSections.ingredientType ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openSections.ingredientType && (
                  <div className="mt-2 space-y-2 text-gray-700">
                    {/* Ingredient type options go here */}
                  </div>
                )}
              </div>

              {/* Skin Type */}
              <div>
                <div
                  className="flex justify-between items-center font-medium cursor-pointer mt-3"
                  onClick={() => toggleSection("skinType")}
                >
                  <span>Skin Type</span>
                  {openSections.skinType ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openSections.skinType && (
                  <div className="mt-3 space-y-3 text-gray-700">
                    {["All", "Combination/Oily", "Dry", "Normal", "Sensitive"].map(
                      (type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input type="checkbox" className="form-checkbox text-purple-400" />
                          <span>{type}</span>
                        </label>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Price Range */}
              <div>
                <div
                  className="flex justify-between items-center font-medium cursor-pointer mt-3 border-t border-t-gray-300 pt-3"
                  onClick={() => toggleSection("priceRange")}
                >
                  <span>Price Range</span>
                  {openSections.priceRange ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openSections.priceRange && (
                  <div className="mt-3 space-y-3 text-gray-700">
                    {["Under $25", "$25 - $50", "$50 - $100"].map((range) => (
                      <label key={range} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="price"
                          className="form-radio text-purple-400"
                        />
                        <span>{range}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Apply Button */}
              <button className="w-full border border-black text-black py-2 mt-4 hover:bg-gray-100 mb-10 rounded-sm">
                Apply
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 md:px-10 py-8">
        <div className="flex items-center justify-center border-b border-b-gray-300 pb-4 mb-6">
          <h1 className="text-lg font-semibold text-rose-800">{selectedCategory}</h1>
        </div>

      {/* View Controls */}
        <div className="flex items-center space-x-2 mb-5 flex-wrap">
          <span className="text-xs font-medium text-rose-800 mr-2">VIEW AS</span>

          {/* Visible on all screens */}
          <button onClick={() => setView("grid-cols-2")}>
            <Columns className={`w-5 h-5 ${view === "grid-cols-2" ? "text-black" : "text-gray-400"}`} />
          </button>
          <button onClick={() => setView("grid-cols-3")} className="hidden md:inline-flex" >
            <LayoutGrid className={`w-5 h-5 ${view === "grid-cols-3" ? "text-black" : "text-gray-400"}`} />
          </button>

          {/* Only show on md+ screens */}
          <button onClick={() => setView("grid-cols-4")} className="hidden md:inline-flex">
            <Rows className={`w-5 h-5 ${view === "grid-cols-4" ? "text-black" : "text-gray-400"}`} />
          </button>
          <button onClick={() => setView("list")}>
            <List className={`w-5 h-5 ${view === "list" ? "text-black" : "text-gray-400"}`} />
          </button>
        </div>

        {/* Product Grid */}
        <div
          className={`h-auto flex flex-col ${
            view === "list" ? "grid-cols-1 shadow-none" : view
          } gap-6 sm:gap-8 lg:gap-10 pb-10`}
        >
          <div className={`grid ${view} gap-6`}>
            {currentProducts.map((product) => (
              <div key={product.id} className={`h-auto flex flex-col rounded shadow ${
                view === "list" ? "flex-row items-start bg-white shadow-none" : "bg-white"
              }`}>
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className={`w-full object-contain ${
                  view === "list"
                    ? "w-full max-w-[150px] md:max-w-[230px] h-auto object-cover mr-4 flex-shrink-0" // Adjusted for flexible width
                    : "w-full object-contain"
                } `}
                />
                <div className={`p-3 ${ view === "list" ? "pt-0" : ""}`}>
                  <h3 className={`text-sm font-medium text-gray-800 ${
                    view === "list"
                      ? "text-base text-ellipsis overflow-hidden whitespace-nowrap"
                      : "text-sm"
                  }`}>{product.name}</h3>
                  {view === "list" && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-3 md:line-clamp-4">
                    {product.description}
                  </p>
                )}
                  <div className="text-yellow-500 mb-1">★★★★★ (0)</div>
                  <div className="text-lg font-semibold mb-2">{product.price}</div>
                  <button className={`mt-4 w-full border border-gray-800 text-sm py-2 hover:bg-gray-100 transition rounded ${
                    view === "list"
                      ? "border-gray-300 text-gray-700 md:max-w-[170px]" // Lighter border and text for list view button
                      : "border-gray-800 text-black"
                  }`}>
                    Add To Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pagination Section */}
        <div className="flex justify-center items-center space-x-1 sm:space-x-2 py-8">
          {renderPageNumbers()}
        </div>
      </main>
    </div>
  );
}
