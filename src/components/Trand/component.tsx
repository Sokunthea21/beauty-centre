import React from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";

const Trending = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Image
            src={assets.bloomright}
            alt="Left Bloom"
            className="h-[50px] w-[60px]"
          />
          <h2 className="text-lg font-bold uppercase">Trending</h2>
          <Image
            src={assets.bloomleft}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Large Image */}
        <div>
          <a href="#">
            <Image
              src={assets.Trending_1}
              alt="Trending 1"
              className="w-full h-[700px] md:h-[704px] object-cover transition-all duration-200 hover:shadow-lg md:hover:scale-105"
            />
          </a>
        </div>

        {/* Right Two Stacked Images */}
        <div className="flex flex-col gap-6">
          <a href="#">
            <Image
              src={assets.Trending_2}
              alt="Trending 2"
              className="w-full h-[340px] md:h-[340px] object-cover transition-all duration-200 hover:shadow-lg md:hover:scale-105"
            />
          </a>

          <a href="#">
            <Image
              src={assets.Trending_3}
              alt="Trending 3"
              className="w-full h-[340px] md:h-[340px] object-cover transition-all duration-200 hover:shadow-lg md:hover:scale-105"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Trending;
