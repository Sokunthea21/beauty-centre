"use client";

import { assets } from "@/app/assets/assets";
import { useState } from "react";
import Image from "next/image";

import type { StaticImageData } from "next/image";

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  logo: string | StaticImageData;
}

interface Props {
  selectedPayment: string | null;
  onChange: (id: string) => void;
  total?: number; // optional, so we can show order total in QR modal
}

export default function PaymentOptions({ selectedPayment, onChange, total }: Props) {
  const [showQR, setShowQR] = useState(false);

  const paymentOptions: PaymentOption[] = [
    {
      id: "aba",
      name: "ABA KHQR",
      description: "Scan to pay with any banking app.",
      logo: assets.ABA
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay with cash when product arrival.",
      logo: assets.cod
    },
  ];

  const handleSelect = (id: string) => {
    onChange(id);
    if (id === "aba") {
      setShowQR(true); // open QR modal
    }
  };

  return (
    <div className="bg-white p-6 mb-6">
      <h2 className="font-semibold mb-4">SELECT PAYMENT OPTIONS</h2>
      <div className="space-y-3">
        {paymentOptions.map((opt) => (
          <div
            key={opt.id}
            className={`flex items-center gap-3 border p-3 cursor-pointer transition ${
              selectedPayment === opt.id ? "border-pink-500 bg-pink-50" : "hover:border-pink-300"
            }`}
            onClick={() => handleSelect(opt.id)}
          >
            <Image src={opt.logo} alt={opt.name} className="w-12 h-12 object-contain" />
            <div>
              <p className="font-medium">{opt.name}</p>
              <p className="text-sm text-gray-500">{opt.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ABA QR Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[340px] relative shadow-xl rounded-lg">
            {/* Close button */}
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">ABA PAY</h3>
              <p className="text-2xl font-bold text-gray-800 mb-2">
                {total ? total.toFixed(2) : "0.00"} USD
              </p>
              <p className="text-sm text-gray-500 mb-4">Scan to Pay</p>

              {/* Replace with your real QR code image */}
              <Image
                src={assets.KHQR}
                alt="ABA QR Code"
                className="mx-auto w-60 h-60"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
