import React from "react";
import Image from "next/image";
import { assets, brandList } from "@/app/assets/assets";

const Components = () => {
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

      <div className="bg-[var(--secondary)]/60 p-6 rounded-lg">
        <div className="overflow-x-auto scrollbar-hidden snap-x snap-mandatory">
          <div className="grid grid-flow-col auto-cols-[150px] gap-6 px-2">
            {brandList.map((brand) => (
              <div
                key={brand.title}
                className="w-[100px] h-[100px] flex items-center justify-center"
              >
                <Image
                  src={brand.Image}
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
