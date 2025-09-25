"use client";

import { LayoutDashboard, Package, ShoppingCart, Users, Settings, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={18} />, href: "dashboard" },
  { name: "Products", icon: <Package size={18} />, href: "products" },
  { name: "Orders", icon: <ShoppingCart size={18} />, href: "orders" },
  { name: "Category", icon: <Tag size={18} />, href: "category" },
  { name: "Brand", icon: <Tag size={18} />, href: "brand" },
  { name: "Customer", icon: <Users size={18} />, href: "customers" },
  { name: "Slider", icon: <Tag size={18} />, href: "slider" },
  { name: "Coupon Management", icon: <Tag size={18} />, href: "coupons" },
  { name: "Settings", icon: <Settings size={18} />, href: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-pink-300 p-4 w-64 h-screen fixed text-gray-900 ">
      {/* Logo */}
      <div className="px-6 py-4 font-bold text-xl border-b border-pink-300">
        BEAUTY CENTRE
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-pink-500 text-white"
                  : "hover:bg-pink-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
