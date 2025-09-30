"use client";

import { useState } from "react";

// Reusable InputField component for consistent styling
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
    address: "",
    province: "",
    contactNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // Add form submission logic here
  };

  return (
    <div className="p-6 bg-white flex-1"> {/* Added styling for the card-like container */}
      <form onSubmit={handleSubmit}> {/* Added form tag and vertical spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* First Name */}
          <InputField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter name"
          />
          {/* Last Name */}
          <InputField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter Phone Number" // Placeholder as seen in the image for Last Name
          />
          {/* Address */}
          <InputField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
          />
          {/* Province */}
          <InputField
            label="Province"
            name="province"
            value={form.province}
            onChange={handleChange}
            placeholder="Province"
          />
          {/* Contact Number */}
          <div className="col-span-1"> {/* This input takes only one column */}
            <InputField
              label="Contact Number"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
              placeholder="contact Number"
              type="tel"
            />
          </div>
        </div>

        {/* Save Button - right-aligned on its own row */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-[#F6A5C1] hover:bg-pink-400 text-white font-medium py-3 px-8 transition duration-150" // Adjusted padding and color for the button
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}  