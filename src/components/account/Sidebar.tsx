"use client";

import { useState } from "react";
import { User, MapPin, ShoppingBag, Heart, Key, LogOut } from "lucide-react";

const menuItems = [
  { id: "profile", label: "My Profile", icon: <User size={18} /> },
  { id: "address", label: "Delivery Address", icon: <MapPin size={18} /> },
  { id: "orders", label: "My Orders", icon: <ShoppingBag size={18} /> },
  { id: "wishlist", label: "My Wishlist", icon: <Heart size={18} /> },
  { id: "password", label: "Change Password", icon: <Key size={18} /> },
];

interface Props {
  selected: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ selected, onSelect }: Props) {
  return (
    <div className="bg-white p-6 w-full md:w-72">
      <div className="flex flex-col items-center mb-6">
        <img
          src="user.png"
          alt="User"
          className="w-20 h-20 rounded-full mb-2"
        />
        <h2 className="font-semibold">MAO SOKUNTHEA</h2>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer ${
              selected === item.id
                ? "bg-pink-50 text-pink-600 font-medium"
                : "hover:bg-gray-50 text-gray-600"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}

        {/* Logout */}
        <div
          className="flex items-center gap-2 px-4 py-2 mt-4 text-gray-600 cursor-pointer hover:bg-gray-50 rounded"
          onClick={() => {
            console.log("User logged out");
            // Add your logout logic here, e.g., remove auth token and redirect
            // router.push("/login"); // if using next/navigation
          }}
        >
          <LogOut size={18} /> LogOut
        </div>
      </div>
    </div>
  );
}
