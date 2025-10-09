import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets, brandList } from "@/app/assets/assets";
import { getBrands } from "@/api/brand.api";

const Components = () => {
  const [brandData, setBrandData] = useState([]);

  useEffect(() => {
    async function fetchBrands() {
      const response = await getBrands();

      setBrandData(response.data);
    }

    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={assets.bloomright}
            alt="Left Bloom"
            className="h-[50px] w-[60px]"
          />
          <h2 className="text-lg font-bold uppercase">Brand</h2>
          <Image
            src={assets.bloomleft}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>
      </div>

      <div className="bg-[var(--secondary)]/60 p-6">
        <div className="overflow-x-auto scrollbar-hidden snap-x snap-mandatory">
          <div className="grid grid-flow-col auto-cols-[150px] gap-6 px-2">
            {brandData.map((brand: any, index) => (
              <div
                key={index}
                className="w-[100px] h-[100px] flex items-center justify-center"
              >
                <Image
                  src={`http://localhost:8080${brand.brandImage}`}
                  alt={brand.title}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Components;
