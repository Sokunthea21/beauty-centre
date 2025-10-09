"use client";
import React, { useEffect, useState } from "react";
import { assets } from "@/app/assets/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { getSliders } from "@/api/slider.api";

const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<import('swiper').Swiper | null>(null);
  const [sliderData, setSliderData] = useState([]);

  useEffect(() => {
    async function fetchSliders() {
      const response = await getSliders();

      setSliderData(response.data);
    }

    fetchSliders();
  }, []);

  const handlePaginationClick = (index: number) => {
    setCurrentSlide(index);
    swiperInstance?.slideToLoop(index); // Slide to corresponding looped index
  };

  return (
    <div className="container mx-auto relative mt-10 overflow-hidden">
      {/* Custom Navigation Arrows */}
      <div className="pl-4 absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button className="custom-prev bg-white/80 p-3 rounded-full shadow hover:bg-pink-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-pink-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <div className="pr-4 absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button className="custom-next bg-white/80 p-3 rounded-full shadow hover:bg-pink-500 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-pink-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5L15.75 12l-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        spaceBetween={30}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
        }}
        className="mySwiper"
      >
        {sliderData.map((slider: any) => (
          <SwiperSlide
            key={slider.id}
            className="relative min-w-full flex justify-center items-center"
          >
            <Image
              src={`http://localhost:8080${slider.sliderImage}`}
              alt={slider.title || "Slide Image"}
              width={800}
              height={400}
              style={{ width: "100%", height: "auto" }}
            />
            {/* <div className="absolute inset-0 flex flex-col justify-center p-20">
              {slider.heading && (
                <h1 className="max-w-[420px] text-2xl md:text-4xl font-bold text-[#e91e63] mb-2">
                  {slider.heading}
                </h1>
              )}
              {slider.description && (
                <p className="text-gray-700 text-lg mb-6">
                  {slider.description}
                </p>
              )}
              {slider.id === 1 && (
                <button className="bg-[var(--primary)] text-white w-[218px] px-6 py-2 rounded hover:bg-pink-500 transition">
                  Shop Now
                </button>
              )}
            </div> */}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handlePaginationClick(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index
                ? "bg-[var(--primary)] scale-125"
                : "bg-gray-500/30"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
