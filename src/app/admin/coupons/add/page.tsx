"use client"; // <-- ADD THIS LINE

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
// Note: Link is not used, but included in my previous response. I'll keep the imports clean here.

// --- Reusable Component Helpers (for consistent styling) ---

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    {children}
  </div>
);

// General Input Field
const InputField: React.FC<{ label: string, placeholder: string, type?: string }> = ({ label, placeholder, type = 'text' }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label} *</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500 transition"
    />
  </div>
);

// Dropdown/Select Field
const SelectField: React.FC<{ label: string, options: string[] }> = ({ label, options }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label} *</label>
    <div className="relative">
      <select className="appearance-none w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white focus:ring-pink-500 focus:border-pink-500 pr-10">
        <option value="" disabled selected>Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
      </div>
    </div>
  </div>
);

// Status Toggle (for Active/Inactive)
const StatusToggle: React.FC<{ label: string }> = ({ label }) => {
    const [isActive, setIsActive] = useState(true);

    return (
        <div className="flex items-center justify-between pt-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                    isActive ? 'bg-pink-500' : 'bg-gray-200'
                }`}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                        isActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
            </button>
        </div>
    );
};

// --- Main Component ---

export default function AddNewCouponPage() {
  return (
    <div className="p-6 min-h-screen">
      
      {/* Header: Title and Upload Button (consistent with other forms) */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New Coupon
        </h1>
        <button className="bg-[#F6A5C1] hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center">
          <Upload size={18} className="mr-1"/> Save Coupon
        </button>
      </div>

      {/* Form Card */}
      <div> {/* Constraining width for a clean form look */}
        <Card>
          <div className="space-y-6">
            
            {/* Coupon Code & Type */}
            <div className="grid grid-cols-2 gap-4">
                <InputField 
                    label="Coupon Code" 
                    placeholder="E.g., SUMMERSALE20" 
                />
                <SelectField 
                    label="Discount Type" 
                    options={["Percentage (%)", "Fixed Amount ($)", "Free Shipping"]}
                />
            </div>
            
            {/* Discount Value & Expiry Date */}
            <div className="grid grid-cols-2 gap-4">
                <InputField 
                    label="Discount Value" 
                    placeholder="E.g., 20 or 15.00"
                    type="number"
                />
                <InputField 
                    label="Expiry Date" 
                    placeholder="YYYY/MM/DD"
                    type="date"
                />
            </div>

            {/* Minimum Purchase & Usage Limit */}
            <div className="grid grid-cols-2 gap-4">
                <InputField 
                    label="Minimum Purchase ($)" 
                    placeholder="E.g., 50.00"
                    type="number"
                />
                 <InputField 
                    label="Usage Limit" 
                    placeholder="E.g., 100"
                    type="number"
                />
            </div>

            {/* Status Toggle */}
            <StatusToggle label="Coupon Status" />

          </div>
        </Card>
      </div>
    </div>
  );
}