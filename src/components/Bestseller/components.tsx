import React, { useState } from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { productData } from "@/app/assets/productData";
import ProductCard from "../ProductCard/component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";


type Product = {
  price: string;
  title: string;
  id: { toString: () => string };
  description: string;
  Image: string | { src: string };
};

const Bestseller: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  const handlePaginationClick = (index: number) => {
    setCurrentSlide(index);
    swiperInstance?.slideToLoop(index);
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={assets.bloomright}
            alt="Left Bloom"
            className="h-[50px] w-[60px]"
          />
          <h2 className="text-lg font-bold uppercase">Best Sellers</h2>
          <Image
            src={assets.bloomleft}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1 cursor-pointer hover:underline">
          See All
        </p>
      </div>

       <div className="relative">
        {/* Custom Prev Button */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
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

        {/* Custom Next Button */}
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
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

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          loop={true}
          spaceBetween={20}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.realIndex);
          }}
          className="mySwiper "
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1280: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
          }}
        >
          {productData.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard
                productData={{
                  _id: product.id.toString(),
                  name: product.title,
                  price: Number(product.price),
                  description: product.description,
                  offerPrice: Number(product.price),
                  image: [
                    typeof product.Image === "string"
                      ? product.Image
                      : product.Image?.src ?? "",
                  ],
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Pagination Dots Below Carousel */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(productData.length / 5) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePaginationClick(index * 5)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentSlide >= index * 5 && currentSlide < (index + 1) * 5
                    ? "bg-[var(--primary)] scale-125"
                    : "bg-gray-300"
                }`}
              ></button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Bestseller;
