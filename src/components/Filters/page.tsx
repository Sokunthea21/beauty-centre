import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

type Section = "productType" | "ingredientType" | "skinType" | "priceRange";

interface OpenSections {
  productType: boolean;
  ingredientType: boolean;
  skinType: boolean;
  priceRange: boolean;
}

const Filters: React.FC = () => {
  const [openSections, setOpenSections] = useState<OpenSections>({
    productType: false,
    ingredientType: false,
    skinType: false,
    priceRange: false,
  });

  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const skinTypes: string[] = ["All", "Combination/Oily", "Dry", "Normal", "Sensitive"];
  const priceRanges: string[] = ["Under $25", "$25 - $50", "$50 - $100"];

  const toggleSection = (section: Section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="border border-gray-100 rounded-sm p-5 shadow-sm bg-white mb-5">
      <div className="mt-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">FILTERS</h2>

        {/* Skin Type Filter */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center font-medium cursor-pointer border-b border-b-gray-300 pb-3"
            onClick={() => toggleSection("skinType")}
          >
            <span>Skin Type</span>
            {openSections.skinType ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {openSections.skinType && (
            <div className="mt-3 space-y-2 text-gray-700">
              {skinTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <input type="checkbox" id={type} className="form-checkbox text-purple-400" />
                  <label htmlFor={type}>{type}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="mb-4">
          <div
            className="flex justify-between items-center font-medium cursor-pointer border-b border-b-gray-300 pb-3"
            onClick={() => toggleSection("priceRange")}
          >
            <span>Price Range</span>
            {openSections.priceRange ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {openSections.priceRange && (
            <div className="mt-3 space-y-2 text-gray-700">
              {priceRanges.map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={range}
                    name="price"
                    value={range}
                    checked={selectedPrice === range}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="form-radio text-purple-400"
                  />
                  <label htmlFor={range}>{range}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
