import { getBrands } from "@/api/brand.api";
import { useEffect, useState } from "react";

interface BrandFilterProps {
  selectedBrand: number | null;
  onSelectBrand: (id: number | null) => void;
}

export default function BrandFilter({
  selectedBrand,
  onSelectBrand,
}: BrandFilterProps) {
  const [brandData, setBrandData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await getBrands();
        setBrandData(response.data || []);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    }

    fetchBrands();
  }, []);

  return (
    <div className="p-5 shadow-sm bg-white mb-5 rounded-lg">
      <h2 className="uppercase mb-2 border-b border-b-gray-300 pb-3 font-semibold">
        BRAND
      </h2>

      <div className="max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
        <ul className="space-y-1">
          {brandData.map((brand: any) => (
            <li key={brand.id}>
              <button
                onClick={() =>
                  onSelectBrand(selectedBrand === brand.id ? null : brand.id)
                }
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedBrand === brand.id
                    ? "bg-pink-500 text-white font-medium"
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                }`}
              >
                {brand.brand}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
