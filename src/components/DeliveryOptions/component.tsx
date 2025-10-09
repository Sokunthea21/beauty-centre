"use client";
import { assets } from "@/app/assets/assets";
import Image from "next/image";

import type { StaticImageData } from "next/image";

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  logo: StaticImageData | string;
  fee: number;
}

interface DeliveryOptionsProps {
  // The list of all available options
  options: DeliveryOption[]; 
  // The ID of the currently selected option
  selectedDelivery: string | null; 
  // The function to call when a new option is selected (passing its ID)
  onChange: (newId: string) => void; 
}

export default function DeliveryOptions({ options, selectedDelivery, onChange }: DeliveryOptionsProps) {
  const deliveryOptions: DeliveryOption[] = [
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

  return (
    <div className="bg-white p-6 mb-6">
      <h2 className="font-semibold mb-4">SELECT DELIVERY OPTION</h2>
      <div className="space-y-3">
        {deliveryOptions.map((opt) => (
          <div
            key={opt.id}
            className={`flex items-center gap-3 border p-3 cursor-pointer transition ${
              selectedDelivery === opt.id ? "border-pink-500 bg-pink-50" : "hover:border-pink-300"
            }`}
            onClick={() => onChange(opt.id)}
          >
            <Image src={opt.logo} alt={opt.name} className="w-12 h-12 object-contain" />
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
