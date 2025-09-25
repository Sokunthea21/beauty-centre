"use client";

import { useState } from "react";

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

  return (
    <div className="bg-white p-6 flex-1">
      <h2 className="font-semibold mb-6">My Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Contact Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            className="w-full border p-2"
          />
        </div>
      </div>

      <button className="mt-6 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
        Save Changes
      </button>
    </div>
  );
}
