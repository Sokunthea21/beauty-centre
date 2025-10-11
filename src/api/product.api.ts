import { exportPages } from "next/dist/export/worker";
import { apiFetch } from ".";
import { number } from "framer-motion";

type createProductPayload = {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    brandId: number;
    stock: number;
    productImages: File[];
}

type ApiResponse = {
    success: boolean;
    message: string;
}

export interface getAllProductsPayload {
  categoryId?: number;
  brandId?: number;
  page?: number;
  limit?: number;
}

type updateProductPayload = {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    brandId: number;
}

type updateProductImagePayload = {
    productImageId: number;
    productImage: File;
}

type addProductImagePayload = {
    productId: number;
    productImage: File;
}

type ratingProductPayload = {
    productId: number;
    rating: number;
    comment: string;
}

export const createProduct = async (payload: createProductPayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("name", payload.name);
    formData.append("description", payload.description);
    formData.append("price", payload.price.toString());
    formData.append("categoryId", payload.categoryId.toString());
    formData.append("brandId", payload.brandId.toString());
    formData.append("stock", payload.stock.toString());

    payload.productImages.forEach((file: any, index: any) => {
        formData.append("productImages", file); // backend should handle as array
    });

    const response = await apiFetch("/products/create-product", {
        method: "POST",
        data: formData,
    });

    return response;
}

export const getAllProducts = async (payload?: getAllProductsPayload) => {
    const response = await apiFetch("/products/get-all-products", {
        method: "POST",
        data: payload ?? {},
    });

    return response;
}

export const findProductById = async (id: number) => {
    const response = await apiFetch(`/products/find-product-by-id/${id}`, {
        method: "POST",
    });

    return response;
}

export const updateProduct = async (payload: updateProductPayload): Promise<ApiResponse> => {
    const response = await apiFetch<ApiResponse>("/products/edit-product", {
        method: "PATCH",
        data: payload,
    });
    
    return response;
}

export const updateProductImage = async (payload: updateProductImagePayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("productImageId", payload.productImageId.toString());

    if(payload.productImage) {
        formData.append("productImage", payload.productImage);
    }

    const response = await apiFetch<ApiResponse>("/products/edit-product-image", {
        method: "POST",
        data: formData
    });

    return response;
}

export const addProductImage = async (payload: addProductImagePayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("productId", payload.productId.toString());

    if(payload.productImage) {
        formData.append("productImage", payload.productImage);
    }

    const response = await apiFetch("/products/add-product-image", {
        method: "POST",
        data: formData
    });

    return response;
}

export const deteleProductImage = async (payload: { productImageId: number }): Promise<ApiResponse> => {
    const response = await apiFetch("/products/delete-product-image", {
        method: "POST",
        data: payload
    });

    return response;
}

export const deleteProduct = async (id: number): Promise<ApiResponse> => {
    const response = await apiFetch<ApiResponse>(`/products/delete-producst/${id}`);

    return response;
}

export const ratingProduct = async (payload: ratingProductPayload): Promise<ApiResponse> => {
    const response = await apiFetch<ApiResponse>("/products/rating-product", {
        method: "POST",
        data: payload
    });

    return response;
}