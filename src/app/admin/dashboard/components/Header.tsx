"use client";

import { Search, Calendar } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Search Bar */}
      <div className="flex items-center w-1/3 bg-gray-100 rounded-lg px-3">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent px-2 py-2 text-sm focus:outline-none"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Date Filter */}
        <button className="flex items-center gap-2 bg-pink-100 text-pink-600 px-3 py-2 rounded-lg text-sm">
          <Calendar size={16} />
          December 2025
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="profile"
            className="w-9 h-9 rounded-full"
          />
          <div className="text-sm">
            <p className="font-medium">Robert Allen</p>
            <p className="text-gray-500 text-xs">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
