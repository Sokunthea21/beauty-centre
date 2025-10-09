import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from "axios";

const BASE_URL = "http://localhost:8080/api";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

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

export async function apiFetch<T = any>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  const { data, headers, method = "GET" } = options;

  const isFormData = data instanceof FormData;

  // ✅ Let’s allow all header value types (no strict string type)
  const finalHeaders: Record<string, any> = {
    ...(headers || {}),
  };

  if (!isFormData) {
    finalHeaders["Content-Type"] = "application/json";
  } else {
    // Remove content-type for FormData (browser sets boundary automatically)
    delete finalHeaders["Content-Type"];
  }

  const response = await api.request<T>({
    url: endpoint,
    method,
    data,
    headers: finalHeaders,
    ...options,
  });

  return response.data;
}
