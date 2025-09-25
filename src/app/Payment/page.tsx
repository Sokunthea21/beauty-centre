"use client";
import { useState } from "react";
import OrderSummary from "../../components/OrderSummary/component";
import PaymentOptions from "../../components/PaymentOptions/component";
import DeliveryOptions from "../../components/DeliveryOptions/component";

export default function PaymentPage() {
  // Assume these values were already saved in previous step (mock for now)
  const customer = {
    name: "Mao Sokunthea",
    phone: "+855 12380433",
    address: "Siem Reap Post Office, Pokambor Avenue, Siem Reap",
  };

  const [payment, setPayment] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<{
    id: string;
    name: string;
    description: string;
    logo: string;
  } | null>(null);

  const subtotal = 15.67;
  const deliveryFee = 15.67;

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left section */}
      <div className="md:col-span-2">
        <div className="text-gray-500 mb-4">
          Home &gt; Your cart &gt; Checkout &gt; Payment Method
        </div>

        {/* Customer Info (read-only) */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="font-semibold mb-4">CUSTOMER INFORMATION</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{customer.name}</p>
            </div>
            <div>
              <p className="text-gray-500">Contact</p>
              <p className="font-medium">{customer.phone}</p>
            </div>
          </div>
        </div>

        {/* Delivery Address (read-only) */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="font-semibold mb-4">DELIVERY ADDRESS</h2>
          <p className="text-sm">{customer.address}</p>
        </div>

        <DeliveryOptions selectedDelivery={selectedDelivery ? selectedDelivery.id : null} onChange={function (id: string): void {
          throw new Error("Function not implemented.");
        } } />
        {/* Payment Options */}
        <PaymentOptions selectedPayment={payment} onChange={setPayment} />
      </div>

      {/* Right section */}
      <div className="mt-10">
        <OrderSummary subtotal={subtotal} deliveryFee={deliveryFee} />
      </div>
    </div>
  );
}
