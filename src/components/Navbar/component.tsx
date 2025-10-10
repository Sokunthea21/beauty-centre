"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { findCustomerById } from "@/api/customer.api";

// Helper type for a single menu item
type MenuItem = { name: string; href: string };

// Structure for the mega-menu data (specifically for SKINCARE)
type MegaMenuSection = {
  title: string;
  items: MenuItem[];
};

// New data structure for dropdowns
const dropdownData: Record<string, MenuItem[] | MegaMenuSection[]> = {
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
  ],
};

// Customer interface
interface Customer {
  id: number;
  customerId: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  gender: string | null;
  birthdate: string | null;
  profileImage: string;
  addressLine: string | null;
  city: string | null;
  province: string | null;
  postalCode: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<Customer | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [customerId, setCustomerId]: any = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ Read localStorage safely in useEffect (no SSR crash)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("customerId");
      if (storedId) setCustomerId(storedId);
    }
  }, []);

  // ✅ Fetch user info when customerId is available
  // ✅ Add this inside your useEffect where you fetch the user
  useEffect(() => {
    async function fetchUser() {
      try {
        if (customerId) {
          const response = await findCustomerById(customerId);
          if (response?.data) {
            setUser(response.data);

            // ✅ Store user data in localStorage
            if (typeof window !== "undefined") {
              localStorage.setItem(
                "customerData",
                JSON.stringify(response.data)
              );
              localStorage.setItem(
                "customerId",
                response.data.customerId.toString()
              );
            }
          } else {
            setUser(null);
            if (typeof window !== "undefined") {
              localStorage.removeItem("customerData");
              localStorage.removeItem("customerId");
            }
          }
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("customerData");
          localStorage.removeItem("customerId");
        }
      }
    }

    fetchUser();
  }, [customerId]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const renderMegaMenu = (data: MegaMenuSection[]) => (
    <div className="absolute left-85 -translate-x-1/2 mt-2 p-6 bg-white shadow-xl border border-gray-100 z-50 w-[1270px]">
      <div className="flex flex-wrap gap-x-12 gap-y-6">
        {data.map((section) => (
          <div key={section.title} className="flex-shrink-0 w-40">
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

  // ✅ Combine name
  const displayName =
    user && (user.firstName || user.lastName)
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "Profile";

  // ✅ Profile image
  const profileImage =
    user?.profileImage &&
    (user.profileImage.startsWith("http")
      ? user.profileImage
      : `http://localhost:8080${user.profileImage}`);

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

        {/* Search */}
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
          {/* Wishlist */}
          <Link href="/wishlist" className="flex flex-col items-center">
            <Image
              src={assets.wishlist}
              alt="Wishlist"
              width={24}
              height={24}
              className="h-[24px] w-auto"
            />
            <span className="mt-2">WISHLIST</span>
          </Link>

          {/* ✅ Profile / Account */}
          {user ? (
            <Link href="/account" className="flex flex-col items-center">
              <Image
                src={profileImage || assets.account}
                alt="Profile"
                width={32}
                height={32}
                className="h-[32px] w-[32px] rounded-full object-cover"
              />
              <span className="mt-1 text-sm">{displayName}</span>
            </Link>
          ) : (
            <Link href="/login" className="flex flex-col items-center">
              <Image
                src={assets.account}
                alt="Account"
                width={24}
                height={24}
                className="h-[24px] w-auto"
              />
              <span className="mt-2">ACCOUNT</span>
            </Link>
          )}

          {/* Cart */}
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

      {/* Dropdown Navigation */}
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
              <button
                onClick={() => handleDropdownToggle(menu)}
                className="hover:text-pink-600 focus:outline-none"
              >
                {menu}
              </button>

              {openDropdown === menu && dropdownData[menu] && (
                <>
                  {menu === "SKINCARE"
                    ? renderMegaMenu(dropdownData[menu] as MegaMenuSection[])
                    : renderSimpleDropdown(dropdownData[menu] as MenuItem[])}
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
