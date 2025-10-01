import { apiFetch } from ".";

type getSliderPayload = {
    page: number;
    limit: number;
}

type getSliderResponse = {
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

type createSliderPayload = {
    title: string;
    description: string;
    sliderImage?: File; 
}

type updateSliderPayload = {
    title: string;
    description: string;
    sliderImage?: File;
}

type ApiResponse = {
    success: boolean;
    message: string;
}

export const getBrands = async (payload: getSliderPayload): Promise<getSliderResponse> => {
    const response = await apiFetch<getSliderResponse>("/sliders/get-all-sliders", {
        method: "POST",
        data: payload
    });

    return response;
}

export const createBrand = async (payload: createSliderPayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("brand", payload.title);
    formData.append("branSlug", payload.description);

    if(payload.sliderImage) {
        formData.append("brandImage", payload.sliderImage);
    }

    const response = await apiFetch<ApiResponse>("/sliders/create-slider", {
        method: "POST",
        data: formData,
    }, true)

    return response;
}

export const updateBrand = async (id: number, payload: updateSliderPayload): Promise<ApiResponse> => {
    const formData = new FormData();

    formData.append("brand", payload.title);
    formData.append("brandSlug", payload.description);

    if(payload.sliderImage) {
        formData.append("brandImage", payload.sliderImage);
    }

    const response = await apiFetch<ApiResponse>(`/sliders/edit-slider/${id}`, {
        method: "PATCH",
        data: formData,
    }, true);

    return response;
}

export const deleteBrand = async (id: number): Promise<ApiResponse> => {
    const response = await apiFetch<ApiResponse>(`/sliders/delete-slider/${id}`, {
        method: "DELETE"
    });

    return response;
}