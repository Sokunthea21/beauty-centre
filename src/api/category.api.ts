import { apiFetch } from ".";

type getCategoryPayload = {
    page: number;
    limit: number;
}

type getCategoryResponse = {
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

type createCategoryPayload = {
    category: string;
    categorySlug: string;
    categoryImage?: File; 
}

type updateCategoryPayload = {
    category: string;
    categorySlug: string;
    categoryImage?: File;
}

type ApiResponse = {
    success: boolean;
    message: string;
}

export const getBrands = async (payload: getCategoryPayload): Promise<getCategoryResponse> => {
    const response = await apiFetch<getCategoryResponse>("/categories/get-all-categories", {
        method: "POST",
        data: payload
    });

    return response;
}

export const createBrand = async (payload: createCategoryPayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("brand", payload.category);
    formData.append("branSlug", payload.categorySlug);

    if(payload.categoryImage) {
        formData.append("brandImage", payload.categoryImage);
    }

    const response = await apiFetch<ApiResponse>("/categories/create-category", {
        method: "POST",
        data: formData,
    }, true)

    return response;
}

export const updateBrand = async (id: number, payload: updateCategoryPayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("brand", payload.category);
    formData.append("brandSlug", payload.categorySlug);

    if(payload.categoryImage) {
        formData.append("brandImage", payload.categoryImage);
    }

    const response = await apiFetch<ApiResponse>(`/categories/edit-category/${id}`, {
        method: "PATCH",
        data: formData,
    }, true);

    return response;
}

export const deleteBrand = async (id: number): Promise<ApiResponse> => {
    const response = await apiFetch<ApiResponse>(`/categories/delete-category/${id}`, {
        method: "DELETE"
    });

    return response;
}