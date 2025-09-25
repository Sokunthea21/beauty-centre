// app/category/add/page.tsx

import React from 'react';
import Link from 'next/link';
import { Upload } from 'lucide-react';

// --- Reusable Component Helpers (for consistent styling) ---

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    {children}
  </div>
);

const InputField: React.FC<{ label: string, placeholder: string }> = ({ label, placeholder }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500 transition"
    />
  </div>
);

const ImageUploadArea: React.FC = () => (
  <div className="border-2 border-dashed border-gray-300 p-12 rounded-xl text-center cursor-pointer hover:border-pink-400 transition duration-150">
    <div className="flex flex-col items-center justify-center space-y-3">
      <Upload className="w-10 h-10 text-gray-400" />
      <p className="text-sm font-medium text-gray-500">Click to upload photo</p>
    </div>
    <input type="file" className="hidden" accept="image/*" />
  </div>
);

// --- Main Component ---

export default function AddNewCategoryPage() {
  return (
    <div className="p-6 bg-gray-50 h-screen">
      
      {/* Header: Title and Upload Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New Category
        </h1>
        <button className="bg-pink-400 hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center">
          <Upload size={18} className="mr-1"/> Upload Category
        </button>
      </div>

      {/* Form Card */}
      <div > {/* Constraining width for a clean form look */}
        <Card>
          <div className="space-y-6">
            
            {/* Category Name Input */}
            <InputField 
              label="Category" 
              placeholder="Enter product name" 
            />

            {/* Category Slug Input */}
            <InputField 
              label="Category slug" 
              placeholder="Enter product name" 
            />

            {/* Category Image Upload */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Category Image</label>
              <ImageUploadArea />
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}