import React from "react";
import Image from "next/image";
import { assets, categories } from "@/app/assets/assets";

const Spotlight = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={assets.bloomright}
            alt="Left Bloom"
            className="h-[50px] w-[60px]"
          />
          <h2 className="text-lg font-bold uppercase">In The Spotlight</h2>
          <Image
            src={assets.bloomleft}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>
        <p className="text-sm text-gray-500">See All</p>
      </div>

      <div className="mx-auto grid grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="relative transition-all duration-200 hover:shadow-lg md:hover:scale-105">
          <Image
            src={assets.Spotlight_1}
            alt="Mary & May Products"
            className="w-full h-auto object-cover"
          />

          {/* Text Overlay */}
          <div className="absolute bottom-4 left-6 text-black">
            <h3 className="text-lg md:text-xl font-bold">
              Cracking the Coconut Code
            </h3>
            <p className="text-sm md:text-base">
              Reveal your skin's natural glow with our Lotus Glow Kit.
            </p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="relative transition-all duration-200 hover:shadow-lg md:hover:scale-105">
          <Image
            src={assets.Spotlight_2}
            alt="TOCOBO Products"
            className="w-full h-auto object-cover"
          />
          <div>
            <div className="absolute bottom-4 left-6 text-black">
              <h3 className="text-lg md:text-xl font-bold">
                Cracking the Coconut Code
              </h3>
              <p className="text-sm md:text-base">
                Reveal your skin's natural glow with our Lotus Glow Kit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
