// src/components/Navbar/Navbar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { assets } from "@/app/assets/assets";

// Helper type for a single menu item
type MenuItem = { name: string; href: string };

// Structure for the mega-menu data (specifically for SKINCARE)
type MegaMenuSection = {
  title: string;
  items: MenuItem[];
};

// New data structure for dropdowns
const dropdownData: Record<string, MenuItem[] | MegaMenuSection[]> = {
  // Simple dropdowns for HAIR & BODY and MAKEUP & TOOLS
  "HAIR & BODY": [
    { name: "Body Care", href: "/hair-body/shampoo" },
    { name: "Hair Care", href: "/hair-body/conditioner" },
    { name: "Hand Care", href: "/hair-body/lotions" },
    { name: "Perfume", href: "/hair-body/perfume" },
  ],
  "MAKEUP & TOOLS": [
    { name: "Foundations", href: "/makeup/foundations" },
    { name: "Brushes", href: "/makeup/brushes" },
    { name: "Lips", href: "/makeup/lips" },
  ],

  // Mega-Menu data for SKINCARE, matching the image structure
  SKINCARE: [
    {
      title: "CLEANSERS",
      items: [
        { name: "Oil Cleansers", href: "/skincare/cleansers/oil" },
        { name: "Water Based Cleansers", href: "/skincare/cleansers/water" },
        { name: "Cleansing Balms", href: "/skincare/cleansers/balms" },
        { name: "Make-Up Removers", href: "/skincare/cleansers/removers" },
        { name: "Micellar Waters", href: "/skincare/cleansers/micellar" },
      ],
    },
    {
      title: "TONERS",
      items: [
        { name: "Hydrating Toners", href: "/skincare/toners/hydrating" },
        { name: "Calming Toners", href: "/skincare/toners/calming" },
        { name: "Mist Toners", href: "/skincare/toners/mist" },
        { name: "Exfoliating Toners", href: "/skincare/toners/exfoliating" },
        { name: "Toner Pads", href: "/skincare/toners/pads" },
      ],
    },
    {
      title: "TREATMENTS",
      items: [
        { name: "Serums", href: "/skincare/treatments/serums" },
        { name: "Ampoules", href: "/skincare/treatments/ampoules" },
        { name: "Essences", href: "/skincare/treatments/essences" },
        { name: "Spot Treatments", href: "/skincare/treatments/spot" },
      ],
    },
    {
      title: "EXFOLIATORS",
      items: [
        { name: "Physical Exfoliators", href: "/skincare/exfoliators/physical" },
        { name: "Chemical Exfoliators", href: "/skincare/exfoliators/chemical" },
      ],
    },
    {
      title: "SKIN CONCERNS",
      items: [
        { name: "Acne", href: "/skincare/concerns/acne" },
        { name: "Anti-Aging", href: "/skincare/concerns/anti-aging" },
        { name: "Dry Skin", href: "/skincare/concerns/dry" },
        { name: "Fungal Acne Safe", href: "/skincare/concerns/fungal-acne" },
        { name: "Hyperpigmentation", href: "/skincare/concerns/hyperpigmentation" },
        { name: "Skin Redness", href: "/skincare/concerns/redness" },
        { name: "Sensitive Skin", href: "/skincare/concerns/sensitive" },
        { name: "Oily Skin", href: "/skincare/concerns/oily" },
      ],
    },
    {
      title: "MOISTURIZERS",
      items: [
        { name: "Face Creams", href: "/skincare/moisturizers/creams" },
        { name: "Gel Moisturizers", href: "/skincare/moisturizers/gels" },
        { name: "Facial Oils", href: "/skincare/moisturizers/oils" },
        { name: "Emulsions", href: "/skincare/moisturizers/emulsions" },
      ],
    },
    {
      title: "MASKS",
      items: [
        { name: "Peeling Masks", href: "/skincare/masks/peeling" },
        { name: "Sheet Masks", href: "/skincare/masks/sheet" },
        { name: "Sleeping Masks", href: "/skincare/masks/sleeping" },
        { name: "Wash-Off Masks", href: "/skincare/masks/wash-off" },
      ],
    },
    {
      title: "LIP & EYE CARE",
      items: [
        { name: "Eye Creams", href: "/skincare/lip-eye/creams" },
        { name: "Eye Patches", href: "/skincare/lip-eye/patches" },
        { name: "Lip Care", href: "/skincare/lip-eye/lip-care" },
      ],
    },
    {
      title: "SUNSCREENS",
      items: [
        { name: "Sunscreen", href: "/skincare/sunscreen" }, // Assuming a single link here for now
      ],
    },
    {
      title: "SHOP BY INGREDIENTS",
      items: [
        { name: "AHA BHA PHA", href: "/skincare/ingredients/aha-bha-pha" },
        { name: "Centella", href: "/skincare/ingredients/centella" },
        { name: "Hyaluronic Acid", href: "/skincare/ingredients/hyaluronic" },
        { name: "Peptides", href: "/skincare/ingredients/peptides" },
        { name: "Propolis", href: "/skincare/ingredients/propolis" },
        { name: "Snail Mucin", href: "/skincare/ingredients/snail-mucin" },
        { name: "Vitamin C", href: "/skincare/ingredients/vitamin-c" },
        { name: "Niacinamide", href: "/skincare/ingredients/niacinamide" },
      ],
    },
  ],
};


const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);


  const getAccountHref = () => {
    if (loading) return "/login";
    if (!user || !user.emailVerified) return "/login";
    if (user.email === "ngylyteng@gmail.com") return "/login";
    return "/admin/myacc";
  };

  // Toggle dropdown on click
  const handleDropdownToggle = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  /**
   * Renders the mega-menu for SKINCARE.
   * Uses flexbox and wrapping to arrange the items into the multi-column layout.
   */
  const renderMegaMenu = (data: MegaMenuSection[]) => (
    <div className="absolute left-85 -translate-x-1/2 mt-2 p-6 bg-white shadow-xl border border-gray-100 z-50 w-[1270px]">
      <div className="flex flex-wrap gap-x-12 gap-y-6">
        {data.map((section) => (
          <div
            key={section.title}
            className={`
              flex-shrink-0 
              ${section.title === 'SKIN CONCERNS' || section.title === 'SHOP BY INGREDIENTS' ? 'w-48' : 'w-40'}
              ${section.title === 'MOISTURIZERS' ? 'mt-6' : ''}
              ${section.title === 'MASKS' ? 'mt-6' : ''}
              ${section.title === 'LIP & EYE CARE' ? 'mt-6' : ''}
              ${section.title === 'SUNSCREENS' ? 'mt-6' : ''}
            `}
          >
            <h3 className="text-pink-600 font-bold mb-3 border-b border-pink-100 pb-1">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-gray-700 text-sm hover:text-pink-600 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  /**
   * Renders the simple, single-column dropdown.
   */
  const renderSimpleDropdown = (data: MenuItem[]) => (
    <div className="absolute left-0 mt-2 w-48 bg-white shadow-xl border border-gray-100 z-50">
      {data.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
          onClick={() => setOpenDropdown(null)}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );


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
        <div
          className="px-4 py-4 flex justify-center space-x-8 text-gray-900 text-lg relative"
          ref={menuRef}
        >
          {[
            "SKINCARE",
            "HAIR & BODY",
            "MAKEUP & TOOLS",
            "NEW",
            "BRAND",
            "SUPPORT",
          ].map((menu) => (
            <div key={menu} className="relative">
              {/* Button to open dropdown */}
              <button
                onClick={() => handleDropdownToggle(menu)}
                className="hover:text-pink-600 focus:outline-none"
              >
                {menu}
              </button>

              {/* Dropdown Logic */}
              {openDropdown === menu && dropdownData[menu] && (
                <>
                  {/* Check if it's the SKINCARE mega-menu data structure */}
                  {menu === "SKINCARE"
                    ? renderMegaMenu(dropdownData[menu] as MegaMenuSection[])
                    : // Otherwise, render the simple dropdown
                      renderSimpleDropdown(dropdownData[menu] as MenuItem[])}
                </>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;