"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import OrderSummary from "../../components/OrderSummary/component";
import PaymentOptions from "../../components/PaymentOptions/component";
import DeliveryOptions from "../../components/DeliveryOptions/component";
import SuccessModal from "@/components/SuccessModal/comment";
import { getCart, payment } from "@/api/cart.api";
import { Product } from "@/types";
import { assets } from "../assets/assets";
import { StaticImageData } from "next/image";

// --- Delivery Option Type ---
interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  logo: StaticImageData | string;
  fee: number;
}

const INITIAL_DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "jnt",
    name: "J&T Express",
    description: "Pay first before we can send out your products.",
    logo: assets.jandt,
    fee: 0
  },
  {
    id: "vet",
    name: "VET Express",
    description: "Pay first before we can send out your products.",
    logo: assets.Vet,
    fee: 0
  },
  {
    id: "siemreap",
    name: "Siem Reap Delivery",
    description: "Pay first before we can send out your products.",
    logo: assets.Delivery,
    fee: 0
  },
];

export default function PaymentPage() {
  const router = useRouter();

  // --- States ---
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [orderId, setOrderId] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string>("standard");

  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(5.0);
  const [products, setProducts] = useState<Product[]>([]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // --- Fetch Cart Data ---
  const fetchCartData = async () => {
    try {
      const response = await getCart();
      if (response.success && response.data) {
        const cartData = response.data;

        setOrderId(cartData.id);

        setCustomer({
          name: cartData.pickerName || "",
          phone: cartData.pickerContact || "",
          address: cartData.deliveryAddress || "",
          email: "customer@example.com",
        });

        const items = cartData.orderItems.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          price: Number(item.product.price),
          quantity: Number(item.quantity),
        }));

        setProducts(items);

        const sub = items.reduce(
          (acc: number, p: any) => acc + p.price * p.quantity,
          0
        );

        setDeliveryFee(Number(cartData.deliveryFee) || 0);

        setSubtotal(sub);
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // --- Handle delivery selection ---
  const handleDeliveryChange = (id: string) => {
    const selected = INITIAL_DELIVERY_OPTIONS.find((opt) => opt.id === id);
    if (selected) {
      setSelectedDelivery(selected.id);
    }
  };


  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  // --- Confirm Payment ---
  const handleConfirmOrder = useCallback(async () => {
    if (!paymentMethod) {
      alert("Please select a payment method before confirming.");
      return;
    }

    const payload = {
      orderId,
      delivery: selectedDelivery,
      paymentMethod,
    };

    console.log("Submitting payment payload:", payload);

    try {
      const response = await payment(payload);
      if (response.success) {
        setShowSuccessModal(true);
      } else {
        alert(response.message || "Payment failed");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      alert(err.message || "Something went wrong");
    }
  }, [orderId, selectedDelivery, paymentMethod]);

  const handleCloseSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
    router.push("/");
  }, [router]);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left section */}
      <div className="md:col-span-2">
        <div className="text-gray-500 mb-4">
          <a href="/" className="hover:text-black">Home</a> &gt;
          <a href="/cart" className="hover:text-black"> Your cart</a> &gt;
          <a href="/checkout" className="hover:text-black"> Check out</a> &gt;
          <span className="font-semibold text-black"> Payment Method</span>
        </div>

        {/* Customer Info */}
        <div className="bg-white p-6 mb-6 border">
          <h2 className="font-semibold mb-4">CUSTOMER INFORMATION</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-2">Name</p>
              <div className="w-full border p-4">
                <p className="font-medium">{customer.name}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Contact</p>
              <div className="w-full border p-4">
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white p-6 mb-6 border">
          <h2 className="font-semibold mb-4">DELIVERY ADDRESS</h2>
          <p className="text-sm">{customer.address}</p>
        </div>

        {/* Delivery Options */}
        <DeliveryOptions
          options={INITIAL_DELIVERY_OPTIONS}
          selectedDelivery={selectedDelivery}
          onChange={handleDeliveryChange}
        />

        {/* Payment Options */}
        <PaymentOptions
          selectedPayment={paymentMethod}
          onChange={setPaymentMethod}
        />
      </div>

      {/* Right section */}
      <div className="mt-10">
        <OrderSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          onCheckout={handleConfirmOrder}
          checkoutLabel="Confirm Payment"
        />
      </div>

      {/* Success Modal */}
      <SuccessModal
        isVisible={showSuccessModal}
        onClose={handleCloseSuccessModal}
        customerEmail={customer.email}
        lastFourCardDigits="3947"
      />
    </div>
  );
}
