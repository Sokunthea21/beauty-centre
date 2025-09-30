"use client";

import { useState } from "react";

export default function UpdatePasswordForm() {
  const [form, setForm] = useState({
    // Removed currentPassword field to match the visual request
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear messages on change
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    if (form.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    // --- API Call Simulation ---
    console.log("Password change submitted:", form);
    setSuccess("Your password has been updated successfully!");

    // Optionally clear form after success
    setForm({ newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="w-full bg-white flex items-center justify-center">
      <div className=" p-10 sm:p-12 md:p-16 w-full max-w-lg text-center">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-gray-800 mb-10">
          UPDATE YOUR PASSWORD
        </h1>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="text-left">
            <label
              htmlFor="new-password"
              className="block text-base font-normal text-gray-800 mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition duration-150"
              required
              minLength={8}
            />
          </div>
          <div className="text-left">
            <label
              htmlFor="confirm-password"
              className="block text-base font-normal text-gray-800 mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="confirm new password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition duration-150"
              required
              minLength={8}
            />
          </div>

          {/* Error/Success Messages */}
          {error && (
            <p className="text-red-500 text-sm text-center font-medium">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm text-center font-medium">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-10 px-6 py-3 text-white uppercase tracking-wider 
                       bg-[#F6A5C1] hover:bg-pink-400 focus:outline-none 
                       focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition duration-200"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
