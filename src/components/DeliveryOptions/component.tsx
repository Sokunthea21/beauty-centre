"use client";
import { assets } from "@/app/assets/assets";
import Image, { StaticImageData } from "next/image";

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  logo: StaticImageData | string;
  fee: number;
}

interface DeliveryOptionsProps {
  options: DeliveryOption[]; 
  selectedDelivery: string | null; 
  onChange: (newId: string) => void; 
}

export default function DeliveryOptions({ options, selectedDelivery, onChange }: DeliveryOptionsProps) {
  const deliveryOptions: DeliveryOption[] = options.length ? options : [
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
            {/* ✅ Fix: Ensure string logos work correctly with Next/Image */}
            <div className="w-12 h-12 relative">
              <Image
                src={typeof opt.logo === "string" ? opt.logo : opt.logo}
                alt={opt.name}
                fill
                sizes="48px"
                className="object-contain"
                unoptimized
              />
            </div>
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
