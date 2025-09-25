"use client";
import { useState } from "react";

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  logo: string;
}

interface Props {
  selectedDelivery: string | null;
  onChange: (id: string) => void;
}

export default function DeliveryOptions({ selectedDelivery, onChange }: Props) {
  const deliveryOptions: DeliveryOption[] = [
    {
      id: "jnt",
      name: "J&T Express",
      description: "Pay first before we can send out your products.",
      logo: "/logos/jnt.png",
    },
    {
      id: "vet",
      name: "VET Express",
      description: "Pay first before we can send out your products.",
      logo: "/logos/vet.png",
    },
    {
      id: "siemreap",
      name: "Siem Reap Delivery",
      description: "Pay first before we can send out your products.",
      logo: "/logos/siemreap.png",
    },
  ];

  return (
    <div className="bg-white border rounded-lg p-6 mb-6">
      <h2 className="font-semibold mb-4">SELECT DELIVERY OPTION</h2>
      <div className="space-y-3">
        {deliveryOptions.map((opt) => (
          <div
            key={opt.id}
            className={`flex items-center gap-3 border rounded p-3 cursor-pointer ${
              selectedDelivery === opt.id ? "border-pink-500 bg-pink-50" : ""
            }`}
            onClick={() => onChange(opt.id)}
          >
            <img src={opt.logo} alt={opt.name} className="w-12 h-8 object-contain" />
            <div>
              <p className="font-medium">{opt.name}</p>
              <p className="text-sm text-gray-500">{opt.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
