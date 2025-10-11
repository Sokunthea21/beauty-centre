"use client";

import React, { useState } from "react";
import { Upload, Plus } from "lucide-react";
import Image from "next/image";
import { createSlider } from "@/api/slider.api"; // ✅ import your API

// --- Interface and Initial State ---
interface SliderFormData {
  title: string;
  description: string;
}

const initialFormData: SliderFormData = {
  title: "",
  description: "",
};

// --- UI Helpers ---
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">{children}</div>
);

interface InputFieldProps {
  label: string;
  placeholder: string;
  id: keyof SliderFormData;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, id, value, onChange }) => (
  <div className="space-y-1">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label} *-
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

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({ imageFile, onImageChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
  };

  return (
    <div>
      <label
        htmlFor="slider-image-upload"
        className="block border-2 border-dashed border-gray-300 p-8 rounded-xl text-center cursor-pointer hover:border-pink-400 transition duration-150 relative overflow-hidden"
        style={{ height: "200px" }}
      >
        {imageFile ? (
          <Image
            src={URL.createObjectURL(imageFile)}
            alt="Slider Preview"
            className="absolute inset-0 z-0 opacity-80 w-full h-full object-cover"
            width={200}
            height={200}
          />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 h-full">
            <Upload className="w-10 h-10 text-gray-400 z-10" />
            <p className="text-sm font-medium text-gray-500 z-10">Click to upload photo</p>
          </div>
        )}
      </label>
      <input
        id="slider-image-upload"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

// --- Main Component ---
export default function SliderManagementPage() {
  const [formData, setFormData] = useState<SliderFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File | null) => setImageFile(file);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !imageFile) {
      alert("Please fill in Title, Description, and upload a Slider Image.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await createSlider({
        title: formData.title,
        description: formData.description,
        sliderImage: imageFile,
      });

      if (response.success) {
        alert(`✅ Slider "${formData.title}" added successfully!`);
        setFormData(initialFormData);
        setImageFile(null);
      } else {
        alert(`❌ ${response.message}`);
      }
    } catch (err) {
      console.error("Slider upload error:", err);
      alert("❌ Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Slider Management</h1>
      </div>

      <div className="mx-auto">
        <form id="slider-form" onSubmit={handleSubmit}>
          <Card>
            <div className="space-y-6">
              <InputField
                label="Title"
                placeholder="Enter Title for the slider banner"
                id="title"
                value={formData.title}
                onChange={handleChange}
              />
              <InputField
                label="Description"
                placeholder="Enter a short description or call to action"
                id="description"
                value={formData.description}
                onChange={handleChange}
              />
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Slider Image *</label>
                <ImageUploadArea imageFile={imageFile} onImageChange={handleImageChange} />
                {imageFile && (
                  <p className="text-xs text-green-600 pt-1">Selected: {imageFile.name}</p>
                )}
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center bg-[#F6A5C1] hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150"
                >
                  <Plus size={18} className="mr-1" /> {isLoading ? "Uploading..." : "Add Slider Image"}
                </button>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
