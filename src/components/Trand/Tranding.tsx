import React from "react";
import Image from "next/image";
import { assets, categories } from "@/app/assets/assets";

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
            src={assets.bloomright}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>
      </div>

      <div className="mx-auto grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src={assets.Trending_1}
            alt="Left Bloom"
            className="h-[862px] w-[724px]"
          />
        </div>
        <div className="flex w-[764px] flex-col items-start gap-5">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={assets.Trending_2}
              alt="Left Bloom"
              className="h-[420px] w-[764px]"
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Image
              src={assets.Trending_3}
              alt="Left Bloom"
              className="h-[420px] w-[764px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
