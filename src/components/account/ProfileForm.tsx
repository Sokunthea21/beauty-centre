"use client";

import { useState } from "react";
import React from "react"; // Added React import

// --- InputField Component (Slightly improved to handle spacing/label rendering) ---
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; // Made optional as it's not always required (e.g., for date)
  type?: string;
}> = ({ label, name, value, onChange, placeholder = "", type = "text" }) => (
  <div className="space-y-1">
    {/* Renders the label passed as a prop */}
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name} // Added id for accessibility (connecting label to input)
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500 transition"
    />
  </div>
);

// --- ProfileForm Component (FIXED) ---
export default function ProfileForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", form);
    // Add your API call/save logic here
  };

  return (
    <div className="bg-white p-6 flex-1">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter name"
          />

          <InputField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter name"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <InputField
            label="Contact Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />

          <InputField
            label="Birth Date"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={handleChange}
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
