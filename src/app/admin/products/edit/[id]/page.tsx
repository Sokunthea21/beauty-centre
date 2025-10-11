"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getProductById, updateProduct } from '@/api/product.api'; // Assume updateProduct and getProductById exist
import { getBrands } from '@/api/brand.api';
import { getCategories } from '@/api/category.api';
import { X, Trash2 } from 'lucide-react'; // Import icons for image removal

// --- Interfaces ---

interface Brand {
    id: number;
    brand: string;
}

interface Category {
    id: number;
    category: string;
}

interface ExistingImage {
    id: number; // The ID of the image record on the server
    imageUrl: string; // The URL to display the image
}

// Extended form data to include the new fields present in your form
interface ProductFormData {
    productName: string;
    productDescription: string;
    recommendedFor: string; // New
    howToUse: string;       // New
    ingredients: string;    // New
    categoryId: string;
    brandId: string;
    stockQuantity: string;
    price: string;
}

const initialFormData: ProductFormData = {
    productName: '',
    productDescription: '',
    recommendedFor: '',
    howToUse: '',
    ingredients: '',
    categoryId: '',
    brandId: '',
    stockQuantity: '',
    price: '',
};

// --- Reusable Component Helpers (Copied from AddProductForm) ---

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


interface ImageEditProps {
    onNewImageChange: (files: FileList | null) => void;
    newImages: File[];
    onRemoveNewImage: (index: number) => void;
    existingImages: ExistingImage[];
    onRemoveExistingImage: (id: number) => void;
}

const ImageEdit: React.FC<ImageEditProps> = ({
    onNewImageChange, 
    newImages, 
    onRemoveNewImage, 
    existingImages, 
    onRemoveExistingImage
}) => {
    const totalImages = existingImages.length + newImages.length;
    const maxImages = 4;
    
    return (
        <div>
            {/* Image Upload Area */}
            <label htmlFor="image-upload" className={`block border-2 border-dashed p-8 rounded-xl text-center cursor-pointer transition duration-150 ${totalImages >= maxImages ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-pink-400 hover:border-pink-600 text-pink-500'}`}>
                <div className="flex flex-col items-center justify-center space-y-2">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="text-sm font-medium">Click to upload photo</p>
                    <p className="text-xs">{totalImages}/{maxImages} images total</p>
                </div>
            </label>
            <input 
                id="image-upload" 
                type="file" 
                className="hidden" 
                multiple 
                accept="image/*" 
                onChange={(e) => onNewImageChange(e.target.files)}
                disabled={totalImages >= maxImages}
                key={newImages.length} // Force re-render of file input after file selection
            />

            {/* Image Previews */}
            {(totalImages > 0) && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                    
                    {/* Existing Images */}
                    {existingImages.map((image) => (
                        <div key={image.id} className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300 shadow-sm group">
                            <Image 
                                src={image.imageUrl} 
                                alt={`Existing Image ${image.id}`} 
                                layout="fill" 
                                objectFit="cover"
                            />
                            <button
                                type="button"
                                onClick={() => onRemoveExistingImage(image.id)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                aria-label="Remove existing image"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                    
                    {/* New Images */}
                    {newImages.map((image, index) => (
                        <div key={`new-${index}`} className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-300 shadow-sm group">
                            <Image 
                                src={URL.createObjectURL(image)} 
                                alt={`New Image ${index + 1}`} 
                                layout="fill" 
                                objectFit="cover"
                            />
                            <button
                                type="button"
                                onClick={() => onRemoveNewImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                aria-label="Remove new image"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}

                    {/* Empty Placeholders */}
                    {[...Array(Math.max(0, maxImages - totalImages))].map((_, index) => (
                        <div key={`empty-${index}`} className="w-full aspect-square bg-gray-50 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">Empty</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Main Component: EditProductPage ---

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams(); // Next.js App Router for dynamic params

    const [formData, setFormData] = useState<ProductFormData>(initialFormData);
    const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const productId = Array.isArray(id) ? id[0] : id; // Handle case where 'id' might be a string array

    // Fetch dependencies and product data
    useEffect(() => {
        if (!productId) return;

        const fetchData = async () => {
            try {
                // 1. Fetch dependencies (brands/categories)
                const [brandRes, categoryRes] = await Promise.all([getBrands(), getCategories()]);
                if (brandRes.success && brandRes.data) setBrands(brandRes.data);
                if (categoryRes.success && categoryRes.data) setCategories(categoryRes.data);

                // 2. Fetch specific product data
                const productRes = await getProductById(productId);

                if (productRes.success && productRes.data) {
                    const product = productRes.data;
                    setFormData({
                        productName: product.name || '',
                        productDescription: product.description || '',
                        recommendedFor: product.recommendedFor || '',
                        howToUse: product.howToUse || '',
                        ingredients: product.ingredients || '',
                        categoryId: product.categoryId ? String(product.categoryId) : '',
                        brandId: product.brandId ? String(product.brandId) : '',
                        stockQuantity: String(product.stock) || '0',
                        price: String(product.price) || '0.00',
                    });
                    
                    // Map server images to the ExistingImage interface
                    if (product.productImages && Array.isArray(product.productImages)) {
                        setExistingImages(product.productImages.map((img: any) => ({
                            id: img.id, // Ensure this matches your server image ID structure
                            imageUrl: img.imageUrl || img.productImage // Adjust property name as needed
                        })));
                    }
                } else {
                    setError("Failed to load product data.");
                }

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("An error occurred while fetching product details.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [productId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleNewImageChange = (files: FileList | null) => {
        if (files) {
            const newFiles = Array.from(files);
            const currentTotal = existingImages.length + newImages.length;
            const availableSlots = 4 - currentTotal;

            setNewImages(prev => {
                const combined = [...prev, ...newFiles.slice(0, availableSlots)];
                return combined.slice(0, 4 - existingImages.length); // Max total of 4
            });
        }
    };

    const handleRemoveNewImage = (index: number) => {
        setNewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (id: number) => {
        setExistingImages(prev => prev.filter(img => img.id !== id));
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!formData.productName || !formData.price || (existingImages.length + newImages.length) === 0) {
            alert("Please fill in required fields and ensure there is at least one image.");
            return;
        }

        if (!formData.categoryId || !formData.brandId) {
            alert("Please select a category and brand.");
            return;
        }

        setIsSubmitting(true);

        const payload = new FormData();
        payload.append('name', formData.productName);
        payload.append('description', formData.productDescription);
        payload.append('recommendedFor', formData.recommendedFor);
        payload.append('howToUse', formData.howToUse);
        payload.append('ingredients', formData.ingredients);
        payload.append('price', formData.price);
        payload.append('categoryId', formData.categoryId);
        payload.append('brandId', formData.brandId);
        payload.append('stock', formData.stockQuantity);
        
        // 1. Append new files
        newImages.forEach(file => {
            payload.append('newProductImages', file); // Use a distinct key for new files
        });

        // 2. Append IDs of images to keep
        const imageIdsToKeep = existingImages.map(img => img.id);
        payload.append('imagesToKeep', JSON.stringify(imageIdsToKeep));


        try {
            // Assume updateProduct takes the product ID and the FormData payload
            const response = await updateProduct(productId, payload); 

            if (response.success) {
                alert("✅ Product updated successfully!");
                router.push("/admin/products"); // Navigate back to the list
            } else {
                alert("❌ Failed to update product: " + (response.message || "Unknown error"));
            }
        } catch (error) {
            console.error(error);
            alert("❌ Error updating product");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div className="p-6 text-center text-gray-500">Loading product details...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600 font-medium">Error: {error}</div>;
    }

    const stockStatus = parseInt(formData.stockQuantity) > 0 ? "In stock" : (formData.stockQuantity === "" ? "Unknown" : "Out of stock");

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Edit Product: {formData.productName}</h1>
                <button 
                    type="submit" 
                    form="edit-product-form" 
                    disabled={isSubmitting}
                    className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-150 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>

            <form id="edit-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card title="General Information">
                        <InputField label="Product Name*" id="productName" value={formData.productName} onChange={handleChange} placeholder="Enter product name" required/>
                        <InputField label="Recommended for" id="recommendedFor" value={formData.recommendedFor} onChange={handleChange} placeholder="Enter recommended for"/>
                        <InputField label="Product Description" id="productDescription" textarea value={formData.productDescription} onChange={handleChange} placeholder="Enter product description"/>
                        <InputField label="How to Use" id="howToUse" textarea value={formData.howToUse} onChange={handleChange} placeholder="Enter how to use"/>
                        <InputField label="Ingredients" id="ingredients" textarea value={formData.ingredients} onChange={handleChange} placeholder="Enter ingredients"/>
                        <Dropdown 
                            label="Category*" 
                            placeholder="Select category" 
                            id="categoryId" 
                            value={formData.categoryId} 
                            onChange={handleChange} 
                            options={categories.map(c => ({id: c.id, name: c.category}))}
                        />
                        <Dropdown 
                            label="Brand*" 
                            placeholder="Select brand" 
                            id="brandId" 
                            value={formData.brandId} 
                            onChange={handleChange} 
                            options={brands.map(b => ({id: b.id, name: b.brand}))}
                        />
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
                        <ImageEdit 
                            existingImages={existingImages} 
                            onRemoveExistingImage={handleRemoveExistingImage}
                            newImages={newImages} 
                            onNewImageChange={handleNewImageChange} 
                            onRemoveNewImage={handleRemoveNewImage}
                        />
                        <InputField label="Product Price*" id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Enter price" className="mt-6" min="0" required/>
                    </Card>
                </div>
            </form>
        </div>
    );
}