"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// --- Interface and Initial State ---

interface ProductFormData {
    productName: string;
    productDescription: string;
    category: string;
    brand: string;
    stockQuantity: string;
    price: string;
    weight: string;
}

const initialFormData: ProductFormData = {
    productName: '',
    productDescription: '',
    category: '',
    brand: '',
    stockQuantity: '',
    price: '',
    weight: ''
};

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
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    id: keyof ProductFormData;
    textarea?: boolean;
    className?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, textarea = false, className = '', value, onChange, ...props }) => {
    const InputComponent = textarea ? 'textarea' : 'input';

    return (
        <div className={`space-y-1 ${className}`}>
            <label htmlFor={id} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <InputComponent
                id={id}
                name={id}
                rows={textarea ? 4 : undefined}
                value={value}
                onChange={onChange}
                {...props} // Pass through other props like placeholder
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
    id: keyof ProductFormData;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, placeholder, id, value, onChange }) => (
    <div className="space-y-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}
        </label>
        <div className="relative">
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="appearance-none w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white focus:ring-pink-500 focus:border-pink-500 transition duration-150 pr-10"
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                <option value="skincare">Skincare</option>
                <option value="makeup">Makeup</option>
                <option value="haircare">Haircare</option>
                <option value="fragrance">Fragrance</option>
            </select>
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
interface ImageUploadProps {
    onImageChange: (files: FileList | null) => void;
    images: File[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, images }) => {
    return (
        <div>
            <label
                htmlFor="image-upload"
                className="block border-2 border-dashed border-gray-300 p-8 rounded-xl text-center cursor-pointer hover:border-pink-400 transition duration-150"
            >
                <div className="flex flex-col items-center justify-center space-y-2">
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
            </label>
            <input
                id="image-upload"
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={(e) => onImageChange(e.target.files)}
            />
            
            {/* Thumbnail Preview Area */}
            {images.length > 0 && (
                <div className="flex space-x-3 mt-4 overflow-x-auto p-1">
                    {images.map((image, index) => (
                        <div key={index} className="w-16 h-16 relative flex-shrink-0 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                            {/* Use a temporary URL for preview */}
                            <Image
                                src={URL.createObjectURL(image)}
                                alt={`Thumbnail ${index}`}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    ))}
                    {/* Add back the placeholder for new images if desired */}
                    {images.length < 4 && (
                        <div className="w-16 h-16 flex-shrink-0 bg-white border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                            +{4 - images.length} More
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// --- Main AddProductForm Component ---

export default function AddProductForm() {
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
    const [images, setImages] = useState<File[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name as keyof ProductFormData]: value
        }));
    };

    const handleImageChange = (files: FileList | null) => {
        if (files) {
            // Limit to a reasonable number of images (e.g., 4)
            const fileArray = Array.from(files).slice(0, 4); 
            setImages(fileArray);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validation (Basic)
        if (!formData.productName || !formData.price || images.length === 0) {
            alert('Please fill in the product name, price, and upload at least one image.');
            return;
        }

        // 1. Create a FormData object to handle both text and files
        const data = new FormData();

        // 2. Append all text fields
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key as keyof ProductFormData]);
        });

        // 3. Append image files
        images.forEach((file, index) => {
            data.append(`productImage_${index}`, file);
        });

        // --- PLACEHOLDER API CALL ---
        console.log('--- Submitting Product Data ---');
        for (const [key, value] of data.entries()) {
            console.log(key, value);
        }
        
        // Replace the code below with your actual API endpoint logic
        try {
            // Placeholder: Simulate network delay and success
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            console.log('Submission successful!');
            alert('✅ Product added successfully! Check the console for the form data.');

            // Clear the form after success
            setFormData(initialFormData);
            setImages([]);

        } catch (error) {
            console.error('Submission error:', error);
            alert('❌ Failed to add product. See console for details.');
        }
        // --- END PLACEHOLDER API CALL ---
    };

    const stockStatus = parseInt(formData.stockQuantity) > 0 ? 'In stock' : (formData.stockQuantity === '' ? 'Unknown' : 'Out of stock');

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">
                    Add New product
                </h1>
                <button
                    type="submit"
                    form="add-product-form"
                    className="bg-[#F6A5C1] hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center"
                >
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

            <form id="add-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (General Information) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="General Information">
                        <InputField
                            label="Product Name"
                            placeholder="Enter product name"
                            id="productName"
                            value={formData.productName}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Product Description"
                            placeholder="Enter product Description..."
                            id="productDescription"
                            textarea
                            value={formData.productDescription}
                            onChange={handleChange}
                        />
                        <Dropdown
                            label="Product Category"
                            placeholder="Select product category"
                            id="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                        <Dropdown
                            label="Brand"
                            placeholder="Select brand"
                            id="brand"
                            value={formData.brand}
                            onChange={handleChange}
                        />
                        
                        {/* Stock Status Section */}
                        <div className="flex items-end space-x-4">
                            <div className="flex-1">
                                <InputField
                                    label="Stock Quantity"
                                    placeholder="Enter stock quantity"
                                    id="stockQuantity"
                                    type="number"
                                    value={formData.stockQuantity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`p-3 text-sm font-medium rounded-lg border shadow-sm whitespace-nowrap 
                                ${stockStatus === 'In stock' ? 'bg-green-100 text-green-700 border-green-300' : 
                                  stockStatus === 'Out of stock' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
                            >
                                {stockStatus}
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column (Image and Price) */}
                <div className="lg:col-span-1 space-y-6">
                    <Card title="Product Image" removeTitleStyle>
                        <ImageUpload images={images} onImageChange={handleImageChange} />
                        <InputField
                            label="Product Price"
                            placeholder="Enter product price"
                            id="price"
                            type="number"
                            step="0.01"
                            className="mt-6"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Product weight"
                            placeholder="Enter product /g or ml"
                            id="weight"
                            value={formData.weight}
                            onChange={handleChange}
                        />
                    </Card>
                </div>
            </form>
        </div>
    );
}