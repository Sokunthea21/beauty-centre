// src/components/Navbar/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { assets } from "@/app/assets/assets";

const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen for auth state changes to update the UI
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Determines the correct link for the account button
    const getAccountHref = () => {
        if (loading) return '/login'; // Default to login while checking auth state
        if (!user || !user.emailVerified) return '/login'; // If no user or not verified, go to login
        if (user.email === 'ngylyteng@gmail.com') return '/dashboard'; // Admin goes to dashboard
        return '/myacc'; // Logged-in users go to their account/home page
    };

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 w-full px-5 lg:px-8 xl:px-[8%] py-4 z-50 bg-white shadow-xs">
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={assets.Beauty_Center}
              alt="Logo"
              width={180}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-grow mx-4 max-w-2xl">
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
            <Link href="#" className="flex flex-col items-center">
              <Image
                src={assets.wishlist}
                alt="Wishlist"
                width={24}
                height={24}
                className="h-[24px] w-auto"
              />
              <span className="mt-2">WISHLIST</span>
            </Link>
            
            {/* THIS IS THE FIXED ACCOUNT BUTTON */}
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

            <Link href="#" className="flex flex-col items-center">
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

        {/* Navigation Links */}
        <nav className="bg-white">
          <div className="px-4 py-4 flex justify-center space-x-8 text-gray-900 text-lg">
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
