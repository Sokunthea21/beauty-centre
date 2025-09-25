"Use cline"
import QuantityControl from "../QuantityControl/component";
import React from "react";
import Image from "next/image";
import { assets, categories, categoryList } from "@/app/assets/assets";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  product: Product;
  onQuantityChange: (id: number, newQuantity: number) => void;
  onRemove: (id: number) => void;
}

export default function CartItem({
  product,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const { id, name, image, price, quantity } = product;
  const total = (price * quantity).toFixed(2);

  return (
    <div className="flex items-center justify-between bg-white border border-[#E3E3E3] py-4 mb-6">
      <div className="flex items-center gap-4">
        <Image
          src={categories.Sunscreen}
          width={100}
          height={100}
          className="object-contain"
          loading="lazy"
          alt=""
        />
        <div>{name}</div>
      </div>
      <div>${price.toFixed(2)}</div>
      <QuantityControl
        quantity={quantity}
        onChange={(q) => onQuantityChange(id, q)}
      />
      <div>${total}</div>
      <button onClick={() => onRemove(id)} className="m-4">&times;</button>
    </div>
  );
}
