'use client';

import Image from "next/image";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Product } from "@/types";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product._id);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      <p className="text-sm text-gray-500">Vendor: {product.vendor}</p>

      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-pink-600">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-sm text-green-600 font-medium">In Stock</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-8 h-8 rounded-full border text-xl"
        >
          −
        </button>
        <span className="text-lg font-medium w-6 text-center">{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          className="w-8 h-8 rounded-full border text-xl"
        >
          +
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          className="px-6 py-2 bg-black text-white text-sm font-semibold rounded-md"
        >
          Add to Bag
        </button>
        <button className="px-6 py-2 border text-sm font-semibold rounded-md">
          Add to Wishlist
        </button>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        {product.description}
      </p>
    </div>
  );
}
