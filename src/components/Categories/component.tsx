import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets, categoryList } from "@/app/assets/assets"; // Adjust if needed
import Link from "next/link";
import { getCategories } from "@/api/category.api";

const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();

      setCategoryData(response.data);
    }

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto py-12">
      {/* Section Title */}
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
        <Link href="/categories" className="mt-2 inline-block">
          <span className="text-sm text-gray-500 cursor-pointer hover:underline">
            See All
          </span>
        </Link>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
        {categoryData.map((cat: any, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="w-[126px] h-[126px] rounded-md bg-[#F1F1F1] flex items-center justify-center">
              <Image
                src={`http://localhost:8080${cat.categoryImage}`}
                width={100}
                height={100}
                className="object-contain transition-all duration-200 hover:scale-105"
                loading="lazy"
                alt={cat.category}
              />
            </div>
            <p className="text-lg text-black font-normal text-center leading-tight">
              {cat.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
