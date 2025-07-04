"use client";
import { useState } from "react";
import OrderSummary from "../../components/OrderSummary/component";
import CustomerInfo from "../../components/CustomerInfo/component";
import DeliveryAddress from "../../components/DeliveryAddress/component";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const subtotal = 15.67;
  const deliveryFee = 15.67;

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left section */}
      <div className="md:col-span-2">
        <div className="text-gray-500 mb-4">
          Home &gt; Your cart &gt; Checkout
        </div>

        <CustomerInfo
          name={name}
          phone={phone}
          onNameChange={setName}
          onPhoneChange={setPhone}
        />

        <DeliveryAddress
          address={address}
          onAddressChange={setAddress}
        />
      </div>

      {/* Right section */}
      <div className="mt-10">
        <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} />
      </div>
    </div>
  );
}
