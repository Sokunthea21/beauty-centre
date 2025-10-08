"use client";

import Image from "next/image";

interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

const mockWishlist: WishlistItem[] = [
  {
    id: "P001",
    name: "Luxury Skincare Cream",
    image: "/products/cream.jpg",
    price: 29.99,
  },
  {
    id: "P002",
    name: "Herbal Lip Balm",
    image: "/products/lipbalm.jpg",
    price: 9.99,
  },
  {
    id: "P003",
    name: "Aromatic Candle",
    image: "/products/candle.jpg",
    price: 14.99,
  },
];

export default function MyWishlist() {
  return (
    <div className="bg-white p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">My Wishlist</h2>

      {mockWishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {mockWishlist.map((item) => (
            <div
              key={item.id}
              className="border border-[#E3E3E3] flex items-center bg-white gap-4 p-6"
            >
              <Image
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="grid grid-cols-1 gap-6 flex-1">
                <h3 className="font-medium">{item.name}</h3>
                
              </div>
              <div className="grid grid-cols-1 gap-6 flex-1">
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
              </div>
              
              <button
                className="text-red-600 hover:text-red-800 font-medium"
                onClick={() => console.log("Remove", item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
