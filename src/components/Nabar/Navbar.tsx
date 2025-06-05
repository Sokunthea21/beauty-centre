import { assets } from "@/app/assets/assets";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const Navbar: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <header className="w-full px-5 lg:px-8 xl:px-[8%] py-4 z-50 bg-white shadow-xs">
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src={assets.Beauty_Center}
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-4 max-w-2xl">
            <div className="flex border-gray-300 rounded-full overflow-hidden border">
              <input
                type="text"
                placeholder="Search products, brands....."
                className="w-full px-4 py-2 text-lg focus:outline-none"
              />
              <button className="mr-4 my-2 rounded-full bg-[#F178A1] w-9 aspect-square flex items-center justify-center  group-hover:bg-lime-300 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1117 9a7.5 7.5 0 01-.35 7.65z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex space-x-6 text-sm text-gray-900 items-center">
            <div className="flex flex-col items-center">
              <a href="#">
                <Image
                  src={assets.wishlist}
                  alt="Wishlist"
                  className="h-[24px] w-auto"
                />
              </a>
              <span className="mt-2">WISHLIST</span>
            </div>
            <div className="flex flex-col items-center">
              <a href="#">
                <Image
                  src={assets.account}
                  alt="Account"
                  className="h-[24px] w-auto"
                />
              </a>
              <span className="mt-2">ACCOUNT</span>
            </div>
            <div className="flex flex-col items-center">
              <a href="#">
                <Image
                  src={assets.cart}
                  alt="Cart"
                  className="h-[24px] w-auto"
                />
              </a>
              <span className="mt-2">CART</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="bg-white">
          <div className="container mx-auto px-4 py-4 flex justify-center space-x-6 text-gray-900 text-lg">
            <a href="#" className="hover:text-pink-600">
              SKINCARE
            </a>
            <a href="#" className="hover:text-pink-600">
              HAIR & BODY
            </a>
            <a href="#" className="hover:text-pink-600">
              MAKEUP & TOOLS
            </a>
            <a href="#" className="hover:text-pink-600">
              NEW
            </a>
            <a href="#" className="hover:text-pink-600">
              BRAND
            </a>
            <a href="#" className="hover:text-pink-600">
              SUPPORT
            </a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
