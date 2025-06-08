import React from "react";
import Image from "next/image";
import { assets, brandList } from "@/app/assets/assets";

const NewArrivals = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={assets.bloomright}
            alt="Left Bloom"
            className="h-[50px] w-[60px]"
          />
          <h2 className="text-lg font-bold uppercase">New Arrivals</h2>
          <Image
            src={assets.bloomleft}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">See All</p>
      </div>
      <div>
        <div className="grid grid-flow-col auto-cols-[150px] gap-6 px-2">
          {brandList.map((brand) => (
            <div key={brand.title} className="flex flex-col items-center"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
