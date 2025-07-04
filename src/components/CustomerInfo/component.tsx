"use client";
import React from "react";

interface CustomerInfoProps {
  name: string;
  phone: string;
  onNameChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
}

export default function CustomerInfo({
  name,
  phone,
  onNameChange,
  onPhoneChange,
}: CustomerInfoProps) {
  return (
    <div className="bg-white p-6 mb-6 border border-[#E3E3E3]">
      <h2 className="font-semibold mb-4">Customer Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            className="w-full border p-2"
            placeholder="Enter name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Contact</label>
          <input
            type="tel"
            className="w-full border p-2"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
