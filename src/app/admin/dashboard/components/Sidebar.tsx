"use client";

import {
  House,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Star,
  TicketPercent,
  Image as ImageIcon,
  Grid2x2,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

// NOTE: Adjusted icons to better match the typical lucide library if available
const menuItems = [
  // Href paths are simplified/relative here, adjust as needed for your Next.js routing
  { name: "Dashboard", icon: <House size={18} />, href: "dashboard" },
  { name: "Products", icon: <Package size={18} />, href: "/admin/products" },
  { name: "Orders", icon: <ShoppingCart size={18} />, href: "/admin/orders" },
  { name: "Category", icon: <Grid2x2 size={18} />, href: "/admin/category" },
  { name: "Brand", icon: <Star size={18} />, href: "/admin/brand" },
  { name: "Customer", icon: <Users size={18} />, href: "/admin/customers" },
  { name: "Slider", icon: <ImageIcon size={18} />, href: "/admin/slider" },
  { name: "Coupon", icon: <TicketPercent size={18} />, href: "/admin/coupons" },
  { name: "Settings", icon: <Settings size={18} />, href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // Updated background color and text color for the sidebar
    <aside
      className="w-64 h-screen fixed text-white bg-[#F6A5C1] shadow-2xl"
      // You can use a specific hex code for the background if default pink-500 isn't dark enough:
      // style={{ backgroundColor: '#e48299' }}
    >
      {/* Logo */}
      <div className="px-6 py-8 font-extrabold text-2xl tracking-wider text-black">
        BEAUTY CENTRE
      </div>

      {/* Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => {
          // Check if the current path matches the item's href (case-insensitive and partial match safety)
          const isActive = pathname.includes(item.href) && item.href !== "/";

          return (
            <Link
              key={index}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition duration-150
                ${
                  // Active Link Style: Black background, white text
                  isActive
                    ? "bg-black text-[#F6A5C1] shadow-xl"
                    : // Inactive Link Style: Default text, slight hover effect
                      "text-black opacity-80 hover:bg-black/10"
                }
              `}
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
