// components/AddProductForm.tsx (or index.tsx in your page folder)

import React from 'react';

// --- Helper Components Definitions ---

// 1. Card Component
interface CardProps {
  title: string;
  children: React.ReactNode;
  removeTitleStyle?: boolean;
}

const Card: React.FC<CardProps> = ({ title, children, removeTitleStyle = false }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    <h2
      className={`mb-4 text-xl ${
        removeTitleStyle 
          ? 'font-medium text-gray-800' 
          : 'font-semibold text-gray-800 border-b pb-3 mb-5'
      }`}
    >
      {title}
    </h2>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

// 2. InputField Component
interface InputFieldProps {
  label: string;
  placeholder: string;
  id: string;
  textarea?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, id, textarea = false, className = '' }) => {
  const InputComponent = textarea ? 'textarea' : 'input';

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <InputComponent
        id={id}
        placeholder={placeholder}
        rows={textarea ? 4 : undefined}
        // Tailwind classes for input styling
        className={`w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ${
          textarea ? 'resize-none' : ''
        }`}
      />
    </div>
  );
};

// 3. Dropdown Component
interface DropdownProps {
  label: string;
  placeholder: string;
  id: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, placeholder, id }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <select
        id={id}
        // Tailwind classes for select styling
        className="appearance-none w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white focus:ring-pink-500 focus:border-pink-500 transition duration-150 pr-10"
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        <option value="electronics">Electronics</option>
        <option value="apparel">Apparel</option>
      </select>
      {/* Custom arrow icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  </div>
);

// 4. ImageUpload Component
const ImageUpload: React.FC = () => (
  <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl text-center cursor-pointer hover:border-pink-400 transition duration-150">
    <div className="flex flex-col items-center justify-center space-y-2">
      {/* Upload Icon */}
      <svg
        className="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        ></path>
      </svg>
      <p className="text-sm font-medium text-gray-500">
        Click to upload photo
      </p>
    </div>
    <input type="file" className="hidden" multiple accept="image/*" />
  </div>
);

// --- Main AddProductForm Component ---

export default function AddProductForm() {
  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New product
        </h1>
        <button className="bg-[#F6A5C1] hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
            ></path>
          </svg>
          Upload Product
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (General Information) */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="General Information">
            <InputField
              label="Product Name"
              placeholder="Enter product name"
              id="product-name"
            />
            <InputField
              label="Product Description"
              placeholder="Enter product Description..."
              id="product-description"
              textarea
            />
            <Dropdown
              label="Product Category"
              placeholder="Select product category"
              id="category"
            />
            <Dropdown label="Brand" placeholder="Select brand" id="brand" />

            {/* Stock Status Section */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <InputField
                  label="Stock Status"
                  placeholder="Enter stock quantity"
                  id="stock-quantity"
                />
              </div>
              <div className="mt-7"> 
                 <div className="p-3 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg border border-gray-300 shadow-sm whitespace-nowrap">
                   In stoke
                 </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (Image and Price) */}
        <div className="lg:col-span-1 space-y-6">
          <Card title="Product Image" removeTitleStyle>
            <ImageUpload />
            
            {/* Thumbnail Placeholders */}
            <div className="flex space-x-3 mt-4">
                <div className="w-16 h-16 bg-white border border-dashed border-gray-300 rounded-lg"></div>
                <div className="w-16 h-16 bg-white border border-dashed border-gray-300 rounded-lg"></div>
                <div className="w-16 h-16 bg-white border border-dashed border-gray-300 rounded-lg"></div>
                <div className="w-16 h-16 bg-white border border-dashed border-gray-300 rounded-lg"></div>
            </div>

            <InputField
              label="Product Price"
              placeholder="Enter product price"
              id="price"
              className="mt-6"
            />
            <InputField
              label="Product weight"
              placeholder="Enter product /g or ml"
              id="weight"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}