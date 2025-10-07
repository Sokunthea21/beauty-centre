// src/types/product.ts

export interface Image {
    /** The source URL of the image. */
    url: string;
    /** Alternate text for accessibility. */
    alt: string;
}

/**
 * Defines the structure for a product object,
 * including all properties used in ProductDetails/component.tsx.
 */
export interface Product {
    // --- Core Properties (from previous definition) ---
    id: number;
    slug: string;
    name: string;
    description: string;
    price: number;
    
    // The previous imageUrl: string is replaced by the 'images' array below
    // imageUrl?: string; 
    
    stock: number;
    categories: string[];
    updatedAt?: string;

    // --- New Properties to Resolve Errors (2339) ---
    
    /** An array of product images. */
    images: Image[]; 
    
    /** The brand name of the product. */
    brand: string;
    
    /** The average customer rating. */
    rating: number;
    
    /** The total number of customer reviews. */
    reviewCount: number;
    
    /** The current stock status (e.g., "In Stock", "Low Stock", "Out of Stock"). */
    availability: 'In Stock' | 'Low Stock' | 'Out of Stock' | string;
    
    /** The general type of product (e.g., "Skincare", "Makeup"). */
    productType: string;
    
    /** Detailed list of ingredients. */
    ingredients: string[];
    
    /** Instructions on how to use the product (can be a string or an array of steps). */
    howToUse: string | string[];
    
    /** Information on who the product is recommended for (e.g., skin type, age). */
    recommendedFor: string;
}
