'use client'
import { productsDummyData, userDummyData } from "@/app/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useContext, useEffect, useState } from "react";

interface AppContextType {
    currency: string | undefined;
    router: ReturnType<typeof useRouter>;
    isSeller: boolean;
    setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
    userData: any;
    fetchUserData: () => Promise<void>;
    products: any[];
    fetchProductData: () => Promise<void>;
    cartItems: { [key: string]: number };
    setCartItems: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    addToCart: (itemId: string) => Promise<void>;
    updateCartQuantity: (itemId: string, quantity: number) => Promise<void>;
    getCartCount: () => number;
    getCartAmount: () => number;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props: { children: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const [products, setProducts] = useState<typeof productsDummyData>([])
    const [userData, setUserData] = useState<typeof userDummyData | null>(null)
    const [isSeller, setIsSeller] = useState(true)
    const [cartItems, setCartItems] = useState({})

    const fetchProductData = async () => {
        setProducts(productsDummyData)
    }

    const fetchUserData = async () => {
        setUserData(userDummyData)
    }

    const addToCart = async (itemId: string | number) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [])

    const value = {
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}