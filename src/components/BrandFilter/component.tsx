import { getBrands } from "@/api/brand.api";
import { useEffect, useState } from "react";

export default function BrandFilter() {
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    async function fetchBrands() {
      const response = await getBrands();

      setBrandData(response.data);
    }
    
    fetchBrands();
  }, []);

  return (
    <div className="p-5 shadow-sm bg-white mb-5">
      <h2 className="uppercase mb-2 border-b border-b-gray-300 pb-3">BRAND</h2>
      <div className="max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
        <ul className="space-y-1">
          {brandData.map((brand: any) => (
            <li
              key={brand.id}
              className="cursor-pointer hover:text-pink-500 transition"
            >
              {brand.brand}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
