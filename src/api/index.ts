import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from "axios";

const BASE_URL = "http://localhost:8080/api";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

// Wrapper function
export async function apiFetch<T = any>(
  endpoint: string,
  options: AxiosRequestConfig = {},
  isFormData: boolean = false
): Promise<T> {
  const headers = options.headers || {};

  // Only set JSON header if not form data
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await api.request<T>({
    url: endpoint,
    method: options.method || "GET",
    data: options.data,
    headers,
    ...options,
  });

  return response.data;
}
