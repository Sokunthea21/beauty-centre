// src/components/Navbar/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { assets } from "@/app/assets/assets";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getAccountHref = () => {
    if (loading) return "admin/login";
    if (!user || !user.emailVerified) return "admin/login";
    if (user.email === "ngylyteng@gmail.com") return "admin/login";
    return "admin/myacc";
  };

  // Dropdown items
  const dropdownItems: Record<string, { name: string; href: string }[]> = {
    SKINCARE: [
      { name: "Cleansers", href: "/skincare/cleansers" },
      { name: "Moisturizers", href: "/skincare/moisturizers" },
      { name: "Sunscreen", href: "/skincare/sunscreen" },
    ],
    "HAIR & BODY": [
      { name: "Shampoo", href: "/hair-body/shampoo" },
      { name: "Conditioner", href: "/hair-body/conditioner" },
      { name: "Lotions", href: "/hair-body/lotions" },
    ],
    "MAKEUP & TOOLS": [
      { name: "Foundations", href: "/makeup/foundations" },
      { name: "Brushes", href: "/makeup/brushes" },
      { name: "Palettes", href: "/makeup/palettes" },
    ],
  };

  // Toggle dropdown on click
  const handleDropdownToggle = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 w-full px-5 lg:px-8 xl:px-[8%] py-3 z-50 bg-white shadow-xs">
      <div className="py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src={assets.Logo}
            alt="Logo"
            width={180}
            height={48}
            className="h-20 w-20"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-4xl">
          <div className="flex border-gray-300 rounded-full overflow-hidden border">
            <input
              type="text"
              placeholder="Search products, brands....."
              className="w-full px-4 py-2 text-lg focus:outline-none"
            />
            <button className="mr-2 my-2 rounded-full bg-[#F178A1] w-9 h-9 flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1117 9a7.5 7.5 0 01-.35 7.65z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex space-x-6 text-sm text-gray-900 items-center">
          <Link href="/account" className="flex flex-col items-center">
            <Image
              src={assets.wishlist}
              alt="Wishlist"
              width={24}
              height={24}
              className="h-[24px] w-auto"
            />
            <span className="mt-2">WISHLIST</span>
          </Link>

          <Link href={getAccountHref()} className="flex flex-col items-center">
            <Image
              src={assets.account}
              alt="Account"
              width={24}
              height={24}
              className="h-[24px] w-auto"
            />
            <span className="mt-2">ACCOUNT</span>
          </Link>

          <Link href="/cart" className="flex flex-col items-center">
            <Image
              src={assets.cart}
              alt="Cart"
              width={24}
              height={24}
              className="h-[24px] w-auto"
            />
            <span className="mt-2">CART</span>
          </Link>
        </div>
      </div>

      {/* Navigation Links with Click Dropdown */}
      <nav className="bg-white">
        <div className="px-4 py-4 flex justify-center space-x-8 text-gray-900 text-lg relative">
          {["SKINCARE", "HAIR & BODY", "MAKEUP & TOOLS", "NEW", "BRAND", "SUPPORT"].map(
            (menu) => (
              <div key={menu} className="relative">
                {/* Button to open dropdown */}
                <button
                  onClick={() => handleDropdownToggle(menu)}
                  className="hover:text-pink-600 focus:outline-none"
                >
                  {menu}
                </button>

                {/* Dropdown */}
                {dropdownItems[menu] && openDropdown === menu && (
                  <div className="absolute left-0 mt-2 w-48 bg-white z-50">
                    {dropdownItems[menu].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                        onClick={() => setOpenDropdown(null)} // close dropdown after click
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
