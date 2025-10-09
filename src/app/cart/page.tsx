"use client";
import CartItem from "@/components/CartItem/component";
import OrderSummary from "../../components/OrderSummary/component";
import CommentsBox from "../../components/CommentsBox/component";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Bestseller from "@/components/Bestseller/components";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "COSRX Aloe Soothing Suncream SPF50+/PA+++",
    image: "/suncream1.png",
    price: 7.5,
    quantity: 1,
  },
  {
    id: 2,
    name: "COSRX Aloe Soothing Suncream SPF50+/PA+++",
    image: "/suncream2.png",
    price: 7.5,
    quantity: 1,
  },
];

export default function CartPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [comment, setComment] = useState<string>("");

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setProducts(
      products.map((p) => (p.id === id ? { ...p, quantity: newQty } : p))
    );
  };

  const handleRemove = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const subtotal = products.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const deliveryFee = 15.67;

  const handleCheckout = () => {
    // 1. Perform any necessary actions (e.g., saving cart state to the server)
    console.log("Initiating checkout process...");

    // 2. Programmatically navigate to the checkout page
    router.push("/checkout");
  };
  const currentStep = 1;
  const buttonLabel =
    currentStep === 1
      ? "Proceed to Payment" // For the initial info step
      : "Confirm Payment"; // For the final payment step
  return (
    <>
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-4 text-gray-500">
            <a href="/" className="hover:text-black">
              Home
            </a>{" "}
            &gt;
            <a href="/cart" className="hover:text-black">
              Your cart
            </a>{" "}
            &gt;
          </div>
          <div className="bg-gray-100 p-4 grid grid-cols-4 gap-4 mb-6">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
          <CommentsBox value={comment} onChange={setComment} />
        </div>
        <div className="mt-10">
          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            onCheckout={handleCheckout}
            checkoutLabel={buttonLabel}
          />
        </div>
      </div>
      <Bestseller />
    </>
  );
}
