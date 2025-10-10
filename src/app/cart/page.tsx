"use client";
import CartItem from "@/components/CartItem/component";
import OrderSummary from "@/components/OrderSummary/component";
import CommentsBox from "@/components/CommentsBox/component";
import Bestseller from "@/components/Bestseller/components";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCart, proceedCart } from "@/api/cart.api"; // make sure proceedCart is exported
import { Product } from "@/types"; 

type proceedCartPayload = {
  productIdPriceQty: { productId: number; price: number; qty: number }[]; // array of objects
  comment: string;
};

export default function CartPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [comment, setComment] = useState<string>("");

  // Fetch cart from API
  const fetchCartData = async () => {
    try {
      const response = await getCart();
      if (response.success && response.data?.orderItems) {
        const fetchedProducts: Product[] = response.data.orderItems.map(
          (item: any) => ({
            id: item.product.id,
            name: item.product.name,
            image: "", // replace with actual image if available
            price: Number(item.product.price),
            quantity: item.quantity,
          })
        );
        setProducts(fetchedProducts);
        setComment(response.data.comment || "");
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    setProducts((prev) =>
      prev.map((p: any) => (p.id === id ? { ...p, quantity: newQty } : p))
    );
  };

  const handleRemove = (id: number) => {
    setProducts((prev) => prev.filter((p: any) => p.id !== id));
  };

  const subtotal = products.reduce((acc, p: any) => acc + p.price * p.quantity, 0);
  const deliveryFee = 0; 

  // Submit cart to proceed API
  const handleCheckout = async () => {
    try {
      const payload: proceedCartPayload = {
        productIdPriceQty: products.map((p: any) => ({
          productId: Number(p.id),
          price: Number(p.price),
          qty: Number(p.quantity),
        })),
        comment,
      };


      const response = await proceedCart(payload);
      if (response.success) {
        console.log("Cart submitted successfully:", response);
        router.push("/checkout"); // navigate to checkout page
      } else {
        alert(response.message || "Failed to submit cart");
      }
    } catch (err: any) {
      console.error("Error submitting cart:", err);
      alert(err.message || "Something went wrong");
    }
  };

  const currentStep = 1;
  const buttonLabel =
    currentStep === 1 ? "Proceed to Payment" : "Confirm Payment";

  return (
    <>
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-4 text-gray-500">
            <a href="/" className="hover:text-black">Home</a> &gt;
            <a href="/cart" className="hover:text-black">Your cart</a> &gt;
          </div>

          <div className="bg-gray-100 p-4 grid grid-cols-4 gap-4 mb-6">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          {products.map((product: any) => (
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
            onCheckout={handleCheckout} // now submits updated cart
            checkoutLabel={buttonLabel}
          />
        </div>
      </div>

      <Bestseller />
    </>
  );
}
