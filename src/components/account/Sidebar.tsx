"use client";
import { User, MapPin, ShoppingBag, Heart, Key, LogOut } from "lucide-react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // ✅ Load user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const customerData = localStorage.getItem("customerData");
      if (customerData) {
        setUser(JSON.parse(customerData));
      }
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("customerData");
      localStorage.removeItem("customerId");
      localStorage.removeItem("token");
    }
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="bg-white p-6 w-full md:w-72">
      <div className="flex gap-6 items-center mb-6">
        <Image
          src={assets.Logo}
          alt="User"
          className="w-14 h-14 rounded-full"
        />
        <h2 className="font-semibold">
          {user && (user.firstName || user.lastName)
            ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
            : "Guest"}
        </h2>
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
          onClick={handleLogout}
        >
          <LogOut size={18} /> LogOut
        </div>
      </div>
    </div>
  );
}
