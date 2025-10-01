import { apiFetch } from ".";

type getBrandPayload = {
    page: number;
    limit: number;
}

type getBrandResponse = {
    success: boolean;
    data: any;
    pagination: {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
        nextPage: boolean;
        previousPage: boolean;
    }
}

type createBrandPayload = {
    brand: string;
    brandSlug: string;
    brandImage?: File; 
}

type updateBrandPayload = {
    brand: string;
    brandSlug: string;
    brandImage?: File;
}

type ApiResponse = {
    success: boolean;
    message: string;
}

export const getBrands = async (payload: getBrandPayload): Promise<getBrandResponse> => {
    const response = await apiFetch<getBrandResponse>("/brands/get-all-brands", {
        method: "POST",
        data: payload
    });

    return response;
}

export const createBrand = async (payload: createBrandPayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("brand", payload.brand);
    formData.append("branSlug", payload.brandSlug);

    if(payload.brandImage) {
        formData.append("brandImage", payload.brandImage);
    }

    const response = await apiFetch<ApiResponse>("/brands/create-brand", {
        method: "POST",
        data: formData,
    }, true)

    return response;
}

export const updateBrand = async (id: number, payload: updateBrandPayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("brand", payload.brand);
    formData.append("brandSlug", payload.brandSlug);

    if(payload.brandImage) {
        formData.append("brandImage", payload.brandImage);
    }

    const response = await apiFetch<ApiResponse>(`/brands/edit-brand/${id}`, {
        method: "PATCH",
        data: formData,
    }, true);

    return response;
}

export const deleteBrand = async (id: number): Promise<ApiResponse> => {
    const response = await apiFetch<ApiResponse>(`/brands/delete-brand/${id}`, {
        method: "DELETE"
    });

    return response;
}