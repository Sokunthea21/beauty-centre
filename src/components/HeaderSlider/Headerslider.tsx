import React, { useState, useEffect } from "react";
import { assets } from "@/app/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    { id: 1, imgSrc: assets.Slider1 },
    { id: 2, imgSrc: assets.Slider2 },
    { id: 3, imgSrc: assets.Slider3 },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  return (
    <div className="relative overflow-hidden w-full mt-10">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full flex justify-center items-center"
          >
            <Image
              src={slide.imgSrc}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
