import { apiFetch } from ".";

type addProductToCartPayload = {
    productId: number;
    quantity: number;
}

type proceedCartPayload = {
    productIdPriceQty: {
        productId: number;
        price: number;
        qty: number;
    }[];
    comment: string;
}

type checkOutPayload = {
  orderId?: number;
  pickerName?: string;
  pickerContact?: string;
  deliveryAddress?: string;
  subTotal?: number;
  latitude?: string;
  longitude?: string;
}

type paymentPayload = {
    orderId: number;
    delivery: string;
    paymentMethod: string;
}

export const addProductToCart = async (payload: addProductToCartPayload) => {
    const response = await apiFetch("/carts", {
        method: "POST",
        data: payload
    });

    return response;
}

export const getCart = async () => {
    const response = await apiFetch("/carts");

    return response;
}

export const getOrders = async () => {
    const response = await apiFetch("/carts/orders");

    return response;
}
 
export const proceedCart = async (payload: proceedCartPayload) => {
    const response = await apiFetch("/carts/proceed-cart", {
        method: "POST",
        data: payload
    });

    return response;
}

export const checkOut = async (payload?: checkOutPayload) => {
    const response = await apiFetch("/carts/check-out", {
        method: "POST",
        data: payload
    });

    return response;
}

export const payment = async (payload: paymentPayload) => {
    const response = await apiFetch("/carts/payment", {
        method: "POST",
        data: payload
    });

    return response;
}