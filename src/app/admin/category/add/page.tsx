"use client";
import React, { useState } from "react";
import Link from "next/link";
// import Image from 'next/image'; // Removed to fix build error
import { Upload } from "lucide-react";

// --- Interface and Initial State ---

interface CategoryFormData {
  category: string;
  slug: string;
}

const initialFormData: CategoryFormData = {
  category: "",
  slug: "",
};

// --- Reusable Component Helpers (for consistent styling) ---

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    {children}
  </div>
);

interface InputFieldProps {
  label: string;
  placeholder: string;
  id: keyof CategoryFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  id,
  value,
  onChange,
}) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500 transition"
    />
  </div>
);

interface ImageUploadAreaProps {
  imageFile: File | null;
  onImageChange: (file: File | null) => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  imageFile,
  onImageChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
  };

  return (
    <div>
      <label
        htmlFor="category-image-upload"
        className="block border-2 border-dashed border-gray-300 p-8 rounded-xl text-center cursor-pointer hover:border-pink-400 transition duration-150 relative overflow-hidden"
        style={{ height: "200px" }} // Set a fixed height for a better visual card size
      >
        {imageFile ? (
          // Use standard HTML <img> instead of next/image
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Category Preview"
            className="absolute inset-0 z-0 opacity-80 w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 h-full">
            <Upload className="w-10 h-10 text-gray-400 z-10" />
            <p className="text-sm font-medium text-gray-500 z-10">
              Click to upload photo
            </p>
          </div>
        )}
      </label>
      <input
        id="category-image-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

// --- Main Component ---

export default function AddNewCategoryPage() {
  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof CategoryFormData]: value,
    }));
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.category || !formData.slug || !imageFile) {
      // Using a simple alert for now as custom modals take more code
      alert("Please fill in Category Name, Slug, and upload an Image.");
      return;
    }

    // 1. Create FormData object
    const data = new FormData();
    data.append("categoryName", formData.category);
    data.append("categorySlug", formData.slug);
    data.append("categoryImage", imageFile);

    // --- PLACEHOLDER API CALL ---
    console.log("--- Submitting Category Data ---");
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      // Placeholder: Simulate network delay and success
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Category submission successful!");
      alert(
        `✅ Category '${formData.category}' added successfully! Check the console for the submitted data.`
      );

      // Clear the form after success
      setFormData(initialFormData);
      setImageFile(null);
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ An error occurred during category upload.");
    }
    // --- END PLACEHOLDER API CALL ---
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header: Title and Upload Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New Category
        </h1>
        <button
          type="submit"
          form="add-category-form"
          className="bg-[#F6A5C1] hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center"
        >
          <Upload size={18} className="mr-1" /> Upload Category
        </button>
      </div>

      {/* Form Card Container */}
      <div className=" mx-auto">
        <form id="add-category-form" onSubmit={handleSubmit}>
          <Card>
            <div className="space-y-6">
              {/* Category Name Input */}
              <InputField
                label="Category Name"
                placeholder="e.g., Skincare, Makeup, Fragrance"
                id="category"
                value={formData.category}
                onChange={handleChange}
              />

              {/* Category Slug Input */}
              <InputField
                label="Category Slug (URL path)"
                placeholder="e.g., skincare, makeup-deals"
                id="slug"
                value={formData.slug}
                onChange={handleChange}
              />

              {/* Category Image Upload */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Category Image
                </label>
                <ImageUploadArea
                  imageFile={imageFile}
                  onImageChange={handleImageChange}
                />
                {imageFile && (
                  <p className="text-xs text-green-600 pt-1">
                    Selected: {imageFile.name}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
