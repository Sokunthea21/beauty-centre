"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { createProduct } from '@/api/product.api';
import { getBrands } from '@/api/brand.api';
import { getCategories } from '@/api/category.api';

// --- Interfaces ---

interface Brand {
    id: number;
    brand: string;
}

interface Category {
    id: number;
    category: string;
}

interface ProductFormData {
    productName: string;
    productDescription: string;
    categoryId: string;
    brandId: string;
    stockQuantity: string;
    price: string;
}

const initialFormData: ProductFormData = {
    productName: '',
    productDescription: '',
    categoryId: '',
    brandId: '',
    stockQuantity: '',
    price: '',
};

// --- Components ---

const Card: React.FC<{title: string, children: React.ReactNode, removeTitleStyle?: boolean}> = ({title, children, removeTitleStyle = false}) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h2 className={`mb-4 text-xl ${removeTitleStyle ? 'font-medium text-gray-800' : 'font-semibold text-gray-800 border-b pb-3 mb-5'}`}>
            {title}
        </h2>
        <div className="space-y-4">{children}</div>
    </div>
);

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    id: keyof ProductFormData;
    textarea?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({label, id, textarea = false, value, onChange, ...props}) => {
    const InputComponent = textarea ? 'textarea' : 'input';
    return (
        <div className="space-y-1">
            <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
            <InputComponent
                id={id}
                name={id}
                rows={textarea ? 4 : undefined}
                value={value}
                onChange={onChange}
                {...props}
                className={`w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:ring-pink-500 focus:border-pink-500 transition duration-150 ${textarea ? 'resize-none' : ''}`}
            />
        </div>
    );
};

interface DropdownProps {
    label: string;
    placeholder: string;
    id: keyof ProductFormData;
    value: string;
    options: {id: number, name: string}[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({label, placeholder, id, value, options, onChange}) => (
    <div className="space-y-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">{label}</label>
        <div className="relative">
            <select
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="appearance-none w-full border border-gray-300 rounded-lg p-3 text-gray-700 bg-white focus:ring-pink-500 focus:border-pink-500 transition duration-150 pr-10"
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
            </div>
        </div>
    </div>
);

interface ImageUploadProps {
    onImageChange: (files: FileList | null) => void;
    images: File[];
    onRemoveImage: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({onImageChange, images, onRemoveImage}) => (
    <div>
        <label htmlFor="image-upload" className="block border-2 border-dashed border-gray-300 p-8 rounded-xl text-center cursor-pointer hover:border-pink-400 transition duration-150">
            <div className="flex flex-col items-center justify-center space-y-2">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="text-sm font-medium text-gray-500">Click to upload photo</p>
                <p className="text-xs text-gray-400">{images.length}/4 images uploaded</p>
            </div>
        </label>
        <input 
            id="image-upload" 
            type="file" 
            className="hidden" 
            multiple 
            accept="image/*" 
            onChange={(e) => onImageChange(e.target.files)}
            disabled={images.length >= 4}
        />
        {images.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-4">
                {images.map((image, index) => (
                    <div key={index} className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300 shadow-sm group">
                        <Image 
                            src={URL.createObjectURL(image)} 
                            alt={`Image ${index + 1}`} 
                            layout="fill" 
                            objectFit="cover"
                        />
                        <button
                            type="button"
                            onClick={() => onRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                            aria-label={`Remove image ${index + 1}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                {[...Array(Math.max(0, 4 - images.length))].map((_, index) => (
                    <div key={`empty-${index}`} className="w-full aspect-square bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Empty</span>
                    </div>
                ))}
            </div>
        )}
    </div>
);

// --- Main Component ---

export default function AddProductForm() {
    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
    const [images, setImages] = useState<File[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const brandRes = await getBrands();
            const categoryRes = await getCategories();
            if (brandRes.success && brandRes.data) setBrands(brandRes.data);
            if (categoryRes.success && categoryRes.data) setCategories(categoryRes.data);
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleImageChange = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files);
            // Add new images to existing ones, but limit to 4 total
            setImages(prev => {
                const combined = [...prev, ...newFiles];
                return combined.slice(0, 4);
            });
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.productName || !formData.price || images.length === 0) {
            alert("Please fill in required fields and upload at least one image.");
            return;
        }

        if (!formData.categoryId || !formData.brandId) {
            alert("Please select a category and brand.");
            return;
        }

        setIsSubmitting(true);

        const payload = {
            name: formData.productName,
            description: formData.productDescription,
            price: parseFloat(formData.price),
            categoryId: parseInt(formData.categoryId),
            brandId: parseInt(formData.brandId),
            stock: parseInt(formData.stockQuantity) || 0,
            productImages: images
        };

        try {
            const response = await createProduct(payload);
            if (response.success) {
                alert("✅ Product created successfully!");
                // Reset form
                setFormData(initialFormData);
                setImages([]);
                // Reset file input
                const fileInput = document.getElementById('image-upload') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            } else {
                alert("❌ Failed to create product: " + (response.message || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("❌ Error creating product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const stockStatus = parseInt(formData.stockQuantity) > 0 ? "In stock" : (formData.stockQuantity === "" ? "Unknown" : "Out of stock");

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Add New Product</h1>
                <button 
                    type="submit" 
                    form="add-product-form" 
                    disabled={isSubmitting}
                    className="bg-[#F6A5C1] hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </>
                    ) : (
                        'Upload Product'
                    )}
                </button>
            </div>

            <form id="add-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card title="General Information">
                        <InputField label="Product Name*" id="productName" value={formData.productName} onChange={handleChange} placeholder="Enter product name" required/>
                        <InputField label="Product Description" id="productDescription" textarea value={formData.productDescription} onChange={handleChange} placeholder="Enter product description"/>
                        <Dropdown label="Category*" placeholder="Select category" id="categoryId" value={formData.categoryId} onChange={handleChange} options={categories.map(c => ({id: c.id, name: c.category}))}/>
                        <Dropdown label="Brand*" placeholder="Select brand" id="brandId" value={formData.brandId} onChange={handleChange} options={brands.map(b => ({id: b.id, name: b.brand}))}/>
                        <div className="flex items-end space-x-4">
                            <div className="flex-1">
                                <InputField label="Stock Quantity" id="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleChange} placeholder="Enter stock quantity" min="0"/>
                            </div>
                            <div className={`p-3 text-sm font-medium rounded-lg border shadow-sm whitespace-nowrap 
                                ${stockStatus === 'In stock' ? 'bg-green-100 text-green-700 border-green-300' : 
                                  stockStatus === 'Out of stock' ? 'bg-red-100 text-red-700 border-red-300' : 'bg-gray-200 text-gray-700 border-gray-300'}`}>
                                {stockStatus}
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <Card title="Product Image & Price" removeTitleStyle>
                        <ImageUpload images={images} onImageChange={handleImageChange} onRemoveImage={handleRemoveImage}/>
                        <InputField label="Product Price*" id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Enter price" className="mt-6" min="0" required/>
                    </Card>
                </div>
            </form>
        </div>
    );
}