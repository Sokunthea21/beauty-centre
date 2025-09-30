// app/slider/page.tsx

import React from 'react';
import Link from 'next/link';
import { Upload, Plus } from 'lucide-react';

// --- Reusable Component Helpers (for consistent styling) ---

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    {children}
  </div>
);

const InputField: React.FC<{ label: string, placeholder: string }> = ({ label, placeholder }) => (
  <div className="space-y-1">
    {/* Asterisk (*) added to label to indicate required field, matching the image */}
    <label className="text-sm font-medium text-gray-700">{label} *</label>
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

export default function SliderManagementPage() {
  return (
    <div className="p-6min-h-screen">
      
      {/* Header: Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Slider
        </h1>
        {/* No upload button in the header in the provided image, so we omit it */}
      </div>

      {/* Form Card */}
      <div > {/* Slightly wider for slider content */}
        <Card>
          <div className="space-y-6">
            
            {/* Title Input */}
            <InputField 
              label="Title" 
              placeholder="EnterTitle" 
            />

            {/* Description Input */}
            <InputField 
              label="Description" 
              placeholder="Enter product name" 
            />

            {/* Slider Image Upload */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Slider Image *</label>
              <ImageUploadArea />
            </div>
            
            {/* Add Image Button (styled like a primary action) */}
            <div className="pt-4">
                <button className="flex items-center bg-[#F6A5C1]  hover:bg-pink-400 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition duration-150">
                    <Plus size={18} className="mr-1"/> Add Image
                </button>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}