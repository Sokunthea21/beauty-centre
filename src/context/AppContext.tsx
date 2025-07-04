'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { productsDummyData, userDummyData } from '@/app/assets/assets';
import { Product } from '@/types'; // Adjust to where your Product type is defined

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
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<typeof userDummyData | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  const fetchProductData = async () => {
    // Replace this with a real fetch call when using API
    setProducts(
      productsDummyData.map((product) => ({
        ...product,
        _id: product.id, // Map id to _id
        mainImage: product.images && product.images.length > 0 ? product.images[0] : '', // Use first image as mainImage
      }))
    );
  };

  const fetchUserData = async () => {
    // Replace this with a real fetch call when using API
    setUserData(userDummyData);
  };

  const addToCart = async (itemId: string) => {
    setCartItems(prev => {
      const updated = { ...prev };
      updated[itemId] = (updated[itemId] || 0) + 1;
      return updated;
    });
  };

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
        const price = product.offerPrice ?? product.price;
        total += price * quantity;
      }
    }
    return Math.round(total * 100) / 100;
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
