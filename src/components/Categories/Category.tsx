import React from "react";
import Image from "next/image";
import { assets, categoryList } from "@/app/assets/assets"; // Adjust if needed

const Categories = () => {
  return (
    <section className="py-12">
      {/* Section Heading */}
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={assets.bloomright}
            alt="Left Bloom"
            className="h-[50px] w-[60px]"
          />
          <h2 className="text-lg font-bold uppercase">Categories</h2>
          <Image
            src={assets.bloomleft}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">See All</p>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
        {categoryList.map((cat, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="w-[126px] h-[126px] rounded-lg bg-[#F1F1F1] flex items-center justify-center">
              <Image
                src={cat.Image}
                width={100}
                height={100}
                className="object-contain transition-all duration-200 hover:scale-105"
                loading="lazy"
                alt={cat.title}
              />
            </div>
            <p className="text-lg text-black font-normal text-center leading-tight">
              {cat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
