import { apiFetch } from ".";

type ApiResponse = {
    success: boolean;
    message: string;
}

type getWhiteListResponse = {
    success: boolean,
    data: any,
    pagination: {
        totalItems: number,
        totalPages: number,
        currentPage: number,
        pageSize: number,
        nextPage: boolean,
        previousPage: boolean
    }
}

export const addOrRemoveProductWhiteList = async (id: number): Promise<ApiResponse> => {
    const response = await apiFetch<ApiResponse>(`/white-lists/add/${id}`, {
        method: "POST"
    });

    return response;
}

export const getWhiteList = async (): Promise<getWhiteListResponse> => {
    const response = await apiFetch<getWhiteListResponse>("/white-lists/get", {
        method: "POST"
    });

    return response;
}