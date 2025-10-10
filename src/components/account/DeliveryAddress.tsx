"use client";

import { useState, useEffect } from "react";

// Reusable InputField component
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}> = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500 transition"
    />
  </div>
);

export default function AddressContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    addressLine: "",
    province: "",
    phoneNumber: "",
  });

  // ✅ Load saved customer data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const customerData = localStorage.getItem("customerData");
      if (customerData) {
        const parsed = JSON.parse(customerData);
        setForm({
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          addressLine: parsed.addressLine || "",
          province: parsed.province || "",
          phoneNumber: parsed.phoneNumber || "",
        });
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Optionally: update localStorage and call API
    localStorage.setItem("customerData", JSON.stringify({
      ...JSON.parse(localStorage.getItem("customerData") || "{}"),
      ...form
    }));
    alert("Address & contact updated!");
  };

  return (
    <div className="p-6 bg-white flex-1">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
          <InputField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
          <InputField
            label="Address"
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            placeholder="Address"
          />
          <InputField
            label="Province"
            name="province"
            value={form.province}
            onChange={handleChange}
            placeholder="Province"
          />
          <InputField
            label="Contact Number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            type="tel"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-[#F6A5C1] hover:bg-pink-400 text-white font-medium py-3 px-8 transition duration-150"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
