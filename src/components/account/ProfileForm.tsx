"use client";

import { useState, useEffect } from "react";
import React from "react";
import { fillCustomerProfile } from "@/api/customer.api";

interface fillCustomerProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthdate?: Date | string;
}

// --- InputField Component ---
const InputField: React.FC<{
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}> = ({ label, name, value, onChange, placeholder = "", type = "text" }) => (
  <div className="space-y-1">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 p-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500 transition"
    />
  </div>
);

export default function ProfileForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId]: any = useState<string | null>(null);

  // ✅ Load customer data on client
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCustomerId = localStorage.getItem("customerId");
    const storedCustomerData = localStorage.getItem("customerData");

    if (storedCustomerId) setCustomerId(storedCustomerId);

    if (storedCustomerData) {
      const parsed = JSON.parse(storedCustomerData);
      setForm({
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        email: parsed.customer.email || "",
        phoneNumber: parsed.phoneNumber || "",
        birthDate: parsed.birthdate
          ? new Date(parsed.birthdate).toISOString().split("T")[0]
          : "",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId) return alert("Customer ID not found!");
    setLoading(true);

    try {
      const payload: fillCustomerProfilePayload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        birthdate: form.birthDate ? new Date(form.birthDate) : undefined,
      };

      const response = await fillCustomerProfile(payload, customerId);

      if (response.success) {
        localStorage.setItem(
          "customerData",
          JSON.stringify({ ...form, birthdate: form.birthDate })
        );
        alert("Profile updated successfully!");
        window.location.reload(); // refresh UI
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
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
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
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
            disabled={loading}
            className="bg-[#F6A5C1] hover:bg-pink-400 text-white font-medium py-3 px-8 transition duration-150 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
