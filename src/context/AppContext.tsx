'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// NOTE: Assuming '@/app/assets/assets' and '@/types' resolve correctly.
import { productsDummyData, userDummyData } from '@/app/assets/assets'; 
import { Product } from '@/types'; 

// Extended Product type for dummy data mapping
interface ProductDummy extends Product {
    id: string; // Used in productsDummyData before mapping to _id
}

interface AppContextType {
    currency: string | undefined;
    router: ReturnType<typeof useRouter>;
    isSeller: boolean;
    setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
    userData: typeof userDummyData | null;
    fetchUserData: () => Promise<void>;
    products: Product[];
    fetchProductData: () => Promise<void>;
    cartItems: Record<string, number>;
    setCartItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
    // Function to add item (increments quantity by 1)
    addToCart: (itemId: string) => Promise<void>;
    updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
    getCartCount: () => number;
    getCartAmount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppContextProvider');
    }
    return context;
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    // Note: process.env.NEXT_PUBLIC_CURRENCY only works on client side; 
    // it's safe here since this is a 'use client' component.
    const currency = process.env.NEXT_PUBLIC_CURRENCY; 
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [userData, setUserData] = useState<typeof userDummyData | null>(null);
    const [isSeller, setIsSeller] = useState<boolean>(true);
    const [cartItems, setCartItems] = useState<Record<string, number>>({});

    const fetchProductData = async () => {
        // Replace this with a real fetch call when using API
        setProducts(
            (productsDummyData as unknown as ProductDummy[]).map((product) => ({
                ...product,
                _id: product.id, // Map id to _id
                // Use a fallback for mainImage if images array is missing or empty
                mainImage: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png', 
                // Ensure offerPrice is correctly set, assuming it's an optional property on Product
                offerPrice: product.offerPrice, 
            }))
        );
    };

    const fetchUserData = async () => {
        // Replace this with a real fetch call when using API
        setUserData(userDummyData);
    };

    /** Adds 1 to the quantity of the specified item in the cart. */
    const addToCart = async (itemId: string) => {
        setCartItems(prev => {
            const updated = { ...prev };
            updated[itemId] = (updated[itemId] || 0) + 1;
            return updated;
        });
    };

    /** Sets the exact quantity for an item, or removes it if quantity is 0 or less. */
    const updateCartQuantity = async (itemId: string, quantity: number) => {
        setCartItems(prev => {
            const updated = { ...prev };
            if (quantity <= 0) {
                delete updated[itemId];
            } else {
                updated[itemId] = quantity;
            }
            return updated;
        });
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
    };

    const getCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (product) {
                const quantity = cartItems[itemId];
                // Use offerPrice if available, otherwise use price
                const price = product.offerPrice !== undefined && product.offerPrice !== null ? product.offerPrice : product.price; 
                total += price * quantity;
            }
        }
        return Math.round(total * 100) / 100; // Round to two decimal places
    };

    useEffect(() => {
        fetchProductData();
        fetchUserData();
    }, []);

    const value: AppContextType = {
        currency,
        router,
        isSeller,
        setIsSeller,
        userData,
        fetchUserData,
        products,
        fetchProductData,
        cartItems,
        setCartItems,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
