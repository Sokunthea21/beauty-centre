"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getWhiteList, addOrRemoveProductWhiteList } from "@/api/whitelist.api";

// --- API Response Interfaces ---
export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface getWhiteListResponse extends ApiResponse {
  data: WishlistItem[];
}

// --- Wishlist Item Interface ---
export interface WishlistItem {
  id: number;
  customerId: number;
  products: {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    productImages: { id: number; productImage: string }[];
    category: { id: number; category: string };
    brand: { id: number; brand: string };
  };
}

export default function MyWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<number | null>(null); // track removing item

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getWhiteList();
        if (response.success && response.data) {
          setWishlist(response.data);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  const handleRemove = async (id: number) => {
    if (!confirm("Are you sure you want to remove this product from your wishlist?")) return;
    setRemoving(id);

    try {
      const response: ApiResponse = await addOrRemoveProductWhiteList(id);
      if (response.success) {
        setWishlist((prev) => prev.filter((item) => item.products.id !== id));
      } else {
        alert(response.message || "Failed to remove product from wishlist.");
      }
    } catch (error) {
      console.error("Remove error:", error);
      alert("Something went wrong!");
    } finally {
      setRemoving(null);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading wishlist...</p>;

  return (
    <div className="bg-white p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {wishlist.map((item) => {
            const product = item.products;
            const productImage = `http://localhost:8080${product.productImages[0]?.productImage}` || "/placeholder.png";

            return (
              <div
                key={item.id}
                className="border border-[#E3E3E3] flex items-center bg-white gap-4 p-6 rounded-lg shadow-sm"
              >
                <Image
                  src={productImage}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="rounded object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-gray-700 mt-1">${parseFloat(product.price).toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {product.brand.brand} - {product.category.category}
                  </p>
                </div>

                <button
                  className="text-red-600 hover:text-red-800 font-medium"
                  onClick={() => handleRemove(item.products.id)}
                  disabled={removing === item.products.id}
                >
                  {removing === item.products.id ? "Removing..." : "Remove"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
