"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { createCategory } from "@/api/category.api"; // ✅ Make sure path is correct

// --- Interfaces ---
interface CategoryFormData {
  category: string;
  slug: string;
}

const initialFormData: CategoryFormData = {
  category: "",
  slug: "",
};

// --- Reusable Components ---

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

// --- Image Upload Component ---
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
        style={{ height: "200px" }}
      >
        {imageFile ? (
          <Image
            src={URL.createObjectURL(imageFile)}
            alt="Category Preview"
            width={400} // ✅ required
            height={200} // ✅ required
            unoptimized // ✅ needed for blob URLs
            className="absolute inset-0 z-0 opacity-90 w-full h-full object-cover"
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

// --- Main Page Component ---

export default function AddNewCategoryPage() {
  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof CategoryFormData]: value,
    }));
  };

  // Handle image file changes
  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.category || !formData.slug) {
      alert("⚠️ Please fill in both Category Name and Slug.");
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ Build payload
      const payload = {
        category: formData.category,
        categorySlug: formData.slug,
        categoryImage: imageFile || undefined,
      };

      // ✅ Call backend API
      const response = await createCategory(payload);

      if (response.success) {
        alert(`✅ Category '${formData.category}' created successfully!`);
        setFormData(initialFormData);
        setImageFile(null);
      } else {
        alert(`❌ Failed: ${response.message || "Unknown error occurred"}`);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("❌ An error occurred while creating the category.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New Category
        </h1>
        <button
          type="submit"
          form="add-category-form"
          className="bg-[#F6A5C1] hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center"
          disabled={isSubmitting}
        >
          <Upload size={18} className="mr-1" />
          {isSubmitting ? "Uploading..." : "Upload Category"}
        </button>
      </div>

      {/* Form */}
      <div className="mx-auto">
        <form id="add-category-form" onSubmit={handleSubmit}>
          <Card>
            <div className="space-y-6">
              {/* Category Name */}
              <InputField
                label="Category Name"
                placeholder="e.g., Skincare, Makeup, Fragrance"
                id="category"
                value={formData.category}
                onChange={handleChange}
              />

              {/* Category Slug */}
              <InputField
                label="Category Slug (URL path)"
                placeholder="e.g., skincare, makeup-deals"
                id="slug"
                value={formData.slug}
                onChange={handleChange}
              />

              {/* Category Image */}
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
